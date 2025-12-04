# BookManagement-Phase2
Phase 2 Features Implemented

Modular Architecture: The project is organized into a feature-based module for "books," with separate folders for models, routes, and middlewares.
Data Source: A data/books.json file was created to act as the database, populated with sample book entries.
CRUD Logic in Models: All business logic for creating, reading, updating, and deleting books is handled exclusively within bookModel.js.
Independent Express Routes: All API endpoints for the books resource were defined using Express Router in a dedicated bookRoutes.js file.
Validation Middleware: Used express-validator to create middleware that validates incoming data for POST and PUT requests, ensuring data integrity.
Application Middlewares: The main server.js file includes essential middlewares for parsing JSON request bodies, handling 404 errors, and managing centralized server errors.
Proper HTTP Responses: The API consistently returns JSON and uses correct HTTP status codes for all operations (200, 201, 400, 404, 500).
Advanced Functionality: Implemented server-side pagination and filtering on the GET /api/books endpoint.

Tien Trung Ngo – N01692082:
Designed the project's modular folder structure and set up the initial Express server.
Implemented the model functions for reading and deleting books (getAllBooks, getBookByID, deleteBook).

Thien Binh Vu – N01711643:
Developed the validation middleware using express-validator for creating and updating books.
Implemented the model functions for creating and updating books (addNewBook, updateExistingBook).