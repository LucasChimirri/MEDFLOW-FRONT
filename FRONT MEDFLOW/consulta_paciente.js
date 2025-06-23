
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/paciente";

document.getElementById("btnBuscar")
        .addEventListener("click", buscarPaciente);

async function buscarPaciente(evt) {
  evt.preventDefault();

  const raw  = document.getElementById("idPaciente").value.trim();
  const id   = Number(raw);
  const form = document.getElementById("resultForm");
  form.style.display = "none";

  if (!id) {
    alert("Informe um ID de paciente válido.");
    return;
  }

  try {
   
    const res  = await fetch(`${API_URL}/${id}`, { method: "GET" });
    if (!res.ok) {
      alert("Paciente não encontrado.");
      return;
    }

    const data = await res.json();

    const item = data.items && data.items[0];
    if (!item) {
      alert("Nenhum registro retornado.");
      return;
    }

   
    document.getElementById("resIdCliente").value   = item.id_cliente       || "";
    document.getElementById("resIdPessoa").value    = item.id_pessoa        || "";
    document.getElementById("resNome").value        = item.nome_pessoa      || "";
    document.getElementById("resSobreNome").value   = item.sobre_nome_pessoa|| "";
    document.getElementById("resTipoDoc").value     = item.tip_documento    || "";
    document.getElementById("resNroDoc").value      = item.nro_documento    || "";
    document.getElementById("resLogradouro").value  = item.logradouro       || "";
    document.getElementById("resNroLog").value      = item.nro_logradouro   || "";
    document.getElementById("resCep").value         = item.nro_cep          || "";
    document.getElementById("resCidade").value      = item.nome_cidade      || "";
    document.getElementById("resEstado").value      = item.sigla_estado     || "";
    document.getElementById("resEmail").value       = item.e_mail           || "";
   
    const dt = item.data_nascimento
      ? item.data_nascimento.split("T")[0]
      : "";
    document.getElementById("resDataNasc").value    = dt;
    document.getElementById("resObs").value         = item.observacoes      || "";

    form.style.display = "grid";
  }
  catch (err) {
    console.error("❌ Erro na requisição:", err);
    alert("Erro ao buscar paciente: " + err.message);
  }
}
