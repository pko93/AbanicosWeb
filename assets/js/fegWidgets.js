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

            // console.log($(this).attr("id"));
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
                            $("#" + prop.name).val(value);
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
                case "plus":
                    btnIcon ="ti-plus"
                    break;
                     
            }

            if(btnIcon != ""){
                var icon ="<i class='ti "+btnIcon+" fs-4'></i> "+prop.text;
                $("#"+$(this).attr("id")).html(icon);
            }

            $("#"+$(this).attr("id")).addClass(claseBtnAdd);

            $("#"+$(this).attr("id")).on('click',function(){
                if (prop.onClick != null && prop.onClick != undefined && typeof prop.onClick === "function"){
                    return prop.onClick();
                }                
            });
        }
    },
    gridFeg: function(prop) {
        if (prop === "inst") {
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        } else {
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }

            // Configuración por defecto
            prop.widget = "gridFeg";
            prop.name = $(this).attr("id");
            prop.width = prop.width || "100%";
            prop.source = prop.source || null;
            prop.columns = prop.columns || null;
            prop.multiSelect = prop.multiSelect || false;
            prop.rowSelection = prop.rowSelection || null;
            prop.index = prop.index || "auto";
            prop.maxHeight = prop.maxHeight || "500px";
            prop.hoverColor = prop.hoverColor || "#f8f9fa"; // Color de hover personalizable
            prop.selectedColor = prop.selectedColor || "#e2e3e5"; // Color de selección personalizable

            // Contenedor principal con posición relativa para el header fijo
            var gridContainer = $('<div>').addClass('position-relative').css({
                'width': prop.width,
                'max-height': prop.maxHeight
            });

            // Buscador
            var searchContainer = $('<div>').addClass('input-group mb-3');
            var searchInput = $('<input>')
                .attr('type', 'text')
                .addClass('form-control form-control-sm')
                .attr('placeholder', 'Buscar...');
            var searchButton = $('<button>')
                .addClass('btn btn-sm btn-outline-secondary')
                .html('<i class="fas fa-search"></i>');
            
            searchContainer.append(searchInput, searchButton);
            gridContainer.append(searchContainer);

            // Contenedor para la tabla con scroll
            var tableWrapper = $('<div>').css({
                'max-height': 'calc(' + prop.maxHeight + ' - 40px)',
                'overflow-y': 'auto',
                'position': 'relative'
            });

            // Tabla principal
            var table = $('<table>').addClass('table table-sm table-bordered mb-0').css({
                'width': '100%'
            });

            // Header fijo
            var fixedHeader = $('<thead>').addClass('fixed-header').css({
                'position': 'sticky',
                'top': '0',
                'z-index': '10'
            });
            
            var colHead = $('<tr>');

            // Configurar columnas con estilo rosa (#F54927)
            prop.columns.forEach(col => {
                $('<th>')
                    .text(col.colName)
                    .addClass('text-truncate text-white')
                    .css({
                        'max-width': '200px',
                        'overflow': 'hidden',
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap',
                        'background-color': '#F75CA4',
                        'cursor': 'pointer',
                        'padding': '8px',
                        'border-bottom': '1px solid #dee2e6'
                    })
                    .appendTo(colHead);
            });

            colHead.appendTo(fixedHeader);
            table.append(fixedHeader);

            // Cuerpo de la tabla
            var tbody = $('<tbody>');
            
            function renderTableData(data) {
                tbody.empty();
                
                if (!data || data.length === 0) {
                    var fila = $('<tr>');
                    $('<td>')
                        .text("Sin información")
                        .attr("colspan", prop.columns.length)
                        .addClass('text-center text-muted py-3')
                        .appendTo(fila);
                    fila.appendTo(tbody);
                } else {
                    var idCount = 0;
                    data.forEach(row => {
                        var id = prop.index === "auto" ? idCount++ : row[prop.index] == undefined? idCount++:row[prop.index];
                        if (prop.index === "auto") row.index = id;
                        
                        var fila = $('<tr>')
                            .attr('data-id', id)
                            .attr('id', id)
                            .addClass('align-middle')
                            .css({
                                'cursor': 'pointer',
                                'transition': 'background-color 0.2s ease'
                            })
                            .hover(
                                function() { $(this).css('background-color', prop.hoverColor); },
                                function() { 
                                    if (!$(this).hasClass('table-active')) {
                                        $(this).css('background-color', ''); 
                                    }
                                }
                            );
                        if(data.length == 1){
                            fila.addClass("table-active");
                        }
                        prop.columns.forEach(col => {
                            $('<td>')
                                .addClass('text-truncate')
                                .css({
                                    'max-width': '200px',
                                    'overflow': 'hidden',
                                    'text-overflow': 'ellipsis',
                                    'padding': '8px'
                                })
                                .append(
                                    $('<div>')
                                        .addClass('d-inline-block text-truncate')
                                        .css('max-width', '100%')
                                        .text(row[col.sField] || '')
                                )
                                .appendTo(fila);
                        });
                        
                        fila.appendTo(tbody);
                    });
                }
            }

            // Renderizar datos iniciales
            renderTableData(prop.source);
            table.append(tbody);
            tableWrapper.append(table);
            gridContainer.append(tableWrapper);

            // Función de búsqueda
            function performSearch() {
                var searchTerm = searchInput.val().toLowerCase();
                
                if (!searchTerm) {
                    renderTableData(prop.source);
                    return;
                }
                
                var filteredData = prop.source.filter(row => {
                    return prop.columns.some(col => {
                        var value = String(row[col.sField] || '').toLowerCase();
                        return value.includes(searchTerm);
                    });
                });
                
                renderTableData(filteredData);
            }

            // Eventos de búsqueda
            searchInput.on('keyup', performSearch);
            searchButton.on('click', performSearch);

            // Selección de filas - CORRECCIÓN PRINCIPAL
            tableWrapper.on('click', 'tbody tr', function(e) {
    var $row = $(this);
    var $table = $row.closest('table');

    if (prop.multiSelect) {
        // Toggle de selección múltiple
        $row.toggleClass('table-active');
        
        // Remover o agregar el color de fondo según la selección
        if ($row.hasClass('table-active')) {
            $row.css('background-color', prop.selectedColor || '#e9ecef');
        } else {
            $row.css('background-color', '');
        }
    } else {
        // Selección única - Limpiar todas las selecciones primero
        $table.find('tr').removeClass('table-active').css('background-color', '');
        
        // Seleccionar la fila clickeada
        $row.addClass('table-active');
        $row.css('background-color', prop.selectedColor || '#e9ecef');
        
        // Disparar el callback de selección
        if (typeof prop.rowSelection === "function") {
            const clickedId = $row.data('id');
            const selectedData = prop.index === "auto" 
                ? prop.source.find(item => item.index == clickedId)
                : prop.source.find(item => item[prop.index] == clickedId);
            
            if (selectedData) {
                prop.rowSelection([selectedData]);
            }
        }
    }
});

            // Limpiar el contenedor y agregar todo
            var $target = $("#" + $(this).attr("id"))
                .empty()
                .append(gridContainer);

            // Métodos del grid
            prop.option = function(property, value) {
                if (typeof property === 'string') {
                    if (value === undefined) {
                        return prop[property];
                    } else if (property === "source") {
                        prop.source = value;
                        renderTableData(value);
                    }
                }
            };

            prop.getSeleccion = function() {
                const $selected = $("#" + prop.name).find('tr.table-active');
                if ($selected.length > 0 && prop.source) {
                    // CORRECCIÓN: Obtener los datos correctos de las filas seleccionadas
                    return $selected.map(function() {
                        const selectedId = $(this).data('id');
                        return prop.index === "auto" 
                            ? prop.source.find(item => item.index == selectedId)
                            : prop.source.find(item => item[prop.index] == selectedId);
                    }).get();
                }
                return [];
            };

            prop.cleanSelection = function() {
                $("#" + prop.name).find('tr')
                    .removeClass('table-active')
                    .css('background-color', '');
            };

            // Almacenar referencia al control
            controls[idGeneral] = prop;
            return this;
        }
    },
    tabFeg: function(prop){
        if(prop ==="inst"){
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        }else{
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }
            prop.widget = "tabFeg";
            prop.name = $(this).attr("id");
            if(!prop.hasOwnProperty("width")){ prop.width = "100%"; }
            if(!prop.hasOwnProperty("source")){ prop.source = null; }
            if(!prop.hasOwnProperty("valueProp")){ prop.valueProp = "id"; }
            if(!prop.hasOwnProperty("textProp")){ prop.textProp="text"; }
            if (!prop.hasOwnProperty("onTabClick")) { prop.onTabClick = null; } // Nueva propiedad para callback

            var tab = $('<ul>').addClass("nav nav-pills").attr("role", "tablist");
            var count = 0;
            var self = this; // Guardamos referencia al contexto actual
            
            if(prop.source != null && prop.source != undefined ){
                prop.source.forEach(function(item) {
                    var navItemId = "tab-" + (item[prop.valueProp] || count); // ID único para cada tab
                    var nav = $("<li>").addClass("nav-item");
                    var a = $("<a>")
                        .addClass("nav-link")
                        .attr("data-bs-toggle", "tab")
                        .attr("role", "tab")
                        .attr("href", "#" + navItemId) // Usamos el ID único
                        .attr("data-tab-value", item[prop.valueProp]) // Almacenamos el valor
                        .attr("data-tab-index", count) // Almacenamos el índice
                        .data("tab-item", item); // Almacenamos el objeto completo
                    
                    if (count == 0) {
                        a.addClass("active");
                    }
                    
                    $("<span>").text(item[prop.textProp]).appendTo(a);
                    nav.append(a);
                    tab.append(nav);
                    
                    count++;
                });
            }
            

            // console.log(tab);

            $("#"+$(this).attr("id")).html(tab);

            $("#" + $(this).attr("id")).on('click', '.nav-link', function(e) {
                e.preventDefault();
                
                // Removemos la clase active de todos los tabs
                $(this).closest('.nav').find('.nav-link').removeClass('active');
                // Agregamos active al tab clickeado
                $(this).addClass('active');
                
                // Obtenemos los datos del tab clickeado
                var tabData = {
                    value: $(this).data('tab-value'),
                    index: $(this).data('tab-index'),
                    item: $(this).data('tab-item'),
                    element: this
                };
                
                // Actualizamos el tab content correspondiente
                var tabPaneId = $(this).attr('href');
                $(tabPaneId).addClass('show active').siblings().removeClass('show active');
                
                // Si hay un callback definido, lo ejecutamos
                if (typeof prop.onTabClick === 'function') {
                    prop.onTabClick.call(self, tabData);
                }
                
                // También dispara un evento personalizado
                $(self).trigger('tabChanged', [tabData]);
            });

            prop.getSeleccion = function(){
                var activeTab = $("#" + prop.name).find('.nav-link.active');    
                console.log(activeTab);
                if (activeTab.length > 0) {
                    // Retorna un objeto con toda la información relevante
                    return {
                        element: activeTab[0],
                        value: activeTab.data('tab-value'),
                        index: activeTab.data('tab-index'),
                        item: activeTab.data('tab-item'),
                        text: activeTab.find('span').text()
                    };
                }                
                return null; // Si no hay ningún tab seleccionado
            }

            prop.option = function(property,value){
                if(typeof(property) === 'string'){
                    if(value == undefined){
                        return prop[property];
                    }else{
                        if(property == "source"){
                            tab.find('li').remove();
                            count=0;

                            value.forEach(function(item) {
                                var navItemId = "tab-" + (item[prop.valueProp] || count); // ID único para cada tab
                                var nav = $("<li>").addClass("nav-item");
                                var a = $("<a>")
                                    .addClass("nav-link")
                                    .attr("data-bs-toggle", "tab")
                                    .attr("role", "tab")
                                    .attr("href", "#" + navItemId) // Usamos el ID único
                                    .attr("data-tab-value", item[prop.valueProp]) // Almacenamos el valor
                                    .attr("data-tab-index", count) // Almacenamos el índice
                                    .data("tab-item", item); // Almacenamos el objeto completo
                                
                                if (count == 0) {
                                    a.addClass("active");
                                }
                                
                                $("<span>").text(item[prop.textProp]).appendTo(a);
                                nav.append(a);
                                tab.append(nav);
                                
                                count++;
                            });
                        }
                    }
                }
            }

            var idGeneral = $(this).attr("id");
            controls[idGeneral] = prop;
            return this;
        }
    },
    multiCheckComboFeg: function(prop) {
        if (prop === "inst") {
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        } else {
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }
            
            // Propiedades por defecto
            prop.widget = "multiCheckComboFeg";
            prop.name = $(this).attr("id");
            if (!prop.hasOwnProperty("width")) { prop.width = "100%"; }
            if (!prop.hasOwnProperty("valueProp")) { prop.valueProp = "id"; }
            if (!prop.hasOwnProperty("textProp")) { prop.textProp = "text"; }
            if (!prop.hasOwnProperty("placeholder")) { prop.placeholder = "Seleccione opciones"; }
            if (!prop.hasOwnProperty("source")) { prop.source = []; }
            if (!prop.hasOwnProperty("selectedValues")) { prop.selectedValues = []; }
            if (!prop.hasOwnProperty("onValueChanged")) { prop.onValueChanged = null; }
            if (!prop.hasOwnProperty("maxVisibleTags")) { prop.maxVisibleTags = 3; }
            
            // Crear el contenedor principal
            const container = $(`
                <div id="${prop.name}" class="multi-check-combo" style="width: ${prop.width}; position: relative;">
                    <button class="combo-toggle form-select text-start" type="button" 
                            style="width: 100%; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                        <span class="selected-tags-container" style="display: inline-flex; flex-wrap: nowrap; overflow: hidden;"></span>
                        <span class="placeholder-text">${prop.placeholder}</span>
                    </button>
                    <div class="combo-dropdown" style="display: none; position: absolute; width: 100%; 
                        z-index: 1000; background: white; border: 1px solid #ced4da; border-radius: 0.25rem; 
                        max-height: 300px; overflow-y: auto;">
                        <div class="combo-search" style="padding: 5px; border-bottom: 1px solid #eee;">
                            <input type="text" class="form-control form-control-sm" placeholder="Buscar...">
                        </div>
                        <div class="combo-options" style="padding: 5px;"></div>
                    </div>
                </div>
            `);
            
            // Reemplazar el elemento original
            $(this).replaceWith(container);
            
            // Función para actualizar los tags visibles
            const updateButtonText = () => {
                const selectedItems = prop.source
                    .filter(item => prop.selectedValues.includes(item[prop.valueProp]))
                    .map(item => item[prop.textProp]);
                    
                const toggleBtn = container.find('.combo-toggle');
                const tagsContainer = container.find('.selected-tags-container');
                const placeholder = container.find('.placeholder-text');
                
                tagsContainer.empty();
                
                if (selectedItems.length === 0) {
                    placeholder.text(prop.placeholder).show();
                    return;
                }
                
                placeholder.hide();
                
                // Mostrar solo los tags que caben
                let visibleTags = 0;
                let remainingCount = 0;
                const containerWidth = container.width();
                let usedWidth = 0;
                
                for (let i = 0; i < selectedItems.length; i++) {
                    if (visibleTags >= prop.maxVisibleTags) {
                        remainingCount = selectedItems.length - i;
                        break;
                    }
                    
                    const tag = $(`
                        <span class="selected-tag" 
                            style="display: inline-flex; align-items: center; background: #e9ecef; 
                                    border-radius: 0.25rem; padding: 0 0.5rem; margin-right: 0.3rem; 
                                    font-size: 0.875rem; white-space: nowrap; max-width: 100px; 
                                    overflow: hidden; text-overflow: ellipsis;">
                            ${selectedItems[i]}
                        </span>
                    `);
                    
                    // Verificar si cabe el tag más el posible contador
                    const tagWidth = tag.outerWidth(true);
                    const remainingTag = remainingCount > 0 ? 
                        $(`<span style="margin-left: 0.3rem;">+${remainingCount}</span>`) : 
                        null;
                    
                    const remainingWidth = containerWidth - usedWidth - (remainingTag ? remainingTag.outerWidth(true) : 0) - 20;
                    
                    if (tagWidth <= remainingWidth) {
                        tagsContainer.append(tag);
                        usedWidth += tagWidth;
                        visibleTags++;
                    } else {
                        remainingCount = selectedItems.length - i;
                        break;
                    }
                }
                
                if (remainingCount > 0) {
                    tagsContainer.append(`<span style="margin-left: 0.3rem;">+${remainingCount}</span>`);
                }
            };
            
            // [El resto del código permanece igual hasta la función renderOptions]
            // Función para renderizar las opciones
            const renderOptions = (filter = '') => {
                const optionsContainer = container.find('.combo-options');
                optionsContainer.empty();
                
                const filteredItems = prop.source.filter(item => 
                    item[prop.textProp].toLowerCase().includes(filter.toLowerCase()));
                
                if (filteredItems.length === 0) {
                    optionsContainer.append('<div class="text-center p-2">No hay opciones</div>');
                    return;
                }
                
                filteredItems.forEach(item => {
                    const isChecked = prop.selectedValues.includes(item[prop.valueProp]);
                    optionsContainer.append(`
                        <div class="form-check" style='padding-left:2rem'>
                            <input class="form-check-input" type="checkbox" 
                                value="${item[prop.valueProp]}" 
                                id="${prop.name}_${item[prop.valueProp]}" 
                                ${isChecked ? 'checked' : ''}>
                            <label class="form-check-label" for="${prop.name}_${item[prop.valueProp]}">
                                ${item[prop.textProp]}
                            </label>
                        </div>
                    `);
                });
            };
            
            // [El resto del código permanece igual]
            // Evento para mostrar/ocultar el dropdown
            container.find('.combo-toggle').click(function(e) {
                e.stopPropagation();
                const dropdown = container.find('.combo-dropdown');
                $('.combo-dropdown').not(dropdown).hide();
                dropdown.toggle();
                if (dropdown.is(':visible')) {
                    container.find('.combo-search input').focus();
                }
            });
            
            // Evento para búsqueda
            container.find('.combo-search input').on('input', function() {
                renderOptions($(this).val());
            });
            
            // Evento para selección/deselección
            container.on('change', '.combo-options input[type="checkbox"]', function() {
                const value = $(this).val();
                const isChecked = $(this).is(':checked');
                
                if (isChecked && !prop.selectedValues.includes(value)) {
                    prop.selectedValues.push(value);
                } else if (!isChecked) {
                    prop.selectedValues = prop.selectedValues.filter(v => v !== value);
                }
                
                updateButtonText();
                
                if (prop.onValueChanged) {
                    prop.onValueChanged({
                        values: prop.selectedValues,
                        selectedItems: prop.source.filter(item => 
                            prop.selectedValues.includes(item[prop.valueProp]))
                    });
                }
            });
            
            // Cerrar dropdown al hacer clic fuera
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.multi-check-combo').length) {
                    container.find('.combo-dropdown').hide();
                }
            });
            
            // Métodos públicos
            prop.option = function(property, value) {
                if (typeof property === 'string') {
                    if (value === undefined) {
                        return prop[property];
                    } else {
                        prop[property] = value;
                        
                        if (property === "source" || property === "selectedValues") {
                            renderOptions();
                            updateButtonText();
                        }
                        
                        if (property === "selectedValues") {
                            if (prop.onValueChanged) {
                                prop.onValueChanged({
                                    values: prop.selectedValues,
                                    selectedItems: prop.source.filter(item => 
                                        prop.selectedValues.includes(item[prop.valueProp]))
                                });
                            }
                        }
                    }
                }
            };
            
            // Inicializar
            renderOptions();
            updateButtonText();
            
            // Guardar en controles
            var idGeneral = $(this).attr("id");
            controls[idGeneral] = prop;
            return this;
        }
    },
    fileUploadFeg: function(prop) {
    if (prop === "inst") {
        var idGeneral = $(this).attr("id");
        return controls[idGeneral];
    } else {
        var idGeneral = $(this).attr("id");
        if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
            delete controls[idGeneral];
        }

        // Propiedades por defecto
        prop.widget = "fileUploadFeg";
        prop.name = $(this).attr("id");
        if (!prop.hasOwnProperty("width")) { prop.width = "100%"; }
        if (!prop.hasOwnProperty("accept")) { prop.accept = "*"; }
        if (!prop.hasOwnProperty("multiple")) { prop.multiple = false; }
        if (!prop.hasOwnProperty("maxFiles")) { prop.maxFiles = 5; }
        if (!prop.hasOwnProperty("maxSize")) { prop.maxSize = 5 * 1024 * 1024; }
        if (!prop.hasOwnProperty("additionalData")) { prop.additionalData = {}; }
        if (!prop.hasOwnProperty("getAdditionalData")) { prop.getAdditionalData = null; } // NUEVA PROPIEDAD
        if (!prop.hasOwnProperty("uploadUrl")) { prop.uploadUrl = "/api/upload"; }
        if (!prop.hasOwnProperty("onUploadStart")) { prop.onUploadStart = null; }
        if (!prop.hasOwnProperty("onUploadProgress")) { prop.onUploadProgress = null; }
        if (!prop.hasOwnProperty("onUploadComplete")) { prop.onUploadComplete = null; }
        if (!prop.hasOwnProperty("onError")) { prop.onError = null; }

        // Crear elementos del control
        const controlHTML = `
            <div class="file-upload-container" style="width: ${prop.width}">
                <input type="file" id="${prop.name}_input" style="display: none;" 
                    ${prop.multiple ? 'multiple' : ''} accept="${prop.accept}">
                <button type="button" class="btn btn-primary upload-btn">
                    <i class="fas fa-upload"></i> Seleccionar Archivos
                </button>
                <div class="file-list mt-2"></div>
                <div class="progress mt-2" style="display: none; height: 20px;">
                    <div class="progress-bar" role="progressbar" style="width: 0%"></div>
                </div>
            </div>
        `;

        // Inicializar control
        $(this).html(controlHTML);
        const $input = $(`#${prop.name}_input`);
        const $fileList = $(this).find('.file-list');
        const $progress = $(this).find('.progress');
        const $progressBar = $(this).find('.progress-bar');

        // Manejar clic en el botón
        $(this).find('.upload-btn').click(function() {
            $input.click();
        });

        // Manejar selección de archivos
        $input.change(function(e) {
            const files = Array.from(e.target.files);
            
            // Validar número de archivos
            if (prop.maxFiles && files.length > prop.maxFiles) {
                const errorMsg = `Máximo ${prop.maxFiles} archivos permitidos`;
                if (prop.onError) prop.onError({ message: errorMsg });
                alert(errorMsg);
                return;
            }

            // Mostrar lista de archivos seleccionados
            $fileList.empty();
            files.forEach(file => {
                $fileList.append(`
                    <div class="file-item mb-1">
                        <span>${file.name}</span>
                        <span class="file-size">(${(file.size / 1024).toFixed(2)} KB)</span>
                    </div>
                `);
            });

            // Subir archivos
            uploadFiles(files);
        });

        // Función para obtener datos adicionales (NUEVA FUNCIÓN)
        const getDynamicAdditionalData = () => {
            let dynamicData = {};
            
            // Prioridad 1: Función getAdditionalData
            if (typeof prop.getAdditionalData === "function") {
                try {
                    const result = prop.getAdditionalData();
                    if (result && typeof result === "object") {
                        dynamicData = { ...result };
                    }
                } catch (error) {
                    console.error("Error en getAdditionalData:", error);
                    if (prop.onError) {
                        prop.onError({ 
                            message: "Error al obtener datos adicionales: " + error.message,
                            type: "additional_data_error"
                        });
                    }
                    throw error; // Detener la subida
                }
            }
            // Prioridad 2: Datos adicionales estáticos
            else if (prop.additionalData && typeof prop.additionalData === "object") {
                dynamicData = { ...prop.additionalData };
            }
            
            return dynamicData;
        };

        // Función para subir archivos (MODIFICADA)
        const uploadFiles = (files) => {
            if (files.length === 0) return;

            // Validar tamaño de archivos
            for (const file of files) {
                if (file.size > prop.maxSize) {
                    const errorMsg = `El archivo ${file.name} excede el tamaño máximo de ${prop.maxSize / 1024 / 1024}MB`;
                    if (prop.onError) prop.onError({ message: errorMsg, file });
                    alert(errorMsg);
                    return;
                }
            }

            try {
                // Obtener datos adicionales dinámicamente
                const additionalData = getDynamicAdditionalData();
                
                // Preparar FormData
                const formData = new FormData();
                
                // Agregar archivos
                files.forEach(file => {
                    formData.append("files", file);
                });

                // Agregar datos adicionales
                for (const key in additionalData) {
                    if (additionalData[key] !== undefined && additionalData[key] !== null) {
                        formData.append(key, additionalData[key].toString());
                    }
                }

                // Debug: mostrar datos que se enviarán
                console.log("=== DEBUG FormData ===");
                for (let [key, value] of formData.entries()) {
                    console.log(key + ":", value);
                }
                console.log("======================");

                // Mostrar progreso
                $progress.show();
                
                // Disparar evento de inicio
                if (prop.onUploadStart) prop.onUploadStart({ 
                    files, 
                    additionalData: additionalData 
                });

                // Configurar AJAX
                const xhr = new XMLHttpRequest();
                
                // Progreso de subida
                xhr.upload.addEventListener("progress", (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        $progressBar.css("width", percent + "%").text(percent + "%");
                        if (prop.onUploadProgress) prop.onUploadProgress({ 
                            percent, 
                            loaded: e.loaded, 
                            total: e.total 
                        });
                    }
                });

                // Manejar respuesta
                xhr.addEventListener("load", () => {
                    if (xhr.status === 200) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (prop.onUploadComplete) prop.onUploadComplete(response);
                        } catch (e) {
                            if (prop.onError) prop.onError({ 
                                message: "Error al procesar respuesta del servidor",
                                response: xhr.responseText 
                            });
                        }
                    } else {
                        try {
                            const error = JSON.parse(xhr.responseText);
                            if (prop.onError) prop.onError(error);
                        } catch (e) {
                            if (prop.onError) prop.onError({ 
                                message: `Error ${xhr.status}: ${xhr.statusText}`,
                                status: xhr.status
                            });
                        }
                    }
                    $progress.hide();
                });

                // Manejar errores
                xhr.addEventListener("error", () => {
                    if (prop.onError) prop.onError({ 
                        message: "Error de conexión con el servidor",
                        type: "network_error"
                    });
                    $progress.hide();
                });

                // Enviar
                xhr.open("POST", prop.uploadUrl, true);
                xhr.setRequestHeader("Authorization", `${localStorage.getItem('authToken')}`);
                xhr.send(formData);

            } catch (error) {
                // Manejar errores en la preparación de datos
                $progress.hide();
                if (prop.onError) prop.onError({ 
                    message: error.message,
                    type: "preparation_error"
                });
            }
        };

        // Métodos públicos (ACTUALIZADOS)
        prop.option = function(property, value) {
            if (typeof property === 'string') {
                if (value === undefined) {
                    return prop[property];
                } else {
                    prop[property] = value;
                    
                    // Actualizaciones específicas
                    if (property === "additionalData" || property === "getAdditionalData") {
                        // Actualizar datos adicionales
                        console.log(`Propiedad ${property} actualizada`);
                    }
                }
            }
        };

        // Guardar en controles globales
        controls[idGeneral] = prop;
        return this;
    }
    },
    loadingPanelFeg: function(prop) {
        if (prop === "inst") {
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        } else {
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }

            // Propiedades por defecto
            prop.widget = "loadingPanelFeg";
            prop.name = $(this).attr("id");
            if (!prop.hasOwnProperty("message")) { prop.message = "Cargando..."; }
            if (!prop.hasOwnProperty("showSpinner")) { prop.showSpinner = true; }
            if (!prop.hasOwnProperty("spinnerType")) { prop.spinnerType = "image"; } // image, dots, circles, bars
            if (!prop.hasOwnProperty("customImage")) { prop.customImage = "/assets/images/logos/loading.gif"; }
            if (!prop.hasOwnProperty("imageWidth")) { prop.imageWidth = "80px"; }
            if (!prop.hasOwnProperty("imageHeight")) { prop.imageHeight = "80px"; }
            if (!prop.hasOwnProperty("overlay")) { prop.overlay = true; }
            if (!prop.hasOwnProperty("overlayColor")) { prop.overlayColor = "rgba(255, 255, 255, 0.8)"; }
            if (!prop.hasOwnProperty("zIndex")) { prop.zIndex = 9999; }
            if (!prop.hasOwnProperty("autoShow")) { prop.autoShow = false; }

            // Crear elementos del control
            const loadingHTML = `
                <div class="loading-panel-container" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: ${prop.zIndex};
                    display: none;
                    ${prop.overlay ? `background-color: ${prop.overlayColor};` : ''}
                ">
                    <div class="loading-content" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        background: white;
                        padding: 30px;
                        border-radius: 15px;
                        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
                        min-width: 200px;
                    ">
                        ${prop.showSpinner ? `
                        <div class="loading-spinner ${prop.spinnerType}" style="
                            margin-bottom: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        ">
                            ${getSpinnerHtml(prop.spinnerType, prop.customImage, prop.imageWidth, prop.imageHeight)}
                        </div>
                        ` : ''}
                        <div class="loading-message" style="
                            color: #333;
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                            font-weight: bold;
                        ">${prop.message}</div>
                    </div>
                </div>
            `;

            // Inicializar control
            $(this).html(loadingHTML);
            const $container = $(this).find('.loading-panel-container');

            // Función para generar el spinner HTML según el tipo
            function getSpinnerHtml(type, imageUrl, width, height) {
                switch(type) {
                    case 'image':
                        return `
                            <img src="${imageUrl}" 
                                alt="Cargando..." 
                                style="
                                    width: ${width};
                                    height: ${height};
                                    object-fit: contain;
                                "
                                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzUiIHN0cm9rZT0iI0ZGNkI2QiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjM1IiBzdHJva2U9IiM0NUJDN0QiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIi8+Cjwvc3ZnPg=='">
                        `;
                    
                    case 'dots':
                        return `
                            <div class="dots-spinner" style="display: inline-block; position: relative; width: 80px; height: 80px;">
                                <div style="position: absolute; top: 33px; width: 13px; height: 13px; border-radius: 50%; background: #ff6b6b; animation: dots1 0.6s infinite;"></div>
                                <div style="position: absolute; top: 33px; width: 13px; height: 13px; border-radius: 50%; background: #4ecdc4; animation: dots2 0.6s infinite;"></div>
                                <div style="position: absolute; top: 33px; width: 13px; height: 13px; border-radius: 50%; background: #45b7d1; animation: dots3 0.6s infinite;"></div>
                            </div>
                        `;
                    
                    default:
                        return getSpinnerHtml('image', imageUrl, width, height);
                }
            }

            // CSS para las animaciones (inyectarlo una sola vez)
            if (!$('#loading-panel-styles').length) {
                $('head').append(`
                    <style id="loading-panel-styles">
                        @keyframes dots1 {
                            0% { transform: scale(0); left: 0px; }
                            100% { transform: scale(1); left: 40px; }
                        }
                        @keyframes dots2 {
                            0% { transform: scale(1); left: 40px; }
                            100% { transform: scale(0); left: 80px; }
                        }
                        @keyframes dots3 {
                            0% { transform: scale(0); left: 80px; }
                            100% { transform: scale(1); left: 120px; }
                        }
                        
                        /* Animación para imagen personalizada */
                        .loading-spinner.image img {
                            animation: pulse 1.5s ease-in-out infinite both;
                        }
                        
                        @keyframes pulse {
                            0% { transform: scale(0.9); opacity: 0.8; }
                            50% { transform: scale(1.1); opacity: 1; }
                            100% { transform: scale(0.9); opacity: 0.8; }
                        }
                        
                        /* Rotación para imágenes tipo spinner */
                        .loading-spinner.image.rotate img {
                            animation: rotate 2s linear infinite;
                        }
                        
                        @keyframes rotate {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                `);
            }

            // Métodos públicos
            prop.show = function(message = null) {
                if (message) {
                    $(this).find('.loading-message').text(message);
                }
                $container.fadeIn(300);
                return this;
            };

            prop.hide = function() {
                $container.fadeOut(300);
                return this;
            };

            prop.setMessage = function(message) {
                $(this).find('.loading-message').text(message);
                return this;
            };

            prop.setImage = function(imageUrl, width = "80px", height = "80px") {
                const $spinner = $(this).find('.loading-spinner.image');
                if ($spinner.length) {
                    $spinner.html(`
                        <img src="${imageUrl}" 
                            alt="Cargando..." 
                            style="width: ${width}; height: ${height}; object-fit: contain;"
                            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMzUiIHN0cm9rZT0iI0ZGNkI2QiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjM1IiBzdHJva2U9IiM0NUJDN0QiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIi8+Cjwvc3ZnPg=='">
                    `);
                }
                return this;
            };

            prop.isVisible = function() {
                return $container.is(':visible');
            };

            // Mostrar automáticamente si está configurado
            if (prop.autoShow) {
                prop.show();
            }

            // Guardar en controles globales
            controls[idGeneral] = prop;
            return this;
        }
    },
    numFeg: function(prop) {
        if (prop === "inst") {
            var idGeneral = $(this).attr("id");
            return controls[idGeneral];
        } else {
            var idGeneral = $(this).attr("id");
            if (controls[idGeneral] != null && controls[idGeneral] != undefined) {
                delete controls[idGeneral];
            }

            // Propiedades por defecto
            prop.widget = "numericInputFeg";
            prop.name = $(this).attr("id");
            if (!prop.hasOwnProperty("format")) { prop.format = "number"; } // number, currency, percent
            if (!prop.hasOwnProperty("currencySymbol")) { prop.currencySymbol = "$"; } // $, €, £, etc.
            if (!prop.hasOwnProperty("decimalPlaces")) { prop.decimalPlaces = 2; }
            if (!prop.hasOwnProperty("thousandsSeparator")) { prop.thousandsSeparator = true; }
            if (!prop.hasOwnProperty("allowNegative")) { prop.allowNegative = false; }
            if (!prop.hasOwnProperty("minValue")) { prop.minValue = null; }
            if (!prop.hasOwnProperty("maxValue")) { prop.maxValue = null; }
            if (!prop.hasOwnProperty("placeholder")) { prop.placeholder = "0.00"; }
            if (!prop.hasOwnProperty("value")) { prop.value = null; }
            if (!prop.hasOwnProperty("onValueChanged")) { prop.onValueChanged = null; }
            if (!prop.hasOwnProperty("cssClass")) { prop.cssClass = "form-control"; }

            // Crear el input
            const inputHTML = `
                <input type="text" 
                    id="${prop.name}_input" 
                    class="${prop.cssClass}" 
                    placeholder="${prop.placeholder}"
                    style="text-align: right;">
            `;

            // Inicializar control
            $(this).html(inputHTML);
            const $input = $(`#${prop.name}_input`);

            // Función para formatear el valor
            const formatValue = (value, formatType) => {
                if (value === null || value === undefined || value === "") return "";

                let numValue = parseFloat(value);
                if (isNaN(numValue)) return value;

                // Aplicar límites
                if (prop.minValue !== null && numValue < prop.minValue) {
                    numValue = prop.minValue;
                }
                if (prop.maxValue !== null && numValue > prop.maxValue) {
                    numValue = prop.maxValue;
                }

                // Formatear según el tipo
                switch (formatType) {
                    case "currency":
                        return formatCurrency(numValue, prop.currencySymbol, prop.decimalPlaces, prop.thousandsSeparator);
                    case "percent":
                        return formatPercent(numValue, prop.decimalPlaces, prop.thousandsSeparator);
                    case "number":
                    default:
                        return formatNumber(numValue, prop.decimalPlaces, prop.thousandsSeparator);
                }
            };

            // Función para formatear moneda
            const formatCurrency = (value, symbol, decimals, useSeparator) => {
                return symbol + formatNumber(value, decimals, useSeparator);
            };

            // Función para formatear porcentaje
            const formatPercent = (value, decimals, useSeparator) => {
                return formatNumber(value, decimals, useSeparator) + "%";
            };

            // Función para formatear número
            const formatNumber = (value, decimals, useSeparator) => {
                const fixedValue = value.toFixed(decimals);
                
                if (!useSeparator) {
                    return fixedValue;
                }

                // Separador de miles
                const parts = fixedValue.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                return parts.join(".");
            };

            // Función para parsear el valor (quitar formato)
            const parseValue = (formattedValue) => {
                if (!formattedValue) return null;

                // Remover símbolos y separadores
                let cleanValue = formattedValue
                    .replace(new RegExp("\\" + prop.currencySymbol, "g"), "")
                    .replace(/%/g, "")
                    .replace(/,/g, "")
                    .trim();

                // Convertir a número
                const numValue = parseFloat(cleanValue);
                return isNaN(numValue) ? null : numValue;
            };

            // Establecer valor inicial
            if (prop.value !== null) {
                $input.val(formatValue(prop.value, prop.format));
            }

            // Eventos para formateo automático
            $input.on("blur", function() {
                const rawValue = $(this).val();
                const parsedValue = parseValue(rawValue);
                
                if (parsedValue !== null) {
                    $(this).val(formatValue(parsedValue, prop.format));
                    
                    // Disparar evento de cambio
                    if (prop.onValueChanged && prop.value !== parsedValue) {
                        prop.value = parsedValue;
                        prop.onValueChanged({
                            value: parsedValue,
                            formattedValue: $(this).val(),
                            element: this
                        });
                    }
                }
            });

            $input.on("focus", function() {
                const formattedValue = $(this).val();
                const parsedValue = parseValue(formattedValue);
                
                if (parsedValue !== null) {
                    $(this).val(parsedValue.toString());
                }
            });

            $input.on("input", function(e) {
                // Validar entrada en tiempo real
                const inputVal = $(this).val();
                
                // Permitir solo números, punto decimal, signo negativo y coma
                const validChars = /[0-9.,\-]/;
                if (inputVal && !validChars.test(inputVal.slice(-1))) {
                    $(this).val(inputVal.slice(0, -1));
                }
            });

            $input.on("keypress", function(e) {
                // Prevenir caracteres no válidos
                const char = String.fromCharCode(e.which);
                const validChars = /[0-9.\-]/;
                
                if (!validChars.test(char)) {
                    e.preventDefault();
                    return false;
                }

                // Validar único punto decimal
                if (char === "." && $(this).val().includes(".")) {
                    e.preventDefault();
                    return false;
                }

                // Validar único signo negativo
                if (char === "-" && ($(this).val().includes("-") || $(this).val().length > 0)) {
                    e.preventDefault();
                    return false;
                }
            });

            // Métodos públicos
            prop.option = function(property, value) {
                if (typeof property === 'string') {
                    if (value === undefined) {
                        return prop[property];
                    } else {
                        const oldValue = prop[property];
                        prop[property] = value;

                        // Actualizaciones específicas
                        if (property === "value") {
                            $input.val(formatValue(value, prop.format));
                        }
                        else if (property === "format" || property === "currencySymbol" || 
                                property === "decimalPlaces" || property === "thousandsSeparator") {
                            // Reformatear el valor actual con la nueva configuración
                            const currentValue = parseValue($input.val());
                            if (currentValue !== null) {
                                $input.val(formatValue(currentValue, prop.format));
                            }
                        }
                    }
                }
            };

            prop.getValue = function() {
                return parseValue($input.val());
            };

            prop.getFormattedValue = function() {
                return $input.val();
            };

            prop.setValue = function(value) {
                $input.val(formatValue(value, prop.format));
                prop.value = parseValue($input.val());
                return this;
            };

            prop.clear = function() {
                $input.val("");
                prop.value = null;
                return this;
            };

            prop.focus = function() {
                $input.focus();
                return this;
            };

            // Guardar en controles globales
            controls[idGeneral] = prop;
            return this;
        }
    }
});


function obtenerPropiedadesDeArreglo(arreglo) {
    if (arreglo.length === 0) return [];
    return [...new Set(arreglo.flatMap(obj => Object.keys(obj)))];
}