// ===== JAVASCRIPT PARA MENÚ DESPLEGABLE CON CLICK =====

document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del dropdown
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdown = document.querySelector('.dropdown');

    // ===== CLICK EN EL BOTÓN PRODUCTOS =====
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();

        // Toggle de las clases active para abrir/cerrar
        dropdownToggle.classList.toggle('active');
        dropdownContent.classList.toggle('active');
    });

    // ===== CLICK EN LOS ITEMS DEL MENÚ =====
    const dropdownLinks = dropdownContent.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Cerrar el menú después de seleccionar una opción
            dropdownToggle.classList.remove('active');
            dropdownContent.classList.remove('active');
        });
    });

    // ===== CERRAR MENÚ AL HACER CLICK FUERA =====
    document.addEventListener('click', function(e) {
        // Si el click no está dentro del dropdown, ciérralo
        if (!dropdown.contains(e.target)) {
            dropdownToggle.classList.remove('active');
            dropdownContent.classList.remove('active');
        }
    });

    // ===== CERRAR MENÚ CON TECLA ESC =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdownToggle.classList.remove('active');
            dropdownContent.classList.remove('active');
        }
    });
});