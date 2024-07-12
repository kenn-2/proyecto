document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del perfil guardados al cargar la página
    cargarPerfilGuardado();
    cargarImagenPerfilGuardada();

    // Abrir modal para editar perfil
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        document.getElementById('edit-form').style.display = 'flex';
    });

    // Guardar cambios en el perfil
    document.getElementById('save-changes-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los nuevos valores del perfil
        let newFullName = document.getElementById('input-full-name').value;
        let newDNI = document.getElementById('input-dni').value;
        let newGradeSection = document.getElementById('input-grade-section').value;
        let newEmail = document.getElementById('input-email').value;

        // Actualizar el perfil con los nuevos valores
        document.getElementById('full-name').textContent = newFullName;
        document.getElementById('dni').textContent = newDNI;
        document.getElementById('grade-section').textContent = newGradeSection;
        document.getElementById('email').textContent = newEmail;

        // Guardar los cambios en el almacenamiento local
        guardarPerfilLocal(newFullName, newDNI, newGradeSection, newEmail);

        // Ocultar el formulario de edición
        document.getElementById('edit-form').style.display = 'none';
    });

    // Función para manejar la selección de imagen
    document.getElementById('file-input').addEventListener('change', function(event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-img').src = e.target.result;
                guardarImagenPerfil(e.target.result); // Guardar la imagen en el almacenamiento local
            };
            reader.readAsDataURL(file);
        }
    });

    // Función para guardar el perfil en el almacenamiento local
    function guardarPerfilLocal(fullName, dni, gradeSection, email) {
        localStorage.setItem('full-name', fullName);
        localStorage.setItem('dni', dni);
        localStorage.setItem('grade-section', gradeSection);
        localStorage.setItem('email', email);
    }

    // Función para cargar el perfil guardado del almacenamiento local
    function cargarPerfilGuardado() {
        let storedFullName = localStorage.getItem('full-name');
        let storedDNI = localStorage.getItem('dni');
        let storedGradeSection = localStorage.getItem('grade-section');
        let storedEmail = localStorage.getItem('email');

        if (storedFullName) {
            document.getElementById('full-name').textContent = storedFullName;
        }
        if (storedDNI) {
            document.getElementById('dni').textContent = storedDNI;
        }
        if (storedGradeSection) {
            document.getElementById('grade-section').textContent = storedGradeSection;
        }
        if (storedEmail) {
            document.getElementById('email').textContent = storedEmail;
        }
    }

    // Función para guardar la imagen de perfil en el almacenamiento local
    function guardarImagenPerfil(imageBase64) {
        localStorage.setItem('profile-img', imageBase64);
    }

    // Función para cargar la imagen de perfil guardada del almacenamiento local
    function cargarImagenPerfilGuardada() {
        let storedImage = localStorage.getItem('profile-img');
        if (storedImage) {
            document.getElementById('profile-img').src = storedImage;
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formSubirCalificaciones');
    const numCalificacionesInput = document.getElementById('numCalificaciones');
    const calificacionesInputDiv = document.getElementById('calificacionesInput');
    const resultadoPromedioDiv = document.getElementById('resultadoPromedio');
    const botonCalcularPromedio = document.createElement('button');
    botonCalcularPromedio.textContent = 'Calcular Promedio';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const materia = document.getElementById('curso').value.trim();
        const dniEstudiante = document.getElementById('dniEstudiante').value.trim();
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);

        if (isNaN(numCalificaciones) || numCalificaciones < 1 || numCalificaciones > 20) {
            alert('Número de calificaciones debe estar entre 1 y 20.');
            return;
        }

        let calificaciones = [];
        let sum = 0;
        let valid = true;

        // Recorrer los inputs de calificaciones
        for (let i = 1; i <= numCalificaciones; i++) {
            const inputCalificacion = document.getElementById(`calificacion${i}`);
            const calificacion = parseFloat(inputCalificacion.value);

            if (isNaN(calificacion) || calificacion < 0 || calificacion > 20) {
                alert('Las calificaciones deben ser números entre 0 y 20.');
                valid = false;
                break;
            }

            calificaciones.push(calificacion);
            sum += calificacion;
        }

        if (valid) {
            const promedio = sum / numCalificaciones;
            resultadoPromedioDiv.innerHTML = `Promedio: ${promedio.toFixed(2)}`;
            alert('Calificaciones subidas correctamente.');
        }
    });

    numCalificacionesInput.addEventListener('change', function() {
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);

        if (isNaN(numCalificaciones) || numCalificaciones < 1 || numCalificaciones > 20) {
            alert('Número de calificaciones debe estar entre 1 y 20.');
            return;
        }

        calificacionesInputDiv.innerHTML = '';

        for (let i = 1; i <= numCalificaciones; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `calificacion${i}`;
            input.name = `calificacion${i}`;
            input.min = 0;
            input.max = 20;
            input.step = 0.1;
            input.placeholder = `Calificación ${i}`;
            calificacionesInputDiv.appendChild(input);
        }

        // Agregar botón de calcular promedio
        calificacionesInputDiv.appendChild(botonCalcularPromedio);
    });

    // Evento para calcular promedio
    botonCalcularPromedio.addEventListener('click', function() {
        const numCalificaciones = parseInt(numCalificacionesInput.value, 10);
        let sum = 0;
        let valid = true;

        for (let i = 1; i <= numCalificaciones; i++) {
            const inputCalificacion = document.getElementById(`calificacion${i}`);
            const calificacion = parseFloat(inputCalificacion.value);

            if (isNaN(calificacion) || calificacion < 0 || calificacion > 20) {
                alert('Las calificaciones deben ser números entre 0 y 20.');
                valid = false;
                break;
            }

            sum += calificacion;
        }

        if (valid) {
            const promedio = sum / numCalificaciones;
            resultadoPromedioDiv.innerHTML = `Promedio: ${promedio.toFixed(2)}`;
        }
    });
});



