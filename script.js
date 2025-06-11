// Almacenamiento local simulado para usuarios y datos
const usuariosKey = 'Corazon Canino & felino_usuarios';
const mascotasKey = 'Corazon Canino & felino_mascotas';
const usuarioActualKey = 'Corazon Canino & felino_usuarioActual';
const carritoKey = 'Corazon Canino & felino_carrito';

const productos = [
  {
    nombre: 'Shampoo para perros',
    precio: 25,
    descripcion: 'Limpieza suave que cuida la piel y pelaje de tu perro.',
    imagen: 'img/shampo.webp'
  },
  {
    nombre: 'Alimento balanceado',
    precio: 40,
    descripcion: 'Nutrición completa y deliciosa para mascotas saludables.',
    imagen: 'img/alimento.jpeg'
  },
  {
    nombre: 'Collares y correas',
    precio: 30,
    descripcion: 'Accesorios resistentes y cómodos para paseos seguros.',
    imagen: 'img/collar.webp'
  },
  {
    nombre: 'Antibioticos',
    precio: 50,
    descripcion: 'Productos para el cuidado y tratamiento de tu mascota.',
    imagen: 'img/anti.jpeg'
  },
  {
    nombre: 'Juguetes para gatos',
    precio: 15,
    descripcion: 'Diversión asegurada con juguetes interactivos y seguros.',
    imagen: 'img/cat.jpg'
  },
  {
    nombre: 'Cepillos para mascotas',
    precio: 20,
    descripcion: 'Cepillos suaves que eliminan el pelo muerto sin dañar la piel.',
    imagen: 'img/cepillos.jpeg'
  },
  {
    nombre: 'Camas para perros',
    precio: 60,
    descripcion: 'Camas acolchadas para el mejor descanso de tu mascota.',
    imagen: 'img/camas.avif'
  },
  {
    nombre: 'Platos y bebederos',
    precio: 18,
    descripcion: 'Utensilios higiénicos y resistentes para comida y agua.',
    imagen: 'img/platos.jpg'
  },
  {
    nombre: 'Snacks saludables',
    precio: 12,
    descripcion: 'Premios nutritivos para entrenar o consentir.',
    imagen: 'img/snack.avif'
  },
  {
    nombre: 'Ropa para perros',
    precio: 35,
    descripcion: 'Ropa cómoda y con estilo para todas las temporadas.',
    imagen: 'img/ropa dog.jpg'
  },
  {
    nombre: 'Antipulgas',
    precio: 45,
    descripcion: 'Protege contra pulgas, garrapatas y otros parásitos.',
    imagen: 'img/antipulgas.jpg'
  },
  {
    nombre: 'Transportadoras',
    precio: 70,
    descripcion: 'Viaja seguro y cómodo con tu mascota.',
    imagen: 'img/transpor.jpeg'
  },
  {
    nombre: 'Arena para gatos',
    precio: 22,
    descripcion: 'Arena absorbente y sin olores para tu gato.',
    imagen: 'img/arena.jpeg'
  },
  {
    nombre: 'Rascadores para gatos',
    precio: 50,
    descripcion: 'Ideal para el entretenimiento y salud de sus uñas.',
    imagen: 'img/rascadores.webp'
  },
  {
    nombre: 'Vitaminas y suplementos',
    precio: 28,
    descripcion: 'Complementos esenciales para su salud y energía.',
    imagen: 'img/suple.jpg'
  }
];

// --- Utilidades ---
function cargarUsuarios() {
  return JSON.parse(localStorage.getItem(usuariosKey)) || {};
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(usuariosKey, JSON.stringify(usuarios));
}

function cargarMascotas() {
  return JSON.parse(localStorage.getItem(mascotasKey)) || {};
}

function guardarMascotas(mascotas) {
  localStorage.setItem(mascotasKey, JSON.stringify(mascotas));
}

function setUsuarioActual(email) {
  localStorage.setItem(usuarioActualKey, email);
}

function getUsuarioActual() {
  return localStorage.getItem(usuarioActualKey);
}

function getNombreUsuario(email) {
  const usuarios = cargarUsuarios();
  return usuarios[email] ? usuarios[email].nombre : null;
}

function cargarCarrito() {
  return JSON.parse(localStorage.getItem(carritoKey)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(carritoKey, JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  let carrito = cargarCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
}

function limpiarCarrito() {
  localStorage.removeItem(carritoKey);
}

// --- Página Index (Login / Registro / Bienvenida) ---
if (document.getElementById('loginBtn')) {
  const loginBtn = document.getElementById('loginBtn');
  const emailInput = document.getElementById('emailInput');
  const registerSection = document.getElementById('register-section');
  const loginSection = document.getElementById('login-section');
  const nameInput = document.getElementById('nameInput');
  const registerBtn = document.getElementById('registerBtn');
  const welcomeSection = document.getElementById('welcome-section');
  const userNameSpan = document.getElementById('userName');
  const goDashboardBtn = document.getElementById('goDashboardBtn');

  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }
    const usuarios = cargarUsuarios();
    if (usuarios[email]) {
      // Usuario existe
      setUsuarioActual(email);
      mostrarBienvenida(email);
    } else {
      // No existe, mostrar registro
      loginSection.style.display = 'none';
      registerSection.style.display = 'block';
    }
  });

  registerBtn.addEventListener('click', () => {
    const nombre = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    if (!nombre) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    const usuarios = cargarUsuarios();
    usuarios[email] = { nombre };
    guardarUsuarios(usuarios);
    setUsuarioActual(email);
    mostrarBienvenida(email);
  });

  goDashboardBtn.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });

  function mostrarBienvenida(email) {
    const nombre = getNombreUsuario(email);
    registerSection.style.display = 'none';
    loginSection.style.display = 'none';
    welcomeSection.style.display = 'block';
    userNameSpan.textContent = nombre;
  }
}

