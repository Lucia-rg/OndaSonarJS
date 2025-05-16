document.addEventListener('DOMContentLoaded', function () {
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