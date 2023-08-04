 <?php 
	class DbConnect {
		private $server = 'localhost';
		private $dbname = 'crud-app';
		private $user = 'root';
		private $pass = '';
		private $conn;
	
		public function __construct() {
			try {
				$this->conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
				exit;
			}
		}
	
		public function getConnection() {
			return $this->conn;
		}
	}
 ?> 