import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    LOGIN,
    CART,
} from '../actions/AuthActions';

const initialState = {
    user: '',
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    cart: []
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            user: action.payload,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === CART) {
        if(state?.cart?.findIndex(res=> res.id === action.payload?.id) === 0){
            let update = state?.cart?.map(res=>{
                if(res.id === action.payload?.id){
                    return{
                        ...res,
                        amount: Number(action.payload?.amount) + Number(res?.amount)
                    }
                } else {
                    return res
                }
            })
            return {
                ...state,
                cart: [...update]
            };
        } else {
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        }
    }
    if (action.type === LOGIN) {
        return {
            user: action.payload,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            user: action.payload,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
        };
    }
    if (action.type === LOGOUT_ACTION) {
        return {
            ...initialState
        };
    }

    if (action.type === SIGNUP_FAILED_ACTION || action.type === LOGIN_FAILED_ACTION) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
        };
    }

    if (action.type === LOADING_TOGGLE_ACTION) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    return state;
}

    
