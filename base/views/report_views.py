from base.models import OrderItem, Category, Order
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from base.reports import salesByCategory, monthlysales_report, orders_total

from base.serializers import ReportEntrySerializer, MonthlySalesSerializer, OrdersTotalSerializer
from rest_framework import serializers, status

from rest_framework.response import Response


# get all products


@api_view(['GET'])  # GET REST api method
@permission_classes([IsAuthenticated])
def categorySalesReport(request):
    user = request.user

    if user.is_staff or user.is_storeManager:
        data = salesByCategory()
        serializer = ReportEntrySerializer(instance=data, many=True)
        return Response(data=serializer.data)
    else:
        # else return error message
        return Response({'detail': 'You do not have permission to perform this action.'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])  # GET REST api method
@permission_classes([IsAuthenticated])
def monthlySalesReport(request):
    user = request.user

    if user.is_staff or user.is_storeManager:
        data = monthlysales_report()
        serializer = MonthlySalesSerializer(instance=data, many=True)

        return Response(data=serializer.data)

    else:
        # else return error message
        return Response({'detail': 'You do not have permission to perform this action.'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])  # GET REST api method
@permission_classes([IsAuthenticated])
def ordersTotalReport(request):

    user = request.user

    if user.is_staff or user.is_storeManager:
        order = orders_total()
        serializer = OrdersTotalSerializer(order, many=True)
        return Response(serializer.data[0])

    else:
        # else return error message
        return Response({'detail': 'You do not have permission to perform this action.'},
                        status=status.HTTP_400_BAD_REQUEST)
