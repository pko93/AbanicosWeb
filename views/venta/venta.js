import { apiProductos }from '../../assets/api/api.js';

var fuente=[
        {id: 1, text: 'Sucursal Norte'},
        {id: 2, text: 'Sucursal Sur'},
        {id: 3, text: 'Sucursal Este'},
        {id: 4, text: 'Sucursal vr'},
        {id: 5, text: 'Sucursal sx'}
    ];

$(function(){
    CargarTipoProducto();
    

    $("#btnAccion").btnFeg({
        text: "aqui",
        onClick: function(){
            console.log("selection");

             console.log($("#tabTipoProducto").tabFeg("inst").getSeleccion());
            
            
        }
    });



    $("#tabTipoProducto").tabFeg({
        // source:fuente,
        textProp:"tipoProducto",
        valueProp:"idTipoProducto",
        onTabClick: function (e,b){

            CargarProductosSucursal($("#tabTipoProducto").tabFeg("inst").getSeleccion().value);
            // console.log(e);
            // console.log(b);
        }
    });

    // console.log($("#tabTipoProducto").tabFeg("inst").getSeleccion());

});

async function CargarTipoProducto(){
    const result = await apiProductos.getTypeProductos(JSON.parse(localStorage.getItem("currentSucursal")).claveSucursal);
    // console.log(result);
    $("#tabTipoProducto").tabFeg("inst").option("source",result);
    CargarProductosSucursal(result[0].idTipoProducto);
}

async function CargarProductosSucursal(TipoProducto){
    const result = await apiProductos.GetProductosSucursal(TipoProducto,JSON.parse(localStorage.getItem("currentSucursal")).claveSucursal);

    console.log("tipoProduftos",result)
    renderizarProductos(result)
}

// Función para renderizar los productos
function renderizarProductos(productos) {
    const productGrid = document.getElementById('grdProductos');
    productGrid.innerHTML = ''; // Limpiar el contenedor

    productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4'; // Responsivo
        
        col.innerHTML = `
            <div class="card product-card h-100">
                <div class="product-img-container">
                    
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.producto}</h5>
                    <p class="card-text flex-grow-1">${producto.producto}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price"></span>
                        <button class="btn btn-primary btn-sm">Agregar</button>
                    </div>
                </div>
            </div>
        `;
        
        productGrid.appendChild(col);
    });
}