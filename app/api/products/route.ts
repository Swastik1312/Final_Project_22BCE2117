import { type NextRequest, NextResponse } from "next/server"
import { Product } from "@/lib/models/Product.js"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let products

    if (search) {
      products = await Product.search(search)
    } else if (category && category !== "all") {
      products = await Product.findByCategory(category)
    } else {
      products = await Product.findAll()
    }

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "price", "category", "stock"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    const product = await Product.create(productData)

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 })
    }

    const updateData = await request.json()
    const result = await Product.updateById(id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product updated successfully" })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 })
    }

    const result = await Product.deleteById(id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 })
  }
}
