(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{413:function(e,n,t){"use strict";t.r(n);t(38),t(39);var r={data:function(){return{items:[{id:1,name:"Archeological Objects",children:[{id:11,name:"Category",children:[{id:111,name:"Altars",link:!0},{id:112,name:"Architectural fragments",children:[{id:1121,name:"Capitals"}]},{id:202,name:"Kael"},{id:203,name:"Nekosaur"},{id:204,name:"Jacek"},{id:205,name:"Andrew"}]},{id:3,name:"Administrators",children:[{id:301,name:"Ranee"},{id:302,name:"Rachel"}]},{id:4,name:"Contributors",children:[{id:401,name:"Phlow"},{id:402,name:"Brandon"},{id:403,name:"Sean"}]}]}],search:null,caseSensitive:!1}},computed:{filter:function(){return this.caseSensitive?function(e,n,t){return e[t].includes(n)}:void 0}}},c=t(44),l=t(64),d=t.n(l),o=t(318),m=t(319),v=t(417),h=t(311),f=t(31),k=t(387),x=t(418),component=Object(c.a)(r,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"mt-5"},[t("v-container",[t("h3",[e._v("\n      Subject index of series by Giovanni Battista and Francesco Piranesi\n    ")]),e._v(" "),t("v-card",{staticClass:"mx-auto mt-5"},[t("v-sheet",{staticClass:"pa-4 primary lighten-2"},[t("v-text-field",{attrs:{label:"Search Subject Directory",dark:"",flat:"","solo-inverted":"","hide-details":"",clearable:"","clear-icon":"mdi-close-circle-outline"},model:{value:e.search,callback:function(n){e.search=n},expression:"search"}}),e._v(" "),t("v-checkbox",{attrs:{dark:"","hide-details":"",label:"Case sensitive search"},model:{value:e.caseSensitive,callback:function(n){e.caseSensitive=n},expression:"caseSensitive"}})],1),e._v(" "),t("v-card-text",[t("v-treeview",{attrs:{items:e.items,search:e.search,filter:e.filter,"open-all":""},scopedSlots:e._u([{key:"label",fn:function(n){var r=n.item;return[r.link?[t("router-link",{attrs:{to:{path:"/subsr",query:{subcategoria:r.name}}}},[e._v(e._s(r.name))])]:[e._v(e._s(r.name))]]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports;d()(component,{VCard:o.a,VCardText:m.a,VCheckbox:v.a,VContainer:h.a,VSheet:f.a,VTextField:k.a,VTreeview:x.a})}}]);