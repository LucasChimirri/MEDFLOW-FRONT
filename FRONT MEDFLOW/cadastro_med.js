// URL do RESTful Service
const API_URL = "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicamento";

document.getElementById("cadForm").addEventListener("submit", async function(evt) {
  evt.preventDefault();

  // Lê valor dos campos
  const nome     = document.getElementById("nome").value;
  const desc     = document.getElementById("descricao").value;
  const fab      = document.getElementById("fabricante").value;
  const estoque  = document.getElementById("qtdeEstoque").value;
  const minima   = document.getElementById("qtdeMinima").value;
  const custo    = document.getElementById("vlrCusto").value;
  const colat    = document.getElementById("colaterais").value;
  const via      = document.getElementById("via").value;
  const rawDate  = document.getElementById("validade").value; // "YYYY-MM-DD"

  // Converte para "DD/MM/YYYY"
  const [yyyy, mm, dd] = rawDate.split("-");
  const validade = `${dd}/${mm}/${yyyy}`;

  // Monta o JSON conforme o exemplo
  const payload = {
    NOME_MEDICAMENTO     : nome,
    DESCRICAO            : desc,
    ID_FABRICANTE        : fab,
    QTDE_ESTOQUE         : estoque,
    QTDE_MINIMA          : minima,
    VLR_CUSTO            : custo,
    DESCRICAO_COLATERAIS : colat,
    ID_VIA               : via,
    DATA_VALIDADE        : validade
  };

  try {
    const resp = await fetch(API_URL, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify(payload)
    });

    if (!resp.ok) throw new Error(`Status ${resp.status}`);
    const data = await resp.json();

    alert("Medicação cadastrada com sucesso!");
    this.reset(); // limpa o formulário

  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar medicação: " + err.message);
  }
});
