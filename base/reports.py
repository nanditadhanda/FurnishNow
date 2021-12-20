from base.models import OrderItem, Category, Order
from django.db.models import Sum, Count, Avg, Q
from django.db.models.functions import TruncMonth, TruncDate

from dataclasses import dataclass
from decimal import Decimal
from datetime import datetime


@dataclass
class ReportParams:
    start_date: datetime
    end_date: datetime


@dataclass
class ReportEntry:
    category: Category
    totalSales: Decimal
    items: int
    average: Decimal

# transaction report by category


def salesByCategory():
    data = []
    queryset = OrderItem.objects.values("category_id").annotate(
        totalSales=Sum("price"),
        items=Count("product___id"),
        average=Avg("price")
    ).order_by('items')

    for entry in queryset:
        category = Category.objects.get(id=entry["category_id"])
        report_entry = ReportEntry(
            category, entry["totalSales"], entry["items"], entry["average"]
        )
        data.append(report_entry)

    return data


@dataclass
class OrderEntry:
    total: int
    pendingOrders: int
    completedOrders: int

# order report


def orders_total():
    data = []

    completedOrders = Order.objects.filter(orderStatus='Delivered').count()
    pendingOrders = Order.objects.all().exclude(orderStatus='Delivered').count()

    total = Order.objects.all().count()
    report_entry = OrderEntry(
        total,  pendingOrders, completedOrders
    )

    data.append(report_entry)

    return data

# transaction report by category


@dataclass
class MonthlySalesEntry:
    month: datetime
    totalOrders: int
    pendingOrders: int
    shippedOrders: int
    completedOrders: int
    netSales: Decimal
    avgSales: Decimal


def monthlysales_report():
    data = []

    # completedOrders = Order.objects.values(
    #     "orderDate").filter(orderStatus__contains='Delivered')

    # Truncate to month and add to select list
    queryset = Order.objects.annotate(
        month=TruncMonth('orderDate')
    ).values('month').annotate(
        totalOrders=Count('_id'),
        pendingOrders=Count("orderStatus", filter=Q(
            orderStatus__in=['Placed', 'Packaged'])),
        shippedOrders=Count("orderStatus", filter=Q(
            orderStatus__in=['Shipped'])),
        completedOrders=Count("orderStatus", filter=Q(
            orderStatus='Delivered')),
        netSales=Sum("totalPrice"),
        avgSales=Avg("totalPrice")
    ).order_by()

    for entry in queryset:

        report_entry = MonthlySalesEntry(
            entry["month"],
            entry["totalOrders"],
            entry["pendingOrders"],
            entry["shippedOrders"],
            entry["completedOrders"],
            entry["netSales"],
            entry["avgSales"]
        )
        data.append(report_entry)

    return data
