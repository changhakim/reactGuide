import { combineReducers } from '@reduxjs/toolkit';
import {
	globalState,
	modalReducer,
} from '@modules/redux';

const rootReducer = combineReducers({
	modal: modalReducer,
	globalState: globalState.reducer,
});

export default rootReducer;
