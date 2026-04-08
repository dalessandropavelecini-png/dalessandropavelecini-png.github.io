// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://cfkvgeqflspkdpoqeywu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNma3ZnZXFmbHNwa2Rwb3FleXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIxMzYsImV4cCI6MjA4OTg0ODEzNn0.8lqxuWfZ3Vw7FQX9HHhWtG3K5QWd_buKkCRHrfyF7ew";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela

  // 3. LOOP PARA DESENHAR CADA PRODUTO COM MÁSCARA DE MOEDA
  produtos.forEach((item) => {
    // Cria a máscara de moeda Brasileira (Ex: 15.5 vira R$ 15,50)
    let precoFormatado = Number(item.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let div = document.createElement("div");
    div.className = "card-produto";

    // Inserindo o HTML com o preço já formatado
    div.innerHTML = `
            <img src="${item.imagem_url}" width="150">
            <h3>${item.nome}</h3>
            <small>Categoria: ${item.categoria}</small>
            <p class="preco-destaque">${precoFormatado}</p>
        `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
