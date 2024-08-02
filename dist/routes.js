"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes.ts
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const price_1 = __importDefault(require("../models/price"));
const router = (0, express_1.Router)();
const symbols = ['GOOG', 'BTC']; // Add your symbols here
router.get('/prices/:symbol', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prices = yield price_1.default.find({ symbol: req.params.symbol })
            .sort({ timestamp: -1 })
            .limit(20);
        res.json(prices);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
const fetchPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const symbol of symbols) {
        try {
            const response = yield axios_1.default.get(`API_ENDPOINT_FOR_${symbol}`);
            const newPrice = new price_1.default({
                symbol,
                price: response.data.price,
            });
            yield newPrice.save();
        }
        catch (error) {
            console.error(error);
        }
    }
});
setInterval(fetchPrices, 5000);
exports.default = router;
