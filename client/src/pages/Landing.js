import React from 'react'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import {Logo} from '../components'
import {Link} from 'react-router-dom'


const Landing = () => {
  return (
    <div>
     <Wrapper>
      
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Evidenta <span>Acte Juridice</span></h1>
          <p>Aceasta aplicatie va permite gestionarea eficienta a dosarelor juridice si a actelor aferente, precum si a termenelor de instanta </p>
          <Link to = '/register' className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="" className="img main-img" />
      </div>
      
    </Wrapper>
    
    </div>
   
    
  )
}

const Wrapper = styled.main`
  nav{
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin:0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page{
    min-height: calc(100vh - var(--nav-height));
    display:grid;
    align-items:center;
    margin-top: -3rem;
  }

  h1{
    font-weight: 700;
    span{
      color:var(--primary-500);
    }
  }

  p{
    color:var(--grey-500);
  }

  .main-img{
    display: none;
  }

  @media (min-width:992px) {
    .page{
      grid-template-columns: 1fr 1fr;
      column-gap:3rem;
    }

    .main-img{
      display:block;
    }
  }

`

export default Landing