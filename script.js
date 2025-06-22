const output = document.getElementById("output");
const input = document.getElementById("input");
const boot = document.getElementById("boot");

const bootLines = [
  "PhoenixBIOS 4.0 Release 6.0     ",
  "Copyright 1985-2001 Phoenix Technologies Ltd.",
  "CPU = Intel(R) Core(TM) i7 CPU",
  "Memory Test : 8192K OK",
  "Detecting IDE drives...",
  "Primary Master: ST31000528AS",
  "Primary Slave: None",
  "Secondary Master: TSSTcorp CDDVDW",
  "Secondary Slave: None",
  "Keyboard Detected",
  "Starting GRUB...",
  "Booting Linux 5.15.0-91-generic...",
  "[ OK ] Mounted /",
  "[ OK ] Started Network Manager",
  "[ OK ] Started Hostname Service",
  "[ OK ] Reached Target Graphical Interface",
  ""
];

const commands = {
    "auto": "Starting automatic showcase...\n",
    "whoami": "Jean-Michel Cateregardepas\nAdministrateur Système / Cybersécurité",
    "skills": `- Linux / Windows Server\n- Virtualisation (Proxmox, VMware)\n- Sécurité réseau\n- Audits & Pentest\n- Scripting Bash / PowerShell / Python`,
    "experience": `2023–2025 : Admin Systèmes – Collectivité\n2020–2023 : Technicien réseau – ESN`,
    "certifications": `- CEH\n- ECSA\n- Bac+5 Sécurité des SI`,
    "contact": "Mail : jm@example.com\nLinkedIn : linkedin.com/in/jmcatere",
    "help": "Commands : whoami, skills, experience, certifications, contact, clear",
    "clear": ""
};


function print(text) {
  text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (text.startsWith("jmbertin@github.com:~$")) {
    const parts = text.split("$");
    output.innerHTML += `<span class="prompt">${parts[0]}$</span>${parts[1]}\n`;
  } else {
    output.innerHTML += text + "\n";
  }
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cmd = input.value.trim();
        print(`jmbertin@github.com:~$ ${cmd}`);
    if (cmd === "clear") {
        output.innerText = "";
    } else if (cmd === "auto") {
        print(commands[cmd]);
        runAutoShowcase();
    } else {
        print(commands[cmd] || `Unknown command: ${cmd}\nType 'help' to list available commands.`);
    }
    input.value = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
});

async function simulateCommand(cmd) {
  input.disabled = true;
  input.value = "";
  for (let i = 0; i < cmd.length; i++) {
    input.value += cmd[i];
    await new Promise(r => setTimeout(r, 100));
  }
  input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  input.disabled = false;
  input.focus();
}

async function showBootSequence() {
  for (let i = 0; i < bootLines.length - 1; i++) {
    boot.innerText += bootLines[i] + "\n";
    const delay = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
    await new Promise(r => setTimeout(r, delay));
  }

  boot.innerHTML += "Login: <span id='login-input'></span><span class='cursor'>|</span>";

  const loginInput = document.getElementById("login-input");
  const username = "jmbertin";

  for (let i = 0; i < username.length; i++) {
    loginInput.innerText += username[i];
    await new Promise(r => setTimeout(r, 150));
  }

  await new Promise(r => setTimeout(r, 2000));

  document.querySelector(".cursor").remove();

  boot.style.display = "none";
  document.getElementById("terminal").style.display = "block";

  const now = new Date().toString();
  print(`Last login: ${now} on tty1`);
  print("Welcome to jmbertin's terminal. Type 'help' to list available commands or 'auto' to run automatic showcase.");
}

async function runAutoShowcase() {
  const sequence = ["whoami", "skills", "experience", "certifications", "contact"];
  for (const cmd of sequence) {
    await new Promise(r => setTimeout(r, 1000));
    await simulateCommand(cmd);
  }
}


window.onload = showBootSequence;
