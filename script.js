document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#ticket-form");
    const fileInput = document.querySelector("#profile-pic");
    const ticketSection = document.querySelector("#ticket");
    const fileNameDisplay = document.querySelector("#file-name");

    const MAX_FILE_SIZE = 500 * 1024;

    form.addEventListener("submit", handleFormSubmit);
    fileInput.addEventListener("change", updateFileName);

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = form["full-name"].value.trim();
        const email = form["email"].value.trim();
        const github = form["github-username"].value.trim();
        const file = fileInput.files[0];
        clearErrors();

        if (!validateFields(name, email, github, file)) return;
        generateTicket(name, email, github, file);
    }

    function validateFields(name, email, github, file) {
        let isValid = true;

        if (!name) {
            showError("#name-error", "Nome é obrigatório.");
            isValid = false;
        }

        if (!email || !isValidEmail(email)) {
            showError("#email-error", "E-mail inválido.");
            isValid = false;
        }

        if (!github) {
            showError("#github-error", "Usuário do GitHub é obrigatório.");
            isValid = false;
        } else {
            if (!github.startswith("@")){
                github = "@" + github;
            }
        }
        
        if (!file) {
            showError("#image-error", "A imagem de perfil é obrigatória.");
            isValid = false;
        } else if (!file.type.startsWith("image/")) {
            showError("#image-error", "O arquivo deve ser uma imagem.");
            isValid = false;
        } else if (file.size > MAX_FILE_SIZE) {
            showError("#image-error", `A imagem deve ter no máximo ${MAX_FILE_SIZE / (500 * 1024)}MB.`);
            isValid = false;
        }

        return isValid;
    }

    function generateTicket(name, email, github, file) {
        document.querySelector("#ticket-name").textContent = name;
        document.querySelector("#ticket-email").textContent = email;
        document.querySelector("#ticket-github").textContent = "@" + github;

        const imgElement = document.querySelector("#ticket-img");
        const reader = new FileReader();

        reader.onload = (e) => {
            imgElement.src = e.target.result;
            imgElement.classList.add("show");
        };

        reader.readAsDataURL(file);

        ticketSection.classList.remove("hidden");
    }

    function clearErrors() {
        document.querySelectorAll(".error-message").forEach(error => error.textContent = "");
    }

    function showError(selector, message) {
        document.querySelector(selector).textContent = message;
    }

    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function updateFileName() {
        fileNameDisplay.textContent = this.files.length > 0 ? `Arquivo selecionado: ${this.files[0].name}` : "";
    }
});
