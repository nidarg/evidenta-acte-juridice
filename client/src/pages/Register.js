import React from 'react';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Logo, FormRow, Alert } from "../components"
import styled from 'styled-components'
import { useAppContext } from "../context/appContext"



const initialState = {
  name: '',
  email: '',
  password: '',
  isMember:false
}

const Register = () => {

  const [values, setValues] = useState(initialState)

  const {isLoading, showAlert, displayAlert, registerUser, loginUser, user} = useAppContext()
  
  const navigate = useNavigate()

  // global state and useNavigate



    const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value})
    }
  
    const onSubmit = (e) => {
      e.preventDefault()
      const{name, email, password, isMember} = values
      
      if(!email || !password || (!isMember && !name)){
        displayAlert()
        return
      }
      const currentUser = {name, email, password}
      if(isMember){
        loginUser(currentUser)
      }else{
        registerUser(currentUser)
      }
      
    }

    // ! very important -> useEffect after onSubmit
    useEffect(()=>{
      if(user){
        setTimeout(()=>{
          navigate('/dosar')
          window.location.reload(false);
        },1000)
      }
    },[user,navigate])

    const toggleMember = ()=>{
      setValues({...values, isMember : !values.isMember})
    }

    return (
      <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        {<h3>{values.isMember? 'Login' : 'Register'}</h3>}
        {showAlert && <Alert/>}
        {/* name field */}
        {!values.isMember && (
          <FormRow type='text' name='name' value= {values.name} handleChange={handleChange} />
        )}
       
       {/* email field */}
       <FormRow type='email' name='email' value= {values.email} handleChange={handleChange} />

       {/* passsword field */}
       <FormRow type='password' name='password' value= {values.passsword} handleChange={handleChange} />

        <button type='submit' disabled = {isLoading} className='btn btn-block'>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
    )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`

export default Register