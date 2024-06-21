<?php

$db_config = include 'db_config.php';

// Definir o caminho absoluto para o arquivo de log
$log_file = 'C:\\xampp\\htdocs\\cursophp\\script\\script_log.txt';

// Função para registrar logs
function log_message($message, $log_file) {
    file_put_contents($log_file, date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

$servername = $db_config['servername'];
$username = $db_config['username'];
$password = $db_config['password'];
$dbname = $db_config['dbname'];


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    log_message("Conexão falhou: " . $conn->connect_error, $log_file);
    die("Conexão falhou: " . $conn->connect_error);
}

$url = 'https://api.thingspeak.com/channels/1147067/feeds.json?start=2024-05-20&end=2026-06-13';

// requisição para a API
$response = file_get_contents($url);
$data = json_decode($response, true);

if (!isset($data['feeds'])) {
    log_message("Erro: Dados de feed não encontrados.", $log_file);
    die("Erro: Dados de feed não encontrados.");
}

foreach ($data['feeds'] as $feed) {
    $entry_id = $feed['entry_id'];
    $created_at = date('Y-m-d H:i:s', strtotime($feed['created_at']));
    $field1 = isset($feed['field1']) ? $feed['field1'] : '';
    $field2 = isset($feed['field2']) ? $feed['field2'] : '';
    $field3 = isset($feed['field3']) ? $feed['field3'] : '';

    $check_query = $conn->prepare("SELECT COUNT(*) FROM feeds WHERE entry_id = ?");
    $check_query->bind_param("i", $entry_id);
    $check_query->execute();
    $check_query->bind_result($count);
    $check_query->fetch();
    $check_query->close();

    if ($count == 0) {
        $stmt = $conn->prepare("INSERT INTO feeds (entry_id, created_at, field1, field2, field3) VALUES (?, ?, ?, ?, ?)");
        if ($stmt === false) {
            log_message("Erro ao preparar a consulta: " . $conn->error, $log_file);
            die("Erro ao preparar a consulta: " . $conn->error);
        }

        $stmt->bind_param("issss", $entry_id, $created_at, $field1, $field2, $field3);

        if (!$stmt->execute()) {
            log_message("Erro ao executar a consulta: " . $stmt->error, $log_file);
            echo "Erro ao executar a consulta: " . $stmt->error . "\n";
        } else {
            log_message("Dados inseridos: entry_id = $entry_id, created_at = $created_at", $log_file);
        }

        $stmt->close();
    } else {
        log_message("Dados já existentes: entry_id = $entry_id", $log_file);
    }
}

$conn->close();

log_message("Execução concluída com sucesso.", $log_file);
echo "Dados inseridos com sucesso!";
?>
