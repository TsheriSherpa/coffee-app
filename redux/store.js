import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import cartReducer from './slice/cartSlice'
import coffeeReducer from './slice/coffeeSlice'
import favouriteReducer  from './slice/favouriteSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { presistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root', // Key for storing the persisted state
	storage: AsyncStorage, // Storage engine for persisting state
};

const rootReducer = combineReducers({ 
	auth: authReducer,
	cart: cartReducer,
	favourite: favouriteReducer,
	coffee: coffeeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: rootReducer
})
// const presistor = presistStore(store);

// export {presistor}
export default store
