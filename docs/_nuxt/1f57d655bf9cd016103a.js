(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{303:function(t,n,e){"use strict";n.a={methods:{get_print_data:function(t){for(var data={},n={},e=t.data.manifests,i=0;i<e.length;i++){for(var r=e[i],l=r.metadata,map={},o=0;o<l.length;o++){var c=l[o],label=c.label,v=c.value;n[label]||(n[label]={}),n[label][v]||(n[label][v]=[]),n[label][v].push(r["@id"]),map[label]=v}data[r["@id"]]=map,map.thumbnail=r.thumbnail,map.manifest=r["@id"]}return{data:data,index:n}},get_photo_data:function(t){for(var data={},n={},e=t.data.manifests,i=0;i<e.length;i++){for(var r=e[i],l=r.metadata,map={},o=0;o<l.length;o++){var c=l[o],label=c.label,v=c.value;n[label]||(n[label]={}),n[label][v]||(n[label][v]=[]),n[label][v].push(r["@id"]),map[label]=v}data[r["@id"]]=map,map.manifest=r["@id"]}return{data:data,index:n}}}}},320:function(t,n,e){"use strict";e.r(n);e(38),e(39);var r=e(85),l=e.n(r),o={mixins:[e(303).a],data:function(){return{title:"",arr:[]}},watch:{$route:function(){this.init()}},created:function(){this.init()},methods:{init:function(){var t=this,n=this.$route.query.citta?this.$route.query.citta:null;this.title=n,null!=n&&l.a.get("https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json").then((function(e){var data=t.get_print_data(e),r=data.index["検索フィールド"],l=[];for(var o in r)if(o.includes(n))for(var c=r[o],v=0;v<c.length;v++)l.push(c[v]);for(var _=[],i=0;i<l.length;i++)_.push(data.data[l[i]]);t.arr=_}))}}},c=e(50),v=e(63),_=e.n(v),d=e(302),h=e(301),f=e(317),m=e(297),w=e(110),x=e(318),component=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("v-container",[e("h2",{staticClass:"my-5"},[t._v("Views, Remains, Architectures in "+t._s(t.title))]),t._v(" "),e("h2",{staticClass:"my-5"},[t._v(t._s(t.title)+"の景色、遺跡、建築")]),t._v(" "),e("small",[t._v(t._s(t.arr.length)+"図版")]),t._v(" "),t._l(t.arr,(function(n,r){return e("v-card",{key:r,staticClass:"my-5"},[e("v-card-text",[e("v-row",[e("v-col",{attrs:{cols:"1"}},[t._v(t._s(r+1))]),t._v(" "),e("v-col",{attrs:{cols:"2"}},[e("v-img",{staticClass:"mt-2",attrs:{contain:!0,src:n.thumbnail,"max-height":"200px"}})],1),t._v(" "),e("v-col",{attrs:{cols:"9"}},[e("router-link",{attrs:{to:{path:"/detail_cdml_j",query:{file_no:n.file_no}}}},[e("small",[t._v(t._s(n.volume)+"巻 "+t._s(n.series_JP))]),t._v(" "),e("br"),t._v("\n              "+t._s(n.plate)+"葉 "+t._s(n.title_JP)+"\n              "),e("br"),t._v("\n              "+t._s(n.title)+"\n            ")])],1)],1)],1)],1)})),t._v(" "),e("br")],2)],1)}),[],!1,null,null,null);n.default=component.exports;_()(component,{VCard:d.a,VCardText:h.a,VCol:f.a,VContainer:m.a,VImg:w.a,VRow:x.a})}}]);