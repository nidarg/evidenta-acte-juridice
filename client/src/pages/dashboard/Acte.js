import React from 'react';
import {useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import styled from 'styled-components'
import { AiOutlineSmile} from 'react-icons/ai'
import { FaFortAwesomeAlt } from "react-icons/fa";
import Moment from 'react-moment'
import moment from 'moment'


const Acte=()=>{
  
  const {acte, getActe, getDosar,dosar} = useAppContext()
  const {id} = useParams()
  // console.log(`dosar ID ${id}`);

  useEffect(()=>{
    
    getDosar(id)  
    if(dosar){
      getActe(id)
    }
  },[id])

  // useEffect(()=>{
  //   getActe(id)
   
  // },[id])

  const getRemainingDays = (actDate)=>{
    const finalDate = Object.values(actDate)[0].substring(0,10)
    // console.log("date from database", finalDate);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString();  
    const todaySubstring = today.substring(0,10)

    const day = moment(todaySubstring);
    // console.log('day', day);
    let businessDays = 0;
    while (day.isBefore(finalDate, 'day')) {
      if (day.day() !== 0 && day.day() !== 6) {
        businessDays++;
      }
    day.add(1, 'd');
  }
  return businessDays;
  }

  
    // const diff = Math.abs(finalDate - todaySubstring)
    // console.log(`today ${todaySubstring}` );
    // console.log(diff / (1000 * 60 * 60 * 24 ));
    // return diff / (1000 * 60 * 60 * 24 )
  

  

 
return(
  <Wrapper>
  {!acte ? (
    <div className="no-dosar">
      <h3> Niciun act adaugat</h3>
      <p>Adauga acte la dosar</p>
    </div>
    
  ):(
   
      <div className="container-dosare">
        <div className="container-dosar"> 
          <h4>Dosar nr {dosar.nrDosar}, {dosar.parteDosar}</h4> 
          
          {acte.map(act=>{
            const {actProcedural, dataDosar} =act
            return (
              
                <div key = {act._id} className="dosar">
                  <span className="act-procedural">{actProcedural}</span>
                  <span className="data-dosar"><Moment format='DD/MM/YYYY'>{dataDosar}</Moment> </span>
                  {/* <span> <Moment fromNow >{dataDosar}</Moment></span> */}
                 
                  
                  {getRemainingDays({dataDosar}) < 5 ?(
                    <div className="termen">
                      
                        <span>{ getRemainingDays({dataDosar})} zile lucratoare</span>
                      <span>
                      <FaFortAwesomeAlt style={{color:'#d00c1d',fontSize:'1.5rem', marginLeft:'.4rem'}} />
                      </span>
                    </div>
                  ):(

                    <div className="termen">
                      
                        <span>{ getRemainingDays({dataDosar})} zile lucratoare</span>
                      <span className="icon-alert">
                      <AiOutlineSmile style = {{color:'#15955b',fontSize:'1.5rem', marginLeft:'.4rem'}} />
                      </span>
                    </div>
                   
                    
                  ) 

                }
                </div>

              )   
          })}
        </div>   
        <Link to='/dosar'><button className='btn btn-block'>
          Vezi Dosare
          </button></Link>
      </div>
  )
  }
  </Wrapper>
)
  }

  const Wrapper = styled.section`
  .no-dosar{
    width:var(--max-width);
    height:90vh;
    color: var(--primary-700);
    background-color: var(--grey-200);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20rem;
    h3{
      font-size: 5rem;
      margin-bottom: 2rem;
    }
    p{
      font-size: 2.5rem;
    }
  }

  .container-dosare{
    margin:0 auto;
    padding-top: 5rem;
    max-width:1200px;
    height:100vh;
    color: var(--primary-700);
    background-color: var(--grey-50);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-dosar{
    background-color: var(--grey-100);
    width:100%;
    margin:3rem auto;
    display: flex;
    flex-direction: column;
    h4{
      text-align: center;
      font-size: 2.2rem;
    }

  }

  .dosar{
    width:100%;
    display:flex;
    justify-content: space-between;
   align-items:center;
    padding:.5rem 2rem;
    font-size: 1.5rem;
    background-color:var(--grey-50) ;
    margin:2rem 0;

    .act-procedural
    .data-dosar
    .termen{
      max-width:25%;
      text-align: center;
    }

    .termen{
      display:flex;
      justify-content: space-between;
      align-items: center;
      
    }
  }

  .btn-container{
    width:100%;
    display:flex;
    justify-content: space-around;
    padding:.5rem 2rem;

    .delete-dosar{
      background-color: var( --red-dark);
      :hover{
        background-color: var(--red-light);
      }
    }

    .edit-dosar{
      background-color: var( --green-light);
      :hover{
        background-color: var(--green-dark);
      }
    }
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`

export default Acte