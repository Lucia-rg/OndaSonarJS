// FUNCIONES
function verificacionDatoEntrada (enunciado, minCaracteres = 3) {

    let valor = prompt(enunciado);
    console.log(typeof(valor)); 
    while (valor =='' || valor == ' ' || valor == undefined || valor == NaN || valor.length < minCaracteres ) {
        alert('Ingrese un dato válido');
        valor = prompt(enunciado);   
    }
    return valor;
}

function usuarioNuevo (usuarios) {

    const preguntasUsuarioNuevo = ['¿Cuál es su nombre?', '¿Cuál es apellido?', '¿Cuál es su cargo en Onda Sonar?', '¿Cuál es su número de celular?', '¿Cuál es su correo electrónico?'];

    let nombre = verificacionDatoEntrada(preguntasUsuarioNuevo[0]);
    let apellido = verificacionDatoEntrada(preguntasUsuarioNuevo[1]);
    let cargo = verificacionDatoEntrada(preguntasUsuarioNuevo[2]);
    let celular = Number(verificacionDatoEntrada(preguntasUsuarioNuevo[3],7));
    let email = verificacionDatoEntrada(preguntasUsuarioNuevo[4]);
    let codigo= usuarios.length+1;

    usuarios.push({'nombre': nombre, 'apellido': apellido, 'cargo': cargo, 'celular': celular, 'email': email, 'codigo': codigo})
    confirm(`¡Usuario ingresado correctamente! Ya estás en la base de datos de Onda Sonar, ${nombre}. \nTu código de empleado es: ${codigo}`);
}

function ingresoUsuario (usuarios){
    alert('¡Bienvenido al equipo de Onda Sonar!');
    let creacionUsuario = prompt('¿Usted es un usuario nuevo? SI o NO').toUpperCase();

    while (creacionUsuario != 'NO') {
        if (creacionUsuario == 'SI') {
            usuarioNuevo(usuarios);
            creacionUsuario = prompt('¿Desea crear otro usuario? SI o NO').toUpperCase(); 
        }
        else {
            alert('Ingrese un dato válido');
            creacionUsuario = prompt('¿Usted es un usuario nuevo? SI o NO').toUpperCase();
        }
    }
}

function cambioPropiedadUsuario (usuarioBusqueda, propiedadCambio) {

    let controlCambio = true;

    while (controlCambio) {

        if (propiedadCambio < Object.keys(usuarioBusqueda).length && propiedadCambio>= 1) {
            controlCambio = false;

            switch (propiedadCambio) {
                case 1:
                    usuarioBusqueda.nombre = prompt('Escriba el nuevo nombre');
                    break;
        
                case 2:
                    usuarioBusqueda.apellido = prompt('Escriba el nuevo apellido');
                    break;
        
                case 3:
                    usuarioBusqueda.cargo = prompt('Escriba el nuevo cargo');
                    break;
        
                case 4:
                    usuarioBusqueda.celular = prompt('Escriba el nuevo celular');
                    break;
        
                case 5:
                    usuarioBusqueda.email = prompt('Escriba el nuevo email');
                    break;  
                     
                default:
                    alert('Ingrese un dato válido');
                    break;
            }

            confirm(`¡Cambio exitoso! Ahora, "${Object.keys(usuarioBusqueda)[propiedadCambio-1]}" es "${Object.values(usuarioBusqueda)[propiedadCambio-1]}"`);
            
        } else {
            alert('Ingrese un dato válido');
            propiedadCambio = Number(prompt('Escriba el número del campo que desea cambiar: \n1. Nombre \n2. Apellido \n3. Cargo \n4. Celular \n5. Email'));
        }       
    }
}

function edicionValueUsuario (usuarioBusqueda){
    let cambioInfoUsuario = prompt('¿Quiere editar algún campo? SI o NO').toUpperCase();

    while (cambioInfoUsuario != 'NO') {

        if (cambioInfoUsuario == 'SI') {

            let propiedadCambio = Number(prompt('Escriba el número del campo que desea cambiar: \n1. Nombre \n2. Apellido \n3. Cargo \n4. Celular \n5. Email'));

            cambioPropiedadUsuario(usuarioBusqueda, propiedadCambio);

            cambioInfoUsuario = prompt('¿Desea editar otro campo? SI o NO').toUpperCase();
            
        } else {
            alert('Ingrese un dato válido');
            cambioInfoUsuario = prompt('¿Quiere editar algún campo? SI o NO').toUpperCase();
        } 
    }
}

