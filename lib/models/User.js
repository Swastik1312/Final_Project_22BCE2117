import clientPromise from "../mongodb.js"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

export class User {
  static async create(userData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const user = {
      ...userData,
      password: hashedPassword,
      role: userData.role || "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  static async findByEmail(email) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("users").findOne({ email })
  }

  static async findById(id) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("users").findOne({ _id: new ObjectId(id) })
  }

  static async updateById(id, updateData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    return result
  }

  static async deleteById(id) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("users").deleteOne({ _id: new ObjectId(id) })
  }

  static async findAll(filter = {}, options = {}) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("users").find(filter, options).toArray()
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }
}
