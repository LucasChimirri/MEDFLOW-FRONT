// 4.3_edicao_med.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicamento";

async function editarMedicacao(evt) {
  evt.preventDefault();

  // 1) Lê campos do form
  const id      = document.getElementById("idMedicamento").value.trim();
  const nome    = document.getElementById("nome").value.trim();
  const desc    = document.getElementById("descricao").value.trim();
  const fab     = document.getElementById("fabricante").value.trim();
  const estoque = document.getElementById("qtdeEstoque").value.trim();
  const minima  = document.getElementById("qtdeMinima").value.trim();
  const custo   = document.getElementById("vlrCusto").value.trim();
  const colat   = document.getElementById("colaterais").value.trim();
  const via     = document.getElementById("via").value.trim();
  const raw     = document.getElementById("validade").value.split("-");
  const validade = raw.length === 3
    ? `${raw[2]}/${raw[1]}/${raw[0]}`
    : document.getElementById("validade").value;

  const msgDiv = document.getElementById("mensagemRetorno");
  msgDiv.textContent = "";

  // 2) Monta payload
  const payload = {
    ID_MEDICAMENTO       : Number(id),
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
    // 3) Chama serviço via PUT
    const res  = await fetch(API_URL, {
      method : "PUT",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify(payload)
    });

    // 4) Lê o texto puro que vem de :p_retorno
    const texto = (await res.text()).trim();

    // 5) Exibe em popup
    alert(texto);

    // 6) Exibe na página
    msgDiv.textContent = texto;
    msgDiv.style.color = texto.toLowerCase().includes("sucesso")
      ? "green"
      : "orangered";

    // Opcional: em caso de sucesso limpamos o form
    if (texto.toLowerCase().includes("sucesso")) {
      evt.target.reset();
    }
  }
  catch (err) {
    console.error(err);
    alert("❌ Erro na requisição: " + err.message);
    msgDiv.textContent = "Erro: " + err.message;
    msgDiv.style.color = "red";
  }
}
