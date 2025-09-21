@echo off
REM Script mejorado para ejecutar la aplicación de notas automáticamente
REM Backend: Node.js + Express + MySQL
REM Frontend: React SPA

echo 🚀 Iniciando aplicación de notas...

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no está instalado. Por favor instala Node.js 18.17 o superior.
    echo [INFO] Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker no está instalado. Por favor instala Docker Desktop primero.
    echo [INFO] Descarga desde: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo [SUCCESS] Versiones verificadas:
node --version
npm --version
docker --version

REM Iniciar Docker Desktop si no está corriendo
echo [INFO] Verificando Docker Desktop...
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Docker Desktop no está corriendo. Iniciando...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe" 2>nul
    if %errorlevel% neq 0 (
        echo [WARNING] No se pudo iniciar Docker Desktop automáticamente.
        echo [INFO] Por favor inicia Docker Desktop manualmente y ejecuta este script nuevamente.
        pause
        exit /b 1
    )
    
    REM Esperar a que Docker esté listo
    echo [INFO] Esperando a que Docker Desktop esté listo... (puede tomar 1-2 minutos)
    :wait_docker
    docker ps >nul 2>&1
    if %errorlevel% neq 0 (
        echo [INFO] Esperando Docker... (puede tomar más tiempo en el primer uso)
        timeout /t 10 /nobreak >nul
        goto wait_docker
    )
)

echo [SUCCESS] Docker está listo

REM Crear archivo .env si no existe
if not exist .env (
    echo [INFO] Creando archivo .env...
    (
        echo PORT=3000
        echo DB_USER=user
        echo DB_PASSWORD=password
        echo DB_HOST=localhost
        echo DB_DATABASE=GeronimoCordoba
        echo DB_PORT=3306
    ) > .env
    echo [SUCCESS] Archivo .env creado
)

REM Limpiar contenedores y volúmenes existentes
echo [INFO] Limpiando contenedores anteriores...
docker-compose down >nul 2>&1
docker volume rm notes-app_db_data >nul 2>&1

REM Iniciar base de datos con Docker Compose
echo [INFO] Iniciando base de datos MySQL con Docker...
docker-compose up -d db

REM Esperar a que la base de datos esté lista
echo [INFO] Esperando a que la base de datos esté lista...
timeout /t 15 /nobreak >nul

REM Verificar que la base de datos esté corriendo
:wait_db
docker-compose ps | findstr "db.*Up" >nul
if %errorlevel% neq 0 (
    echo [INFO] Esperando base de datos... (puede tomar más tiempo en el primer uso)
    timeout /t 5 /nobreak >nul
    goto wait_db
)

echo [SUCCESS] Base de datos iniciada correctamente

REM Verificar que las tablas se crearon correctamente
echo [INFO] Verificando estructura de la base de datos...
timeout /t 5 /nobreak >nul

REM Instalar dependencias del backend
echo [INFO] Instalando dependencias del backend...
if not exist package.json (
    echo [ERROR] No se encontró package.json en el directorio raíz
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Error al instalar dependencias del backend
    exit /b 1
)

echo [SUCCESS] Dependencias del backend instaladas

REM Iniciar backend en background
echo [INFO] Iniciando servidor backend...
start /b npm start

REM Esperar un momento para que el backend se inicie
timeout /t 8 /nobreak >nul

REM Verificar que el backend esté funcionando
echo [INFO] Verificando backend...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Backend puede no estar completamente listo, pero continuando...
)

REM Instalar dependencias del frontend
echo [INFO] Instalando dependencias del frontend...
cd frontend
if not exist package.json (
    echo [ERROR] No se encontró package.json en el directorio frontend
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Error al instalar dependencias del frontend
    exit /b 1
)

echo [SUCCESS] Dependencias del frontend instaladas

REM Iniciar frontend
echo.
echo [SUCCESS] 🎉 Aplicación iniciada correctamente!
echo [INFO] Backend: http://localhost:3000
echo [INFO] Frontend: http://localhost:3001
echo [INFO] Base de datos: MySQL en puerto 3306
echo.
echo [INFO] La aplicación se abrirá automáticamente en tu navegador
echo [INFO] Presiona Ctrl+C para detener la aplicación
echo.

REM Iniciar frontend (esto bloqueará el script)
call npm start
