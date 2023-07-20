/** *****************************************************************************************
 * @업무명   : 계좌 당/타행 목록 공통 컴퍼넌트 개발.
 * @설명    : CO0712S0012B01 / CO0712S0013B01 Bottom Sheet 탭 목록.
 ********************************************************************************************
 * 번호    작업자     작업일           JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1      오석환     2022-05-31     LEADSOL-2937    -
 ********************************************************************************************/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { func, object, string } from 'prop-types';
import { Type } from '@constants';
import { Drawer, TabPanel, TabPanels } from '@components';
import { accountListActions } from '@modules/redux';
import { searchOtherAccountBalance } from '@modules/services';
import DrawerTab from '../DrawerTab';

const AccountListTabDrawer = (props) => {
	const isShowDrawer = useSelector(
		(state) => state.drawer.drawer[Type.COMPONENT.ACCOUNT_LIST_TAB_DRAWER],
	);
	const accountList = useSelector((state) => state.accountList);

	const dispatch = useDispatch();

	const [selectedTab, setSelectedTab] = useState(0);

	const isMounted = useRef(false);
	const loadTabKey = useRef(accountList.loadTabKey);

	useEffect(() => {
		switch (true) {
			case props.loadType !== Type.DATA_LOAD.ALREADY && !isMounted.current:
			case props.loadType === Type.DATA_LOAD.ALWAYS && isShowDrawer:
				props.onRequest(props.requestOptions);
				break;
			default:
		}
	}, [props, isShowDrawer]);

	const selectedListData = useMemo(() => {
		if (props.selectedList) {
			return accountList.tabData
				.map((v) => v.filter((vv) => vv.acctId === props.selectedList)[0])
				.filter((v) => v)[0];
		} else {
			const tabData = accountList.tabData.filter((v) => v.length);

			return accountList.loadTabKey && tabData.length && tabData[0][0];
		}
	}, [props.selectedList, accountList.tabData, accountList.loadTabKey]);

	useEffect(() => {
		if (selectedListData) {
			const isChangeLoadTabKey = loadTabKey.current === accountList.loadTabKey;
			const hasAcno = !!selectedListData.originData.acno;
			const isShowTabBalance = accountList.isShowTabBalance;
			const isChangeLoadTabBalanceKey =
				isShowTabBalance &&
				accountList.loadTabBalanceKey.split('?')[0] === selectedListData.acctId;
			const isMOUNTED = props.loadType === Type.DATA_LOAD.ALREADY && !isMounted.current;

			switch (true) {
				case !isChangeLoadTabKey &&
					(hasAcno || (!hasAcno && (!isShowTabBalance || isChangeLoadTabBalanceKey))):
				case isMOUNTED:
					loadTabKey.current = accountList.loadTabKey;
					props.onSelect(selectedListData.acctId, selectedListData.originData);
					break;
				default:
			}
		}
	}, [
		props,
		accountList.loadTabKey,
		accountList.loadTabBalanceKey,
		accountList.isShowTabBalance,
		selectedListData,
	]);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	const loadOtherAccountBalance = useCallback(
		async (value, index) => {
			const balanceInfo = await searchOtherAccountBalance({ accountInfo: value.originData });

			dispatch(
				accountListActions.setTabBalance({
					index,
					data: balanceInfo,
				}),
			);
		},
		[dispatch],
	);

	const selectTab = useCallback(
		(tabIndex) => {
			setSelectedTab(tabIndex);
			if (tabIndex && accountList.isShowTabBalance) {
				accountList.tabData[tabIndex].forEach(loadOtherAccountBalance);
			}
		},
		[accountList.tabData, accountList.isShowTabBalance, loadOtherAccountBalance],
	);

	const selectList = useCallback(
		(list) => {
			if (list && !list.amount?.isLoading) {
				loadTabKey.current = accountList.loadTabKey;
				props.onSelect(list.acctId, list.originData);
			}
		},
		[props, accountList.loadTabKey],
	);

	return (
		<Drawer
			key={Type.COMPONENT.ACCOUNT_LIST_TAB_DRAWER}
			opts={{
				drawerKey: Type.COMPONENT.ACCOUNT_LIST_TAB_DRAWER,
				header: {
					title: '계좌선택',
					isClose: true,
					contents: (
						<DrawerTab
							label={['신한은행', '다른은행']}
							selectedTab={selectedTab}
							onSelect={selectTab}
						/>
					),
				},
				isPuller: false,
				isPercentH: false,
				height: 406,
			}}
			spacing={16}
			className={{ contents: 'full' }}
			isLazyResize={true}
		>
			<TabPanels activePanel={0} id="tab-line01">
				<TabPanel>
				</TabPanel>
			</TabPanels>
		</Drawer>
	);
};

AccountListTabDrawer.propTypes = {
	loadType: string,
	requestOptions: object,
	onRequest: func,
	selectedList: string,
	onSelect: func,
};

AccountListTabDrawer.defaultProps = {
	onRequest: () => {},
	onSelect: () => {},
};

export default AccountListTabDrawer;
