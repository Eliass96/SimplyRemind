function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function crearEventos(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (evento, eventos, notas) {// iterate eventos 
;(function(){
  var $$obj = eventos ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var evento = $$obj[pug_index0];
pug_html = pug_html + "\u003Coutput id=\"output_eventos\"\u003E\u003C\u002Foutput\u003E\u003Carticle class=\"evento\"\u003E\u003C\u002Farticle\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var evento = $$obj[pug_index0];
pug_html = pug_html + "\u003Coutput id=\"output_eventos\"\u003E\u003C\u002Foutput\u003E\u003Carticle class=\"evento\"\u003E\u003C\u002Farticle\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cdiv class=\"cabecero_evento\"\u003E\u003Ch3\u003E" + (pug_escape(null == (pug_interp = evento.nombre) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003Cbutton class=\"but_cerrar_evento\" id=\"but_cerrar_evento\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fdown-left-and-up-right-to-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_expandir_evento\" id=\"but_expandir_evento\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fup-right-and-down-left-from-center.svg\" alt=\"Cerrar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"contenido_evento\"\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = evento.texto) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_evento\"\u003E\u003Cbutton class=\"but_editar_evento\" id=\"but_editar_evento\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_evento\" id=\"but_eliminar_evento\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Evento\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
// iterate notas
;(function(){
  var $$obj = notas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var nota = $$obj[pug_index1];
pug_html = pug_html + "\u003Coutput class=\"alta d-flex align-items-stretch justify-content-stretch flex-direction-row\"\u003E\u003Carticle class=\"todas_las_notas\"\u003E\u003C\u002Farticle\u003E\u003C\u002Foutput\u003E\u003Col" + (" class=\"todas_las_notas\""+pug_attr("ol", true, true, false)) + "\u003E\u003Cli" + (" class=\"todas_las_notas\""+pug_attr("li", true, true, false)) + "\u003E\u003C!--input(type='color' value='' #{nota.color})--\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = nota.titulo) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cbutton class=\"but_eliminar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_duplicar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fclone.svg\" alt=\"Duplicar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var nota = $$obj[pug_index1];
pug_html = pug_html + "\u003Coutput class=\"alta d-flex align-items-stretch justify-content-stretch flex-direction-row\"\u003E\u003Carticle class=\"todas_las_notas\"\u003E\u003C\u002Farticle\u003E\u003C\u002Foutput\u003E\u003Col" + (" class=\"todas_las_notas\""+pug_attr("ol", true, true, false)) + "\u003E\u003Cli" + (" class=\"todas_las_notas\""+pug_attr("li", true, true, false)) + "\u003E\u003C!--input(type='color' value='' #{nota.color})--\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = nota.titulo) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cbutton class=\"but_eliminar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_duplicar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fclone.svg\" alt=\"Duplicar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
    }
  }
}).call(this);
}.call(this,"evento" in locals_for_with?locals_for_with.evento:typeof evento!=="undefined"?evento:undefined,"eventos" in locals_for_with?locals_for_with.eventos:typeof eventos!=="undefined"?eventos:undefined,"notas" in locals_for_with?locals_for_with.notas:typeof notas!=="undefined"?notas:undefined));;return pug_html;}