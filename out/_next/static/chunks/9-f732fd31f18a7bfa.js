"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9],{5226:function(e,r,n){n.d(r,{Z:function(){return a}});var t=n(7437);n(2265);var i=n(6013);function a(e){let{title:r,icon:n,value:a,unit:s,subtitle:l}=e;return(0,t.jsxs)(i.Zb,{className:"flex flex-col justify-between bg-accent border-zinc-700/50",children:[(0,t.jsx)(i.Ol,{children:(0,t.jsx)(i.ll,{children:(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-2xl font-semibold tracking-tight scroll-m-20",children:r}),n||" "]})})}),(0,t.jsx)(i.aY,{className:"pb-3",children:(0,t.jsxs)("h4",{className:"text-3xl font-semibold tracking-tight scroll-m-20",children:[a,(0,t.jsx)("sup",{className:"font-normal ms-2",children:s})]})}),(0,t.jsx)(i.eW,{children:(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:l})})]})}},5444:function(e,r,n){n.d(r,{F:function(){return a},W:function(){return s}});var t=n(7437),i=n(7440);function a(e){let{children:r,className:n}=e;return(0,t.jsx)("div",{className:(0,i.cn)(n,"px-5 m-auto grid max-w-screen-md gap-4 lg:max-w-screen-lg md:grid-cols-2 md:px-0"),children:r})}function s(e){let{children:r,className:n}=e;return(0,t.jsx)("div",{className:(0,i.cn)(n,"max-w-screen-md p-4 bg-accent m-auto mt-10 border rounded-lg border-zinc-700/50 lg:max-w-screen-lg"),children:r})}n(2265)},9702:function(e,r,n){n.d(r,{Z:function(){return o}});var t=n(7437),i=n(5444),a=n(5273),s=n(2265),l=n(3691);let u=(0,n(7818).default)(()=>Promise.all([n.e(562),n.e(429)]).then(n.bind(n,2429)),{loadableGenerated:{webpack:()=>[2429]},ssr:!1});function o(e){let{graphs:r,days:n,title:o,inViewLoad:d=!0,lessX:c}=e,m=(0,s.useRef)(null),f=(0,l.JC)(m);return(0,t.jsx)(i.W,{className:"order-1 w-full col-span-3 lg:h-full lg:mt-0",children:(0,t.jsxs)(a.mQ,{defaultValue:"temperature",children:[(0,t.jsx)("div",{className:"flex items-center justify-between mb-4",children:(0,t.jsxs)("h4",{className:"text-2xl font-semibold",ref:m,children:["Grafici della ",o]})}),(0,t.jsxs)(a.dr,{className:"grid md:grid-cols-4 grid-cols-2 mb-8 h-20 md:h-10 w-[100%] *:text-xs md:text-sm dark:bg-background/20 bg-foreground/5",children:[(0,t.jsx)(a.SP,{value:"temperature",children:"Temperatura"}),(0,t.jsx)(a.SP,{value:"humidity",children:"Umidit\xe0"}),(0,t.jsx)(a.SP,{value:"pressure",children:"Pressione"}),(0,t.jsx)(a.SP,{value:"rain",children:"Precipitazioni"})]}),(0,t.jsxs)(a.nU,{value:"temperature",children:[" ",(0,t.jsx)(u,{IsInView:!d||f,name:"temperatura",data:r.temp,lessX:c,days:n,unit:"\xb0C"})]}),(0,t.jsxs)(a.nU,{value:"humidity",children:[" ",(0,t.jsx)(u,{IsInView:!d||f,name:"umidit\xe0",data:r.humidity,days:n,unit:"%",lessX:c})]}),(0,t.jsxs)(a.nU,{value:"pressure",children:[" ",(0,t.jsx)(u,{IsInView:!d||f,name:"pressione",data:r.pressure,days:n,unit:"hPa",lessX:c})]}),(0,t.jsxs)(a.nU,{value:"rain",children:[" ",(0,t.jsx)(u,{IsInView:!d||f,name:"precipitazioni",data:r.rain,days:n,unit:"mm",lessX:c})]})]})})}},8802:function(e,r,n){n.d(r,{Z:function(){return o}});var t=n(7437),i=n(2265),a=n(7440);function s(e){let{className:r,...n}=e;return(0,t.jsx)("div",{className:(0,a.cn)("animate-pulse rounded-md bg-muted",r),...n})}var l=n(5444);let u=(0,i.forwardRef)((e,r)=>{let{}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"px-5 m-auto mb-8 grid max-w-screen-md gap-4 lg:max-w-screen-lg md:px-0",ref:r,children:(0,t.jsx)(s,{className:"w-full m-auto h-[50px]"})}),(0,t.jsxs)(l.F,{children:[(0,t.jsx)(s,{className:"w-full h-[230px]"}),(0,t.jsx)(s,{className:"w-full h-[230px]"}),(0,t.jsx)(s,{className:"w-full h-[230px]"}),(0,t.jsx)(s,{className:"w-full h-[230px]"})]})]})});var o=u;u.displayName="HeroSkeleton"},5176:function(e,r,n){n.d(r,{yO:function(){return p},dP:function(){return h}});var t=n(7437);function i(e,r,n){return r.displayName=e,Object.values(n).forEach(r=>r.displayName="".concat(e,".").concat(r.displayName)),Object.assign(r,n)}var a=n(8872),s=n(8296),l=n(2461),u=n(7019),o=n(2699),d=n(4859),c=n(1577),m=n(1489),f=n(3724);let x=e=>(0,t.jsx)(x,{...e}),p=i("Weather",()=>(0,t.jsx)(t.Fragment,{}),{Cloudy:x,Clear:e=>(0,t.jsx)(a.Z,{...e}),Sunny:e=>(0,t.jsx)(s.Z,{...e}),Rainy:e=>(0,t.jsx)(l.Z,{...e}),PartialyCloudy:e=>(0,t.jsx)(u.Z,{...e}),NightClear:e=>(0,t.jsx)(o.Z,{...e})}),h=i("WeatherDetails",()=>(0,t.jsx)(t.Fragment,{}),{Temp:e=>(0,t.jsx)(d.Z,{...e}),Humidity:e=>(0,t.jsx)(c.Z,{...e}),Pressure:e=>(0,t.jsx)(m.Z,{...e}),Rain:e=>(0,t.jsx)(l.Z,{...e}),Wind:e=>(0,t.jsx)(f.Z,{...e})})},2585:function(e,r,n){n.d(r,{Z:function(){return o}});var t=n(7437),i=n(2265),a=n(6013),s=n(5273),l=n(495),u=n(3691);function o(e){let{tabs:r,title:n,icon:o,unit:d,sub:c}=e,[m,f]=(0,i.useState)(r[0].key),x={variants:{initial:{y:20,opacity:0},animate:{y:0,opacity:1}},initial:"initial",animate:"animate",transition:{type:"tween",duration:.5}};return(0,t.jsx)(s.mQ,{value:m,onValueChange:f,children:(0,t.jsxs)(a.Zb,{className:"bg-accent border-zinc-700/50",children:[(0,t.jsx)(a.Ol,{children:(0,t.jsxs)(a.ll,{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("h3",{className:"text-2xl font-semibold tracking-tight scroll-m-20",children:n}),(0,t.jsx)(s.dr,{className:"flex items-center bg-transparent",children:r.map((e,r)=>(0,t.jsx)(s.SP,{value:e.key,className:"!bg-transparent !shadow-none",children:(0,t.jsx)(l.z,{variant:"outline",size:"icon",className:"w-4 h-4 rounded-full ".concat(e.key===m&&"bg-primary hover:bg-primary"),"aria-label":e.key})},r))}),o||" "]}),(0,t.jsx)(u.EA.p,{...x,className:"text-sm font-normal text-muted-foreground ms-0.5",children:m})]})}),r.map((e,r)=>(0,t.jsxs)(s.nU,{value:e.key,className:"overflow-hidden",children:[(0,t.jsx)(u.EA.div,{...x,children:(0,t.jsx)(a.aY,{className:"pb-3",children:(0,t.jsxs)("h4",{className:"text-3xl font-semibold tracking-tight scroll-m-20",children:[e.value,(0,t.jsx)("sup",{className:"font-normal ms-2",children:d})]})})}),(0,t.jsx)(a.eW,{children:(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:e.sub||c})})]},r))]})})}},495:function(e,r,n){n.d(r,{d:function(){return u},z:function(){return o}});var t=n(7437),i=n(2265),a=n(1538),s=n(2218),l=n(7440);let u=(0,s.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),o=i.forwardRef((e,r)=>{let{className:n,variant:i,size:s,asChild:o=!1,...d}=e,c=o?a.g7:"button";return(0,t.jsx)(c,{className:(0,l.cn)(u({variant:i,size:s,className:n})),ref:r,...d})});o.displayName="Button"},6013:function(e,r,n){n.d(r,{Ol:function(){return l},SZ:function(){return o},Zb:function(){return s},aY:function(){return d},eW:function(){return c},ll:function(){return u}});var t=n(7437),i=n(2265),a=n(7440);let s=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("div",{ref:r,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",n),...i})});s.displayName="Card";let l=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("div",{ref:r,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",n),...i})});l.displayName="CardHeader";let u=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("h3",{ref:r,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",n),...i})});u.displayName="CardTitle";let o=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("p",{ref:r,className:(0,a.cn)("text-sm text-muted-foreground",n),...i})});o.displayName="CardDescription";let d=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("div",{ref:r,className:(0,a.cn)("p-6 pt-0",n),...i})});d.displayName="CardContent";let c=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)("div",{ref:r,className:(0,a.cn)("flex items-center p-6 pt-0",n),...i})});c.displayName="CardFooter"},4344:function(e,r,n){n.d(r,{Z:function(){return l}});var t=n(7437),i=n(2265),a=n(8484),s=n(7440);let l=i.forwardRef((e,r)=>{let{className:n,orientation:i="horizontal",decorative:l=!0,...u}=e;return(0,t.jsx)(a.f,{ref:r,decorative:l,orientation:i,className:(0,s.cn)("shrink-0 bg-border","horizontal"===i?"h-[1px] w-full":"h-full w-[1px]",n),...u})});l.displayName=a.f.displayName},5273:function(e,r,n){n.d(r,{SP:function(){return o},dr:function(){return u},mQ:function(){return l},nU:function(){return d}});var t=n(7437),i=n(2265),a=n(9385),s=n(7440);let l=a.fC,u=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)(a.aV,{ref:r,className:(0,s.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",n),...i})});u.displayName=a.aV.displayName;let o=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)(a.xz,{ref:r,className:(0,s.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",n),...i})});o.displayName=a.xz.displayName;let d=i.forwardRef((e,r)=>{let{className:n,...i}=e;return(0,t.jsx)(a.VY,{ref:r,className:(0,s.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",n),...i})});d.displayName=a.VY.displayName},7570:function(e,r,n){n.d(r,{C8:function(){return s},IF:function(){return o},Nx:function(){return l},QD:function(){return d},dv:function(){return a},fz:function(){return u}});var t=n(6460),i=n(7296);function a(e){let r=e.ultimaRilevazione,n=e.rilevazioneGiornoPrimaUltima,t={};return Object.keys(r).forEach(e=>{if(!(e in i.ai))return;let a=i.ai[e];if(null===n[e]||null===r[e]){t[a]="";return}if("rain"===a){t[a]="Pioggia odierna";return}if("windDir"===a||"windSpeed"===a){t[a]="Informazioni vento odierne";return}r[e]=Number(r[e]),n[e]=Number(n[e]),t[a]=((r[e]-n[e])/n[e]*100).toFixed(2)+" % da ieri",t[a].startsWith("-")||(t[a]="+"+t[a])}),t}function s(e,r){let n=r[0].toUpperCase()+r.substring(1);return[{key:"Attuale",value:Number(e.ultimaRilevazione[r+"UltimaRilevazione"])},{key:"Massima",value:Number(e["max"+n+"Settimanale"][6])},{key:"Minima",value:Number(e["min"+n+"Settimanale"][6])}]}function l(e,r){let n=r+"Settimanale";return"pressione"===r?e[n].map(e=>null!==e?Number(e.replaceAll(",","")):0):e[n].map(e=>null!==e?Number(e):0)}function u(e){return{temp:e.map(e=>Number(e.tempOut)),humidity:e.map(e=>Number(e.outHum)),rain:e.map(e=>Number(e.rain)),pressure:e.map(e=>Number(e.bar)),maxTemp:e.map(e=>Number(e.hiTemp)),minTemp:e.map(e=>Number(e.lowTemp)),times:e.map(e=>(0,t.WU)(e.data,"HH:mm"))}}function o(e,r){let n="min"+r,t="max"+r,i="media"+r;return[{key:"Attuale",value:Number((e.map(e=>Number(e[i])).reduce((e,r)=>e+r,0)/e.length).toFixed(1))},{key:"Massima",value:Math.max(...e.map(e=>Number(e[t])))},{key:"Minima",value:Math.min(...e.map(e=>Number(e[n])))}]}function d(e,r){let n="pioggiaGiornaliera"===r?"pioggiaGiornaliera":"media"+r,t=e.map(e=>Number(e[n])),i=Math.max(...t),a=Number(((i-Math.min(...t))/i*100).toFixed(1));return a<0?"-"+a:"+"+a+" % tra massimo e minimo"}},7296:function(e,r,n){n.d(r,{ai:function(){return t},dp:function(){return a},ll:function(){return i}});let t={temperaturaUltimaRilevazione:"temp",umiditaUltimaRilevazione:"humidity",pressioneUltimaRilevazione:"pressure",direzioneVentoUltimaRilevazione:"windDir"},i={temp:"Temperatura",humidity:"Umidita'",rain:"Precipitazioni",pressure:"Pressione",windSpeed:"Velocit\xe0 del vento",windDir:"Direzione del vento"},a={temp:"\xb0C",humidity:"%",rain:"mm",pressure:"hPa",windSpeed:"km/h",windDir:""}},721:function(e,r,n){n.d(r,{GE:function(){return u}});var t=n(7437),i=n(8872),a=n(2461),s=n(993),l=n(8296);function u(e){let{temperature:r,pressure:n,humidity:i}=e,a="Limpido";return i>80&&r>0&&r<30&&(a="Pioggia"),i>50&&i<80&&n>=1e3&&n<=1020&&(a="Nuvoloso"),i<50&&n>=1010&&n<=1020&&(a="Soleggiato"),n>1020&&(a="Limpido"),{icon:(0,t.jsx)(o,{status:a}),status:a}}let o=e=>{let{status:r}=e;switch(r){case"Limpido":default:return(0,t.jsx)(i.Z,{stroke:"#17A34A"});case"Pioggia":return(0,t.jsx)(a.Z,{stroke:"#17A34A"});case"Nuvoloso":return(0,t.jsx)(s.Z,{stroke:"#17A34A"});case"Soleggiato":return(0,t.jsx)(l.Z,{stroke:"#17A34A"})}}},7440:function(e,r,n){n.d(r,{cn:function(){return a}});var t=n(4839),i=n(6164);function a(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return(0,i.m6)((0,t.W)(r))}}}]);