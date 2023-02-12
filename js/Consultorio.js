//Funcion para crear nuevo objeto de la clase 'Consultorio'
function Consultorio(nombre){
    this.nombre    = nombre
    this.pacientes  = []
}


    Consultorio.prototype.getNombre = function(){
        return this.nombre;
    }

    Consultorio.prototype.setPaciente = function(paciente){
        this.pacientes.push(paciente);
    }



    Consultorio.prototype.listarPacientes = function(){
        return this.pacientes;
    }

    Consultorio.prototype.buscarPacienteNombre = function(busqueda){
       
        existe = false;

        this.pacientes.forEach(function(el,index){   
            // if (busqueda.toLowerCase() == el.nombre.toLowerCase()){
            if ( el.nombre.toLowerCase().search(busqueda.toLowerCase()) !== -1 && busqueda.toLowerCase().length > 2){
                encontrado = index;
                existe = true;
            }  
        })


        if (existe){
            return encontrado;
        }
        
    }





