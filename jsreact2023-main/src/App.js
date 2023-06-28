import logo from './logo.svg';
import './App.css';
// import './mycss.css'
// import * as classstyle from './mycs.module.css'
import React, { useEffect, useState, useReducer } from 'react';
import {  Card, Col, Row } from 'antd'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/welcome";
import User from "./pages/user";
import { useSelector } from "react-redux";


function App() {
  const [counter, setCounter] = useState()
  const [users, setUsers] = useState([])
  const [userPosts, setPosts] = useState([])

  const increment = () => {
    setCounter(counter+1)
  }
  const decrement = () => {
    if (counter > 0) setCounter(counter-1)
    
  }

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        if (res && Array.isArray(res) && res.length > 0) {
          setUsers(res)
        }
      })

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(resPost => resPost.json())
      .then(resPost => {
        if (resPost && Array.isArray(resPost) && resPost.length > 0) {
          setPosts(resPost)
        } 
      })

  }

  const loadUsers = () => {
    getData()
  }

  useEffect(()=>{
    getData()
  }, [])

  return(
    <>
        <>
        <Routes>
         <Route element={<Welcome />} path='/' />
         <Route element={<User />} path='/user'/>
        </Routes>

        </>

      <h2>  Users: <button type="" onClick={() => {loadUsers()}}>Load users</button></h2>
      <div style={{margin: 50, display: 'grid', gap: 16}}>
        {users.length > 0 &&
          users.map(user => {
            return( <Card title={user.name} key={Math.random()} headStyle={{backgroundColor: '#AFEEEE', borderColor: '#000000'}} style={{width: 600, margin:10, backgroundColor: '#E0FFFF', borderColor: '#000000'}}>
              <p  style={{width: 200, margin:10}}><strong style = {{color: '#FF4500'}}>Nickname:</strong> {user.username}</p>
              <p  style={{width: 300, margin:10}}><strong style = {{color: '#FF8C00'}}>Email:</strong> {user.email}</p>
              <p  style={{width: 300, margin:10}}><strong style = {{color: '#6A5ACD'}}>Phone:</strong> {user.phone}</p>
              <p  style={{width: 300, margin:10}}><strong style = {{color: '#006400'}}>Website:</strong> {user.website}</p>
              
              <Row gutter={10}>  
               { 
                
                userPosts.filter(post => post.userId === user.id).map(post =>{
                  return(
                    
                    <Col span={30}>
                    <Card title={post.title}  bordered={false} style={{margin:10}} headStyle={{backgroundColor: '#FFE4B5'}}>
                    <p >{post.body} </p>
                    </Card>
                    </Col>
                    
                      ) 
                
                    } 
                  )
                
              }
              </Row>
              </Card>
              )
          })
        }
      </div>

    </>
  )
}

export default App;
