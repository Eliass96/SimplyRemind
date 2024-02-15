function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function crearNotas(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (notas) {// iterate notas
;(function(){
  var $$obj = notas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var nota = $$obj[pug_index0];
pug_html = pug_html + "\u003Coutput class=\"d-flex align-items-stretch justify-content-stretch flex-direction-row\" id=\"output_notas\"\u003E\u003Carticle class=\"todas_las_notas\"\u003E\u003C\u002Farticle\u003E\u003C\u002Foutput\u003E\u003Col class=\"todas_las_notas\"\u003E\u003Cli" + (" class=\"todas_las_notas\""+pug_attr("data-id-nota", nota._id, true, false)) + "\u003E\u003C!--input(type='color' value='' #{nota.color})--\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = nota.titulo) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cbutton class=\"but_eliminar_nota_lista\" id=\"but_eliminar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_duplicar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fclone.svg\" alt=\"Duplicar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var nota = $$obj[pug_index0];
pug_html = pug_html + "\u003Coutput class=\"d-flex align-items-stretch justify-content-stretch flex-direction-row\" id=\"output_notas\"\u003E\u003Carticle class=\"todas_las_notas\"\u003E\u003C\u002Farticle\u003E\u003C\u002Foutput\u003E\u003Col class=\"todas_las_notas\"\u003E\u003Cli" + (" class=\"todas_las_notas\""+pug_attr("data-id-nota", nota._id, true, false)) + "\u003E\u003C!--input(type='color' value='' #{nota.color})--\u003E\u003Ca href=\"#\"\u003E" + (pug_escape(null == (pug_interp = nota.titulo) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cbutton class=\"but_eliminar_nota_lista\" id=\"but_eliminar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_duplicar_nota_lista\" type=\"button\"\u003E\u003Cimg src=\"icon\u002Fclone.svg\" alt=\"Duplicar Nota\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
    }
  }
}).call(this);
}.call(this,"notas" in locals_for_with?locals_for_with.notas:typeof notas!=="undefined"?notas:undefined));;return pug_html;}