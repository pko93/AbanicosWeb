import { AuthService } from './auth.js';



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
    // localStorage.setItem('authToken', 'tu-token-jwt-aqui');
    // localStorage.removeItem('authToken');



    const token = localStorage.getItem('authToken');
    updateMenu();
    
    if(hasInfo(token)){
        document.getElementById('main-wrapper').style.display = 'flex'; // Si usabas flexbox
        loadView('home');
    }else{
        // $("#main-wrapper").css("visibility","hidden");
        document.getElementById('main-wrapper').style.display = 'none'; // Si usabas flexbox

        loadView('login');
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

async function loadView(viewName) {
    try {
        // 1. Cargar HTML
        const htmlResponse = await fetch(`./views/${viewName}/${viewName}.html`);
        const html = await htmlResponse.text();

        if(viewName === "login"){
            document.getElementById('authentication-login-page').innerHTML = html;
        }else{
            document.getElementById('dynamicContent').innerHTML = html;
        }

        

        // 2. Cargar CSS dinámicamente
        loadCSS(viewName);

        // 3. Cargar JS dinámicamente
        loadJS(viewName);

    } catch (error) {
        console.error(`Error al cargar la vista ${viewName}:`, error);
        document.getElementById('dynamicContent').innerHTML = `
            <h2>Error al cargar la página</h2>
            <p>${error.message}</p>
        `;
    }
}

// Función para cargar CSS
function loadCSS(viewName) {
    const linkId = `${viewName}-css`;
    const oldLink = document.getElementById(linkId);
    
    if (oldLink) oldLink.remove();

    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `./views/${viewName}/${viewName}.css`;
    document.head.appendChild(link);
}

// Función para cargar JS
function loadJS(viewName) {
    const scriptId = `${viewName}-js`;
    const oldScript = document.getElementById(scriptId);
    
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `./views/${viewName}/${viewName}.js`;
    script.type = 'module'; // Opcional: si usas ES modules
    document.body.appendChild(script);
}

function RedirecHome(){
    loadView('home');
}

function updateMenu() {
    const menuItems = {
        "01": document.querySelector('[data-view="venta"]'),
        "02": document.querySelector('[data-view="producto"]'),
        "03": document.querySelector('[data-view="sucursal"]'),
        "04": document.querySelector('[data-view="reporte"]'),
        "05": document.querySelector('[data-view="usuario"]'),
        "06": document.querySelector('[data-view="dinero"]'),
        "07": document.querySelector('[data-view="ajustes"]'),
    };

    Object.entries(menuItems).forEach(([screen, element]) => {
        if (element) {
            element.style.display = AuthService.hasPermission(screen) ? 'block' : 'none';
        }
    });
}

document.getElementById('btnLogo1').addEventListener('click', RedirecHome);



