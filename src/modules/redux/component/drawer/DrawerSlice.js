import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	drawer: {},
	drawerPopupPortal: {
		opts: {
			drawerKey: '',
			drawerBleeding: 0,
			isFullLayout: false,
			isFitContents: false,
			isPercentH: false,
			isPuller: true,
			header: {
				subTitle: '',
				title: undefined,
				contents: undefined,
				isClose: true,
				isElevation: false,
			},
			bottomButton: undefined,
			afterOpen: undefined,
			afterClose: undefined,
			height: 50,
			zIndex: 900,
			isKeepScroll: false,
			onDismiss: undefined,
		},
		style: {},
		className: { wrapper: '', contents: '' },
		spacing: 0,
		content: null,
	},
};

const drawerSlice = createSlice({
	name: 'drawerComponent',
	initialState,
	reducers: {
		init: (state) => {
			state.drawer = initialState.drawer;
		},
		set: (state, action) => {
			state.drawer = { ...state.drawer, ...action.payload };
		},
		drawerPopupPortal: (state, action) => {
			state.drawerPopupPortal = { ...state.drawerPopupPortal, ...action.payload };
		},
		clearDrawerKey: (state, action) => {
			delete state.drawer[action.payload];
		},
	},
});

const drawerActions = drawerSlice.actions;
const drawerReducer = drawerSlice.reducer;

export { drawerReducer, drawerActions };
