import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT,
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
  
} from "./actions"

import {initialState} from './appContext'

const reducer = (state, action)=>{
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if(action.type === REGISTER_REQUEST){
    return{...state, isLoading:true}
  }

  if(action.type === REGISTER_SUCCESS){
    return {
      ...state,
      user:action.payload.user,
      token:action.payload.token,
      userLocation:action.payload.location,
      jobLocation:action.payload.location,
      isLoading:false,
      showAlert:true,
      alertType:'success',
      alertText:'User Created! Redirecting...'
    }
  }

  if (action.type === REGISTER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }







  if(action.type === LOGIN_REQUEST){
    return{...state, isLoading:true}
  }

  if(action.type === LOGIN_SUCCESS){
    return {
      ...state,
      user:action.payload.user,
      token:action.payload.token,
      userLocation:action.payload.location,
      jobLocation:action.payload.location,
      isLoading:false,
      showAlert:true,
      alertType:'success',
      alertText:'Login Successful! Redirecting...'
    }
  }

  if (action.type === LOGIN_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === LOGOUT){
    return{
      ...initialState,
      user:null,
      token:null,
      userLocation:'',
      jobLocation:''
    }
  }

if(action.type === TOGGLE_SIDEBAR){
  return {...state, showSidebar:!state.showSidebar}
}


if(action.type === UPDATE_USER_REQUEST){
  return{...state, isLoading:true}
}

if(action.type === UPDATE_USER_SUCCESS){
  return {
    ...state,
    user:action.payload.user,
      token:action.payload.token,
      userLocation:action.payload.location,
      jobLocation:action.payload.location,
      isLoading:false,
      showAlert:true,
      alertType:'success',
      alertText:'User Profile Updated!'
    
  }
}

if(action.type === UPDATE_USER_FAIL){

  return{
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:'danger',
    alertText:action.payload.msg
  }

}


if(action.type === GET_DOSARE_REQUEST){
  return {...state, isLoading:true, showAlert:false}
}

if(action.type === GET_DOSARE_SUCCESS){
  return{
    ...state,
    isLoading:false,
    dosare:action.payload.dosare,
    totalDosare:action.payload.totalDosare,
    numOfPages : action.payload.numOfPages
  }
}

if(action.type === GET_DOSAR_REQUEST){
  return {...state, isLoading:true, showAlert:false}
}

if(action.type === GET_DOSAR_SUCCESS){
  return{
    ...state,
    isLoading:false,
    dosar:action.payload
  }
}

if (action.type === GET_DOSAR_FAIL) {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  }
}


if(action.type === ADD_DOSAR_REQUEST){
  return {...state, isLoading:false, showAlert:false}
}

if(action.type === ADD_DOSAR_SUCCESS){
  const dosar = action.payload
  return {
    ...state,
    dosare:[...state.dosare, dosar],
    isLoading:false,
    showAlert:true,
    alertType:'success',
    alertText:'Dosar Adaugat! Redirecting...',
    successAddDosar:true
    
  }
}

if(action.type === ADD_DOSAR_FAIL){
  return {
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:'danger',
    alertText:action.payload.msg
  }
}


if(action.type === DELETE_DOSAR_REQUEST){
  return {...state, isLoading:false, showAlert:false}
}

if(action.type === DELETE_DOSAR_SUCCESS){
  return {
    ...state,
    dosare:action.payload,
    successDeleteDosar:true,
    isLoading:false,
    showAlert:true,
    alertType:'success',
    alertText:'Dosar Sters! Redirecting...', 
  }
}

if(action.type === DELETE_DOSAR_FAIL){
  return {
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:'danger',
    alertText:action.payload.msg
  }
}


if(action.type === ADD_ACT_REQUEST){
  return {...state, isLoading:false, showAlert:false}
}

if(action.type === ADD_ACT_SUCCESS){
  const acte = action.payload
  return {
    ...state,
    acte:[...state.acte,acte],
    isLoading:false,
    showAlert:true,
    alertType:'success',
    alertText:'Acte Adaugate! Redirecting...',
    successAddAct:true
    
  }
}

if(action.type === ADD_ACT_FAIL){
  return {
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:'danger',
    alertText:action.payload.msg
  }
}



if(action.type === GET_ACTE_REQUEST){
  return {...state, isLoading:true, showAlert:false}
}

if(action.type === GET_ACTE_SUCCESS){
  return{
    ...state,
    isLoading:false,
    acte:action.payload
  }
}




if(action.type === GET_ALL_ACTS_REQUEST){
  return {...state, isLoading:true, showAlert:false}
}

if(action.type === GET_ALL_ACTS_SUCCESS){
  return{
    ...state,
    isLoading:false,
    allActs:action.payload
  }
}
if(action.type === GET_ALL_ACTS_FAIL){
  return {
    ...state,
    isLoading:false,
    showAlert:true,
    alertType:'danger',
    alertText:action.payload.msg
  }
}

if (action.type === HANDLE_CHANGE) {
  return { ...state,page:1,  [action.payload.name]: action.payload.value }
}

if (action.type === CLEAR_FILTERS) {
  return {
    ...state,
    search: '',
    // searchStatus: 'all',
    // searchType: 'all',
    sort: 'latest',
  }
}

if (action.type === CHANGE_PAGE) {
  return { ...state, page: action.payload.page }
}


  throw new Error(`no such action: ${action.type}`)
}



export default reducer