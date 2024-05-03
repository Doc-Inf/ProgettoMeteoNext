"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[162],{7818:function(e,t,n){n.d(t,{default:function(){return r.a}});var o=n(551),r=n.n(o)},551:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let o=n(9920);n(7437),n(2265);let r=o._(n(148));function a(e,t){var n;let o={loading:e=>{let{error:t,isLoading:n,pastDelay:o}=e;return null}};"function"==typeof e&&(o.loader=e);let a={...o,...t};return(0,r.default)({...a,modules:null==(n=a.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},912:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let o=n(5592);function r(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new o.BailoutToCSRError(t);return n}},148:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let o=n(7437),r=n(2265),a=n(912),i=n(1481);function l(e){return{default:e&&"default"in e?e.default:e}}let u={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let t={...u,...e},n=(0,r.lazy)(()=>t.loader().then(l)),d=t.loading;function s(e){let l=d?(0,o.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,u=t.ssr?(0,o.jsxs)(o.Fragment,{children:["undefined"==typeof window?(0,o.jsx)(i.PreloadCss,{moduleIds:t.modules}):null,(0,o.jsx)(n,{...e})]}):(0,o.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,o.jsx)(n,{...e})});return(0,o.jsx)(r.Suspense,{fallback:l,children:u})}return s.displayName="LoadableComponent",s}},1481:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return a}});let o=n(7437),r=n(8512);function a(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,r.getExpectedRequestStore)("next/dynamic css"),a=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));a.push(...t)}}return 0===a.length?null:(0,o.jsx)(o.Fragment,{children:a.map(e=>(0,o.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"./_next/"+encodeURI(e),as:"style"},e))})}},976:function(e,t,n){n.d(t,{B:function(){return l}});var o=n(2265),r=n(8324),a=n(1584),i=n(1538);function l(e){let t=e+"CollectionProvider",[n,l]=(0,r.b)(t),[u,d]=n(t,{collectionRef:{current:null},itemMap:new Map}),s=e+"CollectionSlot",c=o.forwardRef((e,t)=>{let{scope:n,children:r}=e,l=d(s,n),u=(0,a.e)(t,l.collectionRef);return o.createElement(i.g7,{ref:u},r)}),m=e+"CollectionItemSlot",f="data-radix-collection-item";return[{Provider:e=>{let{scope:t,children:n}=e,r=o.useRef(null),a=o.useRef(new Map).current;return o.createElement(u,{scope:t,itemMap:a,collectionRef:r},n)},Slot:c,ItemSlot:o.forwardRef((e,t)=>{let{scope:n,children:r,...l}=e,u=o.useRef(null),s=(0,a.e)(t,u),c=d(m,n);return o.useEffect(()=>(c.itemMap.set(u,{ref:u,...l}),()=>void c.itemMap.delete(u))),o.createElement(i.g7,{[f]:"",ref:s},r)})},function(t){let n=d(e+"CollectionConsumer",t);return o.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll(`[${f}]`));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},l]}},9385:function(e,t,n){n.d(t,{VY:function(){return Z},aV:function(){return N},fC:function(){return H},dr:function(){return k},xz:function(){return Y}});var o=n(2988),r=n(2265),a=n(8149),i=n(8324),l=n(976),u=n(1584),d=n(3201),s=n(5171),c=n(5137),m=n(1715),f=n(7513);let g="rovingFocusGroup.onEntryFocus",p={bubbles:!1,cancelable:!0},v="RovingFocusGroup",[b,h,w]=(0,l.B)(v),[y,M]=(0,i.b)(v,[w]),[z,C]=y(v),P=(0,r.forwardRef)((e,t)=>(0,r.createElement)(b.Provider,{scope:e.__scopeRovingFocusGroup},(0,r.createElement)(b.Slot,{scope:e.__scopeRovingFocusGroup},(0,r.createElement)(E,(0,o.Z)({},e,{ref:t}))))),E=(0,r.forwardRef)((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:i,loop:l=!1,dir:d,currentTabStopId:v,defaultCurrentTabStopId:b,onCurrentTabStopIdChange:w,onEntryFocus:y,...M}=e,C=(0,r.useRef)(null),P=(0,u.e)(t,C),E=(0,f.gm)(d),[R=null,x]=(0,m.T)({prop:v,defaultProp:b,onChange:w}),[_,W]=(0,r.useState)(!1),A=(0,c.W)(y),I=h(n),S=(0,r.useRef)(!1),[F,j]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let e=C.current;if(e)return e.addEventListener(g,A),()=>e.removeEventListener(g,A)},[A]),(0,r.createElement)(z,{scope:n,orientation:i,dir:E,loop:l,currentTabStopId:R,onItemFocus:(0,r.useCallback)(e=>x(e),[x]),onItemShiftTab:(0,r.useCallback)(()=>W(!0),[]),onFocusableItemAdd:(0,r.useCallback)(()=>j(e=>e+1),[]),onFocusableItemRemove:(0,r.useCallback)(()=>j(e=>e-1),[])},(0,r.createElement)(s.WV.div,(0,o.Z)({tabIndex:_||0===F?-1:0,"data-orientation":i},M,{ref:P,style:{outline:"none",...e.style},onMouseDown:(0,a.M)(e.onMouseDown,()=>{S.current=!0}),onFocus:(0,a.M)(e.onFocus,e=>{let t=!S.current;if(e.target===e.currentTarget&&t&&!_){let t=new CustomEvent(g,p);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=I().filter(e=>e.focusable);T([e.find(e=>e.active),e.find(e=>e.id===R),...e].filter(Boolean).map(e=>e.ref.current))}}S.current=!1}),onBlur:(0,a.M)(e.onBlur,()=>W(!1))})))}),R=(0,r.forwardRef)((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:i=!0,active:l=!1,tabStopId:u,...c}=e,m=(0,d.M)(),f=u||m,g=C("RovingFocusGroupItem",n),p=g.currentTabStopId===f,v=h(n),{onFocusableItemAdd:w,onFocusableItemRemove:y}=g;return(0,r.useEffect)(()=>{if(i)return w(),()=>y()},[i,w,y]),(0,r.createElement)(b.ItemSlot,{scope:n,id:f,focusable:i,active:l},(0,r.createElement)(s.WV.span,(0,o.Z)({tabIndex:p?0:-1,"data-orientation":g.orientation},c,{ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{i?g.onItemFocus(f):e.preventDefault()}),onFocus:(0,a.M)(e.onFocus,()=>g.onItemFocus(f)),onKeyDown:(0,a.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){g.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,n){var o;let r=(o=e.key,"rtl"!==n?o:"ArrowLeft"===o?"ArrowRight":"ArrowRight"===o?"ArrowLeft":o);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(r))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(r)))return x[r]}(e,g.orientation,g.dir);if(void 0!==t){e.preventDefault();let r=v().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)r.reverse();else if("prev"===t||"next"===t){var n,o;"prev"===t&&r.reverse();let a=r.indexOf(e.currentTarget);r=g.loop?(n=r,o=a+1,n.map((e,t)=>n[(o+t)%n.length])):r.slice(a+1)}setTimeout(()=>T(r))}})})))}),x={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function T(e){let t=document.activeElement;for(let n of e)if(n===t||(n.focus(),document.activeElement!==t))return}var _=n(1383);let W="Tabs",[A,I]=(0,i.b)(W,[M]),S=M(),[F,j]=A(W),D=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:a,onValueChange:i,defaultValue:l,orientation:u="horizontal",dir:c,activationMode:g="automatic",...p}=e,v=(0,f.gm)(c),[b,h]=(0,m.T)({prop:a,onChange:i,defaultProp:l});return(0,r.createElement)(F,{scope:n,baseId:(0,d.M)(),value:b,onValueChange:h,orientation:u,dir:v,activationMode:g},(0,r.createElement)(s.WV.div,(0,o.Z)({dir:v,"data-orientation":u},p,{ref:t})))}),k=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,loop:a=!0,...i}=e,l=j("TabsList",n),u=S(n);return(0,r.createElement)(P,(0,o.Z)({asChild:!0},u,{orientation:l.orientation,dir:l.dir,loop:a}),(0,r.createElement)(s.WV.div,(0,o.Z)({role:"tablist","aria-orientation":l.orientation},i,{ref:t})))}),V=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:i,disabled:l=!1,...u}=e,d=j("TabsTrigger",n),c=S(n),m=L(d.baseId,i),f=G(d.baseId,i),g=i===d.value;return(0,r.createElement)(R,(0,o.Z)({asChild:!0},c,{focusable:!l,active:g}),(0,r.createElement)(s.WV.button,(0,o.Z)({type:"button",role:"tab","aria-selected":g,"aria-controls":f,"data-state":g?"active":"inactive","data-disabled":l?"":void 0,disabled:l,id:m},u,{ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{l||0!==e.button||!1!==e.ctrlKey?e.preventDefault():d.onValueChange(i)}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&d.onValueChange(i)}),onFocus:(0,a.M)(e.onFocus,()=>{let e="manual"!==d.activationMode;g||l||!e||d.onValueChange(i)})})))}),O=(0,r.forwardRef)((e,t)=>{let{__scopeTabs:n,value:a,forceMount:i,children:l,...u}=e,d=j("TabsContent",n),c=L(d.baseId,a),m=G(d.baseId,a),f=a===d.value,g=(0,r.useRef)(f);return(0,r.useEffect)(()=>{let e=requestAnimationFrame(()=>g.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,r.createElement)(_.z,{present:i||f},({present:n})=>(0,r.createElement)(s.WV.div,(0,o.Z)({"data-state":f?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":c,hidden:!n,id:m,tabIndex:0},u,{ref:t,style:{...e.style,animationDuration:g.current?"0s":void 0}}),n&&l))});function L(e,t){return`${e}-trigger-${t}`}function G(e,t){return`${e}-content-${t}`}let H=D,N=k,Y=V,Z=O},2218:function(e,t,n){n.d(t,{j:function(){return a}});let o=e=>"boolean"==typeof e?"".concat(e):0===e?"0":e,r=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=function e(t){var n,o,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"==typeof t){if(Array.isArray(t))for(n=0;n<t.length;n++)t[n]&&(o=e(t[n]))&&(r&&(r+=" "),r+=o);else for(n in t)t[n]&&(r&&(r+=" "),r+=n)}return r}(e))&&(o&&(o+=" "),o+=t);return o},a=(e,t)=>n=>{var a;if((null==t?void 0:t.variants)==null)return r(e,null==n?void 0:n.class,null==n?void 0:n.className);let{variants:i,defaultVariants:l}=t,u=Object.keys(i).map(e=>{let t=null==n?void 0:n[e],r=null==l?void 0:l[e];if(null===t)return null;let a=o(t)||o(r);return i[e][a]}),d=n&&Object.entries(n).reduce((e,t)=>{let[n,o]=t;return void 0===o||(e[n]=o),e},{});return r(e,u,null==t?void 0:null===(a=t.compoundVariants)||void 0===a?void 0:a.reduce((e,t)=>{let{class:n,className:o,...r}=t;return Object.entries(r).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...l,...d}[t]):({...l,...d})[t]===n})?[...e,n,o]:e},[]),null==n?void 0:n.class,null==n?void 0:n.className)}},1520:function(e,t,n){n.d(t,{it:function(){return g}});let o={lessThanXSeconds:{one:"meno di un secondo",other:"meno di {{count}} secondi"},xSeconds:{one:"un secondo",other:"{{count}} secondi"},halfAMinute:"alcuni secondi",lessThanXMinutes:{one:"meno di un minuto",other:"meno di {{count}} minuti"},xMinutes:{one:"un minuto",other:"{{count}} minuti"},aboutXHours:{one:"circa un'ora",other:"circa {{count}} ore"},xHours:{one:"un'ora",other:"{{count}} ore"},xDays:{one:"un giorno",other:"{{count}} giorni"},aboutXWeeks:{one:"circa una settimana",other:"circa {{count}} settimane"},xWeeks:{one:"una settimana",other:"{{count}} settimane"},aboutXMonths:{one:"circa un mese",other:"circa {{count}} mesi"},xMonths:{one:"un mese",other:"{{count}} mesi"},aboutXYears:{one:"circa un anno",other:"circa {{count}} anni"},xYears:{one:"un anno",other:"{{count}} anni"},overXYears:{one:"pi\xf9 di un anno",other:"pi\xf9 di {{count}} anni"},almostXYears:{one:"quasi un anno",other:"quasi {{count}} anni"}};var r=n(566);let a={date:(0,r.l)({formats:{full:"EEEE d MMMM y",long:"d MMMM y",medium:"d MMM y",short:"dd/MM/y"},defaultWidth:"full"}),time:(0,r.l)({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,r.l)({formats:{full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},defaultWidth:"full"})};var i=n(1774);function l(e,t,n){return+(0,i.z)(e,n)==+(0,i.z)(t,n)}let u=["domenica","luned\xec","marted\xec","mercoled\xec","gioved\xec","venerd\xec","sabato"];function d(e){return"'"+u[e]+" alle' p"}let s={lastWeek:(e,t,n)=>{let o=e.getDay();return l(e,t,n)?d(o):0===o?"'domenica scorsa alle' p":"'"+u[o]+" scorso alle' p"},yesterday:"'ieri alle' p",today:"'oggi alle' p",tomorrow:"'domani alle' p",nextWeek:(e,t,n)=>{let o=e.getDay();return l(e,t,n)?d(o):0===o?"'domenica prossima alle' p":"'"+u[o]+" prossimo alle' p"},other:"P"};var c=n(6940);let m={ordinalNumber:(e,t)=>String(Number(e)),era:(0,c.Y)({values:{narrow:["aC","dC"],abbreviated:["a.C.","d.C."],wide:["avanti Cristo","dopo Cristo"]},defaultWidth:"wide"}),quarter:(0,c.Y)({values:{narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1\xba trimestre","2\xba trimestre","3\xba trimestre","4\xba trimestre"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:(0,c.Y)({values:{narrow:["G","F","M","A","M","G","L","A","S","O","N","D"],abbreviated:["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic"],wide:["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"]},defaultWidth:"wide"}),day:(0,c.Y)({values:{narrow:["D","L","M","M","G","V","S"],short:["dom","lun","mar","mer","gio","ven","sab"],abbreviated:["dom","lun","mar","mer","gio","ven","sab"],wide:["domenica","luned\xec","marted\xec","mercoled\xec","gioved\xec","venerd\xec","sabato"]},defaultWidth:"wide"}),dayPeriod:(0,c.Y)({values:{narrow:{am:"m.",pm:"p.",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"},abbreviated:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"},wide:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"mattina",afternoon:"pomeriggio",evening:"sera",night:"notte"}},defaultWidth:"wide",formattingValues:{narrow:{am:"m.",pm:"p.",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"},abbreviated:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"},wide:{am:"AM",pm:"PM",midnight:"mezzanotte",noon:"mezzogiorno",morning:"di mattina",afternoon:"del pomeriggio",evening:"di sera",night:"di notte"}},defaultFormattingWidth:"wide"})};var f=n(9479);let g={code:"it",formatDistance:(e,t,n)=>{let r;let a=o[e];return(r="string"==typeof a?a:1===t?a.one:a.other.replace("{{count}}",t.toString()),null==n?void 0:n.addSuffix)?n.comparison&&n.comparison>0?"tra "+r:r+" fa":r},formatLong:a,formatRelative:(e,t,n,o)=>{let r=s[e];return"function"==typeof r?r(t,n,o):r},localize:m,match:{ordinalNumber:(0,n(9211).y)({matchPattern:/^(\d+)(º)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)}),era:(0,f.t)({matchPatterns:{narrow:/^(aC|dC)/i,abbreviated:/^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,wide:/^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^a/i,/^(d|e)/i]},defaultParseWidth:"any"}),quarter:(0,f.t)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^t[1234]/i,wide:/^[1234](º)? trimestre/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:(0,f.t)({matchPatterns:{narrow:/^[gfmalsond]/i,abbreviated:/^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,wide:/^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^g/i,/^f/i,/^m/i,/^a/i,/^m/i,/^g/i,/^l/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ge/i,/^f/i,/^mar/i,/^ap/i,/^mag/i,/^gi/i,/^l/i,/^ag/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:(0,f.t)({matchPatterns:{narrow:/^[dlmgvs]/i,short:/^(do|lu|ma|me|gi|ve|sa)/i,abbreviated:/^(dom|lun|mar|mer|gio|ven|sab)/i,wide:/^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^g/i,/^v/i,/^s/i],any:[/^d/i,/^l/i,/^ma/i,/^me/i,/^g/i,/^v/i,/^s/i]},defaultParseWidth:"any"}),dayPeriod:(0,f.t)({matchPatterns:{narrow:/^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,any:/^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mezza/i,noon:/^mezzo/i,morning:/mattina/i,afternoon:/pomeriggio/i,evening:/sera/i,night:/notte/i}},defaultParseWidth:"any"})},options:{weekStartsOn:1,firstWeekContainsDate:4}}}}]);