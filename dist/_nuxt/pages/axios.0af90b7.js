(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{311:function(e,t,r){"use strict";r(19),r(8),r(6),r(4),r(11);var n=r(3),o=(r(312),r(54)),c=r(18);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(c.a)(o.a).extend({name:"v-subheader",props:{inset:Boolean},render:function(e){return e("div",{staticClass:"v-subheader",class:h({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},312:function(e,t,r){var content=r(313);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(21).default)("e8b41e5e",content,!0,{sourceMap:!1})},313:function(e,t,r){(t=r(20)(!1)).push([e.i,".theme--light.v-subheader{color:rgba(0,0,0,.6)}.theme--dark.v-subheader{color:hsla(0,0%,100%,.7)}.v-subheader{align-items:center;display:flex;height:48px;font-size:.875rem;font-weight:400;padding:0 16px}.v-subheader--inset{margin-left:56px}",""]),e.exports=t},476:function(e,t,r){"use strict";r.r(t);r(36);var n=r(7),o={data:function(){return{data:null}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("/trends");case 2:e.data=t.sent;case 3:case"end":return t.stop()}}),t)})))()}},c=r(53),l=r(114),h=r.n(l),f=r(311),component=Object(c.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("v-subheader",[this._v("this"+this._s(this.data))])}),[],!1,null,null,null);t.default=component.exports;h()(component,{VSubheader:f.a})}}]);