function busquedaUsuario(codigoUsuario, usuarios){
    let usuarioBusqueda = usuarios.find(a => a.codigo === codigoUsuario);
    if (usuarioBusqueda != undefined) {
        let usuarioInfo=[];
        for (let propiedad in usuarioBusqueda){
            propiedadUpperCase = propiedad[0].toUpperCase() + propiedad.substring(1);
            usuarioInfo.push([`${propiedadUpperCase}: ${usuarioBusqueda[propiedad]}`]);
        }
    
        confirm(usuarioInfo.join("\n"));

        edicionValueUsuario(usuarioBusqueda);

    } else {
        alert(`El usuario con el código ${codigoUsuario} no existe en la base de datos de Onda Sonar.`);  
    }
}

function eliminarUsuario(codigoUsuario, usuarios) {
    let usuarioEliminar = usuarios.find(a => a.codigo === codigoUsuario);
    if (usuarioEliminar != undefined) {

        let eliminar= prompt(`El usuario a eliminar es ${usuarioEliminar.nombre} ${usuarioEliminar.apellido} con el código ${usuarioEliminar.codigo}.\n¿Está seguro de eliminarlo? SI o NO `).toUpperCase();

        while (eliminar != 'NO') {
            if (eliminar == 'SI') {

                const indiceEliminar = usuarios.findIndex(a => a.codigo === codigoUsuario);
                console.log(indiceEliminar);
                usuarios.splice(indiceEliminar,1);
                confirm(`${usuarioEliminar.nombre} ${usuarioEliminar.apellido} ha sido eliminad@ correctamente de la base de datos de Onda Sonar.`);
                eliminar = 'NO';
            }
            else {
                alert('Ingrese un dato válido');
                eliminar = prompt(`El usuario a eliminar es ${usuarioEliminar.nombre} con el código ${usuarioEliminar.codigo}.\n¿Está seguro de eliminarlo? SI o NO `).toUpperCase();
            }
        }   
    } else {
        alert(`El usuario con el código ${codigoUsuario} no existe en la base de datos de Onda Sonar.`);  
    }

}

// Bienvenida al usuario
const usuarios = [{'nombre': 'Lucía', 'apellido': 'Rodríguez', 'cargo': 'Ingeniera de Sonido', 'celular': 3014094201, 'email': 'lucia.rodg28@gmail.com', 'codigo': 1},
     {'nombre': 'Sebastián', 'apellido': 'Escobar', 'cargo': 'Científico de Datos', 'celular': 3104613261, 'email': 'sescobar1029@gmail.com', 'codigo': 2}];

alert('¡Bienvenido al Sistema de Gestión de Empleados de Onda Sonar!')
let opcionMenu = Number(prompt('MENÚ DE OPCIONES \nIngrese 1 si quiere añadir un nuevo usuario. \nIngrese 2 si desea consultar la información de un usuario existente. \nIngrese 3 si desea eliminar un usuario existente. \nIngrese 4 para salir del menú.'));


while (opcionMenu != 4) {

    switch (opcionMenu) {
        case 1:
            ingresoUsuario(usuarios);
            break;

        case 2:
            if (usuarios.length != 0) {
                let codigoUsuario= Number(prompt('Ingresa el código del usuario'));
                busquedaUsuario(codigoUsuario, usuarios);

            }else{ 
                alert('No hay usuarios en la base de datos de Onda Sonar.');
            }
            break;

        case 3:
            if (usuarios.length != 0) {
                let codigoUsuario= Number(prompt('Ingresa el código del usuario que desea eliminar'));
                eliminarUsuario(codigoUsuario, usuarios);

            }else{ 
                alert('No hay usuarios en la base de datos de Onda Sonar.');
            }
            break;
    
        default:
            alert('Ingrese una opción válida (1, 2, 3 o 4)');
            break;
    }

    opcionMenu = Number(prompt('Menú de Opciones \nIngrese 1 si quiere añadir un nuevo usuario. \nIngrese 2 si desea consultar la información de un usuario existente. \nIngrese 3 si desea eliminar un usuario existente. \nIngrese 4 para salir del menú.'));

}

confirm('¡Gracias por su visita!');