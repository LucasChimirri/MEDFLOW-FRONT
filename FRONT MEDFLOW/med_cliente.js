// consulta_medicacao_cliente.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/medicacao/cliente";

document.getElementById("btnBuscar")
        .addEventListener("click", buscarMedicacoes);

async function buscarMedicacoes(evt) {
  evt.preventDefault();

  const raw = document.getElementById("idPaciente").value.trim();
  const id  = Number(raw);
  const listEl = document.getElementById("listaMedicacoes");
  listEl.innerHTML = "";

  if (!id) {
    alert("Informe um ID de paciente válido.");
    return;
  }

  try {
    // 1) faz a requisição
    const res = await fetch(`${API_URL}/${id}`, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // 2) pega o JSON
    const data = await res.json();
    console.log("🔍 JSON completo retornado:", data);

    // 3) descobre onde está o array de registros
    //    pode vir em data.items, data.itemsList, ou até diretamente em data.
    const medsArray = data.items  ||
                      data.itemsList ||
                      (Array.isArray(data) ? data : null);

    console.log("🔍 Array de registros encontrado:", medsArray);

    if (!medsArray || medsArray.length === 0) {
      listEl.innerHTML = `<li class="empty">Nenhuma medicação encontrada.</li>`;
      return;
    }

    // 4) para cada registro, imprime as chaves e depois mapeia
    medsArray.forEach((m, idx) => {
      console.log(`🔑 chaves do registro [${idx}]:`, Object.keys(m));

      // AQUI você vai ver no console o nome exato das propriedades que existem.
      // Substitua as três linhas abaixo pelos nomes corretos depois de conferir.
      const idMed   = m.ID_MEDICAMENTO   ?? m.id_medicamento   ?? m.idMedicamento;
      const nomeMed = m.NOME_MEDICAMENTO ?? m.nome_medicamento ?? m.nomeMedicamento;
      const nomePac = m.NOME_PACIENTE     ?? m.nome_paciente    ?? m.nomePaciente     ?? m.NOME_CLIENTE;

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>ID:</strong> ${idMed}  
        <span><strong>Medicamento:</strong> ${nomeMed}</span>
        <span><strong>Paciente:</strong> ${nomePac}</span>
      `;
      listEl.appendChild(li);
    });

  } catch (err) {
    console.error("Erro ao buscar medicações:", err);
    alert("❌ Erro na requisição: " + err.message);
  }
}
