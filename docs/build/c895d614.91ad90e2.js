(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{122:function(e,a,t){"use strict";var n=t(94),r=t(0),l=t.n(r),c=t(123),o=t.n(c),i=t(155),s=t(56),u=t.n(s);a.a=function(e){var a=e.rows,t=void 0===a?[]:a;return l.a.createElement("div",null,l.a.createElement("table",{className:Object(n.a)(u.a.testsTable)},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null," Number "),l.a.createElement("th",null," Pattern "),l.a.createElement("th",null," Result "))),l.a.createElement("tbody",null,t.map((function(e,a){var t,r,c=e[0],s=e[1],b=(e[2],Object(i.a)(c,s));o()(c).format(s);return l.a.createElement("tr",{key:a,"data-for":"row-tooltip","data-tip":s,className:Object(n.a)(u.a.row)},l.a.createElement("td",{className:Object(n.a)(u.a.numberCell,(t={},t[u.a.nilValue]="number"!=typeof c||isNaN(c),t))},""+c),l.a.createElement("td",{className:Object(n.a)(u.a.patternText,(r={},r[u.a.nilValue]="string"!=typeof s,r))},"string"==typeof s?'"'+s+'"':""+s),l.a.createElement("td",{className:Object(n.a)(u.a.resultCell)},'"',b,'"'))})))))}},85:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return o})),t.d(a,"metadata",(function(){return i})),t.d(a,"rightToc",(function(){return s})),t.d(a,"default",(function(){return b}));var n=t(3),r=(t(0),t(93)),l=t(96),c=t(122);const o={id:"percentage",title:"Percentage",sidebar_label:"Percentage"},i={unversionedId:"percentage",id:"percentage",isDocsHomePage:!1,title:"Percentage",description:'Examples on this page are formatted with the "en" locale:',source:"@site/docs\\percentage.md",slug:"/percentage",permalink:"/numerable/docs/percentage",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/percentage.md",version:"current",sidebar_label:"Percentage"},s=[{value:"Percentage syntax",id:"percentage-syntax",children:[]},{value:"Description",id:"description",children:[]},{value:"Percentage scaling",id:"percentage-scaling",children:[]},{value:"Percentage space",id:"percentage-space",children:[]}],u={rightToc:s};function b({components:e,...a}){return Object(r.b)("wrapper",Object(n.a)({},u,a,{components:e,mdxType:"MDXLayout"}),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},'Examples on this page are formatted with the "en" locale:'),Object(r.b)("ul",{parentName:"blockquote"},Object(r.b)("li",{parentName:"ul"},'"',Object(r.b)("strong",{parentName:"li"},","),'" for thousands separator (or grouping)'),Object(r.b)("li",{parentName:"ul"},'"',Object(r.b)("strong",{parentName:"li"},"."),'" for decimals separator (or fraction digits)'))),Object(r.b)("hr",null),Object(r.b)("span",{style:{color:"#fc519f",fontWeight:"bold"}},"numerable")," allows you to format numbers as a percentage.",Object(r.b)("h5",{id:"example"},"Example"),Object(r.b)(l.a,{defaultValue:.15,defaultPattern:"0.0 %",editable:!1,mdxType:"PlaygroundInputs"}),Object(r.b)("h5",{id:"examples"},"Examples"),Object(r.b)(c.a,{rows:[[.15,"0.0 %"],[.43,"0,0.###%"],[1,"0 %"],[-.41,"0%"],[41,"0 %!"]],mdxType:"FormatExamplesTable"}),Object(r.b)("hr",null),Object(r.b)("h3",{id:"percentage-syntax"},"Percentage syntax"),Object(r.b)("p",null,'The percentage syntax is the "%" character followed by an optional exclamation mark if scaling is not desired.'),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"\"%[!]\"\n\n// With space:\nformat(x, '0.0 %');\nformat(x, '0.0 %!');\n\n// Without space:\nformat(x, '0.0%');\nformat(x, '0.0%!');\n")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"description"},"Description"),Object(r.b)("p",null,"The percentage format will multiply the number by 100 during format, and it will divide it by 100 during parsing.  "),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"format(1, '0.0 %');\n// Result: \"100.0 %\"\n")),Object(r.b)("hr",null),Object(r.b)("h3",{id:"percentage-scaling"},"Percentage scaling"),Object(r.b)("p",null,"If you don't want to multiply or divide the number by 100 during the format process, you can disable the scaling by:  "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Specifying that on the format options",Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"format(1, '0.0 %', { scalePercentage: false });\n// Result: \"1.0 %\"\n"))),Object(r.b)("li",{parentName:"ul"},"Using the exclamation mark after the percentage symbol in the pattern",Object(r.b)("pre",{parentName:"li"},Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"format(1, '0.0 %!');\n// Result: \"1.0 %\"\n")))),Object(r.b)("hr",null),Object(r.b)("h3",{id:"percentage-space"},"Percentage space"),Object(r.b)("p",null,"The space defined between the number and the percentage symbol will be kept."),Object(r.b)("pre",null,Object(r.b)("code",Object(n.a)({parentName:"pre"},{className:"language-javascript"}),"// With space\nformat(1.234, '0.00 %'); // Result: \"123.40 %\"\n\n// Without space\nformat(1.234, '0.00%'); // Result: \"123.40%\"\n")))}b.isMDXComponent=!0},96:function(e,a,t){"use strict";var n=t(94),r=t(0),l=t.n(r),c=t(97),o=t.n(c),i=t(155),s=t(55),u=t.n(s),b=t(98);a.a=function(e){var a=e.defaultPattern,t=e.defaultValue,c=e.localeSelector,s=e.editable,m=void 0===s||s,p=Object(r.useState)(null!=a?a:"0,0.00"),d=p[0],g=p[1],h=Object(r.useState)(null!=t?t:"1234.567"),j=h[0],f=h[1],O=Object(r.useState)("en"),N=O[0],E=O[1],v="null"===j?null:"undefined"!==j?parseFloat(j):void 0,y=function(e){return E(e.target.value)},C={en:null,"en-in":b.enIN,zh:b.zh,hi:b.hi,"ar-eg":b.arEG}[N],x=Object(i.a)(v,d,{locale:C});return l.a.createElement("div",null,l.a.createElement("div",{className:"margin-bottom--md"},!!c&&l.a.createElement("div",null,l.a.createElement("input",{type:"radio",value:"en",onChange:y,checked:"en"===N})," en",l.a.createElement("input",{type:"radio",value:"en-in",onChange:y,checked:"en-in"===N})," en-IN",l.a.createElement("input",{type:"radio",value:"zh",onChange:y,checked:"zh"===N})," zh",l.a.createElement("input",{type:"radio",value:"hi",onChange:y,checked:"hi"===N})," hi",l.a.createElement("input",{type:"radio",value:"ar-eg",onChange:y,checked:"ar-eg"===N})," ar-eg"),l.a.createElement("div",{className:u.a.playgroundCodeContainer},l.a.createElement("div",null,l.a.createElement("span",{className:u.a.functionNameColor}," formatNumber"),l.a.createElement("span",{className:u.a.neutralCodeColor},"("),l.a.createElement(o.a,{inputClassName:Object(n.a)(u.a.playgroundInput,u.a.numberColor),value:j,onChange:function(e){return f(e.target.value)},minWidth:28,disabled:!m}),l.a.createElement("span",{className:u.a.neutralCodeColor},",\xa0"),l.a.createElement("span",{className:u.a.stringColor},"'"),l.a.createElement(o.a,{inputClassName:Object(n.a)(u.a.playgroundInput,u.a.stringColor),value:d,onChange:function(e){return g(e.target.value)},minWidth:28,disabled:!m}),l.a.createElement("span",{className:u.a.stringColor},"'"),"en"!==N&&l.a.createElement("span",{className:u.a.neutralCodeColor},", { locale: ",{en:"en","en-in":"enIN",zh:"zh",hi:"hi","ar-eg":"arEG"}[N]," }"),l.a.createElement("span",{className:u.a.neutralCodeColor},");")),l.a.createElement("div",null,l.a.createElement("span",{className:Object(n.a)(u.a.commentColor,u.a.resultLine)},"// Returns '",x,"'")))))}}}]);