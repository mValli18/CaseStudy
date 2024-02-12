import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Register from './components/Register';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Lauch from './components/Lauch';
import Books from './components/Books';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import DeleteBook from './components/Deletebook';
import UpdateBook from './components/UpdateBook';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          
        <Route path="/" element={<Lauch/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/books' element={<Books/>}/>
          <Route path="/logout" element={<Login />}/>
          <Route path="/booklist" element={<BookList/>}/>
          <Route path='/addbook' element={<AddBook/>}/>
          <Route path='/deletebook' element={<DeleteBook/>}/>
          <Route path='/updatebooks' element={<UpdateBook/>}/>
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;