const Adoptar = function (nombre, raza, edad, sexo) {
    this.nombre = nombre
    this.raza = raza
    this.edad = edad
    this.sexo = sexo
  }
  
  let existentes = []
  
  if (localStorage.getItem("mascotas")) {
    existentes = JSON.parse(localStorage.getItem("mascotas"));
  } else {
    (async () => {
      const response = await fetch('mascotas.json');
      const data = await response.json();
      existentes = data.map(elemento => new Adoptar(elemento));
    })();
  }
  
  const adoptarBoton = document.getElementById("adoptar-id")
  adoptarBoton.addEventListener("click", filtrarMascotas);
  
  const adopcionBoton = document.getElementById("adopcion-id")
  adopcionBoton.addEventListener("click", darEnAdopcion);
  
  function filtrarMascotas() {
    const formularioAdoptar = document.createElement ('form');
    formularioAdoptar.innerHTML = `
      <label for="busqueda-id">Raza</label>
      <input type="text" id="busqueda-id" placeholder="Ej: Poddle">
      <input type="submit" value="Buscar">
    `;
  
    formularioAdoptar.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const body = document.querySelector('body');
      const input = document.getElementById("busqueda-id").value
      const busqueda = input.trim().toUpperCase();
      const resultado = existentes.filter((Adoptar) => Adoptar.raza.toUpperCase().includes(busqueda));
  
    if (resultado.length > 0) {
      const container = document.createElement('div');
  
      resultado.forEach((Adoptar) => {
        const card = document.createElement('div');
        card.classList.add('tarjeta');
  
        const nombre = document.createElement('h2');
        nombre.innerText = 'Nombre';
        nombre.textContent = Adoptar.nombre;
        card.appendChild(nombre);
  
        const raza = document.createElement('strong');
        raza.textContent = Adoptar.raza;
        card.appendChild(raza);
        
        const edad = document.createElement('p');
        edad.textContent = Adoptar.edad;
        card.appendChild(edad);
  
        const sexo = document.createElement('p');
        sexo.textContent = Adoptar.sexo;
        card.appendChild(sexo);
  
        const botonAceptar = document.createElement ('button');
        botonAceptar.innerText = 'Aceptar';
        botonAceptar.classList.add('botonAceptar');
        botonAceptar.addEventListener ('click', () => {
  
          Swal.fire({
            title: "Estas seguro de esta adopcion?",
            text: "Haz click en OK si estas de acuerdo!",
            icon: "question"
          });
        })
  
        card.appendChild(botonAceptar);
        container.appendChild(card);
      }); 
  
      body.appendChild(container);
  
    } else {
      alert("No tenemos disponible la raza que buscas, intentalo nuevamente")
    }
  
  });
  
  const body = document.querySelector('body');
  body.appendChild(formularioAdoptar);
  }
  
    // BOTON DAR EN ADOPCION
  
  function darEnAdopcion () {
    const formulario = document.createElement('form')
    formulario.innerHTML = `
      <label for="nombre">Nombre</label>
      <input type="text" id="nombre-form" placeholder="Ej: Pepino">
  
      <label for="raza">raza</label>
      <input type="text" id="raza-form" placeholder="Ej: Golden">
  
      <label for="edad">edad</label>
      <input type="text" id="edad-form" placeholder="Ej: 2">
  
      <label for="sexo">sexo</label>
      <input type="text" id="sexo-form" placeholder="Ej: Macho">
      <input type="submit">  
    `;
  
    formulario.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const nombreForm = document.getElementById('nombre-form').value
      const razaForm = document.getElementById('raza-form').value
      const edadForm = parseInt(document.getElementById('edad-form').value)
      const sexoForm = document.getElementById('sexo-form').value
  
      if (nombreForm ==='' || razaForm === '' || (isNaN(edadForm) || !(sexoForm.toLowerCase() === 'hembra' || sexoForm.toLowerCase() === 'macho'))) {
        alert('Datos incorrectos, intentalo de nuevo.');
        return;
      } else {
        Swal.fire({
          title: "Quieres guardar estos cambios?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          denyButtonText: `No guardar`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Guardado!", "", "success");
          const nuevaMascota = new Adoptar (nombreForm, razaForm, edadForm, sexoForm); 
          existentes.push(nuevaMascota);
          agregarMascota();
          localStorage.setItem('mascotas', JSON.stringify(existentes));
          } else if (result.isDenied) {
            Swal.fire("Los cambios no fueron guardados", "", "info");
          }
        });
      }
    });
    
    const body = document.querySelector('body');
    body.appendChild(formulario);
  }
  
  //Aca muestra la mascota nueva en la card
  
  function agregarMascota () {
    const body = document.querySelector('body');
  
      existentes.forEach((mascota) => {
        const container = document.createElement ('container');
        const card = document.createElement('div');
        card.classList.add('tarjeta')
    
        const nombre = document.createElement('h2');
        nombre.textContent = mascota.nombre;
        card.appendChild(nombre);
    
        const raza = document.createElement('strong');
        raza.textContent = mascota.raza;
        card.appendChild(raza);
        
        const edad = document.createElement('p');
        edad.textContent = mascota.edad;
        card.appendChild(edad);
    
        const sexo = document.createElement('p');
        sexo.textContent = mascota.sexo;
        card.appendChild(sexo);
    
        container.appendChild(card);
        body.appendChild(container);
      });
  }