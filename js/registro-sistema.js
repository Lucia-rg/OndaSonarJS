async function fecthData() {

    try {
        const response = await fetch('../json/empleados.json');
        const data= await response.json();

        console.log(data);
        inicializarUsuarios(data);
        return data;
        
    } catch (error) {
        console.error('Error al inicializar usuarios:', error);  
        
    }  
}

function inicializarUsuarios(usuariosIniciales) {
    try {
        if(!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
        }   
    } catch (error) {
        console.error('Error al inicializar usuarios:', error);   
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // inicializarUsuarios();
    fecthData()

    // Objeto de botones menú principal
    const menuBtn = {
        'addUser' : 'registroUsuario',
        'infoUser' : 'buscarUsuario',
        'deleteUser' : 'eliminarUsuario',
    };

    Object.keys(menuBtn).forEach(btnId => {
        const btn = document.getElementById(btnId);

        if (btn) {
            btn.addEventListener('click', () => {
                showForm(menuBtn[btnId]);  
            })       
        }

    });

    // Botón de Menú principal
    document.querySelectorAll('.showMainMenu').forEach( btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showMainMenu();
        } );

    });

    // Función para Menú principal

    function showMainMenu() {
        document.querySelectorAll('.contenedor-forms').forEach( form => {
            form.classList.add('hidden');
        })

        document.getElementById('menu-principal').classList.remove('hidden');
        document.getElementById('greet').classList.remove('hidden');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    //  Funcion para mostrar formularios

    function showForm(formId) {

        // Ocultar formularios
        document.querySelectorAll('.contenedor-forms').forEach(form => {
            form.classList.add('hidden');
        });

        document.getElementById('greet').classList.add('hidden');

        document.querySelectorAll('.mensajeDiv').forEach( mensaje => {
            mensaje.classList.add('hidden');
            mensaje.innerHTML = '';
        });

        // Limpiar errores previos 
        document.querySelectorAll('.error').forEach(error => {
                error.classList.add('hidden');
                error.innerHTML = '';
            });

        // Mostrar formulario
        const formShow = document.getElementById(formId);
        if (formShow) {
            formShow.classList.remove('hidden');

            // Poner cursor en primer elemento del DOM
            const firstInput = formShow.querySelector('input, select, textarea');
            if (firstInput) firstInput.focus();
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }

});

let errores = [];

class Usuario {
    
    constructor(nombre, apellido, cargo, celular, email) {

        // Objeto de mensajes de input
        const mensajesInput = [
            'nombreError',
            'apellidoError',
            'cargoError',
            'celularError',
            'emailError'
        ];

        this.nombre = Validador.validarTexto(nombre, 'nombre', 3, mensajesInput[0]);
        this.apellido = Validador.validarTexto(apellido, 'apellido', 3, mensajesInput[1]);
        this.cargo = Validador.validarCargo(cargo, 'cargo', mensajesInput[2]);
        this.celular = Validador.validarCelular(celular, mensajesInput[3]);
        this.email = Validador.validarEmail(email, mensajesInput[4]);
        this.fechaRegistro = new Date().toISOString().split('T')[0];
        this.id = this.idGenerator(nombre, apellido);
    }

    idGenerator (nombre,apellido) {
        const inicialNombre = nombre.charAt(0).toUpperCase();
        const inicialApellido = apellido.charAt(0).toUpperCase();
        const random = Math.floor(10 + Math.random() * 90);

        return `${inicialNombre}${inicialApellido}-${random}`;
    }

    guardarUsuario() {

        try {
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            usuarios.push(this);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            return true;
        } catch (error) {
            console.error('Error al guardar usuario:', error);
            return false;  
        }
    }
};

class Validador {

    // Validar texto
    static validarTexto(text, nombreCampo, minCaracteres = 3, mensajeError) {
        const valor = text.trim(); 
        const mensaje = document.getElementById(mensajeError);

        if (!valor || valor.length === 0 || valor == undefined || valor == NaN) { 
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `El campo ${nombreCampo} no puede estar vacío.`;
            errores.push('El campo no puede estar vacío.')
        }

        if (valor.length < minCaracteres) {
            mensaje.classList.remove('hidden');
            mensaje.innerHTML =`El campo ${nombreCampo} debe tener al menos ${minCaracteres} caracteres.`;
            errores.push('El campo no puede estar vacío.')  
        }

        return valor;

    }

    // Validar número celular
    static validarCelular (celular, mensajeError) {
        const valor = celular;
        const mensaje = document.getElementById(mensajeError);

         if (!valor || valor.length === 0 || valor == undefined || valor == NaN) { 
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `El campo del celular no puede estar vacío.`;
            errores.push('El campo no puede estar vacío.')
        }

        if (celular.length < 7) {
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `El celular debe tener al menos 7 dígitos`;
            errores.push('El campo no puede estar vacío.')  
        } 

        return valor;
    }

