// 4.3_edicao_med.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicamento";

async function editarMedicacao(evt) {
  evt.preventDefault();

  // coleta valores
  const idRaw     = document.getElementById("idMedicamento").value.trim();
  const nome      = document.getElementById("nome").value.trim();
  const desc      = document.getElementById("descricao").value.trim();
  const fab       = document.getElementById("fabricante").value.trim();
  const estoque   = document.getElementById("qtdeEstoque").value.trim();
  const minima    = document.getElementById("qtdeMinima").value.trim();
  const custo     = document.getElementById("vlrCusto").value.trim();
  const colat     = document.getElementById("colaterais").value.trim();
  const via       = document.getElementById("via").value.trim();
  const rawDate   = document.getElementById("validade").value.split("-");
  const validade  = `${rawDate[2]}/${rawDate[1]}/${rawDate[0]}`;

  const id = Number(idRaw);
  const msgDiv = document.getElementById("mensagemRetorno");
  msgDiv.textContent = "";

  // monta payload COM CHAVES CASE‐SENSITIVE
  const payload = {
    id_medicamento       : id,            // essa bind no WHERE está em minúsculo
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

  console.log("Payload enviado:", JSON.stringify(payload));

  try {
    const res = await fetch(API_URL, {
      method : "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    console.log("Resposta do PUT:", json);

    const texto  = json.p_retorno   || JSON.stringify(json);
    const status = Number(json.status_code || 0);

    alert(texto);
    msgDiv.textContent = texto;
    msgDiv.style.color = status === 200 ? "green" : "orangered";

    if (status === 200) evt.target.reset();
  }
  catch (err) {
    console.error(err);
    alert("❌ Erro na requisição: " + err.message);
    msgDiv.textContent = err.message;
    msgDiv.style.color = "red";
  }
}
