import React from 'react';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Logo, FormRow, Alert } from "../../components"
import styled from 'styled-components'
import { useAppContext } from "../../context/appContext"



const initialState = {
  nrDosar: '',
  parteDosar: '',
}

const AddDosar = () => {

  const [values, setValues] = useState(initialState)

  const {isLoading, showAlert, displayAlert, addDosar,user} = useAppContext()
  
  const navigate = useNavigate()

    const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value})
    }
  
    const onSubmit = (e) => {
      e.preventDefault()
      const{nrDosar, parteDosar} = values
      
      if(!nrDosar || !parteDosar || !user.id){
        displayAlert()
        return
      }
      console.log(user);
      const userId = user.id
      
      const currentDosar = {userId,nrDosar, parteDosar, }
      console.log(currentDosar);
      addDosar(currentDosar)
      setTimeout(()=>{
        navigate('/dosar')
      },3000)
    }

    // ! very important -> useEffect after onSubmit
    // useEffect(()=>{
    //   if(successAddDosar){
    //     setTimeout(()=>{
    //       navigate('/dosare')
    //     },3000)
    //   }
    // },[navigate])

    return (
      <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
       
        {showAlert && <Alert/>}
       
       
          <FormRow type='text' name='nrDosar' value= {values.nrDosar} handleChange={handleChange} />
      
       
       <FormRow type='text' name='parteDosar' value= {values.parteDosar} handleChange={handleChange} />

        <button type='submit' disabled = {isLoading} className='btn btn-block'>
          submit
        </button>
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

export default AddDosar