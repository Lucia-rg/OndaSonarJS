const usuariosIniciales = [
    {
        'nombre': 'Lucía',
        'apellido': 'Rodríguez',
        'cargo': 'Ingeniero/a',
        'celular': '3014094201',
        'email': 'lucia.rodg28@gmail.com',
        'fechaRegistro' : '2025-05-16',
        'codigo': 1
    },
    {
        'nombre': 'Sebastián',
        'apellido': 'Escobar',
        'cargo': 'Ingeniero/a',
        'celular': '3104613261',
        'email': 'sescobar1029@gmail.com',
        'fechaRegistro' : '2025-05-16',
        'codigo': 2
    }
];

function inicializarUsuarios() {
    try {
        if(!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
        }   
    } catch (error) {
        console.error('Error al inicializar usuarios:', error);   
    }
}

document.addEventListener('DOMContentLoaded', function () {
    inicializarUsuarios();

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
        this.id = this.idGenerator();
    }

    idGenerator () {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        return usuarios.length+1;
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

            resetForm(form, mensajeDiv);

        } else {
            alert('Error al guardar usuario');
            
        }   
        
    } catch (error) {
        mensajeDiv.classList.remove('hidden');
        mensajeDiv.innerHTML = `
        ❌ Error: asegúrese de llenar correctamente los campos.`;       
    }
})

function resetForm (form, mensajeDiv) {
    setTimeout(() => {
        form.reset();
    }, 7000);

}
