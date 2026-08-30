/**
 * migrate.js - Bộ chạy migration
 *
 * Đọc tất cả file trong thư mục migrations/, chạy theo thứ tự tên file,
 * và ghi lại tên migration đã chạy vào collection "_migrations".
 * Nhờ vậy mỗi migration chỉ chạy ĐÚNG MỘT LẦN, dù Render deploy lại bao nhiêu lần.
 *
 * Được gọi tự động trong index.js sau khi kết nối MongoDB thành công.
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const THU_MUC = path.join(__dirname, "migrations");
const COLLECTION = "_migrations";

async function runMigrations() {
    if (!fs.existsSync(THU_MUC)) return;

    const coll = mongoose.connection.db.collection(COLLECTION);

    // Chặn trường hợp 2 tiến trình cùng chạy 1 migration (Render có thể
    // chạy chồng instance cũ và mới trong lúc deploy)
    await coll.createIndex({ name: 1 }, { unique: true });

    const daChay = new Set((await coll.find({}, { projection: { name: 1 } }).toArray()).map((d) => d.name));

    const files = fs
        .readdirSync(THU_MUC)
        .filter((f) => f.endsWith(".js"))
        .sort();

    const canChay = files.filter((f) => !daChay.has(require(path.join(THU_MUC, f)).name));

    if (canChay.length === 0) {
        console.log(`📦 Migration: không có gì mới (đã chạy ${daChay.size})`);
        return;
    }

    console.log(`📦 Migration: có ${canChay.length} migration cần chạy`);

    for (const file of canChay) {
        const mig = require(path.join(THU_MUC, file));
        console.log(`   ▶ Đang chạy ${mig.name}...`);
        try {
            await mig.up();
            await coll.insertOne({ name: mig.name, appliedAt: new Date() });
            console.log(`   ✅ Xong ${mig.name}`);
        } catch (err) {
            // Lỗi trùng key = migration khác đã chạy xong trước, coi như thành công
            if (err.code === 11000) {
                console.log(`   ⏭  ${mig.name} đã được chạy bởi tiến trình khác`);
                continue;
            }
            console.error(`   ❌ Lỗi ở ${mig.name}:`, err.message);
            throw err;
        }
    }

    console.log("📦 Migration hoàn tất");
}

module.exports = { runMigrations };

// Cho phép chạy tay:  npm run migrate
if (require.main === module) {
    require("dotenv").config();
    mongoose
        .connect(process.env.MONGO_URI)
        .then(async () => {
            console.log("✅ Đã kết nối:", mongoose.connection.name);
            await runMigrations();
            await mongoose.disconnect();
        })
        .catch((err) => {
            console.error("❌ Lỗi:", err.message);
            process.exit(1);
        });
}
