class Terminal {
  constructor() {
    this.output = document.getElementById('output');
    this.input = document.getElementById('command-input');
    this.cursor = document.getElementById('cursor');
    this.terminalBody = document.getElementById('terminal-body');
    this.terminalTime = document.getElementById('terminal-time');
    
    this.commandHistory = [];
    this.historyIndex = -1;
    this.isProcessing = false;
    
    this.commands = {
      help: {
        description: "Show available commands",
        execute: () => this.showHelp()
      },
      about: {
        description: "Learn about me",
        execute: () => this.showAbout()
      },
      skills: {
        description: "View my technical skills",
        execute: () => this.showSkills()
      },
      projects: {
        description: "Explore my projects",
        execute: () => this.showProjects()
      },
      contact: {
        description: "Get in touch with me",
        execute: () => this.showContact()
      },
      clear: {
        description: "Clear the terminal",
        execute: () => this.clearTerminal()
      },
      ls: {
        description: "List directory contents",
        execute: () => this.listDirectory()
      },
      whoami: {
        description: "Display current user",
        execute: () => this.showUser()
      }
    };
    
    this.init();
  }
  
  init() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    
    this.showWelcome();
    
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
    
    document.addEventListener('click', () => {
      this.input.focus();
    });
    
    this.input.focus();
  }
  
  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    this.terminalTime.textContent = timeString;
  }
  
  async typeText(text, element, speed = 10) {
    return new Promise((resolve) => {
      let index = 0;
      element.textContent = '';
      
      const type = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          this.autoScroll();
          setTimeout(type, speed);
        } else {
          this.autoScroll();
          resolve();
        }
      };
      
      type();
    });
  }
  
  async typeHTML(html, element, speed = 10) {
    return new Promise((resolve) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      let index = 0;
      element.innerHTML = '';
      
      const type = () => {
        if (index < textContent.length) {
          let htmlSoFar = '';
          let textPos = 0;
          
          for (let i = 0; i <= index && i < html.length; i++) {
            if (html[i] === '<') {
              const tagEnd = html.indexOf('>', i);
              if (tagEnd !== -1) {
                htmlSoFar += html.substring(i, tagEnd + 1);
                i = tagEnd;
              }
            } else if (textPos < index) {
              htmlSoFar += html[i];
              textPos++;
            } else if (textPos === index) {
              htmlSoFar += html[i];
              break;
            }
          }
          
          element.innerHTML = htmlSoFar;
          index++;
          this.autoScroll();
          setTimeout(type, speed);
        } else {
          element.innerHTML = html;
          this.autoScroll();
          resolve();
        }
      };
      
      type();
    });
  }
  
  autoScroll() {
    setTimeout(() => {
      this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }, 10);
  }
  
  addCommandLine(command) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="prompt">israel@portfolio:~$</span><span class="command">${command}</span>`;
    this.output.appendChild(commandLine);
    this.autoScroll();
  }
  
  async showWelcome() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    
    const asciiArt = document.createElement('pre');
    asciiArt.className = 'ascii-art';
    asciiArt.textContent = `$$$$$$\\                                        $$\\
\\_$$  _|                                       $$ |
  $$ |   $$$$$$$\\  $$$$$$\\  $$$$$$\\   $$$$$$\\  $$ |
  $$ |  $$  _____|$$  __$$\\ \\____$$\\ $$  __$$\\ $$ |
  $$ |  \\$$$$$$\\  $$ |  \\__|$$$$$$$ |$$$$$$$$ |$$ |
  $$ |   \\____$$\\ $$ |     $$  __$$ |$$   ____|$$ |
