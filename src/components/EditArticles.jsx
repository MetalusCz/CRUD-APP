import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export default function ListArticles(props) {
  const {getArticles} = props;

  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  function getArticle() {
    axios.get(`http://localhost:80/api/articles/${id}`).then(function(response) {      
      console.log(response.data);
      setInputs(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:80/api/articles/${id}/edit`, inputs).then(function(response) 
    {
      getArticles();
      console.log(response.data);
      if (response.data.status !== 1){
        alert("Update article is failed");
        return;
      }
      alert("Update article is successfully")
      navigate('/post/list');
    }).catch(function(){
      alert("Update article is failed");
    });;
  }

  return (
    <div>
      <h1>Edit Article</h1>
      <form onSubmit={handleSubmit}>
      <Table striped bordered hover align="center" border="1px" cellSpacing="10">
          <tbody>
            <tr>
              <th>
                <label>Title: </label>
              </th>
              <td>
                <input value={inputs.title} type="text" name="title" onChange={handleChange} required/>
              </td>
            </tr>

            <tr>
              <th>
                <label>Content: </label>
              </th>
              <td>
                <textarea value={inputs.text} name="text" rows="4" onChange={handleChange}></textarea>
              </td>
            </tr>

            <tr>
              <td colSpan="2" align="center">
                <Button type="submit" variant="outline-primary">Update</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
}
