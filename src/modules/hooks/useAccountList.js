import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Type } from '@constants';
import { drawerActions, accountListActions } from '@modules/redux';
import axios from "axios";

/**
 * Request Options (ASIS의 sbPopAccountList 공통함수 기준)
 *
 * @param {string} accountType 계좌조회타입
 * @param {boolean} bRefresh 계좌원장 실시간조회여부
 * @param {boolean} bBalance 출금가능잔액 표시여부
 * @param {string} otherFirstYn Y:타행우선, N:당행우선
 * @param {boolean} bOnlyOther 타행만 표시여부
 * @param {boolean} bBankName 기관명 표시여부
 */
const useAccountList = () => {
	const dispatch = useDispatch();

	const loadOtherAccountBalance = useCallback(
		async (value, index) => {
			if (!value.acno) {
				const balanceInfo = [];

				dispatch(
					accountListActions.setBalance({
						index,
						data: balanceInfo,
					}),
				);
			}
		},
		[dispatch],
	);

	const loadAccountList = useCallback(
		async (options = {}) => {
			const { bRefresh, bBalance, bBankName, ...OPTIONS } = options;
			const requestOptions = {
				...OPTIONS,
				bRefresh,
				acctListType: '0',
			};

			const accountList = await fncCallService();//계좌리스트 데이터 필요
			
			if (accountList) {
				dispatch(
					accountListActions.setData({
						data: accountList,
						bBalance,
						bBankName,
					}),
				);
				bBalance && accountList.forEach(loadOtherAccountBalance);
			}
		},
		[dispatch, loadOtherAccountBalance],
	);

	const loadAccountListTab = useCallback(
		async (options = {}) => {
			const { bRefresh, bBalance, bBankName, ...OPTIONS } = options;
			const requestOptions = {
				...OPTIONS,
				bRefresh,
				acctListType: '1',
			};
			
			const accountList = await fncCallService();//계좌리스트 데이터 필요
			if (accountList) {
				dispatch(
					accountListActions.setTabData({
						data: accountList,
						bBalance,
						bBankName,
					}),
				);
			}
		},
		[dispatch],
	);

	const showAccountList = useCallback(
		(isShow) => {
			dispatch(drawerActions.set({ [Type.COMPONENT.ACCOUNT_LIST_DRAWER]: isShow }));
		},
		[dispatch],
	);

	const showAccountListTab = useCallback(
		(isShow) => {
			dispatch(drawerActions.set({ [Type.COMPONENT.ACCOUNT_LIST_TAB_DRAWER]: isShow }));
		},
		[dispatch],
	);

	const clearAccountList = useCallback(() => {
		dispatch(accountListActions.clear());
	}, [dispatch]);

	return {
		loadAccountList,
		loadAccountListTab,
		showAccountList,
		showAccountListTab,
		clearAccountList,
	};
};
const fncCallService = async (fnc)=>{
	
    try {
        const callSvc = await axios.get('dummy/accList.json');
        return callSvc.data.accList
    } catch (e) {
        
    }
}
export default useAccountList;
