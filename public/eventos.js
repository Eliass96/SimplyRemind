function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function crearEventos(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (eventos) {// iterate eventos
;(function(){
  var $$obj = eventos;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var evento = $$obj[pug_index0];
pug_html = pug_html + "\u003Csection class=\"d-flex align-items-stretch justify-content-stretch flex-direction-row card-producto\" id=\"outputEventos\"\u003E\u003C\u002Fsection\u003E\u003Carticle" + (" class=\"evento\""+" id=\"evento\""+pug_attr("data-id-evento", evento._id, true, false)) + "\u003E\u003Cdiv class=\"cabecero_evento\"\u003E\u003Ch3\u003E" + (pug_escape(null == (pug_interp = evento.nombre) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003Cbutton class=\"but_cerrar_evento\" id=\"but_cerrar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_cerrar_evento_icon\" src=\"icon\u002Fdown-left-and-up-right-to-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_expandir_evento\" id=\"but_expandir_evento\" type=\"button\"\u003E\u003Cimg class=\"but_expandir_evento_icon\" src=\"icon\u002Fup-right-and-down-left-from-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"contenido_evento\" id=\"contenido_evento\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = evento.descripcion) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_evento\"\u003E\u003Cbutton class=\"but_editar_evento\" id=\"but_editar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_editar_evento_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_evento\" id=\"but_eliminar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_evento_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"dropdown_etiquetas_evento\"\u003E\u003Cbutton class=\"but_etiquetas_evento\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\"\u003E\u003Cimg class=\"but_etiquetas_evento_icon\" src=\"icon\u002Ftags.svg\" alt=\"Etiquetas de la nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"dropdown_content_filtros dropdown-menu\"\u003E\u003Cdiv class=\"add_etiqueta\"\u003E\u003Cp class=\"text-wrap\"\u003EAñadir etiqueta\u003C\u002Fp\u003E\u003Cbutton class=\"but_nueva_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_nueva_etiqueta_icon\" src=\"icon\u002Fplus.svg\" alt=\"Añadir Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cul id=\"lista_etiquetas\"\u003E";
// iterate evento.etiquetas
;(function(){
  var $$obj = evento.etiquetas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var etiqueta = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var etiqueta = $$obj[pug_index1];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var evento = $$obj[pug_index0];
pug_html = pug_html + "\u003Csection class=\"d-flex align-items-stretch justify-content-stretch flex-direction-row card-producto\" id=\"outputEventos\"\u003E\u003C\u002Fsection\u003E\u003Carticle" + (" class=\"evento\""+" id=\"evento\""+pug_attr("data-id-evento", evento._id, true, false)) + "\u003E\u003Cdiv class=\"cabecero_evento\"\u003E\u003Ch3\u003E" + (pug_escape(null == (pug_interp = evento.nombre) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003Cbutton class=\"but_cerrar_evento\" id=\"but_cerrar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_cerrar_evento_icon\" src=\"icon\u002Fdown-left-and-up-right-to-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_expandir_evento\" id=\"but_expandir_evento\" type=\"button\"\u003E\u003Cimg class=\"but_expandir_evento_icon\" src=\"icon\u002Fup-right-and-down-left-from-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"contenido_evento\" id=\"contenido_evento\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = evento.descripcion) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_evento\"\u003E\u003Cbutton class=\"but_editar_evento\" id=\"but_editar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_editar_evento_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_evento\" id=\"but_eliminar_evento\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_evento_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"dropdown_etiquetas_evento\"\u003E\u003Cbutton class=\"but_etiquetas_evento\" type=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\"\u003E\u003Cimg class=\"but_etiquetas_evento_icon\" src=\"icon\u002Ftags.svg\" alt=\"Etiquetas de la nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"dropdown_content_filtros dropdown-menu\"\u003E\u003Cdiv class=\"add_etiqueta\"\u003E\u003Cp class=\"text-wrap\"\u003EAñadir etiqueta\u003C\u002Fp\u003E\u003Cbutton class=\"but_nueva_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_nueva_etiqueta_icon\" src=\"icon\u002Fplus.svg\" alt=\"Añadir Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cul id=\"lista_etiquetas\"\u003E";
// iterate evento.etiquetas
;(function(){
  var $$obj = evento.etiquetas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var etiqueta = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var etiqueta = $$obj[pug_index2];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);
}.call(this,"eventos" in locals_for_with?locals_for_with.eventos:typeof eventos!=="undefined"?eventos:undefined));;return pug_html;}