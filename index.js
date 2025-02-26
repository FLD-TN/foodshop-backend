const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const pass = process.env.PW;

app.use(cors());    
app.use(bodyParser.json());

// Kết nối MongoDB Atlas
const connectionString = `mongodb+srv://admin:${pass}@futurefoodshopdb.asiql.mongodb.net/foodShopDB?appName=FutureFoodShopDB`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Kết nối MongoDB thành công'))
.catch(err => console.log('Lỗi: ', err));

// Schema cho User
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Schema cho Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String
});
const Product = mongoose.model('Product', productSchema);

// API CRUD cho User
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            status: true,
            user
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API đăng nhập
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Request received - Email:', email, 'Password:', password);
        const user = await User.findOne({ email });
        console.log('User from DB:', user);
        if (user && user.password === password) {
            console.log('Login successful for:', email);
            res.json({
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role.toLowerCase()
            });
        } else {
            console.log('Login failed - User exists:', !!user, 'Password match:', user ? user.password === password : false);
            res.status(401).json({ status: false, error: 'Email hoặc mật khẩu không đúng' });
        }
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Sửa thông tin người dùng bằng email
app.put('/api/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Cập nhật thất bại!', error });
    }
});



// Xóa người dùng bằng email
app.delete('/api/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete({ email });
        if (deletedUser) {
            res.json({ message: 'Xóa người dùng thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy người dùng!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Xóa thất bại!', error });
    }
});

app.get('/api/users/search', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: 'Vui lòng cung cấp email để tìm kiếm!' });
        }
        // Tìm kiếm gần đúng với regex không phân biệt hoa thường
        const users = await User.find({ email: { $regex: email, $options: 'i' } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API CRUD cho Product
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            status: true,
            product
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Chạy server
app.listen(3000, '0.0.0.0', () => console.log('Server chạy tại http://0.0.0.0:3000'));

// dòng này để test deploy ^_^