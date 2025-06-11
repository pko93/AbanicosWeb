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
        {idTipo: 1, Tipo: 'Sucursal Norte'},
        {idTipo: 2, Tipo: 'Sucursal Sur'},
        {idTipo: 3, Tipo: 'Sucursal Este'}
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

    $("#cboGeneric").cboFeg({
        // source:tipo,
        valueProp:"idTipo",
        textProp:"Tipo",
        onValueChanged(e){
            // console.log(e);
            // console.log("aqui");
        }
    });
})


document.getElementById("btnSaveUsr").addEventListener("click",function(data){    
    


    const tipo = [
        {idTipo: 1, Tipo: 'Sucursal Norte'},
        {idTipo: 2, Tipo: 'Sucursal Sur'},
        {idTipo: 3, Tipo: 'Sucursal Este'}
    ];

    $("#cboGeneric").cboFeg('inst').option("source",tipo);



    console.log($("#cboGeneric").cboFeg('inst'));
    console.log($("#cboGeneric").cboFeg('inst').option("value"));
});

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