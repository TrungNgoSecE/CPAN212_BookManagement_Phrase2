const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModel'); // Gọi Model [cite: 30]
const { validateNewBook, validateUpdateBook } = require('../middlewares/bookValidation'); // Gọi Validation [cite: 36]

// GET /api/books - Lấy tất cả sách (hỗ trợ phân trang, tìm kiếm, lọc)
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filters = req.query; // Chứa genre, author, rating, title/search query

    try {
        const result = bookModel.getAllBooks(page, limit, filters);
        // 200 OK cho GET thành công [cite: 41]
        res.status(200).json(result); 
    } catch (error) {
        // Lỗi xảy ra trong quá trình đọc file/xử lý
        console.error(error); 
        res.status(500).json({ message: "Internal Server Error" }); // 500 cho lỗi server [cite: 45]
    }
});

// GET /api/books/:id - Xem chi tiết sách
router.get('/:id', (req, res) => {
    const book = bookModel.getBookByID(req.params.id);

    if (book) {
        // 200 OK [cite: 41]
        res.status(200).json(book);
    } else {
        // 404 Not Found [cite: 44]
        res.status(404).json({ message: 'Resource not found' }); 
    }
});

// POST /api/books - Thêm sách mới (CẦN VALIDATION)
router.post('/', validateNewBook, (req, res) => { // Sử dụng middleware validation
    const newBook = bookModel.addNewBook(req.body);

    if (newBook) {
        // 201 Created cho POST thành công [cite: 42]
        res.status(201).json(newBook); 
    } else {
        // 500 Internal Server Error (Lỗi ghi file) [cite: 45]
        res.status(500).json({ message: 'Could not add book due to server error.' });
    }
});

// PUT /api/books/:id - Cập nhật sách (CẦN VALIDATION)
router.put('/:id', validateUpdateBook, (req, res) => { // Sử dụng middleware validation
    const updatedBook = bookModel.updateExistingBook(req.params.id, req.body);

    if (updatedBook) {
        // 200 OK [cite: 41]
        res.status(200).json(updatedBook); 
    } else {
        // 404 Not Found nếu không tìm thấy ID [cite: 44]
        res.status(404).json({ message: 'Resource not found' }); 
    }
});

// DELETE /api/books/:id - Xóa sách
router.delete('/:id', (req, res) => {
    const success = bookModel.deleteBook(req.params.id);

    if (success) {
        // 200 OK [cite: 41]
        res.status(200).json({ message: 'Book deleted successfully' }); 
    } else {
        // 404 Not Found nếu không tìm thấy ID [cite: 44]
        res.status(404).json({ message: 'Resource not found' });
    }
});

module.exports = router;