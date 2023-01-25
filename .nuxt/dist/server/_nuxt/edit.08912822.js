import{_ as I,a as V}from"./list_section.b08b4afc.js";import{_ as J,a as W}from"./chain.e6a16fc3.js";import{_ as q}from"./changing_access.02a54b60.js";import{_ as F,a as G,b as M}from"./EL.03916df4.js";import{n as w}from"../server.mjs";import{openBlock as f,createElementBlock as L,withDirectives as O,createVNode as E,vShow as Q,createElementVNode as o,normalizeClass as K,createBlock as g,createCommentVNode as y,vModelText as X,unref as Y}from"vue";import{a as Z,u as $,b as ee,c as m}from"./private.7b9915f8.js";import{u as te}from"./SectionStore.63b2f3c7.js";import{u as ie}from"./ArticleStore.7b5f5aed.js";import{E as se}from"./editor.f8dcc403.js";import{H as ae,L as ne,I as oe,Q as re,C as le,D as ce,R as de,T as _e,W as pe,a as he}from"./bundle.b38a729e.js";import{_ as me}from"./_plugin-vue_export-helper.a1a6add7.js";import"./NavbarStore.1846ce18.js";import"#internal/nitro";import"vue-router";const ue={setup(){const r=te(),e=Z(),s=$(),t=ee(),i=ie(),d=new se({tools:{header:{class:ae,inlineToolbar:["link"]},list:{class:ne,inlineToolbar:!0},image:{class:oe},quote:{class:re},code:{class:le},delimiter:{class:ce},raw:{class:de},table:{class:_e},warning:{class:pe},checklist:{class:he}},holder:"editorjSj",onReady:()=>{_()},onChange:()=>{}});async function _(){const a=new URL("https://api.wiki.itl.systems/team/article/edit"),l={team_id:s.session_TeamID,article_id:i.article_id};Object.keys(l).forEach(c=>a.searchParams.append(c,l[c]));const p={Authorization:"Bearer "+e.token,"Content-Type":"application/json",Accept:"application/json"};await m(a,{method:"GET",headers:p},"$DVzfXINfoS").then(c=>u(c.data.value.data.article.tabs))}function u(a){var l=[],p="/&23948",c="/&22903",k="/&92834";for(let n=0;n<=a.length-1;n++)switch(a[n].type){case"paragraph":l.push({id:a[n].id,type:"paragraph",data:{text:a[n].content}});break;case"header":var T=a[n].content.split(p),B=T[0],N=T[1];l.push({id:a[n].id,type:"header",data:{text:B,level:N}});break;case"list":var C=a[n].content.split(p),U=C[0],z=C[1].split(k);l.push({id:a[n].id,type:"list",data:{style:U,items:z}});break;case"quote":var b=a[n].content.split(p),H=b[0],P=b[1],D=b[2];l.push({id:a[n].id,type:"quote",data:{text:H,caption:P,alignment:D}});break;case"code":l.push({id:a[n].id,type:"code",data:{code:a[n].content}});break;case"delimiter":l.push({id:a[n].id,type:"delimiter",data:{}});break;case"raw":l.push({id:a[n].id,type:"raw",data:{html:a[n].content}});break;case"table":var x=a[n].content.split(p),v=x[1].split(c);for(let h=0;h<=v.length-1;h++)v[h]=v[h].split(k);l.push({id:a[n].id,type:"table",data:{withHeadings:x[0],content:v}});break;case"warning":var j=a[n].content.split(p);l.push({id:a[n].id,type:"warning",data:{title:j[0],message:j[1]}});break;case"checklist":var S=a[n].content.split(p),A=[];for(let h=0;h<=S.length-1;h++){let R=S[h].split(k);A.push({text:R[0],checked:R[1]})}l.push({id:a[n].id,type:"checklist",data:{items:A}});break}d.blocks.render({time:1550476186479,blocks:l,version:"2.8.1"})}return{editor:d,priv:e,teams:s,user:t,sect:r,article:i}},created(){setTimeout(()=>{this.info_article().then(()=>{this.h_name=this.article_data.info_public.article.name,this.link_section=this.article_data.info_public.article.section.name,this.parent=this.article_data.info_public.article.section.id})},500)},data(){return{tggg:!1,errory:!1,alert:"",h_name:"",link_section:"",vis_list:!1,parent:"",act:[],check_pub:!1,vis_sh:!1,additional:!1,article_data:[]}},methods:{async unart(){const r=new URL("https://api.wiki.itl.systems/team/article/delete"),e={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let s={article_id:this.article.article_id,team_id:this.teams.session_TeamID};m(r,{method:"POST",headers:e,body:JSON.stringify(s)},"$dzaB7cHk53").then(()=>{this.article.exit_article(),window.location.href="/"+this.teams.session_TeamCode+".itl.wiki"})},async info_article(){const r=new URL("https://api.wiki.itl.systems/team/article/edit"),e=new URL("https://api.wiki.itl.systems/team/article"),s={team_id:this.teams.session_TeamID,article_id:this.article.article_id};Object.keys(s).forEach(_=>{r.searchParams.append(_,s[_]),e.searchParams.append(_,s[_])});const t={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"},{data:i}=await m(r,{method:"GET",headers:t},"$p63Cu9dIkU"),{data:d}=await m(e,{method:"GET",headers:t},"$cWWOfy6o4W");this.article_data={info_edit:i.value.data,info_public:d.value.data}},pub(r){this.check_pub=r},save_act(r,e){if(typeof e!="object")this.act=[{user_id:e,permission:r}];else for(let s=0;s<=e.length-1;s++)this.act.push({user_id:e[s].id,permission:r})},get_parent(r,e){if(this.parent=r,typeof e=="object")for(let s=0;s<=e.length-1;s++)s===0?(this.link_section="",this.link_section+=e[s]):e[s]!==void 0&&(this.link_section+="/"+e[s]);else this.link_section=e},add_content_blocks(r){var e=r;for(let t=0;t<=e.length-1;t++)switch(e[t].type){case"paragraph":e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.text,typeof e[t].id!="number"&&delete e[t].id;break;case"header":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.text+"/&23948"+e[t].data.level;break;case"list":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.style+"/&23948"+e[t].data.items.join("/&92834");break;case"quote":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.text+"/&23948"+e[t].data.caption+"/&23948"+e[t].data.alignment;break;case"code":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.code;break;case"delimiter":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t;break;case"raw":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.html;break;case"table":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t;var s="";for(let i=0;i<=e[t].data.content.length-1;i++)s+=e[t].data.content[i].join("/&92834"),e[t].data.content.length-2>=i&&(s+="/&22903");e[t].content=e[t].data.withHeadings+"/&23948"+s;break;case"warning":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t,e[t].content=e[t].data.title+"/&23948"+e[t].data.message;break;case"checklist":typeof e[t].id!="number"&&delete e[t].id,e[t].name=e[t].type+"_"+t;var s="";for(let i=0;i<=e[t].data.items.length-1;i++)s+=e[t].data.items[i].text+"/&92834"+e[t].data.items[i].checked,e[t].data.items.length-2>=i&&(s+="/&23948");e[t].content=s;break}return e},async test_save(r){this.h_name!==""&&this.parent!=""?this.editor.save().then(e=>{e.blocks.length===0&&(this.errory=!0,this.alert="\u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u0430");var s=this.add_content_blocks(e.blocks);const t=new URL("https://api.wiki.itl.systems/team/article/edit"),i={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let d={team_id:this.teams.session_TeamID,article_id:this.article.article_id,section_id:this.parent,action:r,name:this.h_name,tabs:{...s}};this.act&&(d.abilities={...this.act}),m(t,{method:"POST",headers:i,body:JSON.stringify(d)},"$LN33Km9VRn").then(_=>{if(r===3){if(this.article.use_article(this.h_name,this.article.article_id),this.check_pub){const u=new URL("https://api.wiki.itl.systems/team/article/mode"),a={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let l={team_id:this.teams.session_TeamID,article_id:this.article.article_id,public:1};m(u,{method:"POST",headers:a,body:JSON.stringify(l)},"$RpbmC5xNtp")}w("/"+this.teams.session_TeamCode+".itl.wiki/section/"+this.sect.current_section+"/items/"+this.article.article_id)}else _.error.value===null&&w("/"+this.teams.session_TeamCode+".itl.wiki/")})}).catch(e=>{console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F: ",e)}):(this.alert="\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435/\u043F\u0443\u0442\u044C/\u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B",this.errory=!0)}}},fe=["value"],ve=o("img",{src:G},null,-1),ye=o("span",null,"\u0422\u0435\u0433\u0438",-1),ke=[ve,ye],be=o("img",{src:M},null,-1),ge=[be],we=o("img",{src:W},null,-1),Te=o("span",null,"\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F",-1),Ce=[we,Te],xe=o("div",{id:"editorjSj"},null,-1),je={key:3},Se=o("div",{class:"era"},null,-1),Ae={class:"additional"},Re=o("span",null,"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A",-1),Le=[Re],Oe={class:"additionalOO"},Ee=o("span",null,"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",-1),Be=[Ee];function Ne(r,e,s,t,i,d){const _=I,u=J,a=V,l=q,p=F;return f(),L("div",null,[O(E(_,{top:0,alert:i.alert},null,8,["alert"]),[[Q,i.errory]]),o("div",{class:K([{hid:!0},{errory:i.errory}])},[i.vis_sh?(f(),g(u,{key:0,onCheck:d.pub,top:50,left:500,left_arrw:40},null,8,["onCheck"])):y("",!0),i.vis_list?(f(),g(a,{key:1,onSelected:d.get_parent,top:140,left:230},null,8,["onSelected"])):y("",!0),o("input",{onClick:e[0]||(e[0]=c=>{i.vis_list=!i.vis_list,i.tggg=!1,i.vis_sh=!1}),class:"r",type:"text",value:i.link_section,readonly:""},null,8,fe),O(o("input",{maxlength:"25","onUpdate:modelValue":e[1]||(e[1]=c=>i.h_name=c),class:"HJ",type:"text",placeholder:"\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0430\u0442\u044C\u0438"},null,512),[[X,i.h_name]]),E(l,{onClick:e[2]||(e[2]=c=>{i.vis_sh=!1,i.tggg=!1,i.vis_list=!1}),width_input:80,width_img:15,height_img:16,left_arrw:15,left_window:420,onFor_whom:d.save_act,type_entity:2,id_entity:t.article.article_id,left:0,top:8,text:"\u0434\u043E\u0441\u0442\u0443\u043F"},null,8,["onFor_whom","id_entity"]),o("div",{onClick:e[3]||(e[3]=c=>{i.tggg=!i.tggg,i.vis_list=!1,i.vis_sh=!1}),class:"tggg"},ke),i.tggg?(f(),g(p,{key:2,top:70,left:190,left_arrw:105})):y("",!0),o("button",{onClick:e[4]||(e[4]=c=>d.test_save(3)),class:"oppo"},"\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"),o("button",{onClick:e[5]||(e[5]=c=>Y(w)("/"+t.teams.session_TeamCode+".itl.wiki/")),class:"ot"},"\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"),o("div",{onClick:e[6]||(e[6]=c=>i.additional=!i.additional),class:"TTTR"},ge),o("div",{onClick:e[7]||(e[7]=c=>{i.vis_sh=!i.vis_sh,i.tggg=!1,i.vis_list=!1}),class:"kay"},Ce),xe,i.additional?(f(),L("div",je,[Se,o("div",Ae,[o("div",{class:"lik",onClick:e[8]||(e[8]=c=>d.test_save(2))},Le)]),o("div",Oe,[o("div",{class:"lik",onClick:e[9]||(e[9]=c=>d.unart())},Be)])])):y("",!0)],2)])}const Xe=me(ue,[["render",Ne]]);export{Xe as default};
//# sourceMappingURL=edit.08912822.js.map
