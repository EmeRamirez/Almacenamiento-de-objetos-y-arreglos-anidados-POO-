// export class Consultorio{
//     nombre;
//     pacientes = [];

//     constructor(nombre){
//         this.nombre = nombre;
//     }

//     function agregarPaciente(paciente){
//         this.pacientes.push(paciente);
//     }
// }


//Funcion para crear nuevo objeto de la clase 'Consultorio'
function Consultorio(nombre){
    this.nombre    = inputConsultorio.value;
    this.pacientes  = [];

    this.getNombre = function(){
        return this.nombre;
    }

    this.agregarPaciente = function(paciente){
        this.pacientes.push(paciente);
    }

    this.listarPacientes = function(){
        return this.pacientes;
    }

}





