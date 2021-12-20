from base.models import OrderItem, Category, Order
from django.db.models import Sum, Count, Avg
from django.db.models.functions import TruncMonth, TruncDate

from dataclasses import dataclass
from decimal import Decimal
from datetime import datetime


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

    print("completed:", completedOrders, "pending: ", pendingOrders)

    total = Order.objects.all().count()
    report_entry = OrderEntry(
        total,  pendingOrders, completedOrders
    )

    data.append(report_entry)

    return data

# transaction report by category


@dataclass
class DailySalesEntry:
    order: Order
    month: datetime
    totalOrders: int
    completedOrders: int
    pending: int
    netSales: Decimal
    avgSales: Decimal


def dailysales_report():
    data = []

    # completedOrders = Order.objects.values(
    #     "orderDate").filter(orderStatus__contains='Delivered')

    # Truncate to month and add to select list
    queryset = Order.objects.annotate(
        month=TruncMonth('orderDate')
    ).values('month').annotate(
        totalOrders=Count('_id'),
        netSales=Sum("totalPrice"),
        avgSales=Avg("totalPrice")
    ).order_by()

    for entry in queryset:

        order = Order.objects.filter(orderDate__icontains=entry["month"])

        completedOrders = Order.objects.all().count()
        pending = Order.objects.filter(orderDate__icontains=entry["month"]).exclude(
            orderStatus='Delivered').count()

        report_entry = DailySalesEntry(
            order,
            entry["month"],
            entry["totalOrders"],
            # entry["completed"],

            pending,
            completedOrders,
            entry["netSales"],
            entry["avgSales"]
        )

        print(report_entry)
        data.append(report_entry)

    return data
