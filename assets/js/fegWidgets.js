var controls ={}
jQuery.fn.extend({
    cboFeg:function(prop){
        if(prop ==="inst"){
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        }else{
            // console.log(prop);
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }
            prop.widget = "cboFeg";
            prop.name = $(this).attr("id");
            if(!prop.hasOwnProperty("width")){ prop.width = "100%"; }
            if(!prop.hasOwnProperty("valueProp")){ prop.valueProp = "id"; }
            if(!prop.hasOwnProperty("textProp")){ prop.textProp="text"; }
            if(!prop.hasOwnProperty("placeholder")){ prop.placeholder="seleccione"; }
            if(!prop.hasOwnProperty("source")){ prop.source = new Array(); }
            if(!prop.hasOwnProperty("value")){ prop.value = null; }
            if(!prop.hasOwnProperty("onValueChanged")){ prop.onValueChanged = null; }

            console.log($(this).attr("id"));
            // console.log(prop);
            let optionSelect = '<option value="" class"select2-results__group">'+prop.placeholder+'</option>';
            prop.source.forEach(element => {
                optionSelect += '<option value="'+element[prop.valueProp]+'" class"select2-results__group">'+element[prop.textProp]+'</option>';
            });
            
            $("#"+$(this).attr("id")).addClass("form-select");
            $("#"+$(this).attr("id")).css("width",prop.width);

            //despliege on control
            $("#"+$(this).attr("id")).html(optionSelect);            

            $("#"+$(this).attr("id")).change(function(){
                prop.value = $(this).val();
                // console.log('Valor cambiado:', $(this).val());
                // console.log('Texto seleccionado:', $(this).find('option:selected').text());
                if (prop.onValueChanged != null && prop.onValueChanged != undefined && typeof prop.onValueChanged === "function") {
                    // prop.onValueChanged({
                    //     component: $("#" + propiedades.name).widgetUatSwitch("instance"),
                    //     value: true
                    // });
                    return prop.onValueChanged(this);
                }
            });            

            prop.option = function(property,value){
                if(typeof(property) === 'string'){
                    if(value == undefined){
                        return prop[property];
                    }else{
                        if(property=="value"){
                            $("#" + prop.name).val(valor);
                        }
                        if(property == "source"){

                            prop.source = value;

                            let optionSelect = '<option value="" class"select2-results__group">'+prop.placeholder+'</option>';
                            prop.source.forEach(element => {
                                optionSelect += '<option value="'+element[prop.valueProp]+'" class"select2-results__group">'+element[prop.textProp]+'</option>';
                            });

                            $("#" + prop.name).html(optionSelect);  
                        }
                    }
                }
            }

            var idGeneral = $(this).attr("id");
            controls[idGeneral] = prop;
            return this;
        }
    },
    btnFeg: function(prop){
        if(prop ==="inst"){
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        }else{
            // console.log(prop);
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }
            prop.widget = "cboFeg";
            prop.name = $(this).attr("id");
            if(!prop.hasOwnProperty("width")){ prop.width = "100%"; }
            if(!prop.hasOwnProperty("text")){ prop.text="text"; }
            if(!prop.hasOwnProperty("onClick")){ prop.onClick = null; }
            if(!prop.hasOwnProperty("type")){ prop.type = "primary"; }
            if(!prop.hasOwnProperty("icon")){ prop.icon = null; }

            $("#"+$(this).attr("id")).css("width",prop.width);
            $("#"+$(this).attr("id")).addClass("btn");
            $("#"+$(this).attr("id")).addClass("btn-rounded");
            $("#"+$(this).attr("id")).text(prop.text);

            var claseBtnAdd ="";
            switch(prop.type){
                case "primary":
                    claseBtnAdd="btn-primary";
                    break;
                case "secondary":
                    claseBtnAdd="btn-secondary";
                    break;
                case "success":
                    claseBtnAdd="btn-success";
                    break;
                case "info":
                    claseBtnAdd="btn-info";
                    break;
                case "warning":
                    claseBtnAdd="btn-warning";
                    break;
                case "danger":
                    claseBtnAdd="btn-danger";
                    break;
                case "light":
                    claseBtnAdd="btn-light";
                    break;
                case "dark":
                    claseBtnAdd="btn-dark";
                    break;
            }

            var btnIcon ="";
            switch(prop.icon){
                case "heart":
                    btnIcon ="ti-heart"
                    break;
                case "send":
                    btnIcon ="ti-send"
                    break;
                case "mail":
                    btnIcon ="ti-mail"
                    break;
                case "inbox":
                    btnIcon ="ti-inbox"
                    break;
                case "bell":
                    btnIcon ="ti-bell"
                    break;
                case "time":
                    btnIcon ="ti-clock-hour-4"
                    break;
                case "file":
                    btnIcon ="ti-file-description"
                    break;
                case "folder":
                    btnIcon ="ti-folder"
                    break;
                case "printer":
                    btnIcon ="ti-printer"
                    break;
                case "trash":
                    btnIcon ="ti-tras"
                    break;
                case "save":
                    btnIcon ="ti-device-floppy"
                    break;
                case "settings":
                    btnIcon ="ti-settings"
                    break;
                case "reload":
                    btnIcon ="ti-reload"
                    break;
            }

            if(btnIcon != ""){
                var icon ="<i class='ti "+btnIcon+" fs-4'></i> "+prop.text;
                $("#"+$(this).attr("id")).html(icon);
            }

            $("#"+$(this).attr("id")).addClass(claseBtnAdd);

            $("#"+$(this).attr("id")).on('click',function(){
                return prop.onClick();
            });
        }
    },
    gridFeg: function(prop){
        if(prop ==="inst"){
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        }else{
            // console.log(prop);
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }
            prop.widget = "gridFeg";
            prop.name = $(this).attr("id");
            if(!prop.hasOwnProperty("width")){ prop.width = "100%"; }
            if(!prop.hasOwnProperty("source")){ prop.source = null; }
            if(!prop.hasOwnProperty("columns")){ prop.columns = null; }
            if(!prop.hasOwnProperty("multiSelect")){ prop.multiSelect = false; }
            if(!prop.hasOwnProperty("rowSelection")){ prop.rowSelection = null; }
            if(!prop.hasOwnProperty("index")){ prop.index = "auto"; }

            var table = $('<table>').addClass('table table-sm text-nowrap customize-table mb-0 align-middle');
            var headerRow = $('<thead>').addClass("text-dark fs-4");
            var colHead = $('<tr>');

            prop.columns.forEach(col =>{
                $('<th>').text(col.colName).appendTo(colHead);
            });

            //agerga la columna al header
            colHead.appendTo(headerRow);
            ////agrega el header a la tabla
            headerRow.appendTo(table);            

            var tbody = $('<tbody>');
            
            if(prop.source == null){
                var fila = $('<tr>');
                var columna = $('<td>').text("Sin información");
                columna.attr("colspan",prop.columns.length);
                columna.css("text-align","center");
                columna.appendTo(fila);
                fila.appendTo(tbody);
            }else{                
                var idCount = 0;
                prop.source.forEach(row =>{
                    var id ="";
                    if(prop.index == "auto"){id=idCount; row.index =idCount; idCount++; }else{id=row[prop.index];}
                    var fila = $('<tr data-id='+id+'>').addClass("hover-activo");
                    
                    prop.columns.forEach(col =>{
                        var columna = $('<td>').css("background-color","transparent")
                        var fieldConteiner = $('<p>').text(row[col.sField]).addClass("mb-0 fw-normal fs-4");
                        // console.log(row[col.sField])
                        fieldConteiner.appendTo(columna);
                        columna.appendTo(fila);
                    });
                    fila.appendTo(tbody);
                });
                
            }
            tbody.appendTo(table);

            //seleccion de grid
            $("#"+$(this).attr("id")).on('click', 'tbody tr', function(e) {

                if(prop.multiSelect){
                    if($(e.currentTarget).hasClass("seleccion")){
                        $(e.currentTarget).addClass("hover-activo");
                        $(e.currentTarget).removeClass("seleccion");
                    }else{
                        $(e.currentTarget).removeClass("hover-activo");
                        $(e.currentTarget).addClass("seleccion");
                    }
                }else{
                    $("#"+prop.name+" tbody tr").removeClass("seleccion");
                    $("#"+prop.name+" tbody tr").addClass("hover-activo");

                    $(e.currentTarget).removeClass("hover-activo");
                    $(e.currentTarget).addClass("seleccion");

                    var seleccion = prop.getSeleccion();
                    if (prop.rowSelection != null && prop.rowSelection != undefined && typeof prop.rowSelection === "function"){
                        return prop.rowSelection(seleccion);
                    }
                }
            });

            $("#"+$(this).attr("id")).html(table);            

            prop.option = function(property,value){
                if(typeof(property) === 'string'){
                    if(value == undefined){
                        return prop[property];
                    }else{
                        if(property == "source"){
                            console.log(tbody);

                            tbody.find('tr').remove();

                            var idCount = 0;
                            value.forEach(row =>{
                                var id ="";
                                if(prop.index == "auto"){id=idCount; row.index =idCount; idCount++; }else{id=row[prop.index];}
                                var fila = $('<tr data-id='+id+'>').addClass("hover-activo");
                    
                                prop.columns.forEach(col =>{
                                    var columna = $('<td>').css("background-color","transparent")
                                    var fieldConteiner = $('<p>').text(row[col.sField]).addClass("mb-0 fw-normal fs-4");
                                    // console.log(row[col.sField])
                                    fieldConteiner.appendTo(columna);
                                    columna.appendTo(fila);
                                });
                            fila.appendTo(tbody);
                            });
                        }
                    }
                }
            }

            prop.getSeleccion = function(){
                const filaActual = $("#"+prop.name+" table tbody tr.seleccion")
                if(filaActual != null && filaActual.length>0){
                    if(prop.index == "auto"){
                        const data =prop.source.filter(n => n.index == filaActual.data('id'));
                        return data;
                    }else{
                        const data =prop.source.filter(n => n[prop.index] == filaActual.data('id'));
                        return data;
                    }
                }
                else{
                    return new Array();
                }
            }

            prop.cleanSelection = function(){
                $("#"+prop.name+" tbody tr").removeClass("seleccion");
                $("#"+prop.name+" tbody tr").addClass("hover-activo");
            }

            var idGeneral = $(this).attr("id");
            controls[idGeneral] = prop;
            return this;
        }
    }
});


function obtenerPropiedadesDeArreglo(arreglo) {
    if (arreglo.length === 0) return [];
    return [...new Set(arreglo.flatMap(obj => Object.keys(obj)))];
}