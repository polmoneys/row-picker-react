var At=Object.defineProperty,Mt=Object.defineProperties;var Ht=Object.getOwnPropertyDescriptors;var Te=Object.getOwnPropertySymbols;var Gt=Object.prototype.hasOwnProperty,Vt=Object.prototype.propertyIsEnumerable;var de=(a,f,k)=>f in a?At(a,f,{enumerable:!0,configurable:!0,writable:!0,value:k}):a[f]=k,y=(a,f)=>{for(var k in f||(f={}))Gt.call(f,k)&&de(a,k,f[k]);if(Te)for(var k of Te(f))Vt.call(f,k)&&de(a,k,f[k]);return a},B=(a,f)=>Mt(a,Ht(f));var M=(a,f,k)=>(de(a,typeof f!="symbol"?f+"":f,k),k);(function(a,f){typeof exports=="object"&&typeof module!="undefined"?module.exports=f(require("react"),require("@react-aria/focus"),require("@react-aria/interactions"),require("@headlessui/react"),require("@reach/checkbox")):typeof define=="function"&&define.amd?define(["react","@react-aria/focus","@react-aria/interactions","@headlessui/react","@reach/checkbox"],f):(a=typeof globalThis!="undefined"?globalThis:a||self,a.RowPicker=f(a.React,a.focus,a.interactions,a.react,a.checkbox))})(this,function(a,f,k,re,We){"use strict";function De(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var W=De(a);const K=e=>e!=null;function ne(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function E(e,t){return e===t}function Ae(e,t,r){const l=()=>e[r.property]>t[r.property]?1:e[r.property]<t[r.property]?-1:0;return r.isDescending?l()*-1:l()}function Me(e,t){return E(t.length,0)?!0:t.every(r=>r.isTruthyPicked?e[r.property]:!e[r.property])}function w(...e){return e.filter(Boolean).join(" ")}function H(e){return typeof e=="string"?e.trim()!=="":Array.isArray(e)?e.length>0:!1}const pe=e=>typeof e!="string"?"":e.charAt(0).toUpperCase()+e.slice(1);class He{constructor(t,r){M(this,"timerId",null);M(this,"start");M(this,"remaining");M(this,"cb");M(this,"resume",()=>{this.start=Date.now(),this.timerId!==null&&clearTimeout(this.timerId),this.timerId=setTimeout(this.cb,this.remaining)});M(this,"clear",()=>{this.timerId!==null&&clearTimeout(this.timerId)});M(this,"pause",()=>{this.timerId!==null&&clearTimeout(this.timerId),this.start!==void 0&&(this.remaining-=Date.now()-this.start)});this.remaining=r,this.cb=t,this.resume()}}function oe(e=[],t=null,r,l=!1,s=!1){const[i,c]=a.useState(()=>K(t)?[t]:[]),u=a.useCallback(b=>{i.includes(b)?l?c(N=>N.filter(C=>b!==C)):console.warn("allowUnselected is false. Cannot unselect item"):c(s?N=>[...N,b]:[b])},[e,s,i]),p=a.useCallback(b=>i.includes(b),[i]),m=()=>c([]),d=()=>c(e),I=b=>c(e.filter(N=>N!==b)),S=a.useMemo(()=>i,[i]);return a.useEffect(()=>{r==null||r(S)},[S]),[S,{matchSelection:p,updateSelection:u,resetSelection:m,selectAll:d,selectAllBut:I}]}const fe=e=>{e.preventDefault()},Ge=(e,t={disableTouchEvents:!1})=>{const r=a.useRef(!1),l=a.useRef(null),s=()=>{r.current&&(r.current=!1,document.body.style.overflow=l.current||"",t.disableTouchEvents&&document.body.removeEventListener("touchmove",fe))},i=()=>{r.current=!0,l.current=document.body.style.overflow,document.body.style.overflow="hidden",t.disableTouchEvents&&document.body.addEventListener("touchmove",fe,{passive:!1})};a.useEffect(()=>(e?i():s(),s),[e])};var he={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},me=W.default.createContext&&W.default.createContext(he),D=globalThis&&globalThis.__assign||function(){return D=Object.assign||function(e){for(var t,r=1,l=arguments.length;r<l;r++){t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},D.apply(this,arguments)},Ve=globalThis&&globalThis.__rest||function(e,t){var r={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(r[l]=e[l]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,l=Object.getOwnPropertySymbols(e);s<l.length;s++)t.indexOf(l[s])<0&&Object.prototype.propertyIsEnumerable.call(e,l[s])&&(r[l[s]]=e[l[s]]);return r};function ve(e){return e&&e.map(function(t,r){return W.default.createElement(t.tag,D({key:r},t.attr),ve(t.child))})}function x(e){return function(t){return W.default.createElement(Ue,D({attr:D({},e.attr)},t),ve(e.child))}}function Ue(e){var t=function(r){var l=e.attr,s=e.size,i=e.title,c=Ve(e,["attr","size","title"]),u=s||r.size||"1em",p;return r.className&&(p=r.className),e.className&&(p=(p?p+" ":"")+e.className),W.default.createElement("svg",D({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,l,c,{className:p,style:D(D({color:e.color||r.color},r.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),i&&W.default.createElement("title",null,i),e.children)};return me!==void 0?W.default.createElement(me.Consumer,null,function(r){return t(r)}):t(he)}function qe(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"}},{tag:"polyline",attr:{points:"19 12 12 19 5 12"}}]})(e)}function Ke(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"19",x2:"12",y2:"5"}},{tag:"polyline",attr:{points:"5 12 12 5 19 12"}}]})(e)}function Je(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"20 6 9 17 4 12"}}]})(e)}function Xe(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 12 15 18 9"}}]})(e)}function Ye(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"18 15 12 9 6 15"}}]})(e)}function Qe(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"}}]})(e)}function Re(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"}}]})(e)}function Ze(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}}]})(e)}function et(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"}}]})(e)}function tt(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"4",y1:"9",x2:"20",y2:"9"}},{tag:"line",attr:{x1:"4",y1:"15",x2:"20",y2:"15"}},{tag:"line",attr:{x1:"10",y1:"3",x2:"8",y2:"21"}},{tag:"line",attr:{x1:"16",y1:"3",x2:"14",y2:"21"}}]})(e)}function rt(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}},{tag:"path",attr:{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}}]})(e)}function nt(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}},{tag:"path",attr:{d:"M7 11V7a5 5 0 0 1 10 0v4"}}]})(e)}function ot(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"}},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"}},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"}}]})(e)}function it(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"}}]})(e)}function lt(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"}}]})(e)}function at(e){return x({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"}},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"}}]})(e)}var R={exports:{}},X={};/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var ge=Object.getOwnPropertySymbols,st=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable;function ut(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function dt(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var l=Object.getOwnPropertyNames(t).map(function(i){return t[i]});if(l.join("")!=="0123456789")return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(i){s[i]=i}),Object.keys(Object.assign({},s)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}dt();/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pt=W.default,be=60103;if(X.Fragment=60107,typeof Symbol=="function"&&Symbol.for){var ye=Symbol.for;be=ye("react.element"),X.Fragment=ye("react.fragment")}var ft=pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ht=Object.prototype.hasOwnProperty,mt={key:!0,ref:!0,__self:!0,__source:!0};function ke(e,t,r){var l,s={},i=null,c=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(c=t.ref);for(l in t)ht.call(t,l)&&!mt.hasOwnProperty(l)&&(s[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps,t)s[l]===void 0&&(s[l]=t[l]);return{$$typeof:be,type:e,key:i,ref:c,props:s,_owner:ft.current}}X.jsx=ke,X.jsxs=ke,R.exports=X;const o=R.exports.jsx,h=R.exports.jsxs,vt=R.exports.Fragment,G=e=>{const{fill:t="var(--accent)",variant:r,title:l}=e;return o(a.Fragment,{children:{circle:o(Qe,{size:16,color:t,title:"Column options"}),lock:o(nt,{size:20,color:"var(--accent)",title:"Locked row"}),menu:o(ot,{size:48,color:"var(--accent)",title:"Navigation options"}),folder:o(et,{size:18,color:"var(--accent)",title:l}),hash:o(tt,{size:16,color:t,title:l}),link:o(rt,{size:16,color:t,title:l,className:"fx-brightness"}),up:o(Ke,{size:18,color:t,title:l}),down:o(qe,{size:18,color:t,title:l}),chevron:o(Xe,{size:20,color:t,title:"Disclose"}),chevronUp:o(Ye,{size:20,color:t,title:"Undisclose"}),close:o(at,{size:32,color:t,title:"Reset options",className:"fx-brightness"}),checkbox:o(Je,{size:28,color:t,title:"Checked",className:"fx-brightness"}),checkboxMixed:o(it,{size:28,color:t,title:"Indeterminate",className:"fx-brightness"}),columns:o(Re,{size:22,color:t,title:"Visible columns"}),filters:o(Ze,{size:22,color:t,title:"Filter rows"})}[r]})};function xe(e){const{onTap:t,description:r,label:l,colId:s}=e,i=f.useFocusManager(),c=u=>{switch(["Escape","c"].includes(u.key),u.key){case"ArrowDown":i.focusNext({wrap:!0});break;case"ArrowUp":i.focusPrevious({wrap:!0});break}};return h("button",B(y({role:"menuitem"},s&&{id:s}),{className:w("rp-button","action"),onClick:t!==void 0?t:()=>({}),onKeyDown:c,children:[h("span",{"aria-hidden":"true",children:[" ",l," "]}),h("span",{className:"rp-offscreen",children:[" ",r]})]}))}function gt(e){const{items:t,id:r,label:l,activeFocus:s}=e,[i,c]=a.useState(s),{focusWithinProps:u}=k.useFocusWithin({onBlurWithin:()=>c(!1),onFocusWithinChange:m=>c(m)});Ge(i);const p=w("rp-select",i&&"rp-focused");return h("div",B(y({className:p},u),{children:[o("span",{className:"rp-offscreen",id:`${r}-extra-label`,children:"Column Actions"}),h("button",{id:r,className:"rp-button","aria-labelledby":`${r} ${r}-extra-label`,"aria-haspopup":"true","aria-controls":`${r}-controls`,"aria-expanded":i?"true":"false",children:[l,o("div",{className:"rp-pushLeft",children:o(G,{variant:"circle",fill:"currentColor"})})]}),o("div",{className:"rp-menu",children:o("div",{role:"menu",id:`${r}-controls`,"aria-labelledby":r,"aria-orientation":"vertical",className:"rp-menuItems",children:i?o(f.FocusScope,{autoFocus:!0,children:t==null?void 0:t.map((m,d)=>o(xe,B(y({},m),{colId:`${r}-${m.colId}`}),`select-item-${d}`))}):t==null?void 0:t.map((m,d)=>o(xe,y({},m),`select-item-${d}`))})})]}))}function ie(e){var t;return o(re.Popover,{className:w("rp-popover",(t=e==null?void 0:e.classes)==null?void 0:t.popoverRoot),children:({open:r})=>{var l,s,i,c;return h(vt,{children:[h(re.Popover.Button,{disabled:(l=e==null?void 0:e.disabled)!=null?l:!1,className:w((s=e==null?void 0:e.classes)==null?void 0:s.popoverButton),children:[e.label,e.icon&&o("span",{className:"rp-iconStable",children:o(G,{fill:"currentColor",variant:r&&e.icon==="chevron"?`${e.icon}Up`:e.icon})})]}),o(re.Popover.Panel,{className:w("rp-panel",(c=(i=e==null?void 0:e.classes)==null?void 0:i.popoverContent)!=null?c:"rp-panel"),children:({close:u})=>h(a.Fragment,{children:[e.trap!==void 0?h(f.FocusScope,{autoFocus:!0,children:[" ",e.children]}):e.children," "]})})]})}})}const Ce=e=>{const{children:t,checked:r=!1,onChange:l,value:s,name:i,label:c,id:u,disabled:p}=e,m=d=>{l==null||l(d)};return h("div",{className:"rp-checkbox",children:[r&&r!=="mixed"&&o(G,{variant:"checkbox",fill:"var(--accent)"}),r&&r==="mixed"&&o(G,{variant:"checkboxMixed"}),h("label",{htmlFor:i,children:[o(We.CustomCheckbox,y(y({value:s,name:i,checked:r,onChange:m,"aria-label":c},u&&{id:u}),p&&{disabled:p})),t]})]})};function bt(e){const{children:t,id:r,rows:l,cols:s,label:i,description:c}=e;return o("div",{id:r,role:"grid","aria-describedby":c,"aria-labelledby":i,"aria-rowcount":l,"aria-colcount":s,"aria-multiselectable":"true",children:t})}function Z(e){var N,C,$;const{position:t,classes:r,children:l,width:s,align:i,role:c,selected:u,editable:p=!1,labelledBy:m,className:d,expandable:I=!1,disclosee:S}=e,b=I&&K(S)&&!ne(S);return o("div",B(y({className:w("rp-cell",d),role:c,"aria-colindex":t+1,"aria-selected":u,style:{width:s,justifyContent:i},"aria-readonly":p?"true":"false"},m&&{"aria-labelledby":m}),{children:b?o(ie,{label:l,icon:"chevron",classes:{popoverRoot:(N=r==null?void 0:r.popoverRootExpandable)!=null?N:"rp-root-expandable",popoverButton:(C=r==null?void 0:r.popoverButtonExpandable)!=null?C:"rp-expandable",popoverContent:($=r==null?void 0:r.popoverContentExpandable)!=null?$:"rp-popContent"},children:Object.entries(S).map(([P,O])=>{const L=typeof O=="boolean",A=Array.isArray(O),J=L?o("p",{children:pe(O.toString())}):A?o("div",{className:"rp-colGap rp-rowGapGrid",children:O.map((V,U)=>h("p",{children:[" ",V," "]},`expando-content${U}`))}):O;return h("div",{className:"rp-colGap rp-rowGapGrid",children:[h("p",{children:[o("b",{children:pe(P.toString())}),":"]})," ",J]},P)})}):l}))}const yt=a.forwardRef((e,t)=>{const{className:r,value:l,label:s,placeholder:i=null,name:c,autocapitalize:u="none",autocomplete:p="off",inputmode:m="text",enterkeyhint:d,autofocus:I=!1,required:S=!0,type:b="text",onBlur:N,onChange:C}=e,$=O=>{C&&(C==null||C(O))},P=w("rp-field",r);return h(a.Fragment,{children:[o("label",{htmlFor:"row-picker-field",className:"rp-offscreen",children:s}),o("input",B(y({id:"row-picker-field",className:P,ref:t,defaultValue:l,name:c,autoComplete:p,"aria-required":!!S,"aria-label":s,autoFocus:I,enterKeyHint:d,inputMode:m,type:b,onChange:$,onBlur:N,autoCapitalize:u},i&&{placeholder:i}),{dir:"auto"}))]})});function kt(e){const{row:t,label:r,value:l,setValue:s}=e,[i,c]=a.useState(l);return o(yt,{className:"rp-editable",label:r,name:r,value:i,onChange:d=>c(d.target.value),onKeyDown:d=>{(d.key==="Enter"||d.key==="Escape")&&d.target.blur()},onBlur:d=>{d.target.value.trim()!==""&&s(B(y({},t),{[r]:d.target.value}))}})}function we(e){const{children:t,width:r,align:l,id:s,value:i,activeSorter:c,className:u}=e;let p={};if(c!==void 0){const{property:m,isDescending:d}=c;c.property!==void 0&&m===i&&(p={"aria-sort":d?"descending":"ascending"})}return o("div",B(y({id:s,className:w("rp-cell",u),role:"columnheader",style:{width:r,justifyContent:l}},p),{children:t}))}function xt(e){return o("div",{className:"rp-body",role:"rowgroup",children:e.children})}function Ct(e){const{children:t,position:r,disabled:l,selected:s}=e,{hoverProps:i,isHovered:c}=k.useHover({onHoverStart:()=>({}),onHoverEnd:()=>({})});return h("div",B(y({className:w("rp-row",c&&"rp-zebra",l&&"rp-rowDisabled",s&&"rp-rowSelected"),role:"row","aria-rowindex":r+1},i),{children:[l?o("span",{className:"rp-lock",children:o(G,{variant:"lock"})}):o(a.Fragment,{}),t]}))}function wt(e){return o("div",{className:"rp-row",role:"row",children:e.children})}function St(e){return o("div",{className:"rp-header",role:"rowgroup",children:e.children})}function Nt(e){const{row:t,initial:r,label:l,setValue:s,className:i}=e,[c,u]=a.useState(r);return a.useEffect(()=>{s(B(y({},t),{[l]:c}))},[c]),o("div",{className:w("rp-switch",c&&i?i:"rp-switch-on"),children:h("button",{type:"button","aria-pressed":c?"true":"false",onClick:()=>u(p=>!p),children:[o("span",{className:"rp-offscreen",children:l}),o(lt,{size:16,className:w("rp-switchIcon",c&&"rp-switchIconOn")})," "]})})}var Ut="",qt="";function Ft(e){var Ee,Le,$e,Ie,Pe;const{classes:t,id:r,label:l,description:s,rows:i,columns:c,allColumns:u,expandableColumn:p,totalCols:m,loading:d,activeSorter:I,onFilter:S,onReset:b,onSort:N,onColChange:C,onCellChange:$,onRowChange:P,toolbar:O}=e,[L,{matchSelection:A,updateSelection:J,resetSelection:V,selectAll:U}]=oe(i.map(n=>n.id),null,void 0,!0,!0),ee=L.length===i.length,le=H(L)&&L.length<i.length,ae=ee?!0:le?"mixed":!1,se=()=>{H(L)?V():U()},ce=n=>{J(n)},_=a.useMemo(()=>{let n=[];return i==null||i.map(v=>{L.includes(v.id)&&n.push(v)}),n},[L,i]);a.useEffect(()=>{P(_)},[_]);const Y=a.useRef([]);a.useEffect(()=>{let n=[];ne(i[0])||(Object.entries(i[0]).map(([v,j])=>{typeof j=="boolean"&&n.push(v)}),Y.current=n)},[]);const[te,{matchSelection:Bt,updateSelection:F}]=oe(Y.current,null,()=>S(z),!0,!1),z=a.useMemo(()=>{var v;let n=[];return(v=Y.current)==null||v.map((j,q)=>{te.includes(q.toString())&&n.push(j)}),n.map(j=>({property:j,isTruthyPicked:!0}))},[te]),[Fe,{updateSelection:je,matchSelection:Ot,selectAllBut:Et}]=oe(c==null?void 0:c.slice(1,c.length).map(n=>n.id),null,n=>C(n),!0,!0),{property:Be,isDescending:Lt}=I,$t=c.length<m||H(z),[ue,It]=a.useState(null),Oe=n=>{It(n)};a.useEffect(()=>{K(ue)&&($==null||$(ue))},[ue]);const Pt=a.useMemo(()=>c.map(n=>Number(n.width.replace("px",""))).reduce((n,v)=>n+v,60),[c]);return h("div",{className:w(t==null?void 0:t.root,"rp-outer"),children:[a.isValidElement(O)?O:h("div",{className:"rp-toolbar",children:[o(ie,{icon:"chevron",disabled:!H(_),label:`${_.length<10?"0":""}${_.length} Row${_.length>1?"s":" "} `,classes:{popoverContent:(Ee=t==null?void 0:t.popoverRoot)!=null?Ee:"rp-popContent",popoverButton:(Le=t==null?void 0:t.popoverButton)!=null?Le:"rp-popButton rp-cell-number"},children:o("div",{className:"rp-rowGap rp-rowGapGrid rp-space-b",children:_.map(n=>{var v,j,q;return o("button",{type:"button",className:w(t==null?void 0:t.popoverAction),onClick:()=>_.length>1?J(n.id):{},children:(q=(j=(v=n==null?void 0:n.name)!=null?v:n==null?void 0:n.title)!=null?j:n==null?void 0:n.instagram)!=null?q:n.id},n.id)})})}),h(ie,{label:"",icon:"columns",classes:{popoverContent:($e=t==null?void 0:t.popoverRoot)!=null?$e:"rp-popContent",popoverButton:(Ie=t==null?void 0:t.popoverButton)!=null?Ie:"rp-popButton rp-popButtonIcon"},children:[o("div",{className:"rp-rowGap rp-rowGapGrid rp-space-b",children:u==null?void 0:u.map((n,v)=>E(v,0)?o(a.Fragment,{},v):o("button",{type:"button",className:w(Ot(n.id)&&(t==null?void 0:t.popoverActionSelected),t==null?void 0:t.popoverAction),onClick:()=>je(n.id),children:n.label},n.value))}),o("p",{children:"Select columns to display."})]}),$t?o("button",{type:"button",className:"rp-buttonIcon",onClick:()=>{V(),b()},children:o(G,{variant:"close",fill:"var(--accent)"})}):o(a.Fragment,{})]}),o("div",{"aria-busy":d?"true":"false",className:w("rp-root",t==null?void 0:t.root,(Pe=d&&(t==null?void 0:t.loading))!=null?Pe:"rp-row-picker-loading"),style:{minWidth:`${Pt}px`},children:h(bt,{id:r,description:s,label:l,rows:i.length,cols:c.length,children:[!d&&o(St,{children:o(wt,{children:c==null?void 0:c.map(n=>{if(E(n.value,"pick"))return o(we,{id:n.value,width:"60px",align:"center",className:"rp-sticky",children:o(Ce,{id:`${r}-select-all-rows`,label:"select-all-rows",name:"select-all-rows",value:"select-all-rows",checked:ae,onChange:se})},n.value);const v=n.variant&&n.variant!=="default",j=[{id:0,label:"Asc",description:`Set column ${n.value} in ascending sort order.`,onTap:()=>N({isDescending:!1,property:n.value})},{id:1,label:"Desc",description:`Set column ${n.value} in descending sort order.`,onTap:()=>N({isDescending:!0,property:n.value})},{id:3,colId:`${r}-${n.value}`,label:"Focus",description:"Hide other columns",onTap:()=>{je(n.id)}},{id:4,colId:`${r}-${n.value}`,label:"Hide",description:"Hide this column",onTap:()=>{Et(n.id)}}];return o(we,B(y({},n),{activeSorter:I,children:o(gt,{activeFocus:!1,id:`${n.value}-${r}`,label:h(a.Fragment,{children:[n.label," ",E(Be,n.value)&&o("span",{className:"rp-iconStable",children:o(G,{variant:E(Be,n.value)&&Lt?"down":"up",fill:"currentColor"})})]}),items:v?j.slice(2,4):j})}),n.value)})})}),h(xt,{children:[!d&&H(i)&&(i==null?void 0:i.map((n,v)=>{var j,q;return h(Ct,{selected:A(n.id),position:v,disabled:(j=n==null?void 0:n.locked)!=null?j:!1,children:[o(Z,{position:v,selected:A(n.id),role:"gridcell",width:"60px",align:"center",editable:!0,labelledBy:`${r}-checkbox-${n.id}`,className:"rp-sticky",children:o(Ce,{label:`select row ${n.id}`,name:`select row ${n.id}`,value:n.id.toString(),checked:A(n.id)&&!(n==null?void 0:n.locked),onChange:()=>ce(n.id),disabled:(q=n==null?void 0:n.locked)!=null?q:!1})}),c.filter(g=>g.value!=="pick").map((g,T)=>{var _e,ze;const Q=n[g.value],_t=typeof n[g.value]=="boolean",zt=K(g.formatter)?g.formatter(Q):o("span",{dir:"auto",className:/[^0-9]/.test(Q.toString())?"":"rp-cell-number",children:Q.toString()}),Tt=(ze=E((_e=g==null?void 0:g.variant)!=null?_e:"default","isEditable"))!=null?ze:!1,Wt=!ne(n==null?void 0:n.children);if(Tt)return o(Z,B(y({},g),{role:E(T,0)?"rowheader":"gridcell",position:T,selected:!1,editable:!0,children:o(kt,{row:n,label:g.value,value:Q,setValue:Oe})}),g.value);if(_t&&!K(g.formatter)){const Dt=E(Q.toString(),"true");return o(Z,B(y({},g),{role:E(T,0)?"rowheader":"gridcell",position:T,selected:!1,editable:!1,children:o(Nt,{row:n,setValue:Oe,initial:Dt,label:g.value,className:t==null?void 0:t.switchOn})}),g.value)}return o(Z,B(y({},g),{role:E(T,0)?"rowheader":"gridcell",id:E(T,0)?`${r}-${g.value}-${n.id}-${T}`:void 0,position:T,selected:!1,editable:!1,classes:t,expandable:E(T,p),disclosee:Wt?n==null?void 0:n.children:null,children:o(a.Fragment,{children:zt})}),g.value)})]},n.id)})),!d&&!H(i)&&o("div",{className:"rp-row",children:o("b",{children:"No results."})})]})]})})]})}const Se={property:"id",isDescending:!1},Ne=[];function jt(e){const{id:t,label:r,description:l,classes:s,columns:i=[],expandableColumn:c=99,rows:u=[],filters:p=Ne,sorters:m=Se,toolbar:d,loading:I=!1}=e,[S,b]=a.useState(u),N=a.useMemo(()=>S,[S]),[C,$]=a.useState(m),[P,O]=a.useState(p),[L,A]=a.useState([]),[J,V]=a.useState([]),[U,ee]=a.useState(null);a.useEffect(()=>{const F=u.filter(z=>Me(z,P)).sort((z,Fe)=>Ae(z,Fe,C));b(F)},[C,P,u]);const le=a.useMemo(()=>{let F=[i[0]];return H(L)?(i.filter(z=>{L.includes(z.id)&&F.push(z)}),F):i},[i,L]);a.useEffect(()=>{K(U)&&new He(()=>ee(null),200)},[U]);const ae=F=>O(F),se=F=>$(F),ce=F=>A(F),_=F=>V(F),Y=F=>ee(F),te=()=>{O(Ne),$(Se),V([]),b(u),A([])};return{component:o(Ft,{columns:le,allColumns:i,expandableColumn:c,rows:N,totalRows:u.length,totalCols:i.length,activeSorter:C,onFilter:ae,onReset:te,onSort:se,onColChange:ce,onRowChange:_,onCellChange:Y,classes:s,loading:I,id:t,label:r,description:l,toolbar:d}),results:S,resultsFilters:P,resultsSorters:C,resultsSelectedRows:J,resultsNewCell:U}}return jt});