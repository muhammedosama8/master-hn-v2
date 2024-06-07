import { applyMiddleware, combineReducers, compose,createStore,} from 'redux';
import { AuthReducer } from './reducers/AuthReducer';
import { thunk } from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    user: AuthReducer
});


export const store = createStore(reducers,  composeEnhancers(middleware));
