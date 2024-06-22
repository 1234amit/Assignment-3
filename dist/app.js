"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { productRoute } from "./app/modules/product/product.route";
// import { orderRoute } from "./app/modules/order/order.route";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
app.get("/", (req, res) => {
    res.send("Welcome to my Ecommerce server.");
});
exports.default = app;
