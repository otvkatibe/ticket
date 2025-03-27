document.getElementById('ticket-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const github = document.getElementById('github-username').value.trim();
    const fileInput = document.getElementById('profile-pic');
    const ticketSection = document.getElementById('ticket');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const githubError = document.getElementById('github-error');
    const imageError = document.getElementById('image-error');

    [nameError, emailError, githubError, imageError].forEach(el => el.textContent = "");

    let hasError = false;

    if (name === "") {
        nameError.textContent = "Nome é obrigatório.";
        hasError = true;
    }
    if (email === "" || !validateEmail(email)) {
        emailError.textContent = "E-mail inválido.";
        hasError = true;
    }
    if (github === "") {
        githubError.textContent = "Usuário do GitHub é obrigatório.";
        hasError = true;
    }
    else if (!github.includes('@')) {
        githubError.textContent = "Usuário do GitHub deve conter '@'.";
        hasError = true;
    }

    if (fileInput.files.length === 0) {
        imageError.textContent = "A imagem de perfil é obrigatória.";
        hasError = true;
    }

    if (hasError) return;

    document.getElementById('ticket-name').textContent = name;
    document.getElementById('ticket-email').textContent = email;
    document.getElementById('ticket-github').textContent = github;

    const imgElement = document.getElementById('ticket-img');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        if (!file.type.startsWith('image/')) {
            imageError.textContent = "O arquivo deve ser uma imagem.";
            return;
        }
        if (file.size > 500 * 1024) {
            imageError.textContent = "A imagem deve ter no máximo 500KB.";
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            imgElement.src = e.target.result;
            imgElement.classList.add('show');
        };
        reader.readAsDataURL(file);
    } else {
        imgElement.classList.remove('show');
    }

    ticketSection.classList.remove('hidden');
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('profile-pic').addEventListener('change', function() {
    const fileNameDisplay = document.getElementById('file-name');
    if (this.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
    } else {
        fileNameDisplay.textContent = "";
    }
});
