
//Funcion para crear nuevo objeto de la clase 'Paciente'
function Paciente(nombre,rut,edad){
    this.nombre      = nombre;
    this.rut         = rut;
    this.edad        = edad;
    this.diagnostico = [];

}

    Paciente.prototype.getNombre = function(){
        return this.nombre;
    }

    Paciente.prototype.setDiagnostico = function(diagnostico){
        this.diagnostico.push(diagnostico);
    }

    Paciente.prototype.listarDiagnosticos = function(){
        return this.diagnostico;
    }


