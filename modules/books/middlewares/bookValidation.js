const { body, validationResult } = require('express-validator');

// Middleware xử lý kết quả validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Trả về 400 Bad Request nếu validation thất bại [cite: 43]
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: errors.array() 
        });
    }
    next();
};

// Rules cho POST /api/books (Add New Book)
exports.validateNewBook = [
    // Kiểm tra trường 'title'
    body('title')
        .exists().withMessage('Tiêu đề là bắt buộc.')
        .isString().withMessage('Tiêu đề phải là chuỗi.')
        .trim().notEmpty().withMessage('Tiêu đề không được để trống.'),

    // Kiểm tra trường 'author'
    body('author')
        .exists().withMessage('Tác giả là bắt buộc.')
        .isString().withMessage('Tác giả phải là chuỗi.')
        .trim().notEmpty().withMessage('Tác giả không được để trống.'),

    // Kiểm tra trường 'rating' (nếu có)
    body('rating')
        .optional()
        .isFloat({ min: 1, max: 5 }).withMessage('Rating phải là số từ 1 đến 5.'),
    
    // Kiểm tra trường 'publicationYear' (nếu có)
    body('publicationYear')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() }).withMessage(`Năm xuất bản phải là năm hợp lệ (4 chữ số).`),
    
    handleValidationErrors // Xử lý lỗi sau khi áp dụng rules
];

// Rules cho PUT /api/books/:id (Update Book)
exports.validateUpdateBook = [
    // Tương tự như POST, nhưng tất cả đều là optional vì người dùng có thể chỉ cập nhật một trường.
    body('title').optional().isString().trim().notEmpty().withMessage('Tiêu đề không được để trống.'),
    body('author').optional().isString().trim().notEmpty().withMessage('Tác giả không được để trống.'),
    body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating phải là số từ 1 đến 5.'),
    body('publicationYear').optional().isInt({ min: 1000, max: new Date().getFullYear() }).withMessage(`Năm xuất bản phải là năm hợp lệ.`),
    
    handleValidationErrors
];