/*! jQuery v2.1.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.1",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+Math.random()}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)
},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=l.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,n.ajaxSettings),b):tc(n.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=n.ajaxSettings.xhr();a.ActiveXObject&&n(a).on("unload",function(){for(var a in Dc)Dc[a]()}),k.cors=!!Fc&&"withCredentials"in Fc,k.ajax=Fc=!!Fc,n.ajaxTransport(function(a){var b;return k.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Ic=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Jc})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Lc=a.jQuery,Mc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Mc),b&&a.jQuery===n&&(a.jQuery=Lc),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map
/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=c3993dbf83942839aee0)
 * Config saved to config.json and https://gist.github.com/c3993dbf83942839aee0
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";function s(e,i){var o=t.proxy(this.process,this);this.$body=t("body"),this.$scrollElement=t(t(e).is("body")?window:e),this.options=t.extend({},s.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",o),this.refresh(),this.process()}function e(e){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),r="object"==typeof e&&e;o||i.data("bs.scrollspy",o=new s(this,r)),"string"==typeof e&&o[e]()})}s.VERSION="3.2.0",s.DEFAULTS={offset:10},s.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},s.prototype.refresh=function(){var s="offset",e=0;t.isWindow(this.$scrollElement[0])||(s="position",e=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var i=this;this.$body.find(this.selector).map(function(){var i=t(this),o=i.data("target")||i.attr("href"),r=/^#./.test(o)&&t(o);return r&&r.length&&r.is(":visible")&&[[r[s]().top+e,o]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){i.offsets.push(this[0]),i.targets.push(this[1])})},s.prototype.process=function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,e=this.getScrollHeight(),i=this.options.offset+e-this.$scrollElement.height(),o=this.offsets,r=this.targets,l=this.activeTarget;if(this.scrollHeight!=e&&this.refresh(),s>=i)return l!=(t=r[r.length-1])&&this.activate(t);if(l&&s<=o[0])return l!=(t=r[0])&&this.activate(t);for(t=o.length;t--;)l!=r[t]&&s>=o[t]&&(!o[t+1]||s<=o[t+1])&&this.activate(r[t])},s.prototype.activate=function(s){this.activeTarget=s,t(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var e=this.selector+'[data-target="'+s+'"],'+this.selector+'[href="'+s+'"]',i=t(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")};var i=t.fn.scrollspy;t.fn.scrollspy=e,t.fn.scrollspy.Constructor=s,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var s=t(this);e.call(s,s.data())})})}(jQuery);
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./js/main":[function(require,module,exports){
var stylecow = require('stylecow');

module.exports = function (code, plugins, support) {
	stylecow.setConfig({
		support: support,
		plugins: plugins,
	});

	return stylecow.convert(code).toString();
}

},{"stylecow":48}],1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
var color = {
	namedHues: {
		'red': 0,
		'orangish red': 7.5,
		'red orange': 15,
		'orange red': 15,
		'reddish orange': 22.5,
		'orange': 30,
		'yellowish orange': 37.5,
		'orange yellow': 45,
		'yellow orange': 45,
		'orangish yellow': 52.5,
		'yellow': 60,
		'greenish yellow': 75,
		'yellow green': 90,
		'green yellow': 90,
		'yellowish green': 105,
		'green': 120,
		'bluish green': 150,
		'green blue': 180,
		'blue green': 180,
		'greenish blue': 210,
		'blue': 240,
		'purplish blue': 255,
		'blue purple': 270,
		'purple blue': 270,
		'bluish purple': 285,
		'purple': 300,
		'reddish purple': 315,
		'red purple': 330,
		'purple red': 330,
		'purplish red': 345
	},

	names: {
		'aliceblue': '#F0F8FF',
		'antiquewhite': '#FAEBD7',
		'aqua': '#00FFFF',
		'aquamarine': '#7FFFD4',
		'azure': '#F0FFFF',
		'beige': '#F5F5DC',
		'bisque': '#FFE4C4',
		'black': '#000000',
		'blanchedalmond': '#FFEBCD',
		'blue': '#0000FF',
		'blueviolet': '#8A2BE2',
		'brown': '#A52A2A',
		'burlywood': '#DEB887',
		'cadetblue': '#5F9EA0',
		'chartreuse': '#7FFF00',
		'chocolate': '#D2691E',
		'coral': '#FF7F50',
		'cornflowerblue': '#6495ED',
		'cornsilk': '#FFF8DC',
		'crimson': '#DC143C',
		'cyan': '#00FFFF',
		'darkblue': '#00008B',
		'darkcyan': '#008B8B',
		'darkgoldenrod': '#B8860B',
		'darkgray': '#A9A9A9',
		'darkgrey': '#A9A9A9',
		'darkgreen': '#006400',
		'darkkhaki': '#BDB76B',
		'darkmagenta': '#8B008B',
		'darkolivegreen': '#556B2F',
		'darkorange': '#FF8C00',
		'darkorchid': '#9932CC',
		'darkred': '#8B0000',
		'darksalmon': '#E9967A',
		'darkseagreen': '#8FBC8F',
		'darkslateblue': '#483D8B',
		'darkslategray': '#2F4F4F',
		'darkslategrey': '#2F4F4F',
		'darkturquoise': '#00CED1',
		'darkviolet': '#9400D3',
		'deeppink': '#FF1493',
		'deepskyblue': '#00BFFF',
		'dimgray': '#696969',
		'dimgrey': '#696969',
		'dodgerblue': '#1E90FF',
		'firebrick': '#B22222',
		'floralwhite': '#FFFAF0',
		'forestgreen': '#228B22',
		'fuchsia': '#FF00FF',
		'gainsboro': '#DCDCDC',
		'ghostwhite': '#F8F8FF',
		'gold': '#FFD700',
		'goldenrod': '#DAA520',
		'gray': '#80808@0',
		'grey': '#808080',
		'green': '#008000',
		'greenyellow': '#ADFF2F',
		'honeydew': '#F0FFF0',
		'hotpink': '#FF69B4',
		'indianred ': '#CD5C5C',
		'indigo ': '#4B0082',
		'ivory': '#FFFFF0',
		'khaki': '#F0E68C',
		'lavender': '#E6E6FA',
		'lavenderblush': '#FFF0F5',
		'lawngreen': '#7CFC00',
		'lemonchiffon': '#FFFACD',
		'lightblue': '#ADD8E6',
		'lightcoral': '#F08080',
		'lightcyan': '#E0FFFF',
		'lightgoldenrodyellow': '#FAFAD2',
		'lightgray': '#D3D3D3',
		'lightgrey': '#D3D3D3',
		'lightgreen': '#90EE90',
		'lightpink': '#FFB6C1',
		'lightsalmon': '#FFA07A',
		'lightseagreen': '#20B2AA',
		'lightskyblue': '#87CEFA',
		'lightslategray': '#778899',
		'lightslategrey': '#778899',
		'lightsteelblue': '#B0C4DE',
		'lightyellow': '#FFFFE0',
		'lime': '#00FF00',
		'limegreen': '#32CD32',
		'linen': '#FAF0E6',
		'magenta': '#FF00FF',
		'maroon': '#800000',
		'mediumaquamarine': '#66CDAA',
		'mediumblue': '#0000CD',
		'mediumorchid': '#BA55D3',
		'mediumpurple': '#9370D8',
		'mediumseagreen': '#3CB371',
		'mediumslateblue': '#7B68EE',
		'mediumspringgreen': '#00FA9A',
		'mediumturquoise': '#48D1CC',
		'mediumvioletred': '#C71585',
		'midnightblue': '#191970',
		'mintcream': '#F5FFFA',
		'mistyrose': '#FFE4E1',
		'moccasin': '#FFE4B5',
		'navajowhite': '#FFDEAD',
		'navy': '#000080',
		'oldlace': '#FDF5E6',
		'olive': '#808000',
		'olivedrab': '#6B8E23',
		'orange': '#FFA500',
		'orangered': '#FF4500',
		'orchid': '#DA70D6',
		'palegoldenrod': '#EEE8AA',
		'palegreen': '#98FB98',
		'paleturquoise': '#AFEEEE',
		'palevioletred': '#D87093',
		'papayawhip': '#FFEFD5',
		'peachpuff': '#FFDAB9',
		'peru': '#CD853F',
		'pink': '#FFC0CB',
		'plum': '#DDA0DD',
		'powderblue': '#B0E0E6',
		'purple': '#800080',
		'red': '#FF0000',
		'rebeccapurple': '#663399',
		'rosybrown': '#BC8F8F',
		'royalblue': '#4169E1',
		'saddlebrown': '#8B4513',
		'salmon': '#FA8072',
		'sandybrown': '#F4A460',
		'seagreen': '#2E8B57',
		'seashell': '#FFF5EE',
		'sienna': '#A0522D',
		'silver': '#C0C0C0',
		'skyblue': '#87CEEB',
		'slateblue': '#6A5ACD',
		'slategray': '#708090',
		'slategrey': '#708090',
		'snow': '#FFFAFA',
		'springgreen': '#00FF7F',
		'steelblue': '#4682B4',
		'tan': '#D2B48C',
		'teal': '#008080',
		'thistle': '#D8BFD8',
		'tomato': '#FF6347',
		'turquoise': '#40E0D0',
		'violet': '#EE82EE',
		'wheat': '#F5DEB3',
		'white': '#FFFFFF',
		'whitesmoke': '#F5F5F5',
		'yellow': '#FFFF00',
		'yellowgreen': '#9ACD32'
	},


	// hex: 00000000-FFFFFFFF
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HEX_RGBA: function (hex) {
		var r,g,b,a;

		switch (hex.length) {
			case 3:
				r = hex[0] + hex[0];
				g = hex[1] + hex[1];
				b = hex[2] + hex[2];
				a = 'ff';
				break;

			case 4:
				r = hex[0] + hex[0];
				g = hex[1] + hex[1];
				b = hex[2] + hex[2];
				a = hex[3] + hex[3];
				break;

			case 6:
				r = hex[0] + hex[1];
				g = hex[2] + hex[3];
				b = hex[4] + hex[5];
				a = 'ff';
				break;

			case 8:
				r = hex[0] + hex[1];
				g = hex[2] + hex[3];
				b = hex[4] + hex[5];
				a = hex[6] + hex[7];
				break;
		}

		return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), number(parseInt(a, 16) / 255, 1)];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hex: 000000-FFFFFF
	RGBA_HEX: function (rgba) {
		var r = ((rgba[0] > 255) ? 255 : (rgba[0] < 0 ? 0 : rgba[0])).toString(16),
			g = ((rgba[1] > 255) ? 255 : (rgba[1] < 0 ? 0 : rgba[1])).toString(16),
			b = ((rgba[2] > 255) ? 255 : (rgba[2] < 0 ? 0 : rgba[2])).toString(16);

		if (r.length === 1) {
			r = '0' + r;
		}
		if (g.length === 1) {
			g = '0' + g;
		}
		if (b.length === 1) {
			b = '0' + b;
		}

		return (r + g + b).toUpperCase();
	},


	// gray: 0-255 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	GRAY_RGBA: function (gray) {
		return [gray[0], gray[0], gray[0], gray[1]];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hsla: 0-360 / 0-100 / 0-100 / 0-1
	RGBA_HSLA: function (rgba) {
		var r = rgba[0] / 255,
			g = rgba[1] / 255,
			b = rgba[2] / 255,
			a = rgba[3],
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			l = (max + min) / 2,
			h,
			s;

		if (delta === 0) {
			h = 0;
			s = 0;
		} else {
			if (l < 0.5) {
				s = delta / (max + min);
			} else {
				s = delta / (2 - max - min);
			}

			var delta_r = (((max - r) / 6) + (delta / 2)) / delta;
			var delta_g = (((max - g) / 6) + (delta / 2)) / delta;
			var delta_b = (((max - b) / 6) + (delta / 2)) / delta;

			if (r === max) {
				h = delta_b - delta_g;
			} else if (g === max) {
				h = (1 / 3) + delta_r - delta_b;
			} else if (b === max) {
				h = (2 / 3) + delta_g - delta_r;
			}

			if (h < 0) {
				h += 1;
			}

			if (h > 1) {
				h -= 1;
			}
		}

		return [Math.round(h * 360), (s.toFixed(2) * 100), (l.toFixed(2) * 100), a];
	},


	// hsla: 0-360 / 0-100 / 0-100 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HSLA_RGBA: function (hsla) {
		var h = hsla[0],
			s = hsla[1]/100,
			l = hsla[2]/100,
			a = hsla[3],
			r,
			g,
			b;

		if (h > 0) {
			h /= 360;
		}

		if (s === 0) {
			r = l;
			g = l;
			b = l;
		} else {
			var t1, t2, rt3, gt3, bt3;

			if (l < 0.5) {
				t2 = l * (1.0 + s);
			} else {
				t2 = (l + s) - (l * s);
			}

			t1 = 2.0 * l - t2;

			rt3 = h + 1.0/3.0;
			gt3 = h;
			bt3 = h - 1.0/3.0;

			if (rt3 < 0) {
				rt3 += 1.0;
			}
			if (rt3 > 1) {
				rt3 -= 1.0;
			}
			if (gt3 < 0) {
				gt3 += 1.0;
			}
			if (gt3 > 1) {
				gt3 -= 1.0;
			}
			if (bt3 < 0) {
				bt3 += 1.0;
			}
			if (bt3 > 1) {
				bt3 -= 1.0;
			}

			if (6.0 * rt3 < 1) {
				r = t1 + (t2 - t1) * 6.0 * rt3;
			} else if (2.0 * rt3 < 1) {
				r = t2;
			} else if (3.0 * rt3 < 2) {
				r = t1 + (t2 - t1) * ((2.0/3.0) - rt3) * 6.0;
			} else {
				r = t1;
			}

			if (6.0 * gt3 < 1) {
				g = t1 + (t2 - t1) * 6.0 * gt3;
			} else if (2.0 * gt3 < 1) {
				g = t2;
			} else if (3.0 * gt3 < 2) {
				g = t1 + (t2 - t1) * ((2.0/3.0) - gt3) * 6.0;
			} else {
				g = t1;
			}

			if (6.0 * bt3 < 1) {
				b = t1 + (t2 - t1) * 6.0 * bt3;
			} else if (2.0 * bt3 < 1) {
				b = t2;
			} else if (3.0 * bt3 < 2) {
				b = t1 + (t2 - t1) * ((2.0/3.0) - bt3) * 6.0;
			} else {
				b = t1;
			}
		}

		r = Math.round(255 * r);
		g = Math.round(255 * g);
		b = Math.round(255 * b);

		return [r, g, b, a];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	// hwba: 0-360 / 0-100 / 0-100 / 0-1
	RGBA_HWBA: function (rgba) {
		var r = rgba[0],
			g = rgba[1],
			b = rgba[2],
			a = rgba[3],
			h = color.RGBA_HSLA(rgba)[0],
			w = 1/255 * Math.min(r, Math.min(g, b)),
			b = 1 - 1/255 * Math.max(r, Math.max(g, b));

		w = Math.round(100 * w);
		b = Math.round(100 * b);

		return [h, w, b, a];
	},


	// hwba: 0-360 / 0-100 / 0-100 / 0-1
	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	HWBA_RGBA: function (hwba) {
		var h = hwba[0] / 360,
			wh = hwba[1] / 100,
			bl = hwba[2] / 100,
			ratio = wh + bl,
			i, v, f, n;

		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}

		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;

		if ((i & 0x01) != 0) {
			f = 1 - f;
		}

		n = wh + f * (v - wh);

		switch (i) {
			default:
			case 6:
			case 0:
				r = v;
				g = n;
				b = wh;
				break;

			case 1:
				r = n;
				g = v;
				b = wh;
				break;

			case 2:
				r = wh;
				g = v;
				b = n;
				break;

			case 3:
				r = wh;
				g = n;
				b = v;
				break;

			case 4:
				r = n;
				g = wh;
				b = v;
				break;

			case 5:
				r = v;
				g = wh;
				b = n;
				break;
		}

		r = Math.round(255 * r);
		g = Math.round(255 * g);
		b = Math.round(255 * b);

		return [r, g, b, hwba[3]];
	},


	// rgba: 0-255 / 0-255 / 0-255 / 0-1
	toRGBA: function (value, method) {
		if ((typeof value === 'object') && value.type !== undefined) {
			if (value.type === 'Function') {
				return color.toRGBA(value.content, value.name);
			}
			
			return color.toRGBA(value.name);
		}

		if (typeof value === 'string') {
			if (value[0] === '#') {
				return color.HEX_RGBA(value.substr(1));
			}
			if (value.toLowerCase() === 'transparent') {
				return [0, 0, 0, 0];
			}
			if (color.names[value.toLowerCase()]) {
				return color.HEX_RGBA(color.names[value.toLowerCase()].substr(1));
			}
			if (color.namedHues[value.toLowerCase()] !== undefined) {
				return color.HSLA_RGBA([color.namedHues[value.toLowerCase()], 100, 50, 1]);
			}
		}

		switch (method) {
			case 'rgb':
			case 'rgba':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				return [number(value[0], 255), number(value[1], 255), number(value[2], 255), number(value[3], 1)];

			case 'hsl':
			case 'hsla':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				if (color.namedHues[value[0].toLowerCase()] !== undefined) {
					value[0] = color.namedHues[value[0].toLowerCase()];
				}

				return color.HSLA_RGBA([parseInt(value[0]), number(value[2], 100), number(value[3], 100), number(value[4], 1)]);

			case 'hwb':
			case 'hwba':
				if (value[3] === undefined) {
					value[3] = 1;
				}

				if (color.namedHues[value[0].toLowerCase()] !== undefined) {
					value[0] = color.namedHues[value[0].toLowerCase()];
				}

				return color.HWBA_RGBA([parseInt(value[0]), number(value[2], 100), number(value[3], 100), number(value[4], 1)]);

			case 'gray':
				if (value[1] === undefined) {
					value[1] = 1;
				}

				return color.GRAY_RGBA([number(value[0], 255), number(value[1], 1)]);
		}

		return [0, 0, 0, 1];
	}
};


function number (color, max) {
	if (typeof color === 'string') {
		if (color.indexOf('%') !== -1) {
			color = ((max / 100) * parseFloat(color, 10));
		} else {
			color = parseFloat(color, 10);
		}
	}

	if (max === 1) {
		color = parseFloat(color.toFixed(2));
	} else {
		color = Math.round(color);
	}

	if (color > max) {
		return max;
	}

	if (color < 0) {
		return 0;
	}

	return color;
}


module.exports = color;

},{}],3:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Normalizes the calc function

	stylecow.addTask({
		"Function": {
			calc: function (fn) {
				var keyword = fn[0];
				keyword.name = keyword.name.replace(/([\w\%])\s*([\+\-])\s*/g, '$1 $2 ');
			}
		}
	});
};

},{}],4:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Add the old syntax of rect()

	stylecow.addTask({
		disable: {
			explorer: 8.0
		},
		"Function": {
			rect: function (fn) {
				var declaration = fn.ancestor('Declaration', 'clip');

				if (declaration) {
					declaration.insertAfter('*clip: rect(' + fn.join(' ') + ')');
				}
			}
		}
	});
};

},{}],5:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support of break-before, break-after, break-inside in webkit using the non-standard -webkit-column-break-

	stylecow.addTask({
		disable: {
			chrome: 21.0,
			safari: 6.1,
			android: 4.4,
			ios: 7.0
		},
		Declaration: function (declaration) {
			if (declaration.is(null, ['break-before', 'break-after', 'break-inside'], 'column')) {
				declaration.insertBefore('-webkit-column-' + declaration.name + ':always');
			}
		}
	});
};

},{}],6:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Fix the double margin bug in ie6 on float block elements

	stylecow.addTask({
		disable: {
			explorer: 7.0
		},
		Declaration: {
			float: function (declaration) {
				if (declaration.is(null, null, ['left', 'right'])) {
					declaration.insertAfter('_display: inline');
				}
			}
		}
	});
};

},{}],7:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 8

	stylecow.addTask({
		disable: {
			explorer: 8.0
		},
		Declaration: {
			display: function (declaration) {
				if (declaration.is(null, null, 'inline-block')) {
					declaration.insertAfter('*zoom: 1').insertAfter('*display: inline');
				}
			}
		}
	});
};

},{}],8:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 8

	stylecow.addTask({
		disable: {
			explorer: 7.0
		},
		Declaration: {
			'min-height': function (declaration) {
				declaration.insertBefore('_height:' + declaration.value);
			}
		}
	});
};

},{}],9:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds support in explorer < 9

	stylecow.addTask({
		disable: {
			explorer: 9.0
		},
		Declaration: {
			opacity: function (declaration) {
				var rule = declaration.ancestor('Rule');

				if (rule) {
					rule.addOldMsFilter('alpha(opacity=' + (parseFloat(declaration.value, 10) * 100) + ')');
				}
			}
		}
	});
};

},{}],10:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Convert two-colon pseudoelements to one-colon for explorer < 9

	stylecow.addTask({
		disable: {
			explorer: 9.0
		},
		Keyword: {
			"::after": function (keyword) {
				keyword.name = ':after';
			},
			"::before": function (keyword) {
				keyword.name = ':before';
			},
			"::first-line": function (keyword) {
				keyword.name = ':first-line';
			},
			"::first-letter": function (keyword) {
				keyword.name = ':first-letter';
			}
		}
	});
};

},{}],11:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//add ie9 fallback that support vm instead vmin

	stylecow.addTask({
		disable: {
			explorer: 10.0
		},
		Declaration: function (declaration) {
			if (declaration.value.indexOf('vmin') !== -1) {
				var clone = declaration.cloneBefore();

				clone.search('Keyword', /([0-9\.]+)vmin/).forEach(function (keyword) {
					keyword.name = keyword.name.slice(0, -2);
				});
				clone.vendor = 'ms';
			}
		}
	});
};

},{}],12:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^animation/)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			},
			AtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-moz-' + atrule.name;
				}
			}
		},

		//Adds -o- vendor prefixes
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^animation/)) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			},
			AtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-o-' + atrule.name;
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^animation/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			},
			AtRule: {
				"keyframes": function (atrule) {
					atrule.cloneBefore().name = '-webkit-' + atrule.name;
				}
			}
		}
	]);
};

},{}],13:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"appearance": function (declaration) {
					declaration.cloneBefore().name = '-moz-appearance';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"appearance": function (declaration) {
					declaration.cloneBefore().name = '-webkit-appearance';
				}
			}
		}
	]);
};

},{}],14:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-moz-background-origin';
				}
			}
		},

		//Adds -o- vendor prefixes
		{
			disable: {
				opera: 10.5
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-o-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-o-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-o-background-origin';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				android: 3.0
			},
			Declaration: {
				"background-size": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-size';
				},
				"background-clip": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-clip';
				},
				"background-origin": function (declaration) {
					declaration.cloneBefore().name = '-webkit-background-origin';
				}
			}
		}
	]);
};

},{}],15:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Fix old syntax in firefox <13 in border-radius
		{
			disable: {
				firefox: 13.0
			},
			Declaration: {
				'border-top-left-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-topleft';
				},
				'border-top-right-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-topright';
				},
				'border-bottom-left-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-bottomleft';
				},
				'border-bottom-right-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius-bottomright';
				}
			}
		},

		//Adds -moz- vendor prefix to border-radius
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				'border-radius': function (declaration) {
					declaration.cloneBefore().name = '-moz-border-radius';
				}
			}
		},

		//Adds -webkit- vendor prefix to border-radius
		{
			disable: { 
				chrome: 5.0,
				safari: 5.0,
				ios: 4.0,
				android: 2.2
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-.*radius$/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Adds -webkit- vendor prefix to border-start,end,after,before
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-(start|end|after|before)/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Adds -moz- vendor prefix to border-start,end
		{
			disable: { 
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-(start|end)/)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Adds -moz- vendor prefix to border-image
		{
			disable: { 
				firefox: 15.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-image/)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Adds -o- vendor prefix to border-image
		{
			disable: { 
				opera: 15.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-image/)) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		//Adds -webkit- vendor prefix to border-image
		{
			disable: { 
				chrome: 16.0,
				safari: 6.0,
				android: 4.4
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^border-image/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

},{}],16:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 4.0
			},
			Declaration: {
				"box-shadow": function (declaration) {
					declaration.cloneBefore().name = '-moz-box-shadow';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				ios: 5.0,
				android: 4.0
			},
			Declaration: {
				"box-shadow": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-shadow';
				}
			}
		}
	]);
};

},{}],17:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefixes
		{
			disable: {
				firefox: 29.0
			},
			Declaration: {
				"box-sizing": function (declaration) {
					declaration.cloneBefore().name = '-moz-box-sizing';
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				ios: 5.0,
				android: 4.0
			},
			Declaration: {
				"box-sizing": function (declaration) {
					declaration.cloneBefore().name = '-webkit-box-sizing';
				}
			}
		}
	]);
};

},{}],18:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.has('Function', 'calc')) {
					declaration.cloneBefore().search('Function', 'calc').forEach(function (fn) {
						fn.name = '-moz-' + fn.name;
					});
				}
			}
		},

		//Adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				ios: 7.0
			},
			Declaration: function (declaration) {
				if (declaration.has('Function', 'calc')) {
					declaration.cloneBefore().search('Function', 'calc').forEach(function (fn) {
						fn.name = '-webkit-' + fn.name;
					});
				}
			}
		}
	]);
};

},{}],19:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefixes
		{
			disable: {
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^column/)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		// Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^column/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		}
	]);
};

},{}],20:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz- vendor prefix to cursor: zoom-in / zoom-out
		{
			disable: {
				firefox: 24.0
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has('Keyword', ['zoom-in', 'zoom-out'])) {
						declaration.cloneBefore().search('Keyword', ['zoom-in', 'zoom-out']).forEach(function (keyword) {
							keyword.name = '-moz-' + keyword;
						});
					}
				}
			}
		},

		//Adds -moz- vendor prefix to cursor: grab / grabbing
		{
			disable: {
				firefox: 27.0
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has('Keyword', ['grab', 'grabbing'])) {
						declaration.cloneBefore().search('Keyword', ['grab', 'grabbing']).forEach(function (keyword) {
							keyword.name = '-moz-' + keyword;
						});
					}
				}
			}
		},

		//Adds -webkit- vendor prefix to some cursor values
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				'cursor': function (declaration) {
					if (declaration.has('Keyword', ['zoom-in', 'zoom-out', 'grab', 'grabbing'])) {
						declaration.cloneBefore().search('Keyword', ['zoom-in', 'zoom-out', 'grab', 'grabbing']).forEach(function (keyword) {
							keyword.name = '-webkit-' + keyword;
						});
					}
				}
			}
		}
	]);
};

},{}],21:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -moz- vendor prefix

	stylecow.addTask({
		disable: {
			firefox: false
		},
		AtRule: {
			"document": function (atrule) {
				atrule.cloneBefore().name = '-moz-document';
			}
		}
	});
};

},{}],22:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Adds -moz-full-screen vendor prefix
		{
			disable: {
				firefox: false
			},
			Rule: function (rule) {
				if (rule.has('Keyword', ':fullscreen')) {
					rule.cloneBefore().search('Keyword', ':fullscreen').forEach(function (keyword) {
						keyword.name = ':-moz-full-screen';
					});
				}
			}
		},

		//Adds -webkit-full-screen vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Rule: function (rule) {
				if (rule.has('Keyword', ':fullscreen')) {
					rule.cloneBefore().search('Keyword', ':fullscreen').forEach(function (keyword) {
						keyword.name = ':-webkit-full-screen';
					});
				}
			}
		},

		//Adds -ms-fullscreen vendor prefix
		{
			disable: {
				explorer: false
			},
			Rule: function (rule) {
				if (rule.has('Keyword', ':fullscreen')) {
					rule.cloneBefore().search('Keyword', ':fullscreen').forEach(function (keyword) {
						keyword.name = ':-ms-fullscreen';
					});
				}
			}
		}
	]);
};

},{}],23:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -ms- vendor prefix

	stylecow.addTask({
		disable: {
			explorer: false
		},
		Declaration: function (declaration) {
			if (declaration.is(null, 'display', 'grid')) {
				return declaration.cloneBefore().value = '-ms-grid';
			}

			if (declaration.is(null, /^grid.*$/)) {
				return declaration.cloneBefore().name = '-ms-' + declaration.name;
			}
		}
	});
};

},{}],24:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -moz- vendor prefix

	stylecow.addTask({
		disable: {
			firefox: 3.0
		},
		Declaration: {
			display: function (declaration) {
				if (declaration.is(null, null, 'inline-block')) {
					declaration.insertAfter('display: -moz-inline-block');
				}
			}
		}
	});
};

},{}],25:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -webkit- vendor prefix

	stylecow.addTask({
		disable: {
			chrome: false,
			safari: false,
			android: false,
			ios: false
		},
		Declaration: function (declaration) {
			if (declaration.is(null, /^mask/)) {
				declaration.cloneBefore().name = '-webkit-' + declaration.name;
			}
		}
	});
};

},{}],26:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -o- vendor prefix

	stylecow.addTask({
		disable: {
			opera: 15.0
		},
		Declaration: {
			"object-fit": function (declaration) {
				declaration.cloneBefore().name = '-o-object-fit';
			},
			"object-position": function (declaration) {
				declaration.cloneBefore().name = '-o-object-position';
			}
		}
	});
};

},{}],27:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Add -moz- vendor prefix in ::input-placeholder for Firefox > 18 and ::selection
		{
			disable: {
				firefox: false
			},
			RuleBefore: function (rule) {
				if (rule.has('Keyword', ['::input-placeholder', '::selection'])) {
					var clone = rule.cloneBefore();

					clone.search('Keyword', ['::input-placeholder', '::selection']).forEach(function (keyword) {
						keyword.name = (keyword.name === '::input-placeholder') ? '::-moz-placeholder' : '::-moz-selection';
					});
				}
			}
		},

		// Add -webkit- vendor prefix in ::input-placeholder
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			RuleBefore: function (rule) {
				if (rule.has('Keyword', '::input-placeholder')) {
					rule.cloneBefore().search('Keyword', '::input-placeholder').forEach(function (keyword) {
						keyword.name = '::-webkit-input-placeholder';
					});
				}
			}
		},

		// Add -ms- vendor prefix in ::input-placeholder
		{
			disable: {
				explorer: false
			},
			RuleBefore: function (rule) {
				if (rule.has('Keyword', '::input-placeholder')) {
					rule.cloneBefore().search('Keyword', '::input-placeholder').forEach(function (keyword) {
						keyword.name = ':-ms-input-placeholder';
					});
				}
			}
		}
	]);
};

},{}],28:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, 'region-fragment')) {
					return declaration.cloneBefore().name = '-webkit-region-fragment';
				}

				if (declaration.is(null, /^flow/)) {
					return declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		// Adds -ms- vendor prefix
		{
			disable: {
				explorer: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^flow/)) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		}
	]);
};

},{}],29:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Firefox supports "-moz-available" property rather than "-moz-fill-available"',
		{
			disable: {
				firefox: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^(min-|max-)?(width|height)$/, 'fill-available')) {
					declaration.cloneBefore().value = '-moz-available';
				}
			}
		},

		//Adds -moz- vendor prefix to max|min|fit-content
		{
			disable: { firefox: false },
			Declaration: function (declaration) {
				if (declaration.is(null, /^(min-|max-)?(width|height)$/, ['max-content', 'min-content', 'fit-content'])) {
					declaration.cloneBefore().value = '-moz-' + declaration.value;
				}
			}
		},

		//Adds -webkit- vendor prefixes
		{
			disable: {
				chrome: false,
				safari: false,
				opera: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^(min-|max-)?(width|height)$/, ['fill-available', 'max-content', 'min-content', 'fit-content'])) {
					declaration.cloneBefore().value = '-webkit-' + declaration.value;
				}
			}
		}
	]);
};

},{}],30:[function(require,module,exports){
module.exports = function (stylecow) {
	
	//Adds -webkit- vendor prefix

	stylecow.addTask({
		disable: {
			chrome: false,
			safari: false,
			android: false,
			ios: false
		},
		Declaration: {
			position: function (declaration) {
				if (declaration.value === 'sticky') {
					declaration.insertBefore('position: -webkit-sticky');
				}
			}
		}
	});
};

},{}],31:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		//Add -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^(transform.*|perspective.*|backface-visibility)$/)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		//Add -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^(transform.*|perspective.*|backface-visibility)$/)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		//Add -o- vendor prefix
		{
			disable: { opera:
				12.1
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^transform/)) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		//Add -ms- vendor prefix
		{
			disable: {
				explorer: 10.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^transform/)) {
					declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		}
	]);
};

},{}],32:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^transition/) && !declaration.has(null, null, null, true)) {
					declaration.cloneBefore().name = '-moz-' + declaration.name;
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				android: 4.4
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^transition/) && !declaration.has(null, null, null, true)) {
					declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}
			}
		},

		// Adds -o- vendor prefix
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^transition/) && !declaration.has(null, null, null, true)) {
					declaration.cloneBefore().name = '-o-' + declaration.name;
				}
			}
		},

		// Adds -moz- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				firefox: 16.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, ['-moz-transition', '-moz-transition-property'])) {
					declaration.search('Keyword', ['transform', 'transform-origin']).forEach(function (keyword) {
						keyword.name = '-moz-' + keyword.name;
					});
				}
			}
		},

		// Adds -webkit- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: function (declaration) {
				if (declaration.is(null, ['-webkit-transition', '-webkit-transition-property'])) {
					declaration.search('Keyword', ['transform', 'transform-origin']).forEach(function (keyword) {
						keyword.name = '-webkit-' + keyword.name;
					});
				}
			}
		},

		// Adds -o- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				opera: 12.1
			},
			Declaration: function (declaration) {
				if (declaration.is(null, ['-o-transition', '-o-transition-property'])) {
					declaration.search('Keyword', ['transform', 'transform-origin']).forEach(function (keyword) {
						keyword.name = '-o-' + keyword.name;
					});
				}
			}
		},

		// Adds -ms- vendor prefix to transition-property: transform|transform-origin
		{
			disable: {
				explorer: 10.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, ['transition', 'transition-property']) && declaration.has('Keyword', ['transform', 'transform-origin'])) {
					declaration.cloneBefore().search('Keyword', ['transform', 'transform-origin']).forEach(function (keyword) {
						keyword.name = '-ms-' + keyword.name;
					});
				}
			}
		}
	]);
};

},{}],33:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"text-align-last": function (declaration) {
					declaration.cloneBefore().name = '-moz-text-align-last';
				},
				"font-feature-settings": function (declaration) {
					declaration.cloneBefore().name = '-moz-font-feature-settings';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-moz-hyphens';
				},
				"tab-size": function (declaration) {
					declaration.cloneBefore().name = '-moz-tab-size';
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"font-feature-settings": function (declaration) {
					declaration.cloneBefore().name = '-webkit-font-feature-settings';
				},
				"text-size-adjust": function (declaration) {
					declaration.cloneBefore().name = '-webkit-text-size-adjust';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-webkit-hyphens';
				}
			}
		},

		// Adds -ms- vendor prefix to text-size-adjust
		{
			disable: {
				explorer: false
			},
			Declaration: {
				"text-size-adjust": function (declaration) {
					declaration.cloneBefore().name = '-ms-text-size-adjust';
				},
				"hyphens": function (declaration) {
					declaration.cloneBefore().name = '-ms-hyphens';
				}
			}
		},

		// Adds -o- vendor prefix to text-overflow
		{
			disable: {
				opera: 11.0
			},
			Declaration: {
				"text-overflow": function (declaration) {
					declaration.cloneBefore().name = '-o-text-overflow';
				}
			}
		},

		// Adds -o- vendor prefix to tab-size
		{
			disable: {
				opera: 15.0
			},
			Declaration: {
				"tab-size": function (declaration) {
					declaration.cloneBefore().name = '-o-tab-size';
				}
			}
		}
	]);
};

},{}],34:[function(require,module,exports){
module.exports = function (stylecow) {
	stylecow.addTask([
		// Adds -moz- vendor prefix
		{
			disable: {
				firefox: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-moz-user-select';
				}
			}
		},

		// Adds -webkit- vendor prefix
		{
			disable: {
				chrome: false,
				safari: false,
				android: false,
				ios: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-webkit-user-select';
				}
			}
		},

		// Adds -ms- vendor prefix
		{
			disable: {
				explorer: false
			},
			Declaration: {
				"user-select": function (declaration) {
					declaration.cloneBefore().name = '-ms-user-select';
				}
			}
		}
	]);
};

},{}],35:[function(require,module,exports){
(function (stylecow) {
	stylecow.codeStyles = {
		"normal": {
			"indent": "\t",
			"linebreak": "\n",
			"selectorJoiner": ", ",
			"argumentJoiner": ", ",
			"valueJoiner": ", ",
			"ruleColon": ": ",
			"ruleEnd": ";",
			"comments": "all", // (all|important|none)
			"commentStart": "/* ",
			"commentEnd": " */",
			"rulesetStart": " {\n",
			"rulesetEnd": "\n}"
		},
		"minify": {
			"indent": "",
			"linebreak": "",
			"selectorJoiner": ",",
			"argumentJoiner": ",",
			"valueJoiner": ",",
			"ruleColon": ":",
			"ruleEnd": ";",
			"comments": "none",
			"commentStart": "/*",
			"commentEnd": "*/",
			"rulesetStart": "{",
			"rulesetEnd": "}"
		}
	};

	stylecow.defaults = {
		code: "normal",
		support: {
			"explorer": 8.0,
			"firefox": 30.0,
			"chrome": 35.0,
			"safari": 6.0,
			"opera": 22.0,
			"android": 4.0,
			"ios": 6.0
		},
		plugins: []
	};

})(require('./index'));

},{"./index":48}],36:[function(require,module,exports){
(function (stylecow) {

	stylecow.AtRule = function (name) {
		this.type = 'AtRule';
		this.name = name;
	};

	stylecow.AtRule.create = function (string) {
		return stylecow.Rule.create(string);
	};

	stylecow.AtRule.prototype = Object.create(stylecow.Rule.prototype, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				var vendor = name.match(/^\-(\w+)\-/);
				this.vendor = vendor ? vendor[0] : null;

				this._name = name;
			}
		},

		toString: {
			value: function () {
				var code = stylecow.Rule.prototype.toString.call(this);

				return code ? ('@' + this.name + ' ' + code) : '';
			}
		},

		toCode: {
			value: function () {
				var code = stylecow.Rule.prototype.toCode.call(this);

				return code ? ('@' + this.name + ' ' + code) : '';
			}
		}
	});
})(require('../index'));

},{"../index":48}],37:[function(require,module,exports){
(function (stylecow) {

	stylecow.Base = Object.create(Array.prototype, {
		executeTasks: {
			value: function (tasks, vendor) {
				if (vendor) {
					if (this.vendor && this.vendor !== vendor) {
						return this.remove();
					}
				} else {
					vendor = this.vendor;
				}

				stylecow.utils.forEach(tasks[this.type + 'Before'], function (functions, name) {
					if ((name === '*') || (name === this.name)) {
						functions.forEach(function (fn) {
							fn(this);
						}, this);
					}
				}, this);

				var k = 0;

				while (this[k]) {
					var child = this[k];

					if (child.executed) {
						++k;
						continue;
					}

					child.executeTasks(tasks, vendor);

					k = 0;
				}

				stylecow.utils.forEach(tasks[this.type], function (functions, name) {
					if ((name === '*') || (name === this.name)) {
						functions.forEach(function (fn) {
							fn(this);
						}, this);
					}
				}, this);

				this.executed = true;
			}
		},

		clone: {
			value: function () {
				return stylecow[this.type].create(this.toString());
			}
		},

		is: {
			value: function (type, name, value, vendor) {
				if (type && !equals(this.type, type)) {
					return false;
				}

				if (name && !equals(this.name, name)) {
					return false;
				}

				if (value && !equals(this.value, value)) {
					return false;
				}

				if (vendor && !equals(this.vendor, vendor)) {
					return false;
				}

				return true;
			}
		},

		children: {
			value: function (type, name, value, vendor) {
				return this.filter(function (child) {
					return child.is(type, name, value, vendor);
				});
			}
		},

		hasChild: {
			value: function (type, name, value, vendor) {
				return this.some(function (child) {
					return child.is(type, name, value, vendor);
				});
			}
		},

		search: {
			value: function (type, name, value, vendor, result) {
				result = result || [];

				if (this.is(type, name, value,vendor)) {
					result.push(this);
				}

				for (var i = 0, t = this.length; i < t; i++) {
					this[i].search(type, name, value, vendor, result);
				}

				return result;
			}
		},

		has: {
			value: function (type, name, value, vendor) {
				if (this.is(type, name, value, vendor)) {
					return true;
				}

				for (var i = 0, t = this.length; i < t; i++) {
					if (this[i].has(type, name, value, vendor)) {
						return true;
					}
				}

				return false;
			}
		},

		ancestor: {
			value: function (type, name, value, vendor) {
				if (this.is(type, name, value, vendor)) {
					return this;
				}

				if (this.parent) {
					return this.parent.ancestor(type, name, value, vendor);
				}
			}
		},

		content: {
			get: function () {
				return this.map(function (child) {
					return child.toString();
				});
			},
			set: function (value) {
				this.splice(0);

				if (value instanceof Array) {
					value.forEach(function (v) {
						this.add(v);
					}, this);
				} else {
					this.add(value);
				}
			}
		},

		getData: {
			value: function (key) {
				if (this._data && (key in this._data)) {
					return this._data[key];
				}

				if (this.parent) {
					return this.parent.getData(key);
				}
			}
		},

		setData: {
			value: function (key, value) {
				if (!this._data) {
					this._data = {};
				}

				this._data[key] = value;

				return this;
			}
		},

		files: {
			get: function () {
				var files = {};

				this.search()
					.filter(function (child) {
						return (child._data && child._data['sourceFile']);
					})
					.map(function (child) {
						return child._data['sourceFile'];
					})
					.forEach(function (file) {
						files[file] = null;
					});

				return Object.getOwnPropertyNames(files);
			}
		},

		index: {
			value: function () {
				if (this.parent) {
					return this.parent.indexOf(this);
				}

				return -1;
			}
		},

		add: {
			value: function (child, index, after) {
				if (typeof child !== 'object') {
					child = this.parseChild(''+child);
				}

				child.detach();
				child.parent = this;

				if (index === undefined || (after && index === this.length)) {
					this.push(child);
				} else {
					this.splice(after ? index + 1 : index, 0, child);
				}

				return child;
			}
		},

		append: {
			value: function (child) {
				this.add(child);
			}
		},

		prepend: {
			value: function (child) {
				this.add(child, 0);
			}
		},

		insertBefore: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					return this.parent.add(child, index);
				}
			}
		},

		insertAfter: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					return this.parent.add(child, index, true);
				}
			}
		},

		cloneBefore: {
			value: function () {
				return this.insertBefore(this.clone());
			}
		},

		cloneAfter: {
			value: function () {
				return this.insertAfter(this.clone());
			}
		},

		replaceWith: {
			value: function (child) {
				var index = this.index();

				if (index !== -1) {
					var parent = this.parent;
					this.remove();

					return parent.add(child, index);
				}
			}
		},

		remove: {
			value: function (propagate) {
				if (!propagate) {
					this.detach();
				}

				this.forEach(function (child) {
					child.remove(true);
				});

				this.parent = null;
				this.splice(0);

				return this;
			}
		},

		detach: {
			value: function () {
				var index = this.index();

				if (index !== -1) {
					this.parent.splice(index, 1);
					this.parent = null;
				}

				return this;
			}
		},

		toCode: {
			value: function () {
				return this.toString();
			}
		}
	});

	function equals (value, needle) {
		if (needle === true) {
			return value ? true : false;
		}

		if (typeof needle === 'string') {
			return (needle === value);
		}

		if (needle instanceof Array) {
			return (needle.indexOf(value) !== -1);
		}

		if (needle instanceof RegExp) {
			return needle.test(value);
		}

		return true;
	}

})(require('../index'));

},{"../index":48}],38:[function(require,module,exports){
(function (stylecow) {

	stylecow.Comment = function (text) {
		this.type = 'Comment';
		this.text = text;
	};

	stylecow.Comment.create = function (string) {
		var matches = string.match(/^\s*\/\*((.|\s)+)\*\/\s*$/m);

		return new stylecow.Comment(matches[1]);
	};

	stylecow.Comment.prototype = Object.create(stylecow.Base, {

		text: {
			get: function () {
				return this._text;
			},
			set: function (value) {
				value = value.trim();

				if (value[0] === '!') {
					this.important = true;
					value = value.substr(1).trim();
				} else {
					this.important = false;
				}

				this._text = value;
			}
		},

		toString: {
			value: function () {
				return '/* ' + (this.important ? '! ' : '') + this._text + ' */';
			}
		},

		toCode: {
			value: function () {
				if (!this._text || stylecow.codeStyle.comments === 'none' || (stylecow.codeStyle.comments === 'important' && !this.important)) {
					return '';
				}

				return stylecow.codeStyle.commentStart + (this.important ? '! ' : '') + this._text + stylecow.codeStyle.commentEnd;
			}
		}
	});
})(require('../index'));

},{"../index":48}],39:[function(require,module,exports){
(function (stylecow) {

	stylecow.Declaration = function (name, value) {
		this.type = 'Declaration';
		this.name = name;
		this.value = value;
	};

	stylecow.Declaration.create = function (string) {
		var pieces = stylecow.utils.explodeTrim(':', string, 2);

		if (pieces[1].substr(-1) === ';') {
			pieces[1] = pieces[1].slice(0, -1);
		}

		return new stylecow.Declaration(pieces[0], pieces[1]);
	};

	stylecow.Declaration.prototype = Object.create(stylecow.Base, {

		parseChild: {
			value: function (string) {
				var value = stylecow.Value.create(string);

				if (value.length === 1) {
					return value[0];
				}

				return value;
			}
		},

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				if (name[0] === '*' || name[0] === '_') {
					this.vendor = 'ms';
				} else {
					var vendor = name.match(/^\-(\w+)\-/);
					this.vendor = vendor ? vendor[0] : null;
				}

				this._name = name;
			}
		},

		value: {
			get: function () {
				return this.join(',');
			},
			set: function (value) {
				this.content = stylecow.utils.explodeTrim(',', value);
			}
		},

		toString: {
			value: function () {
				return this.name + ': ' + this.join(', ') + ';';
			}
		},

		toCode: {
			value: function () {
				var value = this.map(function (child) {
					return child.toCode();
				}).join(stylecow.codeStyle.valueJoiner);

				if (this.name === '-ms-filter') {
					value = "'" + value + "'";
				}

				return this.name + stylecow.codeStyle.ruleColon + value + stylecow.codeStyle.ruleEnd;
			}
		}
	});
})(require('../index'));

},{"../index":48}],40:[function(require,module,exports){
(function (stylecow) {

	stylecow.Function = function (name, args) {
		this.type = 'Function';
		this.name = name;
		this.content = args;
	};

	stylecow.Function.create = function (string) {
		var matches = string.match(/^([\w\.\:-]+)\((.*)\)$/);

		return new stylecow.Function(matches[1], stylecow.utils.explodeTrim(',', matches[2]));
	};

	stylecow.Function.prototype = Object.create(stylecow.Base, {

		parseChild: {
			value: function (string) {
				var value = stylecow.Value.create(string);

				if (value.length === 1) {
					return value[0];
				}

				return value;
			}
		},

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				var vendor = name.match(/^([:]+)?\-(\w+)\-/);
				this.vendor = vendor ? vendor[0] : null;
				this._name = name;
			}
		},

		toString: {
			value: function () {
				return this.name + '(' + this.join(', ') + ')';
			}
		},

		toCode: {
			value: function () {
				return this.name + '(' + this.map(function (child) {
					return child.toCode();
				}).join(stylecow.codeStyle.argumentJoiner) + ')';
			}
		}
	});
})(require('../index'));

},{"../index":48}],41:[function(require,module,exports){
(function (stylecow) {

	stylecow.Import = function (url) {
		this.type = 'Import';
		this.url = url;
	};

	stylecow.Import.create = function (string) {
		var matches = string.trim().match(/^\@import (url\()?['"]?([^'"\)]+)/);

		return new stylecow.Import(matches[2]);
	};

	stylecow.Import.prototype = Object.create(stylecow.Base, {

		toString: {
			value: function () {
				return '@import "' + this.url + '"';
			}
		},

		toCode: {
			value: function () {
				return this.toString() + stylecow.codeStyle.ruleEnd;
			}
		}
	});
})(require('../index'));

},{"../index":48}],42:[function(require,module,exports){
(function (stylecow) {

	stylecow.Keyword = function (name) {
		this.type = 'Keyword';
		this.name = name;
	};

	stylecow.Keyword.create = function (string) {
		return new stylecow.Keyword(string);
	};

	stylecow.Keyword.prototype = Object.create(stylecow.Base, {

		name: {
			get: function () {
				return this._name;
			},
			set: function (name) {
				var vendor = name.match(/^\-(\w+)\-/);
				this.vendor = vendor ? vendor[0] : null;
				this._name = name;
			}
		},

		toString: {
			value: function () {
				return this.name;
			}
		}
	});
})(require('../index'));

},{"../index":48}],43:[function(require,module,exports){
(function (stylecow) {

	stylecow.Root = function () {
		this.type = 'Root';
	};

	stylecow.Root.create = function (string) {
		return stylecow.utils.parseCode(string, new stylecow.Root());
	};

	stylecow.Root.prototype = Object.create(stylecow.Base, {

		parseChild: {
			value: function (string) {
				return stylecow.utils.parseCode(string)[0];
			}
		},

		toString: {
			value: function () {
				return this.map(function (child) {
					return child.toString();
				}).filter(function (string) {
					return string ? true : false;
				}).join("\n");
			}
		},

		toCode: {
			value: function () {
				return this.map(function (child) {
					return child.toCode();
				}).filter(function (string) {
					return string ? true : false;
				}).join(stylecow.codeStyle.linebreak);
			}
		}
	});
})(require('../index'));

},{"../index":48}],44:[function(require,module,exports){
(function (stylecow) {

	stylecow.Rule = function () {
		this.type = 'Rule';
	};

	stylecow.Rule.create = function (string) {
		var root = stylecow.utils.parseCode(string);

		if (!root.length) {
			return new stylecow.Rule();
		}

		return root[0];
	};

	stylecow.Rule.prototype = Object.create(stylecow.Root.prototype, {

		selector: {
			get: function () {
				return this.children('Selector').join(',');
			},
			set: function (selectors) {
				this.children('Selector').forEach(function (child) {
					child.remove();
				});

				stylecow.utils.explodeTrim(',', selectors).forEach(function (selector, index) {
					this.add(stylecow.Selector.create(selector), index);
				}, this);
			}
		},

		addOldMsFilter: {
			value: function (filter) {
				var declaration = this.children('Declaration', '-ms-filter').pop();

				if (declaration) {
					if (declaration.value === 'none') {
						declaration.value = filter;
					} else if (declaration.content.indexOf(filter) === -1) {
						declaration.append(filter);
					}
				} else {
					declaration = this.add(stylecow.Declaration.create('-ms-filter:' + filter));
				}
			}
		},

		toString: {
			value: function () {
				var declarations = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toString();

					if (string) {
						if (child.is('Selector')) {
							selectors.push(child);
						} else {
							declarations.push(child);
						}
					}
				});

				declarations = "\t" + declarations.join("\n").replace(/\n/g, '\n' + "\t");

				return selectors.join(', ') + " {\n" + declarations + "\n}";
			}
		},

		toCode: {
			value: function () {
				var declarations = [];
				var selectors = [];

				this.forEach(function (child) {
					var string = child.toCode();

					if (string) {
						if (child.is('Selector')) {
							selectors.push(string);
						} else {
							declarations.push(string);
						}
					}
				});

				declarations = stylecow.utils.arrayUnique(declarations);
				selectors = stylecow.utils.arrayUnique(selectors);

				if (!declarations.length) {
					return '';
				}

				declarations = declarations.join(stylecow.codeStyle.linebreak);

				if (stylecow.codeStyle.indent) {
					declarations = stylecow.codeStyle.indent + declarations.replace(/\n/g, '\n' + stylecow.codeStyle.indent);
				}

				return selectors.join(stylecow.codeStyle.selectorJoiner) + stylecow.codeStyle.rulesetStart + declarations + stylecow.codeStyle.rulesetEnd;
			}
		}
	});
})(require('../index'));

},{"../index":48}],45:[function(require,module,exports){
(function (stylecow) {

	stylecow.Selector = function (name) {
		this.type = 'Selector';
		this.name = name;
	};

	stylecow.Selector.create = function (string) {
		return new stylecow.Selector(string);
	};

	stylecow.Selector.prototype = Object.create(stylecow.Base, {

		parseChild: {
			value: function (string) {
				if (/\w\(/.test(string)) {
					return stylecow.Function.create(string);
				}

				return stylecow.Keyword.create(string);
			}
		},

		name: {
			get: function () {
				return this.join('');
			},
			set: function (name) {
				this.content = stylecow.utils.parseSelector(name);
			}
		},

		toString: {
			value: function () {
				return this.name;
			}
		},

		toCode: {
			value: function () {
				return this.map(function (child) {
					return child.toCode();
				}).join('');
			}
		}
	});
})(require('../index'));

},{"../index":48}],46:[function(require,module,exports){
(function (stylecow) {

	stylecow.Value = function (name) {
		this.type = 'Value';
		this.name = name;
	};

	stylecow.Value.create = function (string) {
		return new stylecow.Value(string);
	};

	stylecow.Value.prototype = Object.create(stylecow.Base, {

		parseChild: {
			value: function (string) {
				if (/^[\w\.-]+\(/.test(string)) {
					return stylecow.Function.create(string);
				}

				return stylecow.Keyword.create(string);
			}
		},

		name: {
			get: function () {
				return this.join(' ');
			},
			set: function (name) {
				this.content = stylecow.utils.explodeTrim(' ', name);
			}
		},

		toString: {
			value: function () {
				return this.name;
			}
		}
	});
})(require('../index'));

},{"../index":48}],47:[function(require,module,exports){
(function (stylecow) {

	stylecow.Error = function (message, data, prevError) {
		this.message = message;
		this.data = data;
		this.prevError = prevError;
	};

	stylecow.Error.prototype = {

		getFirstError: function () {
			if (this.prevError instanceof stylecow.Error) {
				return this.prevError.getFirstError();
			}

			return this;
		},

		toFullString: function () {
			var string = this.toString();

			if (this.prevError instanceof stylecow.Error) {
				string += '\n------------------\n' + this.prevError.toFullString();
			}

			return string;
		},

		toString: function () {
			var string = this.message;

			stylecow.utils.forEach(this.data, function (value, key) {
				string += '\n' + key + ': ' + value;
			});

			return string;
		},

		toCode: function () {
			var root = stylecow.Root.create('body>*{display:none;}');
			var rule = root.add(new stylecow.Rule());

			rule.content = [
				'content: "' + this.toString().replace(/\n/g, ' \\A ').replace(/"/, '\\"') + '"',
				'background: white',
				'color: black',
				'font-family: monospace',
				'white-space: pre'
			];
			rule.selector = 'body::before';
			
			return root;
		}
	};
})(require('./index'));

},{"./index":48}],48:[function(require,module,exports){
(function (stylecow) {
	var fs = require('fs');

	//CSS elements
	require('./css/base');
	require('./css/comment');
	require('./css/import');
	require('./css/function');
	require('./css/root');
	require('./css/declaration');
	require('./css/keyword');
	require('./css/value');
	require('./css/rule');
	require('./css/selector');
	require('./css/at-rule');

	//Utils
	require('./error');
	require('./utils');
	require('./config');


	//Properties
	stylecow.pluginPrefix = 'stylecow-plugin-';
	stylecow.support = {};
	stylecow.tasks = {};
	stylecow.codeStyle = stylecow.codeStyles[stylecow.defaults.code];


	//Create from code string
	stylecow.create = function (code) {
		try {
			return stylecow.Root.create(code);
		} catch (error) {
			return error.getFirstError().toCode();
		}
	};


	//Read a css file
	stylecow.createFromFile = function (file) {
		return stylecow.create(fs.readFileSync(file, 'utf8')).setData('sourceFile', file);
	};


	//Register new tasks
	stylecow.addTask = function (task) {
		if (task instanceof Array) {
			return task.forEach(stylecow.addTask);
		}

		if (stylecow.utils.needFix(stylecow.support, task.disable)) {
			var name, val, k;

			stylecow.utils.forEach(task, function (val, name) {
				if (name === 'disable') {
					return;
				}

				if (val instanceof Function) {
					val = {'*': val};
				}

				if (!stylecow.tasks[name]) {
					stylecow.tasks[name] = {};
				}

				stylecow.utils.forEach(val, function (v, k) {
					if (!stylecow.tasks[name][k]) {
						stylecow.tasks[name][k] = [];
					}

					stylecow.tasks[name][k].push(v);
				});
			});
		}
	};


	//Set configuration
	stylecow.setConfig = function (config) {
		stylecow.support = config.support;
		stylecow.codeStyle = stylecow.codeStyles[config.code];
		stylecow.tasks = {};

		config.plugins.forEach(function (name) {
			require(stylecow.pluginPrefix + name)(stylecow);
		});
	};


	//Convert a string
	stylecow.convert = function (code) {
		var css = stylecow.create(code);

		css.executeTasks(stylecow.tasks);

		return css;
	};


	//Convert from a file
	stylecow.convertFromFile = function (file) {
		var css = stylecow.createFromFile(file);

		css.executeTasks(stylecow.tasks);

		return css;
	};


})(require('./index'));

},{"./config":35,"./css/at-rule":36,"./css/base":37,"./css/comment":38,"./css/declaration":39,"./css/function":40,"./css/import":41,"./css/keyword":42,"./css/root":43,"./css/rule":44,"./css/selector":45,"./css/value":46,"./error":47,"./index":48,"./utils":49,"fs":1}],49:[function(require,module,exports){
(function (stylecow) {

	stylecow.utils = {
		forEach: function (items, callback, self) {
			if (!items) {
				return;
			}

			self = self || this;

			for (var k in items) {
				if (items.hasOwnProperty(k)) {
					callback.call(self, items[k], k);
				}
			}
		},

		needFix: function (minSupport, disablePlugin) {
			if (!disablePlugin || !minSupport) {
				return true;
			}

			for (var browser in disablePlugin) {
				if (minSupport[browser] === false) {
					continue;
				}

				if (disablePlugin[browser] === false || minSupport[browser] < disablePlugin[browser]) {
					return true;
				}
			}

			return false;
		},

		explode: function (delimiter, string, limit) {
			if (!string) {
				return [];
			}

			if (!(delimiter instanceof Function)) {
				var stringDelimiter = delimiter;

				delimiter = function (buffer, currChar, array) {
					if (currChar === stringDelimiter) {
						array.push(buffer);
						return true;
					}
				};
			}

			var col = 0,
				length = string.length,
				currChar = null,
				previousChar = null,
				nextChar = string[col],
				buffer = '',
				status = [],
				array = [];

			while (col < length) {
				previousChar = currChar;
				currChar = nextChar;
				col ++;
				nextChar = (col === length) ? null : string[col];

				if (!status.length && delimiter(buffer, currChar, array)) {
					buffer = '';

					if (array.length === limit -1) {
						array.push(string.substr(col));
						break;
					}

					continue;
				}

				buffer += currChar;

				switch (currChar) {
					case '"':
						switch (status[0]) {
							case 'simpleQuote':
							case 'comment':
								break;

							case 'doubleQuote':
								if (previousChar !== '\\') {
									status.shift();
								}
								break;

							default:
								status.unshift('doubleQuote');
						}
						break;

					case "'":
						switch (status[0]) {
							case 'doubleQuote':
							case 'comment':
								break;

							case 'simpleQuote':
								if (previousChar !== '\\') {
									status.shift();
								}
								break;

							default:
								status.unshift('simpleQuote');
						}
						break;

					case '(':
						switch (status[0]) {
							case 'simpleQuote':
							case 'doubleQuote':
							case 'comment':
								break;

							default:
								status.unshift('parenthesis');
						}
						break;

					case ')':
						switch (status[0]) {
							case 'parenthesis':
								status.shift();
								break;
						}
						break;

					case '{':
						switch (status[0]) {
							case 'simpleQuote':
							case 'doubleQuote':
							case 'comment':
								break;

							default:
								status.unshift('brackets');
						}
						break;

					case '}':
						switch (status[0]) {
							case 'brackets':
								status.shift();
								break;
						}
						break;

					case ';':
						switch (status[0]) {
							case 'simpleQuote':
							case 'doubleQuote':
							case 'comment':
								break;
						}
						break;

					case '/':
						if (status[0] !== 'comment') {
							if (nextChar === '*') {
								status.unshift('comment');

								if (string[col+1] === '/') {
									col++;
								}
							}
						} else if (previousChar === '*') {
							status.shift();
						}
						break;
				}
			}

			if (buffer) {
				array.push(buffer);
			}

			return array;
		},

		explodeTrim: function (delimiter, string, limit) {
			return stylecow.utils.explode(delimiter, string, limit)
				.map(function (value) {
					return value.trim();
				})
				.filter(function (value) {
					return value ? true : false;
				});
		},

		arrayUnique: function (array) {
			var i, k, a = [];

			for (i = array.length - 1; i >= 0; i--) {
				k = a.indexOf(array[i]);

				if (k === -1) {
					a.unshift(array[i]);
				}
			}

			return a;
		},

		parseCode: function (code, parent) {
			if (!parent) {
				parent = new stylecow.Root();
			}

			var child = parent, status = ['root'], buffer = '';

			code = code.split('\n');
			code.unshift('');

			for (var line = 0, totalLines = code.length; line < totalLines; line++) {
				if (status[0] === 'comment') {
					code[line] += '\n';
				}

				var stringLine = code[line],
					col = 0,
					length = stringLine.length,
					currChar = null,
					previousChar = null,
					nextChar = stringLine[col],
					newChild;

				while (col < length) {
					previousChar = currChar;
					currChar = nextChar;
					col ++;
					nextChar = (col === length) ? null : stringLine[col];

					buffer += currChar;

					switch (currChar) {
						case '"':
							switch (status[0]) {
								case 'simpleQuote':
								case 'comment':
									break;

								case 'doubleQuote':
									if (previousChar !== '\\') {
										status.shift();
									}
									break;

								default:
									status.unshift('doubleQuote');
							}
							break;

						case "'":
							switch (status[0]) {
								case 'doubleQuote':
								case 'comment':
									break;

								case 'simpleQuote':
									if (previousChar !== '\\') {
										status.shift();
									}
									break;

								default:
									status.unshift('simpleQuote');
							}
							break;

						case '(':
							switch (status[0]) {
								case 'simpleQuote':
								case 'doubleQuote':
								case 'comment':
									break;

								default:
									status.unshift('parenthesis');
							}
							break;

						case ')':
							switch (status[0]) {
								case 'parenthesis':
									status.shift();
									break;
							}
							break;

						case '{':
							switch (status[0]) {
								case 'root':
								case 'selector':
								case 'rules':
									var matches = buffer.trim().match(/^@([^\s]+)\s(.*)$/m);

									try {
										if (matches) {
											newChild = new stylecow.AtRule(matches[1]);
											buffer = matches[2];
										} else {
											newChild = new stylecow.Rule();
										}

										child = child.add(newChild).setData('sourceColumn', col).setData('sourceLine', line);
										child.selector = buffer.slice(0, -1);
									} catch (error) {
										throw new stylecow.Error('Error parsing CSS code', {
											code: buffer,
											column: col,
											line: line
										}, error);
									}

									buffer = '';
									status.unshift('rules');
									break;
							}
							break;

						case '}':
							switch (status[0]) {
								case 'rules':
									buffer = buffer.slice(0, -1);

									if (buffer.trim()) {
										try {
											child.add(buffer).setData('sourceColumn', col).setData('sourceLine', line);
										} catch (error) {
											throw new stylecow.Error('Error parsing CSS rule', {
												code: buffer,
												column: col,
												line: line
											}, error);
										}
									}

									buffer = '';
									status.shift();
									child = child.parent;
									break;
							}
							break;

						case ';':
							switch (status[0]) {
								case 'root':
								case 'selector':

									if (buffer.indexOf('@import') !== -1) {
										try {
											newChild = stylecow.Import.create(buffer);
										} catch (error) {
											throw new stylecow.Error('Error parsing CSS @import rule', {
												code: buffer,
												column: col,
												line: line
											}, error);
										}
									} else {
										try {
											newChild = stylecow.Declaration.create(buffer);
										} catch (error) {
											throw new stylecow.Error('Error parsing CSS declaration', {
												code: buffer,
												column: col,
												line: line
											}, error);
										}
									}

									newChild.setData('sourceColumn', col).setData('sourceLine', line);

									buffer = '';

									child.add(newChild);
									break;

								case 'rules':
									try {
										child.add(buffer.slice(0, -1)).setData('sourceColumn', col).setData('sourceLine', line);
									} catch (error) {
										throw new stylecow.Error('Error parsing CSS rule', {
											code: buffer,
											column: col,
											line: line
										}, error);
									}
									buffer = '';
									break;
							}
							break;

						case '/':
							if (status[0] !== 'comment') {
								if (nextChar === '*') {
									status.unshift('comment');

									var nextCol = col+1;
									var nextNextChar = (nextCol === length) ? null : stringLine[nextCol];

									if (nextNextChar === '/') {
										col++;
									}
								}
							} else if (previousChar === '*') {
								try {
									child.add(stylecow.Comment.create(buffer)).setData('sourceColumn', col).setData('sourceLine', line);
								} catch (error) {
									throw new stylecow.Error('Error parsing CSS comment', {
										code: buffer,
										column: col,
										line: line
									}, error);
								}
								buffer = '';
								status.shift();
							}
							break;

						default:
							if (!status.length) {
								status = ['root'];
							}
					}
				}
			}

			if (buffer.trim() && (status[0] === 'root')) {
				try {
					child.add(stylecow.Declaration.create(buffer));
				} catch (error) {
					throw new stylecow.Error('Error parsing CSS declaration', {
						code: buffer,
						column: col,
						line: line
					}, error);
				}
			}

			return parent;
		},

		parseSelector: function (code) {
			if (!code) {
				return [];
			}

			var length = code.length,
				col = 0,
				pieces = [],
				status = [],
				buffer = '',
				previousChar = null,
				currChar = null;

			while (col < length) {
				previousChar = currChar;
				currChar = code[col];
				col++;

				switch (currChar) {
					case '(':
						if (status[0] !== 'quote') {
							status.unshift('parenthesis');
						}

						buffer += currChar;
						break;

					case ')':
						buffer += currChar;

						if (status[0] === 'parenthesis') {
							status.shift();
							pieces.push(buffer);
							buffer = '';
						}
						break;

					case '"':
						if (status[0] === 'quote') {
							status.shift();
						} else {
							status.unshift('quote');
						}

						buffer += currChar;
						break;

					case ' ':
						switch (status[0]) {
							case 'quote':
							case 'parenthesis':
								buffer += currChar;
								break;

							case 'space':
							case 'relation':
								break;

							default:
								status.unshift('space');

								if (buffer) {
									pieces.push(buffer);
									buffer = '';
								}

								buffer += currChar;
						}
						break;

					case '>':
					case '+':
					case '~':
						switch (status[0]) {
							case 'quote':
							case 'parenthesis':
								buffer += currChar;
								break;

							case 'space':
								status[0] = 'relation';
								buffer = currChar;
								break;

							default:
								status.unshift('relation');
								buffer += currChar;

						}
						break;

					case '.':
					case '#':
						switch (status[0]) {
							case 'quote':
							case 'parenthesis':
								break;

							case 'space':
							case 'relation':
								if (currChar !== ' ' && buffer) {
									pieces.push(buffer);
									status.shift();
									buffer = '';
								}
								break;

							default:
								if (buffer) {
									pieces.push(buffer);
									buffer = '';
								}

						}

						buffer += currChar;
						break;

					case ':':
						switch (status[0]) {
							case 'quote':
							case 'parenthesis':
								break;

							case 'space':
							case 'relation':
								if (currChar !== ' ' && buffer) {
									pieces.push(buffer);
									status.shift();
									buffer = '';
								}
								break;

							default:
								if (previousChar !== ':' && buffer) {
									pieces.push(buffer);
									buffer = '';
								}
						}

						buffer += currChar;
						break;

					default:
						switch (status[0]) {
							case 'space':
							case 'relation':
								if (currChar !== ' ' && buffer) {
									pieces.push(buffer);
									status.shift();
									buffer = '';
								}
								break;
						}

						buffer += currChar;
				}
			}

			if (buffer) {
				pieces.push(buffer);
			}

			return pieces;
		}
	};

})(require('./index'));

},{"./index":48}],"stylecow-plugin-color":[function(require,module,exports){
//http://dev.w3.org/csswg/css-color/

var color = require('stylecow-color');

module.exports = function (stylecow) {

	stylecow.addTask({

		//Convert hex + alpha values to rgba values
		Keyword: function (keyword) {
			if (keyword.name[0] === '#' && (keyword.name.length === 5 || keyword.name.length === 9) && keyword.ancestor('Declaration')) {
				var rgba = color.toRGBA(keyword.name);

				if (rgba[3] === 1) {
					keyword.name = '#' + color.RGBA_HEX(rgba);
				} else {
					keyword.replaceWith('rgba(' + color.toRGBA(keyword.name).join(',') + ')');
				}
			}
		},

		"Function": {

			//Convert gray() function to rgba/hex values
			gray: function (fn) {
				var rgba = color.toRGBA(fn.content, 'gray');

				if (rgba[3] === 1) {
					fn.replaceWith('#' + color.RGBA_HEX(rgba));
				} else {
					fn.content = rgba;
					fn.name = 'rgba';
				}
			},

			//Convert color() function to rgba/hex values
			color: function (fn) {
				var args = fn[0];
				var rgba;

				if (args.type === 'Value') {
					rgba = color.toRGBA(args[0]);
					args[0].remove();
				} else {
					rgba = color.toRGBA(args);
					args.remove();
					args = [];
				}

				args.forEach(function (adjust) {
					switch (adjust.name) {
						case 'alpha':
						case 'a':
							rgba[3] = modify(rgba[3], adjust[0].name, 1);
							break;

						case 'red':
							rgba[0] = modify(rgba[0], adjust[0].name, 255);
							break;

						case 'green':
							rgba[1] = modify(rgba[1], adjust[0].name, 255);
							break;

						case 'blue':
							rgba[2] = modify(rgba[2], adjust[0].name, 255);
							break;

						case 'rgb':
							rgba[0] = modify(rgba[0], adjust[0].name, 255);
							rgba[1] = modify(rgba[1], adjust[1].name, 255);
							rgba[2] = modify(rgba[2], adjust[2].name, 255);
							break;

						case 'saturation':
						case 's':
							var hsla = color.RGBA_HSLA(rgba);
							hsla[1] = modify(hsla[1], adjust[0].name, 100);
							rgba = color.HSLA_RGBA(hsla);
							break;

						case 'lightness':
						case 'l':
							var hsla = color.RGBA_HSLA(rgba);
							hsla[2] = modify(hsla[2], adjust[0].name, 100);
							rgba = color.HSLA_RGBA(hsla);
							break;

						case 'whiteness':
						case 'w':
							var hwba = color.RGBA_HWBA(rgba);
							hwba[1] = modify(hwba[1], adjust[0].name, 100);
							rgba = color.HWBA_RGBA(hwba);
							break;

						case 'blackness':
						case 'b':
							var hwba = color.RGBA_HWBA(rgba);
							hwba[2] = modify(hwba[2], adjust[0].name, 100);
							rgba = color.HWBA_RGBA(hwba);
							break;

						case 'blend':
							var c = color.toRGBA(adjust[0][0]);

							rgba[0] = blend(rgba[0], c[0], adjust[0][1].name, 255);
							rgba[1] = blend(rgba[1], c[1], adjust[0][1].name, 255);
							rgba[2] = blend(rgba[2], c[2], adjust[0][1].name, 255);
							break;

						case 'blenda':
							var c = color.toRGBA(adjust[0][0]);

							rgba[0] = blend(rgba[0], c[0], adjust[0][1].name, 255);
							rgba[1] = blend(rgba[1], c[1], adjust[0][1].name, 255);
							rgba[2] = blend(rgba[2], c[2], adjust[0][1].name, 255);
							rgba[3] = blend(rgba[3], c[3], adjust[0][1].name, 1);
							break;

						case 'tint':
							rgba[0] = blend(rgba[0], 255, adjust[0].name, 255);
							rgba[1] = blend(rgba[1], 255, adjust[0].name, 255);
							rgba[2] = blend(rgba[2], 255, adjust[0].name, 255);
							break;

						case 'shade':
							rgba[0] = blend(rgba[0], 0, adjust[0].name, 255);
							rgba[1] = blend(rgba[1], 0, adjust[0].name, 255);
							rgba[2] = blend(rgba[2], 0, adjust[0].name, 255);
							break;

						case 'contrast':
							var hsla = color.RGBA_HSLA(rgba);
							var hwba = color.RGBA_HWBA(rgba);

							if (hsla[2] < 50) { //is dark +50%
								hwba[1] = modify(hwba[1], adjust[0].name, 100);
							} else {
								hwba[2] = modify(hwba[2], adjust[0].name, 100);
							}
							rgba = color.HWBA_RGBA(hwba);
					}
				});

				if (rgba[3] === 1) {
					fn.replaceWith('#' + color.RGBA_HEX(rgba));
				} else {
					fn.content = rgba;
					fn.name = 'rgba';
				}
			}
		}
	});
};


function modify (base, value, max) {
	var mode;

	if (value[0] === '+' || value[0] === '-') {
		mode = value[0];
		value = value.substr(1);
	}

	if (value.indexOf('%') !== -1) {
		value = ((max / 100) * parseFloat(value, 10));
	} else {
		value = parseFloat(value, 10);
	}

	if (max === 1) {
		value = parseFloat(value.toFixed(2));
	} else {
		value = Math.round(value);
	}

	if (mode === '+') {
		base += value;
	} else if (mode === '-') {
		base -= value;
	} else {
		base = value;
	}

	if (base > max) {
		return max;
	}

	if (base < 0) {
		return 0;
	}

	return base;
}

function blend (base, value, percentage, max) {
	percentage = parseFloat(percentage);

	base = (base / 100) * percentage;
	value = (value / 100) * (100 - percentage);
	
	base += value;

	if (max === 1) {
		base = parseFloat(base.toFixed(2));
	} else {
		base = Math.round(base);
	}

	if (base > max) {
		return max;
	}

	if (base < 0) {
		return 0;
	}

	return base;
}

},{"stylecow-color":2}],"stylecow-plugin-fixes":[function(require,module,exports){
module.exports = function (stylecow) {
	require('./src/calc')(stylecow);
	require('./src/clip')(stylecow);
	require('./src/column-break')(stylecow);
	require('./src/float')(stylecow);
	require('./src/inline-block')(stylecow);
	require('./src/min-height')(stylecow);
	require('./src/opacity')(stylecow);
	require('./src/pseudoelements')(stylecow);
	require('./src/vmin')(stylecow);
};

},{"./src/calc":3,"./src/clip":4,"./src/column-break":5,"./src/float":6,"./src/inline-block":7,"./src/min-height":8,"./src/opacity":9,"./src/pseudoelements":10,"./src/vmin":11}],"stylecow-plugin-flex":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([
		
		// Old ms flex syntax
		{
			disable: {
				explorer: 11.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, 'display', ['flex', 'inline-flex'])) {
					return declaration.insertBefore('display: -ms-' + declaration.value + 'box');
				}
				
				if (declaration.name === 'flex-wrap') {
					return declaration.insertBefore('-ms-flex-wrap: ' + (declaration.value === 'nowrap' ? 'none' : declaration.value));
				}
				
				if (declaration.name === 'flex-grow') {
					return declaration.cloneBefore().name = '-ms-flex-positive';
				}
				
				if (declaration.name === 'flex-shrink') {
					return declaration.cloneBefore().name = '-ms-flex-negative';
				}
				
				if (declaration.name === 'order') {
					return declaration.cloneBefore().name = '-ms-flex-order';
				}
				
				if (declaration.name === 'justify-content') {
					return declaration.insertBefore('-ms-flex-pack: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-items') {
					return declaration.insertBefore('-ms-flex-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-self') {
					return declaration.insertBefore('-ms-flex-item-align: ' + alignmentValue(declaration.value));
				}
				
				if (declaration.name === 'align-content') {
					return declaration.insertBefore('-ms-flex-line-pack: ' + alignmentValue(declaration.value));
				}

				if (declaration.is(null, /^flex/)) {
					return declaration.cloneBefore().name = '-ms-' + declaration.name;
				}
			}
		},

		// Old webkit flex syntax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: {
				display: function (declaration) {
					if (declaration.is(null, null, ['flex', 'inline-flex'])) {
						declaration.insertBefore('display: -webkit-' + declaration.value.replace('flex', 'box'));
					}
				},
				"flex-direction": function (declaration) {
					var orient, direction;

					switch (declaration.value) {
						case 'row':
							orient = 'horizontal';
							break;

						case 'row-reverse':
							orient = 'horizontal';
							direction = 'reverse';
							break;

						case 'column':
							orient = 'vertical';
							break;

						case 'column-reverse':
							orient = 'vertical';
							direction = 'reverse';
							break;

						default:
							return false;
					}

					declaration.insertBefore('-webkit-box-orient:' + orient);

					if (direction) {
						declaration.insertBefore('-webkit-box-direction:' + direction);
					}
				},
				order: function (declaration) {
					var value = (declaration.value == 0) ? 1 : property.value;

					declaration.insertBefore('-webkit-box-ordinal-group:' + value);
				},
				"justify-content": function (declaration) {
					var value = alignmentValue(declaration.value);

					if ((value === 'space-between') || (value === 'space-around')) {
						value = 'justify';
					}

					declaration.insertBefore('-webkit-box-pack:' + value);
				},
				"align-items": function (declaration) {
					declaration.insertBefore('-webkit-box-align:' + alignmentValue(declaration.value));
				},
				"flex-grow": function (declaration) {
					declaration.insertBefore('-webkit-box-flex:' + declaration.value);
				},
				"flex": function (declaration) {
					declaration.insertBefore('-webkit-box-flex:' + declaration.value);
				}
			}
		},

		// -webkit- vendor prefixes to new sintax
		{
			disable: {
				chrome: 21.0,
				safari: 6.1,
				android: 4.4,
				ios: 7.0
			},
			Declaration: function (declaration) {
				if (declaration.is(null, /^(flex.*|align.*|justify-content|order)$/)) {
					return declaration.cloneBefore().name = '-webkit-' + declaration.name;
				}

				if (declaration.is(null, 'display', ['flex', 'inline-flex'])) {
					return declaration.cloneBefore().value = '-webkit-' + declaration.value;
				}
			}
		}
	]);
};

function alignmentValue (value) {
	if (value === 'flex-start') {
		return 'start';
	}

	if (value === 'flex-end') {
		return 'end';
	}

	return value;
}

},{}],"stylecow-plugin-initial":[function(require,module,exports){
var initials = {
	'animation': 'none',
	'animation-delay': '0',
	'animation-direction': 'normal',
	'animation-duration': '0',
	'animation-fill-mode': 'none',
	'animation-iteration-count': '1',
	'animation-name': 'none',
	'animation-play-state': 'running',
	'animation-timing-function': 'ease',
	'backface-visibility': 'visible',
	'background': '0',
	'background-attachment': 'scroll',
	'background-clip': 'border-box',
	'background-color': 'transparent',
	'background-image': 'none',
	'background-origin': 'padding-box',
	'background-position': '0 0',
	'background-repeat': 'repeat',
	'background-size': 'auto auto',
	'border': '0',
	'border-style': 'none',
	'border-width': 'medium',
	'border-color': 'inherit',
	'border-bottom': '0',
	'border-bottom-color': 'inherit',
	'border-bottom-left-radius': '0',
	'border-bottom-right-radius': '0',
	'border-bottom-style': 'none',
	'border-bottom-width': 'medium',
	'border-collapse': 'separate',
	'border-image': 'none',
	'border-left': '0',
	'border-left-color': 'inherit',
	'border-left-style': 'none',
	'border-left-width': 'medium',
	'border-radius': '0',
	'border-right': '0',
	'border-right-color': 'inherit',
	'border-right-style': 'none',
	'border-right-width': 'medium',
	'border-spacing': '0',
	'border-top': '0',
	'border-top-color': 'inherit',
	'border-top-left-radius': '0',
	'border-top-right-radius': '0',
	'border-top-style': 'none',
	'border-top-width': 'medium',
	'bottom': 'auto',
	'box-shadow': 'none',
	'box-sizing': 'content-box',
	'caption-side': 'top',
	'clear': 'none',
	'clip': 'auto',
	'color': 'inherit',
	'columns': 'auto',
	'column-count': 'auto',
	'column-fill': 'balance',
	'column-gap': 'normal',
	'column-rule': 'medium none currentColor',
	'column-rule-color': 'currentColor',
	'column-rule-style': 'none',
	'column-rule-width': 'none',
	'column-span': '1',
	'column-width': 'auto',
	'content': 'normal',
	'counter-increment': 'none',
	'counter-reset': 'none',
	'cursor': 'auto',
	'direction': 'ltr',
	'display': 'inline',
	'empty-cells': 'show',
	'float': 'none',
	'font': 'normal',
	'font-family': 'inherit',
	'font-size': 'medium',
	'font-style': 'normal',
	'font-variant': 'normal',
	'font-weight': 'normal',
	'height': 'auto',
	'hyphens': 'none',
	'left': 'auto',
	'letter-spacing': 'normal',
	'line-height': 'normal',
	'list-style': 'none',
	'list-style-image': 'none',
	'list-style-position': 'outside',
	'list-style-type': 'disc',
	'margin': '0',
	'margin-bottom': '0',
	'margin-left': '0',
	'margin-right': '0',
	'margin-top': '0',
	'max-height': 'none',
	'max-width': 'none',
	'min-height': '0',
	'min-width': '0',
	'opacity': '1',
	'orphans': '0',
	'outline': '0',
	'outline-color': 'invert',
	'outline-style': 'none',
	'outline-width': 'medium',
	'overflow': 'visible',
	'padding': '0',
	'padding-bottom': '0',
	'padding-left': '0',
	'padding-right': '0',
	'padding-top': '0',
	'page-break-after': 'auto',
	'page-break-before': 'auto',
	'page-break-inside': 'auto',
	'perspective': 'none',
	'perspective-origin': '50% 50%',
	'position': 'static',
	'right': 'auto',
	'tab-size': '8',
	'table-layout': 'auto',
	'text-align': 'inherit',
	'text-align-last': 'auto',
	'text-decoration': 'none',
	'text-decoration-color': 'inherit',
	'text-decoration-line': 'none',
	'text-decoration-style': 'solid',
	'text-indent': '0',
	'text-shadow': 'none',
	'text-transform': 'none',
	'top': 'auto',
	'transform': 'none',
	'transform-style': 'flat',
	'transition': 'none',
	'transition-delay': '0s',
	'transition-duration': '0s',
	'transition-property': 'none',
	'transition-timing-function': 'ease',
	'unicode-bidi': 'normal',
	'vertical-align': 'baseline',
	'visibility': 'visible',
	'white-space': 'normal',
	'widows': '0',
	'width': 'auto',
	'word-spacing': 'normal',
	'z-index': 'auto'
};

module.exports = function (stylecow) {

	stylecow.addTask({
		disable: {
			firefox: 19.0,
			chrome: 1.0,
			safari: 1.2,
			opera: 15.0,
			explorer: false
		},
		Declaration: function (declaration) {
			if (declaration.value === 'initial') {
				declaration.value = initials[declaration.name] || 'inherit';
			}
		}
	});
};

},{}],"stylecow-plugin-linear-gradient":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask([

		// adds -moz- vendor prefix
		{
			disable: {
				firefox: 10.0
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor('Declaration').cloneBefore().search('Function', 'linear-gradient').forEach(function (fn) {
						fn.name = '-moz-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds -o- vendor prefix
		{
			disable: {
				opera: 12.1
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor('Declaration').cloneBefore().search('Function', 'linear-gradient').forEach(function (fn) {
						fn.name = '-o-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds -webkit- vendor prefix
		{
			disable: {
				chrome: 26.0,
				safari: 6.1,
				ios: 7.0,
				android: 4.4
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor('Declaration').cloneBefore().search('Function', 'linear-gradient').forEach(function (fn) {
						fn.name = '-webkit-linear-gradient';
						fn[0].replaceWith(fixDirection(fn[0]));
					});
				}
			}
		},

		// adds the old syntax -webkit-gradient
		{
			disable: {
				chrome: 10.0,
				safari: 5.1,
				android: 4.0
			},
			"Function": {
				'linear-gradient': function (fn) {
					fn.ancestor('Declaration').cloneBefore().search('Function', 'linear-gradient').forEach(function (fn) {
						var newArgs = ['linear'];

						//Calculate the gradient direction
						var point = 'to bottom';

						if (fn[0].is(null, /(top|bottom|left|right|deg)/)) {
							point = fn.shift().toString();
						}

						switch (point) {
							case 'to bottom':
								newArgs.push('left top', 'left bottom');
								break;

							case 'to top':
								newArgs.push('left bottom', 'left top');
								break;

							case 'to right':
								newArgs.push('left top', 'right top');
								break;

							case 'to left':
								newArgs.push('right top', 'left top');
								break;

							default:
								if (/^\ddeg$/.test(point)) {
									newArgs.push(parseInt(point, 10) + 'deg');
								} else {
									newArgs.push('left top', 'left bottom');
								}
						}

						//Gradient colors and color stops
						var total = fn.length - 1;

						fn.forEach(function (param, i) {
							var text;

							if (i === 0) {
								text = 'from';
							} else if (i === total) {
								text = 'to';
							} else {
								text = 'color-stop';
							}

							if (param.is('Keyword')) {
								newArgs.push(text + '(' + param + ')');
							} else {
								newArgs.push(text + '(' + param[0] + param[1] + ')');
							}
						});

						//Apply the changes
						fn.name = '-webkit-gradient';
						fn.content = newArgs;
					});
				}
			}
		}
	]);
};

function fixDirection (direction) {
	switch (direction.toString()) {
		case 'to top':
			return 'bottom';

		case 'to bottom':
			return 'top';

		case 'to left':
			return 'right';

		case 'to right':
			return 'left';

		default:
			return direction;
	}
}

},{}],"stylecow-plugin-matches":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		"Function": {
			":matches": function (fn) {
				var selector = fn.ancestor('Selector');
				var value = selector.name;
				var search = fn.toString();

				fn.content.forEach(function (replace) {
					selector.insertBefore(stylecow.Selector.create(value.replace(search, replace)));
				});

				selector.remove();
			}
		}
	});
};

},{}],"stylecow-plugin-nested-rules":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		Rule: function (rule) {
			var ruleSelectors = rule.children('Selector');
			var index = rule.index();

			rule.children('Rule').forEach(function (child, i) {
				child.children('Selector').forEach(function (childSelector) {
					var space = ' ';
					var prepend = false;

					if (childSelector.name[0] === '&') {
						childSelector[0].name = childSelector[0].name.substr(1);
						space = '';

						if (/^\w/.test(childSelector[0].name)) {
							prepend = true;
						}
					}

					ruleSelectors.forEach(function (ruleSelector) {
						var code;

						if (prepend) {
							var content = ruleSelector.content;

							code = content.slice(0, -1);
							code.push(childSelector[0].name);
							code.push(content.slice(-1));
							code = code.concat(childSelector.slice(1)).join('');
						} else {
							code = ruleSelector.name + space + childSelector.name;
						}

						child.add(stylecow.Selector.create(code));
					});

					childSelector.detach();
				});

				rule.parent.add(child, index + i, true);
			});

			if (rule.children('Selector').length === rule.length) {
				rule.remove();
			}
		}
	});
};

},{}],"stylecow-plugin-prefixes":[function(require,module,exports){
module.exports = function (stylecow) {
	require('./src/animation')(stylecow);
	require('./src/appearance')(stylecow);
	require('./src/background')(stylecow);
	require('./src/border')(stylecow);
	require('./src/box-shadow')(stylecow);
	require('./src/box-sizing')(stylecow);
	require('./src/calc')(stylecow);
	require('./src/column')(stylecow);
	require('./src/cursor')(stylecow);
	require('./src/document')(stylecow);
	require('./src/fullscreen')(stylecow);
	require('./src/inline-block')(stylecow);
	require('./src/grid')(stylecow);
	require('./src/mask')(stylecow);
	require('./src/object')(stylecow);
	require('./src/pseudoelements')(stylecow);
	require('./src/region')(stylecow);
	require('./src/sizing')(stylecow);
	require('./src/sticky')(stylecow);
	require('./src/transform')(stylecow);
	require('./src/transition')(stylecow);
	require('./src/typography')(stylecow);
	require('./src/user-select')(stylecow);
};

},{"./src/animation":12,"./src/appearance":13,"./src/background":14,"./src/border":15,"./src/box-shadow":16,"./src/box-sizing":17,"./src/calc":18,"./src/column":19,"./src/cursor":20,"./src/document":21,"./src/fullscreen":22,"./src/grid":23,"./src/inline-block":24,"./src/mask":25,"./src/object":26,"./src/pseudoelements":27,"./src/region":28,"./src/sizing":29,"./src/sticky":30,"./src/transform":31,"./src/transition":32,"./src/typography":33,"./src/user-select":34}],"stylecow-plugin-rem":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		disable: {
			firefox: 3.6,
			explorer: 9.0,
			safari: 5.0,
			opera: 11.6,
			ios: 4.0
		},

		//Set the default value of a rem (16px)
		RootBefore: function (root) {
			root.setData('rem', 16);
		},

		//Changes the default value on :root or html selectors
		RuleBefore: function (rule) {
			if (rule.hasChild('Selector', [':root', 'html'])) {
				rule.children('Declaration', 'font-size').forEach(function (declaration) {
					rule.ancestor('Root').setData('rem', toPixels(declaration.value));
				});
			}
		},

		//Add the fallback
		Declaration: function (declaration) {
			var value = declaration.value;

			if (value.indexOf('rem') === -1) {
				return false;
			}

			declaration.cloneBefore().value = value.replace(/([0-9\.]+)rem/, function (match) {
				if (match[0] === '.') {
					match = '0' + match;
				}

				return (declaration.getData('rem') * parseFloat(match, 10)) + 'px';
			});
		}
	});
};

