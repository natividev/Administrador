// * Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// * UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCita = document.querySelector('#citas');

let editando;

class Citas{
  constructor(){
    this.citas = [];
  }

  agregarCita(cita){
    this.citas = [...this.citas, cita]
  }

  eliminarCita(id){
    this.citas = this.citas.filter( cita => cita.id !== id )
  }

  editarCita(citaActualizada){
    // * filter quita un elemento basado en ua condicion
    // *  .map(), a diferencia de forEach() ambos recorrer los elementos una vez por cada elementos. Y .map() crear un nuevo arreglo

    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    
    
  }

}

class UI{

  imprimirAlerta(mensaje, tipo){
    // * Creamos el DIV
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    //* Agregar clase, en base al tipo de error
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }
    
    // * Mensaje de error
    divMensaje.textContent = mensaje;

    // * Agreamos al DOM
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    // * Quitar la alerta despues de 5 segundos
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCita({citas}){

    // * Limpiar Lista de HTML previo para que no se duplique las citas del HTML
    this.limpiarHtml();


    citas.forEach(cita => {
      const {mascota, propietario, telefono, fecha, hora, sintomas,id} = cita;

      const divCita = document.createElement('DIV');
      divCita.classList.add('cita','p-3');
      divCita.dataset.id = id;

      // Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement('H2');
      mascotaParrafo.classList.add('card-title', 'font-weigth-bolder');
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('P');
      propietarioParrafo.innerHTML = `
      <span class="font-weigth-bolder">Propietario: </span> ${propietario}
      `;
      
      const telefonoParrafo = document.createElement('P');
      telefonoParrafo.innerHTML = `
      <span class="font-weigth-bolder">Telefono: </span> ${telefono}
      `;
      
      const fechaParrafo = document.createElement('P');
      fechaParrafo.innerHTML = `
      <span class="font-weigth-bolder">Fecha: </span> ${fecha}
      `;
      
      const horaParrafono = document.createElement('P');
      horaParrafono.innerHTML = `
      <span class="font-weigth-bolder">Hora: </span> ${hora}
      `;
      
      const sintomaParrafo = document.createElement('P');
      sintomaParrafo.innerHTML = `
      <span class="font-weigth-bolder">Sintomas: </span> ${sintomas}
      `;
      
      // * Boton eliminar
      const btnEliminar = document.createElement('BUTTON');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>';
      btnEliminar.onclick = () => eliminarCita(id);

      // * Boton editar
      const btnEditar = document.createElement('BUTTON');
      btnEditar.classList.add('btn', 'btn-info', 'mr-2');
      btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /> </svg>';
      btnEditar.onclick = () => modoEditarCita(cita);


      const idParrafo = document.createElement('P');

      // * Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafono);
      divCita.appendChild(sintomaParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // * Agregar las citas al html
      contenedorCita.appendChild(divCita);
    });


  }

  limpiarHtml(){
    while (contenedorCita.firstChild) {
      contenedorCita.removeChild(contenedorCita.firstChild);
    }
  }

}


const ui = new UI();
const administrarCita = new Citas();



// * Registrar Eventos
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener('change', datosCita);
  propietarioInput.addEventListener('change', datosCita);
  telefonoInput.addEventListener('change', datosCita);
  fechaInput.addEventListener('change', datosCita);
  horaInput.addEventListener('change', datosCita);
  sintomasInput.addEventListener('change', datosCita);
  formulario.addEventListener('submit',nuevaCita);
}
// * Objeto con la informacion de la cita
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
}

// * Agrega datos al objeto de cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;

}

// * Valida y agrega una nueva cita a la clase de cita

function nuevaCita(e) {
  e.preventDefault();

  // * Estraer la informacion del injeto de cita
  const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

  // * Validar que los camplos este llenos
  if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los campos son obligatorios.', 'error')
    return;
  }

  if (editando) {
    ui.imprimirAlerta('Editado correctamente');
    // * Pasar el objeto de la cita a edicion
    administrarCita.editarCita( {...citaObj} );

    // * Regresar el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";
    editando = false;

  }else{
    // * Generar un id unico
    citaObj.id = Date.now();
  
    // * Creando una nueva cita
    administrarCita.agregarCita({...citaObj});

    // * Mensaje de agregado correctamente
    ui.imprimirAlerta('Se agregó correctamente');
  }


  // * Reinicar el objeto para la validacion
  reinicarObjeto();

  // * Reinicia el formulario
  formulario.reset();

  // Mostrar el HTML de las citas
  ui.imprimirCita(administrarCita);

}

function reinicarObjeto() {
  citaObj.mascota     = '';
  citaObj.propietario = '';
  citaObj.telefono    = '';
  citaObj.fecha       = '';
  citaObj.hora        = '';
  citaObj.sintomas    = '';
}

function eliminarCita(id) {
  // * Eliminar la cita
  administrarCita.eliminarCita(id);

  // * Muestra Mensaje
  ui.imprimirAlerta('La cita se elimino correctamente')

  // * Refresca las cita
  ui.imprimirCita(administrarCita); 
}

// * Carga los datos y el modo edicion
function modoEditarCita(cita) {
  const {mascota, propietario, telefono, fecha,hora,sintomas,id} = cita;
  // * Llenar los input
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // * Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  // * Cambiar el texto del botton
  formulario.querySelector('button[type="submit"]').textContent = "Editar";
  editando = true;


  
}