import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import  Button  from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export default function ListUser (props) {
    const {getUsers} = props;

    const navigate = useNavigate();

    const[inputs, setInputs] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/users/${id}`).then(function(response){      
            console.log(response.data);
            setInputs(response.data);
        });
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.put(`http://localhost:80/api/users/${id}/edit`, inputs).then(function(response) {
            getUsers();
            console.log(response.data);
            if (response.data.status !== 1){
                alert("Update user is failed");
                return;
              }
            alert("Update user is successfully")
            navigate('/');
        }).catch(function(){
            alert("Update user is failed");
        });;
    }
    return (
        <div>
            <h1>Edit User</h1> 
            <form onSubmit={handleSubmit}>  
            <Table striped bordered hover align="center" border="1px" cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Full Name: </label>
                            </th>
                            <td>
                                <input value={inputs.name} type="text" name="name" onChange={handleChange} required/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Email: </label>
                            </th>
                            <td>
                                <input value={inputs.email} type="text" name="email" onChange={handleChange} required/>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label>Phone: </label>
                            </th>
                            <td>
                                <input value={inputs.mobile} type="number" name="mobile" onChange={handleChange} required/>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" align="center" >
                            <Button type="submit" variant="outline-primary">Update</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </form>
        </div>
    );
};