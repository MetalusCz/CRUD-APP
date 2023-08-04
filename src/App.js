import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom';
import './App.css';
import ListUser from './components/ListUser.jsx';
import CreateUser from './components/CreateUser.jsx';
import EditUser from './components/EditUser.jsx';
import CreateArticles from './components/CreateArticles';
import ListArticles from './components/ListArticles';
import EditArticles from './components/EditArticles';
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function(response){      
            console.log(response.data);
            setUsers(response.data);
        });
    };

  const [posts, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, []);

  function getArticles() {
    axios.get("http://localhost:80/api/articles/").then(function (response) {
      console.log(response.data);
      setArticles(response.data);
    });
  }

  return (
    <div className="App">
      <h3>React CRUD operations using React, PHP, API and MySQL</h3>

      <div className="Links">
        <BrowserRouter>
        
          <nav>
            <ul>
              <li>
                <NavLink to="user/create" className='btn btn-outline-primary'>Create User</NavLink>
              </li>
              <li>
                <NavLink to="post/create" className='btn btn-outline-primary'>Create Articles</NavLink>
              </li>
              <li>
                <NavLink to="/" className='btn btn-outline-primary'>List Users</NavLink>
              </li>
              <li>
                <NavLink to="post/list" className='btn btn-outline-primary' >List Articles</NavLink>
              </li>
            </ul>
          </nav>
          <hr/>
          <Routes>
            <Route index element={<ListUser users={users} getUsers={getUsers}/>}/>
            <Route path="user/create" element={<CreateUser getUsers={getUsers}/>}/>
            <Route path="user/:id/edit" element={<EditUser getUsers={getUsers}/>}/>
            <Route path="post/create" element={<CreateArticles users={users} getArticles={getArticles}/>}/>
            <Route path="post/list" element={<ListArticles posts={posts} getArticles={getArticles}/>}/>
            <Route path="post/list/articles/:id/edit" element={<EditArticles getArticles={getArticles}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
