<?php
session_start(); // Iniciar la sesión

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$pass = "Tom50744149249";
$dbname = "registerlog";

$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar si hay errores en la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar si se enviaron datos a través del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    // Preparar la consulta SQL para evitar inyecciones SQL
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre_usuario = ? OR correo = ?");
    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // El usuario existe
        $usuario = $result->fetch_assoc();

        // Verificar la contraseña
        if (password_verify($contrasena, $usuario['contrasena'])) {
            // Guardar el nombre del usuario en la sesión
            $_SESSION['nombre_usuario'] = $usuario['nombre_usuario'];

            // Redirigir al index
            header("Location: ../index.html");
            exit();
        } else {
            header("Location: ../pages/contrasena_incorrecta.html");
        }
    } else {
        header("Location: ../pages/no_existe_usuario.html");
    }

    // Cerrar la consulta y la conexión
    $stmt->close();
}
$conn->close();
?>
