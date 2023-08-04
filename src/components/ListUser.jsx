import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export default function ListUser(props) {
    const {users, getUsers} = props

    const deleteUser = (id) => {
        axios.delete(`http://localhost:80/api/users/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    } 

    return (
        <div>
            <h1>List Users</h1> 
            <Table striped bordered hover align="center" border="1px" cellPadding="10">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                                <Link className="edit btn btn-warning" to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}                     
                </tbody>
            </Table>
        </div>
    );
};
