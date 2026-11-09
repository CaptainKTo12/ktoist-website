
// ============================================
// KTO PERSONAL TERMINAL
// COMMAND SYSTEM
// ============================================

const terminal = document.getElementById("terminal");

// CREATE NEW PROMPT
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

// SHOW TERMINAL OUTPUT
function showOutput(message) {
    const output = document.createElement("div");
    output.className = "terminal-output";
    output.textContent = message;
    terminal.appendChild(output);
}

// COMMAND HANDLER
function runCommand(command) {
    const parts = command.trim().split(/\s+/);
    const action = parts[0].toLowerCase();
    const argument = parts[1];

    switch (action) {

        // CLEAR TERMINAL
        case "/clear":
            terminal.innerHTML = "";
            createNewPrompt();
            break;

        // CHANGE TERMINAL COLOR
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

        // HELP COMMAND
        case "/help":
            showOutput(
`AVAILABLE COMMANDS:

/clear                  Clear terminal history
/changecolor #hex       Change terminal text color
/generate a catboy      Generate a catboy
/doom                   Launch DOOM
/help                   Display this command list`
            );
            break;

        // GENERATE A CATBOY
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

        // LAUNCH DOOM
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
        // RANDOM TEXT
        default:
            // Random text is allowed. No error message.
            break;
    }
}

// HANDLE ENTER KEY
terminal.addEventListener("keydown", function(event) {
    if (event.key !== "Enter") return;

    const input = event.target;

    if (!input.classList.contains("terminal-input")) return;

    event.preventDefault();

    const command = input.value.trim();

    // EMPTY INPUT
    if (!command) {
        input.closest(".terminal-line").remove();
        createNewPrompt();
        return;
    }

    // PRESERVE TYPED TEXT
    const typedCommand = document.createElement("span");
    typedCommand.className = "terminal-command";
    typedCommand.textContent = command;

    input.replaceWith(typedCommand);

    // EXECUTE COMMAND
    runCommand(command);

    // CREATE NEXT PROMPT
    if (command.toLowerCase() !== "/clear") {
        createNewPrompt();
    }
});

// INITIALIZE TERMINAL
const firstInput = terminal.querySelector(".terminal-input");

if (firstInput) {
    firstInput.focus();
}
