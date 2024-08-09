export const createElement=(html)=>{
 const div=document.createElement("div")
  div.innerHTML=html 
  document.body.appendChild(div)
}
const projects=[
  {
    "name": "Webby-Editor",
    "github": "https://github.com/Israeltesfaye/Webby-Editor",
    "status": "In Progress",
    "description": "A web-based code editor built with the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and Zod for validation. The backend is completed, and the frontend is being developed.  Templates for various web languages are being added for greater versatility."
  },
  {
    "name": "PromptGenius",
    "github": "https://github.com/Israeltesfaye/PromptGenius",
    "status": "In Progress",
    "description": "A fine-tuned AI API with a demo vanilla web page showcasing how to interact with the API. The backend is built using Node.js and Express. The project's future goal is to evolve into a prompt engineering website where users can share and discover prompt injection methods as templates."
  }
] 
export const commands = [
  {
    name: 'about',
    description: 'Learn about me, the human behind the code 🧑‍💻 ', 
    render:function(){
      let div=document.createElement("div")
       div.innerHTML=`I'm a passionate developer who thrives on learning and creating.  My current focus is on web development, but I'm always exploring new technologies and eager to expand my skills into other areas of software engineering.  I believe that a strong foundation in coding principles is essential for building innovative solutions, regardless of the platform.

When I'm not coding, you can find me [mention some of your hobbies or interests]. 

You can connect with me on:

* **<b>LinkedIn</b>**: [Your LinkedIn Profile URL]
* **<b>GitHub</b>**: [Your GitHub Profile URL]
* **<b>Twitter</b>**: [Your Twitter Profile URL]

Let's build something amazing together!`
document.body.appendChild(div)
    }
  },
  {
    name: 'skills',
    description: 'See what I can do... like magic, but with code ✨🧙‍♂️ (and maybe a bit of debugging magic 🐞)', 
    render:()=>{createElement(`My toolbox is filled with the tools of the trade! 🧰

**Web Development:**
<b class="h">* **HTML, CSS, JavaScript:**</b>  The holy trinity of the web - I've got 'em down pat! 🧙‍♂️
<b class="h">* **React:**</b>  Building dynamic user interfaces?  No problem!  React is my jam. 🤘
<b class="h">* **Node.js:**</b>  Server-side development?  Bring it on!  I'm a Node.js ninja. 🥷

**Beyond the Web (Leveling Up!):**
<b class="h">* **Python:**</b>  Learning to code in Python - it's the language of versatility! 🐍 
<b class="h">* **Data Structures & Algorithms:**</b>  Got the foundations in place -  ready to conquer any coding challenge.  🧠

**Other Tools:**
<b class="h">* **Git & GitHub:**</b>  Version control is my best friend. 🤝
* **Agile Methodologies:**  I'm a team player and love collaborating on projects!  🤝 

I'm always eager to learn more, so if you see a skill I'm missing, let me know! 🚀 `)} 
    
  },
  {
    name: 'projects',
    description: 'Explore my projects, where I bring ideas to life 💡 (and sometimes learn from mistakes 🤯)', 
    render:()=>{
       projects.forEach((p)=>{
          createElement(`<div class="project"><h3><b><>==(|==============></b>${p.name}<b><==============|)==<></b>
          </h3><p>${p.description}</p>
          <div><a href='${p.github}'>github</a>
          <span><b class='h'>Status: </b>${p.status}</span></div>
          </div>`)
       })
    } 
  },
  {
    name: 'contact',
    description: "Let's connect! 🤝 (I promise I don't bite... unless you're a bug 🐛)", 
render:()=>{createElement(`Want to get in touch?  👋

I'm always open to connecting with other developers and sharing ideas!

You can reach me at:

<a href="mailto:israeltesfaye399@gmail.com">* **Email:** </a>
<a href="https://t.me/@Israel_tesfaye">* **Telegram:**</a>
Let's chat about code, projects, or anything else that's on your mind! 💬 `)} 
  },
  {
    name: 'help',
    description: "Need some guidance?  I'm here to help you navigate my portfolio 😎 (just like a GPS, but for developers"}] 