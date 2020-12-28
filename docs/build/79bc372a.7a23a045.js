(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{83:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return i}));var r=n(3),l=(n(0),n(93));const b={id:"custom-formats",title:"Custom formats",sidebar_label:"Custom formats"},o={unversionedId:"custom-formats",id:"custom-formats",isDocsHomePage:!1,title:"Custom formats",description:"---",source:"@site/docs\\custom-formats.md",slug:"/custom-formats",permalink:"/numerable/docs/custom-formats",version:"current",sidebar_label:"Custom formats"},c=[{value:"Description",id:"description",children:[]},{value:"Interface",id:"interface",children:[]},{value:"Properties",id:"properties",children:[]}],a={rightToc:c};function i({components:e,...t}){return Object(l.b)("wrapper",Object(r.a)({},a,t,{components:e,mdxType:"MDXLayout"}),Object(l.b)("hr",null),Object(l.b)("h2",{id:"description"},"Description"),Object(l.b)("p",null,"A locale object.",Object(l.b)("br",{parentName:"p"}),"\n","If you don't specify a locale in options, default locale is ",Object(l.b)("strong",{parentName:"p"},Object(l.b)("em",{parentName:"strong"},"en")),".  "),Object(l.b)("hr",null),Object(l.b)("h2",{id:"interface"},"Interface"),Object(l.b)("pre",null,Object(l.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"interface Locale {\n    code: string;\n\n    delimiters?: {\n        thousands: string;\n        decimal: string;\n    };\n\n    abbreviations?: string;\n\n    ordinal?: (value: number) => string;\n\n    digitGroupingStyle?: number[];\n\n    numeralSystem?: string[];\n}\n")),Object(l.b)("h2",{id:"properties"},"Properties"),Object(l.b)("table",null,Object(l.b)("thead",null,Object(l.b)("tr",null,Object(l.b)("td",null," Name "),Object(l.b)("td",null," Type "),Object(l.b)("td",null," Description "))),Object(l.b)("tbody",null,Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"code")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," string "),Object(l.b)("td",null," the locale code (ISO 639-1 + optional country code) ")),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"delimiters")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," Object "),Object(l.b)("td",null,'Default are english delimiters ("," for grouping, and "." for decimals) ',Object(l.b)("br",null),"Take into account that delimiters have to be different from each other in order to be valid. ",Object(l.b)("br",null),"Properties",Object(l.b)("table",null,Object(l.b)("thead",null,Object(l.b)("tr",null,Object(l.b)("td",null," Name "),Object(l.b)("td",null," Type "),Object(l.b)("td",null," Description "))),Object(l.b)("tbody",null,Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"thousands")," "),Object(l.b)("td",null," string "),Object(l.b)("td",null," The grouping delimiter ")),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"decimal")," "),Object(l.b)("td",null," string "),Object(l.b)("td",null," The decimal delimiter  ")))))),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"abbreviations")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," string "),Object(l.b)("td",null,"The localized abbreviations in the following format:  ",Object(l.b)("br",null),"For ",Object(l.b)("strong",null,"en"),': "|||K|||M|||B|||T" ',Object(l.b)("br",null),"The default abbreviation pattern would be the ",Object(l.b)("strong",null,"en")," (shown in previous line). ",Object(l.b)("br",null),'Each one of the pipes define the power of ten for the specified abbreviation. So, for the previous example, "K" will be applied to 1000, "M" to 1000000 (one million)...  ',Object(l.b)("br",null),"This allows using different types of abbreviation for languages like chinese, where the abbreviations are applied on 10000 (ten thousand) and not 1000.  ",Object(l.b)("br",null),"For example: ",Object(l.b)("br",null),Object(l.b)("strong",null,"zh"),': "||||\u4e07||||\u4ebf||||\u4e07\u4ebf" ',Object(l.b)("br",null),Object(l.b)("strong",null,"en-in"),': "|||T||L||Cr|||TCr||LCr" ',Object(l.b)("br",null))),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"ordinal")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," Function "),Object(l.b)("td",null,"The function that calculates the ordinal numbers suffix. ",Object(l.b)("br",null),"The default ordinal is ",Object(l.b)("strong",null,"en")," (1st, 2nd, 3rd...). This function receives a number, and returns an ordinal suffix. ",Object(l.b)("br",null),"Example: ",Object(l.b)("br",null),Object(l.b)("pre",null,"For ",Object(l.b)("strong",null,"fr"),": number => number === 1 ? 'er' : 'e'"))),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"digitGroupingStyle")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," number[] "),Object(l.b)("td",null,"An array that defines the grouping style of the locale (thousands separator groups). ",Object(l.b)("br",null),"The default digitGroupingStyle is [3] ",Object(l.b)("br",null),"The array defines the order and size of the grouping. The last value of the array is the last defined group, that will be applied subsequently to the rest of the numbers. ",Object(l.b)("br",null),"Example (value: 12345678900, pattern: '0,0'): ",Object(l.b)("br",null),"[4,3] => '1,234,567,8900' ",Object(l.b)("br",null),"[4,2] => '1,23,45,67,8900' ",Object(l.b)("br",null),"[3,2] => '12,34,56,78,900' ",Object(l.b)("br",null),"[4] => '123,4567,8900'")),Object(l.b)("tr",null,Object(l.b)("td",null," ",Object(l.b)("strong",null,"numeralSystem")," ",Object(l.b)("br",null)," (optional) "),Object(l.b)("td",null," string[] "),Object(l.b)("td",null,"An array that works as a map for the digits, from 0 to 9. ",Object(l.b)("br",null),"The default numeralSystem is Latin (0123456789). ",Object(l.b)("br",null),"This map allows defining different numeral systems like for example Devanagari digits (\u0966\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f) or Arabic digits (\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669). ",Object(l.b)("br",null)," ",Object(l.b)("br",null),"Example: ",Object(l.b)("br",null),"import arEG from 'numerable/locales/ar-eg'; ",Object(l.b)("br",null),"formatNumber(1234567890, '0,0', { locale: arEG });"," ",Object(l.b)("br",null),'// Returns "\u0661\u066c\u0662\u0663\u0664\u066c\u0665\u0666\u0667\u066c\u0668\u0669\u0660"')))))}i.isMDXComponent=!0},93:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return p}));var r=n(0),l=n.n(r);function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},b=Object.keys(e);for(r=0;r<b.length;r++)n=b[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(e);for(r=0;r<b.length;r++)n=b[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=l.a.createContext({}),u=function(e){var t=l.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=u(e.components);return l.a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.a.createElement(l.a.Fragment,{},t)}},O=l.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,b=e.originalType,o=e.parentName,i=a(e,["components","mdxType","originalType","parentName"]),s=u(n),O=r,p=s["".concat(o,".").concat(O)]||s[O]||d[O]||b;return n?l.a.createElement(p,c(c({ref:t},i),{},{components:n})):l.a.createElement(p,c({ref:t},i))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var b=n.length,o=new Array(b);o[0]=O;var c={};for(var a in t)hasOwnProperty.call(t,a)&&(c[a]=t[a]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var i=2;i<b;i++)o[i]=n[i];return l.a.createElement.apply(null,o)}return l.a.createElement.apply(null,n)}O.displayName="MDXCreateElement"}}]);