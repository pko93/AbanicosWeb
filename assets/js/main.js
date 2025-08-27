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
    $('#genLoading').loadingPanelFeg({
        message: "Cargando...",
        spinnerType: "image",
        customImage: "/assets/images/logos/logo.ico",
        imageWidth: "100px",
        imageHeight: "100px",
        overlay: true
    });
    ////linea de validacion de entrad al sistema
    // localStorage.setItem('authToken', 'tu-token-jwt-aqui');
    // localStorage.removeItem('authToken');

    console.log("refresca pantalla");

    const token = localStorage.getItem('authToken');
    const fecTkn = new Date(localStorage.getItem('Expiracion'));
    const now = new Date();

    console.log(fecTkn);
    console.log(now);
    // updateMenu();
    
    if(hasInfo(token) && fecTkn > new Date()){
        updateSucursalesDropdown(); // Nuevo
        updateMenu();
        document.getElementById('main-wrapper').style.display = 'block'; // Si usabas flexbox
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

export async function loadView(viewName) {
    try {
        //limpia las pantallas anteriores
        cleanupPreviousView()

        // 1. Cargar HTML        
        const htmlResponse = await fetch(`./views/${viewName}/${viewName}.html`);
        const html = await htmlResponse.text();

        if(viewName === "login"){
            document.getElementById('authentication-login-page').innerHTML = html;
            document.getElementById('authentication-login-page').style.display = 'block';
            document.getElementById('main-wrapper').style.display = 'none';
        }else{
            document.getElementById('authentication-login-page').style.display = 'none';
            document.getElementById('main-wrapper').style.display = 'block';
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
    return new Promise((resolve) => {
        const linkId = `${viewName}-css`;
        const oldLink = document.getElementById(linkId);
        
        if (oldLink) oldLink.remove();

        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `./views/${viewName}/${viewName}.css?t=${Date.now()}`;
        
        link.onload = resolve;
        link.onerror = resolve; // Continuar incluso si hay error en CSS
        
        document.head.appendChild(link);
    });
}

// Función para cargar JS
function loadJS(viewName) {
    return new Promise((resolve) => {
        const scriptId = `${viewName}-js`;
        const oldScript = document.getElementById(scriptId);
        
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `./views/${viewName}/${viewName}.js?t=${Date.now()}`;
        script.type = 'module'; // Opcional: si usas ES modules
        
        // Manejar tanto éxito como error para que la promesa siempre se resuelva
        script.onload = resolve;
        script.onerror = resolve;
        
        document.body.appendChild(script);
    });
}

// Función de limpieza
function cleanupPreviousView() {
    // Eliminar todos los CSS dinámicos
    document.querySelectorAll('link[rel="stylesheet"][id$="-css"]').forEach(el => el.remove());
    
    // Eliminar todos los JS dinámicos
    document.querySelectorAll('script[id$="-js"]').forEach(el => el.remove());
    
    // Limpiar event listeners y otros recursos (opcional)
    if (window.currentViewCleanup) {
        window.currentViewCleanup();
        delete window.currentViewCleanup;
    }
}

function RedirecHome(){
    loadView('home');
}

export function updateMenu() {
    const menuItems = document.querySelectorAll('[data-view]');

    menuItems.forEach(item => {
        const viewKey = item.getAttribute('data-view');
        item.style.display = AuthService.hasPermission(viewKey) ? 'block' : 'none';
    });

}
export function updateSucursalesDropdown() {
    const sucursales = JSON.parse(localStorage.getItem('userSucursales') || '[]');
    const dropdownMenu = document.querySelector('.dropdown-menu[aria-labelledby="drop1"] .message-body');
    
    // Limpiar items existentes
    dropdownMenu.innerHTML = '';

    // Agregar nuevas sucursales
    sucursales.forEach(sucursal => {
        const item = document.createElement('a');
        item.className = 'dropdown-item';
        item.href = 'javascript:void(0)';
        item.textContent = sucursal.nombre;
        item.addEventListener('click', () => {
            localStorage.setItem('currentSucursal', JSON.stringify(sucursal));
            console.log('Sucursal seleccionada:', sucursal);
            document.getElementById('drop1').textContent = `${sucursal.nombre}`;
        });
        dropdownMenu.appendChild(item);
    });

    // Actualizar texto principal
    if (sucursales.length > 0) {
        document.getElementById('drop1').textContent = `${sucursales[0].nombre}`;
    }
}


///botones de menu
document.querySelectorAll('[data-view]').forEach(menuItem => {
    menuItem.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = e.currentTarget.getAttribute('data-view');
        if (AuthService.hasPermission(viewName)) {
            var screen ="";
            switch(viewName){
                case "01":
                    screen ="venta"
                    break;
                case "02":
                    screen ="producto"
                    break;
                case "03":
                    screen ="sucursal"
                    break;
                case "04":
                    screen ="reportes"
                    break;
                case "05":
                    screen ="usuario"
                    break;
                case "06":
                    screen ="dinero"
                    break;
                case "06":
                    screen ="correo"
                    break;
                case "08":
                    screen ="ajustes"
                    break;
            }
            loadView(screen); // Tu función existente para cargar vistas
            // history.pushState(null, '', `/${viewName}`); // Opcional: actualiza URL
        } else {
            alert('No tienes permisos para acceder a esta pantalla');
            // O muestra un mensaje en la interfaz:
            // document.getElementById('error-message').textContent = 'Acceso denegado';
        }
    });
});




document.getElementById('btnLogo1').addEventListener('click', RedirecHome);
document.getElementById("btnLogaut").addEventListener("click",function(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('userPermissions')
    localStorage.removeItem('ClaveTipo');
    loadView('login');
});


// Función para mostrar mensaje genérico
    export function mostrarMensaje(titulo, mensaje) {
        document.getElementById('popupMensajeTitulo').textContent = titulo;
        document.getElementById('popupMensajeTexto').textContent = mensaje;
        popupMensaje.style.display = 'flex';

        const btnAceptar = document.getElementById('btnAceptar');

        btnAceptar.addEventListener('click', function() {
            popupMensaje.style.display = 'none';
        });
    }
    
    // Función para mostrar confirmación
    export function mostrarConfirmacion(titulo, mensaje, onConfirm, onCancel) {
        document.getElementById('popupConfirmacionTitulo').textContent = titulo;
        document.getElementById('popupConfirmacionTexto').textContent = mensaje;
        popupConfirmacion.style.display = 'flex';
        
        // Limpiar eventos anteriores para evitar múltiples llamadas
        btnConfirmarSi.replaceWith(btnConfirmarSi.cloneNode(true));
        btnConfirmarNo.replaceWith(btnConfirmarNo.cloneNode(true));
        
        // Obtener los nuevos elementos clonados
        const newBtnSi = document.getElementById('btnConfirmarSi');
        const newBtnNo = document.getElementById('btnConfirmarNo');
        
        newBtnSi.addEventListener('click', function() {
            popupConfirmacion.style.display = 'none';
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        });
        
        newBtnNo.addEventListener('click', function() {
            popupConfirmacion.style.display = 'none';
            if (typeof onCancel === 'function') {
                onCancel();
            }
        });
    }

 export function  showLoadingPanel(){
    $('#genLoading').loadingPanelFeg("inst").show();
}

export function hideLoadingPanel(){
    $('#genLoading').loadingPanelFeg("inst").hide();
}