import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalPopupPortal: {
		isOpen: false,
		id: 'modal-popup',
		title: '',
		content: null,
		responseCode: '',
		children: null,
		onConfirm: { confirmClick: null, confirmBtnTitle: '' },
		onCancel: { cancelClick: null, cancelBtnTitle: '' },
		align: 'left',
		uiType: 'alert',
		customButton: null,
		customTitle: null,
		closeBtn: false,
		showChatbotIcon: false,
		onClickChatbot: null,
	},
	fullPopupInit: {
		isOpen: false,
		title: '',
		content: null,
		items: null,
		xOnClick: null,
		children: null,
		fullContent: true,
		id: 'full-popup',
		leftArea: 'back',
		rightArea: 'close',
		rightArea2: 'none',
		rightArea3: 'none',
		clickLeftBtn: null,
		clickRightBtn2: null,
		clickRightBtn3: null,
		actionPop: false,
		callbackData: '',
		linkedPopupId: '',
		className: '',
		xClosing: false,
		transferData: null, // 220627 팝업에서 사용할 데이터 추가 state에서만 사용
		spacing: 32, // 20220705 spacing 속성 추가
	},
	fullPopup: {},
	drawerPopup: {},
	loader: {
		isActive: false,
	},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		modalPopupPortal: (state, action) => {
			state.modalPopupPortal = action.payload;
			const open = !!(action.payload.isOpen === undefined || action.payload.isOpen === true);

			state.modalPopupPortal.isOpen = open;
		},
		clearModalProp: () => initialState.modalPopupPortal,
		clearModalPropKey: (state, action) => {
			state.modalPopupPortal[action.payload] = initialState.modalPopupPortal[action.payload];
		},
		fullPopup: (state, action) => {
			try {
				if (action.payload.remove === true) {
					state.fullPopup = undefined;
				} else {
					state.fullPopup = state.fullPopup || initialState.fullPopupInit;
					state.fullPopup = { ...state.fullPopup, ...action.payload };
				}
			} catch (ex) {
				
			}
		},
		clearFullPopupProp: () => initialState.fullPopupInit,
		clearFullPopupPropKey: (state, action) => {
			state.fullPopup[action.payload] = initialState.fullPopupInit[action.payload];
		}
	},
});

const modalActions = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export { modalActions, modalReducer };
