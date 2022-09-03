import React from 'react';
import {useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import styled from 'styled-components'
import Moment from 'react-moment'
import moment from 'moment'


const ActeUrgente=()=>{
  
  const {allActs, getAllActs} = useAppContext()
 

  useEffect(()=>{
  
      getAllActs()
  },[])

  const getRemainingDays = (actDate)=>{
    const finalDate = Object.values(actDate)[0].substring(0,10)
    console.log("date from database", finalDate);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toISOString();  
    const todaySubstring = today.substring(0,10)

    const day = moment(todaySubstring);
    let businessDays = 0;
    while (day.isSameOrBefore(finalDate, 'day')) {
      if (day.day() !== 0 && day.day() !== 6) {
        businessDays++;
      }
    day.add(1, 'd');
  }
  return businessDays;
  }

 
return(
  <Wrapper>
  {!allActs ? (
    <div className="no-acte">
      <p> Niciun act adaugat</p>
      <Link to = '/' >
        <button className="btn vezi-dosar">
          back home
        </button>
      </Link>
    </div>
    
  ):(
   
      <div className="container-dosare">
         
        <div className="container-dosar"> 
       
          {
           // eslint-disable-next-line
          allActs.map(act=>{

            const {dataDosar} = act
            if(getRemainingDays({dataDosar}) < 5){
              
              const {dosarId:{nrDosar,parteDosar},actProcedural, dataDosar} =act
              // console.log('dosarId', act.dosarId);
              return(
                <div key = {act._id} className="dosar">
                  <h5>
                    <Link className='link' to={`/acte/${act.dosarId._id}`}>
                      Dosar nr {nrDosar}, {parteDosar}
                      </Link>
                      </h5>
                  <span className="act-procedural">{actProcedural}</span>
                  <span className="data-dosar"><Moment format='DD/MM/YYYY'>{dataDosar}</Moment> </span>
                  <span>
                    {getRemainingDays({dataDosar}) }<span> zile lucratoare</span>
                  </span>   
                </div>
              )
            }
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
    h5{
      text-align: center;
      font-size: 1.2rem;
    }

  }

  .dosar{
    width:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
   align-items:center;
    padding:.5rem 2rem;
    font-size: 1.1rem;
    background-color:var(--grey-50) ;
    margin:2rem 0;

    .link{
      color: var(--primary-700);
      :hover{
        color:var(--primary-500);
      }
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

  
  @media (min-width: 1100px) {
    .dosar {
      flex-direction: row;

      h5
      .act-procedural
    .data-dosar
    .termen{
      max-width:25%;
      text-align: center;
    }
    }
  }
  /* @media (min-width: 992px) {
    .dosar {
      grid-template-columns: 1fr 1fr 1fr;
    } */
    /* .btn-block {
      margin-top: 0;
    } */
  /* } */
`

export default ActeUrgente