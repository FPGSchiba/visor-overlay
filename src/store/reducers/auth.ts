import { UserActionTypes } from '../actions/user';
import { GET_ORG_SUCCESS, GET_USER_SUCCESS } from '../constants/user';
import { AuthState } from '../format';

const initialState: AuthState = {
    currentOrg: {
        name: '',
        token: ''
    },
    currentUser: {
        handle: '',
        token: '',
        role: ''
    }
}

export default function auth(state = initialState, action: UserActionTypes): AuthState {
    switch(action.type) {
        case GET_USER_SUCCESS:
            return { ...state, currentUser: action.user }
        case GET_ORG_SUCCESS:
            return { ...state, currentOrg: action.org }
        default: return state;
    }
}