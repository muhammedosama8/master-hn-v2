import {
    CHANGE_LANG,
} from '../actions/LangActions';

const initialState = {
    lang: 'en'
};

export function LangReducer(state = initialState, action) {
    if (action.type === CHANGE_LANG) {
        return {
            lang: action.payload
        };
    }
    return state;
}

    
