import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  priceHistory: [
    {
      price: { type: Number, required: true },
      date: { type: Date, required: true },
    },
  ],
  lowestPrice: { type: Number, required: false },
  highestPrice: { type: Number, required: false },
  averagePrice: { type: Number, required: false },
  discountRate: { type: Number, },
  category: { type: String, },
  description: { type: String, },
  reviewsCount: { type: Number, },
  stars: { type: Number, },
  isOutOfStock: { type: Boolean,default: false },
  users: [
    {email : {type: String, required: true}}
  ], default: []

}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;