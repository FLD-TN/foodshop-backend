/**
 * sampleData.js - Dữ liệu mẫu tiếng Việt dùng chung
 *
 * File này chỉ CHỨA dữ liệu, không tự ghi vào database.
 * Được dùng bởi:
 *   - migrations/001-du-lieu-ban-dau.js  (tự chạy 1 lần khi deploy)
 *   - seed.js                            (chạy tay khi muốn reset sạch)
 */

// Ảnh dùng placeholder để chắc chắn hiển thị được.
// Muốn ảnh thật: thay bằng URL ảnh của bạn, hoặc dùng chức năng
// "Thêm sản phẩm" trong app admin để upload ảnh lên Google Drive.
const img = (text, color) =>
    `https://placehold.co/600x400/${color || "FF6B35"}/FFFFFF.png?text=${encodeURIComponent(text)}`;
const icon = (text, color) =>
    `https://placehold.co/120x120/${color || "FF6B35"}/FFFFFF.png?text=${encodeURIComponent(text)}`;

// ========== DANH MỤC ==========
const categories = [
    { categoryId: "CAT01", categoryName: "Món nước", categoryIcon: icon("Pho", "E63946") },
    { categoryId: "CAT02", categoryName: "Cơm", categoryIcon: icon("Com", "F4A261") },
    { categoryId: "CAT03", categoryName: "Ăn vặt", categoryIcon: icon("An vat", "2A9D8F") },
    { categoryId: "CAT04", categoryName: "Đồ uống", categoryIcon: icon("Do uong", "457B9D") },
    { categoryId: "CAT05", categoryName: "Tráng miệng", categoryIcon: icon("Trang mieng", "9C6644") },
];

// ========== SẢN PHẨM ==========
// LƯU Ý: trường "category" phải khớp với categoryName ở trên, vì app lọc
// sản phẩm bằng cách so sánh chuỗi tên danh mục (ProductListActivity.java).
const rawProducts = [
    // --- Món nước ---
    { productID: "SP001", productName: "Phở bò tái", productPrice: 45000, category: "Món nước", discount: 10,
      description: "Phở bò tái truyền thống, nước dùng ninh xương 8 tiếng, bánh phở tươi, ăn kèm rau thơm và chanh ớt." },
    { productID: "SP002", productName: "Bún bò Huế", productPrice: 50000, category: "Món nước", discount: 0,
      description: "Bún bò Huế đậm đà vị sả và mắm ruốc, có giò heo, chả cua và huyết." },
    { productID: "SP003", productName: "Hủ tiếu Nam Vang", productPrice: 45000, category: "Món nước", discount: 0,
      description: "Hủ tiếu dai mềm, topping tôm, thịt bằm, gan heo và trứng cút." },
    { productID: "SP004", productName: "Bún chả Hà Nội", productPrice: 55000, category: "Món nước", discount: 15,
      description: "Chả viên và thịt ba chỉ nướng than hoa, chấm nước mắm chua ngọt, ăn kèm bún và rau sống." },
    { productID: "SP005", productName: "Mì Quảng gà", productPrice: 48000, category: "Món nước", discount: 0,
      description: "Mì Quảng sợi vàng, thịt gà ta, đậu phộng rang, bánh tráng mè giòn." },

    // --- Cơm ---
    { productID: "SP006", productName: "Cơm tấm sườn bì chả", productPrice: 55000, category: "Cơm", discount: 10,
      description: "Cơm tấm sườn nướng mật ong, bì heo, chả trứng hấp, mỡ hành và nước mắm pha." },
    { productID: "SP007", productName: "Cơm gà xối mỡ", productPrice: 50000, category: "Cơm", discount: 0,
      description: "Đùi gà chiên giòn xối mỡ, cơm chiên vàng ươm, ăn kèm dưa leo và canh." },
    { productID: "SP008", productName: "Cơm chiên Dương Châu", productPrice: 45000, category: "Cơm", discount: 0,
      description: "Cơm chiên tôm, lạp xưởng, trứng và rau củ thập cẩm." },
    { productID: "SP009", productName: "Cơm sườn trứng ốp la", productPrice: 52000, category: "Cơm", discount: 5,
      description: "Sườn cốt lết nướng thơm lừng cùng trứng ốp la lòng đào." },

    // --- Ăn vặt ---
    { productID: "SP010", productName: "Bánh mì thịt nướng", productPrice: 25000, category: "Ăn vặt", discount: 0,
      description: "Bánh mì giòn rụm, thịt nướng thơm, pate, đồ chua và rau mùi." },
    { productID: "SP011", productName: "Gỏi cuốn tôm thịt", productPrice: 35000, category: "Ăn vặt", discount: 0,
      description: "Gỏi cuốn tươi mát với tôm, thịt luộc, bún và rau sống, chấm tương đậu phộng. Phần 4 cuốn." },
    { productID: "SP012", productName: "Bánh tráng trộn", productPrice: 25000, category: "Ăn vặt", discount: 20,
      description: "Bánh tráng trộn khô bò, xoài xanh, trứng cút, rau răm và đậu phộng." },
    { productID: "SP013", productName: "Bánh xèo miền Tây", productPrice: 40000, category: "Ăn vặt", discount: 0,
      description: "Bánh xèo giòn nhân tôm thịt giá đỗ, cuốn rau sống chấm nước mắm chua ngọt." },

    // --- Đồ uống ---
    { productID: "SP014", productName: "Trà sữa trân châu đường đen", productPrice: 35000, category: "Đồ uống", discount: 10,
      description: "Trà sữa béo ngậy cùng trân châu đường đen dai mềm, nấu mới mỗi ngày." },
    { productID: "SP015", productName: "Cà phê sữa đá", productPrice: 25000, category: "Đồ uống", discount: 0,
      description: "Cà phê phin nguyên chất pha sữa đặc, đậm vị truyền thống Việt Nam." },
    { productID: "SP016", productName: "Nước mía tắc", productPrice: 15000, category: "Đồ uống", discount: 0,
      description: "Nước mía ép tươi thêm tắc, giải nhiệt ngày nắng." },
    { productID: "SP017", productName: "Sinh tố bơ", productPrice: 30000, category: "Đồ uống", discount: 0,
      description: "Bơ sáp Đắk Lắk xay cùng sữa đặc, sánh mịn thơm béo." },
    { productID: "SP018", productName: "Trà đào cam sả", productPrice: 32000, category: "Đồ uống", discount: 5,
      description: "Trà đào thanh mát với cam tươi và sả, ít ngọt, nhiều đá." },

    // --- Tráng miệng ---
    { productID: "SP019", productName: "Chè ba màu", productPrice: 20000, category: "Tráng miệng", discount: 0,
      description: "Chè ba màu đậu đỏ, đậu xanh, thạch, nước cốt dừa béo thơm." },
    { productID: "SP020", productName: "Bánh flan caramel", productPrice: 15000, category: "Tráng miệng", discount: 0,
      description: "Bánh flan trứng sữa mềm mịn, caramel đắng nhẹ cân bằng vị ngọt." },
];

