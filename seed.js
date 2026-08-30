/**
 * seed.js - Reset database về đúng dữ liệu mẫu ban đầu
 *
 * Cách chạy:   npm run seed
 *
 * ⚠️ CẢNH BÁO: script này XOÁ SẠCH các collection users, categories, products,
 * banners, notifications, orders rồi tạo lại từ đầu.
 *
 * KHÁC với migration: migration (npm run migrate) chạy tự động khi deploy và
 * chỉ nạp vào collection đang rỗng, không bao giờ xoá gì. Còn seed.js là công cụ
 * chạy TAY, dùng khi bạn cố ý muốn dọn sạch mọi thứ về trạng thái ban đầu.
 */

require("dotenv").config();
const mongoose = require("mongoose");

const data = require("./data/sampleData");

const User = require("./Model/UserModel");
const Category = require("./Model/CategoryModel");
const Product = require("./Model/ProductModel");
const Banner = require("./Model/BannerModel");
const Notification = require("./Model/NotificationModel");
const Order = require("./Model/OrderModel");

async function seed() {
    if (!process.env.MONGO_URI) {
        console.error("❌ Thiếu MONGO_URI trong file .env");
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Đã kết nối database:", mongoose.connection.name);

    console.log("\n🗑  Đang xoá dữ liệu cũ...");
    await Promise.all([
        User.deleteMany({}),
        Category.deleteMany({}),
        Product.deleteMany({}),
        Banner.deleteMany({}),
        Notification.deleteMany({}),
        Order.deleteMany({}),
    ]);

    console.log("🌱 Đang tạo dữ liệu mẫu...\n");
    const buoc = [
        ["Danh mục  ", Category, data.categories],
        ["Sản phẩm  ", Product, data.products],
        ["Người dùng", User, data.users],
        ["Banner    ", Banner, data.banners],
        ["Thông báo ", Notification, data.notifications],
        ["Đơn hàng  ", Order, data.orders],
    ];
    for (const [ten, Model, items] of buoc) {
        await Model.insertMany(items);
        console.log(`   ${ten} : ${items.length}`);
    }

    console.log("\n🔑 Tài khoản đăng nhập:");
    console.log("   Admin : admin@foodshop.vn / admin123");
    console.log("   User  : user@foodshop.vn  / user123");

    await mongoose.disconnect();
    console.log("\n✅ Seed hoàn tất!");
}

seed().catch((err) => {
    console.error("\n❌ Seed thất bại:", err.message);
    process.exit(1);
});
