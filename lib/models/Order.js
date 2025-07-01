import clientPromise from "../mongodb.js"
import { ObjectId } from "mongodb"

export class Order {
  static async create(orderData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    const order = {
      ...orderData,
      status: orderData.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("orders").insertOne(order)
    return { ...order, _id: result.insertedId }
  }

  static async findById(id) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("orders").findOne({ _id: new ObjectId(id) })
  }

  static async findAll(filter = {}, options = {}) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("orders").find(filter, options).toArray()
  }

  static async findByUserId(userId) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db
      .collection("orders")
      .find({ userId: new ObjectId(userId) })
      .toArray()
  }

  static async updateById(id, updateData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    const result = await db.collection("orders").updateOne(
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

  static async updateStatus(id, status) {
    const client = await clientPromise
    const db = client.db("quickmart")

    return await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )
  }

  static async deleteById(id) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("orders").deleteOne({ _id: new ObjectId(id) })
  }

  static async findByStatus(status) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("orders").find({ status }).toArray()
  }

  static async getOrderStats() {
    const client = await clientPromise
    const db = client.db("quickmart")

    const stats = await db
      .collection("orders")
      .aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$total" },
            averageOrderValue: { $avg: "$total" },
          },
        },
      ])
      .toArray()

    return stats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 }
  }
}
