import React from 'react';
import FormRow from './FormRow'
import { useAppContext } from '../context/appContext'
import styled from 'styled-components'


const SearchContainer = ()=>{
  const{isLoading, search,handleChange, clearFilters} = useAppContext()

  const handleSearch = (e)=>{
    
    if(isLoading){
      return
    }
    
    
    handleChange({name:e.target.name, value:e.target.value})
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault()
    clearFilters()
  }

  return(
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>cauta dosar</h4>
        <div className="form-center">
          <FormRow type='search' name='search' value={search} handleChange={handleSearch}></FormRow>
          <button
            className='btn btn-block delete-dosar'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
          
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form {
    max-width: 100%;
    /* max-width: 800px; */
    /* position: fixed; */
    max-height:20rem;
    margin:3rem auto;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .delete-dosar{
      background-color: var( --red-dark);
      :hover{
        background-color: var(--red-light);
      }
    }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (max-width: 768px) {
    .form {
      max-height: 15rem;
      margin:0 auto;
      
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

export default SearchContainer