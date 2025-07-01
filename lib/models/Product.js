import clientPromise from "../mongodb.js"
import { ObjectId } from "mongodb"

export class Product {
  static async create(productData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    const product = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("products").insertOne(product)
    return { ...product, _id: result.insertedId }
  }

  static async findById(id) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("products").findOne({ _id: new ObjectId(id) })
  }

  static async findAll(filter = {}, options = {}) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("products").find(filter, options).toArray()
  }

  static async updateById(id, updateData) {
    const client = await clientPromise
    const db = client.db("quickmart")

    const result = await db.collection("products").updateOne(
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
    return await db.collection("products").deleteOne({ _id: new ObjectId(id) })
  }

  static async findByCategory(category) {
    const client = await clientPromise
    const db = client.db("quickmart")
    return await db.collection("products").find({ category }).toArray()
  }

  static async search(searchTerm) {
    const client = await clientPromise
    const db = client.db("quickmart")

    return await db
      .collection("products")
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ],
      })
      .toArray()
  }

  static async updateStock(id, quantity) {
    const client = await clientPromise
    const db = client.db("quickmart")

    return await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $inc: { stock: quantity },
        $set: { updatedAt: new Date() },
      },
    )
  }
}
