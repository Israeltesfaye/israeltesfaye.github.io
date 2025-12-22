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

const commands = {
  help: {
    description: "Show all available commands",
    execute: () => {
      return `
        <div class="command-output">
          <div class="section-title">Available Commands</div>
          <div class="command-list">
            ${Object.entries(commands).map(([name, cmd]) => `
              <div class="command-item">
                <div class="command-name">${name}</div>
                <div class="command-desc">${cmd.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  },

  about: {
    description: "Learn about me",
    execute: () => {
      return `
        <div class="command-output">
          <div class="section-title">About Me</div>
          <p>I'm a passionate developer who thrives on learning and creating. My current focus is on web development, but I'm always exploring new technologies and eager to expand my skills into other areas of software engineering.</p>
          <p>I believe that a strong foundation in coding principles is essential for building innovative solutions, regardless of the platform.</p>
          <br>
          <p><strong>Connect with me:</strong></p>
          <ul class="contact-list">
            <li><a href="https://t.me/@Israel_tesfaye" target="_blank">📱 Telegram</a></li>
            <li><a href="https://github.com/Israeltesfaye" target="_blank">💻 GitHub</a></li>
          </ul>
        </div>
      `;
    }
  },

  skills: {
    description: "View my technical skills",
    execute: () => {
      return `
        <div class="command-output">
          <div class="section-title">Technical Skills</div>

          <div class="skill-category">
            <h3>Web Development</h3>
            <ul class="skill-list">
              <li>HTML, CSS, JavaScript</li>
              <li>React - Building dynamic user interfaces</li>
              <li>Node.js - Server-side development</li>
            </ul>
          </div>

          <div class="skill-category">
            <h3>Beyond the Web</h3>
            <ul class="skill-list">
              <li>Python - Learning versatile programming</li>
              <li>Data Structures & Algorithms</li>
            </ul>
          </div>

          <div class="skill-category">
            <h3>Tools & Methodologies</h3>
            <ul class="skill-list">
              <li>Git & GitHub - Version control</li>
              <li>Agile Methodologies - Team collaboration</li>
            </ul>
          </div>
        </div>
      `;
    }
  },

  projects: {
    description: "Explore my projects",
    execute: () => {
      return `
        <div class="command-output">
          <div class="section-title">My Projects</div>
          ${projects.map(project => `
            <div class="project-card">
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <div class="project-meta">
                <a href="${project.github}" target="_blank">View on GitHub</a>
                <span class="project-status">Status: ${project.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  },

  contact: {
    description: "Get in touch with me",
    execute: () => {
      return `
        <div class="command-output">
          <div class="section-title">Contact Me</div>
          <p>I'm always open to connecting with other developers and sharing ideas!</p>
          <br>
          <ul class="contact-list">
            <li><a href="mailto:israeltesfaye399@gmail.com">✉️ Email: israeltesfaye399@gmail.com</a></li>
            <li><a href="https://t.me/@Israel_tesfaye" target="_blank">📱 Telegram: @Israel_tesfaye</a></li>
            <li><a href="https://github.com/Israeltesfaye" target="_blank">💻 GitHub: @Israeltesfaye</a></li>
          </ul>
        </div>
      `;
    }
  },

  clear: {
    description: "Clear the terminal",
    execute: () => {
      document.getElementById('output').innerHTML = '';
      return '';
    }
  }
};

const input = document.getElementById('command-input');
const output = document.getElementById('output');
const terminalContent = document.querySelector('.terminal-content');

function autoScroll() {
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

function typeWriter(element, text, speed = 30) {
  return new Promise((resolve) => {
    let index = 0;
    element.textContent = '';

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}

function executeCommand(commandText) {
  const trimmedCommand = commandText.trim().toLowerCase();

  const historyDiv = document.createElement('div');
  historyDiv.className = 'command-history';
  historyDiv.innerHTML = `<span class="prompt">israel@portfolio:~$</span> <span class="command">${commandText}</span>`;
  output.appendChild(historyDiv);

  autoScroll();

  if (!trimmedCommand) {
    return;
  }

  const command = commands[trimmedCommand];

  if (command) {
    const result = command.execute();
    if (result) {
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = result;
      output.appendChild(resultDiv);
    }
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
    output.appendChild(errorDiv);
  }

  setTimeout(autoScroll, 100);
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const commandText = input.value;
    executeCommand(commandText);
    input.value = '';
  }
});

document.addEventListener('click', () => {
  input.focus();
});

window.addEventListener('load', () => {
  autoScroll();
  input.focus();
});
