// Giả lập đọc dữ liệu từ file JSON
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Cần cài đặt thư viện uuid

const booksFilePath = path.join(__dirname, '..', '..', '..', 'data', 'books.json');

const readBooksFromFile = () => {
    try {
        const data = fs.readFileSync(booksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Lỗi khi đọc file books.json:", error);
        return [];
    }
};

const writeBooksToFile = (books) => {
    try {
        fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 4), 'utf8');
        return true;
    } catch (error) {
        console.error("Lỗi khi ghi vào file books.json:", error);
        return false;
    }
};

// --- READ OPERATIONS (Đọc) ---
exports.getAllBooks = (page = 1, limit = 10, filters = {}) => { // Phải hỗ trợ Phân trang, Lọc, Tìm kiếm
    const allBooks = readBooksFromFile();

    // 1. Áp dụng logic Lọc và Tìm kiếm (tên sách, tác giả, thể loại, rating)
    let filteredBooks = allBooks.filter(book => {
        // [CẦN TRIỂN KHAI LOGIC LỌC/TÌM KIẾM Ở ĐÂY]
        let matches = true;

        if (filters.genre && book.genre !== filters.genre) matches = false;
        // ... Thêm điều kiện lọc khác

        return matches;
    });

    // 2. Áp dụng logic Phân trang (Pagination)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return {
        books: paginatedBooks,
        totalPages: Math.ceil(filteredBooks.length / limit),
        currentPage: page,
        totalItems: filteredBooks.length
    };
};

exports.getBookByID = (id) => {
    const allBooks = readBooksFromFile();
    return allBooks.find(book => book.id === id);
};

// --- CREATE OPERATION (Tạo) ---
exports.addNewBook = (newBookData) => {
    const allBooks = readBooksFromFile();
    const newBook = { id: uuidv4(), ...newBookData }; // Gán ID duy nhất
    allBooks.push(newBook);

    if (writeBooksToFile(allBooks)) {
        return newBook;
    }
    return null;
};

// --- UPDATE OPERATION (Cập nhật) ---
exports.updateExistingBook = (id, updateData) => {
    let allBooks = readBooksFromFile();
    const index = allBooks.findIndex(book => book.id === id);

    if (index !== -1) {
        allBooks[index] = { ...allBooks[index], ...updateData, id }; // Giữ nguyên ID
        if (writeBooksToFile(allBooks)) {
            return allBooks[index];
        }
    }
    return null; // Không tìm thấy hoặc lỗi ghi file
};

// --- DELETE OPERATION (Xóa) ---
exports.deleteBook = (id) => {
    let allBooks = readBooksFromFile();
    const initialLength = allBooks.length;
    
    const updatedBooks = allBooks.filter(book => book.id !== id);

    if (updatedBooks.length < initialLength) {
        if (writeBooksToFile(updatedBooks)) {
            return true; // Xóa thành công
        }
    }
    return false; // Không tìm thấy hoặc lỗi ghi file
};