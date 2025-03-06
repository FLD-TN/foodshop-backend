const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const axios = require("axios");
const notificationRoutes = require("./Routes/notificationRouter"); 

dotenv.config();
const app = express();

// ✅ Middleware - Đảm bảo đúng thứ tự
app.use(cors());
app.use(express.json());  // 🚀 Đọc dữ liệu JSON từ `req.body`
app.use(express.urlencoded({ extended: true })); // 🚀 Hỗ trợ `x-www-form-urlencoded`
app.use(bodyParser.json());

// ✅ Đăng ký routes (phải đặt sau middleware)
app.use("/api", notificationRoutes);

// 🔹 Kết nối MongoDB Atlas
const connectionString = `mongodb+srv://admin:${process.env.PW}@futurefoodshopdb.asiql.mongodb.net/foodShopDB?appName=FutureFoodShopDB`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.log("❌ Lỗi kết nối MongoDB:", err));

// ========== API CRUD CHO USER ==========
const User = require("./Model/UserModel");

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ status: true, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            res.json({
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role.toLowerCase(),
            });
        } else {
            res.status(401).json({ status: false, error: "Email hoặc mật khẩu không đúng" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== API CRUD CHO PRODUCT ==========
const Product = require("./Model/ProductModel");

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        console.log("📩 Nhận sản phẩm:", req.body);
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ status: true, product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put("/api/products/:productID", async (req, res) => {
    try {
        const { productID } = req.params;
        console.log("🔄 Cập nhật sản phẩm:", productID);

        const existingProduct = await Product.findOne({ productID });
        if (!existingProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }

        Object.assign(existingProduct, req.body); // Cập nhật sản phẩm
        const updatedProduct = await existingProduct.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Cập nhật thất bại!", error });
    }
});

app.delete("/api/products/:productID", async (req, res) => {
    try {
        const { productID } = req.params;
        console.log("🗑 Xóa sản phẩm:", productID);
        const deletedProduct = await Product.findOneAndDelete({ productID });

        if (deletedProduct) {
            res.json({ message: "Xóa sản phẩm thành công!" });
        } else {
            res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Xóa thất bại!", error });
    }
});

// ========== API CRUD CHO CATEGORY ==========
const Category = require("./Model/CategoryModel");

app.get("/api/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/api/categories", async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ status: true, category });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ========== CHẠY SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://0.0.0.0:${PORT}`));
