<?php
// Datos de conexión a la base de datos
$servername = "localhost"; // Generalmente es localhost
$username = "root"; // Nombre de usuario por defecto en XAMPP
$password = "Tom50744149249"; // Contraseña de XAMPP
$dbname = "registerlog"; // Nombre de la base de datos

// Crear la conexión
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$nombre_usuario = $_POST['nombre_usuario'];
$contrasena = $_POST['contrasena'];
$confirmar_contrasena = $_POST['confirmar_contrasena'];

// Verificar que las contraseñas coincidan
if ($contrasena !== $confirmar_contrasena) {
    die("Las contraseñas no coinciden.");
}

// Verificar si el correo ya existe en la base de datos
$sql_verificar_correo = "SELECT * FROM usuarios WHERE correo = '$correo'";
$result = $conn->query($sql_verificar_correo);

if ($result->num_rows > 0) {
    // El correo ya existe, redirigir a una página específica
    header("Location: ../pages/correo_existente.html");
    exit(); // Detener el script después de redirigir
}

// Encriptar la contraseña
$contrasena_encriptada = password_hash($contrasena, PASSWORD_BCRYPT);

// Insertar los datos en la base de datos
$sql_insertar = "INSERT INTO usuarios (nombre, apellido, correo, nombre_usuario, contrasena) 
                 VALUES ('$nombre', '$apellido', '$correo', '$nombre_usuario', '$contrasena_encriptada')";

if ($conn->query($sql_insertar) === TRUE) {
    echo "Registro exitoso";
    header("Location: ../index.html"); // Redirige al usuario al inicio después de registrarse
    exit();
} else {
    echo "Error: " . $sql_insertar . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