    // Validar email
    static validarEmail (email, mensajeError) {
        
        const valor = email.trim().toLowerCase();
        const mensaje = document.getElementById(mensajeError);

        if (!valor || valor.length === 0 || valor == undefined || valor == NaN) { 
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `El campo de email no puede estar vacío.`;
            errores.push('El campo no puede estar vacío.')
        }
        // Formato email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(valor)) {
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `El email no tiene un formato válido.`;
            errores.push('El campo no puede estar vacío.')
        }

        return valor;
    }

    // Validar cargo
    static validarCargo (cargo, nombreCampo, mensajeError) {

        const mensaje = document.getElementById(mensajeError);
        // Selección diferente al placeholder
        if (!cargo || cargo ==="" || cargo ==="0") {
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `Debe seleccionar un ${nombreCampo}.`;
            errores.push('El campo no puede estar vacío.')
        }

        return cargo;
    }

    // Validar desde opciones
        static validarOpciones (selector, mensajeError) {

        const mensaje = document.getElementById(mensajeError);
        // Selección diferente al placeholder
        if (!selector || selector ==="" || selector ==="0") {
            
            mensaje.classList.remove('hidden');
            mensaje.innerHTML = `Debe seleccionar una opción.`;
            errores.push('El campo no puede estar vacío.')
        }

        return selector;
    }
    
}

// Registro de usuario
let registroUsuario = document.getElementById('btn-guardar');

registroUsuario.addEventListener('click', (e) => {
    e.preventDefault();

    const mensajeDiv = document.getElementById('adicionUsuario');
    const form = document.getElementById('form-registro');

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    if (errores.length > 0) {
        errores = [];
    }

    try {
        const usuario = new Usuario (
            document.getElementById('nombreInput').value,
            document.getElementById('apellidoInput').value,
            document.getElementById('cargoInput').value,
            document.getElementById('celularInput').value,
            document.getElementById('emailInput').value
        );

        if (errores.length > 0) {
            errores = [];
            throw new Error(`Debe llenar correctamente los campos.`); 
        }

        // Guardar usuario
        if (usuario.guardarUsuario()) {
            mensajeDiv.classList.remove('hidden');
            mensajeDiv.innerHTML = `
            <p>✅ ¡Usuario registrado exitosamente! Ya estás en la base de datos de Onda Sonar, ${usuario.nombre}</p>
            <p>ID asignado: <strong>${usuario.id}</strong></p>
            <p>Fecha de registro: ${usuario.fechaRegistro}</p>`;

            resetForm(form);

        } else {
            alert('Error al guardar usuario');
            
        }   
        
    } catch (error) {
        mensajeDiv.classList.remove('hidden');
        mensajeDiv.innerHTML = `
        ❌ Error: asegúrese de llenar correctamente los campos.`;       
    }
});

// Buscar usuario

let searchUsuario = document.getElementById('btn-buscar');

searchUsuario.addEventListener('click', (e) => {
    e.preventDefault();

    const mensajeDiv = document.getElementById('searchUsuario');
    const mensaje = document.getElementById('usuarioIDError');

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

        document.querySelectorAll('.mensajeDiv').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    if (errores.length > 0) {
        errores = [];
    }

    // -------------------------------------------

    try {
        const idBuscar = Validador.validarTexto(document.getElementById('usuarioID').value, 'código', 5, 'usuarioIDError').toUpperCase();

        if (errores.length == 0) {
            infoEmpleado = getUsuarioPorId(idBuscar);
            console.log(infoEmpleado);

            if (infoEmpleado == undefined) {  
                mensaje.classList.remove('hidden');
                mensaje.innerHTML = `El usuario con el código ${idBuscar} no existe en la base de datos de Onda Sonar.`;
                throw new Error('El usuario no existe.');
            } else {
                showInnerForm ('infoUsuario')
                document.getElementById('verNombre').innerText = infoEmpleado.nombre;
                document.getElementById('verApellido').innerText = infoEmpleado.apellido;
                document.getElementById('verCodigo').innerText = infoEmpleado.id;
                document.getElementById('verCargo').innerText = infoEmpleado.cargo;
                document.getElementById('verCelular').innerText = infoEmpleado.celular;
                document.getElementById('verEmail').innerText = infoEmpleado.email;
            }

        } else {
            errores = [];
            throw new Error(`Debe llenar correctamente el campo.`); 
        }

        document.getElementById('usuarioID').value = '';

        // Restablecer botones
        const btnsInfo = document.getElementById('btns-infoUsuario');
        btnsInfo.classList.remove('hidden');
        
    } catch (error) {

        mensajeDiv.classList.remove('hidden');
        mensajeDiv.innerHTML = `
        ❌ Error: asegúrese de llenar correctamente los campos.`; 
        
    }
});

