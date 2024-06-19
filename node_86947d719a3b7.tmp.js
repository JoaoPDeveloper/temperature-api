<?php
// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "thingSpeakData";

// Criar conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Definir a URL da API com o intervalo de datas
$url = 'https://api.thingspeak.com/channels/1147067/feeds.json?start=2028-05-20&end=2026-06-13';

// Fazer a requisição para a API
$response = file_get_contents($url);
$data = json_decode($response, true);

// Verificar se a resposta contém os dados esperados
if (!isset($data['feeds'])) {
    die("Erro: Dados de feed não encontrados.");
}

// Iterar sobre os feeds e inseri-los no banco de dados
foreach ($data['feeds'] as $feed) {
    $entry_id = $feed['entry_id'];
    $created_at = date('Y-m-d H:i:s', strtotime($feed['created_at']));
    $field1 = isset($feed['field1']) ? $feed['field1'] : '';
    $field2 = isset($feed['field2']) ? $feed['field2'] : '';
    $field3 = isset($feed['field3']) ? $feed['field3'] : '';

    // Preparar a consulta SQL
    $stmt = $conn->prepare("INSERT INTO feeds (entry_id, created_at, field1, field2, field3) VALUES (?, ?, ?, ?, ?)");
    
    if ($stmt === false) {
        die("Erro ao preparar a consulta: " . $conn->error);
    }

    // Corrigir os tipos de dados
    $stmt->bind_param("issss", 
        $entry_id, 
        $created_at, 
        $field1, 
        $field2, 
        $field3
    );

    // Executar a consulta
    if (!$stmt->execute()) {
        echo "Erro ao executar a consulta: " . $stmt->error . "\n";
    }

    $stmt->close();
}

// Fechar a conexão
$conn->close();

echo "Dados inseridos com sucesso!";
?>
