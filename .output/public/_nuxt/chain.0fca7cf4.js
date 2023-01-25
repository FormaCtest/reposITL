import{a as p,o as n,b as o,e,i as l,f as c,l as u,h as m}from"./entry.19428e20.js";import{u as d,d as h,b as a}from"./private.d82c0789.js";import{a as y}from"./changing_access.27dfb36f.js";const _="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGwSURBVHgBzZmBcYJAEEU/VqAV5KwgdhAsIR1Ygh2oFWgq0E4kFWgqgFSgqWCzH7iEzGAEcoF9M9/TGUf//IW7vSNCR0Qk1mGmeirHcSlyVWWl3lRJFEUJ/hs1NVatVBdpT6raqxxCUxrbSjj2wYzqDy2lW2L3SFUL/AUJm9ottmiLFCU9Sn+c+J9tDJ6kf451XkY15hj5DP0Ty71y6xcWMjzLqqeoYs7pwJgdhoWT/FQndo4/SrzG8OYIb5aV/5AnWKaXwhYTpugTXMMe+bXoE2R6Dra4aoKTkRRdiYM9uFjELHEMu8xocIhJuSl5gg+wyyMNOthlHHFtgWFGMA4NXmGXfCX5gF0yGjzDLu80mMAuZ+sJJr5ZuOD7VMAKmTYLUz/NvMAeCV98gkzvAluw7c/vYpT9v6UUDzTHN9VNE1Nk4zr0tZip5t7g11JXprjB8Gy8uVo0yZ0Mxw5NkH7PZTynOi+3upln9DuBv6rmaIv0U+5mZf3FJM9rUgkPD0WXCIH+kFMdJBysTPjprGI0lfYwsXVbYxE6IsWGn+K21aHYHVYfQ7AR5o2WcOz6GOIT3IyAEXdp1/AAAAAASUVORK5CYII=";const g={props:{top:{type:Number},left:{type:Number},left_window:{type:Number},left_arrw:{type:Number},type_entity:{type:Number},id_entity:{type:Number}},setup(){const A=d(),t=h();return{priv:A,teams:t}},data(){return{check:!1}},methods:{async publication(){if(this.type_entity)if(this.type_entity===1){const A=new URL("https://api.wiki.itl.systems/team/article/mode"),t={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let s={team_id:this.teams.session_TeamID,article_id:this.id_entity,public:this.check?1:0};a(A,{method:"POST",headers:t,body:JSON.stringify(s)},"$Kh8Srngty7")}else{const A=new URL("https://api.wiki.itl.systems/team/section/mode"),t={Authorization:"Bearer "+this.priv.token,"Content-Type":"application/json",Accept:"application/json"};let s={team_id:this.teams.session_TeamID,section_id:this.type_entity,public:this.check?1:0};a(A,{method:"POST",headers:t,body:JSON.stringify(s)},"$mz2ra87iBZ")}else this.$emit("check",!this.check)}}},f=e("div",{class:"text13"},"\u041F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F",-1),w={key:0,class:"write"},C=e("input",{type:"text",readonly:""},null,-1),b=e("img",{src:y},null,-1),v=e("div",{class:"acez azec"},[e("div",null,[e("span",null,"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"),e("p",null,"\u0412\u0441\u0435 \u043C\u043E\u0433\u0443\u0442 \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C")]),e("div",null,[e("span",null,"\u0427\u0438\u0442\u0430\u0442\u044C"),e("p",null,"\u0412\u0441\u0435 \u043C\u043E\u0433\u0443\u0442 \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C")])],-1);function k(A,t,s,T,i,r){return n(),o("div",null,[e("div",{style:l([{top:s.top+"px"},{left:s.left-400+"px"}]),class:"acez"},[f,e("div",{class:"aWW",style:l({left:s.left_arrw+"px"})},null,4),e("div",{onClick:t[0]||(t[0]=U=>{r.publication(),i.check=!i.check}),class:c([{cek:!0},{full:i.check}])},[e("img",{style:{"-webkit-user-select":"none"},class:c([{ball:!0},{ful:i.check}]),src:_},null,2)],2),i.check?(n(),o("div",w,[C,u(" \u0427\u0438\u0442\u0430\u0442\u044C"),b,v])):m("",!0)],4)])}const S=p(g,[["render",k]]),z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIfSURBVHgBrZRdbtpAEMd3dm0UiRL5CNCCqr65J2h6gtITxGnKc3KDwg3grUpJ454g6QlwTlDeqlKk0BtsIQ9WsHe6s7aRzZew1JGQ92P255n9/w1j/zmgTLLj/XAi6/gCAF2GzAGG909R5If+q1lpYNWbuMISI33CWduSqKKzxfXLO5rwsjCqiit8z1G9ZYjfqHDg1k21M3Ep1yoDY6h6f4etbm47OO5MpW70QiCn9TYvA5sXYSb4UiRrAG/MfB9Q2OJ2H4xC+g2ZDp29wNr5tK0fdf0bE6zWmd4++/j7ZCPvw8RLRjDeCqQ2j7yfdWMNClTfCQ4M2hz4qHb+q53lOpQnxCeTxtRgA5jdWcWy9CGetALgLK6bd7r1nplqRcmPBFN2ZWS60GovvjT9AjAvAAJIxdQ4beWUKp5fvegig4AKi0XtRNn2ZQabD5texuFZ6Xk16W2Pw1aQASq6EvIZYHyfFI0uj/UL12AUxofKsrvJF4CDvJpCwJlSbKQP1mNhSxHFdXNfADP5teXroc/WImkZ+Dt6PAnRz2/Kz43Z/Op5gzP++igMqbRTWl8KEbAdkd4hGg+FGrA1axnKVABSvbczLwMC4h96bvPZupq7DF4AIgffTIDfkKLZJilfhBUF2BaQVPHgKBv1wcTMiBiA9p8epuY+DLYCrqBW3M8uPt2W+j4G5EF2YGz8wTqXDw57jFwGlmRVNpP91cd/UPwDv8D7yjfTMTkAAAAASUVORK5CYII=";export{S as _,z as a};
