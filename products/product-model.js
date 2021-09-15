const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'ProductCategory',
    },
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      index: true,
      unique: true,
      dropDups: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: [true, 'Image is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
      required: [true, 'Product Stock is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    averageRating: {
      type: Number,
      default: 1,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    discountRate: {
      type: Number,
      required: [false, 'Discount Rate is required'],
      default: 0,
    },
    priceDiscount: {
      type: Number,
      required: false,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
      required: false,
      default: 0,
    },
    shippingCharge: {
      type: Number,
      required: [true, 'Shipping Charge is required'],
      default: 0,
    },
    taxRate: {
      type: Number,
      required: [true, 'Please add a Tax Rate'],
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Product', ProductSchema);