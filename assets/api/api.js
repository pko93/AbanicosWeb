const API_BASE_URL = 'https://localhost:7034/api'; // Ajusta esta URL

const auth = {
  getToken: () => localStorage.getItem('authToken'),
  setToken: (token) => localStorage.setItem('authToken', token),
  removeToken: () => localStorage.removeItem('authToken')
};

async function makeRequest(endpoint, method = 'POST', body = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getToken()}`
    }
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    
    if (response.status === 401) {
      auth.removeToken();
      
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

async function makeGenericRequest(endpoint, method = 'POST', body = null){
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `   ${auth.getToken()}`
    }
  };

  if (body) options.body = JSON.stringify(body);

  try{
    const response = await fetch(url, options);
    return await response.json();
  }catch{

  }

  

}

export const api = {
  /**
   * @param {string} usuario
   * @param {string} password
   * @returns {Promise<{token: string, usuario: any}>}
   */
  login: async (usuario, password) => {
    const response = await makeRequest('/auth/login', 'POST', {
      usuario,  // Nombre exacto que espera tu LoginDto
      password // Nombre exacto que espera tu LoginDto
    });

    if (response && response.token) {
      auth.setToken("Bearer "+response.token);
      localStorage.setItem('Expiracion',response.expiracion);
      localStorage.setItem('userPermissions', JSON.stringify(response.pta));
      localStorage.setItem('userSucursales', JSON.stringify(response.suc));
      localStorage.setItem('ClaveTipo', response.rol);
    }
    
    return response;
  },

  consultaGenerica: async (obj) =>{
    const response = await makeGenericRequest();
  },
  
  getCurrentUser: () => makeRequest('/auth/user')
};

export const apiProductos = {
  getTypeProductos: async(claveSucursal) =>{
    
    const result = await makeGenericRequest('/Productos/GetTypeProductos', 'POST', {
      claveSucursal
    });
    return result;
  },

  GetProductosSucursal: async(IdTipoProducto,claveSucursal) =>{

    const result = await makeGenericRequest('/Productos/GetProductosSucursal', 'POST', {
      IdTipoProducto,
      claveSucursal
    });
    return result;
  },

  getProductos: async(IdProducto,IdTipoProducto) =>{
    const result = await makeGenericRequest('/Productos/GetProductos', 'POST', {
      IdProducto,
      IdTipoProducto
    });
    return result;
  }
}

export const apiCat = {
  getCatalog:  async(Catalogo,Activo)=>{
    const result = await makeGenericRequest("/General/SearchCatalog","POST",{
      Catalogo,
      Activo
    });
    return result;
  }
}

export const apiSucursales = {
  getSucursalAsync: async(activo) =>{
    const result = await makeGenericRequest("/Sucursales/SearchSucursal","POST",{
      activo
    })
    return result;
  }
}