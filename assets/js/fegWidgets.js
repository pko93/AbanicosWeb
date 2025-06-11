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

            $("#"+$(this).attr("id")).addClass(claseBtnAdd);

            $("#"+$(this).attr("id")).onClick(function(){
                return prop.onClick();
            });
        }
    }
});