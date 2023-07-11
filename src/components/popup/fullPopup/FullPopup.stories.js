import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@components/button';
import { Header, GridLayoutRow, GridLayoutCol } from '@layouts';
import { loggerUtil } from '@utils';
import { BUTTON_CLASS_TYPES, BUTTON_TYPES, BUTTON_SIZE_TYPES } from '@components/button/constants';
import FullPopupStyle from './FullPopup.module.scss';
import { Doc } from './FullPopup.stories.mdx';

export default {
	title: 'old_v1/Component/Popup',
	parameters: {
		componentSubtitle: 'FullPopup UI Component',
		docs: {
			page: Doc,
		},
	},
};

const items1 = [
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼1`,
		disable: false,
		className: BUTTON_CLASS_TYPES.SECONDARY01,
		onClick: () => {
			loggerUtil.info('클릭');
		},
	},
];

const items2 = [
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼1`,
		disable: false,
		className: BUTTON_CLASS_TYPES.SECONDARY01,
		onClick: () => {
			loggerUtil.info('클릭');
		},
	},
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼2`,
		disable: false,
		className: BUTTON_CLASS_TYPES.PRIMARY,
		onClick: () => {
			loggerUtil.info('클릭');
		},
	},
];

const FullPopup1 = ({ children, title = '', items = null, active = false, xOnClick }) => {
	const [sheetClass, setSheetClass] = useState('');
	const multiButton = items !== null && items.length > 1;

	const closeBtn = () => {
		xOnClick && xOnClick(false);
	};

	useEffect(() => {
		active
			? setSheetClass(`${FullPopupStyle['full-popup']} ${FullPopupStyle['active']}`)
			: setSheetClass(`${FullPopupStyle['full-popup']}`);
	}, [active]);

	const FullButtonUI = useCallback((prop) => {
		return (
			<div className='bottom-button'>
				<GridLayoutRow>
					<GridLayoutCol>
						<Button
							uiType={BUTTON_CLASS_TYPES.SECONDARY01}
							isFullSize={true}
							buttonSize={BUTTON_SIZE_TYPES.X_LARGE}
							onClick={prop.items[0].onClick}
						>
							{prop.items[0].buttonText}
						</Button>
					</GridLayoutCol>
				</GridLayoutRow>
			</div>
		);
	}, []);

	const MultiButtonUI = useCallback((prop) => {
		return (
			<div className='bottom-button'>
				<GridLayoutRow gapX={8}>
					<GridLayoutCol size={'6'}>
						<Button
							uiType={BUTTON_CLASS_TYPES.PRIMARY}
							isFullSize={true}
							buttonSize={BUTTON_SIZE_TYPES.X_LARGE}
							onClick={prop.items[0].onClick}
						>
							{prop.items[0].buttonText}
						</Button>
					</GridLayoutCol>
					<GridLayoutCol size={'6'}>
						<Button
							uiType={BUTTON_CLASS_TYPES.SECONDARY01}
							isFullSize={true}
							buttonSize={BUTTON_SIZE_TYPES.X_LARGE}
							onClick={prop.items[1].onClick}
						>
							{prop.items[1].buttonText}
						</Button>
					</GridLayoutCol>
				</GridLayoutRow>
			</div>
		);
	}, []);

	return (
		<div className={sheetClass}>
			<Header clickLeftBtn={closeBtn} clickRightBtn2={closeBtn}>
				{title}
			</Header>
			<section className={FullPopupStyle['popup-content']}>
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
			</section>
			{items && !multiButton && <FullButtonUI items={items} />}
			{items && multiButton && <MultiButtonUI items={items} />}
		</div>
	);
};

FullPopup1.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	active: PropTypes.bool,
	xOnClick: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export const FullPopupSt = (props, args) => {
	// const { value, index, ...other } = props;

	const [sheet1Active, setSheet1Active] = useState(false);
	const [sheet2Active, setSheet2Active] = useState(false);
	const [sheet3Active, setSheet3Active] = useState(false);

	return (
		<div>
			<h1>Popup</h1>
			<hr />
			<h2>Full Popup</h2>
			{/* 바텀시트 화면 표시용 버튼 */}
			<Button type='button' uiType='primary' onClick={() => setSheet1Active(true)}>
				풀팝업1 활성화
			</Button>
			<Button type='button' uiType='primary' onClick={() => setSheet2Active(true)}>
				풀팝업2 활성화
			</Button>
			<Button type='button' uiType='primary' onClick={() => setSheet3Active(true)}>
				풀팝업3 활성화
			</Button>

			<FullPopup1 title='타이틀1' active={sheet1Active} xOnClick={setSheet1Active} />
			<FullPopup1
				title='타이틀2'
				active={sheet2Active}
				items={items1}
				xOnClick={() => setSheet2Active(false)}
			>
				콘텐츠 영역입니다.2
			</FullPopup1>
			<FullPopup1
				title='타이틀3'
				active={sheet3Active}
				items={items2}
				xOnClick={() => setSheet3Active(false)}
			>
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
				<br />
				콘텐츠 영역입니다.3
			</FullPopup1>
		</div>
	);
};

FullPopupSt.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
