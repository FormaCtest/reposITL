import{_ as y}from"./changing_access.27dfb36f.js";import{a as g,b as _,h as m,F as k,E as T,e as n,o as d,u,m as h,t as l,l as f,j as w}from"./entry.19428e20.js";import{d as b,u as S,a as x,b as p}from"./private.d82c0789.js";import{u as C}from"./ArticleStore.89b32673.js";import{u as N}from"./SectionStore.763b80b6.js";import{_ as j}from"./fold_full.ee363041.js";import{_ as A}from"./pencil.90349105.js";const X={setup(){const r=b(),s=N(),a=C(),i=S(),t=x();return{teams:r,sect:s,article:a,priv:i,users:t}},data(){return{list_items:[],mass_sec:!1,good:!1}},created(){setTimeout(()=>{this.users.TakingData()},500),setTimeout(()=>{this.info_items()},1e3)},methods:{async edit_pr(r,s,a,i){const t=new URL("https://api.wiki.itl.systems/team/abilities/edit"),c={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let o={team_id:this.teams.session_TeamID,entity_type:a,entity_id:i,permission:r};if(typeof s=="object")for(var e=0;e<=s.length-1;e++)o.user_id=s[e].id,p(t,{method:"POST",headers:c,body:JSON.stringify(o)},"$4Y7rgtIl2w");else o.user_id=s,p(t,{method:"POST",headers:c,body:JSON.stringify(o)},"$nRvNl2v7zN")},async info_items(){const r=new URL("https://api.wiki.itl.systems/team/section/sections"),s={team_id:this.teams.session_TeamID};Object.keys(s).forEach(e=>r.searchParams.append(e,s[e]));const a={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"},{data:i}=await p(r,{method:"GET",headers:a},"$ggprLMbcH9");for(var t=[],c=0;c<=i.value.data.length-1;c++)t.push(i.value.data[c].items);t=t.flat();for(var o=0;o<=t.length-1;o++)t[o].created_by===this.users.userId&&this.list_items.push(t[o]);this.good=!0},edit_date(r){var s=["\u044F\u043D\u0432\u0430\u0440\u044F","\u0444\u0435\u0432\u0440\u0430\u043B\u044F","\u043C\u0430\u0440\u0442\u0430","\u0430\u043F\u0440\u0435\u043B\u044F","\u043C\u0430\u044F","\u0438\u044E\u043D\u044F","\u0438\u044E\u043B\u044F","\u0430\u0432\u0433\u0443\u0441\u0442\u0430","\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F","\u043E\u043A\u0442\u044F\u0431\u0440\u044F","\u043D\u043E\u044F\u0431\u0440\u044F","\u0434\u0435\u043A\u0430\u0431\u0440\u044F"];let a=new Date(r);var i=a.getDate()+" "+s[a.getMonth()]+" "+a.toTimeString().slice(0,5);return i}}},B={key:0,class:"no_work"},F=n("span",null,"\u041C\u043E\u0438 \u0440\u0430\u0431\u043E\u0442\u044B",-1),O={key:0},D={class:"items_block"},E=n("img",{class:"file",src:j},null,-1),L={class:"no"},P={class:"nm"},V=["onClick"],z={key:0,class:"status"},R={class:"ob"},U=["onClick"],J=n("img",{src:A},null,-1),M={class:"setur"};function G(r,s,a,i,t,c){const o=y;return d(),_("div",null,[t.good?(d(),_("div",B,[F,t.list_items?m("",!0):(d(),_("p",O,"\u041F\u043E\u0445\u043E\u0436\u0435, \u0432\u044B \u0435\u0449\u0435 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043B\u0438 \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438")),t.list_items?(d(!0),_(k,{key:1},T(t.list_items,e=>(d(),_("div",D,[E,n("div",L,[n("div",P,[n("div",{onClick:v=>{i.article.use_article(e.name,e.id),u(h)("/"+this.teams.session_TeamCode+".itl.wiki/my_works/"+e.id)},class:"ik"},l(e.name),9,V),e.status_id<3?(d(),_("div",z,l(e.status_id===1?"\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438"),1)):m("",!0)]),n("div",R,[f(" \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E:\xA0"),n("span",null,l(c.edit_date(e.created_at)),1)]),n("div",{onClick:v=>{i.article.use_article(e.name,e.id),u(h)("/"+i.teams.session_TeamCode+".itl.wiki/my_works/"+e.id+"/edit")},class:"edits"},[J,f(" \u041F\u0440\u0430\u0432\u043A\u0430 ")],8,U),n("div",M,[w(o,{type_entity:"article",id_entity:e.id,onFor_whom:c.edit_pr,left:700,top:8,text:"\u0423 \u0432\u0441\u0435\u0445"},null,8,["id_entity","onFor_whom"])])])]))),256)):m("",!0)])):m("",!0)])}const Z=g(X,[["render",G]]);export{Z as default};
