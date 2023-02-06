//Variables globales
let listaConsultorios = [];


//Rutas del DOM
selectCesfam   = document.querySelector('#cesfam');
inputPaciente  = document.querySelector('#paciente');
formNombre     = document.querySelector('#form-nombre');
formRUT        = document.querySelector('#form-rut');
formEdad       = document.querySelector('#form-edad');
contPacientes = document.querySelector('#contenedor-lista-pacientes');

//==================================================================================================


//Funcion para crear nuevo objeto de la clase 'Consultorio'
function Consultorio(nombre){
    this.nombre    = nombreConsultorio;
    this.paciente  = [];
}
//This function create a new object from the class 'Consultorio'


//Funcion para crear nuevo objeto de la clase 'Paciente'
function Paciente(nombre,rut,edad){
    this.nombre      = formNombre.value;
    this.rut         = formRUT.value;
    this.edad        = formEdad.value;
    this.diagnostico = [];
}
//This function create a new object from the class 'Paciente'


//Esta función espera la carga del documento y posteriormente busca un key en el localStorage y si lo encuentra, lo asigna al arreglo global.
window.addEventListener("load", function(event) {
    if (JSON.parse(localStorage.getItem("consultorios")) != null){
        listaConsultorios = JSON.parse(localStorage.getItem("consultorios"));
        renderDOM();
        }
});
//This function waits for the document load, then it search for a key from local storage to assing the content to the global array.

//Esta función almacena las variables locales en el localStorage
function respaldoLocal(){
    localStorage.setItem('consultorios',JSON.stringify(listaConsultorios));
    
}

//Renderizar DOM
function renderDOM(){
    selectCesfam.innerHTML = '';

    listaConsultorios.forEach(element => {
        selectCesfam.innerHTML += `<option value="">${element.nombre}</option>`
    })
    renderPacientes();

}


//Esta función se encarga de añadir en el DOM las cartas de paciente respecto del respectivo consultorio que se tenga seleccionado
function renderPacientes(){
    contPacientes.innerHTML = '';

    pos = selectCesfam.selectedIndex;

    
    listaConsultorios[pos].paciente.forEach(function(element,index){
        contPacientes.innerHTML += ` 
            <div class="card-paciente" id="card-paciente-${index}">
                <img src="img/diagnostico.png" />
                <div class="card-info">
                    <div id="card-nombre">Nombre: ${element.nombre}</div>
                    <div id="card-rut">RUT: ${element.rut}</div>
                    <div id="card-edad">Edad: ${element.edad}</div>
                </div>
                <div id="card-diagnostico-${index}">
                </div>
                <div id="cont-card-btn">
                    <div><button class="btnModificar" id="btnModif-${index}" onclick="mostrarFormDiag(${index})">Modificar</button></div>
                    <div class="subcont-diag" id="contenedor-modifdiag-${index}"><input class="formdiag" id="form-diag-${index}" placeholder="Escriba aquí el diagnóstico"><button onclick="agregarDiag(${index})">Añadir</button></div>
                </div>
            </div>`;

            let arr = listaConsultorios[pos].paciente[index].diagnostico;
            
            arr.forEach(element => {
                document.querySelector(`#card-diagnostico-${index}`).innerHTML += `
                <li>${element}</li>`
            })
    })

  



}
//Esta función añade un valor al arreglo diagnostico anidado en el objeto paciente y consultorio respectivo
function agregarDiag(index){
    let valor = document.querySelector(`#form-diag-${index}`);
    pos = selectCesfam.selectedIndex;
    listaConsultorios[pos].paciente[index].diagnostico.push(valor.value);
    renderPacientes();
    respaldoLocal();
}



//Esta función crea un nuevo objeto de una determinada clase y luego lo añade a un arreglo. {44-47}
function agregarConsultorio(){
    nombreConsultorio = document.querySelector('#input-consultorio').value;
    validator = true;
    
    listaConsultorios.forEach(element => {
        if (element.nombre == nombreConsultorio){
            validator = false;
        } 
    })

    if (validator) {
        nombreConsultorio = new Consultorio (nombreConsultorio);
        listaConsultorios.push(nombreConsultorio);
        selectCesfam.selectedIndex = -1;
        renderDOM();
        respaldoLocal();
        
        
    } else {
        alert('Este consultorio ya existe');
    }
    document.querySelector('#input-consultorio').value = '';
}

//Esta funcion crea un nuevo objeto de una determinada clase y luego lo añade en un arreglo. {66-71}
function agregarPaciente() {
    pos = selectCesfam.selectedIndex;
    validator = true;

    listaConsultorios[pos].paciente.forEach(element => {
        if (element.rut == formRUT.value){
            validator = false;
        }
    })

    if (validator) {
        formPaciente = new Paciente (formNombre,formRUT,formEdad);
        listaConsultorios[pos].paciente.push(formPaciente);
        respaldoLocal();
        renderPacientes();
    } else {
        alert('Este paciente ya existe en este consultorio');
    }

    
}


//Esta función muestra/oculta el formulario para añadir nuevos pacientes
function mostrarForm(){
        if (document.querySelector('.btnForm').innerText == 'Añadir'){
        document.querySelector('#div-añadir-paciente').style.display='flex';
        document.querySelector('.btnForm').innerHTML = 'Ocultar';
    } else {
        document.querySelector('#div-añadir-paciente').style.display ='none';
        document.querySelector('.btnForm').innerHTML = 'Añadir';
    }
}

//Esta función muestra/oculta el formulario para añadir diagnósticos a los pacientes
function mostrarFormDiag(index){
    if (document.querySelector(`#btnModif-${index}`).innerText == 'Modificar'){
        document.querySelector(`#contenedor-modifdiag-${index}`).style.display='flex';
        document.querySelector(`#btnModif-${index}`).innerText = 'Ocultar';
    } else {
        document.querySelector(`#contenedor-modifdiag-${index}`).style.display='none';
        document.querySelector(`#btnModif-${index}`).innerText = 'Modificar';
    }
}





//=============== hasta aquí llegué, el resto son pruebas ============================

//{{ NOTAS }} : 
//      Falta añadir un buscador de paciente
//      Falta añadir un boton para eliminar un diagnóstico