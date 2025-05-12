// Função para realizar login
function loginUser(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3003/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    })

    .then((response) => {
        if (!response.ok) throw new Error("Login falhou");
        return response.json();
    })
    .then((data) => {
        alert(data.message); // Exibe mensagem de sucesso
        window.location.href = "Dashboard.html"; // Redireciona para a dashboard
    })
    .catch((error) => {
        console.error(error);
        alert("Usuário ou senha inválidos. Tente novamente.");
    });
}

// Função para registrar usuário
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3003/register", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao cadastrar usuário");
        return response.json();
    })
    .then((data) => {
        alert(data.message);
        window.location.href = "Login.html";
    })
    .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar o usuário. Tente novamente.");
    });
}

// Função para buscar e exibir os usuários na dashboard
function loadUsers() {
    fetch("http://localhost:3003/users")
    .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        return response.json();
    })
.then((data) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Limpa a lista antes de adicionar
    data.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
        <span>${user.username}</span>
        <span class="badge bg-primary rounded-pill">ID: ${user.id}</span>
        `;
        userList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error(error);
        alert("Erro ao carregar usuários.");
    });
}

// Adiciona os eventos aos formulários, dependendo da página
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("Login.html")) {
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    }
    if (window.location.pathname.includes("RegistroADM.html")) {
        document.getElementById("registerForm").addEventListener("submit", registerUser);
    }
    if (window.location.pathname.includes("Dashboard.html")) {
        loadUsers();
    }
});




// Função para submeter o formulário de contato
function submitContato(event) {
    event.preventDefault();
    
    // Coleta os dados do formulário
    const contato = {
        nome: document.getElementById('nome').value,
        numero: document.getElementById('numero').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
    };

    // Validação simples para garantir que todos os campos foram preenchidos
    if (!contato.nome || !contato.numero || !contato.email || !contato.mensagem) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Envia os dados do contato para a API
    fetch("http://localhost:3003/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contato)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao registrar contato');
        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = "/public/Login.html"; // Redireciona após o sucesso
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao registrar contato. Tente novamente.");
    });
}


// Função para submeter o formulário de contato
document.getElementById('contatoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const contato = {
        nome: document.getElementById('nome').value,
        numero: document.getElementById('numero').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
    };

    // Validação simples para garantir que todos os campos foram preenchidos
    if (!contato.nome || !contato.numero || !contato.email || !contato.mensagem) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Envia os dados do contato para a API
    fetch("http://localhost:3003/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contato)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao registrar contato');
        return response.json();
    })
    .then(data => {
        document.getElementById('status').textContent = data.message;
        loadContatos(); // Atualiza a lista de contatos após o envio
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao registrar contato. Tente novamente.");
    });
});

// Função para carregar os contatos registrados
function loadContatos() {
    fetch("http://localhost:3003/contato")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar contatos");
        return response.json();
    })
    .then(data => {
        const contatosList = document.getElementById('contatosList');
        contatosList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens
        
        data.forEach(contato => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <h5>${contato.nome}</h5>
                <p>Email: ${contato.email}<br>
                Número: ${contato.numero}<br>
                Mensagem: ${contato.mensagem}<br>
                Enviado em: ${new Date(contato.data_envio).toLocaleString()}</p>
            `;
            contatosList.appendChild(listItem);
        });
    })


// Carregar os contatos ao carregar a página
window.onload = loadContatos;





function loadcontatos() {
    fetch("http://localhost:3003/contato")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar contatos");
        return response.json();
    })
    .then(data => {
        const contatosList = document.getElementById('contatosList');
        
        data.forEach(contato => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <h5>${contato.nome}</h5>
                <p>Email: ${contato.email}<br>
                Número: ${contato.numero}<br>
                Mensagem: ${contato.mensagem}<br>
                Enviado em: ${new Date(contato.data_envio).toLocaleString()}</p>
            `;
            contatosList.appendChild(listItem);
        });
    })


// Chame a função quando a página carregar
document.addEventListener('DOMContentLoaded', loadcontatos);





// Função para carregar os contatos registrados
function loadContatos() {
    fetch("http://localhost:3003/contato")
    .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar contatos");
        return response.json();
    })
    .then(data => {
        const contatosList = document.getElementById('contatosList');
        contatosList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens
        
        data.forEach(contato => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = `
                <h5>${contato.nome}</h5>
                <p>Email: ${contato.email}<br>
                Número: ${contato.numero}<br>
                Mensagem: ${contato.mensagem}<br>
                Enviado em: ${new Date(contato.data_envio).toLocaleString()}</p>
            `;
            contatosList.appendChild(listItem);
        });
    })
}

// Carregar os contatos ao carregar a página
document.addEventListener('DOMContentLoaded', loadContatos);
}}








document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contatoForm");

    if (!form) {
        console.error("Formulário não encontrado.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // Impede o envio tradicional do formulário

        // Coletando os dados do formulário
        const data = {
            nome: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            petName: document.getElementById("pet-name").value.trim(),
            petAge: document.getElementById("pet-age").value.trim(),
            petSpecies: document.getElementById("pet-species").value.trim(),
            message: document.getElementById("message").value.trim(),
        };

        try {
            // Enviando os dados para o servidor via fetch
            const response = await fetch("http://localhost:3003/agendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // Exibe mensagem de sucesso
                form.reset(); // Limpa o formulário após sucesso
            } else {
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao tentar agendar a consulta.");
        }
    });
});







