# 🎓 UCV - Career Tracker (Ingeniería Eléctrica)

![Testing Suite](https://github.com/edwarhman/career-tracker/actions/workflows/test.yml/badge.svg)

Un dashboard interactivo y moderno diseñado para que los estudiantes de **Ingeniería Eléctrica de la Universidad Central de Venezuela (UCV)** puedan gestionar y visualizar su progreso académico de forma intuitiva.

![Dashboard Preview](https://via.placeholder.com/800x450/1e293b/f8fafc?text=Career+Tracker+UCV+Preview)

## ✨ Características Principales

*   **Matriz de Pensum Completa**: Visualización de los 10 semestres de la carrera, divididos en Ciclo Básico (1-7) y Ciclo de Especialización (8-10).
*   **Soporte multi-especialidad**: Gestiona las 4 menciones de la carrera: **Sistemas de Potencia**, **Electrónica**, **Industrial** y **Telecomunicaciones**.
*   **Lógica de Requisitos Inteligente**: El sistema bloquea automáticamente las materias cuyos pre-requisitos o unidades de crédito no se hayan cumplido. 
*   **Sistema de Alertas con Tooltip**: Si una materia está bloqueada, un icono de advertencia te detalla exactamente qué te falta para poder cursarla.
*   **Persistencia de Datos**: Tu progreso se guarda automáticamente en el navegador (`localStorage`), permitiéndote cerrar la página sin perder tus avances.
*   **Importación/Exportación**: Exporta tu progreso a un archivo JSON o impórtalo desde otro dispositivo de forma minimalista y rápida.
*   **Navegación Fluida**: Sistema de slider horizontal para desplazarte por los semestres con un solo clic.

## 🚀 Tecnologías Utilizadas

*   **React** (Vite)
*   **CSS Moderno** (Efectos de Glassmorphism, Dark Mode nativo)
*   **Vitest & React Testing Library** (Suite completa de pruebas automatizadas)
*   **SVG Icons** para una interfaz minimalista y profesional.

## 🛠️ Instalación y Uso

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/edwarhman/career-tracker.git
    cd career-tracker
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Ejecuta las pruebas:**
    ```bash
    npm run test
    ```

## 🧪 Testing

El proyecto cuenta con una robusta suite de pruebas que garantiza la integridad de los datos y el funcionamiento de la lógica de pre-requisitos:

*   **Unit Tests**: Validación de la base de datos de materias en `pensum.test.js`.
*   **Component Tests**: Pruebas aisladas para `SubjectCard`, `Header` y `SliderButton`.
*   **Integration Tests**: Verificación del flujo completo en `App.test.jsx`.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---
*Desarrollado con ❤️ para la comunidad de Ingeniería de la UCV.*
