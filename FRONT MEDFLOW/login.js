// Função chamada quando o formulário é enviado
function validarLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Obtém os valores preenchidos pelo usuário
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
  
    // Configuração dos cabeçalhos da requisição
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ak_bmsc=3BAF7DAC867B737FC89E2B3CD939CA15~000000000000000000000000000000~YAAQzCoRAuAAXDGXAQAAZhhLVxz8XwqUz3rA9lLKm2axZEiQi8jQ5pNl4c8XzTFN5qFvTcOTw2tv2l6BtTYFPtSdZWib+x9siCiD5rFb4GFZtS6M7I/u/S3DEFmNTQVbmHRFGKv3QWg1ZyAhmd9XTSHP2S4jObXgcFfL8Q7bZ/gSgerSE7y4xMl8gD15l7PM29O86LVlHe2Z5C3rnz/kkB2H6d5p3EvDQVn4pAtR+c/4kl9uer/DOlKxsiQJdgvWEVvw+Kv2leDoh0vFEPyfY3qBiQ8q+APIui6xKZPYGM2gOeIwP6lZQadD4RQB46qe8LWtHE+iLMPYqqv1LgdfXgkBiil84y40lt5y9A==; bm_sv=A1BF424A69CDE570D20FE2A56F7DC0C8~YAAQzCoRAlzcXDGXAQAAi11eVxwBZUdDv6oWni4RtWss2BJ/Z9HX7F5x10S5IeTuYnyBCSaO6L4aigvZk5S+xuDIrTTjdAfgcv1csY8VXXW+afVIiCQuhV+pILKw/ly8dMO5EsdWMYJABYCT8Uezo1esHtGLBDw+jYRvXHbWMVdyKtPWrzAEGlqImlyEhMhIDJ3RpTK/yT/l3vllkpbTUkQDO8GOuk1fsO4QQwD7ERFVbtXLS4SFND0Y8E4BnojwbA==~1"
    );
  
    // Cria o corpo da requisição com os dados inseridos
    const raw = JSON.stringify({
      usuario: usuario,
      senha: senha
    });
  
    // Configuração das opções da requisição
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    // Realiza a chamada ao serviço de login
    fetch("https://apex.oracle.com/pls/apex/mvselli_senac/medflow/login", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        // Exemplo de verificação: se a resposta contiver "sucesso", redireciona para o dashboard.
        // Ajuste essa condição conforme o retorno real do serviço.
        if (result.toLowerCase().includes("sucesso")) {
          window.location.href = "2_MF_DashBoard.html";
        } else {
          alert("Usuário ou senha incorretos!");
        }
      })
      .catch(error => {
        console.error("Erro:", error);
        alert("Houve um erro ao realizar o login!");
      });
  }
  