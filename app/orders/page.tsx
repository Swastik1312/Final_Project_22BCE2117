"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Package, CheckCircle, Clock, MapPin, Phone } from "lucide-react"

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "ORD-001",
      status: "delivered",
      date: "2024-01-15",
      total: 24.48,
      items: [
        { name: "Fresh Organic Apples", quantity: 2, price: 4.99 },
        { name: "Artisan Bread Loaf", quantity: 1, price: 6.5 },
        { name: "Premium Coffee Beans", quantity: 1, price: 12.99 },
      ],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveryTime: "Delivered at 2:30 PM",
    },
    {
      id: "ORD-002",
      status: "in_transit",
      date: "2024-01-16",
      total: 18.99,
      items: [{ name: "Fresh Salmon Fillet", quantity: 1, price: 18.99 }],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveryTime: "Expected: 3:15 PM",
      driver: {
        name: "Mike Johnson",
        phone: "+1 (555) 123-4567",
        rating: 4.9,
      },
    },
    {
      id: "ORD-003",
      status: "preparing",
      date: "2024-01-16",
      total: 15.47,
      items: [
        { name: "Organic Spinach", quantity: 2, price: 3.49 },
        { name: "Greek Yogurt", quantity: 1, price: 5.99 },
      ],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveryTime: "Expected: 4:00 PM",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in_transit":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "preparing":
        return <Package className="h-5 w-5 text-orange-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "in_transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "preparing":
        return <Badge className="bg-orange-100 text-orange-800">Preparing</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const activeOrders = orders.filter((order) => order.status !== "delivered")
  const pastOrders = orders.filter((order) => order.status === "delivered")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">QuickMart</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-600 hover:text-green-600">
              Products
            </Link>
            <Link href="/orders" className="text-green-600 font-medium">
              Orders
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-green-600">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="past">Past Orders ({pastOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No active orders</h3>
                  <p className="text-gray-600 mb-6">You don't have any orders in progress right now.</p>
                  <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(order.status)}
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Items Ordered</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Delivery Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <span>{order.deliveryAddress}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{order.deliveryTime}</span>
                            </div>
                            {order.driver && (
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>
                                  Driver: {order.driver.name} ({order.driver.rating}⭐)
                                </span>
                              </div>
                            )}
                          </div>

                          {order.status === "in_transit" && (
                            <div className="mt-4">
                              <Button variant="outline" className="w-full bg-transparent">
                                Track Order
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No past orders</h3>
                  <p className="text-gray-600 mb-6">Your order history will appear here.</p>
                  <Button asChild>
                    <Link href="/products">Place Your First Order</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {pastOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(order.status)}
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <CardDescription>
                              {order.deliveryTime} • {new Date(order.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Items Ordered</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold mb-3">Delivery Address</h4>
                            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                          </div>
                          <div className="mt-4 space-y-2">
                            <Button variant="outline" className="w-full bg-transparent">
                              Reorder Items
                            </Button>
                            <Button variant="ghost" className="w-full">
                              Leave Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
