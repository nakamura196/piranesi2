(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{322:function(t,n,e){"use strict";n.a={methods:{get_print_data:function(t){for(var data={},n={},e=t.data.manifests,i=0;i<e.length;i++){for(var r=e[i],o=r.metadata,map={},l=0;l<o.length;l++){var d=o[l],label=d.label,h=d.value;n[label]||(n[label]={}),n[label][h]||(n[label][h]=[]),n[label][h].push(r["@id"]),map[label]=h}data[r["@id"]]=map,map.thumbnail=r.thumbnail,map.manifest=r["@id"]}return{data:data,index:n}},get_photo_data:function(t){for(var data={},n={},e=t.data.manifests,i=0;i<e.length;i++){for(var r=e[i],o=r.metadata,map={},l=0;l<o.length;l++){var d=o[l],label=d.label,h=d.value;n[label]||(n[label]={}),n[label][h]||(n[label][h]=[]),n[label][h].push(r["@id"]),map[label]=h}data[r["@id"]]=map,map.manifest=r["@id"]}return{data:data,index:n}}}}},410:function(t,n,e){"use strict";e.r(n);var r=e(322),o=e(76),l=e.n(o),d={mixins:[r.a],data:function(){return{title:""}},created:function(){var t=this,n=this.$route.query.mapNo;l.a.get("https://raw.githubusercontent.com/nakamura196/piranesi/master/docs/print/iiif/top.json").then((function(e){var r=t.get_printDdata(e),o=r.index.mapNo[n][0],l=r.data[o];t.title=l.Edificio_i}))}},h=e(44),c=e(64),f=e.n(c),m=e(311),component=Object(h.a)(d,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("v-container",[n("h2",{staticClass:"my-5"},[this._v(this._s(this.title))]),this._v(" "),n("iframe",{attrs:{width:"100%",height:"600px",allowfullscreen:"",frameborder:"0",src:"https://nakamura196.github.io/piranesi/icv/?curation=https://mp.ex.nii.ac.jp/api/curation/json/af18d11d-0d58-46de-aa50-28bb930babd9&mode=annotation&lang=ja&full=1"}}),this._v(" "),n("p",{staticClass:"mt-5"},[n("router-link",{attrs:{to:{path:"/mapsearch"}}},[this._v("Show all places.")])],1)])],1)}),[],!1,null,null,null);n.default=component.exports;f()(component,{VContainer:m.a})}}]);