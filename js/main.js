import {command} from "./command.js"
//import {commands} from "./constants.js"
var term=document.querySelector("#editableDiv")
addEventListener("keyup",(e)=>{
   if(e.key=="Enter"){
      try{
      command(e.target.innerText.trim(),e.target)
      e.target.contentEditable=false
      }catch(err){
         console.log(err)
      }
   }
})
/*window.addEventListener("load", ()=>{
   var div=document.createElement("div")
   commands.forEach((c)=>{
      div.innerHTML+=`<b>${c.name}</b><p>${c.description}</p>`
   })
   document.body.appendChild(div)
})*/