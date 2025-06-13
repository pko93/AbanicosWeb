var cboPantallas;

$(function (){
    const sucursales = [
        {id: 1, text: 'Sucursal Norte'},
        {id: 2, text: 'Sucursal Sur'},
        {id: 3, text: 'Sucursal Este'},
        {id: 4, text: 'Sucursal vr'},
        {id: 5, text: 'Sucursal sx'}
    ];

    const tipo = [
        {idTipo: 1, Tipo: 'Sucursal Norte',prueba:1},
        {idTipo: 2, Tipo: 'Sucursal Sur',prueba:2},
        {idTipo: 3, Tipo: 'Sucursal Este',prueba:3}
    ];

    cboPantallas = new MultiSelectImproved('cboPantallas', sucursales, {
    placeholder: 'Seleccione',
    search: false,
    maxHeight: '250px',
    useTags:false
    });

    const cboSucursales = new MultiSelectImproved('cboSucursales', sucursales, {
    placeholder: 'Seleccione',
    search: false,
    maxHeight: '250px',
    useTags:false
    });

    cboPantallas.setInitialSelection([1,4]);


    cboPantallas.getSelectedItems();
    cboSucursales.getSelectedValues();



    $("#btnSaveUs").btnFeg({
        text:"Guardar",
        type:"success",
        icon:"save",
        onClick: function(){
            // console.log("aqui")
            var selection =  $("#grdUsuario").gridFeg("inst").getSeleccion();

            console.log(selection);
        }
    })

    $("#btnCleanUs").btnFeg({
        text:"Limpiar",
        type:"danger",
        icon:"reload",
        onClick: function(){
            // $("#grdUsuario").gridFeg("inst").cleanSelection();


            const tipo = [
                {idTipo: 1, Tipo: 'Sucursal Norte',prueba:1},
                {idTipo: 2, Tipo: 'Sucursal Sur',prueba:2},
                {idTipo: 3, Tipo: 'Sucursal Este',prueba:3}
            ];

            $("#grdUsuario").gridFeg("inst").option("source",tipo);


        }
    })


    
    

    $("#cboTipoUsuario").cboFeg({
        // source:tipo,
        valueProp:"idTipo",
        textProp:"Tipo",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });

    $("#grdUsuario").gridFeg({
        // source: tipo,
        index: "idTipo",
        rowSelection:function(data){
            // console.log("data del click",data)
            // console.log("aqui seleccion grd")
        },
        columns:[
            {
                colName: "Tipo",
                sField: "Tipo",
                visible:true
            },
            {
                colName: "Prueba",
                sField: "prueba",
                visible:true
            }
        ]
    })
})


function fn(data){    
    


    const tipo = [
        {idTipo: 1, Tipo: 'Sucursal Norte'},
        {idTipo: 2, Tipo: 'Sucursal Sur'},
        {idTipo: 3, Tipo: 'Sucursal Este'}
    ];

    $("#cboTipoUsuario").cboFeg('inst').option("source",tipo);



    console.log($("#cboTipoUsuario").cboFeg('inst'));
    console.log($("#cboTipoUsuario").cboFeg('inst').option("value"));


    $("#grdUsuario").gridFeg("inst").GetSeleccion();
}

// document.addEventListener('DOMContentLoaded', function() {
//     // 1. Datos de ejemplo (reemplaza con tu data real)
//     const productosDataSource = [
//         { id: 1, text: 'Producto 1' },
//         { id: 2, text: 'Producto 2' },
//         { id: 3, text: 'Producto 3' }
//     ];

//     // 2. Inicializa el MultiSelect
//     const productosMultiSelect = new MultiSelect('cboPantallas', productosDataSource, {
//         placeholder: 'Buscar productos...',
//         search: true,
//         maxHeight: '250px'
//     });

//     // // 3. Opcional: Obtener valores seleccionados cuando lo necesites
//     // document.getElementById('btnGuardar').addEventListener('click', function() {
//     //     const productosSeleccionados = productosMultiSelect.getSelectedItems();
//     //     console.log("Productos seleccionados:", productosSeleccionados);
        
//     //     // Aquí puedes enviar los datos al servidor
//     // });
// });