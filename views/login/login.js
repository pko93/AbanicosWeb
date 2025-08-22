// Importa la función desde main.js
import { loadView, updateMenu,updateSucursalesDropdown,mostrarMensaje } from '../../assets/js/main.js';
import { api } from '../../assets/api/api.js';


async function handleLogin() {
    const User = document.getElementById('User').value;
    const pass = document.getElementById('pass').value;

    // Validación básica
    if (!User || !pass) {
        mostrarMensaje("AbanicosWeb",'usuario y contraseña son obligatorios');
        return;
    }

    try {

        const response = await api.login(User, pass);
        console.log("Login",response);
        

        if (response && response.token) {
            updateSucursalesDropdown();
            updateMenu();
            loadView('home');
        }else{
            if(response && response.mensaje ){
                mostrarMensaje("AbanicosWeb",response.mensaje);
            }else{
                mostrarMensaje("AbanicosWeb",'usuario y contraseña son obligatorios');
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
        // document.getElementById('error-message').textContent = error.message;
    }
}

// Asignar al botón de login
document.getElementById('btnLogin').addEventListener('click', handleLogin);