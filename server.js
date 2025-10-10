const express = require('express');
const app = express();
const PORT = 3000;

// 1. Application-Level Middlewares: Parsing Request Bodies [cite: 17, 18]
app.use(express.json()); // Xử lý JSON body
app.use(express.urlencoded({ extended: true })); // Xử lý form data

// Import routes từ module books
const bookRoutes = require('./modules/books/routes/bookRoutes');

// Định nghĩa route chính
app.use('/api/books', bookRoutes);

// --- Application-Level Middlewares (Error Handling) ---

// 2. 404 Not Found Handler [cite: 19]
app.use((req, res, next) => {
    // Trả về 404 Not Found khi không có route nào khớp [cite: 44]
    res.status(404).json({ message: "404 Not Found. The requested route does not exist." });
});

// 3. Global Error-handling Middleware [cite: 20]
app.use((err, req, res, next) => {
    console.error(err.stack); // Ghi lại lỗi [cite: 20]
    
    // Trả về 500 Internal Server Error [cite: 20, 45]
    res.status(500).json({ 
        message: "500 Internal Server Error. Something broke on the server!",
        error: err.message 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});