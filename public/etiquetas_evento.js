function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function etiquetasEvento(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (etiquetas) {// iterate etiquetas
;(function(){
  var $$obj = etiquetas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var etiqueta = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var etiqueta = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"etiqueta\"\u003E\u003Cp class=\"text-break\"\u003E" + (pug_escape(null == (pug_interp = etiqueta) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"botones_etiqueta\"\u003E\u003Cbutton class=\"but_editar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_editar_etiqueta_icon\" src=\"icon\u002Fpen-to-square.svg\" alt=\"Editar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003Cbutton class=\"but_eliminar_etiqueta\" type=\"button\"\u003E\u003Cimg class=\"but_eliminar_etiqueta_icon\" src=\"icon\u002Ftrash.svg\" alt=\"Eliminar Etiqueta\"\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);
}.call(this,"etiquetas" in locals_for_with?locals_for_with.etiquetas:typeof etiquetas!=="undefined"?etiquetas:undefined));;return pug_html;}