import {
    LOADING_TOGGLE_ACTION,
    LOGIN_CONFIRMED_ACTION,
    LOGIN_FAILED_ACTION,
    LOGOUT_ACTION,
    SIGNUP_CONFIRMED_ACTION,
    SIGNUP_FAILED_ACTION,
    LOGIN,
    CART,
    INCREASE,
    DECREASE,
    REMOVE,
    SHOWLOGIN,
    UPDATE_DATA_ACTION,
    CHANGE_AVATAR_ACTION,
    SETCART_ACTION,
    PROMOCODE,
} from '../actions/AuthActions';

const initialState = {
    user: '',
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    cart: [],
    promoCode: '',
    showLogin: false,
    isLogin: false
};

export function AuthReducer(state = initialState, action) {
    if (action.type === SIGNUP_CONFIRMED_ACTION) {
        return {
            ...state,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            errorMessage: '',
            successMessage: 'Signup Successfully Completed',
            showLoading: false,
            isLogin: true,
        };
    }
    if (action.type === CART) {
        if(state?.cart?.findIndex(res=> res.id === action.payload?.id) === 0){
            let update = state?.cart?.map(res=>{
                if(res.id === action.payload?.id){
                    return{
                        ...res,
                        dynamicVariants: action.payload?.dynamicVariants?.map((dy, ind)=>{
                            return {
                                ...dy,
                                amount: res?.dynamicVariants[ind]?.amount + dy?.amount
                            }
                        }),
                        amount: Number(action.payload?.amount) + Number(res?.amount)
                    }
                } else {
                    return res
                }
            })
            localStorage.setItem('masterHNCart', JSON.stringify(update))
            return {
                ...state,
                cart: [...update]
            };
        } else {
            let data = [
                ...state.cart, 
                action.payload
            ]
            localStorage.setItem('masterHNCart', JSON.stringify(data))
            return {
                ...state,
                cart: data
            };
        }
    }
    if (action.type === INCREASE) {
        let update = state?.cart?.map(res=>{
            if(res.id === action.payload?.id){
                return{
                    ...res,
                    amount: Number(res?.amount)+1
                }
            } else {
                return res
            }
        })
        localStorage.setItem('masterHNCart', JSON.stringify(update))
        return {
            ...state,
            cart: [...update]
        };
    }
    if (action.type === DECREASE) {
        let update = state?.cart?.map(res=>{
            if(res.id === action.payload?.id){
                return{
                    ...res,
                    amount: Number(res?.amount)-1
                }
            } else {
                return res
            }
        })
        localStorage.setItem('masterHNCart', JSON.stringify(update))
        return {
            ...state,
            cart: [...update]
        };
    }
    if (action.type === REMOVE) {
        let update = state?.cart?.filter(res=> res.id !== action.payload?.id)
        localStorage.setItem('masterHNCart', JSON.stringify(update))
        return {
            ...state,
            cart: [...update]
        };
    }
    if (action.type === PROMOCODE) {
        return {
            ...state,
            promoCode: action.payload
        };
    }
    if (action.type === LOGIN) {
        return {
            ...state,
            user: action.payload,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
            isLogin: true,
        };
    }
    if (action.type === UPDATE_DATA_ACTION) {
        return {
            ...state,
            user: {
                ...state.user,
                ...action.payload
            }
        };
    }
    if (action.type === CHANGE_AVATAR_ACTION) {
        return {
            ...state,
            user: {
                ...state.user,
                ...action.payload
            }
        };
    }
    if (action.type === SHOWLOGIN) {
        return {
            ...state,
            showLogin: action.payload,
        };
    }
    if (action.type === LOGIN_CONFIRMED_ACTION) {
        return {
            ...state,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
            isLogin: true,
        };
    }
    if (action.type === LOGOUT_ACTION) {
        return {
            ...state,
            // promoCode: '',
            user: '',
            errorMessage: '',
            successMessage: '',
            showLoading: false,
            showLogin: false,
            isLogin: false,
            // cart: [],
        };
    }
    if (action.type === SETCART_ACTION) {
        localStorage.setItem('masterHNCart', JSON.stringify(action.payload))
        return {
            ...state,
            cart: action.payload
        };
    }

    if (action.type === SIGNUP_FAILED_ACTION || action.type === LOGIN_FAILED_ACTION) {
        return {
            ...state,
            errorMessage: action.payload,
            successMessage: '',
            showLoading: false,
            isLogin: false,
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

    
