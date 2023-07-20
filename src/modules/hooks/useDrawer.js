import { useCallback, useEffect, useMemo } from 'react';
import { bool } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '@modules/redux';
import { _ } from '@utils';

const useDrawer = (key, setVisible = false) => {
	const drawerList = useSelector((state) => state.drawer.drawer);

	const isVisible = useMemo(() => drawerList[key], [key, drawerList]);
	const dispatch = useDispatch();

	const handleDrawer = useCallback(
		(visible) => {
			dispatch(
				drawerActions.set({
					[key]: visible,
				}),
			);
		},
		[dispatch, key],
	);

	const handleDrawerPopup = useCallback(
		(visible, popupArgs) => {
			dispatch(drawerActions.drawerPopupPortal(popupArgs));
			dispatch(
				drawerActions.set({
					[key]: visible,
				}),
			);
		},
		[dispatch, key],
	);

	// 설정된 모든 Drawer를 초기화 한다.
	const initDrawer = useCallback(() => {
		dispatch(drawerActions.init());
	}, [dispatch]);

	handleDrawer.propTypes = {
		visible: bool.isRequired,
	};

	useEffect(() => {
		if (_.isBoolean(setVisible) && setVisible) {
			handleDrawer(true);
		}
	}, [handleDrawer, setVisible]);

	return [isVisible, handleDrawer, handleDrawerPopup, initDrawer];
};

export default useDrawer;
