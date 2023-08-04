import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


export default function CreateArticles(props) {
  const {users,getArticles} = props;

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:80/api/articles/save', inputs).then(function(response) {
      console.log(response.data);
      if (response.data.status !== 1){
        alert("Create article is failed");
        return;
      }
      alert("Create article is successfully");
      getArticles();
      navigate('/post/list');
    }).catch(function(){
      alert("Create article is failed");
    });
  };
  return (
    <div>
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <Table striped bordered hover align="center" border="1px" cellSpacing="10">
          <tbody>
            <tr>
              <th>
                <label>Title: </label>
              </th>
              <td>
                <input type="text" name="title" onChange={handleChange} required/>
              </td>
            </tr>

            <tr>
              <th>
                <label>Content: </label>
              </th>
              <td>
                <textarea name="text" rows="4" onChange={handleChange}></textarea>
              </td>
            </tr>
            <tr>
              <th>
                <select name="user_id" onChange={handleChange} defaultValue={users?.length ? users[0].id : 0}>{users.map((el,key) => (
                  <option value={el.id} key={key}>{el.name}</option>
                ))}
                </select>
              </th>              
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <Button type="submit" variant="outline-success">Save</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
}
