[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)](https://socket.io/)

This is the backend server for the **TurboSMS** mobile messenger. This project powers all business logic, data persistence, and real-time communication for the client application.

The server exposes a REST API for data management and utilizes WebSockets (via Socket.IO) for instant messaging.

📱 **Frontend (Client) Repository:** [TurboSMS React Native Client](https://github.com/SerjRoman/turbo-sms1600)

---

### ✨ Features

*   **RESTful API:** A well-defined API for managing users, contacts, chats, and messages.
*   **JWT-Based Authentication:** Secure user registration and login flow using JSON Web Tokens.
*   **Real-Time Messaging:** Instant message delivery and reception powered by Socket.IO.
*   **Layered Architecture:** A clean, modular structure (Controllers, Services, Repositories) for maintainability and scalability.
*   **Strictly-Typed:** The entire codebase is written in TypeScript, ensuring type safety and code reliability.
*   **Modern ORM:** Uses Prisma for intuitive and safe database interactions.

### 🔧 Tech Stack

*   **Framework:** [Express.js](https://expressjs.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** [SQLite](https://www.sqlite.org/index.html) (for development), designed for easy migration to [PostgreSQL](https.www.postgresql.org/) for production.
*   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
*   **WebSockets:** [Socket.IO](https://socket.io/)
*   **Validation:** Custom middleware for validating request bodies.

### 🏗️ Project Architecture

The project follows a layered architecture to ensure a clear separation of concerns.

*   **`Controllers`**: Handle incoming HTTP requests, validate request data, and orchestrate responses by calling the appropriate services.
*   **`Services`**: Contain the core business logic of the application. They coordinate operations between repositories and perform complex tasks.
*   **`Repositories`**: Abstract the data access layer. All database queries and interactions with Prisma are encapsulated here.
*   **`Middlewares`**: Provide reusable logic for tasks like JWT authorization, error handling, and logging.

### 🏁 Getting Started

Follow these steps to get a local copy of the server up and running.

#### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Git](https://git-scm.com/)

#### Installation & Launch

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SerjRoman/BackendProject1600
    cd 
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root
    ```
    Modify the `.env` file with your configuration. For local development with SQLite, it's already set up.
    ```dotenv
    # Database URL for SQLite (creates a file in the prisma/ directory)
    DATABASE_URL="file:./prisma/dev.db"

    # Secret key for signing JWTs
    JWT_SECRET="your-super-secret-key-that-is-long-and-random"
    ```

4.  **Apply database migrations:**
    This command will create the SQLite database file (`dev.db`) and set up the schema based on `prisma/schema.prisma`.
    ```bash
    npm run prisma:migrate
    ```

5.  **(Optional) Seed the database:**
    If you have a seed script, you can populate the database with initial data.
    ```bash
    npx prisma db seed
    ```

6.  **Start the development server:**
    The server will run with hot-reloading.
    ```bash
    npm run start
    ```

The server will now be running on `http://localhost:8000`.

### 📑 API Endpoints (Examples)

| Method | Endpoint                | Description                       | Protected |
| :----- | :---------------------- | :-------------------------------- | :-------- |
| `POST` | `/api/user/register`    | Register a new user.              | No        |
| `POST` | `/api/user/login`       | Log in and receive a JWT.         | No        |
| `GET`  | `/api/users/me`         | Get the current user's profile.   | JWT       |
| `GET`  | `/api/contacts`         | Get the user's contact list.      | JWT       |
| `POST` | `/api/contacts/create`         | Add a new contact.                | JWT       |
| `GET`  | `/api/chats`            | Get all of the user's chats.      | JWT       |
| `POST` | `/api/chats/create`            | Create a new chat with a user.    | JWT       |

### 🗺️ Roadmap & Future Ideas

Here is a list of planned enhancements and features to improve the project.

#### Code Quality & Refactoring
*   [ ] **Strict Controller Typing:** Implement strict DTOs (Data Transfer Objects) and validation to type-safe the controller layer.
*   [ ] **Code Refactoring:** Continuously refactor services and repositories to improve readability, performance, and maintainability.
*   [ ] **Expand CRUD Operations:** Add standard `update` and `delete` endpoints for all relevant modules (e.g., contacts, user profile).
*   [ ] **Comprehensive Testing:** Cover all services and critical controllers with unit and integration tests using Jest and Supertest.

#### New Features
*   [ ] **File Uploads:** Implement an endpoint for uploading user avatars and other media.
*   [ ] **Push Notifications:** Integrate with a service like Firebase Cloud Messaging (FCM) to notify users of new messages.
*   [ ] **Presence Indicators:** Enhance the Socket.IO implementation to include "online" and "typing..." status indicators.
*   [ ] **API Documentation:** Generate and host API documentation using Swagger or OpenAPI.

### 🖼️ Application in Action (Client Screenshots)

These screenshots from the client application demonstrate the features powered by this API.

![Chat List Screen](https://github.com/user-attachments/assets/751b1b46-b2b0-4bdc-a3fe-98f91ca3a648)
![Chat Screen](https://github.com/user-attachments/assets/83a2d7df-e1f9-4c64-8cda-ed28ce5a7d59)
![Contacts Screen](https://github.com/user-attachments/assets/f9f9c1af-add9-428a-9993-197779a289e4)
![Register Screen](https://github.com/user-attachments/assets/a3a7797c-08ff-46f9-a744-8060dd32b899)
![Login Screen](https://github.com/user-attachments/assets/1a60ebe4-4a93-4cb6-8521-b66551bb712f)
![Search Screen](https://github.com/user-attachments/assets/1e9922f6-a319-4720-aa97-ef13710bd347)
![Create Chat Screen](https://github.com/user-attachments/assets/198c2bf1-9efc-4467-982f-8e0a92b9ab5d)
![Profile Screen](https://github.com/user-attachments/assets/5550ecba-4730-4a54-986b-51527fe8328a)
