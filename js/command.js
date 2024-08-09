import {commands} from "./constants.js"
import {createElement} from "./constants.js"
const listCommands=()=>{
   var div=document.createElement("div")
   commands.forEach((c)=>{
      div.innerHTML+=`<b>${c.name}</b><p>${c.description}</p>`
   })
   document.body.appendChild(div)
}
const unavailable=()=>{
   var div=document.createElement("div")
      div.innerHTML+="<p class='error' >command not available</p>" 
   document.body.appendChild(div)
}
const after=()=>{
   let div=document.createElement("div")
   div.className="input"
   div.innerHTML=`<span><i><b>127.0.0.1</b>#</i></span>
   <div id="editableDiv" contenteditable="true">
   </div>`
   document.body.appendChild(div)
}
const help=()=>{
   let html=""
   commands.forEach((c)=>{html+=`<li>${c.name}</li>`})
   createElement(html)
}
export function command(text,el){
   //handle commands
   switch (text) {
      case "commands":
         listCommands()
         break;
      case "about":
         commands[0].render()
         break;
      case "skills":
         commands[1].render()
         break;
      case "projects":
         commands[2].render()
         break; 
      case "contact":
         commands[3].render()
         break; 
      case "help":
         help()
         break;
      default:
        unavailable()
   }
   //render new input
   after()
}