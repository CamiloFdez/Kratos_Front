# Kratos Front
Este es el frontend de nuestra aplicación Kratos, diseñada para gestionar laboratorios, reservas, horarios y usuarios. Está desarrollada con React.js y utiliza Vite para la gestión del entorno de desarrollo.

## *Requisitos*
- [Requisitos](#requisitos)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecución](#ejecución)
- [Integrantes](#integrantes)
- [Fotos de la app](#fotos-de-la-app)

## *Requisitos*
Para ejecutar el proyecto, necesitamos:

- Node.js (versión 18 o superior).
- npm (instalado con Node.js).
- Vite (para el entorno de desarrollo).
- React.js (para la interfaz de usuario).
- Un IDE como Visual Studio Code, IntelliJ IDEA o WebStorm.

## *Configuración*
1. Clonar el repositorio mediante la terminal si se tiene instalado github o desde git bash a cualquier carpeta existente en su portatil:
```text
git clone https://github.com/tuusuario/Kratos_Front.git
cd Kratos_Front
```
2. Abrimos desde el editor de codigo que queramos en este caso Visual Studio Code y instalamos las dependecias necesarias desde el terminal del mismo dentro del proyecto:
```text
npm install
npm install react-router-dom
npm install chartjs
npm install react-chartjs-2 chart.js
npm install axios
```
3. Ejecutamos la aplicacion en modo desarrollo mediante lo siguiente:
```text
npm run dev
```
4. Lo abrimos desde el navegador, Por defecto, la aplicación se ejecutará en:
🔗 http://localhost:5173/

## *Estructura del proyecto*
El proyecto esta estructurado de esta manera:
```text
Kratos_Front
├── node_modules          # Dependencias del proyecto (no se sube a GitHub)
├── public                # Archivos estáticos públicos
│   ├── vite.svg
├── src                   # Código fuente principal
│   ├── assets            # Recursos estáticos como imágenes
│   │   ├── react.svg
│   ├── Components        # Componentes de la aplicación
│   │   ├── Auth          # Módulo de autenticación
│   │   │   ├── forgotPassword.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   ├── Dashboard     # Panel principal
│   │   │   ├── analytics.jsx
│   │   │   ├── dashboard.jsx
│   ├── styles           # Estilos CSS de la aplicación
│   │   ├── analytics.css
│   │   ├── App.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── index.css
│   ├── App.jsx          # Componente raíz de React
│   ├── main.jsx         # Punto de entrada de la aplicación
├── .gitignore           # Archivos a ignorar en Git
├── eslint.config.js     # Configuración de ESLint
├── index.html           # Archivo HTML principal
├── package-lock.json           
├── package.json           
├── README.md
```

## *Ejecución:*
Ejecutamos la aplicacion en modo desarrollo mediante lo siguiente:
```text
npm run dev
```
Para generar la versión de producción:
```text
npm run build
```

## *Integrantes*
    - Andrés Jacobo Sepúlveda Sánchez
    - Sebastian Julian Villarraga Guerrero
    - Camilo Andrez Fernandez Diaz
    - Roger Alexander Rodriguez

## *Fotos de la app*
1. Login:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Login.png)
2. Registrarse
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Registrarse.png)
3. Olvide la contraseña:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Olvideco.png)
4. Dashboard:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Dashboard.png)
5. Nueva reserva:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Nuevareserva.png)
6. Contactanos:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Contactanos.png)
7. Laboratorios:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Labs.png)
8. Ver analiticas:
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Analiticas1.png)
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Analiticas2.png)
![imagen](https://github.com/CamiloFdez/Kratos_Front/blob/main/src/assets/Analiticas3.png)