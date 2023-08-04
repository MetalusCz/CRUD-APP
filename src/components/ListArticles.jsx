import axios from "axios";
//import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function ListArticles(props) {
  const {posts, getArticles} = props

  // const [posts, setArticles] = useState([]);
  // useEffect(() => {
  //   getArticles();
  // }, []);

  // function getArticles() {
  //   axios.get("http://localhost:80/api/articles/").then(function (response) {
  //     console.log(response.data);
  //     setArticles(response.data);
  //   });
  // }

  const deleteArticle = (id) => {
    axios.delete(`http://localhost:80/api/article/${id}/delete`).then(function (response) {
      console.log(response.data);
      getArticles();
    });
  };

  return (
    <div>
      <h1>List Articles</h1>
      <Table striped bordered hover align="center" border="1px" cellPadding="10">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, key) => (
            <tr key={key}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.text}</td>
              <td>{post.author}</td>
              <td>
              <Link className="edit btn btn-warning" to={`articles/${post.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                <Button variant="danger" onClick={() => deleteArticle(post.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