function toPixels (value) {
	if (value[0] === '.') {
		value = '0' + value;
	}

	if (value.indexOf('px') !== -1) {
		return parseInt(value, 10);
	}

	if (value.indexOf('em') !== -1) {
		return parseFloat(value, 10) * 16;
	}

	if (value.indexOf('pt') !== -1) {
		return parseFloat(value, 10) * 14;
	}

	if (value.indexOf('%') !== -1) {
		return parseFloat(value, 10)/100 * 16;
	}

	return 16;
};

},{}],"stylecow-plugin-variables":[function(require,module,exports){
module.exports = function (stylecow) {

	stylecow.addTask({
		//Use var() function
		"Function": {
			var: function (fn) {
				var arguments = fn.content;
				var value = fn.ancestor('Rule').getData(arguments[0]) || arguments[1];

				if (value) {
					fn.replaceWith(value);
				}
			}
		},

		//Save new --variables
		Declaration: function (declaration) {
			if (declaration.name.indexOf('--') === 0) {
				var rule = declaration.ancestor('Rule');

				if (rule.hasChild('Selector', [':root', 'html'])) {
					rule.ancestor('Root').setData(declaration.name, declaration.value);
				} else {
					rule.setData(declaration.name, declaration.value);
				}

				declaration.remove();
			}
		}
	});
};

},{}]},{},["./js/main"]);
