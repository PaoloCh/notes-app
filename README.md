# Notes App - Full Stack Challenge

This is a simple note-taking web application built as a full-stack challenge. It allows users to create, edit, delete, and manage notes with categories.

## Technologies Used

### Backend
- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Data JPA / Hibernate**
- **MySQL 8.0**
- **Maven**

### Frontend
- **React 18**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Axios**

### DevOps
- **Docker & Docker Compose**

---

## How to Run the Application

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/) must be installed on your system.
- Git.

### Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/hirelens-challenges/Checa-049dee.git
   cd Checa-049dee
   ```

2. **Make the run script executable (only for Linux/macOS):**
   ```bash
   chmod +x run.sh
   ```

3. **Run the application:**
   ```bash
   sudo ./run.sh
   ```
   This command will build the Docker images and start the database, backend, and frontend containers.

4. **Access the application:**
   - **Frontend:** Open your browser and go to `http://localhost:5173`
   - **Backend API Documentation (Swagger):** `http://localhost:8080/swagger-ui.html`

---

## Login Information

A default user is created automatically to test the application.
- **Username:** `admin`
- **Password:** `admin123`