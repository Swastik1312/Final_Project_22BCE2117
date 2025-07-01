"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Download, BarChart3, TrendingUp, DollarSign, Package, Users, Clock, Star } from "lucide-react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("sales")

  const salesData = {
    totalRevenue: 15420.5,
    totalOrders: 342,
    averageOrderValue: 45.12,
    growthRate: 12.5,
    topProducts: [
      { name: "Fresh Organic Apples", sales: 245, revenue: 1225.5 },
      { name: "Artisan Bread Loaf", sales: 189, revenue: 1228.5 },
      { name: "Premium Coffee Beans", sales: 156, revenue: 2026.44 },
    ],
    dailySales: [
      { date: "2024-01-10", orders: 23, revenue: 487.65 },
      { date: "2024-01-11", orders: 31, revenue: 652.3 },
      { date: "2024-01-12", orders: 28, revenue: 598.45 },
      { date: "2024-01-13", orders: 35, revenue: 742.8 },
      { date: "2024-01-14", orders: 29, revenue: 615.25 },
      { date: "2024-01-15", orders: 33, revenue: 698.9 },
      { date: "2024-01-16", orders: 27, revenue: 573.15 },
    ],
  }

  const customerData = {
    totalCustomers: 1247,
    newCustomers: 89,
    returningCustomers: 1158,
    customerRetentionRate: 92.8,
    topCustomers: [
      { name: "John Doe", orders: 15, spent: 342.5 },
      { name: "Jane Smith", orders: 12, spent: 298.75 },
      { name: "Mike Johnson", orders: 10, spent: 245.3 },
    ],
  }

  const deliveryData = {
    totalDeliveries: 342,
    averageDeliveryTime: 18.5,
    onTimeDeliveries: 325,
    onTimeRate: 95.0,
    topDrivers: [
      { name: "Mike Johnson", deliveries: 45, rating: 4.9 },
      { name: "Sarah Wilson", deliveries: 38, rating: 4.8 },
      { name: "David Brown", deliveries: 32, rating: 4.7 },
    ],
  }

  const inventoryData = {
    totalProducts: 156,
    lowStockItems: 8,
    outOfStockItems: 3,
    topSellingCategories: [
      { category: "Fruits", sales: 245 },
      { category: "Vegetables", sales: 189 },
      { category: "Dairy", sales: 156 },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">QuickMart Admin</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/admin" className="text-gray-600 hover:text-green-600">
              Dashboard
            </Link>
            <Link href="/admin/reports" className="text-green-600 font-medium">
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <div className="flex space-x-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${salesData.totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />+{salesData.growthRate}% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{salesData.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">Orders completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${salesData.averageOrderValue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Per order average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+{salesData.growthRate}%</div>
                  <p className="text-xs text-muted-foreground">Month over month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Best performing products by sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${product.revenue.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Sales Trend</CardTitle>
                  <CardDescription>Sales performance over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.dailySales.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{day.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${day.revenue.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customerData.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{customerData.newCustomers}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Returning Customers</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{customerData.returningCustomers}</div>
                  <p className="text-xs text-muted-foreground">Repeat customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{customerData.customerRetentionRate}%</div>
                  <p className="text-xs text-muted-foreground">Customer retention</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Customers with highest order value and frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerData.topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.orders} orders placed</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${customer.spent.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">Total spent</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{deliveryData.totalDeliveries}</div>
                  <p className="text-xs text-muted-foreground">Completed deliveries</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Delivery Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{deliveryData.averageDeliveryTime} min</div>
                  <p className="text-xs text-muted-foreground">Average time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On-Time Deliveries</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{deliveryData.onTimeDeliveries}</div>
                  <p className="text-xs text-muted-foreground">{deliveryData.onTimeRate}% on time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{deliveryData.onTimeRate}%</div>
                  <p className="text-xs text-muted-foreground">Performance rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
                <CardDescription>Drivers with best performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryData.topDrivers.map((driver, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-600">{driver.deliveries} deliveries completed</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{driver.rating}/5</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inventoryData.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">In catalog</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                  <Package className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{inventoryData.lowStockItems}</div>
                  <p className="text-xs text-muted-foreground">Need restocking</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                  <Package className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{inventoryData.outOfStockItems}</div>
                  <p className="text-xs text-muted-foreground">Unavailable</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Health</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {(
                      ((inventoryData.totalProducts - inventoryData.lowStockItems - inventoryData.outOfStockItems) /
                        inventoryData.totalProducts) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <p className="text-xs text-muted-foreground">Well stocked</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Categories</CardTitle>
                <CardDescription>Product categories by sales volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryData.topSellingCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-600">Product category</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{category.sales}</p>
                        <p className="text-sm text-gray-600">Units sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
