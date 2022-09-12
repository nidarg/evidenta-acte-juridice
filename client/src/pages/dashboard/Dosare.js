import React from 'react';
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import styled from 'styled-components'
import { SearchContainer } from '../../components' 
import RingLoader from 'react-spinners/RingLoader'
import PageBtnContainer from '../../components/PageBtnContainer';

const Dosare = ()=>{

  const {user,dosare, getDosare, deleteDosar, search, page, backToDosare, isLoading, numOfPages} = useAppContext()
const navigate = useNavigate()
  
const userId = user._id
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
    getDosare()
   
  },[userId,search, page])

  

  const removeDosar=(id)=>{
    deleteDosar(id)
    window.location.reload(false);
  }

  

return(
  <Wrapper>
    {isLoading && 
      <RingLoader
        color="#0e7c86"
        cssOverride={{
          margin: '0 auto'
        }}
        size={200}
    />}
    {search && dosare.length === 0 &&(<div className="no-dosar">
      <h3> Nu s-a gasit niciun dosar</h3>
      <button className='btn vezi-dosar' onClick={backToDosare}>
          back home
          </button>
      
    </div>)}
  {(!isLoading && !search && dosare.length === 0) ? (
    <div className="no-dosar">
      <h3> Niciun dosar adaugat</h3>
      <p>Adauga dosar</p>
      
    </div>
    
  ):(
    <>  
 
      <div className="container-dosare">
        <div className="search">
        <SearchContainer/>
        </div>
          {dosare.map((dosar)=>{
            const {nrDosar, parteDosar} = dosar
            return (
            <div className='container-dosar'key = {dosar._id} >
              <div  className="dosar">
                <span className="numar-dosar">{nrDosar}</span>
                <span className="parteDosar">{parteDosar}</span>
              </div>
              <div className="btn-container">
                <Link to = {`/acte/add-act/${dosar._id}`}>
                    <button className="btn edit-dosar" >Editeaza dosar</button>
                  </Link>
          
                  <button className="btn delete-dosar" onClick={()=>removeDosar(dosar._id)}>Sterge dosar</button>
                  <Link to={`/acte/${dosar._id}`}>
                    <button className="btn vezi-dosar">Detalii Dosar</button>
                  </Link>
              </div>
               
            </div>
              
            )
          })}
          {numOfPages > 1 && <PageBtnContainer/>}
      </div>
      </>
  )
  }
  </Wrapper>
)
  }

  const Wrapper = styled.section`
  .no-dosar{

    width:var(--full-width);
    /* width:var(--fixed-width);
    height:var(--fixed-height); */
    margin:0 auto;
    color: var(--primary-700);
    background-color: var(--grey-200);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;
    h3{
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    p{
      font-size: 2rem;
    }
  }

  .container-dosare{
    margin:5rem auto;
    padding-top: 3rem;
    max-width:800px;
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

  }

  .dosar{
    width:100%;
    display:flex;
    justify-content: space-around;
   
    padding:.5rem 2rem;
    font-size: 2rem;
  }
  .search{
    max-width:800px;
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

  @media(max-width:768px){
   
    .dosar{
      flex-direction: column;
    }
  }
  
`

export default Dosare