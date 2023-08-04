<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'User.php';
include 'Articles.php';

$userManager = new User();
$articleManager = new Article();

$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', $_SERVER['REQUEST_URI']);

switch ($method) {
    case "GET":
        
        if ($path[2] == 'users'){        
            if (isset($path[3]) && is_numeric($path[3])) {
                $users = $userManager->getUserById($path[3]);
            } else {
                $users = $userManager->getUsers();
            }
    
            echo json_encode($users);
        } else {
            if (isset($path[3]) && is_numeric($path[3])) {
                $articles = $articleManager->getArticleById($path[3]);
            } else {
                $articles = $articleManager->getArticles();
            }
            echo json_encode($articles);
        }

        break;

    case "POST":
        if ($path[2] == 'users'){
            $user = json_decode(file_get_contents('php://input'));
            if ($userManager->createUser($user)) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
        } else {
            $articles = json_decode(file_get_contents('php://input'));
            if ($articleManager->createArticle($articles)) {
                $response = ['status' => 1, 'message' => 'Record created successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to create record.'];
            }
        }
        break;

    case "PUT":
        if ($path[2] == 'users'){
            $user = json_decode(file_get_contents('php://input'));
            if ($userManager->updateUser($user)) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
        } else {
            $articles = json_decode(file_get_contents('php://input'));
            if ($articleManager->updateArticle($articles)) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
        }
        break;

    case "DELETE":
    
        if ($path[2] == 'users'){
            if ($userManager->deleteUser($path[3])) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        } else {
            if ($articleManager->deleteArticle($path[3])) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
        }
        break;
}

?>
