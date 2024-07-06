<?php
// Habilitar exibição de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db_config = include 'db_config.php';

$servername = $db_config['servername'];
$username = $db_config['username'];
$password = $db_config['password'];
$dbname = $db_config['dbname'];

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$date = $_GET['date']; // Receber a data do parâmetro GET

// Consulta SQL para obter os dados de temperatura para a data especificada
$sql = "SELECT 
            DATE(created_at) AS date,
            AVG(field1) AS avg_field1,
            MIN(field1) AS min_field1,
            MAX(field1) AS max_field1,
            AVG(field2) AS avg_field2,
            MIN(field2) AS min_field2,
            MAX(field2) AS max_field2,
            AVG(field3) AS avg_field3,
            MIN(field3) AS min_field3,
            MAX(field3) AS max_field3
        FROM feeds
        WHERE DATE(created_at) = '$date'
        GROUP BY DATE(created_at)
        LIMIT 10"; // Limitar a 10 registros por dia

$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$conn->close();

// Definir o cabeçalho para JSON e garantir que não haja espaço em branco antes
header('Content-Type: application/json');
echo json_encode($data);
?>
