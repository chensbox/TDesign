import{r as X,o as _,a as v,d as B,F as y,b as g,n as S,c as D,f as q,h as f,t as k,i as A,L as F,O as H,B as V,D as j,C as z,x as O,e as a,w as o}from"./vue-libs.bd45fd12.js";import{i as W}from"./index.4f441524.js";import{_ as I}from"./iframe-router.835317b7.js";function G(l,n){const i=l.value.clientWidth/2,u=i>n;let s=0;u&&l.value.scrollLeft?s=Math.abs(i-n)*-1:u||(s=Math.abs(i-n));const r=setInterval(()=>{Math.round(s)?(l.value.scrollLeft+=s/10,s-=s/10):clearInterval(r)},10)}function J(l,n,i,u,s){const[r]=n[l].childNodes,{left:b,width:d}=r.getBoundingClientRect(),c=l*-100,t=b+d/2;return i.value.style.width=d+"px",i.value.style.left=`${b+s.value.scrollLeft}px`,u.value.style.transform=`translateX(${c}%)`,t}function K(l,n,i){let u,s,r;return{touchstart:t=>u=t.touches[0].pageX,touchmove:t=>s=t.touches[0].pageX,touchend:()=>{if(r=s-u,Math.abs(r)<70)return;const t=r>0?l.modelValue-1:l.modelValue+1;t>=0&&t<n.length&&i(t)}}}const P="tabs",Q={lineAnimation:{type:Boolean,default:!1},tabAnimation:{type:Boolean,default:!1},swipeable:{type:Boolean,default:!1},color:{type:String,default:"#0052d9"},cover:Boolean,swipeThreshold:{type:[Number,String],default:5}},Y={icon:W},Z=["update:modelValue"];function x(l,{attrs:n,slots:i,emit:u}){let s;const{color:r,swipeThreshold:b}=H(l),d=V(),c=[],t=V(),m=V(),e=i.default();i=e[0].children instanceof Array?e[0].children:e;const T=h=>c.push(h),w=h=>{if(h===s||(s=h,c[h].classList.value.includes("not-allow")))return;const C=J(h,c,d,t,m);i.length>b.value&&G(m,C),u("update:modelValue",h)},{touchstart:R,touchmove:U,touchend:N}=K(n,c,w);return j(()=>{const C=c[n.modelValue].classList.value.includes("not-allow");w(C?n.modelValue+1:n.modelValue),l.swipeable&&(t.value.addEventListener("touchstart",R),t.value.addEventListener("touchmove",U),t.value.addEventListener("touchend",N))}),z(()=>c.length=0),O(()=>n.modelValue,()=>w(n.modelValue)),{slots:i,attrs:n,tabsSwitch:w,setTabsItemRef:T,touchstart:R,touchmove:U,touchend:N,tabsHeadRef:m,lineRef:d,trackRef:t}}const L={name:P,props:Q,emits:Z,components:Y,setup:x},E=()=>{F(l=>({"3d798b36":l.color}))},M=L.setup;L.setup=M?(l,n)=>(E(),M(l,n)):E;const ee=L,te={class:"tabs-head",ref:"tabsHeadRef"},le=["onClick"];function ae(l,n,i,u,s,r){const b=X("icon");return _(),v("div",{class:S(["tabs",l.cover?"cover":""])},[B("div",te,[(_(!0),v(y,null,g(l.slots,(d,c)=>(_(),v("div",{class:S(["tabs-head-item",{"not-allow":d.props.disable==""||d.props.disable}]),key:c,ref_for:!0,ref:l.setTabsItemRef,onClick:t=>l.tabsSwitch(c)},[B("span",{class:S({blod:l.attrs.modelValue===c})},[d.props.icon?(_(),D(b,{key:0,name:d.props.icon},null,8,["name"])):q("v-if",!0),f(" "+k(d.props.title),1)],2)],10,le))),128)),B("div",{class:S(["tabs-head-line",l.lineAnimation?"line_animation":""]),ref:"lineRef"},null,2)],512),B("div",{class:S(["tabs-track",l.tabAnimation?"tabs_animation":""]),ref:"trackRef"},[A(l.$slots,"default")],2)],2)}var $=I(ee,[["render",ae]]);const oe="tab",ne={title:String,disable:Boolean},se={name:oe,props:ne},ie={class:"tabs-body"},ue={class:"empty"};function de(l,n,i,u,s,r){return _(),v("div",ie,[A(l.$slots,"default",{},()=>[B("div",ue,k(l.title)+"\u5185\u5BB9\u533A",1)])])}var p=I(se,[["render",de]]);const ce=f("\u6807\u7B7E1\u5185\u5BB9\u533A"),re=f("\u6807\u7B7E2\u5185\u5BB9\u533A"),fe=f("\u6807\u7B7E3\u5185\u5BB9\u533A"),me=f("\u6807\u7B7E1\u5185\u5BB9\u533A"),pe=f("\u6807\u7B7E2\u5185\u5BB9\u533A"),_e=f("\u6807\u7B7E3\u5185\u5BB9\u533A"),he={setup(l){const n=V(0),i=V(0),u=V(0),s=V(0),r=V(0),b=V(0),d=V(0);return(c,t)=>{const m=X("demo-block");return _(),v(y,null,[a(m,{title:"\u57FA\u7840\u7528\u6CD5"},{default:o(()=>[a($,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=e=>n.value=e)},{default:o(()=>[(_(),v(y,null,g(4,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u81EA\u5B9A\u4E49\u989C\u8272"},{default:o(()=>[a($,{modelValue:i.value,"onUpdate:modelValue":t[1]||(t[1]=e=>i.value=e),color:"red"},{default:o(()=>[(_(),v(y,null,g(4,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u5207\u6362\u52A8\u753B"},{default:o(()=>[a($,{modelValue:u.value,"onUpdate:modelValue":t[2]||(t[2]=e=>u.value=e),"line-animation":"","tab-animation":""},{default:o(()=>[(_(),v(y,null,g(4,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u6837\u5F0F\u98CE\u683C"},{default:o(()=>[a($,{modelValue:u.value,"onUpdate:modelValue":t[3]||(t[3]=e=>u.value=e),"line-animation":"","tab-animation":"",cover:""},{default:o(()=>[(_(),v(y,null,g(4,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u81EA\u5B9A\u4E49\u56FE\u6807"},{default:o(()=>[a($,{modelValue:b.value,"onUpdate:modelValue":t[4]||(t[4]=e=>b.value=e),"line-animation":"","tab-animation":""},{default:o(()=>[a(p,{title:"\u6807\u7B7E1",icon:"setting"},{default:o(()=>[ce]),_:1}),a(p,{title:"\u6807\u7B7E2",icon:"info-circle"},{default:o(()=>[re]),_:1}),a(p,{title:"\u6807\u7B7E3",icon:"question-circle"},{default:o(()=>[fe]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u7981\u7528\u6807\u7B7E"},{default:o(()=>[a($,{modelValue:d.value,"onUpdate:modelValue":t[5]||(t[5]=e=>d.value=e),"line-animation":"","tab-animation":""},{default:o(()=>[a(p,{title:"\u6807\u7B7E1",icon:"setting"},{default:o(()=>[me]),_:1}),a(p,{title:"\u6807\u7B7E2",icon:"info-circle",disable:""},{default:o(()=>[pe]),_:1}),a(p,{title:"\u6807\u7B7E3",icon:"question-circle"},{default:o(()=>[_e]),_:1})]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u6807\u7B7E\u680F\u81EA\u6EDA\u52A8\u5C45\u4E2D"},{default:o(()=>[a($,{modelValue:s.value,"onUpdate:modelValue":t[6]||(t[6]=e=>s.value=e),"line-animation":"","tab-animation":""},{default:o(()=>[(_(),v(y,null,g(8,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1}),a(m,{title:"\u624B\u52BF\u6ED1\u52A8\u5207\u6362"},{default:o(()=>[a($,{modelValue:r.value,"onUpdate:modelValue":t[7]||(t[7]=e=>r.value=e),"line-animation":"","tab-animation":"",swipeable:""},{default:o(()=>[(_(),v(y,null,g(8,e=>a(p,{title:"\u6807\u7B7E"+e,key:e},{default:o(()=>[f(k(`\u6807\u7B7E${e}\u5185\u5BB9\u533A`),1)]),_:2},1032,["title"])),64))]),_:1},8,["modelValue"])]),_:1})],64)}}};export{he as default};
