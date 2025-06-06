// // Guardar token al hacer login
// localStorage.setItem('authToken', 'tu-token-jwt-aqui');
// localStorage.setItem('userPermissions', JSON.stringify(['dashboard', 'admin']));

// // Obtener datos
// const token = localStorage.getItem('authToken');
// const permissions = JSON.parse(localStorage.getItem('userPermissions'));

// // Eliminar al hacer logout
// localStorage.removeItem('authToken');

document.addEventListener('DOMContentLoaded', function() {

    ////linea de validacion de entrad al sistema
    //localStorage.setItem('authToken', 'tu-token-jwt-aqui');
    localStorage.removeItem('authToken');

    const token = localStorage.getItem('authToken');
    
    if(hasInfo(token)){
        document.getElementById('main-wrapper').style.display = 'flex'; // Si usabas flexbox
        loadView('home');
    }else{
        // $("#main-wrapper").css("visibility","hidden");
        document.getElementById('main-wrapper').style.display = 'none'; // Si usabas flexbox

        fetch(`./views/login.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('authentication-login-page').innerHTML = html;
        })
        .catch(error => {
            console.error('Error al cargar la vista:', error);
            document.getElementById('dynamicContent').innerHTML = '<h2>Error al cargar la página</h2>';
        });
    }

    // Manejadores para los enlaces del menú
    // document.querySelectorAll('[data-view]').forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const viewName = this.getAttribute('data-view');
    //         loadView(viewName);
    //     });
    // });
});

function loadView(viewName) {
    // console.log(viewName);
    fetch(`./views/${viewName}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('dynamicContent').innerHTML = html;
        })
        .catch(error => {
            console.error('Error al cargar la vista:', error);
            document.getElementById('dynamicContent').innerHTML = '<h2>Error al cargar la página</h2>';
        });
}