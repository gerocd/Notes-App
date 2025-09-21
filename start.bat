@echo off
REM Script mejorado para levantar toda la aplicación con Docker Compose

echo 🚀 Iniciando aplicación de notas con Docker...

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no está instalado. Por favor instala Docker Desktop primero.
    echo [INFO] Descarga desde: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

REM Verificar si Docker Compose está instalado
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose no está instalado. Por favor instala Docker Compose primero.
    pause
    exit /b 1
)

echo [SUCCESS] Docker está instalado
docker --version
docker-compose --version

REM Limpiar contenedores y volúmenes anteriores
echo [INFO] Limpiando contenedores y volúmenes anteriores...
docker-compose down -v

REM Construir y levantar todos los servicios
echo [INFO] Construyendo y levantando todos los servicios...
echo [INFO] Esto puede tomar varios minutos la primera vez...
docker-compose up --build -d

REM Esperar a que todos los servicios estén listos
echo [INFO] Esperando a que todos los servicios estén listos...
timeout /t 30 /nobreak >nul

REM Verificar que las tablas se crearon
echo [INFO] Verificando estructura de la base de datos...
docker exec notes_mysql mysql -u user -ppassword -e "SHOW TABLES;" GeronimoCordoba >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Las tablas no se crearon automáticamente. Creándolas manualmente...
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Notes (idNotes INT AUTO_INCREMENT, title VARCHAR(100), content TEXT, archived BOOLEAN DEFAULT FALSE, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(idNotes));"
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Categories (idCategories INT AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY(idCategories));"
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Category_Notes (note_id INT, category_id INT, PRIMARY KEY(note_id, category_id), FOREIGN KEY(note_id) REFERENCES Notes(idNotes) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES Categories(idCategories) ON DELETE CASCADE);"
    echo [SUCCESS] Tablas creadas correctamente
)

REM Mostrar estado de los servicios
echo [INFO] Estado de los servicios:
docker-compose ps

echo.
echo [SUCCESS] 🎉 Aplicación iniciada correctamente!
echo [INFO] Frontend: http://localhost:3001
echo [INFO] Backend: http://localhost:3000
echo [INFO] Base de datos: MySQL en puerto 3306
echo.
echo [INFO] La aplicación se abrirá automáticamente en tu navegador
echo [INFO] Presiona Ctrl+C para detener la aplicación
echo.

REM Abrir el navegador
start http://localhost:3001

REM Mostrar logs en tiempo real
docker-compose logs -f
