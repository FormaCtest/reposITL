import{D as S,m as O}from"./entry.19428e20.js";import{u as A,d as j,e as T,b as u}from"./private.d82c0789.js";const P=S("section",()=>{const b=A(),r=j(),n=T("secionId",{maxAge:b.Age}),h=T("sectionName",{maxAge:b.Age});function _(s,e){n.value=s,h.value=e}async function y(s,e,t,a){if(s.error.value===null){for(let i=0;i<=e.blocks.length-1;i++)e.blocks[i].name=e.blocks[i].type+"_"+i,e.blocks[i].content=e.blocks[i].data.text;_(s.data._rawValue.data.id,s.data._rawValue.data.name),O("/"+r.session_TeamCode+".itl.wiki/section/"+s.data._rawValue.data.id)}}function g(){n.value=null,h.value=null}async function v(s,e,t,a,i){const l=new URL("https://api.wiki.itl.systems/team/section/add"),c={Authorization:"Bearer "+b.token,"Content-Type":"application/json",Accept:"application/json"};if(typeof e!="object"){let p={team_id:r.session_TeamID,name:a,abilities:{0:{user_id:e,permission:s}},section_id:i};if(t.blocks.length!==0)for(var o=0;o<=t.blocks.length-1;o++)p.blocks+=t.blocks[o].data.text+" ";u(l,{method:"POST",headers:c,body:JSON.stringify(p)},"$YKZ5qnzlG6").then(m=>{y(m,t)})}else{var d=e,f=[];for(let m=0;m<=d.length;m++)f[m]={user_id:d[0].id,permission:s};let p={team_id:r.session_TeamID,name:a,abilities:{...f},section_id:i,code:"\u043A\u043E\u0434"};t.blocks.length!==0&&(p.blocks=t.blocks[0].data.text),u(l,{method:"POST",headers:c,body:JSON.stringify(p)},"$2rOO9TFy11").then(m=>{y(m,t)})}}async function k(s,e,t,a){if(s!==0){const i=new URL("https://api.wiki.itl.systems/team/abilities/edit"),l={Authorization:"Bearer "+b.token,"Content-Type":"application/json",Accept:"application/json"};let c={team_id:r.session_TeamID,entity_type:t,entity_id:t==="section"?n.value:a,permission:s};if(typeof e!="object")c.user_id=e,await u(i,{method:"POST",headers:l,body:JSON.stringify(c)},"$cNPwFiwlOt");else for(let o=0;o<=e.length-1;o++){let d={team_id:r.session_TeamID,entity_type:t,entity_id:t==="section"?n.value:a,permission:s,user_id:e[o].id};await u(i,{method:"POST",headers:l,body:JSON.stringify(d)},"$7WYYyQVIWk")}}else{const i=new URL("https://api.wiki.itl.systems/team/abilities/delete"),l={Authorization:"Bearer "+b.token,"Content-Type":"application/json",Accept:"application/json"};let c={team_id:r.session_TeamID,entity_type:t,entity_id:t==="section"?n.value:a};if(typeof e!="object")c.user_id=e,u(i,{method:"POST",headers:l,body:JSON.stringify(c)},"$fqlD50Qn8h");else for(let o=0;o<=e.length-1;o++){let d={team_id:r.session_TeamID,entity_type:t,entity_id:t==="section"?n.value:a,user_id:e[o].id};u(i,{method:"POST",headers:l,body:JSON.stringify(d)},"$bJYkp8VzkM")}}}async function w(s,e,t,a,i){const l=new URL("https://api.wiki.itl.systems/team/section/edit"),c={Authorization:"Bearer "+b.token,"Content-Type":"application/json",Accept:"application/json"};let o={team_id:r.session_TeamID,name:a,section_id:n.value};if(t.blocks.length>=1){o.blocks="";for(var d=0;d<=t.blocks.length-1;d++)o.blocks+=t.blocks[d].data.text+" "}else o.blocks=".";i!==n.value&&(o.parent_id=i),u(l,{method:"POST",headers:c,body:JSON.stringify(o)},"$63urKGyCeC").then(f=>{f.error.value?console.log("\u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430"):(window.location.href="/"+r.session_TeamCode+".itl.wiki/section/"+n.value,k(s,e,"section",n.value))})}return{current_section:n,current_name:h,close_sect:g,vie_sect:_,Edit_score:k,Add_section:v,Edit_section:w}});export{P as u};
