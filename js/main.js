import {command,listCommands} from "./command.js"
import {commands} from "./constants.js"
import {WelcomeTypeAnimation} from "./animation.js"
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
window.addEventListener("load", async()=>{
    let typed = new Typed('#editableDiv', {
      strings: ["commands"],
      typeSpeed: 130,
      showCursor:false
})
})