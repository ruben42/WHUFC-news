const urlBase = "http://localhost:3010/api/news";
const modalLogin = document.getElementById("modalLogin");
const bsModalLogin = new bootstrap.Modal(
  modalLogin,
  (backdrop = "static")
); // Pode passar opções
const modalRegistar = document.getElementById("modalRegistar");
const bsModalRegistar = new bootstrap.Modal(
  modalRegistar,
  (backdrop = "static")
); // Pode passar opções

const btnModalLogin = document.getElementById("btnModalLogin");
const btnModalRegistar = document.getElementById("btnModalRegistar");
const btnLogoff = document.getElementById("btnLogoff");

window.onload = function () {
  var activeToken = localStorage.getItem("token");
  if (activeToken) {
    enableLinks();
  } else {
    disableLinks();
  }
}

modalLogin.addEventListener("shown.bs.modal", () => {
  document.getElementById("usernameLogin").focus();
});
btnModalLogin.addEventListener("click", () => {
  bsModalLogin.show();
});
btnModalRegistar.addEventListener("click", () => {
  bsModalRegistar.show();
});
btnLogoff.addEventListener("click", () => {
  localStorage.removeItem("token");
  document.getElementById("btnLogoff").style.display = "none";
  disableLinks();
  window.location.replace("index.html");
});

function enableLinks() {
  document.querySelectorAll('nav a').forEach(item => item.style.pointerEvents = "");
}

function disableLinks() {
  document.querySelectorAll('nav a').forEach(item => item.style.pointerEvents = "none");
}

function validaRegisto() {
  let email = document.getElementById("usernameRegistar").value; // email é validado pelo próprio browser
  let senha = document.getElementById("senhaRegistar").value; // tem de ter uma senha
  const statReg = document.getElementById("statusRegistar");
  if (senha.length < 4) {
    document.getElementById("passErroLogin").innerHTML =
      "A senha tem de ter ao menos 4 carateres";
    return;
  }
  fetch(`${urlBase}/registar`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: `email=${email}&password=${senha}`,
  })
    .then(async (response) => {
      if (!response.ok) {
        erro = response.statusText;
        statReg.innerHTML = response.statusText;
        throw new Error(erro);
      }
      result = await response.json();
      console.log(result.message);
      statReg.innerHTML = result.message;
    })
    .catch((error) => {
      document.getElementById(
        "statusRegistar"
      ).innerHTML = `Pedido falhado: ${error}`;
    });
}

function validaLogin() {
  let email = document.getElementById("usernameLogin").value; // email é validado pelo próprio browser
  let senha = document.getElementById("senhaLogin").value; // tem de ter uma senha
  if (senha.length < 4) {
    document.getElementById("passErroLogin").innerHTML =
      "A senha tem de ter ao menos 4 carateres";
    return;
  }
  const statLogin = document.getElementById("statusLogin");

  fetch(`${urlBase}/login`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST", // o login não vai criar nada, só ver se o user existe e a pass está correta
    body: `email=${email}&password=${senha}`,
  })
    .then(async (response) => {
      if (!response.ok) {
        erro = await(response.json())
        throw new Error(erro.msg);
      }
      result = await response.json();
      console.log(result.accessToken);
      const token = result.accessToken;
      localStorage.setItem("token", token);
      document.getElementById("statusLogin").innerHTML = "Sucesso!";
      enableLinks();
      document.getElementById("btnLoginClose").click();
    })
    .catch(async (error) => {
      statLogin.innerHTML = error
    });
} 