$$$$$$$\\ $$$$$$$  |$$ |     \\$$$$$$$ |\\$$$$$$\\ $$ |
\\______|\\_______/ \\__|      \\_______| \\_______|\\__|`;
    
    welcomeDiv.appendChild(asciiArt);
    
    const textDiv = document.createElement('div');
    textDiv.className = 'typing-text';
    welcomeDiv.appendChild(textDiv);
    
    this.output.appendChild(welcomeDiv);
    
    await this.typeText("Welcome to my terminal portfolio!", textDiv, 15);
    
    const br1 = document.createElement('br');
    const br2 = document.createElement('br');
    welcomeDiv.appendChild(br1);
    
    const textDiv2 = document.createElement('div');
    textDiv2.className = 'typing-text';
    welcomeDiv.appendChild(textDiv2);
    
    await this.typeText("I'm Israel Tesfaye, a passionate full-stack developer from Ethiopia.", textDiv2, 15);
    
    welcomeDiv.appendChild(br2);
    
    const textDiv3 = document.createElement('div');
    textDiv3.className = 'typing-text';
    welcomeDiv.appendChild(textDiv3);
    
    await this.typeText("Type 'help' to see available commands", textDiv3, 15);
    
    this.autoScroll();
  }
  
  async showHelp() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    let html = '<div class="section-title">⚔ Available Commands ⚔</div><div class="command-grid">';
    
    Object.entries(this.commands).forEach(([name, cmd]) => {
      html += `
        <div class="command-item">
          <div class="command-name">${name}</div>
          <div class="command-desc">${cmd.description}</div>
        </div>
      `;
    });
    
    html += '</div>';
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  async showAbout() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const html = `
      <div class="section-title">⚔ About Me ⚔</div>
      <p>I'm a passionate developer who thrives on learning and creating. My current focus is on web development, but I'm always exploring new technologies and eager to expand my skills into other areas of software engineering.</p>
      <p>I believe that a strong foundation in coding principles is essential for building innovative solutions, regardless of the platform.</p>
      <br>
      <p><strong>Connect with me:</strong></p>
      <ul class="contact-list">
        <li><a href="https://t.me/@Israel_tesfaye" target="_blank">📱 Telegram</a></li>
        <li><a href="https://github.com/Israeltesfaye" target="_blank">💻 GitHub</a></li>
      </ul>
    `;
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  async showSkills() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const html = `
      <div class="section-title">⚔ Technical Skills ⚔</div>
      
      <div class="skill-section">
        <h3>Web Development</h3>
        <ul class="skill-list">
          <li>HTML, CSS, JavaScript</li>
          <li>React - Building dynamic user interfaces</li>
          <li>Node.js - Server-side development</li>
        </ul>
      </div>
      
      <div class="skill-section">
        <h3>Beyond the Web</h3>
        <ul class="skill-list">
          <li>Python - Learning versatile programming</li>
          <li>Data Structures & Algorithms</li>
        </ul>
      </div>
      
      <div class="skill-section">
        <h3>Tools & Methodologies</h3>
        <ul class="skill-list">
          <li>Git & GitHub - Version control</li>
          <li>Agile Methodologies - Team collaboration</li>
        </ul>
      </div>
    `;
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  async showProjects() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const projects = [
      {
        name: "Webby-Editor",
        github: "https://github.com/Israeltesfaye/Webby-Editor",
        status: "In Progress",
        description: "A web-based code editor built with the MERN stack (MongoDB, Express, React, Node.js) with TypeScript and Zod for validation. The backend is completed, and the frontend is being developed. Templates for various web languages are being added for greater versatility."
      },
      {
        name: "PromptGenius",
        github: "https://github.com/Israeltesfaye/PromptGenius",
        status: "In Progress",
        description: "A fine-tuned AI API with a demo vanilla web page showcasing how to interact with the API. The backend is built using Node.js and Express. The project's future goal is to evolve into a prompt engineering website where users can share and discover prompt injection methods as templates."
      }
    ];
    
    let html = '<div class="section-title">⚔ My Projects ⚔</div>';
    
    projects.forEach(project => {
      html += `
        <div class="project-card">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            <a href="${project.github}" target="_blank">View on GitHub</a>
            <span class="project-status">Status: ${project.status}</span>
          </div>
        </div>
      `;
    });
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  async showContact() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const html = `
      <div class="section-title">⚔ Contact Me ⚔</div>
      <p>I'm always open to connecting with other developers and sharing ideas!</p>
      <br>
      <ul class="contact-list">
        <li><a href="mailto:israeltesfaye399@gmail.com">✉️ Email: israeltesfaye399@gmail.com</a></li>
        <li><a href="https://t.me/@Israel_tesfaye" target="_blank">📱 Telegram: @Israel_tesfaye</a></li>
        <li><a href="https://github.com/Israeltesfaye" target="_blank">💻 GitHub: @Israeltesfaye</a></li>
      </ul>
    `;
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  async listDirectory() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const directories = [
      { name: 'about/', icon: '📁', command: 'about' },
      { name: 'projects/', icon: '📁', command: 'projects' },
      { name: 'skills/', icon: '📁', command: 'skills' },
      { name: 'contact/', icon: '📁', command: 'contact' },
      { name: 'README.md', icon: '📄', command: 'about' }
    ];
    
    let html = '<div class="directory-list">';
    
    directories.forEach((dir, index) => {
      html += `<div class="directory-item" data-index="${index}">${dir.icon}</div>`;
    });
    
    html += '</div>';
    
    this.output.appendChild(outputDiv);
    outputDiv.innerHTML = html;
    
    // Type each directory item one by one
    for (let i = 0; i < directories.length; i++) {
      const dirItem = outputDiv.querySelector(`[data-index="${i}"]`);
      const typingText = document.createElement('span');
      typingText.className = 'typing-text';
      dirItem.appendChild(typingText);
      
      await this.typeText(` ${directories[i].name}`, typingText, 8);
      
      // Make it clickable after typing
      dirItem.style.cursor = 'pointer';
      dirItem.addEventListener('click', () => {
        this.input.value = directories[i].command;
        this.executeCommand(directories[i].command);
      });
    }
    
    return outputDiv;
  }
  
  async showUser() {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'command-output';
    
    const html = `
      israel-tesfaye<br>
      Full Stack Developer<br>
      Ethiopia
    `;
    
    this.output.appendChild(outputDiv);
    await this.typeHTML(html, outputDiv, 8);
    return outputDiv;
  }
  
  clearTerminal() {
    this.output.innerHTML = '';
    return null;
  }
  
  async showError(command) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    this.output.appendChild(errorDiv);
    await this.typeText(`Command not found: ${command}. Type 'help' for available commands.`, errorDiv, 8);
    return errorDiv;
  }
  
  async executeCommand(commandText) {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    const trimmedCommand = commandText.trim().toLowerCase();
    
    this.addCommandLine(commandText);
    
    if (!trimmedCommand) {
      this.isProcessing = false;
      return;
    }
    
    this.commandHistory.push(commandText);
    this.historyIndex = this.commandHistory.length;
    
    const command = this.commands[trimmedCommand];
    
    if (command) {
      await command.execute();
    } else {
      await this.showError(trimmedCommand);
    }
    
    this.autoScroll();
    this.isProcessing = false;
  }
  
  handleKeyDown(e) {
    if (this.isProcessing) return;
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const commandText = this.input.value;
      this.executeCommand(commandText);
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.commandHistory[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.input.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.input.value = '';
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Terminal();
});