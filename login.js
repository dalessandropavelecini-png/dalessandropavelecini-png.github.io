const supabaseUrl = "https://cfkvgeqflspkdpoqeywu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNma3ZnZXFmbHNwa2Rwb3FleXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIxMzYsImV4cCI6MjA4OTg0ODEzNn0.8lqxuWfZ3Vw7FQX9HHhWtG3K5QWd_buKkCRHrfyF7ew";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- DESAFIO 1: ATALHO DO TECLADO ---
// Seleciona o campo de senha e escuta por teclas pressionadas
document
  .getElementById("password")
  .addEventListener("keydown", function (event) {
    // Verifica se a tecla pressionada foi o "Enter"
    if (event.key === "Enter") {
      event.preventDefault(); // Evita comportamentos padrão do navegador
      fazerLogin(); // Dispara a função de login
    }
  });
// ------------------------------------

function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈";
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️";
  }
}

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  if (!email || !password) {
    msg.innerText = "Preencha todos os campos!";
    msg.style.color = "yellow";
    return;
  }

  // Efeito de carregamento
  btn.innerText = "Verificando...";
  btn.disabled = true;

  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false;
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}
