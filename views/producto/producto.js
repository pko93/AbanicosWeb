// import { apiProductos } from "../../assets/api/api";
import { apiProductos }from '../../assets/api/api.js';
import { apiCat } from '../../assets/api/api.js';
import { apiSucursales } from '../../assets/api/api.js';

var Productos_IdProducto=null;

$(function(){
    
    $("#btnLimpiarProductoPantalla").btnFeg({
        text:"Limpiar",
        type:"danger",
        icon:"reload",
        onClick: function(){
            $("#crdProductoDetalle").css("display","none");
            $("#crdProductoPrecios").css("display","none");
            $("#crdProductoIngredientesExtra").css("display","none");
            $("#BotonesProducto").css("display","none");
            
            this.Productos_IdProducto = null;
            $("#grdProductos").gridFeg("inst").option("source",null);

            // var seleccion = $("#grdProductos").gridFeg("inst").getSeleccion();
            // console.log(seleccion);
        }
    })
    
    $("#btnNuevoProductos").btnFeg({
        text:"Nuevo",
        type:"success",
        icon:"plus",
        onClick: function(){
            this.Productos_IdProducto = null;


            // var solo = $("#cboSucursalesProducto").multiCheckComboFeg("inst");
            // console.log(solo);

            // console.log($("#cboTipoProducto").cboFeg("inst"));
            $("#crdProductoDetalle").css("display","block");
            $("#BotonesProducto").css("display","flex");

            $("#crdProductoPrecios").css("display","none");
            $("#crdProductoIngredientesExtra").css("display","none");

            //seccion detalle producto
            $("#txtProducto").val(null);
            $("#txtDescripcion").val(null);
            $("#txtCodigoProducto").val(null);
            $("#cboTipoProducto").cboFeg("inst").option("value",null);
            $("#cboSucursalesProducto").multiCheckComboFeg("inst").option("selectedValues",[]);

            // var seleccion = $("#grdProductos").gridFeg("inst").getSeleccion();
            // console.log(seleccion);
        }
    })

    $("#btnBuscarProductos").btnFeg({
        text:"Buscar",
        type:"info",
        icon:"settings",
        onClick: function(){
            ConsltaProductos();
        }
    })

    $("#grdProductos").gridFeg({
        // source: tipo,
        index: "idProducto",
        hoverColor: "#f0f0f0", // Color gris claro para hover
    selectedColor: "#d1e7ff" ,
        rowSelection:function(data){
            if(data != null && data != undefined && data != [])
            {
                console.log("data",data);
                this.Productos_IdProducto=data[0].idProducto;
                ConsltaProductos(this.Productos_IdProducto);
                // // console.log("data del click",data)
                $("#crdProductoDetalle").css("display","block");
                $("#crdProductoPrecios").css("display","block");
                $("#crdProductoIngredientesExtra").css("display","block");

                $('#txtProducto').val(data[0].producto);
                $("#cboTipoProducto").cboFeg("inst").option("value",data[0].idTipoProducto);
                $('#txtDescripcion').val(data[0].descripcion);
                $('#txtCodigoProducto').val(data[0].codigoBarras);
                $('#chkProductoActivo').prop("checked",data[0].activo);
                // $('#txtProducto').val(data[0].producto);
                if(data[0].idSucursal != null && data[0].idSucursal != undefined){
                    var sucs = new Array();
                    const suc = data[0].idSucursal.toString().split(",");
                    suc.forEach(element => {
                        sucs.push(parseInt(element));
                    });

                    console.log("sucs",sucs);
                    $("#cboSucursalesProducto").multiCheckComboFeg("inst").option("selectedValues",sucs);

                    
                }
                
                $("#imgProduct").attr("src",data[0].rutaImagen);

                $("#BotonesProducto").css("display","flex");
                console.log(this.Productos_IdProducto);
            }            
        },
        columns:[
            {
                colName: "Producto",
                sField: "producto",
                visible:true
            },
            {
                colName: "Tipo producto",
                sField: "tipoProducto",
                visible:true
            },
            {
                colName: "Descripciòn",
                sField: "descripcion",
                visible:true
            },
            {
                colName: "Codigo",
                sField: "codigoBarras",
                visible:true
            },
            {
                colName: "Activo",
                sField: "activo",
                visible:true
            },
            {
                colName: "Sucursales",
                sField: "sucursal",
                visible:true
            },
            {
                colName: "Fecha registro",
                sField: "fechaRegistro",
                visible:true
            },
        ]
    });

    

    $("#cboTipoProducto").cboFeg({
        // source:tipo,
        valueProp:"idElemento",
        textProp:"nombreElemento",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });

    $("#cboSucursalesProducto").multiCheckComboFeg({
        placeholder:"Seleccione",
        valueProp: "idSucursal",
        textProp: "nombreSucursal",
    })

    $('#productoFile').fileUploadFeg({
        uploadUrl: 'https://localhost:7034/api/Productos/GuardarImgaenProducto',
        multiple: true,
        maxFiles: 3,
        accept: 'image/*,.pdf',
        // additionalData: {
        //     id_producto: getSelectedProductId()
        //     // usuario: 'nombre_usuario'
        // },
        // onUploadComplete: function(response) {
        //     console.log('Archivos subidos:', response.Files);
        //     console.log('Datos adicionales:', response.AdditionalData);
        // },
        // onError: function(error) {
        //     console.log('Error:', error.message);
        // }
        getAdditionalData: function() {
        // Esta función se ejecuta AL MOMENTO de la subida
        const seleccion = $("#grdProductos").gridFeg("inst").getSeleccion();
        if (seleccion.length === 0) {
            throw new Error("Por favor, selecciona un producto primero");
        }
        return {
            id_producto: seleccion[0].idProducto,
            fecha: new Date().toISOString()
        };
    },
    onUploadComplete: function(response) {
        console.log('Subida exitosa:', response);
    }
    });
   
    $("#cboSucursalTamanio").cboFeg({
        // source:tipo,
        valueProp: "idSucursal",
        textProp: "nombreSucursal",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
            ConsultaTamaniosProducto();
        }
    });

    $("#cboTamanioProducto").cboFeg({
        // source:tipo,
        valueProp:"idElemento",
        textProp:"nombreElemento",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });

    
    $('#txtImporteTamanio').numFeg({
        format: "currency",
        currencySymbol: "$",
        decimalPlaces: 2,
        thousandsSeparator: true,
        placeholder: "0.00",
        onValueChanged: function(data) {
            console.log("Valor cambiado:", data.value, "Formateado:", data.formattedValue);
        }
    });
    
    
    $("#btnAgregarTamanio").btnFeg({
        text:"Agregar Tamaño",
        type:"success",
        icon:"save",
        onClick: function(){
            
        }
    })
    
    $("#grdProdTamanios").gridFeg({
        // source: tipo,
        index: "idTipo",
        rowSelection:function(data){
            // console.log("data del click",data)
            // console.log("aqui seleccion grd")
        },
        columns:[
            {
                colName: "Tamaño",
                sField: "Producto",
                visible:true
            },
            {
                colName: "Precio",
                sField: "FechaRegistro",
                visible:true
            },
        ]
    });

    
    $("#cboSucursalIngrediente").cboFeg({
        // source:tipo,
        valueProp: "idSucursal",
        textProp: "nombreSucursal",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });

    $("#cboIngredienteProducto").cboFeg({
        // source:tipo,
        valueProp:"idIngredienteExtra",
        textProp:"ingredienteExtra",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });

    $("#btnAgregarIngrediente").btnFeg({
        text:"Agregar Ingrediente",
        type:"success",
        icon:"save",
        onClick: function(){
            
        }
    })
   
    $("#grdProdIngredienteExtra").gridFeg({
        // source: tipo,
        // index: "idTipo",
        rowSelection:function(data){
            // console.log("data del click",data)
            // console.log("aqui seleccion grd")
        },
        columns:[
            {
                colName: "Ingrediente extra",
                sField: "Producto",
                visible:true
            },
            {
                colName: "Precio",
                sField: "FechaRegistro",
                visible:true
            },
        ]
    });

    $("#btnLimpiarProducto").btnFeg({
        text:"Limpiar",
        type:"danger",
        icon:"reload",
        onClick: function(){
            
        }
    })

    $("#btnGuardarProducto").btnFeg({
        text:"Guardar",
        type:"success",
        icon:"save",
        onClick: function(){
            
        }
    })

   ConsultaTipoProducto(); 
   ConsultaSucursales();
   Tamanios();
   IngredienteExtra();
});

