#!/bin/bash
# Script para ejecutar la aplicación de notas en Linux/macOS
# Backend: Node.js + Express + MySQL
# Frontend: React SPA

echo "🚀 Iniciando aplicación de notas..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "[ERROR] Docker no está instalado. Por favor instala Docker primero."
    echo "[INFO] Descarga desde: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "[ERROR] Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

echo "[SUCCESS] Docker está instalado"
docker --version
docker-compose --version

# Verificar si Docker está corriendo
if ! docker info &> /dev/null; then
    echo "[INFO] Docker no está corriendo. Iniciando Docker..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open -a Docker
    else
        # Linux
        sudo systemctl start docker
    fi
    
    # Esperar a que Docker esté listo
    echo "[INFO] Esperando a que Docker esté listo... (puede tomar 1-2 minutos)"
    while ! docker info &> /dev/null; do
        echo "[INFO] Esperando Docker... (puede tomar más tiempo en el primer uso)"
        sleep 10
    done
fi

echo "[SUCCESS] Docker está listo"

# Limpiar contenedores y volúmenes anteriores
echo "[INFO] Limpiando contenedores y volúmenes anteriores..."
docker-compose down -v

# Construir y levantar todos los servicios
echo "[INFO] Construyendo y levantando todos los servicios..."
echo "[INFO] Esto puede tomar varios minutos la primera vez..."
docker-compose up --build -d

# Esperar a que todos los servicios estén listos
echo "[INFO] Esperando a que todos los servicios estén listos..."
sleep 30

# Verificar que las tablas se crearon
echo "[INFO] Verificando estructura de la base de datos..."
if ! docker exec notes_mysql mysql -u user -ppassword -e "SHOW TABLES;" GeronimoCordoba &> /dev/null; then
    echo "[WARNING] Las tablas no se crearon automáticamente. Creándolas manualmente..."
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Notes (idNotes INT AUTO_INCREMENT, title VARCHAR(100), content TEXT, archived BOOLEAN DEFAULT FALSE, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(idNotes));"
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Categories (idCategories INT AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY(idCategories));"
    docker exec notes_mysql mysql -u user -ppassword GeronimoCordoba -e "CREATE TABLE IF NOT EXISTS Category_Notes (note_id INT, category_id INT, PRIMARY KEY(note_id, category_id), FOREIGN KEY(note_id) REFERENCES Notes(idNotes) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES Categories(idCategories) ON DELETE CASCADE);"
    echo "[SUCCESS] Tablas creadas correctamente"
fi

# Mostrar estado de los servicios
echo "[INFO] Estado de los servicios:"
docker-compose ps

echo ""
echo "[SUCCESS] 🎉 Aplicación iniciada correctamente!"
echo "[INFO] Frontend: http://localhost:3001"
echo "[INFO] Backend: http://localhost:3000"
echo "[INFO] Base de datos: MySQL en puerto 3306"
echo ""
echo "[INFO] La aplicación se abrirá automáticamente en tu navegador"
echo "[INFO] Presiona Ctrl+C para detener la aplicación"
echo ""

# Abrir el navegador
if command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3001
elif command -v open &> /dev/null; then
    # macOS
    open http://localhost:3001
fi

# Mostrar logs en tiempo real
docker-compose logs -f