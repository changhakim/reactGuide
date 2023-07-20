import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { func, object, string } from 'prop-types';
import { Type } from '@constants';
import { Drawer } from '@components';
import { AccountCardList } from '@layouts';
const AccountListDrawer = (props) => {
	
	const isShowDrawer = useSelector(
		(state) => state.drawer.drawer[Type.COMPONENT.ACCOUNT_LIST_DRAWER],
	);
	const accountList = useSelector((state) => state.accountList);

	const isMounted = useRef(false);
	const loadKey = useRef(accountList.loadKey);

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
		return props.selectedList
			? accountList.data.filter((v) => v.acctId === props.selectedList)[0]
			: accountList.data[0];
	}, [props.selectedList, accountList.data]);

	useEffect(() => {
		if (selectedListData) {
			const isChangeLoadKey = loadKey.current === accountList.loadKey;
			const hasAcno = !!selectedListData.originData.acno;
			const isShowBalance = accountList.isShowBalance;
			const isChangeLoadBalanceKey =
				isShowBalance &&
				accountList.loadBalanceKey.split('?')[0] === selectedListData.acctId;
			const isMOUNTED = props.loadType === Type.DATA_LOAD.ALREADY && !isMounted.current;

			switch (true) {
				case !isChangeLoadKey &&
					(hasAcno || (!hasAcno && (!isShowBalance || isChangeLoadBalanceKey))):
				case isMOUNTED:
					loadKey.current = accountList.loadKey;
					props.onSelect(selectedListData.acctId, selectedListData.originData);
					break;
				default:
			}
		}
	}, [
		props,
		accountList.loadKey,
		accountList.loadBalanceKey,
		accountList.isShowBalance,
		selectedListData,
	]);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	const selectList = useCallback(
		(list) => {
			if (list && !list.amount?.isLoading) {
				loadKey.current = accountList.loadKey;
				props.onSelect(list.acctId, list.originData);
			}
		},
		[props, accountList.loadKey],
	);
	debugger
	return (
		<Drawer
			key={Type.COMPONENT.ACCOUNT_LIST_DRAWER}
			opts={{
				drawerKey: Type.COMPONENT.ACCOUNT_LIST_DRAWER,
				header: { title: props.title },
				isPuller: false,
				height: 406,
			}}
			className={{ contents: 'full' }}
			isLazyResize={true}
		>
		<AccountCardList
				items={accountList.data}
				noDataMsg={props.noDataMessage}
				onSelected={selectList}
			/>
		</Drawer>
	);
};

AccountListDrawer.propTypes = {
	title: string,
	noDataMessage: string,
	loadType: string,
	requestOptions: object,
	onRequest: func,
	selectedList: string,
	onSelect: func,
};

AccountListDrawer.defaultProps = {
	onRequest: () => {},
	onSelect: () => {},
};

export default AccountListDrawer;
