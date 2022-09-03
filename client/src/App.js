import React from 'react';
import { Landing,Register, Error, ProtectedRoute } from './pages';
import {  Profile, SharedLayout, Dosare,Acte, AddDosar, AddAct, ActeUrgente } from './pages/dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>
            
        }>
          <Route index path = 'dosar' element = {<Dosare/>}/>
          
          <Route exact path = 'acte/:id' element = {<Acte/>}/>
          <Route exact path = 'acte-urgente' element = {<ActeUrgente/>}/>
          
          
          <Route path = 'add-dosar' element = {<AddDosar/>}/>
          <Route path = 'acte/add-act/:dosarId' element = {<AddAct/>}/>
          <Route path = 'profile' element = {<Profile/>}/>
          
          

        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/landing' element={<Landing/>} />
        <Route path='*' element={<Error/>} />
        
      </Routes>
    </BrowserRouter>
   

  );
}

export default (App);
