"use strict";(self.webpackChunkprofile_web=self.webpackChunkprofile_web||[]).push([[472],{472:(e,s,t)=>{t.r(s),t.d(s,{default:()=>b});var n=t(173),r=t(791),i=t(892),a=t(355),c=t(956),o=t(9),l=t(859),f=t(878),u=t(221),d=t(184);const m=r.memo((()=>{const{scene:e}=(0,a.L)("".concat("/ProfileWeb","/pc-bake.glb")),s=(0,r.useMemo)((()=>[3,-2.8,5.5]),[]),t=(0,r.useMemo)((()=>[0,-Math.PI/2,0]),[]),n=(0,r.useMemo)((()=>[0,.2,4.3]),[]),i=(()=>{const[e,s]=r.useState("unknown");return r.useEffect((()=>{const e=window.navigator.userAgent;e.includes("Win")?s("windows"):e.includes("Mac")&&s("mac")}),[]),e})();return(0,r.useEffect)((()=>{e.traverse((e=>{e.isMesh&&(e.castShadow=!1,e.receiveShadow=!1)}))}),[e]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("ambientLight",{intensity:4,color:"#ffffff"}),(0,d.jsx)("group",{position:s,rotation:t,children:(0,d.jsx)("primitive",{object:e,scale:1})}),(0,d.jsx)("group",{position:n,children:(0,d.jsx)(c.V,{transform:!0,wrapperClass:"webgl-iframe-wrapper",distanceFactor:1.65,occlude:!0,children:(0,d.jsx)("iframe",{title:"iframe-pc",className:"webgl-iframe webgl-iframe-".concat(i),sandbox:"allow-scripts allow-same-origin",loading:"lazy",src:"https://mikalasa.github.io/ProfileWeb-Iframe-About/"})})})]})}));a.L.preload("".concat("/ProfileWeb","/pc.glb"));const p=()=>(0,d.jsx)("div",{className:"pc-bg",children:(0,d.jsxs)(i.Xz,{shadows:!1,dpr:[1,1.5],camera:{position:[0,0,15],fov:25},gl:{antialias:!0},children:[(0,d.jsx)(o.A,{}),(0,d.jsx)(r.Suspense,{fallback:(0,d.jsx)(u.Z,{}),children:(0,d.jsx)(l.N,{snap:!0,config:{tension:120,friction:20},azimuth:[-20*Math.PI/180,20*Math.PI/180],polar:[-5*Math.PI/180,15*Math.PI/180],children:(0,d.jsx)(m,{})})}),(0,d.jsx)(f.q,{all:!0})]})});const h=function(){const e=(0,r.useRef)(null),[s,t]=(0,r.useState)(0);return(0,r.useEffect)((()=>{function s(){if(e.current){const s=e.current.clientHeight;t(.95*s)}}return window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s)}}),[]),(0,d.jsx)("div",{className:"flat-bg",children:(0,d.jsx)(i.Xz,{children:(0,d.jsx)(c.V,{wrapperClass:"webgl-iframe-wrapper",children:(0,d.jsxs)("div",{className:"iframe-flat-container",children:[(0,d.jsx)("img",{ref:e,src:"/ProfileWeb/mockup_iphone.png",alt:"Device mockup",className:"mockup-image",onLoad:function(){if(e.current){const s=e.current.clientHeight;t(.95*s)}}}),(0,d.jsx)("iframe",{title:"iframe-flat",className:"webgl-iframe-flat",src:"https://mikalasa.github.io/ProfileWeb-Iframe-About/",style:{height:"".concat(s,"px")}})]})})})})};const b=function(){(0,r.useEffect)((()=>{setTimeout((()=>window.scrollTo(0,0)),100)}),[]);const[e,s]=(0,r.useState)(!1),t=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const e=new IntersectionObserver((n=>{n[0].isIntersecting&&(s(!0),e.unobserve(t.current))}),{threshold:.1});return t.current&&e.observe(t.current),()=>e.disconnect()}),[]),(0,d.jsx)("section",{id:"about",ref:t,className:"about-container layout-container",children:!n.tq&&e?(0,d.jsx)(p,{}):e&&(0,d.jsx)(h,{})})}},221:(e,s,t)=>{t.d(s,{Z:()=>a});var n=t(833),r=t(956),i=t(184);const a=()=>{const{progress:e}=(0,n.S)();return(0,i.jsxs)(r.V,{as:"div",center:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[(0,i.jsx)("span",{className:"canvas-loader"}),(0,i.jsxs)("p",{style:{fontSize:14,color:"#F1F1F1",fontWeight:800,marginTop:40},children:[e.toFixed(2),"%"]})]})}}}]);
//# sourceMappingURL=472.72f4caf0.chunk.js.map