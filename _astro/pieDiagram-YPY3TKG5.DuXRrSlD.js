import{t as e}from"./chunk-AQ6EADP3.CZhslHi-.js";import{W as t,c as n,p as r,q as i}from"./chunk-LIEV3EAG.CwX8_nSx.js";import{$ as a,A as o,K as s,R as c,T as l,U as u,Y as d,j as f,rt as p,z as m}from"./chunk-2AEHWXPW.CGHBaxIc.js";import{t as h}from"./chunk-6BELYETK.C71OtFf0.js";import{t as g}from"./chunk-JQRUD6KW.CxRdTa4A.js";import"./chunk-L5GCOVLC.C_IWHnQs.js";import{t as _}from"./chunk-DMV4VAQV.witzTOMc.js";import"./chunk-HNC4WDU7.BEXysEy1.js";import"./chunk-SATU7PGQ.DvOEC2XD.js";import"./chunk-224SPVON.Ddovs7O_.js";import"./chunk-EQFTRU2I.CdO3kr0Z.js";import"./chunk-E5QJAATJ.Bf6daoS6.js";import"./chunk-66DQ2XMT.CdFaaPum.js";import"./chunk-D6VWDJW2.DAax0zpY.js";import"./chunk-BI6VK774.D0p-P1c8.js";import"./chunk-XNMVGMAZ.0uahbtTk.js";import"./chunk-4RFN2BYJ.CnUBuvy3.js";import"./chunk-FWYVLQTC.BDd60gDC.js";import"./chunk-RRFMTAIC.C2bBGJbX.js";import"./chunk-TZUXEDM2.-rxj919L.js";import"./chunk-OIYT25JQ.B7PKw7b-.js";import"./chunk-NV3KIAZN.DZPtbhJK.js";import"./chunk-STOV2HOB.DDYizIrP.js";import{a as v,p as y}from"./chunk-7CWYLC5S.hCT5CD0H.js";var b=m.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T=e(()=>structuredClone(w),`getConfig`),E=e(()=>{S=new Map,C=x.showData,a()},`clear`),D=e(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),i.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),O=e(()=>S,`getSections`),k=e(e=>{C=e},`setShowData`),A=e(()=>C,`getShowData`),j={getConfig:T,clear:E,setDiagramTitle:o,getDiagramTitle:f,setAccTitle:u,getAccTitle:l,setAccDescription:c,getAccDescription:s,addSection:D,getSections:O,setShowData:k,getShowData:A},M=e((e,t)=>{g(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),N={parse:e(async e=>{let t=await _(`pie`,e);i.debug(t),M(t,j)},`parse`)},P=e(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieCircle.highlighted{
    scale: 1.05;
    opacity: 1;
  }
  .pieCircle.highlightedOnHover:hover{
    transition-duration: 250ms;
    scale: 1.05;
    opacity: 1;
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),F=e(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),r=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return n().value(e=>e.value).sort(null)(r)},`createPieArcs`),I={parser:N,db:j,renderer:{draw:e((e,n,a,o)=>{i.debug(`rendering pie chart
`+e);let s=o.db,c=p(),l=v(s.getConfig(),c.pie),u=h(n),f=u.append(`g`);f.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=c,[g]=y(m.pieOuterStrokeWidth);g??=2;let _=l.legendPosition,b=l.textPosition,x=l.donutHole>0&&l.donutHole<=.9?l.donutHole:0,S=t().innerRadius(x*185).outerRadius(185),C=t().innerRadius(185*b).outerRadius(185*b),w=f.append(`g`);w.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+g/2).attr(`class`,`pieOuterCircle`);let T=s.getSections(),E=F(T),D=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],O=0;T.forEach(e=>{O+=e});let k=E.filter(e=>(e.data.value/O*100).toFixed(0)!==`0`),A=r(D).domain([...T.keys()]);w.selectAll(`mySlices`).data(k).enter().append(`path`).attr(`d`,S).attr(`fill`,e=>A(e.data.label)).attr(`class`,e=>{let t=`pieCircle`;return l.highlightSlice===`hover`?t+=` highlightedOnHover`:l.highlightSlice===e.data.label&&(t+=` highlighted`),t}),w.selectAll(`mySlices`).data(k).enter().append(`text`).text(e=>(e.data.value/O*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+C.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let j=f.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`),M=[...T.entries()].map(([e,t])=>({label:e,value:t})),N=f.selectAll(`.legend`).data(M).enter().append(`g`).attr(`class`,`legend`);N.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>A(e.label)).style(`stroke`,e=>A(e.label)),N.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let P=Math.max(...N.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),I=450,L=490,R=M.length*22;switch(_){case`center`:N.attr(`transform`,(e,t)=>{let n=22*M.length/2,r=-P/2-22,i=t*22-n;return`translate(`+r+`,`+i+`)`});break;case`top`:I+=R,N.attr(`transform`,(e,t)=>`translate(${-P/2-22}, ${t*22-185})`),w.attr(`transform`,()=>`translate(0, ${R+22})`);break;case`bottom`:I+=R,N.attr(`transform`,(e,t)=>{let n=-P/2-22,r=t*22- -207;return`translate(`+n+`,`+r+`)`});break;case`left`:L+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(-207,`+(t*22-n)+`)`}),w.attr(`transform`,()=>`translate(${P+18+4}, 0)`);break;default:L+=22+P,N.attr(`transform`,(e,t)=>{let n=22*M.length/2;return`translate(216,`+(t*22-n)+`)`})}let z=j.node()?.getBoundingClientRect().width??0,B=225-z/2,V=225+z/2,H=Math.min(0,B),U=Math.max(L,V)-H;u.attr(`viewBox`,`${H} 0 ${U} ${I}`),d(u,I,U,l.useMaxWidth)},`draw`)},styles:P};export{I as diagram};