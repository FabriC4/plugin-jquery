
$(document).ready(function () {
    // Lista de sufijos de correo electrónico
    const emailDomains = [
        'gmail.com',
        'hotmail.com',
        'yahoo.com',
        'outlook.com',
        'live.com',
        'icloud.com'
    ];

    $('#email-input').on('input', function () {
        const inputValue = $(this).val();

        // Verificar si hay un '@' en el valor
        const atIndex = inputValue.indexOf('@');
        if (atIndex >= 0) {
            const prefix = inputValue.slice(0, atIndex); // Parte antes de '@'
            const domainInput = inputValue.slice(atIndex + 1); // Parte después de '@'

            // Solo autocompletar si hay al menos 3 caracteres en el dominio introducido
            if (domainInput.length >= 3) {
                // Buscar si hay un dominio que coincida con lo introducido
                const matchedDomain = emailDomains.find(domain => domain.startsWith(domainInput));
                if (matchedDomain) {
                    const autoCompleteValue = prefix + '@' + matchedDomain;
                    $(this).val(autoCompleteValue); // Reemplaza el valor en el input
                }
            }
        }
    });
});

// Cargar la preferencia de tema cuando la página se carga
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Obtiene el tema guardado en localStorage o usa 'light' por defecto
    console.log('Tema guardado en localStorage:', savedTheme);  // Log para verificar el valor del tema guardado

    // Aplica el tema oscuro si está guardado en localStorage
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');  // Añade la clase 'dark-theme' al body
        document.getElementById('theme-toggle').innerText = 'Cambiar a Tema Claro';  // Cambia el texto del botón
    } else {
        document.getElementById('theme-toggle').innerText = 'Cambiar a Tema Oscuro';  // Cambia el texto del botón si el tema es claro
    }
});

// Alternar entre tema claro y oscuro
document.getElementById('theme-toggle').addEventListener('click', function() {
    // Si el tema actual es oscuro, cambiar a claro
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');  // Elimina la clase 'dark-theme'
        localStorage.setItem('theme', 'light');  // Guarda la preferencia de tema claro en localStorage
        console.log('Tema cambiado a claro');  // Log para verificar el cambio a claro
        this.innerText = 'Cambiar a Tema Oscuro';  // Cambia el texto del botón
    } else {
        // Si el tema actual es claro, cambiar a oscuro
        document.body.classList.add('dark-theme');  // Añade la clase 'dark-theme'
        localStorage.setItem('theme', 'dark');  // Guarda la preferencia de tema oscuro en localStorage
        console.log('Tema cambiado a oscuro');  // Log para verificar el cambio a oscuro
        this.innerText = 'Cambiar a Tema Claro';  // Cambia el texto del botón
    }
});

// Js para el simulador de partidos
// Añade un evento al formulario de los equipos que se ejecuta cuando el formulario se envía
document.getElementById('team-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener los valores de los equipos ingresados, eliminando espacios innecesarios
    const teamA = document.getElementById('teamA').value.trim(); // Obtiene el valor del equipo A, eliminando espacios en blanco
    const teamB = document.getElementById('teamB').value.trim(); // Obtiene el valor del equipo B, eliminando espacios en blanco

    // Verificar si los nombres de los equipos han sido ingresados
    if (!teamA || !teamB) {
        alert('Por favor ingresa los nombres de ambos equipos.'); // Muestra una alerta si algún equipo no ha sido ingresado
        return; // Salir de la función para no continuar con la simulación
    }

    // Simular el resultado del partido entre los dos equipos
    const resultado = simularResultado(teamA, teamB);  // Llama a la función para simular el resultado del partido
    
    // Mostrar el resultado en el elemento con id 'resultado-partido'
    document.getElementById('resultado-partido').textContent = resultado;  // Muestra el resultado en el HTML
});

// Función que simula el resultado del partido entre teamA y teamB
function simularResultado(teamA, teamB) {
    // Genera goles aleatorios entre 0 y 4 para ambos equipos
    const golesA = Math.floor(Math.random() * 5); // Genera un número aleatorio de goles para el equipo A
    const golesB = Math.floor(Math.random() * 5); // Genera un número aleatorio de goles para el equipo B

    // Comparar los goles de ambos equipos y devolver el resultado del partido
    if (golesA > golesB) {
        return `${teamA} gana con un resultado de ${golesA} a ${golesB}.`; // El equipo A gana si tiene más goles
    } else if (golesB > golesA) {
        return `${teamB} gana con un resultado de ${golesB} a ${golesA}.`; // El equipo B gana si tiene más goles
    } else {
        return `El partido entre ${teamA} y ${teamB} termina en empate ${golesA} a ${golesB}.`; // Si tienen el mismo número de goles, es un empate
    }
}










