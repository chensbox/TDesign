var B=Object.defineProperty,b=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var f=(e,n,t)=>n in e?B(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,i=(e,n)=>{for(var t in n||(n={}))S.call(n,t)&&f(e,t,n[t]);if(d)for(var t of d(n))T.call(n,t)&&f(e,t,n[t]);return e},r=(e,n)=>b(e,k(n));import{s as N,r as m,o as y,c as g,w as L,d as _,f as $,t as V,e as j,g as A,T as D,A as p,B as h,D as I}from"./vue-libs.bd45fd12.js";import{i as R}from"./index.4f441524.js";import{o as q}from"./index.2b529943.js";import{_ as x}from"./iframe-router.835317b7.js";function z(e,n){const t=N(e,n),s=document.createElement("div");return document.body.appendChild(s),t.mount(s),{instance:t,mountNode:s}}function v(e=0){return new Promise(n=>{setTimeout(n,e)})}const E="toast",F={icon:R,overlay:q},M={success:Boolean,fail:Boolean,destroy:Function,position:String,showLoading:Boolean,icon:String,duration:{type:Number,default:2e3},message:{type:String,require:!0},forbidClick:{type:Boolean,default:!1},loadingType:{type:String,default:"circle"}},O=(e,{expose:n})=>{const t=p({}),s=p({message:e.message}),c=h(),l=()=>{c.value&&(c.value.style.opacity=0,v(250).then(e.destroy))};return(e.showLoading||e.icon)&&(t.padding="25px 15px"),I(()=>{e.duration>0&&v(e.duration).then(l)}),n({close:l}),{state:s,toastRef:c,style:t}},P={name:E,props:M,components:F,setup:O};function G(e,n,t,s,c,l){const w=m("icon"),C=m("overlay");return y(),g(D,{name:"slide-fade",appear:""},{default:L(()=>[_("div",{class:"toast",ref:"toastRef",style:A(e.style)},[e.showLoading||e.icon?(y(),g(w,{key:0,name:e.icon,class:"toast-icon"},null,8,["name"])):$("v-if",!0),_("p",null,V(e.state.message),1),j(C,{transparent:!0,show:e.forbidClick},null,8,["show"])],4)]),_:1})}var a=x(P,[["render",G],["__scopeId","data-v-62147f50"]]);function H(e,n){e.unmount(n),document.body.removeChild(n)}function o(e){e=u(e),e.message=h(e.message),e.destroy=function(){H(n,t)};const{instance:n,mountNode:t}=z(a,e);return n.message=e.message,n.close=e.destroy,console.log(n),n}o.success=function(e){return e=u(e),o(r(i({},e),{icon:"check"}))};o.fail=function(e){return e=u(e),o(r(i({},e),{icon:"close-circle"}))};o.loading=function(e){return e=u(e),o(r(i({},e),{showLoading:!0,icon:"loading-spinner"}))};function u(e){return typeof e!="object"?{message:e}:e}a.install=function(e){e.component(a.name,a)};o.Component=a;o.install=function(e){e.use(o.Component)};export{o as T,v as s};
