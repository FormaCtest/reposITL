import{_ as P}from"./changing_access.27dfb36f.js";import{a as X,b,e as c,l as m,u as F,j as J,t as h,h as w,w as V,k as W,o as y,m as q}from"./entry.19428e20.js";import{u as z,d as H,b as u}from"./private.d82c0789.js";import{u as U}from"./ArticleStore.89b32673.js";import{E as G}from"./editor.135d3e60.js";import{H as I,L as M,I as Q,Q as Z,C as K,D as Y,R as $,T as tt,W as et,a as it}from"./bundle.f96f1759.js";import{_ as st}from"./pencil.90349105.js";import"./SectionStore.763b80b6.js";const at={setup(){const n=z(),s=H(),o=U(),r=new G({tools:{header:{class:I,inlineToolbar:["link"]},list:{class:M,inlineToolbar:!0},image:{class:Q},quote:{class:Z},code:{class:K},delimiter:{class:Y},raw:{class:$},table:{class:tt},warning:{class:et},checklist:{class:it}},readOnly:!0,holder:"editorjss",onReady:()=>{i()},onChange:()=>{}});async function i(){const t=new URL("https://api.wiki.itl.systems/team/article/edit"),a={team_id:s.session_TeamID,article_id:o.article_id};Object.keys(a).forEach(_=>t.searchParams.append(_,a[_]));const d={Authorization:"Bearer "+n.token,"Content-Type":"application/json",Accept:"application/json"};await u(t,{method:"GET",headers:d},"$qjeso3zZCl").then(_=>l(_.data.value.data.article.tabs))}function l(t){var a=[],d="/&23948",_="/&22903",f="/&92834";for(let e=0;e<=t.length-1;e++)switch(t[e].type){case"paragraph":a.push({id:t[e].id,type:"paragraph",data:{text:t[e].content}});break;case"header":var g=t[e].content.split(d),D=g[0],O=g[1];a.push({id:t[e].id,type:"header",data:{text:D,level:O}});break;case"list":var T=t[e].content.split(d),A=T[0],R=T[1].split(f);a.push({id:t[e].id,type:"list",data:{style:A,items:R}});break;case"quote":var k=t[e].content.split(d),N=k[0],B=k[1],L=k[2];a.push({id:t[e].id,type:"quote",data:{text:N,caption:B,alignment:L}});break;case"code":a.push({id:t[e].id,type:"code",data:{code:t[e].content}});break;case"delimiter":a.push({id:t[e].id,type:"delimiter",data:{}});break;case"raw":a.push({id:t[e].id,type:"raw",data:{html:t[e].content}});break;case"table":var j=t[e].content.split(d),v=j[1].split(_);for(let p=0;p<=v.length-1;p++)v[p]=v[p].split(f);a.push({id:t[e].id,type:"table",data:{withHeadings:j[0],content:v}});break;case"warning":var x=t[e].content.split(d);a.push({id:t[e].id,type:"warning",data:{title:x[0],message:x[1]}});break;case"checklist":var C=t[e].content.split(d),E=[];for(let p=0;p<=C.length-1;p++){let S=C[p].split(f);E.push({text:S[0],checked:S[1]})}a.push({id:t[e].id,type:"checklist",data:{items:E}});break}r.blocks.render({time:1550476186479,blocks:a,version:"2.8.1"})}return{priv:n,teams:s,article:o,editor:r}},created(){setTimeout(()=>{this.info_article()},500)},data(){return{article_data:[],editor_obj:{},chain:!1}},methods:{async edit_role(n,s){const o=new URL("https://api.wiki.itl.systems/team/abilities/edit"),r={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let i={team_id:this.teams.session_TeamID,entity_type:"article",entity_id:this.article.article_id,permission:n};if(typeof s=="object")for(let l=0;l<=s.length-1;l++)i.user_id=s[l].id,u(o,{method:"POST",headers:r,body:JSON.stringify(i)},"$F8wWNmWbdI");else i.user_id=s,u(o,{method:"POST",headers:r,body:JSON.stringify(i)},"$isTcVMnEbg")},save(){this.editor.save().then(n=>{this.editor_obj.blocks=n.blocks})},async info_article(){const n=new URL("https://api.wiki.itl.systems/team/article/edit"),s=new URL("https://api.wiki.itl.systems/team/article"),o={team_id:this.teams.session_TeamID,article_id:this.article.article_id};Object.keys(o).forEach(t=>{n.searchParams.append(t,o[t]),s.searchParams.append(t,o[t])});const r={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"},{data:i}=await u(n,{method:"GET",headers:r},"$rtDkEKjJhm"),{data:l}=await u(s,{method:"GET",headers:r},"$OJbReWTF8Z");this.article_data={info_edit:i.value.data,info_public:l.value.data}},import_data(n){var s=["\u044F\u043D\u0432\u0430\u0440\u044F","\u0444\u0435\u0432\u0440\u0430\u043B\u044F","\u043C\u0430\u0440\u0442\u0430","\u0430\u043F\u0440\u0435\u043B\u044F","\u043C\u0430\u044F","\u0438\u044E\u043D\u044F","\u0438\u044E\u043B\u044F","\u0430\u0432\u0433\u0443\u0441\u0442\u0430","\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F","\u043E\u043A\u0442\u044F\u0431\u0440\u044F","\u043D\u043E\u044F\u0431\u0440\u044F","\u0434\u0435\u043A\u0430\u0431\u0440\u044F"];let o=new Date(n);var r=o.getDate()+" "+s[o.getMonth()]+" "+o.toTimeString().slice(0,5);return r}}},ot={key:0},rt=c("img",{src:st},null,-1),nt={class:"HelOu"},ct={class:"heeead"},lt={key:0,class:"status"},dt={class:"description"},pt={class:"postDes"},_t={class:"meaning"},ht={class:"postDes"},mt={class:"meaning"},ut={id:"editorjss"},vt={key:0};function bt(n,s,o,r,i,l){const t=P;return y(),b("div",null,[i.article_data.info_public?(y(),b("div",ot,[c("div",{onClick:s[0]||(s[0]=a=>F(q)("/"+this.teams.session_TeamCode+".itl.wiki/my_works/"+r.article.article_id+"/edit")),class:"pencil"},[rt,m("\u041F\u0440\u0430\u0432\u043A\u0430")]),J(t,{text:"\u0443 \u0432\u0441\u0435\u0445",onFor_whom:l.edit_role,type_entity:2,id_entity:r.article.article_id,onClick:s[1]||(s[1]=a=>i.chain=!1),left:1200,top:42},null,8,["onFor_whom","id_entity"]),c("div",nt,h(i.article_data.info_public.article.name+"/\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"),1),c("div",ct,[m(h(i.article_data.info_public.article.name)+" ",1),i.article_data.info_public.article.status_id<3?(y(),b("div",lt,h(i.article_data.info_public.article.status_id===1?"\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A":"\u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438"),1)):w("",!0)]),c("div",dt,[c("div",pt,[m(" \u0410\u0432\u0442\u043E\u0440:\xA0"),c("div",_t,h(i.article_data.info_public.article.creator.fullname),1),m("\xA0 ")]),c("div",ht,[m(" \xA0\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E:\xA0 "),c("div",mt,h(l.import_data(i.article_data.info_public.article.updated_at)),1)])])])):w("",!0),V(c("div",ut,[i.editor_obj.blocks?(y(),b("div",vt,[c("span",null,h(i.editor_obj),1)])):w("",!0)],512),[[W,i.article_data.info_public]])])}const Ct=X(at,[["render",bt]]);export{Ct as default};
