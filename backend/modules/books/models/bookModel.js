import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const filePath = "./data/books.json";

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync("./data", { recursive: true });
    fs.writeFileSync(filePath, "[]", "utf8");
  }
}

function readData() {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function getAllBooks() {
  return readData();
}

export function getBookById(id) {
  const books = readData();
  return books.find(book => book.id === id);
}

export function addNewBook(bookData) {
  const books = readData();
  const newBook = { id: uuidv4(), ...bookData };
  books.push(newBook);
  writeData(books);
  return newBook;
}

export function updateBook(id, updatedData) {
  const books = readData();
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;

  books[index] = { ...books[index], ...updatedData };
  writeData(books);
  return books[index];
}

export function deleteBook(id) {
  const books = readData();
  const index = books.findIndex(book => book.id === id);
  if (index === -1) return null;

  const deleted = books[index];
  books.splice(index, 1);
  writeData(books);
  return deleted;
}
