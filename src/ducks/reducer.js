const initialState = {
  user: {},
  serches: [],
  results:[[],[],[]]
}

const GET_USER_INFO = 'GET_USER_INFO';
const UPDATE_RESULTS = 'UPDATE_RESULTS'

export function getUserInfo( data ) {
  return {
    type: GET_USER_INFO,
    payload: data
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
      return Object.assign( {}, state, { user: action.payload });
    case UPDATE_RESULTS:
      return Object.assign( {}, state, { results: action.payload });
    default:
      return state;
  }
}