// consulta_pacientes.js
const API_URL = 
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/pacientes/funcionario";

document
  .getElementById("btnBuscar")
  .addEventListener("click", buscarPacientes);

async function buscarPacientes(evt) {
  evt?.preventDefault();

  const idRaw = document.getElementById("idFuncionario").value.trim();
  const id = Number(idRaw);
  const lista = document.getElementById("listaPacientes");

  // limpa resultados anteriores
  lista.innerHTML = "";

  if (!id) {
    alert("Informe um ID de funcionário válido.");
    return;
  }

  try {
    // busca via GET: /pacientes/funcionario/:id
    const res = await fetch(`${API_URL}/${id}`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Status HTTP ${res.status}`);
    }

    // ORDS geralmente retorna { items: [ {NOME_CLIENTE: ...}, ... ] }
    const data = await res.json();
    const pacientes = data.items || data;

    if (!pacientes.length) {
      lista.innerHTML = 
        "<li>Nenhum paciente encontrado para este funcionário.</li>";
      return;
    }

    // monta lista
    pacientes.forEach((p) => {
      const nome = p.NOME_CLIENTE || p.nome_cliente || "— sem nome —";
      const li = document.createElement("li");
      li.textContent = nome;
      lista.appendChild(li);
    });
  }
  catch (err) {
    console.error("Erro ao consultar pacientes:", err);
    alert("❌ Erro na busca: " + err.message);
  }
}
