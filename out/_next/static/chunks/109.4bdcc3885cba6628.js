(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[109],{1407:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var o=n(7437),r=n(5051),i=n(9512),a=n(2265),s=n(3865);function c(e){let{IsInView:t,series:n,unit:c,days:l,lessX:u}=e,{theme:f}=(0,i.F)(),h=(0,r.Z)(),[d,m]=(0,a.useState)({chart:{toolbar:{show:!0,tools:{download:!1,reset:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw" style="fill: none;"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',zoom:!1,pan:!1}}},stroke:{curve:"smooth"},fill:{colors:["#17A34A"],opacity:1},dataLabels:{enabled:!1},xaxis:{type:"category",labels:{show:!0,style:{fontFamily:"system-ui",fontWeight:700,cssClass:"font-normal"}},axisBorder:{show:!1},axisTicks:{show:!1},categories:l||["20/01","21/01","22/01","23/01","24/01","25/01","26/01","27/01"],tickAmount:u?4:8,tickPlacement:"between"},yaxis:{labels:{show:!0,style:{fontFamily:"system-ui",fontWeight:700,cssClass:"font-normal"}},axisBorder:{show:!1},axisTicks:{show:!1}},grid:{position:"back",borderColor:"#71717F",xaxis:{lines:{show:!1}},yaxis:{lines:{show:!1}}},tooltip:{theme:f,y:{title:{formatter:e=>e+": "},formatter:(e,t)=>e+" "+c}}}),[p,y]=(0,a.useState)("100%");return(0,a.useEffect)(()=>{m(e=>({...e,chart:{...e.chart,foreColor:"dark"===f?"#fffff0":"#333"},tooltip:{...e.tooltip,theme:f}}))},[f]),(0,a.useEffect)(()=>{h.width&&h.width<468&&l&&(null==l?void 0:l.length)>5&&m(e=>({...e,xaxis:{...e.xaxis,tickAmount:4}}))},[h,l]),t&&(0,o.jsx)(s.Z,{options:d,series:n,type:"area",width:"100%",height:h.width&&h.width<768?"150%":void 0})}},5051:function(e,t,n){"use strict";var o=n(2265);t.Z=()=>{let[e,t]=(0,o.useState)({width:void 0,height:void 0});return(0,o.useEffect)(()=>{function e(){t({width:window.innerWidth,height:window.innerHeight})}return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),e}},9949:function(e,t,n){"use strict";var o=n(8877);function r(){}function i(){}i.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,i,a){if(a!==o){var s=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return n.PropTypes=n,n}},1448:function(e,t,n){e.exports=n(9949)()},8877:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3865:function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=u(n(1594)),s=n(2265),c=u(s),l=u(n(1448));function u(e){return e&&e.__esModule?e:{default:e}}window.ApexCharts=a.default;var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,e);var n=function(e,t){if(e)return t&&("object"==typeof t||"function"==typeof t)?t:e;throw ReferenceError("this hasn't been initialised - super() hasn't been called")}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return c.default.createRef?n.chartRef=c.default.createRef():n.setRef=function(e){return n.chartRef=e},n.chart=null,n}return function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(e,s.Component),i(e,[{key:"render",value:function(){var e=function(e,t){var n,o={};for(n in e)0<=t.indexOf(n)||Object.prototype.hasOwnProperty.call(e,n)&&(o[n]=e[n]);return o}(this.props,[]);return c.default.createElement("div",r({ref:c.default.createRef?this.chartRef:this.setRef},e))}},{key:"componentDidMount",value:function(){var e=c.default.createRef?this.chartRef.current:this.chartRef;this.chart=new a.default(e,this.getConfig()),this.chart.render()}},{key:"getConfig",value:function(){var e=this.props,t=e.type,n=e.height,o=e.width,r=e.series,e=e.options;return this.extend(e,{chart:{type:t,height:n,width:o},series:r})}},{key:"isObject",value:function(e){return e&&"object"===(void 0===e?"undefined":o(e))&&!Array.isArray(e)&&null!=e}},{key:"extend",value:function(e,t){var n=this,o=("function"!=typeof Object.assign&&(Object.assign=function(e){if(null==e)throw TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])}return t}),Object.assign({},e));return this.isObject(e)&&this.isObject(t)&&Object.keys(t).forEach(function(r){var i,a;n.isObject(t[r])&&r in e?o[r]=n.extend(e[r],t[r]):Object.assign(o,(i={},a=t[r],r in i?Object.defineProperty(i,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):i[r]=a,i))}),o}},{key:"componentDidUpdate",value:function(e){if(!this.chart)return null;var t=this.props,n=t.options,o=t.series,r=t.height,t=t.width,i=JSON.stringify(e.options),a=JSON.stringify(e.series),n=JSON.stringify(n),s=JSON.stringify(o);i===n&&a===s&&r===e.height&&t===e.width||(a!==s&&i===n&&r===e.height&&t===e.width?this.chart.updateSeries(o):this.chart.updateOptions(this.getConfig()))}},{key:"componentWillUnmount",value:function(){this.chart&&"function"==typeof this.chart.destroy&&this.chart.destroy()}}]),e}();(t.Z=f).propTypes={type:l.default.string.isRequired,width:l.default.oneOfType([l.default.string,l.default.number]),height:l.default.oneOfType([l.default.string,l.default.number]),series:l.default.array.isRequired,options:l.default.object.isRequired},f.defaultProps={type:"line",width:"100%",height:"auto"}},9512:function(e,t,n){"use strict";n.d(t,{F:function(){return l},f:function(){return u}});var o=n(2265),r=["light","dark"],i="(prefers-color-scheme: dark)",a="undefined"==typeof window,s=o.createContext(void 0),c={setTheme:e=>{},themes:[]},l=()=>{var e;return null!=(e=o.useContext(s))?e:c},u=e=>o.useContext(s)?e.children:o.createElement(h,{...e}),f=["light","dark"],h=e=>{let{forcedTheme:t,disableTransitionOnChange:n=!1,enableSystem:a=!0,enableColorScheme:c=!0,storageKey:l="theme",themes:u=f,defaultTheme:h=a?"system":"light",attribute:b="data-theme",value:g,children:v,nonce:w}=e,[O,k]=o.useState(()=>m(l,h)),[S,x]=o.useState(()=>m(l)),T=g?Object.values(g):u,C=o.useCallback(e=>{let t=e;if(!t)return;"system"===e&&a&&(t=y());let o=g?g[t]:t,i=n?p():null,s=document.documentElement;if("class"===b?(s.classList.remove(...T),o&&s.classList.add(o)):o?s.setAttribute(b,o):s.removeAttribute(b),c){let e=r.includes(h)?h:null,n=r.includes(t)?t:e;s.style.colorScheme=n}null==i||i()},[]),E=o.useCallback(e=>{let t="function"==typeof e?e(e):e;k(t);try{localStorage.setItem(l,t)}catch(e){}},[t]),j=o.useCallback(e=>{x(y(e)),"system"===O&&a&&!t&&C("system")},[O,t]);o.useEffect(()=>{let e=window.matchMedia(i);return e.addListener(j),j(e),()=>e.removeListener(j)},[j]),o.useEffect(()=>{let e=e=>{e.key===l&&E(e.newValue||h)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[E]),o.useEffect(()=>{C(null!=t?t:O)},[t,O]);let _=o.useMemo(()=>({theme:O,setTheme:E,forcedTheme:t,resolvedTheme:"system"===O?S:O,themes:a?[...u,"system"]:u,systemTheme:a?S:void 0}),[O,E,t,S,a,u]);return o.createElement(s.Provider,{value:_},o.createElement(d,{forcedTheme:t,disableTransitionOnChange:n,enableSystem:a,enableColorScheme:c,storageKey:l,themes:u,defaultTheme:h,attribute:b,value:g,children:v,attrs:T,nonce:w}),v)},d=o.memo(e=>{let{forcedTheme:t,storageKey:n,attribute:a,enableSystem:s,enableColorScheme:c,defaultTheme:l,value:u,attrs:f,nonce:h}=e,d="system"===l,m="class"===a?"var d=document.documentElement,c=d.classList;".concat("c.remove(".concat(f.map(e=>"'".concat(e,"'")).join(","),")"),";"):"var d=document.documentElement,n='".concat(a,"',s='setAttribute';"),p=c?(r.includes(l)?l:null)?"if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'".concat(l,"'"):"if(e==='light'||e==='dark')d.style.colorScheme=e":"",y=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!(arguments.length>2)||void 0===arguments[2]||arguments[2],o=u?u[e]:e,i=t?e+"|| ''":"'".concat(o,"'"),s="";return c&&n&&!t&&r.includes(e)&&(s+="d.style.colorScheme = '".concat(e,"';")),"class"===a?t||o?s+="c.add(".concat(i,")"):s+="null":o&&(s+="d[s](n,".concat(i,")")),s},b=t?"!function(){".concat(m).concat(y(t),"}()"):s?"!function(){try{".concat(m,"var e=localStorage.getItem('").concat(n,"');if('system'===e||(!e&&").concat(d,")){var t='").concat(i,"',m=window.matchMedia(t);if(m.media!==t||m.matches){").concat(y("dark"),"}else{").concat(y("light"),"}}else if(e){").concat(u?"var x=".concat(JSON.stringify(u),";"):"").concat(y(u?"x[e]":"e",!0),"}").concat(d?"":"else{"+y(l,!1,!1)+"}").concat(p,"}catch(e){}}()"):"!function(){try{".concat(m,"var e=localStorage.getItem('").concat(n,"');if(e){").concat(u?"var x=".concat(JSON.stringify(u),";"):"").concat(y(u?"x[e]":"e",!0),"}else{").concat(y(l,!1,!1),";}").concat(p,"}catch(t){}}();");return o.createElement("script",{nonce:h,dangerouslySetInnerHTML:{__html:b}})}),m=(e,t)=>{let n;if(!a){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},p=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},y=e=>(e||(e=window.matchMedia(i)),e.matches?"dark":"light")}}]);