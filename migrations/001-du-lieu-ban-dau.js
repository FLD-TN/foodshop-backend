/**
 * Migration 001 - Nạp dữ liệu mẫu ban đầu
 *
 * Chạy tự động 1 lần duy nhất khi server khởi động (xem migrate.js).
 * An toàn: chỉ nạp vào collection nào ĐANG RỖNG, không bao giờ ghi đè
 * hay xoá dữ liệu thật do người dùng tạo.
 */

const data = require("../data/sampleData");

const User = require("../Model/UserModel");
const Category = require("../Model/CategoryModel");
const Product = require("../Model/ProductModel");
const Banner = require("../Model/BannerModel");
const Notification = require("../Model/NotificationModel");
const Order = require("../Model/OrderModel");

module.exports = {
    name: "001-du-lieu-ban-dau",

    async up() {
        const buoc = [
            ["Danh mục", Category, data.categories],
            ["Sản phẩm", Product, data.products],
            ["Người dùng", User, data.users],
            ["Banner", Banner, data.banners],
            ["Thông báo", Notification, data.notifications],
            ["Đơn hàng", Order, data.orders],
        ];

        for (const [ten, Model, items] of buoc) {
            const daCo = await Model.estimatedDocumentCount();
            if (daCo > 0) {
                console.log(`      • ${ten}: đã có ${daCo} bản ghi, bỏ qua`);
                continue;
            }
            await Model.insertMany(items);
            console.log(`      • ${ten}: đã tạo ${items.length} bản ghi`);
        }

        console.log("      🔑 Tài khoản: admin@foodshop.vn / admin123");
    },
};
