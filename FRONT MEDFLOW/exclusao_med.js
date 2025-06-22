// exclusao_med.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicamento";

async function excluirMedicacao(evt) {
  evt.preventDefault();

  const idRaw = document.getElementById("idMedicamento").value.trim();
  const id = Number(idRaw);
  const msgDiv = document.getElementById("mensagemRetorno");
  msgDiv.textContent = "";
  msgDiv.style.color = "";

  if (!id) {
    alert("Informe um ID válido para excluir.");
    return;
  }

  try {
    console.log("Enviando DELETE com p_id_medicamento:", id);
    const res = await fetch(`${API_URL}?p_id_medicamento=${id}`, {
      method: "DELETE"
    });

    const json = await res.json();
    console.log("Resposta do DELETE:", json);

    const retorno = json.p_retorno || "Sem resposta do servidor.";
    const status = Number(json.status_code || 0);

    alert(retorno);
    msgDiv.textContent = retorno;
    msgDiv.style.color = status === 200 ? "green" : "orangered";

    if (status === 200) evt.target.reset();
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("❌ Erro na exclusão: " + err.message);
    msgDiv.textContent = "Erro: " + err.message;
    msgDiv.style.color = "red";
  }
}
