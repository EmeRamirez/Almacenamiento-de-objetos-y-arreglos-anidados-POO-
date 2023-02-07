// export class Persona{
//     nombre;
//     rut;
//     edad;
//     diagnosticos = [];

//     constructor(nombre,rut,edad){
//         this.nombre = nombre;
//         this.rut = rut;
//         this.edad = edad;
//     }

//     setDiagnostico(paciente){
//         this.pacientes.push(paciente);
//     }
// }



//Funcion para crear nuevo objeto de la clase 'Paciente'
function Paciente(nombre,rut,edad){
    this.nombre      = formNombre.value;
    this.rut         = formRUT.value;
    this.edad        = formEdad.value;
    this.diagnostico = [];


    this.getNombre = function(){
        return this.nombre;
    }

    this.setDiagnostico = function(diagnostico){
        this.diagnostico.push(diagnostico);
    }

    this.listarDiagnosticos = function(){
        return this.diagnostico;
    }

}

