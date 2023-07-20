import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
	loadKey: 0,
	loadBalanceKey: '',
	isShowBalance: false,
	tabData: [],
	loadTabKey: 0,
	loadTabBalanceKey: '',
	isShowTabBalance: false,
};

const accountListSlice = createSlice({
	name: 'accountList',
	initialState,
	reducers: {
		set: (state, action) => {
			const changedState = { ...state, ...action.payload };

			return _.isEqual(state, changedState) ? state : changedState;
		},
		setData: (state, action) => {
			
			const mapData = (value) => {
				return {
					acctId: value.accNoOrigin,
					label: value.accNm,
					account: action.payload.bBankName
						? `${value.bankNm} ${value.accNm+"_"+value.accNo}`
						: `${value.accNm+"_"+value.accNo}`,
					amount: action.payload.bBalance
						? { balance: value.amount, isLoading: !value.acno }
						: null,
					img: "",
					originData: value,
				};
			};
			
			state.data = action.payload.data.map(mapData);
			state.loadKey = Date.now();
			state.isShowBalance = action.payload.bBalance;
		},
		setBalance: (state, action) => {
			const index = action.payload.index;
			const isSuccess = action.payload.data.잔액조회오류 === '0';

			state.data[index].amount = { balance: action.payload.data.지불가능잔액 };
			state.data[index].disabled = !isSuccess;
			state.data[index].originData = action.payload.data;
			state.loadBalanceKey = isSuccess
				? `${action.payload.data.계좌번호_originalValue}?${Date.now()}`
				: '';
		},
		setTabData: (state, action) => {
			const mapData = (value) => {
				return {
					acctId: value.계좌번호_originalValue,
					label: value.계좌명,
					account: action.payload.bBankName
						? `${value.은행명} ${value.계좌번호화면}`
						: value.계좌번호화면,
					amount: action.payload.bBalance
						? { balance: value.지불가능잔액, isLoading: !value.acno }
						: null,
					img: "",
					originData: value,
				};
			};

			state.tabData = [
				action.payload.data.당행계좌.map(mapData),
				action.payload.data.타행계좌.map(mapData),
			];
			state.loadTabKey = Date.now();
			state.isShowTabBalance = action.payload.bBalance;
		},
		setTabBalance: (state, action) => {
			const index = action.payload.index;
			const isSuccess = action.payload.data.잔액조회오류 === '0';

			state.tabData[1][index].amount = {
				balance: action.payload.data.지불가능잔액,
			};
			state.tabData[1][index].disabled = !isSuccess;
			state.tabData[1][index].originData = action.payload.data;
			state.loadBalanceTabKey = isSuccess
				? `${action.payload.data.계좌번호_originalValue}?${Date.now()}`
				: '';
		},
		clear: () => initialState,
	},
});

const accountListActions = accountListSlice.actions;
const accountListReducer = accountListSlice.reducer;

export { accountListActions, accountListReducer };
