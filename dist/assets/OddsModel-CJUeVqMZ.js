import"./base-AzRci_bF.js";import{i as p,E as c,a as m}from"./index-_Y8r7Hpt.js";import{u as y}from"./index-BsfIg53E.js";import{d as _,p as f,q as x,o as g,B as w,z as e,g as n,w as s}from"./index-BsL-cr4q.js";import{_ as b}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./vnode-BskogDEe.js";const v={class:"content"},h=_({__name:"OddsModel",setup(B){const i=f("character"),d=()=>{},o=y();return x(()=>{p(document.getElementById("character1")).setOption({xAxis:{type:"category",data:o.character1.map((t,a)=>a)},yAxis:{type:"value",min:0,max:1},series:[{data:o.character1.map(t=>t.toFixed(5)),type:"line"}],tooltip:{show:!0,trigger:"axis"}}),p(document.getElementById("weapon1")).setOption({xAxis:{type:"category",data:o.weapon1.map((t,a)=>a)},yAxis:{type:"value",min:0,max:1},series:[{data:o.weapon1.map(t=>t.toFixed(5)),type:"line"}],tooltip:{show:!0,trigger:"axis"}})}),(r,l)=>{const t=c,a=m;return g(),w("div",v,[l[3]||(l[3]=e("p",null,"由于官方并未明确具体的抽卡概率模型，这里使用的是民测的较为准确的模型，即：",-1)),n(a,{modelValue:i.value,"onUpdate:modelValue":l[0]||(l[0]=u=>i.value=u),type:"card",class:"demo-tabs",onClick:d},{default:s(()=>[n(t,{label:"限定角色祈愿",name:"character"},{default:s(()=>l[1]||(l[1]=[e("p",{style:{color:"#cc8","font-weight":"bold"}},"限定角色祈愿：",-1),e("ul",{style:{"padding-left":"2em"}},[e("li",null,[e("p",null,"前73抽每次有0.6%概率出五星")]),e("li",null,[e("p",null,"第74抽开始，每多一抽则概率增加6%，第74抽概率为6.6%")]),e("li",null,[e("p",null,"第90抽必定出金，实际上几乎不会出现这么非的情况")]),e("li",null,[e("p",null,"第一次出金记为小保底，小保底有50%的概率为当期限定五星角色，50%为常驻角色")]),e("li",null,[e("p",null,"若小保底出了常驻角色，则进入大保底，下次出金必为当期限定五星角色并重置到小保底状态")]),e("li",null,[e("p",null,"5.0纳塔版本更新后，新增的“捕获明光”的触发条件尚不清晰，这里用的是 5.0版本更新后，新增一个计数器，初始值为1，小保底每歪一次则计数器+1，每不歪一次则计数器-1，最小值为0，最大值为3，当计数器为3时，下一次小保底必定触发捕获明光 并将计数器重置为1")]),e("li",null,[e("p",null,"由于能力有限，本站计算出多金的概率暂未考虑捕获明光机制，而是55%的综合不歪概率")])],-1),e("div",{id:"character1"},null,-1)])),_:1}),n(t,{label:"限定武器祈愿",name:"weapon"},{default:s(()=>l[2]||(l[2]=[e("p",{style:{color:"#cc8","font-weight":"bold"}},"限定武器祈愿：",-1),e("ul",{style:{"padding-left":"2em"}},[e("li",null,[e("p",null,"基础概率与角色池基本一样，只是抽数减10，即前63抽概率为0.6%")]),e("li",null,[e("p",null,"第64抽开始，每抽概率增加6%，第64抽为6.6%，第80抽为100%")])],-1),e("div",{id:"weapon1"},null,-1)])),_:1})]),_:1},8,["modelValue"])])}}}),I=b(h,[["__scopeId","data-v-694d1d71"]]);export{I as default};