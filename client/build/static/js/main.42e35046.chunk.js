(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,t,n){e.exports=n(43)},24:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),c=n(15),r=n.n(c),u=(n(24),n(5)),o=n(3),m=n(4),i=n.n(m),s="/api/contacts",d=function(){return i.a.get(s)},f=function(e){return i.a.post(s,e)},p=function(e){return i.a.delete("".concat(s,"/").concat(e))},b=function(e){var t=e.id;return i.a.put("".concat(s,"/").concat(t),e)},E=n(16),h=function(e){var t=e.message,n=e.err;return null===t?null:l.a.createElement("h3",{style:n?{color:"red"}:{color:"green"}},t)},v=function(e){var t=e.searchQuery,n=e.handleQuery,a=e.message,c=e.err;return l.a.createElement("nav",null,l.a.createElement("h1",null,"Phonebook",l.a.createElement("span",null,"Notification:",l.a.createElement(h,{message:a,err:c}))),l.a.createElement(h,null),l.a.createElement("label",null,l.a.createElement("span",null,l.a.createElement(E.a,null)),l.a.createElement("input",{type:"text",value:t,onChange:n})))},g=n(17),j=function(e){var t=e.onSubmit,n=e.name,a=e.handleName,c=e.number,r=e.handleNumber,u=e.handleUpload;return l.a.createElement("form",{onSubmit:t,encType:"multipart/form-data"},l.a.createElement("label",null,l.a.createElement("input",{type:"text",value:n,onChange:a,placeholder:"Add name"})),l.a.createElement("label",null,l.a.createElement("input",{type:"number",value:c,onChange:r,placeholder:"Add phone"})),l.a.createElement("label",null,l.a.createElement("input",{type:"file",onChange:u})),l.a.createElement("button",{type:"submit"},l.a.createElement(g.a,null)))},O=n(18),y=function(e){var t=e.contact,n=e.deleteContact;return l.a.createElement("li",null,l.a.createElement("button",{onClick:function(){window.confirm("Delete ".concat(t.name,"?"))&&n(t.id)}},l.a.createElement(O.a,null)),l.a.createElement("div",{style:{backgroundImage:'url("'.concat(window.location.origin+t.path,'")')}}),l.a.createElement("div",null,l.a.createElement("h3",null,t.name),l.a.createElement("p",null,t.number)))},C=function(e){var t=e.contacts,n=e.deleteContact;return l.a.createElement("ul",null,t.map((function(e,t){return l.a.createElement(y,{key:t,contact:e,deleteContact:n})})),l.a.createElement("li",{className:"empty-flex-item"}),l.a.createElement("li",{className:"empty-flex-item"}))},S=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),m=Object(o.a)(r,2),i=m[0],s=m[1],E=Object(a.useState)(""),h=Object(o.a)(E,2),g=h[0],O=h[1],y=Object(a.useState)(null),S=Object(o.a)(y,2),w=S[0],k=S[1],N=Object(a.useState)(""),x=Object(o.a)(N,2),A=x[0],U=x[1],D=Object(a.useState)(""),I=Object(o.a)(D,2),Q=I[0],T=I[1],J=Object(a.useState)(!1),L=Object(o.a)(J,2),B=L[0],F=L[1];Object(a.useEffect)((function(){d().then((function(e){c(e.data)}))}),[]);console.log(w);var M=n.filter((function(e){return e.name.toLowerCase().includes(A.toLowerCase())}));return l.a.createElement("div",{className:"App"},l.a.createElement(v,{handleQuery:function(e){U(e.target.value)},message:Q,err:B}),l.a.createElement("main",null,l.a.createElement("aside",null,l.a.createElement(j,{onSubmit:function(e){e.preventDefault(),i&&g&&w||alert("Info is missing!");var t=new FormData;t.append("name",i),t.append("number",g),t.append("image",w);var a=n.find((function(e){return e.name===i}));if(a){alert("".concat(i," already exists! Update number?"));var l=Object(u.a)(Object(u.a)({},a),{},{number:g});b(l).then((function(e){c(n.map((function(t){return t.id!==l.id?t:e.data}))),T("Updated ".concat(i,"'s number")),setTimeout((function(){T(null)}),3e3)}))}else f(t).then((function(e){c(n.concat(e.data)),console.log(e.data),T("Added ".concat(i)),setTimeout((function(){T(null)}),3e3)}));s(""),O(""),F(!1)},name:i,number:g,handleName:function(e){s(e.target.value)},handleNumber:function(e){O(e.target.value)},file:w,handleUpload:function(e){k(e.target.files[0])}})),l.a.createElement(C,{contacts:M,deleteContact:function(e){p(e).then((function(t){var a=n.filter((function(t){return t.id!==e}));c(a)}))}})))};r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(S,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.42e35046.chunk.js.map