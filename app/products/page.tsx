"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Star, Search, Filter, ShoppingCart, Truck } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<{ [key: number]: number }>({})

  const products = [
    {
      id: 1,
      name: "Fresh Organic Apples",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      rating: 4.8,
      deliveryTime: "15-20 min",
      category: "fruits",
      inStock: true,
    },
    {
      id: 2,
      name: "Artisan Bread Loaf",
      price: 6.5,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      rating: 4.9,
      deliveryTime: "10-15 min",
      category: "bakery",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Coffee Beans",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      rating: 4.7,
      deliveryTime: "20-25 min",
      category: "beverages",
      inStock: true,
    },
    {
      id: 4,
      name: "Fresh Salmon Fillet",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop",
      rating: 4.6,
      deliveryTime: "25-30 min",
      category: "seafood",
      inStock: true,
    },
    {
      id: 5,
      name: "Organic Spinach",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      rating: 4.5,
      deliveryTime: "15-20 min",
      category: "vegetables",
      inStock: true,
    },
    {
      id: 6,
      name: "Greek Yogurt",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1571212515416-fca88c6c4b3c?w=400&h=300&fit=crop",
      rating: 4.8,
      deliveryTime: "10-15 min",
      category: "dairy",
      inStock: false,
    },
    {
      id: 7,
      name: "Fresh Bananas",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      rating: 4.7,
      deliveryTime: "15-20 min",
      category: "fruits",
      inStock: true,
    },
    {
      id: 8,
      name: "Whole Grain Pasta",
      price: 4.49,
      image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop",
      rating: 4.6,
      deliveryTime: "20-25 min",
      category: "pantry",
      inStock: true,
    },
    {
      id: 9,
      name: "Fresh Tomatoes",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=300&fit=crop",
      rating: 4.5,
      deliveryTime: "15-20 min",
      category: "vegetables",
      inStock: true,
    },
    {
      id: 10,
      name: "Organic Milk",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
      rating: 4.8,
      deliveryTime: "10-15 min",
      category: "dairy",
      inStock: true,
    },
    {
      id: 11,
      name: "Fresh Orange Juice",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
      rating: 4.7,
      deliveryTime: "15-20 min",
      category: "beverages",
      inStock: true,
    },
    {
      id: 12,
      name: "Chicken Breast",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop",
      rating: 4.6,
      deliveryTime: "25-30 min",
      category: "meat",
      inStock: true,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "dairy", label: "Dairy" },
    { value: "bakery", label: "Bakery" },
    { value: "beverages", label: "Beverages" },
    { value: "seafood", label: "Seafood" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">QuickMart</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-green-600 font-medium">
              Products
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-green-600">
              Orders
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-green-600">
              Cart
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="relative bg-transparent" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Fresh Products</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
                <CardDescription className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex items-center space-x-1 w-fit">
                    <Clock className="h-3 w-3" />
                    <span>{product.deliveryTime}</span>
                  </Badge>
                </CardDescription>
                <Button className="w-full" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                  {product.inStock
                    ? cart[product.id]
                      ? `Added (${cart[product.id]})`
                      : "Add to Cart"
                    : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
