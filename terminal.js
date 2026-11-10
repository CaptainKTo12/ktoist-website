const terminal = document.getElementById("terminal");

function createNewPrompt() {
    const newLine = document.createElement("div");
    newLine.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.textContent = "root@personal-node:~$";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Terminal input");

    newLine.appendChild(prompt);
    newLine.appendChild(input);

    terminal.appendChild(newLine);
    input.focus();
}

function showOutput(message) {
    const output = document.createElement("div");
    output.className = "terminal-output";
    output.textContent = message;
    terminal.appendChild(output);
}

function runCommand(command) {
    const parts = command.trim().split(/\s+/);
    const action = parts[0].toLowerCase();
    const argument = parts[1];

    switch (action) {

        case "/clear":
            terminal.innerHTML = "";
            createNewPrompt();
            break;

        case "/changecolor":
            if (!argument) {
                showOutput("Usage: /changecolor #hexcode");
                break;
            }

            if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(argument)) {
                showOutput("ERROR: Invalid hex color. Example: /changecolor #00ff00");
                break;
            }

            terminal.style.setProperty("--terminal-color", argument);
            showOutput("Terminal color changed to " + argument);
            break;
            case "/minecraft": {

    const minecraftWindow = document.getElementById("minecraft-window");
    const minecraftFrame = document.getElementById("minecraft-iframe");

    if (!minecraftWindow || !minecraftFrame) {
        showOutput("ERROR: Minecraft window not found.");
        break;
    }

    minecraftWindow.style.display = "block";
    minecraftWindow.style.zIndex = ++highestWindow;

    if (!minecraftFrame.src || minecraftFrame.src === "about:blank") {
        minecraftFrame.src = minecraftFrame.dataset.src;
    }

    showOutput("Launching Minecraft Classic...");

    break;
}

        case "/help":
            showOutput(
`AVAILABLE COMMANDS:

/clear                  Clear terminal history
/changecolor #hex       Change terminal text color
/generate a catboy      Generate a catboy
/minecraft              Play Minecraft
/help                   Display this command list`
            );
            break;

        case "/generate":
            if (parts.slice(1).join(" ").toLowerCase() === "a catboy") {
                showOutput(`⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠔⡅⢣⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢸⢢⡈⢐⣤⣤⣶⣶⣶⣶⣶⣿⣽⣙⣤⡇⠀⠀⠀⠀⠀
⠀⠀⠀⢼⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀
⠀⠀⠒⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡒⠁⠀⠀
⠀⢐⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡦⡀⠀⠀
⠠⠋⣼⣿⣿⣿⡿⣟⣧⢬⣿⣹⠟⠋⣷⣆⠈⣿⣿⣿⡟⠂⠀⠀
⠀⠀⢿⢻⣿⠁⠼⠋⣼⣿⡎⠀⠀⠀⠯⠽⠀⢹⣿⡟⠓⠀⠀⠀
⠀⠀⠀⢸⢹⣇⠐⠂⠙⠴⠃⠀⠀⠀⠀⠀⠀⢸⡏⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⡿⣆⠀⠀⠀⠀⠀⣀⠀⠀⠀⣠⣾⠤⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⡿⣿⣶⣦⣤⡤⠀⠀⢶⡿⠿⠓⠂⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⢙⣻⡋⠁⠀⠀⡀⠽⠓⠒⠠⢄⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡠⠂⠁⠉⠙⠁⠀⠈⠀⠀⠀⠀⠀⠀⠐⡀⠀⠀
⠀⠀⠀⠀⠀⠰⠅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⡇⠀⠀
⠀⠀⠀⠀⠀⡆⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⢠⠖⠀⠀⢸⠀⠀
⠀⠀⠀⠀⢰⠀⠀⢸⡟⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⡾⡆⠀
⠀⠀⠀⠀⡌⠀⠀⢸⠁⠀⠀⠀⠀⠀⢀⠞⠀⠸⡀⣀⠠⢔⠁⠀
⠀⠀⠀⠀⢢⠄⠔⢻⠀⠀⠀⠀⣠⠖⠀⠀⠀⠈⡏⠀⠀⠸⡀⠀
⠀⠀⠀⠀⠈⠀⠀⡆⠀⠀⠀⠜⠁⠀⠀⠀⠀⠀⢱⠀⠀⠀⡇⠀
⠀⠀⠀⠀⠀⠀⢨⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢆⠀⠀⢘⡀`);
            } else {
                showOutput("Usage: /generate a catboy");
            }
            break;

        case "/doom": {
    const doomWindow = document.getElementById("doom-window");

    if (!doomWindow) {
        showOutput("ERROR: DOOM window not found.");
        break;
    }

    doomWindow.classList.add("open");
    doomWindow.style.zIndex = ++highestWindow;

    window.open(
        "https://dos.zone/doom-dec-1993/",
        "_blank",
        "noopener,noreferrer"
    );

    showOutput("DOOM.EXE launched in a new tab.");
    break;
}
        default:
            break;
    }
}

terminal.addEventListener("keydown", function(event) {
    if (event.key !== "Enter") return;

    const input = event.target;

    if (!input.classList.contains("terminal-input")) return;

    event.preventDefault();

    const command = input.value.trim();

    if (!command) {
        input.closest(".terminal-line").remove();
        createNewPrompt();
        return;
    }

    const typedCommand = document.createElement("span");
    typedCommand.className = "terminal-command";
    typedCommand.textContent = command;

    input.replaceWith(typedCommand);

    runCommand(command);

    if (command.toLowerCase() !== "/clear") {
        createNewPrompt();
    }
});

const firstInput = terminal.querySelector(".terminal-input");

if (firstInput) {
    firstInput.focus();
}

function closeMinecraft() {

    const minecraftWindow = document.getElementById("minecraft-window");
    const minecraftFrame = document.getElementById("minecraft-iframe");

    minecraftWindow.style.display = "none";

    // Stop Minecraft completely
    minecraftFrame.src = "about:blank";
}

const firstInput = terminal.querySelector(".terminal-input");

if (firstInput) {
    firstInput.focus();
}
