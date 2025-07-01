import { type NextRequest, NextResponse } from "next/server"
import { Order } from "@/lib/models/Order.js"
import jwt from "jsonwebtoken"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    let orders

    if (userId) {
      orders = await Order.findByUserId(userId)
    } else if (status) {
      orders = await Order.findByStatus(status)
    } else {
      orders = await Order.findAll()
    }

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()

    // Validate required fields
    const requiredFields = ["items", "total", "deliveryAddress"]
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required` }, { status: 400 })
      }
    }

    // Add user ID to order
    orderData.userId = decoded.userId

    const order = await Order.create(orderData)

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 })
    }

    const updateData = await request.json()
    const result = await Order.updateById(id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Order updated successfully" })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ success: false, message: "Failed to update order" }, { status: 500 })
  }
}
