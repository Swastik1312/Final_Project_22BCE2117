"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Plus, Edit, Eye, Star, MapPin, Phone, Clock, CheckCircle, Package } from "lucide-react"

export default function DriversPage() {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: "Mike Johnson",
      phone: "+1-555-1001",
      email: "mike.driver@quickmart.com",
      rating: 4.9,
      totalDeliveries: 245,
      status: "active",
      currentLocation: "Downtown Area",
      vehicleType: "Motorcycle",
      licenseNumber: "DL123456",
      joinDate: "2023-06-15",
      todayDeliveries: 8,
      avgDeliveryTime: "16 min",
      earnings: 1250.5,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      phone: "+1-555-1002",
      email: "sarah.driver@quickmart.com",
      rating: 4.8,
      totalDeliveries: 189,
      status: "active",
      currentLocation: "Midtown",
      vehicleType: "Bicycle",
      licenseNumber: "DL789012",
      joinDate: "2023-08-22",
      todayDeliveries: 6,
      avgDeliveryTime: "14 min",
      earnings: 980.75,
    },
    {
      id: 3,
      name: "David Brown",
      phone: "+1-555-1003",
      email: "david.driver@quickmart.com",
      rating: 4.7,
      totalDeliveries: 156,
      status: "offline",
      currentLocation: "Uptown",
      vehicleType: "Car",
      licenseNumber: "DL345678",
      joinDate: "2023-09-10",
      todayDeliveries: 0,
      avgDeliveryTime: "18 min",
      earnings: 750.25,
    },
  ])

  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    licenseNumber: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>
      case "busy":
        return <Badge className="bg-blue-100 text-blue-800">Busy</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleAddDriver = () => {
    const driver = {
      id: drivers.length + 1,
      ...newDriver,
      rating: 0,
      totalDeliveries: 0,
      status: "offline",
      currentLocation: "Not Available",
      joinDate: new Date().toISOString().split("T")[0],
      todayDeliveries: 0,
      avgDeliveryTime: "0 min",
      earnings: 0,
    }
    setDrivers([...drivers, driver])
    setNewDriver({ name: "", phone: "", email: "", vehicleType: "", licenseNumber: "" })
    setIsAddDriverOpen(false)
  }

  const stats = {
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter((d) => d.status === "active").length,
    totalDeliveries: drivers.reduce((sum, d) => sum + d.totalDeliveries, 0),
    avgRating: (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1),
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
            <Link href="/admin/drivers" className="text-green-600 font-medium">
              Drivers
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Driver Management</h1>
          <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Register a new delivery driver</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    placeholder="Enter driver's full name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                      placeholder="+1-555-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                      placeholder="driver@quickmart.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      value={newDriver.vehicleType}
                      onChange={(e) => setNewDriver({ ...newDriver, vehicleType: e.target.value })}
                      placeholder="Motorcycle, Car, Bicycle"
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      value={newDriver.licenseNumber}
                      onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                      placeholder="DL123456"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDriverOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDriver}>Add Driver</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDrivers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeDrivers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDeliveries}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}/5</div>
            </CardContent>
          </Card>
        </div>

        {/* Drivers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Drivers</CardTitle>
            <CardDescription>Manage your delivery team</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Deliveries</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Today</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-600">ID: {driver.licenseNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {driver.phone}
                        </p>
                        <p className="text-gray-600">{driver.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{driver.vehicleType}</p>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {driver.currentLocation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{driver.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{driver.totalDeliveries}</p>
                        <p className="text-gray-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {driver.avgDeliveryTime}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{driver.todayDeliveries} orders</p>
                        <p className="text-gray-600">${driver.earnings.toFixed(2)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Driver Details - {driver.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Name:</strong> {driver.name}
                                    </p>
                                    <p>
                                      <strong>Phone:</strong> {driver.phone}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {driver.email}
                                    </p>
                                    <p>
                                      <strong>License:</strong> {driver.licenseNumber}
                                    </p>
                                    <p>
                                      <strong>Join Date:</strong> {new Date(driver.joinDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                                  <div className="space-y-2 text-sm">
                                    <p>
                                      <strong>Rating:</strong> {driver.rating}/5 ⭐
                                    </p>
                                    <p>
                                      <strong>Total Deliveries:</strong> {driver.totalDeliveries}
                                    </p>
                                    <p>
                                      <strong>Avg Delivery Time:</strong> {driver.avgDeliveryTime}
                                    </p>
                                    <p>
                                      <strong>Today's Deliveries:</strong> {driver.todayDeliveries}
                                    </p>
                                    <p>
                                      <strong>Earnings:</strong> ${driver.earnings.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Vehicle Information</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <p>
                                    <strong>Vehicle Type:</strong> {driver.vehicleType}
                                  </p>
                                  <p>
                                    <strong>Current Location:</strong> {driver.currentLocation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
