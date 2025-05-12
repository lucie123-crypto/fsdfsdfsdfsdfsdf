const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_db",
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        throw err;
    }
    console.log("Conectado ao banco de dados!");
});

// Rota para criar um novo usuário
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Verificar se username ou password estão vazios
    if (!username || !password) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Erro ao registrar usuário:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usuário registrado com sucesso!" });
    });
});

// Rota para login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Erro ao realizar login", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json({ message: "Login bem-sucedido!" }); // Login válido
        } else {
            res.status(401).json({ message: "Credenciais inválidas!" }); // Falha no login
        }
    });
});

// Rota para obter todos os usuários
app.get("/users", (req, res) => {
    const sql = "SELECT id, username FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao obter usuários:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Retorna os usuários encontrados
    });
});

// Rota para criar um novo contato
app.post("/contato", (req, res) => {
    const { nome, numero, email, mensagem } = req.body;

    if (!nome || !numero || !email || !mensagem) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const sql = "INSERT INTO contato (nome, email, numero, mensagem) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, email, numero, mensagem], (err, result) => {
        if (err) {
            console.error("Erro ao registrar contato:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Contato registrado com sucesso!" });
    });
});
// Rota para obter todos os contatos
app.get("/contato", (req, res) => {
    const sql = "SELECT * FROM contato ORDER BY data_envio DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar contatos:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Retorna os contatos encontrados
    });
});













// Rota POST para agendar consulta
app.post('agendar', (req, res) => {
    const { nome, email, petName, petAge, petSpecies, message } = req.body;
  
    console.log("Dados recebidos:", req.body);
  
    const query = `
      INSERT INTO consulta (nome, email, nome_pet, idade_pet, especie, mensagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, email, petName, petAge, petSpecies, message];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err);
        return res.status(500).json({ message: 'Erro ao tentar agendar a consulta.' });
      }
  
      console.log('Consulta agendada com sucesso:', result);
      return res.status(200).json({ message: 'Consulta agendada com sucesso!' });
    });
  });
  




// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});