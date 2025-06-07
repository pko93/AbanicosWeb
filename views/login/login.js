async function handleLogin() {
    const User = document.getElementById('User').value;
    const pass = document.getElementById('pass').value;

    // Validación básica
    if (!User || !pass) {
        alert('Email y contraseña son obligatorios');
        return;
    }

    try {
        const response = await fetch('https://localhost:7034/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ User, pass }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la autenticación');
        }

        const data = await response.json();
        
        // Guarda el token en localStorage (ejemplo)
        localStorage.setItem('authToken', data.token);
        
        // Redirige al dashboard
        window.location.href = './home.html';

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = error.message;
    }
}

// Asignar al botón de login
document.getElementById('btnLogin').addEventListener('click', handleLogin);