// Modificar información de usuario 
let modificarUsuario = document.getElementById('btn-modificar');

modificarUsuario.addEventListener('click', (e) => {
    e.preventDefault();

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    document.querySelectorAll('.mensajeDiv').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    // Mostrar interfaz

    showInnerForm('modificarUsuario')
    const info = document.getElementById('infoUsuario');
    info.classList.remove('hidden');
    const btnsInfo = document.getElementById('btns-infoUsuario');
    btnsInfo.classList.add('hidden');

});

// Actualizar información de usuario
let actualizarInfo = document.getElementById('btn-actualizar');

actualizarInfo.addEventListener('click', (e) => {
    e.preventDefault();

    const mensajeDiv = document.getElementById('actualizarUsuario');

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    document.querySelectorAll('.mensajeDiv').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });


    if (errores.length > 0) {
        errores = [];
    }

    // --------------------------------------------------------------

    try {
       
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || []);
        const indexEmpleado = usuarios.findIndex(empleado => empleado.id === infoEmpleado.id);
        const campoModificar = Validador.validarOpciones(document.getElementById('campoEditarUsuario').value, 'CampoEditarError');
        
                
        if (errores.length == 0) {
            if (campoModificar == 'nombre') {
                nombre = Validador.validarTexto(document.getElementById('valorCampoEditar').value, 'nombre', 3, 'valorCampoEditarError');

                if (!isError(errores)) {
                    infoEmpleado.nombre = nombre;
                    document.getElementById('verNombre').innerText = infoEmpleado.nombre;
                } else {
                    errores = [];
                    throw new Error(`Debe llenar correctamente el campo.`); 
                }

            } else if (campoModificar == 'apellido') {
                apellido = Validador.validarTexto(document.getElementById('valorCampoEditar').value, 'apellido', 3, 'valorCampoEditarError');

                if (!isError(errores)) {
                    infoEmpleado.apellido = apellido;
                    document.getElementById('verApellido').innerText = infoEmpleado.apellido;
                } else {
                    errores = [];
                    throw new Error(`Debe llenar correctamente el campo.`); 
                }

            } else if (campoModificar == 'cargo') {
                cargo = Validador.validarTexto(document.getElementById('valorCampoEditar').value, 'cargo', 3, 'valorCampoEditarError');

                if (!isError(errores)) {
                    infoEmpleado.cargo = cargo;
                    document.getElementById('verCargo').innerText = infoEmpleado.cargo;
                } else {
                    errores = [];
                    throw new Error(`Debe llenar correctamente el campo.`); 
                }

            } else if (campoModificar == 'celular') {
                celular = Validador.validarCelular(document.getElementById('valorCampoEditar').value, 'valorCampoEditarError');

                if (!isError(errores)) {
                    infoEmpleado.celular = celular;
                    document.getElementById('verCelular').innerText = infoEmpleado.celular;
                } else {
                    errores = [];
                    throw new Error(`Debe llenar correctamente el campo.`); 
                }

            } else if (campoModificar == 'email') {
                email = Validador.validarEmail(document.getElementById('valorCampoEditar').value, 'valorCampoEditarError');

                if (!isError(errores)) {
                    infoEmpleado.email = email;
                    document.getElementById('verEmail').innerText = infoEmpleado.email;
                } else {
                    errores = [];
                    throw new Error(`Debe llenar correctamente el campo.`); 
                }
            }

            usuarios[indexEmpleado] = infoEmpleado;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            mensajeDiv.classList.remove('hidden');
            mensajeDiv.innerHTML = `
                <p class="text-center"><strong>✅ ¡Cambio exitoso! ✅</strong></p>`;
            document.getElementById('campoEditarUsuario').selectedIndex = 0;
            document.getElementById('valorCampoEditar').value = '';

        } else {
            errores = [];
            throw new Error(`Debe llenar correctamente el campo.`); 
        }

            
    } catch (error) {
        mensajeDiv.classList.remove('hidden');
        mensajeDiv.innerHTML = `
        ❌ Error: asegúrese de llenar correctamente los campos.`; 
        
    }

});

// Eliminar usuario 
let eliminarUsuario = document.getElementById('btn-eliminar');

