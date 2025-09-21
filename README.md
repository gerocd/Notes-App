# Notes Application - Full Stack

## Features

### Phase 1 – Note Management
- Create, edit, and delete notes
- Archive/unarchive notes
- List active and archived notes
- Search notes

### Phase 2 – Categories
- Create and manage categories
- Assign categories to notes
- Filter notes by category
- Display categories on notes

## Technologies Used

### Frontend
- **React**: 18.2.0
- **React Router DOM**: 6.8.1
- **Axios**: 1.3.4
- **Node.js**: 18.17.0 (for development)

### Backend
- **Node.js**: 18.17.0
- **Express**: 4.19.2
- **MySQL**: 8.0
- **MySQL2**: 3.9.4
- **CORS**: 2.8.5
- **Morgan**: 1.10.0
- **Dotenv**: 16.4.5

### Database
- **MySQL**: 8.0
- **Docker**: For containerization

### Development Tools
- **Docker**: 24.0.0+
- **Docker Compose**: 2.0.0+
- **NPM**: 9.6.0+

## Installation and Running

### Option 1: Automatic Execution

#### Windows
```
# Clone the repository
git clone <repository-url>
cd Notes-App

# Run the application
start.bat
```

#### Linux/macOS
```
# Clone the repository
git clone <repository-url>
cd Notes-App

# Grant execution permissions
chmod +x run.sh

# Run the application
./run.sh
```

### Option 2: Manual Execution (Recommended – Always Works)

```
# 1. Start the database
docker-compose up -d db

# 2. Install backend dependencies
npm install

# 3. Start the backend
npm start

# 4. In another terminal, install frontend dependencies
cd frontend
npm install

# 5. Start the frontend
npm start
```

## Access URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Database**: localhost:3306

## Project Structure

```
Notes-App/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── App.js           # Main component
│   ├── package.json
│   └── Dockerfile
├── src/                     # Node.js backend
│   ├── controllers/         # Controllers
│   ├── services/            # Business services
│   ├── repositories/        # Data repositories
│   ├── routes/              # API routes
│   └── db.js                # Database configuration
├── db/
│   └── init.sql             # Initialization script
├── docker-compose.yml       # Docker configuration
├── Dockerfile              # Backend Dockerfile
├── start.bat               # Windows start script
├── run.sh                  # Linux/macOS start script
└── README.md
```
##
### Tables
- **Notes**: Stores the notes
- **Categories**: Stores the categories
- **Category_Notes**: Many-to-many relationship between notes and categories

### Structure
```
-- Notes table
CREATE TABLE Notes (
  idNotes INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  archived BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE Categories (
  idCategories INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

-- Category_Notes table
CREATE TABLE Category_Notes (
  note_id INT,
  category_id INT,
  PRIMARY KEY(note_id, category_id),
  FOREIGN KEY(note_id) REFERENCES Notes(idNotes) ON DELETE CASCADE,
  FOREIGN KEY(category_id) REFERENCES Categories(idCategories) ON DELETE CASCADE
);
```
