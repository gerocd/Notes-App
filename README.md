# 📝 Aplicación de Notas - Full Stack

Una aplicación web completa para gestionar notas con categorías, desarrollada con React, Node.js, Express y MySQL.

## 🚀 Características

### Fase 1 - Gestión de Notas
- ✅ Crear, editar y eliminar notas
- ✅ Archivar/desarchivar notas
- ✅ Listar notas activas y archivadas
- ✅ Búsqueda de notas

### Fase 2 - Categorías
- ✅ Crear y gestionar categorías
- ✅ Asignar categorías a notas
- ✅ Filtrar notas por categoría
- ✅ Visualización de categorías en las notas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React**: 18.2.0
- **React Router DOM**: 6.8.1
- **Axios**: 1.3.4
- **Node.js**: 18.17.0 (para desarrollo)

### Backend
- **Node.js**: 18.17.0
- **Express**: 4.19.2
- **MySQL**: 8.0
- **MySQL2**: 3.9.4
- **CORS**: 2.8.5
- **Morgan**: 1.10.0
- **Dotenv**: 16.4.5

### Base de Datos
- **MySQL**: 8.0
- **Docker**: Para containerización

### Herramientas de Desarrollo
- **Docker**: 24.0.0+
- **Docker Compose**: 2.0.0+
- **NPM**: 9.6.0+

## 📋 Requisitos del Sistema

### Mínimos
- **Docker Desktop**: 24.0.0 o superior
- **Docker Compose**: 2.0.0 o superior
- **Node.js**: 18.17.0 o superior (para desarrollo local)
- **NPM**: 9.6.0 o superior

### Recomendados
- **RAM**: 4GB o más
- **Espacio en disco**: 2GB libres
- **Sistema operativo**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+

## 🚀 Instalación y Ejecución

### Opción 1: Ejecución Automática (Recomendada)

#### Windows
```bash
# Clonar el repositorio
git clone <repository-url>
cd Notes-App

# Ejecutar la aplicación
start.bat
```

#### Linux/macOS
```bash
# Clonar el repositorio
git clone <repository-url>
cd Notes-App

# Dar permisos de ejecución
chmod +x run.sh

# Ejecutar la aplicación
./run.sh
```

### Opción 2: Ejecución Manual

```bash
# 1. Iniciar la base de datos
docker-compose up -d db

# 2. Instalar dependencias del backend
npm install

# 3. Iniciar el backend
npm start

# 4. En otra terminal, instalar dependencias del frontend
cd frontend
npm install

# 5. Iniciar el frontend
npm start
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **Base de datos**: localhost:3306

## 📁 Estructura del Proyecto

```
Notes-App/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── services/        # Servicios API
│   │   └── App.js          # Componente principal
│   ├── package.json
│   └── Dockerfile
├── src/                     # Backend Node.js
│   ├── controllers/         # Controladores
│   ├── services/           # Servicios de negocio
│   ├── repositories/       # Repositorios de datos
│   ├── routes/             # Rutas de la API
│   └── db.js              # Configuración de BD
├── db/
│   └── init.sql           # Script de inicialización
├── docker-compose.yml     # Configuración Docker
├── Dockerfile            # Dockerfile del backend
├── start.bat            # Script de inicio Windows
├── run.sh              # Script de inicio Linux/macOS
└── README.md
```

## 🔧 Comandos Útiles

### Docker
```bash
# Ver estado de contenedores
docker-compose ps

# Ver logs
docker-compose logs

# Detener todos los servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v

# Reconstruir contenedores
docker-compose up --build
```

### Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm start
```

## 📊 API Endpoints

### Notas
- `GET /api/notes` - Obtener todas las notas activas
- `GET /api/notes/archived` - Obtener notas archivadas
- `POST /api/notes` - Crear nueva nota
- `PUT /api/notes/:id` - Actualizar nota
- `DELETE /api/notes/:id` - Eliminar nota
- `POST /api/notes/:id/archive` - Archivar nota

### Categorías
- `GET /api/categories/all` - Obtener todas las categorías
- `POST /api/categories/add-category` - Crear nueva categoría
- `POST /api/categories/add-category-tonote` - Asignar categoría a nota
- `DELETE /api/categories/remove-category-fromnote` - Quitar categoría de nota
- `GET /api/categories/notes-by-category/:id` - Obtener notas por categoría

## 🗄️ Base de Datos

### Tablas
- **Notes**: Almacena las notas
- **Categories**: Almacena las categorías
- **Category_Notes**: Relación many-to-many entre notas y categorías

### Estructura
```sql
-- Tabla Notes
CREATE TABLE Notes (
  idNotes INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  archived BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Categories
CREATE TABLE Categories (
  idCategories INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

-- Tabla Category_Notes
CREATE TABLE Category_Notes (
  note_id INT,
  category_id INT,
  PRIMARY KEY(note_id, category_id),
  FOREIGN KEY(note_id) REFERENCES Notes(idNotes) ON DELETE CASCADE,
  FOREIGN KEY(category_id) REFERENCES Categories(idCategories) ON DELETE CASCADE
);
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
```bash
# Verificar que Docker esté corriendo
docker ps

# Reiniciar la base de datos
docker-compose restart db
```

### Error de permisos en Linux/macOS
```bash
# Dar permisos de ejecución al script
chmod +x run.sh
```

### Error de puertos ocupados
```bash
# Verificar qué está usando los puertos
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Detener servicios conflictivos
docker-compose down
```