// --- Página Dashboard ---
if (document.getElementById('logoutBtn')) {
  const userNameDash = document.getElementById('userNameDashboard');
  const logoutBtn = document.getElementById('logoutBtn');
  const usuario = getUsuarioActual();

  if (!usuario) {
    alert('No has iniciado sesión. Serás redirigido al inicio.');
    window.location.href = 'index.html';
  } else {
    const nombre = getNombreUsuario(usuario);
    userNameDash.textContent = nombre;
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(usuarioActualKey);
    window.location.href = 'index.html';
  });
}

// --- Página Mascota ---
if (document.getElementById('mascotaForm')) {
  const mascotaForm = document.getElementById('mascotaForm');
  const usuario = getUsuarioActual();

  if (!usuario) {
    alert('Debes iniciar sesión primero.');
    window.location.href = 'index.html';
  }

  mascotaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreMascota').value.trim();
    const especie = document.getElementById('especieMascota').value.trim();
    const raza = document.getElementById('razaMascota').value.trim();
    const edad = document.getElementById('edadMascota').value.trim();
    const tipoDiligencia = document.getElementById('tipoDiligencia').value;
    const detalle = document.getElementById('detalleDiligencia').value.trim();

    if (!nombre || !especie || !edad || !tipoDiligencia) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const mascotas = cargarMascotas();

    // Guardar por usuario y mascota
    if (!mascotas[usuario]) mascotas[usuario] = [];
    mascotas[usuario].push({
      nombre,
      especie,
      raza,
      edad: Number(edad),
      diligencia: {
        tipo: tipoDiligencia,
        detalle,
        fecha: new Date().toLocaleString()
      }
    });

    guardarMascotas(mascotas);
    alert('Diligencia registrada correctamente.');
    mascotaForm.reset();
  });
}

// --- Página Expediente ---
if (document.getElementById('buscarBtn')) {
  const buscarBtn = document.getElementById('buscarBtn');
  const buscarInput = document.getElementById('buscarMascotaInput');
  const resultadoDiv = document.getElementById('resultadoExpediente');
  const usuario = getUsuarioActual();

  if (!usuario) {
    alert('Debes iniciar sesión primero.');
    window.location.href = 'index.html';
  }

  buscarBtn.addEventListener('click', () => {
    const nombreBuscar = buscarInput.value.trim().toLowerCase();
    if (!nombreBuscar) {
      alert('Escribe el nombre de la mascota a buscar.');
      return;
    }
    const mascotas = cargarMascotas();
    const listaMascotas = mascotas[usuario] || [];
    const resultados = listaMascotas.filter(m => m.nombre.toLowerCase() === nombreBuscar);

    if (resultados.length === 0) {
      resultadoDiv.innerHTML = `<p>No se encontró ninguna mascota con ese nombre.</p>`;
      return;
    }

    let html = '<h3>Expedientes encontrados:</h3><ul>';
    resultados.forEach((m, i) => {
      html += `<li><strong>${m.nombre}</strong> (${m.especie} - ${m.raza || 'N/D'}, ${m.edad} años)<br>
      <em>Diligencias:</em><ul>`;
      if (m.diligencia) {
        html += `<li><strong>${m.diligencia.tipo}</strong> - ${m.diligencia.fecha}<br>Detalle: ${m.diligencia.detalle || 'Sin comentarios'}</li>`;
      } else {
        html += '<li>No hay diligencias registradas</li>';
      }
      html += '</ul></li>';
    });
    html += '</ul>';
    resultadoDiv.innerHTML = html;
  });
}

// --- Página Productos ---

const listaProductos = document.getElementById('listaProductos');
const carritoLista = document.getElementById('carritoLista');
const totalSpan = document.getElementById('totalProductos');
const confirmarBtn = document.getElementById('confirmarCompraBtn');


function cargarCarrito() {
  return JSON.parse(localStorage.getItem(carritoKey)) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(carritoKey, JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
  let carrito = cargarCarrito();
  carrito.push(producto);
  guardarCarrito(carrito);
}

function limpiarCarrito() {
  localStorage.removeItem(carritoKey);
}

document.addEventListener('DOMContentLoaded', () => {
  const listaProductos = document.getElementById('listaProductos');
  const carritoLista = document.getElementById('carritoLista');
  const totalSpan = document.getElementById('totalProductos');
  const confirmarBtn = document.getElementById('confirmarCompraBtn');

  let carrito = cargarCarrito();

  function actualizarCarritoUI() {
    carritoLista.innerHTML = '';
    let totalDinero = 0;

    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'btn-eliminar';
      btnEliminar.onclick = () => {
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        actualizarCarritoUI();
      };

      li.appendChild(btnEliminar);
      carritoLista.appendChild(li);

      totalDinero += producto.precio;
    });

    totalSpan.textContent = `Cantidad: ${carrito.length} — Total: $${totalDinero.toFixed(2)}`;
  }
productos.forEach(p => {
  const li = document.createElement('li');
  li.className = 'producto-card';

  li.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}" class="producto-imagen" />
    <div class="producto-info">
      <h3>${p.nombre}</h3>
      <p class="descripcion">${p.descripcion}</p>
      <p class="precio">$${p.precio.toFixed(2)}</p>
      <button class="btn-agregar">Agregar al carrito</button>
    </div>
  `;

  const agregarBtn = li.querySelector('.btn-agregar');
  agregarBtn.addEventListener('click', () => {
    agregarAlCarrito(p);
    carrito = cargarCarrito();
    actualizarCarritoUI();
  });

  listaProductos.appendChild(li);
});
});