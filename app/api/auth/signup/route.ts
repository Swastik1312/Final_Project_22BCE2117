import { type NextRequest, NextResponse } from "next/server"
import { User } from "@/lib/models/User.js"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    const { email, password, firstName, lastName, phone } = userData

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, message: "All required fields must be provided" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: "user",
    })

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
