"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/price.ts
const mongoose_1 = __importDefault(require("mongoose"));
const priceSchema = new mongoose_1.default.Schema({
    symbol: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
});
const Price = mongoose_1.default.model('Price', priceSchema);
exports.default = Price;