async function ConsultaTipoProducto(){
    $('#genLoading').loadingPanelFeg("inst").show();
    const catTipos = await apiCat.getCatalog("CatTipoProducto",true);
    // console.log(catTipos);
    $("#cboTipoProducto").cboFeg("inst").option("source",catTipos);

    $('#genLoading').loadingPanelFeg("inst").hide();
}

async function ConsultaSucursales(){
    $('#genLoading').loadingPanelFeg("inst").show();
    const catSuc = await apiSucursales.getSucursalAsync(true);
    // console.log(catSuc);
    $("#cboSucursalesProducto").multiCheckComboFeg("inst").option("source",catSuc);    

    $("#cboSucursalIngrediente").cboFeg("inst").option("source",catSuc);
    $("#cboSucursalTamanio").cboFeg("inst").option("source",catSuc);
    $('#genLoading').loadingPanelFeg("inst").hide();
}

async function ConsltaProductos(IdProducto){
    $('#genLoading').loadingPanelFeg("inst").show();
    const productos = await apiProductos.getProductos(IdProducto);
    // console.log(productos);
    $("#grdProductos").gridFeg("inst").option("source",productos);
    $('#genLoading').loadingPanelFeg("inst").hide();
}

async function Tamanios(){
    $('#genLoading').loadingPanelFeg("inst").show();
    const catTipos = await apiCat.getCatalog("CatTamaniosProducto",true);

    $("#cboTamanioProducto").cboFeg("inst").option("source",catTipos);
    $('#genLoading').loadingPanelFeg("inst").hide();
}

async function IngredienteExtra(){
    $('#genLoading').loadingPanelFeg("inst").show();
    const productos = await apiProductos.getIngredienteExtra(null,null);
    // console.log(productos);
    $("#cboIngredienteProducto").cboFeg("inst").option("source",productos);
    $('#genLoading').loadingPanelFeg("inst").hide();
    
}

async function ConsultaTamaniosProducto(){
    $('#genLoading').loadingPanelFeg("inst").show();
    const productos = await apiProductos.getProductoTamanioSuc($("#grdProductos").gridFeg("inst").getSeleccion()[0].idProducto,$("#cboSucursalTamanio").cboFeg("inst").option("value"));
    // console.log(productos);
    $("#grdProdTamanios").gridFeg("inst").option("source",productos);
    $('#genLoading').loadingPanelFeg("inst").hide();
}

function getSelectedProductId() {
    const grid = $("#grdProductos").gridFeg("inst");
    const seleccion = grid.getSeleccion();
    
    if (seleccion.length === 0) {
        throw new Error("No hay ningún producto seleccionado");
    }
    
    if (!seleccion[0].hasOwnProperty('idProducto')) {
        throw new Error("El producto seleccionado no tiene la propiedad idProducto");
    }
    
    return seleccion[0].idProducto;
}