import { combineReducers } from '@reduxjs/toolkit';
import {
	globalState,
	modalReducer,
	drawerReducer,
	accountListReducer
} from '@modules/redux';

const rootReducer = combineReducers({
	globalState: globalState.reducer,
	modal: modalReducer,
	drawer: drawerReducer,
	accountList:accountListReducer
});

export default rootReducer;
