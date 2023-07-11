import { createSlice } from '@reduxjs/toolkit';
import GlobalStateType from './GlobalStateType';

const initialState: GlobalStateType = {
	page: {
		isPageScrollTop: true,
	},
	fullPopup: {
		isFullPopupScrollTop: true,
	},
};

const globalStateSlice = createSlice({
	name: 'globalState',
	initialState,
	reducers: {
		/** Page */
		setIsPageScrollTop: (state: GlobalStateType, action: { payload: boolean }) => {
			state.page.isPageScrollTop = action.payload === true;
		},
		/** FullPopup */
		setIsFullPopupScrollTop: (state: GlobalStateType, action: { payload: boolean }) => {
			state.fullPopup.isFullPopupScrollTop = action.payload === true;
		},
	},
});

const reducer = globalStateSlice.reducer;
const actions = globalStateSlice.actions;

export default { reducer, actions };
