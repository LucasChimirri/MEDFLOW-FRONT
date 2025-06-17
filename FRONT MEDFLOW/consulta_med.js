// consulta.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicamento";

document.getElementById("btnBuscar").addEventListener("click", async () => {
  const id = document.getElementById("idMedicamento").value.trim();
  if (!id) {
    alert("Informe um ID de medicamento.");
    return;
  }

  try {
    const res  = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    console.log(json);   
    // o “envelope” vem com items[], tiramos o primeiro registro
    const rec  = Array.isArray(json.items) ? json.items[0] : json;

    if (!rec) {
      alert("Medicamento não encontrado.");
      return;
    }

    // **Ajuste: todas as props em minúsculo + underscore**
    document.getElementById("resId").value       = rec.id_medicamento;
    document.getElementById("resNome").value     = rec.nome_medicamento;
    document.getElementById("resDesc").value     = rec.descricao_uso;
    document.getElementById("resVia").value      = rec.via_aplicacao;
    document.getElementById("resEstoque").value  = rec.qtde_estoque;
    document.getElementById("resMinima").value   = rec.qtde_minima_aceitavel;
    document.getElementById("resValidade").value = rec.data_validade;
    document.getElementById("resValor").value    = rec.valor_custo;
    document.getElementById("resFab").value      = rec.fabricante;

    document.getElementById("resultForm").style.display = "grid";
  }
  catch (err) {
    console.error(err);
    alert("Erro ao buscar: " + err.message);
  }
});
