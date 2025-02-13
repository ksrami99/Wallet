import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import SendMoney from './pages/SendMoney';
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import TransferSuccess from './pages/TransferSuccess';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/send' element={<SendMoney/>} />
      <Route path='/sent' element={<TransferSuccess/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App