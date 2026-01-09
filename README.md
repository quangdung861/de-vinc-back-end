## 📌 Project Description

**De Vinc Back End** is the backend service of the **De Vinc** platform, responsible for handling business logic, authentication, database operations, and API communication for the frontend.

The project is built with **NestJS** and uses **MySQL** with **TypeORM**, focusing on **clean architecture**, **scalability**, and **maintainability**.

---

## 📦 Technologies Used

| Technology                          | Purpose                        |
| ----------------------------------- | ------------------------------ |
| NestJS                              | Backend framework              |
| TypeScript                          | Strongly typed language        |
| MySQL                               | Relational database            |
| TypeORM                             | ORM & database migrations      |
| Cloudinary                          | File & image upload            |
| Class-validator / Class-transformer | DTO validation                 |

---

## 🛠 Install & Run project

### 1. Clone repository

```bash
git clone https://github.com/quangdung861/de-vinc-back-end.git
cd de-vinc-back-end
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.development` or `.env.production` or **both** file in the project root based on .env.example: file in the root directory and configure the required environment variables to connect to the backend:

```bash
# ENV
NODE_ENV=development

# DATABASE
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=

# SERVER
PORT=8080

# CORS
CLIENT_ORIGINS=http://localhost:3000

# IMAGES REPOSITORY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Run the project in development mode

```bash
npm start:dev
# or
yarn start:dev
```
**or**
```bash
npm start:dev:prod
# or
yarn start:dev:prod
```

The application will be available at:
👉 http://localhost:3000

### 5. Build for production

```bash
npm run build 
# or
yarn build
```
