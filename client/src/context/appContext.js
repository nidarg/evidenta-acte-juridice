import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'
import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT ,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  TOGGLE_SIDEBAR,
  LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_DOSARE_REQUEST,
  GET_DOSARE_SUCCESS,
  GET_ACTE_REQUEST,
  GET_ACTE_SUCCESS,
  ADD_DOSAR_REQUEST,
  ADD_DOSAR_SUCCESS,
  ADD_DOSAR_FAIL,
  ADD_ACT_REQUEST,
  ADD_ACT_SUCCESS,
  ADD_ACT_FAIL,
  GET_DOSAR_REQUEST,
  GET_DOSAR_SUCCESS,
  GET_DOSAR_FAIL,
  DELETE_DOSAR_REQUEST,
  DELETE_DOSAR_SUCCESS,
  DELETE_DOSAR_FAIL,
  GET_ALL_ACTS_REQUEST,
  GET_ALL_ACTS_SUCCESS,
  GET_ALL_ACTS_FAIL,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
  CHANGE_PAGE
  
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')
// const dosare = localStorage.getItem('dosare')
// const acte = localStorage.getItem('acte')

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user:user ? JSON.parse(user) : null,
  token:token,
  userLocation:userLocation || '',
  jobLocation:userLocation || '',
  showSidebar:false,
  page:1,
  numOfPages:1,
  totalDosare:0,
  dosare:[],
  successDeleteDosar:false,
  acte: [],
  allActs:[],
  dosar:{},
  search:'',
  sort:'recente',
  sortOptions:['vechi', 'recente']

  
}

const AppContext = React.createContext()

const AppProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer,initialState)

  // axios global settings -> to not send headers with tokn auth in every request
  // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`

  const authFetch = axios.create({
    baseURL:'/api',
  })

  // using axios interceptors

  // request interceptor
  authFetch.interceptors.request.use(
    (config)=>{
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error)=>{
      return Promise.reject(error)
    }
  )

  // response interceptor
  authFetch.interceptors.response.use(
    (response)=>{
      return response
    },
    (error)=>{
      if(error.response.status === 401){
        logout()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert =() =>{
    dispatch({type:DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 3000)
  }

  const addUserToLocalStorage = ({user, token, location})=>{
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  

  const toggleSidebar = ()=>{
    dispatch({
      type:TOGGLE_SIDEBAR
    })
  }

  const registerUser = async(currentUser)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
      const response = await axios.post('/api/auth/register',currentUser)
      // console.log(response);
      const{user, token, location} = response.data
      dispatch({
        type:REGISTER_SUCCESS,
        payload:{user, token, location}
      })

      // add user to local storage
      addUserToLocalStorage({user, token, location})

    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }


  const loginUser = async(currentUser)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
      const {data} = await axios.post('/api/auth/login',currentUser)
      // console.log(response);
      const{user, token, location} = data
      dispatch({
        type:LOGIN_SUCCESS,
        payload:{user, token, location}
      })

      // add user to local storage
      addUserToLocalStorage({user, token, location})

    } catch (error) {
      console.log(error.response)
      dispatch({
        type: LOGIN_FAIL,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logout = ()=>{
    dispatch({
      type:LOGOUT
    })
    removeUserFromLocalStorage()
  }

  const updateUser = async(currentUser)=>{
    dispatch({type:UPDATE_USER_REQUEST})
    try {
      // as alternative to axios.create and its interceptors
      // you can use manual aproach 
      // const {data} = await axios.patch('/api/auth/updateUser, currentUser, {
//      headers:{
  //      Authorization:`Bearer $state.token`
///       }
      //})

      const {data} = await authFetch.patch('/auth/updateUser', currentUser)
      const {user, token, location} = data
      dispatch({
        type:UPDATE_USER_SUCCESS,
        payload:{user, token, location}
      })

      addUserToLocalStorage({user, location, token})
    } catch (error) {
      if(error.response.status !== 401){
        dispatch({
          type:UPDATE_USER_FAIL,
          payload:{msg:error.response.data.msg}
        })
      }
     
    }
    clearAlert()
  }

  const getJobs = async()=>{
    let url='/jobs'
    dispatch({type:GET_JOBS_REQUEST})
    try {
      const {data} = await authFetch(url)
      const {jobs,  totalJobs, numOfPages} = data

      dispatch({type:GET_JOBS_SUCCESS, payload:{jobs,totalJobs,numOfPages}})
    } catch (error) {
      console.log(error.response);
      logout()
    }
  }

  const getDosare = async()=>{
    const {search, page} = state
    let url = `/api/dosar?page=${page}`
    if(search){
      url = url+`&search=${search}`
    }
    dispatch({type:GET_DOSARE_REQUEST})
    try {
      const {data} = await axios.get(url, {
        headers:{
          Authorization:`Bearer ${token}`
        }
    })
      const {dosare, totalDosare, numOfPages} = data
      dispatch({
        type:GET_DOSARE_SUCCESS,
        payload:{
          dosare,
          totalDosare,
          numOfPages}
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getDosar = async(id)=>{
    dispatch({type:GET_DOSAR_REQUEST})
    try {
      const {data} = await axios.get(`/api/dosar/${id}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
    })
      const {dosar} = data
      dispatch({
        type:GET_DOSAR_SUCCESS,
        payload:dosar
      })
    } catch (error) {
      dispatch({
        type: GET_DOSAR_FAIL,
      payload: { msg: error.response.data.msg },
      })
    }
  }

  const addDosar = async(currentDosar)=>{
    
    dispatch({type:ADD_DOSAR_REQUEST})
      try {
        const {data} = await axios.post('/api/dosar', currentDosar, {
        headers:{
          Authorization:`Bearer ${token}`
        }})
        const{dosar} = data
        dispatch({
          type:ADD_DOSAR_SUCCESS,
          payload:dosar
        })
        // addDosarToLocalStorage({dosar})
      } catch (error) {
        dispatch({
          type: ADD_DOSAR_FAIL,
        payload: { msg: error.response.data.msg },
        })
        
      }
  }

  const deleteDosar = async(id)=>{
    dispatch({DELETE_DOSAR_REQUEST})
      try {
        const{data} = await axios.delete(`/api/dosar/${id}`, {headers:{
          Authorization:`Bearer ${token}`
        }})
        const{dosare} = data
        dispatch({type:DELETE_DOSAR_SUCCESS, payload:dosare})
      } 
      catch (error) {
        dispatch({
          type: DELETE_DOSAR_FAIL,
        payload: { msg: error.response.data.msg },
        })
      }
  }


  const addAct = async(acteCurente, dosarId)=>{
    
    dispatch({type:ADD_ACT_REQUEST})
      try {
        const {data} = await axios.post(`/api/act/${dosarId}`, acteCurente, {
        headers:{
          Authorization:`Bearer ${token}`
        }})
        const{acte} = data
        dispatch({
          type:ADD_ACT_SUCCESS,
          payload:acte
        })
        
      } catch (error) {
        dispatch({
          type: ADD_ACT_FAIL,
        payload: { msg: error.response.data.msg },
        })
        
      }
  }

  const getActe = async(id)=>{
    dispatch({type:GET_ACTE_REQUEST})
    try {
      const {data} = await axios.get(`/api/act/${id}`, {headers:{
        Authorization:`Bearer ${token}`
      }})
      const {acte} = data
      console.log('acte: ',acte);
      dispatch({
        type:GET_ACTE_SUCCESS,
        payload:acte
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getAllActs = async()=>{
    dispatch({type:GET_ALL_ACTS_REQUEST})
    try {
      const {data} = await axios.get(`/api/act`, {headers:{
        Authorization:`Bearer ${token}`
      }})
      const {allActs} = data
     
      dispatch({
        type:GET_ALL_ACTS_SUCCESS,
        payload:allActs
      })
    } catch (error) {
      dispatch({
        type: GET_ALL_ACTS_FAIL,
      payload: { msg: error.response.data.msg },
      })
    }
  }

  const handleChange = ({name, value})=>{
    dispatch({
      type:HANDLE_CHANGE,
      payload:{name, value}
    })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const backToDosare = ()=>{
    setTimeout(()=>{
      clearFilters()
    },2000)
  }

  const changePage=(page)=>{
    dispatch({
      type:CHANGE_PAGE, payload:{page}
    })
  }

  return (
    
    <AppContext.Provider value = {{
      ...state,
      displayAlert,
      registerUser,
      loginUser,
      toggleSidebar,
      logout,
      updateUser,
      getJobs,
      getDosare,
      getActe,
      addDosar,
      addAct,
      getDosar,
      deleteDosar,
     
      getAllActs,
      handleChange,
      clearFilters,
      backToDosare,
      changePage,

    }}>
      {children}
    </AppContext.Provider>
    
    )
}
export const useAppContext = () => {
  return useContext(AppContext)
}

export  { AppProvider }

