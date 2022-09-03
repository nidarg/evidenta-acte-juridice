import React from 'react';
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Logo, FormRow, Alert } from "../../components"
import styled from 'styled-components'
import { useAppContext } from "../../context/appContext"




const AddAct = () => {

  const [inputFields, setInputFields] = useState([
    {  actProcedural: '', dataDosar: ''}
  ])

  const {dosarId} = useParams()

  const {isLoading, showAlert, displayAlert, addAct,dosar, getDosar, user} = useAppContext()
  
  const navigate = useNavigate()
 

  useEffect(()=>{
    
    getDosar(dosarId)  
  },[dosarId])

 

    const handleChange = (index, event) => {
      let data = [...inputFields];
      data[index][event.target.name] = event.target.value;
      setInputFields(data);
    }
    console.log(`INPUT ${inputFields}`);
  
    const onSubmit = (e) => {
      e.preventDefault()
      // console.log(inputFields);
    
      // eslint-disable-next-line
      inputFields.map((input,index)=>{

        const{actProcedural, dataDosar} = input
        
      
        if(!actProcedural || !dataDosar || !dosarId){
          displayAlert()
          // eslint-disable-next-line
          return
        }
        const userId = user.id
        const currentAct = {actProcedural, dataDosar, dosarId,userId}
        addAct(currentAct,dosarId, )  
      })
      //  getActe(dosarId)
      
              setTimeout(() => {
                navigate(`/acte/${dosarId}`)
                window.location.reload(false);
              },3000);
          
    }

    // console.log(`COUNT ${count}`);
        console.log((`InputFields length ${inputFields.length}`));
       

    // useEffect(()=>{
    //   if(count === inputFields.length){
    //       setTimeout(() => {
    //         navigate(`/acte/${dosarId} `)
    //       },3000);
    //     }
    // })

    const addFields = ()=>{
      let newField = {  actProcedural: '', dataDosar: undefined}
      setInputFields([...inputFields, newField])
    }

    

    return (
      <Wrapper className='full-page'>
        <h4>Dosar nr {dosar.nrDosar}, {dosar.parteDosar}</h4> 
      <form className='form' onSubmit={onSubmit}>
        <Logo />
       
        {showAlert && <Alert/>}
       
       {inputFields.map((input,index)=>{

        return (
          <div key={index} className="input">
             <FormRow type='text' name='actProcedural' value= {input.actProcedural} handleChange={e=>handleChange(index, e)} />
             <FormRow type='date' name='dataDosar' value= {input.dataDosar} handleChange={e=>handleChange(index, e)} />
          </div>
        )
       })}

        <button type='button' className='btn btn-block' onClick = {addFields}>
          Adauga Act...
        </button>
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

export default AddAct