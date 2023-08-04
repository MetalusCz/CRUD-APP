import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  Button  from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


export default function CreateUser (props) {
    const {getUsers} = props;
    const navigate = useNavigate();

    const[inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:80/api/users/save', inputs).then(function(response) {
            getUsers();
            console.log(response.data);
            if (response.data.status !== 1){
                alert("Create user is failed");
                return;
              }
            alert("Create user is successfully")
            navigate('/');
        }).catch(function(){
            alert("Create user is failed");
        });;
    }
    return (
        <div>
            <h1>Create User</h1> 
            <form onSubmit={handleSubmit}>  
                <Table striped bordered hover align="center" border="1px" cellPadding="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Full Name: </label>
                            </th>
                            <td>
                                <input type="text" name="name" onChange={handleChange} required/>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input type="email" name="email" onChange={handleChange} required/>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Phone: </label>
                            </th>
                            <td>
                                <input type="tel" name="mobile" pattern="^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$" onChange={handleChange} required/>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" align="center" >
                                <Button type="submit" variant="outline-success">Save</Button>                              
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </form>
        </div>
    );
};