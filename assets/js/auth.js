export const AuthService = {
    // ... (tus otras funciones existentes)
    
    getPermissions: () => {
        const permissions = localStorage.getItem('userPermissions');
        return permissions ? JSON.parse(permissions) : []; // Maneja null/undefined
    },
    
    hasPermission: (screen) => {
        // const permissions = this.getPermissions();
        return AuthService.getPermissions().includes(screen);
    }
};