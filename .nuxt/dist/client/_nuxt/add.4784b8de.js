import{_ as m,S as _}from"./inputMail.14bf0a3d.js";import{a as c,m as d,b as p,j as i,e as h,L as u,o as f}from"./entry.19428e20.js";import{d as v,u as y,b as A}from"./private.d82c0789.js";import"./analysis.b73d4268.js";const g={setup(){const e=v(),t=y();return{teams:e,priv:t}},data(){return{update:!1,error:!1,email:"",role:"",Array_email:[],message:""}},methods:{async Add_users(){this.email=this.email.trim().replaceAll(" ",","),this.Array_email=this.email.split(",");for(var e=0;e<this.Array_email.length;e++)if(this.Array_email[e].search(/[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}/igm)===-1){this.error=!0;break}else if(this.Array_email.length-e===1){const t=new URL("https://api.wiki.itl.systems/team/employees/add"),r={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let o={team_id:this.teams.session_TeamID,role:this.role,emails:this.Array_email};const{error:a,data:s}=await A(t,{method:"POST",headers:r,body:JSON.stringify(o)},"$KnFhN4NFGc");s.value?d("/"+this.teams.session_TeamCode+".itl.wiki/setting/emplayees"):(this.error=!0,this.message="\u043E\u0448\u0438\u0431\u043E\u0447\u043A\u0430")}},save_role(e){this.role=e},MailValue(e){this.email=e,this.error=!1}}},S=u('<div class="sot"><p href="#">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 /</p><p href="#"> \u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 /</p><p href="#">\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432</p></div><div class="add_s"><span>\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</span></div>',2);function b(e,t,r,o,a,s){const l=m,n=_;return f(),p("div",null,[S,i(l,{message:a.message,onCreate:s.MailValue,error:a.error,left:430,top:135,width:470,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email \u0430\u0434\u0440\u0435\u0441\u0441\u0430 \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E \u0438\u043B\u0438 \u043F\u0440\u043E\u0431\u0435\u043B"},null,8,["message","onCreate","error"]),i(n,{top:280,left:430,onAdd_role:s.save_role},null,8,["onAdd_role"]),h("button",{onClick:t[0]||(t[0]=k=>s.Add_users()),class:"button create_text"},"\u0412\u044B\u0441\u043B\u0430\u0442\u044C \u043F\u0440\u0438\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435")])}const C=c(g,[["render",b]]);export{C as default};