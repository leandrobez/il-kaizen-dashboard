(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9f02ebe"],{"02f4":function(e,t,r){var a=r("4588"),n=r("be13");e.exports=function(e){return function(t,r){var i,c,s=String(n(t)),o=a(r),u=s.length;return o<0||o>=u?e?"":void 0:(i=s.charCodeAt(o),i<55296||i>56319||o+1===u||(c=s.charCodeAt(o+1))<56320||c>57343?e?s.charAt(o):i:e?s.slice(o,o+2):c-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,r){"use strict";var a=r("02f4")(!0);e.exports=function(e,t,r){return t+(r?a(e,t).length:1)}},"0bfb":function(e,t,r){"use strict";var a=r("cb7c");e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"11e9":function(e,t,r){var a=r("52a7"),n=r("4630"),i=r("6821"),c=r("6a99"),s=r("69a8"),o=r("c69a"),u=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?u:function(e,t){if(e=i(e),t=c(t,!0),o)try{return u(e,t)}catch(r){}if(s(e,t))return n(!a.f.call(e,t),e[t])}},"1af6":function(e,t,r){var a=r("63b6");a(a.S,"Array",{isArray:r("9003")})},"214f":function(e,t,r){"use strict";r("b0c5");var a=r("2aba"),n=r("32e9"),i=r("79e5"),c=r("be13"),s=r("2b4c"),o=r("520a"),u=s("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),d=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var p=s(e),h=!i(function(){var t={};return t[p]=function(){return 7},7!=""[e](t)}),f=h?!i(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[u]=function(){return r}),r[p](""),!t}):void 0;if(!h||!f||"replace"===e&&!l||"split"===e&&!d){var m=/./[p],v=r(c,p,""[e],function(e,t,r,a,n){return t.exec===o?h&&!n?{done:!0,value:m.call(t,r,a)}:{done:!0,value:e.call(r,t,a)}:{done:!1}}),g=v[0],b=v[1];a(String.prototype,e,g),n(RegExp.prototype,p,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}}},"28a5":function(e,t,r){"use strict";var a=r("aae3"),n=r("cb7c"),i=r("ebd6"),c=r("0390"),s=r("9def"),o=r("5f1b"),u=r("520a"),l=r("79e5"),d=Math.min,p=[].push,h="split",f="length",m="lastIndex",v=4294967295,g=!l(function(){RegExp(v,"y")});r("214f")("split",2,function(e,t,r,l){var b;return b="c"=="abbc"[h](/(b)*/)[1]||4!="test"[h](/(?:)/,-1)[f]||2!="ab"[h](/(?:ab)*/)[f]||4!="."[h](/(.?)(.?)/)[f]||"."[h](/()()/)[f]>1||""[h](/.?/)[f]?function(e,t){var n=String(this);if(void 0===e&&0===t)return[];if(!a(e))return r.call(n,e,t);var i,c,s,o=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),d=0,h=void 0===t?v:t>>>0,g=new RegExp(e.source,l+"g");while(i=u.call(g,n)){if(c=g[m],c>d&&(o.push(n.slice(d,i.index)),i[f]>1&&i.index<n[f]&&p.apply(o,i.slice(1)),s=i[0][f],d=c,o[f]>=h))break;g[m]===i.index&&g[m]++}return d===n[f]?!s&&g.test("")||o.push(""):o.push(n.slice(d)),o[f]>h?o.slice(0,h):o}:"0"[h](void 0,0)[f]?function(e,t){return void 0===e&&0===t?[]:r.call(this,e,t)}:r,[function(r,a){var n=e(this),i=void 0==r?void 0:r[t];return void 0!==i?i.call(r,n,a):b.call(String(n),r,a)},function(e,t){var a=l(b,e,this,t,b!==r);if(a.done)return a.value;var u=n(e),p=String(this),h=i(u,RegExp),f=u.unicode,m=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),y=new h(g?u:"^(?:"+u.source+")",m),x=void 0===t?v:t>>>0;if(0===x)return[];if(0===p.length)return null===o(y,p)?[p]:[];var w=0,C=0,P=[];while(C<p.length){y.lastIndex=g?C:0;var S,O=o(y,g?p:p.slice(C));if(null===O||(S=d(s(y.lastIndex+(g?0:C)),p.length))===w)C=c(p,C,f);else{if(P.push(p.slice(w,C)),P.length===x)return P;for(var j=1;j<=O.length-1;j++)if(P.push(O[j]),P.length===x)return P;C=w=S}}return P.push(p.slice(w)),P}]})},3242:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"il-teacher"},[r("div",{staticClass:"il-teacher--content"},[r("ilAlert",{attrs:{has:e.checkAlert,msg:e.message}}),r("h3",{staticClass:"il-color--darkblue"},[e._v("Editar conta ")]),e.teacherID?r("ilTeacherFormEdit",{attrs:{id:e.getID},on:{msg:e.setAlert}}):e._e()],1)])},n=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"il-teacher--edit"},[e.showSnapShot?r("ilSnapPhoto",{on:{avatar:e.setPicture}}):e._e(),e.teacher.picture?r("div",{staticClass:"il-snapshot--avatar"},[r("img",{attrs:{src:"data:image/jpeg;base64,/"+e.teacher.picture,alt:""}})]):e._e(),r("form",{staticClass:"il-form il-form--signup",on:{submit:function(t){return t.preventDefault(),e.doUpdate(t)}}},[r("div",{staticClass:"il-signup"},[r("div",{staticClass:"il-signup--content"},[r("h5",{staticClass:"il-color--light"},[e._v("Dados Pessoais")]),r("label",{attrs:{for:"name"}},[e._v("Nome")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.name,expression:"teacher.name"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"nome completo",required:""},domProps:{value:e.teacher.name},on:{input:function(t){t.target.composing||e.$set(e.teacher,"name",t.target.value)}}}),r("label",{attrs:{for:"cpf"}},[e._v("CPF")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.cpf,expression:"teacher.cpf"}],staticClass:"il-input--cpf",attrs:{type:"text",placeholder:"seu CPF",id:"cpf",required:""},domProps:{value:e.teacher.cpf},on:{input:function(t){t.target.composing||e.$set(e.teacher,"cpf",t.target.value)}}}),r("label",{attrs:{for:"cr"}},[e._v("CR")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.cr,expression:"teacher.cr"}],staticClass:"il-input--cpf",attrs:{type:"text",placeholder:"seu CR",id:"cr",required:""},domProps:{value:e.teacher.cr},on:{input:function(t){t.target.composing||e.$set(e.teacher,"cr",t.target.value)}}}),r("label",{attrs:{for:"email"}},[e._v("Email")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.email,expression:"teacher.email"}],staticClass:"il-add--description",attrs:{type:"email",placeholder:"Email",id:"email"},domProps:{value:e.teacher.email},on:{input:function(t){t.target.composing||e.$set(e.teacher,"email",t.target.value)}}}),r("label",{attrs:{for:"dn"}},[e._v("Data Nasc")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.dnasc,expression:"teacher.dnasc"}],staticClass:"il-input--dn",attrs:{type:"date",placeholder:"Data de Nascimento",id:"dn"},domProps:{value:e.teacher.dnasc},on:{input:function(t){t.target.composing||e.$set(e.teacher,"dnasc",t.target.value)}}})]),r("div",{staticClass:"il-teacher--content"},[r("h5",{staticClass:"il-color--light"},[e._v("Endereço")]),r("label",{attrs:{for:"cep"}},[e._v("CEP")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.cep,expression:"teacher.address.cep"}],staticClass:"il-input--cep",attrs:{type:"text",placeholder:"CEP",id:"cep"},domProps:{value:e.teacher.address.cep},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"cep",t.target.value)}}}),r("i",{staticClass:"mdi mdi-12px mdi-search-web",on:{click:function(t){return t.preventDefault(),e.getAddress(t)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.rua_av,expression:"teacher.address.rua_av"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"Rua/Av"},domProps:{value:e.teacher.address.rua_av},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"rua_av",t.target.value)}}}),r("label",{attrs:{for:"nr"}},[e._v("Nr")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.nr,expression:"teacher.address.nr"}],staticClass:"il-input--nr",attrs:{type:"text",placeholder:"NR",id:"nr"},domProps:{value:e.teacher.address.nr},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"nr",t.target.value)}}}),r("label",{attrs:{for:"complemento"}},[e._v("Complemento")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.complemento,expression:"teacher.address.complemento"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"Complemento",id:"complemento"},domProps:{value:e.teacher.address.complemento},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"complemento",t.target.value)}}}),r("label",{attrs:{for:"bairro"}},[e._v("Bairro")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.suburb,expression:"teacher.address.suburb"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"Bairro",id:"bairro"},domProps:{value:e.teacher.address.suburb},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"suburb",t.target.value)}}}),r("label",{attrs:{for:"cidade"}},[e._v("Cidade")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.city,expression:"teacher.address.city"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"Cidade",id:"cidade"},domProps:{value:e.teacher.address.city},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"city",t.target.value)}}}),r("label",{attrs:{for:"uf"}},[e._v("UF")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.UF,expression:"teacher.address.UF"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"UF",id:"uf"},domProps:{value:e.teacher.address.UF},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"UF",t.target.value)}}}),r("label",{attrs:{for:"fone"}},[e._v("Fone")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.fone,expression:"teacher.address.fone"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"fone",id:"fone"},domProps:{value:e.teacher.address.fone},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"fone",t.target.value)}}}),r("label",{attrs:{for:"cel"}},[e._v("Celular")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.teacher.address.clr,expression:"teacher.address.clr"}],staticClass:"il-add--description",attrs:{type:"text",placeholder:"Celular",id:"cel"},domProps:{value:e.teacher.address.clr},on:{input:function(t){t.target.composing||e.$set(e.teacher.address,"clr",t.target.value)}}})])]),r("div",{staticClass:"il-field--button"},[r("button",{staticClass:"il-btn il-btn--submit il-btn--center"},[e._v("\r\n                    Cadastrar\r\n                ")]),r("button",{staticClass:"il-btn il-btn--return il-btn--center",on:{click:function(t){return e.$router.back()}}},[e._v("\r\n                    Retornar\r\n                ")])])])],1)},c=[],s=(r("7f7f"),r("28a5"),r("768b")),o=r("855e"),u=r("da23"),l={name:"formTeacherEdit",props:{id:String},components:{ilSnapPhoto:u["a"]},data:function(){return{showSnapShot:!1,teacher:{name:"",cpf:"",cr:"",ativo:!0,email:"",dnasc:"",picture:"",address:{cep:"",rua_av:"",nr:"",complemento:"",suburb:"",city:"",UF:"",fone:"",clr:""}}}},mounted:function(){this.getTeacher()},methods:{getTeacher:function(){var e=this,t=this;this.id&&o["a"].searchTeacher(this.id).then(function(r){if(null==r.error){var a=function(){var e=r.teacher.dnasc,t=e.split("T"),a=Object(s["a"])(t,2),n=a[0],i=(a[1],n.split("-")),c=Object(s["a"])(i,3),o=c[0],u=c[1],l=c[2];return"".concat(o,"-").concat(u,"-").concat(l)};e.teacher.name=r.teacher.name,e.teacher.cpf=r.teacher.cpf,e.teacher.cr=r.teacher.cr,e.teacher.picture=r.teacher.picture,e.teacher.dnasc=a(),e.teacher.email=r.teacher.email,e.teacher.ativo=r.teacher.ativo,e.teacher.address.cep=r.teacher.address.cep,e.teacher.address.city=r.teacher.address.city,e.teacher.address.clr=r.teacher.address.clr,e.teacher.address.fone=r.teacher.address.fone,e.teacher.address.complemento=r.teacher.address.complemento,e.teacher.address.cep=r.teacher.address.cep,e.teacher.address.nr=r.teacher.address.nr,e.teacher.address.rua_av=r.teacher.address.rua_av,e.teacher.address.suburb=r.teacher.address.suburb,e.teacher.address.UF=r.teacher.address.UF,""!=e.teacher.picture&&"vai a foto"!=e.teacher.picture||(e.showSnapShot=!0)}else{var n=r.error.message;t.$emit("msg",{type:n.type,message:n.value})}}).catch(function(e){e.error;t.$emit("msg",{type:"danger",message:e})})},doUpdate:function(){var e=this;o["a"].updateTeacher(this.id,this.teacher).then(function(t){if(""==t.data.error)e.$emit("msg",{type:"success",message:"O professor/a teve sua conta modificada com sucesso!"}),setTimeout(function(){e.$router.push({name:"teachers"})},2500);else{var r=t.error.message;e.$emit("msg",{type:r.type,message:r.value})}}).catch(function(t){t.error;e.$emit("msg",{type:"danger",message:t})})},setPicture:function(e){this.teacher.picture=e},getAddress:function(){var e=this,t="https://viacep.com.br/ws/",r=this.teacher.address.cep;fetch("".concat(t).concat(r,"/json/")).then(function(t){200==t.status&&"OK"==t.statusText&&t.json().then(function(t){e.teacher.address.suburb=t.bairro,e.teacher.address.rua_av=t.logradouro,e.teacher.address.city=t.localidade,e.teacher.address.UF=t.uf})})}}},d=l,p=r("2877"),h=Object(p["a"])(d,i,c,!1,null,null,null),f=h.exports,m=r("eba2"),v={name:"editTeacher",components:{ilTeacherFormEdit:f,ilAlert:m["a"]},data:function(){return{teacherID:null,message:null}},computed:{checkAlert:function(){return!!this.message},getID:function(){return this.teacherID?this.$route.params.id:null}},mounted:function(){this.teacherID=this.$route.params.id},methods:{setAlert:function(e){this.message=e}}},g=v,b=Object(p["a"])(g,a,n,!1,null,null,null);t["default"]=b.exports},"454f":function(e,t,r){r("46a7");var a=r("584a").Object;e.exports=function(e,t,r){return a.defineProperty(e,t,r)}},"456d":function(e,t,r){var a=r("4bf8"),n=r("0d58");r("5eda")("keys",function(){return function(e){return n(a(e))}})},"469f":function(e,t,r){r("6c1c"),r("1654"),e.exports=r("7d7b")},"46a7":function(e,t,r){var a=r("63b6");a(a.S+a.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"520a":function(e,t,r){"use strict";var a=r("0bfb"),n=RegExp.prototype.exec,i=String.prototype.replace,c=n,s="lastIndex",o=function(){var e=/a/,t=/b*/g;return n.call(e,"a"),n.call(t,"a"),0!==e[s]||0!==t[s]}(),u=void 0!==/()??/.exec("")[1],l=o||u;l&&(c=function(e){var t,r,c,l,d=this;return u&&(r=new RegExp("^"+d.source+"$(?!\\s)",a.call(d))),o&&(t=d[s]),c=n.call(d,e),o&&c&&(d[s]=d.global?c.index+c[0].length:t),u&&c&&c.length>1&&i.call(c[0],r,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(c[l]=void 0)}),c}),e.exports=c},"5d73":function(e,t,r){e.exports=r("469f")},"5eda":function(e,t,r){var a=r("5ca1"),n=r("8378"),i=r("79e5");e.exports=function(e,t){var r=(n.Object||{})[e]||Object[e],c={};c[e]=t(r),a(a.S+a.F*i(function(){r(1)}),"Object",c)}},"5f1b":function(e,t,r){"use strict";var a=r("23c6"),n=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var i=r.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(e))throw new TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"768b":function(e,t,r){"use strict";var a=r("a745"),n=r.n(a);function i(e){if(n()(e))return e}var c=r("5d73"),s=r.n(c);function o(e,t){var r=[],a=!0,n=!1,i=void 0;try{for(var c,o=s()(e);!(a=(c=o.next()).done);a=!0)if(r.push(c.value),t&&r.length===t)break}catch(u){n=!0,i=u}finally{try{a||null==o["return"]||o["return"]()}finally{if(n)throw i}}return r}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function l(e,t){return i(e)||o(e,t)||u()}r.d(t,"a",function(){return l})},"7d7b":function(e,t,r){var a=r("e4ae"),n=r("7cd6");e.exports=r("584a").getIterator=function(e){var t=n(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return a(t.call(e))}},"855e":function(e,t,r){"use strict";r("96cf");var a=r("3b8d"),n=(r("7f7f"),r("bc3a")),i=r.n(n),c=r("541e"),s={urlAPI:"/teacher",baseURL:c["a"].base_url,points:[{name:"multiple",path:"/create/multiple"},{name:"create",path:"/create"},{name:"alls",path:"/alls"},{name:"show",path:"/show"},{name:"update",path:"/update"},{name:"remove",path:"/remove"}]},o=function(){return{headers:{authorization:"Bearer "+localStorage.getItem("_token")}}},u=function(e){for(var t=s.baseURL,r=c["a"].api_url+s.urlAPI,a=null,n=0;n<s.points.length;n++)if(s.points[n].name==e){a=s.points[n].path;break}return"login"==e||"logout"==e?t+"/kaizen/api"+a:t+r+a},l={createMultiple:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=u("multiple"),e.abrupt("return",i.a.post(r,t,o()).then(function(e){return e}).catch(function(e){return Promise.reject(e.message)}));case 2:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),create:function(e){var t=u("create");return i.a.post(t,e,o()).then(function(e){return e}).catch(function(e){return Promise.reject(e.message)})},searchTeacher:function(e){var t=u("show");return i.a.get(t+"/"+e,o()).then(function(e){var t=e.data;return t}).catch(function(e){return Promise.reject(e.message)})},getTeachers:function(){var e=u("alls");return i.a.get(e,o()).then(function(e){var t=e.data;return t}).catch(function(e){return Promise.reject(e.message)})},updateTeacher:function(e,t){var r=u("update");return i.a.put(r+"/"+e,t,o()).then(function(e){var t=e.data;return t}).catch(function(e){return Promise.reject(e.message)})},removeTeacher:function(e){var t=u("remove");return i.a.delete(t+"/"+e,o()).then(function(e){return e}).catch(function(e){return Promise.reject(e.message)})}};t["a"]=l},"85f2":function(e,t,r){e.exports=r("454f")},"8e6e":function(e,t,r){var a=r("5ca1"),n=r("990b"),i=r("6821"),c=r("11e9"),s=r("f1ae");a(a.S,"Object",{getOwnPropertyDescriptors:function(e){var t,r,a=i(e),o=c.f,u=n(a),l={},d=0;while(u.length>d)r=o(a,t=u[d++]),void 0!==r&&s(l,t,r);return l}})},9003:function(e,t,r){var a=r("6b4c");e.exports=Array.isArray||function(e){return"Array"==a(e)}},9093:function(e,t,r){var a=r("ce10"),n=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,n)}},"990b":function(e,t,r){var a=r("9093"),n=r("2621"),i=r("cb7c"),c=r("7726").Reflect;e.exports=c&&c.ownKeys||function(e){var t=a.f(i(e)),r=n.f;return r?t.concat(r(e)):t}},a745:function(e,t,r){e.exports=r("f410")},aae3:function(e,t,r){var a=r("d3f4"),n=r("2d95"),i=r("2b4c")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==n(e))}},ac6a:function(e,t,r){for(var a=r("cadf"),n=r("0d58"),i=r("2aba"),c=r("7726"),s=r("32e9"),o=r("84f2"),u=r("2b4c"),l=u("iterator"),d=u("toStringTag"),p=o.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=n(h),m=0;m<f.length;m++){var v,g=f[m],b=h[g],y=c[g],x=y&&y.prototype;if(x&&(x[l]||s(x,l,p),x[d]||s(x,d,g),o[g]=p,b))for(v in a)x[v]||i(x,v,a[v],!0)}},b0c5:function(e,t,r){"use strict";var a=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},bd86:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var a=r("85f2"),n=r.n(a);function i(e,t,r){return t in e?n()(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},da23:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"il-snapshot"},[r("div",{staticClass:"il-card--snapshot"},[r("div",{staticClass:"il-card--content"},[r("video",{staticClass:"il-video",attrs:{autoplay:""}}),r("button",{staticClass:"il-btn il-btn--picture",attrs:{id:"btnCamera"},on:{click:function(t){return t.preventDefault(),e.openCamera(t)}}},[e._v("Camera")])]),r("div",{staticClass:"il-card--content"},[r("canvas",{staticClass:"il-canvas"}),r("button",{staticClass:"il-btn il-btn--picture",attrs:{id:"btnTakePhoto"},on:{click:function(t){return t.preventDefault(),e.takePicture(t)}}},[e._v("Fotografar")])])])])},n=[],i=(r("28a5"),r("96cf"),r("3b8d")),c={media:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!("mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices)){e.next=8;break}return navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,window.URL=window.URL||window.webkitURL||window.mozURL||window.msURL,t={video:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440}},audio:!1},e.next=6,navigator.mediaDevices.getUserMedia(t);case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),endMedia:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices(function(e){return e});case 2:t=e.sent,console.log(t);case 4:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),handleStream:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:navigator.mediaDevices.getUserMedia({video:!1});case 1:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}()},s=c,o={name:"snapShot",data:function(){return{avatar:null}},methods:{endCamera:function(){s.endMedia()},openCamera:function(){var e=s.media(),t=document.querySelector("video.il-video");e.then(function(e){t.srcObject=e})},takePicture:function(){var e=document.querySelector(".il-canvas"),t=document.querySelector("video.il-video");e.width=t.clientWidth;var r=e.width;e.height=t.clientHeight-4;var a=e.getContext("2d");a.translate(r,0),a.scale(-1,1),a.drawImage(t,0,0,e.width,e.height);var n=e.toDataURL("image/jpeg"),i=n.split("data:image/jpeg;base64,/");this.avatar="data:image/jpeg;base64,/"+i[1],this.$emit("avatar",i[1])}}},u=o,l=r("2877"),d=Object(l["a"])(u,a,n,!1,null,null,null);t["a"]=d.exports},eba2:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.checkAlert?r("div",{class:this.alert.message?"il-alert "+e.alert.type+" il-alert--show":""},[r("p",[e._v(e._s(e.alert.message))])]):e._e()},n=[],i=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),c=r("2f62");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(r,!0).forEach(function(t){Object(i["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var u={name:"alerts",props:{has:Boolean,msg:Object},computed:o({},Object(c["d"])({alert:function(e){return e.alert}}),{checkAlert:function(){return!!this.has&&(this.setAlert(),!0)}}),methods:o({},Object(c["b"])("alert",{success:"success",warning:"warning",danger:"danger",clearAlert:"clear"}),{setAlert:function(){var e=this,t=this.msg.type,r=this.msg.message;if(setTimeout(function(){e.$parent.message=null},4e3),r)switch(t){case"warning":this.warning(r);break;case"success":this.success(r);break;case"danger":this.danger(r);break}}})},l=u,d=r("2877"),p=Object(d["a"])(l,a,n,!1,null,null,null);t["a"]=p.exports},f1ae:function(e,t,r){"use strict";var a=r("86cc"),n=r("4630");e.exports=function(e,t,r){t in e?a.f(e,t,n(0,r)):e[t]=r}},f410:function(e,t,r){r("1af6"),e.exports=r("584a").Array.isArray}}]);
//# sourceMappingURL=chunk-a9f02ebe.dad4d3bd.js.map