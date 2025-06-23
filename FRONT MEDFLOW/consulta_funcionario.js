// consulta_funcionario.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/funcionario";

document.getElementById("btnBuscar")
        .addEventListener("click", buscarFuncionario);

async function buscarFuncionario(evt) {
  evt.preventDefault();

  const raw = document.getElementById("idFuncionario").value.trim();
  const id  = Number(raw);
  const form = document.getElementById("resultForm");
  form.style.display = "none";

  if (!id) {
    alert("Informe um ID de funcionário válido.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${id}`);
    console.log("✅ HTTP status:", res.status);
    if (!res.ok) {
      alert("Nenhum funcionário encontrado.");
      return;
    }

    const data = await res.json();
    console.log("🔍 JSON bruto:", data);

    // Descubra onde está o registro:
    // pode ser em data.items[0], em data.items[0].Items, em data[0]…
    const item = (Array.isArray(data.items) && data.items[0])
               || (Array.isArray(data) && data[0])
               || data;
    console.log("🔑 Registro extraído:", item);

    // Mostra chaves disponíveis
    console.log("🔑 Chaves disponíveis:", Object.keys(item));

    // Preencha com base no nome exato das chaves que aparecerem abaixo:
    document.getElementById("resIdFunc").value    = item.ID_FUNCIONARIO    ?? "";
    document.getElementById("resIdPessoa").value  = item.ID_PESSOA         ?? "";
    document.getElementById("resNome").value      = item.NOME_PESSOA       ?? "";
    document.getElementById("resSobreNome").value = item.SOBRE_NOME_PESSOA  ?? "";
    document.getElementById("resTipoDoc").value   = item.TIP_DOCUMENTO     ?? "";
    document.getElementById("resNroDoc").value    = item.NRO_DOCUMENTO     ?? "";
    document.getElementById("resLogradouro").value= item.LOGRADOURO        ?? "";
    document.getElementById("resNroLog").value    = item.NRO_LOGRADOURO    ?? "";
    document.getElementById("resCep").value       = item.NRO_CEP           ?? "";
    document.getElementById("resCidade").value    = item.NOME_CIDADE       ?? "";
    document.getElementById("resEstado").value    = item.SIGLA_ESTADO      ?? "";
    document.getElementById("resEmail").value     = item.E_MAIL            ?? "";
    document.getElementById("resDataNasc").value  = item.DATA_NASCIMENTO   ?? "";
    document.getElementById("resObs").value       = item.OBSERVACOES       ?? "";
    document.getElementById("resLogin").value     = item.LOGIN             ?? "";
    document.getElementById("resMatricula").value = item.MATRICULA         ?? "";
    document.getElementById("resRegistro").value  = item.NRO_REGISTRO_PROFIS ?? "";
    document.getElementById("resStatus").value    = item.STATUS            ?? "";

    form.style.display = "grid";
  }
  catch (err) {
    console.error("❌ Erro na requisição:", err);
    alert("Erro ao buscar funcionário: " + err.message);
  }
}
