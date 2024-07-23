var cuentas = [
  { nombre: "neil", saldo: 200, password: "1234" },
  { nombre: "buzz", saldo: 300, password: "5678" },
  { nombre: "yuri", saldo: 400, password: "91011" }
];

let currentUser = null;

function iniciarSesion() {
  const usuario = document.getElementById("cuenta").value;
  const password = document.getElementById("password").value;
  let accesoPermitido = false;

  for (let i = 0; i < cuentas.length; i++) {
    if (cuentas[i].nombre === usuario && cuentas[i].password === password) {
      currentUser = cuentas[i];
      localStorage.setItem('currentUserName', currentUser.nombre);
      localStorage.setItem('currentUserSaldo', currentUser.saldo);
      accesoPermitido = true;
      break;
    }
  }

  if (accesoPermitido) {
    window.location.href = "cajero.html";
  } else {
    document.getElementById("error").innerText = "Usuario o contraseña incorrectos.";
  }
}

function nomUsuario() {
  let currentUserName = localStorage.getItem('currentUserName');
  let currentUserSaldo = parseFloat(localStorage.getItem('currentUserSaldo'));

  for (let i = 0; i < cuentas.length; i++) {
    if (cuentas[i].nombre === currentUserName) {
      currentUser = cuentas[i];
      currentUser.saldo = currentUserSaldo;
      break;
    }
  }

  if (currentUser) {
    document.getElementById('saludo').innerText = 'Bienvenido/a ' + currentUser.nombre;
  }
}

function consultarSaldo() {
  if (currentUser) {
    let mensaje = `Nombre: ${currentUser.nombre}, Saldo: ${currentUser.saldo}`;
    document.getElementById("mensaje").innerHTML = mensaje;
  } else {
    document.getElementById("mensaje").innerHTML = "Por favor, inicie sesión primero.";
  }
}

function mostrarCampoIngreso() {
  document.getElementById('campoIngreso').style.display = 'block';
  document.getElementById('campoRetiro').style.display = 'none';
}

function mostrarCampoRetiro() {
  document.getElementById('campoRetiro').style.display = 'block';
  document.getElementById('campoIngreso').style.display = 'none';
}

function depositarMonto() {
  let monto = parseFloat(document.getElementById('montoIngreso').value);
  if (!isNaN(monto) && monto > 0) {
    let nuevoSaldo = currentUser.saldo + monto;
    if (nuevoSaldo > 990) {
      document.getElementById('mensaje').innerText = 'No puede tener más de $990 en su cuenta.';
    } else {
      currentUser.saldo = nuevoSaldo;
      localStorage.setItem('currentUserSaldo', currentUser.saldo);
      document.getElementById('mensaje').innerText = `Monto ingresado: ${monto}. Nuevo saldo: ${currentUser.saldo}`;
      document.getElementById('montoIngreso').value = '';
    }
  } else {
    document.getElementById('mensaje').innerText = 'Por favor, ingrese un monto válido.';
  }
}

function retirarMonto() {
  let monto = parseFloat(document.getElementById('montoRetiro').value);
  if (!isNaN(monto) && monto > 0) {
    let nuevoSaldo = currentUser.saldo - monto;
    if (nuevoSaldo < 10) {
      document.getElementById('mensaje').innerText = 'No puede tener menos de $10 en su cuenta.';
    } else {
      currentUser.saldo = nuevoSaldo;
      localStorage.setItem('currentUserSaldo', currentUser.saldo);
      document.getElementById('mensaje').innerText = `Monto retirado: ${monto}. Nuevo saldo: ${currentUser.saldo}`;
      document.getElementById('montoRetiro').value = '';
    }
  } else {
    document.getElementById('mensaje').innerText = 'Por favor, ingrese un monto válido.';
  }
}

function cerrarSesion() {
  localStorage.removeItem('currentUserName');
  localStorage.removeItem('currentUserSaldo');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  let consultarSaldoBtn = document.getElementById('btnConsultar');
  let ingresarMontoBtn = document.getElementById('btnDepositar');
  let retirarMontoBtn = document.getElementById('btnRetirar');
  let cerrarSesionBtn = document.getElementById('btnCerrarSesion');

  if (consultarSaldoBtn) consultarSaldoBtn.addEventListener('click', consultarSaldo);
  if (ingresarMontoBtn) ingresarMontoBtn.addEventListener('click', depositarMonto);
  if (retirarMontoBtn) retirarMontoBtn.addEventListener('click', retirarMonto);
  if (cerrarSesionBtn) cerrarSesionBtn.addEventListener('click', cerrarSesion);

  if (document.getElementById('saludo')) nomUsuario();
});