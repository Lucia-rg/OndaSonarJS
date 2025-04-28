// FUNCIONES
function usuarioNuevo (usuarios) {
    let nombre= prompt('¿Cuál es su nombre?');
    let apellido= prompt('¿Cuál es apellido?');
    let cargo= prompt('¿Cuál es su cargo en Onda Sonar?');
    let celular= prompt('¿Cuál es su número de celular?');
    let email= prompt('¿Cuál es su correo electrónico?');
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

function busquedaUsuario(codigoUsuario, usuarios){
    let usuarioBusqueda = usuarios.find(a => a.codigo === codigoUsuario);
    if (usuarioBusqueda != undefined) {
        let usuarioInfo=[];
        for (let propiedad in usuarioBusqueda){
            propiedadUpperCase = propiedad[0].toUpperCase() + propiedad.substring(1);
            usuarioInfo.push([`${propiedadUpperCase}: ${usuarioBusqueda[propiedad]}`]);
            // console.log(`${propiedad}: ${usuarioBusqueda[propiedad]}`);
        }
    
        confirm(usuarioInfo.join("\n"));
        
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

                eliminar = prompt('¿Desea eliminar otro usuario? SI o NO').toUpperCase(); 
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
let opcionMenu = Number(prompt('MENÚ DE OPCIONES \nIngrese 1 si quiere añadir un nuevo usuario. \nIngrese 2 si desea consultar la información de un usuario existente. \nIngrese 3 si desea eliminar un usuario existente. \n Ingrese 4 para salir del menú.'));


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