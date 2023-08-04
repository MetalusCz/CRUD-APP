<?php

require_once('DbConnect.php'); 

class Article {
    private $conn;

    public function __construct() {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
    }

    public function createArticle($article) {
        $sql = "INSERT INTO posts (title, text, author, created_at) 
                VALUES (:title, :text, :author, :created_at)";
        $stmt = $this->conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':title', $article->title);
        $stmt->bindParam(':text', $article->text);
        $stmt->bindParam(':author', $article->user_id);
        $stmt->bindParam(':created_at', $created_at);
    
        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'Article created successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to create article.']);
        }
    }
    

    public function getArticles() {
        $sql = "SELECT posts.id, posts.title, posts.text, users.name as author, posts.created_at 
                FROM posts 
                LEFT JOIN users ON posts.author = users.id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $articles = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $articles;
    }

    public function getArticleById($id) {
        $sql = "SELECT posts.id, posts.title, posts.text, users.name as author, posts.text, posts.created_at 
                FROM posts 
                LEFT JOIN users ON posts.author = users.id 
                WHERE posts.id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $article = $stmt->fetch(PDO::FETCH_ASSOC);
        return $article;
    }

    public function updateArticle($article) {
        $sql = "UPDATE posts SET title = :title, text = :text, updated_at = :updated_at WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $article->id);
        $stmt->bindParam(':title', $article->title);
        $stmt->bindParam(':text', $article->text);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'Article updated successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to update article.']);
        }
    }

    public function deleteArticle($id) {
        $sql = "DELETE FROM posts WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'Article deleted successfully.']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to delete article.']);
        }
    }
}

?>