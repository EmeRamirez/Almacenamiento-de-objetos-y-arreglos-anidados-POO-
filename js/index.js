//Variables globales
let listaConsultorios = [];

//Rutas del DOM
let selectCesfam     = document.querySelector('#cesfam');
let inputPaciente    = document.querySelector('#paciente');
let formNombre       = document.querySelector('#form-nombre');
let formRUT          = document.querySelector('#form-rut');
let formEdad         = document.querySelector('#form-edad');
let contPacientes    = document.querySelector('#contenedor-lista-pacientes');
let inputConsultorio = document.querySelector('#input-consultorio');
let formBusqueda     = document.querySelector('#form-busqueda');

//==================================================================================================



//Esta función almacena las variables locales en el localStorage
function respaldoLocal(){
    localStorage.setItem('consultorios',JSON.stringify(listaConsultorios));   
}

//Esta función espera la carga del documento y posteriormente busca un key en el localStorage y si lo encuentra, vuelve a construir los objetos 'Consultorio' y los añade al arreglo global.
window.addEventListener("load", function(event) { 


    //Esta parte no es una solicitud de la tarea, sin embargo me era necesario generar permanencia en la BD que iba a ser construida a partir de mi app, por lo tanto aquí se vuelven a crear los objetos utilizando las variables almacenadas en Local Storage simulando el uso de funciones CRUD en BD.

    if (JSON.parse(localStorage.getItem("consultorios")) != null){
        listaLocal = JSON.parse(localStorage.getItem("consultorios"));
       
        listaLocal.forEach(function(el,index){
           consultorio = new Consultorio (el.nombre);

            el.pacientes.forEach(function(elem,ind){
                paciente = new Paciente (elem.nombre , elem.rut , elem.edad);

                elem.diagnostico.forEach(diag => {
                    paciente.setDiagnostico(diag);
                })
                consultorio.setPaciente(paciente);
            })

           listaConsultorios.push(consultorio);
        });
        
        renderDOM();

    }
});



//Renderizar DOM
function renderDOM(){
    selectCesfam.innerHTML = '';

    listaConsultorios.forEach(element => {
        selectCesfam.innerHTML += `<option value="">${element.nombre}</option>`
    })
    renderPacientes();
}


//Esta función se encarga de añadir en el DOM las cartas de paciente respecto del respectivo consultorio que se tenga seleccionado
function renderPacientes(arr){
    contPacientes.innerHTML = '';
    pos = selectCesfam.selectedIndex;

    if (arr == undefined){
        arr = listaConsultorios[pos].listarPacientes()
    };

    
    arr.forEach(function(element,index){
        contPacientes.innerHTML += ` 
            <div class="card-paciente" id="card-paciente-${index}">
                <div id="sec-cesf">
                    <img src="img/diagnostico.png" />
                    <h6 id="nombre-cesf">${listaConsultorios[pos].nombre}</h6>
                </div>
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

            let arr = listaConsultorios[pos].listarPacientes()[index].listarDiagnosticos();
            
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
    listaConsultorios[pos].listarPacientes()[index].setDiagnostico(valor.value);
    renderPacientes();
    respaldoLocal();
}



//Esta función crea un nuevo objeto de una determinada clase y luego lo añade a un arreglo. {44-47}
function agregarConsultorio(){
    validator = true;
    

    if (inputConsultorio.value.length < 1 || !isNaN(inputConsultorio.value)){
        alert('Nombre no válido')
    } else {
        listaConsultorios.forEach(element => {
            if (element.nombre == inputConsultorio.value){
                validator = false;
            } 
        })

        if (validator) {
            nuevoConsultorio = inputConsultorio.value;
            nuevoConsultorio = new Consultorio (nuevoConsultorio);
            listaConsultorios.push(nuevoConsultorio);
            // selectCesfam.selectedIndex = -1;
            renderDOM();
            respaldoLocal();
            
            
        } else {
            alert('Este consultorio ya existe o no es válido');
        }
        document.querySelector('#input-consultorio').value = '';
    }
}

//Esta funcion crea un nuevo objeto de una determinada clase y luego lo añade en un arreglo. {66-71}
function agregarPaciente() {
    pos = selectCesfam.selectedIndex;


    //En esta parte se valida si el RUT ingresado ya existe dentro del CESFAM seleccionado.
    validator = true;

    listaConsultorios.forEach(el =>{
        el.listarPacientes().forEach (ele => {
            if (ele.rut == formRUT.value){
                validator = false;
            }
        })
    })


    if (validator) {
        formPaciente = new Paciente (formNombre.value,formRUT.value*1,formEdad.value*1);
        listaConsultorios[pos].setPaciente(formPaciente);
        respaldoLocal();
        renderPacientes();
    } else {
        alert('Este paciente ya existe la base de datos');
    }   
}


//Esta función le pasa como parámetro un string al método de clase 'Consultorio' 'buscarPacienteNombre()' para que busque coincidencias en sus pacientes, si este devuelve un valor true, se le pasa el objeto a la función 'renderPacientes()' para que esta la muestre en el documento.
function buscarPacientes(){
    busqueda = formBusqueda.value.toLowerCase();
    validador = false;
   
    listaConsultorios.forEach(function(el,index){
        if (el.buscarPacienteNombre(busqueda) != undefined){
        posicionpac = index;
        pacienteRegistrado = [listaConsultorios[index].pacientes[el.buscarPacienteNombre(busqueda)]];
        validador = true;
        }
    })

    if (validador){
        selectCesfam.selectedIndex = posicionpac;
        renderPacientes(pacienteRegistrado);
    } else {
        alert ('El paciente no existe');
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



