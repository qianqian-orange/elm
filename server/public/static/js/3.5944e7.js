(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{374:function(t,e,s){},375:function(t,e,s){},376:function(t,e,s){"use strict";var r=s(374);s.n(r).a},377:function(t,e,s){"use strict";var r={name:"ElmHeader",props:{to:{type:String,default:""},replace:{type:Boolean,default:!1}},methods:{jump:function(){this.$emit("jump"),this.to?this.replace?this.$router.replace(this.to):this.$router.push(this.to):this.$router.go(-1)}}},n=(s(376),s(0)),i=Object(n.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"elm-header"},[this._t("left",[e("elm-icon",{attrs:{name:"arrow","font-size":44,rotate:-90},on:{click:this.jump}})]),this._v(" "),this._t("default"),this._v(" "),this._t("right")],2)}),[],!1,null,"71d3cc0e",null);e.a=i.exports},379:function(t,e,s){t.exports=s(380)},380:function(t,e,s){var r=s(381);t.exports=r},381:function(t,e,s){s(382);var r=s(16);r.JSON||(r.JSON={stringify:JSON.stringify}),t.exports=function(t,e,s){return r.JSON.stringify.apply(null,arguments)}},382:function(t,e,s){var r=s(4),n=s(52),i=s(20),a=n("JSON","stringify"),o=/[\uD800-\uDFFF]/g,c=/^[\uD800-\uDBFF]$/,l=/^[\uDC00-\uDFFF]$/,h=function(t,e,s){var r=s.charAt(e-1),n=s.charAt(e+1);return c.test(t)&&!l.test(n)||l.test(t)&&!c.test(r)?"\\u"+t.charCodeAt(0).toString(16):t},u=i((function(){return'"\\udf06\\ud834"'!==a("\udf06\ud834")||'"\\udead"'!==a("\udead")}));a&&r({target:"JSON",stat:!0,forced:u},{stringify:function(t,e,s){var r=a.apply(null,arguments);return"string"==typeof r?r.replace(o,h):r}})},383:function(t,e,s){"use strict";var r=s(131),n=s(61),i=s(132),a=s(36),o={name:"ListScrollView",components:{ScrollView:n.a,ElmFinish:i.a},mixins:[r.a],props:{dataSource:{type:Array,default:function(){return[]}},probeType:{type:Number,default:0},interval:{type:Number,default:300},loading:{type:Boolean,default:!1},finish:{type:Boolean,default:!1}},data:function(){return{px2rem:a.a}},watch:{dataSource:function(){this.reset()},loading:function(){this.reset()}},mounted:function(){var t=this;this.$refs.scroll.on("scroll",(function(e){var s=e.y;t.parentHeight>=t.contentHeight||t.parentHeight+t.interval>=t.contentHeight+s&&!t.loading&&!t.finish&&t.$emit("loadmore")}))},methods:{scrollTo:function(t,e){var s=t.x,r=t.y;this.$refs.scroll.scrollTo({x:s,y:r},e)},getScroll:function(){return this.$refs.scroll}}},c=(s(384),s(0)),l=Object(c.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("scroll-view",{ref:"scroll",attrs:{"probe-type":t.probeType}},[s("div",{staticClass:"list-container",style:{minHeight:t.parentHeight+"px",paddingBottom:t.dataSource.length&&t.finish?""+t.px2rem(112):0}},[t._t("default"),t._v(" "),s("elm-loading",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}]}),t._v(" "),t.dataSource.length||t.loading?t._e():s("elm-empty"),t._v(" "),s("elm-finish",{directives:[{name:"show",rawName:"v-show",value:t.dataSource.length&&t.finish,expression:"dataSource.length && finish"}]})],2)])}),[],!1,null,"5be1a916",null);e.a=l.exports},384:function(t,e,s){"use strict";var r=s(375);s.n(r).a},391:function(t,e,s){t.exports=s(392)},392:function(t,e,s){var r=s(393);t.exports=r},393:function(t,e,s){var r=s(394),n=Array.prototype;t.exports=function(t){var e=t.indexOf;return t===n||t instanceof Array&&e===n.indexOf?r:e}},394:function(t,e,s){s(395);var r=s(30);t.exports=r("Array").indexOf},395:function(t,e,s){"use strict";var r=s(4),n=s(133).indexOf,i=s(109),a=s(45),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),h=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:c||!l||!h},{indexOf:function(t){return c?o.apply(this,arguments)||0:n(this,t,arguments.length>1?arguments[1]:void 0)}})},405:function(t,e,s){},406:function(t,e,s){},407:function(t,e,s){},434:function(t,e,s){"use strict";var r=s(12),n=s.n(r),i=s(15),a=s.n(i),o=s(7),c=s.n(o),l=s(1),h=s.n(l),u=s(6),f=s.n(u),d=s(5),p=s.n(d),g=s(8),m=s.n(g),v=s(11),y=s.n(v),b=s(37),_=s.n(b),S=s(2),w=s.n(S),x=s(9),$=s(24),O=s(50),C=s(383),k=s(137);function H(t,e){var s=y()(t);if(m.a){var r=m()(t);e&&(r=p()(r).call(r,(function(e){return f()(t,e).enumerable}))),s.push.apply(s,r)}return s}function W(t){for(var e=1;e<arguments.length;e++){var s,r=null!=arguments[e]?arguments[e]:{};if(e%2)h()(s=H(Object(r),!0)).call(s,(function(e){w()(t,e,r[e])}));else if(c.a)a()(t,c()(r));else{var i;h()(i=H(Object(r))).call(i,(function(e){n()(t,e,f()(r,e))}))}}return t}var j={name:"ShopList",components:{ListScrollView:C.a,ShopCard:k.a},props:{init:{type:Boolean,default:!0},extra:{type:Boolean,default:!1}},data:function(){return{loading:!1}},computed:W({},Object(x.mapState)("shop",{shopList:function(t){return t.shopList.data},finish:function(t){return t.shopList.finish}})),mounted:function(){this.init&&!this.shopList.length&&this.getData()},methods:W(W({hate:function(t){var e,s=_()(e=this.shopList).call(e,(function(e){return e.id===t}));-1!==s&&(this[$.d](s),this.$refs.list.reset())},getData:function(){var t=this;return this.loading=!0,this[O.c]().then((function(){t.loading=!1}))},expand:function(){this.$refs.list.reset()},search:function(){this[$.b](),this.getData()},computedHeight:function(){this.$refs.list.computedHeight()},reset:function(){this.$refs.list.reset()},getScroll:function(){return this.$refs.list.getScroll()}},Object(x.mapActions)("shop",[O.c])),Object(x.mapMutations)("shop",[$.i,$.b,$.d]))},L=s(0),D=Object(L.a)(j,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("list-scroll-view",{ref:"list",attrs:{"probe-type":1,"data-source":t.shopList,loading:t.loading,finish:t.finish},on:{loadmore:t.getData}},[s("ul",t._l(t.shopList,(function(e){return s("shop-card",{key:e.id,attrs:{shop:e,extra:t.extra},on:{expand:t.expand,hate:t.hate}})})),1)])}),[],!1,null,null,null);e.a=D.exports},445:function(t,e,s){"use strict";var r=s(405);s.n(r).a},446:function(t,e,s){"use strict";var r=s(406);s.n(r).a},447:function(t,e,s){"use strict";var r=s(407);s.n(r).a},463:function(t,e,s){"use strict";s.r(e);var r=s(12),n=s.n(r),i=s(15),a=s.n(i),o=s(7),c=s.n(o),l=s(1),h=s.n(l),u=s(6),f=s.n(u),d=s(5),p=s.n(d),g=s(8),m=s.n(g),v=s(11),y=s.n(v),b=s(66),_=s.n(b),S=s(2),w=s.n(S),x=s(22),$=s.n(x),O=s(9),C=s(130),k=s(34),H=s(24),W=s(23),j=s(39),L=s(379),D=s.n(L),E=s(21);var N=s(377),T=s(136),A=s(434),F={name:"Shop",components:{SortFilter:T.a,ShopList:A.a},data:function(){return{filterHeight:0}},mounted:function(){var t=this;this.filterHeight=p()(this.$refs).$el.offsetHeight,this.$nextTick((function(){t.$refs.list.reset()}))},methods:{search:function(){this.$refs.list.search()},getScroll:function(){return this.$refs.list.getScroll()}}},J=(s(445),s(0)),P=Object(J.a)(F,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"shop-container",style:{paddingTop:this.filterHeight+"px"}},[e("sort-filter",{ref:"filter",style:{position:"absolute",top:0,left:0,right:0},attrs:{hidden:!0},on:{search:this.search}}),this._v(" "),e("div",{staticClass:"scroll-wrapper"},[e("shop-list",{ref:"list",attrs:{extra:!0}})],1)],1)}),[],!1,null,"35c5d4f8",null).exports,B=s(14),z=s.n(B),M=s(391),R=s.n(M),V=s(25),I=s.n(V),q=s(10),G=s(44),K=s.n(G),Q={name:"SearchList",components:{ListScrollView:s(383).a},props:{search:{type:String,required:!0}},data:function(){return{loading:!1,restaurants:[],words:[]}},computed:{visible:function(){return this.loading||this.restaurants.length||this.words.length}},watch:{search:function(t){if(this.$refs.list.scrollTo({y:0}),""===t)return this.restaurants=[],void(this.words=[]);this.getData()},visible:function(t){t&&this.$refs.list.computedHeight()}},methods:{getData:function(){var t=this;return this.loading=!0,$.a.get("/api/shop/search").then((function(e){var s=e.data;if(0===s.code){if(""!==t.search){var r=s.data,n=r.restaurants,i=r.words;t.restaurants=I()(n).call(n,(function(t){var e;return{id:t.id,name:t.name,rating:t.rating,tags:I()(e=t.tags).call(e,(function(t){return{name:t.name,bgColor:t.name_color}})),imagePath:Object(q.d)(t.image_path)}})),t.words=i}}else t.$notify({type:"danger",message:"请求数据失败"})})).finally((function(){t.loading=!1}))},process:function(t){var e;if(!t)return"";var s=R()(t).call(t,"汉堡");return t.substring(0,s)+z()(e='<strong style="color:'.concat(K.a.themeColor,';">')).call(e,"汉堡","</strong>")+t.substring(s+"汉堡".length)},blur:function(){this.$emit("blur")},searchShop:function(){this.$emit("click")}}},U=(s(446),Object(J.a)(Q,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"scroll-wrapper",on:{touchstart:t.blur}},[s("list-scroll-view",{ref:"list",attrs:{"data-source":t.restaurants.concat(t.words),loading:t.loading,finish:!t.loading}},[s("ul",t._l(t.restaurants,(function(e){return s("router-link",{key:e.id,attrs:{to:"/shop/E10511953419827396488/order?from=/shop/search"}},[s("li",{staticClass:"search-item"},[s("img",{attrs:{src:e.imagePath,alt:"shop"}}),t._v(" "),s("div",{staticClass:"content"},[s("span",{staticClass:"name",domProps:{innerHTML:t._s(t.process(e.name))}}),t._v(" "),t._l(e.tags,(function(e,r){return s("elm-tag",{key:r,style:{backgroundColor:"#"+e.bgColor,borderWidth:0},attrs:{color:"#fff","font-size":20}},[t._v(t._s(e.name))])})),t._v(" "),s("span",{staticClass:"rating"},[t._v("评价"+t._s(e.rating))])],2)])])})),1),t._v(" "),s("ul",t._l(t.words,(function(e,r){return s("li",{key:r,staticClass:"search-item",on:{click:function(e){return e.stopPropagation(),t.searchShop(e)}}},[s("elm-icon",{attrs:{name:"search",color:"#999","font-size":36}}),t._v(" "),s("span",{staticClass:"word",domProps:{innerHTML:t._s(t.process(e))}})],1)})),0)])],1)}),[],!1,null,"39974334",null).exports);function X(t,e){var s=y()(t);if(m.a){var r=m()(t);e&&(r=p()(r).call(r,(function(e){return f()(t,e).enumerable}))),s.push.apply(s,r)}return s}var Y={name:"ShopSearch",components:{ElmHeader:N.a,SearchList:U,Shop:P},mixins:[C.a],beforeRouteLeave:function(t,e,s){var r=j.a.home,n=j.a.kind,i=j.a.shopOrder;switch(t.name){case r.name:case n.name:this[H.b](),this[k.b](W.f.slideRight);break;case i.name:e.meta.search=this.search,this.visible?e.meta.scrollHeight=this.$refs.shop.getScroll().getCurrent().y:e.meta.scrollHeight=0,this[k.b](W.f.slideLeft)}s()},beforeRouteEnter:function(t,e,s){s((function(s){var r=j.a.shopOrder,n=j.a.shopComment,i=j.a.shopDetail,a=t.meta.scrollHeight;switch(e.name){case r.name:case n.name:case i.name:s.search=t.meta.search,s.search&&(s.visible=!0,s.$nextTick((function(){s.$refs.shop.getScroll().scrollTo({y:a})})))}}))},data:function(){return{search:"",historyWords:[],max:10,hotWords:[],visible:!1,dialog:!1}},mounted:function(){var t=function(t){try{return JSON.parse(localStorage.getItem(t))}catch(t){return Object(E.i)({type:"danger",message:"数据异常"}),null}}(W.d.historySearch);t&&(this.historyWords=t),this.getData()},methods:function(t){for(var e=1;e<arguments.length;e++){var s,r=null!=arguments[e]?arguments[e]:{};if(e%2)h()(s=X(Object(r),!0)).call(s,(function(e){w()(t,e,r[e])}));else if(c.a)a()(t,c()(r));else{var i;h()(i=X(Object(r))).call(i,(function(e){n()(t,e,f()(r,e))}))}}return t}({getData:function(){var t=this;$.a.get("/api/shop/hot_words").then((function(e){var s=e.data;0===s.code?t.hotWords=s.data:t.$notify({type:"danger",message:"获取数据失败"})}))},searchHotWord:function(t){var e;this.search=t,_()(e=this.historyWords).call(e,t)||(this.historyWords.length>=this.max&&this.historyWords.pop(),this.historyWords.unshift(t),function(t,e){try{localStorage.setItem(t,D()(e))}catch(t){Object(E.i)({type:"danger",message:"数据异常"})}}(W.d.historySearch,this.historyWords))},searchShop:function(){""===this.search&&(this.search=this.hotWords.length?this.hotWords[0].word:"汉堡"),this.visible=!0},toggle:function(){this.dialog=!this.dialog},clear:function(){var t;this.dialog=!1,this.historyWords=[],t=W.d.historySearch,localStorage.removeItem(t)},empty:function(){this.visible=!1},focus:function(){this.visible=!1},blur:function(){this.$refs.search.blur()}},Object(O.mapMutations)("shop",[H.b]))},Z=(s(447),Object(J.a)(Y,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"shop-search"},[s("elm-header",{attrs:{to:""+(t.$route.query.from||"/home")}},[s("div",{staticClass:"search-container"},[s("elm-search",{ref:"search",attrs:{placeholder:t.hotWords.length?t.hotWords[0].word:""},on:{focus:t.focus,clear:t.empty},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),[s("span",{staticClass:"search",on:{click:function(e){return e.stopPropagation(),t.searchShop(e)}}},[t._v("搜索")])]],2),t._v(" "),t.historyWords.length?s("div",[s("h1",{staticClass:"title"},[t._v("历史搜索"),s("elm-icon",{attrs:{name:"trash",color:"#999","font-size":28},on:{click:t.toggle}})],1),t._v(" "),s("ul",{staticClass:"word-list"},t._l(t.historyWords,(function(e,r){return s("li",{key:r,staticClass:"word-item",on:{click:function(s){return s.stopPropagation(),t.searchHotWord(e)}}},[t._v(t._s(e))])})),0)]):t._e(),t._v(" "),s("h1",{staticClass:"title"},[t._v("搜索发现")]),t._v(" "),s("ul",{staticClass:"word-list"},t._l(t.hotWords,(function(e,r){var n=e.word;return s("li",{key:r,staticClass:"word-item",on:{click:function(e){return e.stopPropagation(),t.searchHotWord(n)}}},[t._v(t._s(n))])})),0),t._v(" "),s("search-list",{attrs:{search:t.search},on:{blur:t.blur,click:t.searchShop}}),t._v(" "),t.visible?s("shop",{ref:"shop"}):t._e(),t._v(" "),t.dialog?s("elm-dialog",{attrs:{title:"确认删除全部历史记录吗?"},on:{cancel:t.toggle,ensure:t.clear}}):t._e()],1)}),[],!1,null,"03b82ad4",null));e.default=Z.exports}}]);
//# sourceMappingURL=3.5944e7.js.map