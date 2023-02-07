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

//Esta función espera la carga del documento y posteriormente busca un key en el localStorage y si lo encuentra, lo asigna al arreglo global.
window.addEventListener("load", function(event) {
    if (JSON.parse(localStorage.getItem("consultorios")) != null){
        listaConsultorios = JSON.parse(localStorage.getItem("consultorios"));
        renderDOM();
        }
});
//This function waits for the document load, then it search for a key from local storage to assing the content to the global array.



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

    
    listaConsultorios[pos].pacientes.forEach(function(element,index){
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

            let arr = listaConsultorios[pos].pacientes[index].diagnostico;
            
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
    listaConsultorios[pos].pacientes[index].diagnostico.push(valor.value);
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
            selectCesfam.selectedIndex = -1;
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
    validator = true;

    listaConsultorios[pos].pacientes.forEach(element => {
        if (element.rut == formRUT.value){
            validator = false;
        }
    })

    if (validator) {
        formPaciente = new Paciente (formNombre,formRUT,formEdad);
        listaConsultorios[pos].pacientes.push(formPaciente);
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



//Esta función busca un elemento dentro del consultorio seleccionado y renderiza el resultado en el contenedor del HTML
function buscarPaciente(){
    valor = formBusqueda.value.toLowerCase();
    pos = selectCesfam.selectedIndex;

    if (isNaN(valor)){
        listaFiltrada = listaConsultorios[pos].pacientes.filter(element => element.nombre.toLowerCase() == valor);

        if(listaFiltrada.length >= 1){
        contPacientes.innerHTML = ` 
            <div class="card-paciente">
                <img src="img/diagnostico.png" />
                <div class="card-info">
                    <div id="card-nombre">Nombre: ${listaFiltrada[0].nombre}</div>
                    <div id="card-rut">RUT: ${listaFiltrada[0].rut}</div>
                    <div id="card-edad">Edad: ${listaFiltrada[0].edad}</div>
                </div>
                <div id="card-diagnostico">
                </div>
                <div id="cont-card-btn">
                    <div></div>
                    <div class="subcont-diag"><input class="formdiag" placeholder="Escriba aquí el diagnóstico"><button >Añadir</button></div>
                </div>
            </div>`;

            let arr = listaFiltrada[0].diagnostico;
            
            arr.forEach(element => {
                document.querySelector(`#card-diagnostico`).innerHTML += `
                <li>${element}</li>`
            })
            
        } else {
            alert('Nombre no encontrado en este consultorio');
        }
    } else {
        listaFiltrada = listaConsultorios[pos].pacientes.filter(element => element.rut == valor);

        if(listaFiltrada.length >= 1){
        contPacientes.innerHTML = ` 
            <div class="card-paciente">
                <img src="img/diagnostico.png" />
                <div class="card-info">
                    <div id="card-nombre">Nombre: ${listaFiltrada[0].nombre}</div>
                    <div id="card-rut">RUT: ${listaFiltrada[0].rut}</div>
                    <div id="card-edad">Edad: ${listaFiltrada[0].edad}</div>
                </div>
                <div id="card-diagnostico">
                </div>
                <div id="cont-card-btn">
                    <div></div>
                    <div class="subcont-diag"><input class="formdiag" placeholder="Escriba aquí el diagnóstico"><button >Añadir</button></div>
                </div>
            </div>`;

            let arr = listaFiltrada[0].diagnostico;
            console.log(arr);
            
            arr.forEach(element => {
                document.querySelector(`#card-diagnostico`).innerHTML += `
                <li>${element}</li>`
            })

        } else {
            alert('RUT no encontrado en este consultorio');
        }
    }
}




//=============== hasta aquí llegué, el resto son pruebas ============================

//{{ NOTAS }} : 
//      Falta añadir un boton para eliminar un diagnóstico