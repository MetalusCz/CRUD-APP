<?php
include 'DbConnect.php';

class User {
    private $conn;

    public function __construct() {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function getUsers() {
        $sql = "SELECT * FROM users";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($id) {
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createUser($user) {
        $sql = "INSERT INTO users(name, email, mobile, created_at) VALUES (:name, :email, :mobile, :created_at)";
        $stmt = $this->conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);

        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'User created successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to create user.']);
        }
    }

    public function updateUser($user) {
        $sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'User created successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to create user.']);
        }
    }

    public function deleteUser($id) {
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?> 