eliminarUsuario.addEventListener('click', (e) => {
    e.preventDefault();

    const mensajeDiv = document.getElementById('deleteUsuario');
    const mensaje = document.getElementById('eliminarUsuarioIDError');

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

        document.querySelectorAll('.mensajeDiv').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    if (errores.length > 0) {
        errores = [];
    }

    // Limpiar botones
    document.getElementById('btn-confirmacionEliminar').classList.remove('hidden');
    document.getElementById('confirmacionText').classList.remove('hidden');

    // -------------------------------------------

    try {
        const idBuscar = Validador.validarTexto(document.getElementById('eliminarUsuarioID').value, 'código', 5, 'eliminarUsuarioIDError').toUpperCase();

        if (errores.length == 0) {
            infoEmpleado = getUsuarioPorId(idBuscar);
            console.log(infoEmpleado);

            if (infoEmpleado == undefined) {  
                mensaje.classList.remove('hidden');
                mensaje.innerHTML = `El usuario con el código ${idBuscar} no existe en la base de datos de Onda Sonar.`;
                throw new Error('El usuario no existe.');
            } else {

                // Limpiar errores previos 
                document.querySelectorAll('.error').forEach(error => {
                    error.classList.add('hidden');
                    error.innerHTML = '';
                });

                document.querySelectorAll('.mensajeDiv').forEach(error => {
                    error.classList.add('hidden');
                    error.innerHTML = '';
                });

                // Mostrar interfaz

                showInnerForm('confirmacionEliminar')
                const info = document.getElementById('infoUsuario');
                info.classList.remove('hidden');
                document.getElementById('verNombre').innerText = infoEmpleado.nombre;
                document.getElementById('verApellido').innerText = infoEmpleado.apellido;
                document.getElementById('verCodigo').innerText = infoEmpleado.id;
                document.getElementById('verCargo').innerText = infoEmpleado.cargo;
                document.getElementById('verCelular').innerText = infoEmpleado.celular;
                document.getElementById('verEmail').innerText = infoEmpleado.email;
                const btnsInfo = document.getElementById('btns-infoUsuario');
                btnsInfo.classList.add('hidden');

            }

        } else {
            errores = [];
            throw new Error(`Debe llenar correctamente el campo.`); 
        }

        document.getElementById('eliminarUsuarioID').value = '';

        // Restablecer botones
        const btnsInfo = document.getElementById('btns-infoUsuario');
        btnsInfo.classList.add('hidden');
        
    } catch (error) {

        mensajeDiv.classList.remove('hidden');
        mensajeDiv.innerHTML = `
        ❌ Error: asegúrese de llenar correctamente los campos.`; 
        
    }
});

let confirmacionEliminar = document.getElementById('btn-confirmacionEliminar');

confirmacionEliminar.addEventListener('click', (e) => {

    e.preventDefault();
    const mensajeDiv = document.getElementById('eliminarUsuarioConfirmacion');

    // Limpiar errores previos 
    document.querySelectorAll('.error').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    document.querySelectorAll('.mensajeDiv').forEach(error => {
        error.classList.add('hidden');
        error.innerHTML = '';
    });

    // ------------------------------------------

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(empleado => empleado.id !== infoEmpleado.id);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mensajeDiv.classList.remove('hidden');
    mensajeDiv.innerHTML = `
        <p class="text-center"><strong>El usuario con código: ${infoEmpleado.id} se removió correctamente de la base de datos de Onda Sonar.</strong></p>`;

    // Limpiar botones
    document.getElementById('btn-confirmacionEliminar').classList.add('hidden');
    document.getElementById('confirmacionText').classList.add('hidden');

});

function isError(errores) {
    if (errores.length != 0) {
        errores = [];
        return true;
    } else {
        return false;
    }
}

function getUsuarioPorId (id) {

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find(empleado => empleado.id === id);

}

function showInnerForm (formId) {
      // Ocultar formularios
        document.querySelectorAll('.contenedor-forms').forEach(form => {
            form.classList.add('hidden');
        });

        document.getElementById('greet').classList.add('hidden');

        document.querySelectorAll('.mensajeDiv').forEach( mensaje => {
            mensaje.classList.add('hidden');
            mensaje.innerHTML = '';
        });

        // Limpiar errores previos 
        document.querySelectorAll('.error').forEach(error => {
                error.classList.add('hidden');
                error.innerHTML = '';
            });

        // Mostrar formulario
        const formShow = document.getElementById(formId);
        if (formShow) {
            formShow.classList.remove('hidden');

            // Poner cursor en primer elemento del DOM
            const firstInput = formShow.querySelector('input, select, textarea');
            if (firstInput) firstInput.focus();
        }

};

function resetForm (form) {
    setTimeout(() => {
        form.reset();
    }, 3000);

}