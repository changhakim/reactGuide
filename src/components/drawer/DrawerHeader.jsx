import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { string, bool, oneOfType, arrayOf, node, func, element } from 'prop-types';
import { useDrawer } from '@modules/hooks';
import titleStyle from './DrawerHeaderTitle.module.scss';
import { Button } from 'react-bootstrap';

const cx = classNames.bind(titleStyle);

/** publish link - BottomSheetTitle.jsx */
const DrawerHeader = ({
	children,
	drawerKey,
	subTitle = '',
	isClose = true,
	isElevation = false,
	isOpened = false,
	fnCustomClose,
}) => {
	const [isVisible, handleDrawer] = useDrawer(drawerKey);
	const btnCloseClickHandler = useCallback(
		(evt) => {
			if (isVisible) {
				if (isClose || isElevation) {
					if (fnCustomClose) {
						fnCustomClose(evt);
					} else {
						handleDrawer(false);
					}
				}
			}
		},
		[fnCustomClose, handleDrawer, isClose, isElevation, isVisible],
	);

	return (
		<>
			{drawerKey && (
				<h2 className={cx('button-default')}>
					<span className={cx('title')}>
						{children || ''}
						{subTitle ? <span className={cx('title-sub')}>{subTitle}</span> : ''}
					</span>
					{isClose && !isElevation && (
						<Button onClick={btnCloseClickHandler}>닫기</Button>
					)}
				</h2>
			)}
		</>
	);
};

DrawerHeader.propTypes = {
	drawerKey: string.isRequired,
	subTitle: oneOfType([string, element]),
	isClose: bool,
	isElevation: bool,
	isOpened: bool,
	fnCustomClose: func,
	children: oneOfType([arrayOf(node), node]),
};

export default DrawerHeader;