// Tự tính discountAmount (số tiền giảm) từ discount (%) để hai trường luôn khớp nhau
const products = rawProducts.map((p) => ({
    ...p,
    productImage: img(p.productName),
    discountAmount: Math.round((p.productPrice * (p.discount || 0)) / 100),
}));

// ========== NGƯỜI DÙNG ==========
const users = [
    { email: "admin@foodshop.vn",  fullName: "Nguyễn Văn Quản", phoneNumber: "0901234567", role: "admin", password: "admin123" },
    { email: "user@foodshop.vn",   fullName: "Trần Thị Mai",    phoneNumber: "0912345678", role: "user",  password: "user123" },
    { email: "hoangnam@gmail.com", fullName: "Lê Hoàng Nam",    phoneNumber: "0923456789", role: "user",  password: "123456" },
    { email: "thuylinh@gmail.com", fullName: "Phạm Thùy Linh",  phoneNumber: "0934567890", role: "user",  password: "123456" },
];

// ========== BANNER ==========
const banners = [
    { BannerID: "BN01", imageBannerURL: img("Giam 30% mon nuoc", "E63946") },
    { BannerID: "BN02", imageBannerURL: img("Freeship don tu 50k", "2A9D8F") },
    { BannerID: "BN03", imageBannerURL: img("Combo com trua 45k", "F4A261") },
];

// ========== THÔNG BÁO ==========
const now = Date.now();
const fmt = (ms) => new Date(ms).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
const notifications = [
    { title: "Chào mừng bạn đến với FoodShop!", timestamp: fmt(now),
      content: "Cảm ơn bạn đã tải ứng dụng. Nhập mã NEWBIE để được giảm 20% cho đơn hàng đầu tiên." },
    { title: "Khuyến mãi cuối tuần", timestamp: fmt(now - 3600e3),
      content: "Giảm đến 20% cho tất cả món ăn vặt, áp dụng thứ Bảy và Chủ nhật hàng tuần." },
    { title: "Miễn phí giao hàng", timestamp: fmt(now - 86400e3),
      content: "Miễn phí giao hàng cho mọi đơn từ 50.000đ trong bán kính 5km." },
];

// ========== ĐƠN HÀNG MẪU ==========
const orders = [
    {
        orderID: "DH001",
        userEmail: "user@foodshop.vn",
        userName: "Trần Thị Mai",
        products: [
            { productID: "SP001", productName: "Phở bò tái",    productPrice: 45000, quantity: 2, productImage: img("Phở bò tái") },
            { productID: "SP015", productName: "Cà phê sữa đá", productPrice: 25000, quantity: 1, productImage: img("Cà phê sữa đá") },
        ],
        totalPrice: 115000,
        paymentMethod: "Tiền mặt",
        status: "PENDING",
        address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
        phoneNumber: "0912345678",
    },
    {
        orderID: "DH002",
        userEmail: "hoangnam@gmail.com",
        userName: "Lê Hoàng Nam",
        products: [
            { productID: "SP006", productName: "Cơm tấm sườn bì chả",         productPrice: 55000, quantity: 1, productImage: img("Cơm tấm sườn bì chả") },
            { productID: "SP014", productName: "Trà sữa trân châu đường đen", productPrice: 35000, quantity: 2, productImage: img("Trà sữa trân châu đường đen") },
        ],
        totalPrice: 125000,
        paymentMethod: "Chuyển khoản",
        status: "COMPLETED",
        address: "45 Lê Lợi, Quận 1, TP.HCM",
        phoneNumber: "0923456789",
    },
];

module.exports = { categories, products, users, banners, notifications, orders };
