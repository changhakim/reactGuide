import { Description } from '@storybook/addon-docs/blocks';
import useDrawer from '@modules/hooks/useDrawer';
import 'react-spring-bottom-sheet/dist/style.css';
import { Drawer } from '@components/drawer';
import { Mock2 } from '@components/demo/MockData';
import { loggerUtil } from '@utils';

import readme from './Drawer.md';

const drawerKeyForStoryBook = 'storyBookDrawerKey';

const DrawerComponent = (args) => {
	const [, setState] = useDrawer(drawerKeyForStoryBook);

	return (
		<>
			<input
				type={'button'}
				value={'open'}
				onClick={() => {
					setState(true);
				}}
			/>
			<Drawer
				{...args}
				afterOpen={() => {
					loggerUtil.info('opened');
				}}
				afterClose={() => {
					loggerUtil.info('closed');
				}}
			>
				{Mock2}
			</Drawer>
		</>
	);
};

export default {
	title: 'old_v1/Component/Drawer',
	parameters: {
		componentSubtitle: '서랍형태의 UI Component',
		docs: {
			page: () => <Description markdown={readme} />,
		},
	},
	argTypes: {
		drawerBleeding: {
			defaultValue: 0,
			description: 'Drawer가 항상 노출되어 있는 영역 크기 px',
			control: { type: 'number' },
			table: { defaultValue: { summary: 0 } },
		},
		isFullLayout: {
			defaultValue: false,
			description: '전체 화면을 덮는 Drawer 생성 여부',
			control: { type: 'boolean' },
			table: { defaultValue: { summary: false } },
		},
		isFitContents: {
			defaultValue: false,
			description: '컨텐츠 영역에 맞는 크기의 Drawer 생성 여부',
			control: { type: 'boolean' },
			table: { defaultValue: { summary: true } },
		},
		isPuller: {
			defaultValue: false,
			description: '드래그 영역 bar 표현 여부',
			control: { type: 'boolean' },
			table: { defaultValue: { summary: false } },
		},
		isPercentH: {
			defaultValue: false,
			description: 'Drawer 높이 단위 유닛 변경',
			control: { type: 'boolean' },
			table: { defaultValue: { summary: false } },
		},

		header: {
			defaultValue: undefined,
			description: '헤더영역 생성 element',
			table: { defaultValue: { summary: undefined } },
		},
		height: {
			defaultValue: 50,
			description: 'Drawer 높이, isFullLayout, isFitContents가 false일 경우 적용된다.',
			control: { type: 'number' },
			table: { defaultValue: { summary: 0 } },
		},
		duration: {
			defaultValue: 500,
			description: 'Drawer Transition 속도 설정. (ms)',
			control: { type: 'number' },
			table: { defaultValue: { summary: 500 } },
		},
	},
};

export const BottomDrawer = (args) => {
	const initOpts = {
		drawerKey: drawerKeyForStoryBook,
		drawerBleeding: 0,
		isFullLayout: false,
		isFitContents: false,
		isPuller: false,
		isPercentH: true,
		header: null,
		afterOpen: null,
		afterClose: null,
		height: 50,
	};

	const mergeArgs = { opts: { ...initOpts, ...args } };

	return <DrawerComponent {...mergeArgs} />;
};

BottomDrawer.args = {
	header: {
		subTitle: 'example',
		title: 'Drawer-StoryBook',
		isClose: true,
	},
};
