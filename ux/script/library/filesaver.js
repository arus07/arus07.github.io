var saveAs=saveAs||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var b=a.document,c=function(){return a.URL||a.webkitURL||a},d=b.createElementNS("http://www.w3.org/1999/xhtml","a"),e="download"in d,f=function(c){var d=b.createEvent("MouseEvents");d.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null),c.dispatchEvent(d)},g=a.webkitRequestFileSystem,h=a.requestFileSystem||g||a.mozRequestFileSystem,i=function(b){(a.setImmediate||a.setTimeout)(function(){throw b},0)},j="application/octet-stream",k=0,l=500,m=function(b){var d=function(){"string"==typeof b?c().revokeObjectURL(b):b.remove()};a.chrome?d():setTimeout(d,l)},n=function(a,b,c){b=[].concat(b);for(var d=b.length;d--;){var e=a["on"+b[d]];if("function"==typeof e)try{e.call(a,c||a)}catch(f){i(f)}}},o=function(b,i){var l,o,p,q=this,r=b.type,s=!1,t=function(){n(q,"writestart progress write writeend".split(" "))},u=function(){if((s||!l)&&(l=c().createObjectURL(b)),o)o.location.href=l;else{var d=a.open(l,"_blank");void 0==d&&"undefined"!=typeof safari&&(a.location.href=l)}q.readyState=q.DONE,t(),m(l)},v=function(a){return function(){return q.readyState!==q.DONE?a.apply(this,arguments):void 0}},w={create:!0,exclusive:!1};return q.readyState=q.INIT,i||(i="download"),e?(l=c().createObjectURL(b),d.href=l,d.download=i,f(d),q.readyState=q.DONE,t(),void m(l)):(/^\s*(?:text\/(?:plain|xml)|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(b.type)&&(b=new Blob(["\ufeff",b],{type:b.type})),a.chrome&&r&&r!==j&&(p=b.slice||b.webkitSlice,b=p.call(b,0,b.size,j),s=!0),g&&"download"!==i&&(i+=".download"),(r===j||g)&&(o=a),h?(k+=b.size,void h(a.TEMPORARY,k,v(function(a){a.root.getDirectory("saved",w,v(function(a){var c=function(){a.getFile(i,w,v(function(a){a.createWriter(v(function(c){c.onwriteend=function(b){o.location.href=a.toURL(),q.readyState=q.DONE,n(q,"writeend",b),m(a)},c.onerror=function(){var a=c.error;a.code!==a.ABORT_ERR&&u()},"writestart progress write abort".split(" ").forEach(function(a){c["on"+a]=q["on"+a]}),c.write(b),q.abort=function(){c.abort(),q.readyState=q.DONE},q.readyState=q.WRITING}),u)}),u)};a.getFile(i,{create:!1},v(function(a){a.remove(),c()}),v(function(a){a.code===a.NOT_FOUND_ERR?c():u()}))}),u)}),u)):void u())},p=o.prototype,q=function(a,b){return new o(a,b)};return p.abort=function(){var a=this;a.readyState=a.DONE,n(a,"abort")},p.readyState=p.INIT=0,p.WRITING=1,p.DONE=2,p.error=p.onwritestart=p.onprogress=p.onwrite=p.onabort=p.onerror=p.onwriteend=null,q}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});