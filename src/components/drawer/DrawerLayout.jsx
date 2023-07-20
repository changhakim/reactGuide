import classNames from 'classnames/bind';
import { string, number, node, arrayOf, oneOfType } from 'prop-types';
import { forwardRef } from 'react';
import DrawerLayoutStyle from './DrawerLayout.module.scss';

const cx = classNames.bind(DrawerLayoutStyle);

/** publish link - /layout/drawerLayout/DrawerLayout.jsx */
const DrawerLayout = forwardRef(({ spacing = 0, children, className = '' }, ref) => {
	return (
		<div
			ref={ref}
			className={`${cx('drawer-wrap', className)}`}
			style={{ '--spacing': `${spacing}px` }}
		>
			{children}
		</div>
	);
});

DrawerLayout.propTypes = {
	spacing: number,
	className: string,
	children: oneOfType([arrayOf(node), node]),
};

DrawerLayout.displayName = 'DrawerLayout';

export default DrawerLayout;
