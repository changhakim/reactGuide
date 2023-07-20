import { Drawer } from '@components';
import { useSelector } from 'react-redux';

const DrawerPopupPortal = () => {
	const { opts, style, className, spacing, content } = useSelector(
		(state) => state.drawer.drawerPopupPortal,
	);

	if (opts.drawerKey === undefined) {
		return null;
	}

	return (
		<Drawer
			key={opts.drawerKey}
			opts={opts}
			style={style}
			className={className}
			spacing={spacing}
		>
			{content && typeof content === 'function' ? content() : content}
		</Drawer>
	);
};

export default DrawerPopupPortal;
