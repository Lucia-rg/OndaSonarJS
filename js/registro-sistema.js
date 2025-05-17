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
    if(!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
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


class Usuario { 
    
    constructor(nombre, apellido, cargo, celular, email, usuarios) {
        this.nombre = Validador.validarTexto(nombre, 'nombre');
        this.apellido = Validador.validarTexto(apellido, 'apellido');
        this.cargo = Validador.validarCargo(cargo, 'cargo');
        this.celular = Validador.validarCelular(celular);
        this.email = Validador.validarEmail(email);
        this.fechaRegistro = new Date().toISOString().split('T')[0];
        this.id = this.idGenerator(usuarios);
    }

    idGenerator (usuarios) {
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
}

class Validador {

    // Validar texto
    static validarTexto(text, nombreCampo, minCaracteres = 3) {
        const valor = text.trim();

        if (!valor || valor.length === 0 || valor == undefined || valor == NaN) {
            throw new Error(`El campo ${nombreCampo} no puede estar vacío.`);
        }

        if (valor.length < minCaracteres) {
            throw new Error(`El campo ${nombreCampo} debe tener al menos ${minCaracteres} caracteres.`);  
        }

        return valor;

    }

    // Validar número celular
    static validarCelular (celular) {
        const valor = celular;
        if (celular.length < 7) {
            throw new Error('El celular debe tener al menos 7 dígitos');   
        } 
    }

    // Validar email
    static validarEmail (email) {
        const valor = email.trim().toLowerCase();
        // Formato email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(valor)) {
            throw new Error(`El email no tiene un formato válido.`);  
        }

        return valor;
    }

    // Validar cargo
    static validarCargo (cargo, nombreCampo) {
        // Selección diferente al placeholder
        if (!cargo || cargo ==="" || cargo ==="0") {
            throw new Error(`Debe seleccionar un ${nombreCampo}.`);    
        }

        return cargo;
    }
    
}


// Registro de usuario

let registroUsuario = document.getElementById('registroUsuario');

registroUsuario.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
        const usuario = new Usuario (
            document.getElementById('nombreInput').value,
            document.getElementById('apellidoInput').value,
            document.getElementById('cargoInput').value,
            document.getElementById('celularInput').value,
            document.getElementById('emailInput').value
        );

        // Guardar usuario
        if (usuario.guardarUsuario()) {
            confirm(`¡Usuario ingresado correctamente! Ya estás en la base de datos de Onda Sonar, ${Usuario.nombre}. \nTu código de empleado es: ${Usuario.codigo}`);
            
        } else {
            alert('Error al guardar usuario');
            
        }
        
        
        
    } catch (error) {
        alert(`Error: ${error.message}`);
        verError(error.message);
        
    }


})


// function verError (mensaje) {
//     const 
// }