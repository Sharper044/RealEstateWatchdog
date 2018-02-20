import axios from "axios";

const initialState = {
  user: {},
  serches: [],
  currentSearch: {},
  results:[[],[],[]]
}

const GET_USER_INFO = 'GET_USER_INFO';
const UPDATE_RESULTS = 'UPDATE_RESULTS';
const SAVE_SEARCH = 'SAVE_SEARCH';

export function getUserInfo() {
  const userInfo = axios.get('/api/userData').then( res => {
    return res.data;
  })
  return {
    type: GET_USER_INFO,
    payload: userInfo
  }
}

export function saveSearch( search ){
  const saved = axios.post('/api/saveSearch', search).then( res => {
    return res.data;
  })
  return {
    type: SAVE_SEARCH,
    payload: saved
  }
}

export function updateResults( data ) {
  return {
    type: UPDATE_RESULTS,
    payload: data
  }
}

export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign( {}, state, {user: action.payload});
    case SAVE_SEARCH + "_FULFILLED":
      return Object.assign({}, state, {currentSearch: action.payload})
    case UPDATE_RESULTS:
      return Object.assign( {}, state, {results: action.payload});
    default:
      return state;
  }
}