// cadastro_pessoa.js
const API_URL =
  "https://apex.oracle.com/pls/apex/mvselli_senac/medflow/pessoa";

async function cadastrarPessoa(evt) {
  evt.preventDefault();

  // Ler campos
  const tipoPessoa     = document.getElementById("tipoPessoa").value;
  const nome           = document.getElementById("nomePessoa").value.trim();
  const sobrenome      = document.getElementById("sobreNome").value.trim();
  const tipoDoc        = document.getElementById("tipoDoc").value.trim();
  const nroDoc         = document.getElementById("nroDoc").value.trim();
  const logradouro     = document.getElementById("logradouro").value.trim();
  const nroLogradouro  = document.getElementById("nroLogradouro").value.trim();
  const cep            = document.getElementById("cep").value.trim();
  const cidade         = document.getElementById("cidade").value.trim();
  const estado         = document.getElementById("estado").value.trim();
  const email          = document.getElementById("email").value.trim();
  const dataNascRaw    = document.getElementById("dataNasc").value;
  const dataNasc       = dataNascRaw
    ? dataNascRaw.split("-").reverse().join("/")
    : "";
  const observacoes    = document.getElementById("observacoes").value.trim();
  const login          = document.getElementById("login").value.trim();
  const senha          = document.getElementById("senha").value.trim();
  const matricula      = document.getElementById("matricula").value.trim();
  const telaAcesso     = document.getElementById("telaAcesso").value.trim();
  const dataContrRaw   = document.getElementById("dataContratacao").value;
  const dataContr      = dataContrRaw
    ? dataContrRaw.split("-").reverse().join("/")
    : "";
  const registroProf   = document.getElementById("registroProf").value.trim();
  const status         = document.getElementById("status").value.trim();

  // Mensagem limpa
  const msgDiv = document.getElementById("mensagemRetorno");
  msgDiv.textContent = "";

  // Montar payload
  const payload = {
    TIPO_PESSOA         : tipoPessoa,
    NOME_PESSOA         : nome,
    SOBRE_NOME_PESSOA   : sobrenome,
    TIP_DOCUMENTO       : tipoDoc,
    NRO_DOCUMENTO       : nroDoc,
    LOGRADOURO          : logradouro,
    NRO_LOGRADOURO      : nroLogradouro,
    NRO_CEP             : cep,
    NOME_CIDADE         : cidade,
    SIGLA_ESTADO        : estado,
    E_MAIL              : email,
    DATA_NASCIMENTO     : dataNasc,
    OBSERVACOES         : observacoes,
    LOGIN               : login,
    SENHA               : senha,
    MATRICULA           : matricula,
    TELA_ACESSO         : telaAcesso,
    DATA_CONTRATACAO    : dataContr,
    NRO_REGISTRO_PROFIS : registroProf,
    STATUS              : status
  };

  try {
    const res = await fetch(API_URL, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify(payload)
    });

    const texto = (await res.text()).trim();
    alert(texto);
    msgDiv.textContent = texto;
    msgDiv.style.color =
      texto.toLowerCase().includes("sucesso") ? "green" : "orangered";

    if (texto.toLowerCase().includes("sucesso")) evt.target.reset();
  }
  catch (err) {
    console.error(err);
    alert("❌ Erro na requisição: " + err.message);
    msgDiv.textContent = "Erro: " + err.message;
    msgDiv.style.color = "red";
  }
}
