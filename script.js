const output = document.getElementById("output");
const input = document.getElementById("input");
const boot = document.getElementById("boot");

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

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
    "",
];

const commands = {
    whoami: "Jean-Michel Bertin\nCybersecurity & Embedded Software Engineer",
    bio: `Passionate programmer focused on systems architecture, offensive security, and applied AI.
    Top 1% in the global 42 Network and valedictorian at 42 Nice.
    Driven by innovation, low-level optimization, and secure-by-design principles.
    Always exploring new technologies and pushing boundaries.`,
    skills: `- Systems Administration (Linux, Docker, Proxmox)\n- Cybersecurity / Pentesting\n- Web Development (Fullstack)\n- Embedded Software / Low-level Dev\n- Game Dev & Robotics (Arduino, RPi)\n- DevSecOps & CI/CD tools`,
    languages: `- French (native)\n- English (fluent)\n- C, Python, JavaScript`,
    experience: `2025 – now: DevSecOps Engineer @ Thales\n2024 – now: Coding Instructor @ Tio Code School\n2024: CISO @ Somanity\n2018 – 2023: Head of Canine Unit, Police Training @ City of Nice\n2004 – 2017: Surveillance & Video Ops @ City of Nice`,
    education: `2025 – 42 Nice, Master Level (RNCP VII)\n  - Info Systems & Networks\n  - Data & Database Architecture\n2024 – 42 Nice, Bachelor Level (RNCP VI)\n  - Web & Mobile Development\n  - Software Engineering\nTop 1% performer globally - 42 Network`,
    certifications: `- CEH (CISCO), 2023\n- Google Cybersecurity, 2023\n- BPI France Cybersecurity, 2023`,
    contact: `📍 Carros, France\n📞 +33 7 69 72 94 35\n✉️ jeanmichel.bertin42@gmail.com\n🔗 LinkedIn: linkedin.com/in/jean-michel-bertin42\n💻 GitHub: github.com/jmbertin`,
    help: "Available commands:\nwhoami, bio, skills, experience, education, certifications, languages, contact, clear, auto, download",
    clear: "",
    auto: "Starting automatic showcase...\n",
    download: "Preparing PDF download...",
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
    if (cmd.toLowerCase() === "clear") {
        output.innerText = "";
    } else if (cmd.toLowerCase() === "auto") {
        print(commands[cmd]);
        runAutoShowcase();
    } else if (cmd.toLowerCase() === "download") {
        print(commands[cmd]);
        const link = document.createElement("a");
        link.href = "CV-Jean-Michel-Bertin.pdf";
        link.download = "CV-Jean-Michel-Bertin.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        print("Download started: CV-Jean-Michel-Bertin.pdf");
    } else {
        print(commands[cmd] || `Unknown command: ${cmd}\nType 'help' to list available commands.`
        );
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
        await new Promise((r) => setTimeout(r, 100));
    }
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    input.disabled = false;
    input.focus();
}

async function showBootSequence() {
    for (let i = 0; i < bootLines.length - 1; i++) {
        boot.innerText += bootLines[i] + "\n";
        const delay = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
        await new Promise((r) => setTimeout(r, delay));
    }

    boot.innerHTML += "Login: <span id='login-input'></span><span class='cursor'>|</span>";

    const loginInput = document.getElementById("login-input");
    const username = "jmbertin";

    await new Promise((r) => setTimeout(r, 1000));

    for (let i = 0; i < username.length; i++) {
        loginInput.innerText += username[i];
        await new Promise((r) => setTimeout(r, 150));
    }

    await new Promise((r) => setTimeout(r, 2000));

    document.querySelector(".cursor").remove();

    boot.style.display = "none";
    document.getElementById("terminal").style.display = "block";

    const now = new Date().toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    });
    print(`Last login: ${now} on tty1`);
    print("Welcome to jmbertin's terminal. Type 'help' to list available commands or 'auto' to run automatic showcase.");
    if (isMobile) {
        const btn = document.createElement("button");
        btn.id = "auto-btn";
        btn.innerText = "▶";
        btn.onclick = () => {
            btn.remove();
            simulateCommand("auto");
        };
        document.body.appendChild(btn);

        const tip = document.createElement("div");
        tip.id = "auto-tip";
        tip.innerText = "Tap ▶ to run the demo";
        document.body.appendChild(tip);

        setTimeout(() => tip.remove(), 4000);
    }
}

async function runAutoShowcase() {
    const sequence = [
        "whoami",
        "bio",
        "skills",
        "experience",
        "education",
        "certifications",
        "languages",
        "contact",
        "download",
    ];
    for (const cmd of sequence) {
        await new Promise((r) => setTimeout(r, 1500));
        await simulateCommand(cmd);
    }
}

window.onload = () => {
  if (isMobile) {
    const warning = document.getElementById("mobile-warning");
    warning.style.display = "flex";

    setTimeout(() => {
      warning.style.display = "none";
      showBootSequence();
    }, 4000);
  } else {
    showBootSequence();
  }
};
