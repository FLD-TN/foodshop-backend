const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const User = require("./Model/UserModel");
const Product = require("./Model/ProductModel");
const Category = require("./Model/CategoryModel");
const Notification = require("./Model/NotificationModel");
const axios = require("axios");

dotenv.config();
const pass = process.env.PW;

app.use(cors());
app.use(bodyParser.json());

// Gửi thông báo đẩy & lưu vào MongoDB
router.post("/sendNotification", async (req, res) => {
    const { title, message } = req.body;

    // Lưu vào MongoDB
    const newNotification = new Notification({ title, message });
    await newNotification.save();

    // Gửi thông báo đẩy qua Firebase
    const payload = {
        to: "/topics/all_users",
        notification: { title, body: message }
    };

    try {
        await axios.post("https://fcm.googleapis.com/fcm/send", payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=YOUR_FIREBASE_SERVER_KEY"
            }
        });
        res.json({ success: true, message: "Thông báo đã gửi và lưu vào MongoDB!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Lấy danh sách thông báo
router.get("/getNotifications", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


// Kết nối MongoDB Atlas
const connectionString = `mongodb+srv://admin:${pass}@futurefoodshopdb.asiql.mongodb.net/foodShopDB?appName=FutureFoodShopDB`;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// ========== API CRUD CHO USER ==========
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

    existingProduct.productName = req.body.productName || existingProduct.productName;
    existingProduct.productPrice = req.body.productPrice || existingProduct.productPrice;
    existingProduct.category = req.body.category || existingProduct.category;
    existingProduct.productImage = req.body.productImage || existingProduct.productImage;
    existingProduct.description = req.body.description || existingProduct.description;
    existingProduct.discount = req.body.discount !== undefined ? req.body.discount : existingProduct.discount;
    existingProduct.discountAmount = req.body.discountAmount !== undefined ? req.body.discountAmount : existingProduct.discountAmount;

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
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server chạy tại http://0.0.0.0:${PORT}`));
