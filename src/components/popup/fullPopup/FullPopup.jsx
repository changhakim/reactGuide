import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { useDispatch } from 'react-redux';
import { _ } from '@utils';
import { useModal, useA11Y } from '@modules/hooks';
import { PopupHeader } from '@layouts';
import { globalState } from '@modules/redux';
import FullPopupStyle from './FullPopup.module.scss';

export const FullPopup = ({ popupId }) => {
	const {
		id,
		content = null,
		isOpen = false,
		fullContent = true,
		spacing = 32,
		className = '',
		actionPop = true, // 최초 app.jsx 로드할때를 제외한 팝업호출인지 여부 false: app.jsx호출 true: 그 외에 정상적인 호출
		// 아래는 헤더관련속성들
		xOnClick,
		xClosing = true, // x버튼 누를때 풀팝업 닫힘 여부
		title,
		titleAlign,
		leftArea = 'back',
		rightArea = 'close',
		rightArea2 = 'none',
		rightArea3 = 'none',
		clickLeftBtn,
		clickRightBtn2,
		clickRightBtn3,
		linkedPopupId,
		callbackData,
	} = useModal().modalState.fullPopup[popupId];
	const [sheetClass, setSheetClass] = useState('');
	const { modalA11Y } = useA11Y(isOpen);

	const { handleFullPopup } = useModal();
	const dispatch = useDispatch();

	const rootRef = useRef();


	const handleScroll = useCallback(
		(e) => {
			scrollEvent({ e, dispatch });
		},
		[dispatch],
	);

	const onCloseEvent = useCallback(() => {
		closeEvent({ callbackData, handleFullPopup, popupId, xOnClick, xClosing, dispatch });
	}, [callbackData, handleFullPopup, popupId, xOnClick, xClosing, dispatch]);

	useEffect(() => {
		if (isOpen) {
			setOpenClass({ fullContent, setSheetClass, onCloseEvent });
		} else {
			setCloseClass({ fullContent, setSheetClass, actionPop });
		}
	}, [actionPop, fullContent, isOpen, onCloseEvent, popupId]);

	useEffect(() => {
		const _target = _.isElement(rootRef.current)
			? rootRef.current
			: document.getElementById('root');

		modalA11Y.otherAriaHidden(_target);
		if (isOpen) {
			modalA11Y.initFirstFocus(rootRef.current);
		}
	}, [isOpen, modalA11Y]);

	const memoizedContent = useMemo(() => {
		if (_.isNil(content)) {
			return '';
		} else {
			return contentPreload({ content, popupId });
		}
	}, [content, popupId]);

	if (_.isNil(content)) {
		return false;
	} else {
		return (
			<div
				id={id}
				ref={rootRef}
				className={`${sheetClass} ${FullPopupStyle[className]}`}
				role="dialog"
				style={{ '--spacing': `${spacing}px` }}
			>
				<PopupHeader
					from="FullPopup"
					title={title}
					titleAlign={titleAlign}
					clickRightBtn={onCloseEvent}
					leftArea={leftArea}
					rightArea={rightArea}
					rightArea2={rightArea2}
					rightArea3={rightArea3}
					clickLeftBtn={clickLeftBtn}
					clickRightBtn2={clickRightBtn2}
					clickRightBtn3={clickRightBtn3}
					linkedPopupId={linkedPopupId}					
				>
					{title}				
				</PopupHeader>
				<div className={FullPopupStyle['popup-content']} onScroll={handleScroll}>
					{memoizedContent}
				</div>
			</div>
		);
	}
};

// 헤더 스크롤 이벤트
const scrollEvent = ({ e, dispatch }) => {
	e.target.scrollTop === 0
		? dispatch(globalState.actions.setIsFullPopupScrollTop(true))
		: dispatch(globalState.actions.setIsFullPopupScrollTop(false));
};

// 닫기 이벤트
const closeEvent = ({ xOnClick, callbackData, xClosing, handleFullPopup, popupId, dispatch }) => {
	xOnClick && xOnClick(callbackData);
	if (xClosing) {
		handleFullPopup({
			id: popupId,
			isOpen: false,
		});
		dispatch(globalState.actions.setIsFullPopupScrollTop(true)); // Cleanup when close
	}
};

// 팝업 열때 발생시킬 이벤트(scss)
const setOpenClass = ({ fullContent, setSheetClass, onCloseEvent }) => {
	fullContent
		? setSheetClass(
				`${FullPopupStyle['full-popup']} ${FullPopupStyle['active']} ${FullPopupStyle['full-content']}`,
		  )
		: setSheetClass(`${FullPopupStyle['full-popup']} ${FullPopupStyle['active']}`);

};

// 팝업 닫을때 발생시킬 이벤트(scss)
const setCloseClass = ({ fullContent, setSheetClass, actionPop }) => {
	fullContent
		? setSheetClass(`${FullPopupStyle['full-popup']} ${FullPopupStyle['full-content']}`)
		: setSheetClass(`${FullPopupStyle['full-popup']}`);

	if (actionPop === true) {
	}
};

// preload 이벤트
const contentPreload = ({ content, popupId }) => {
	const resContent = content();

	return resContent;
};

FullPopup.propTypes = {
	popupId: PropTypes.string,
	id: PropTypes.string,
	title: PropTypes.string,
	titleAlign: oneOf(['left', 'center']),
	isOpen: PropTypes.bool,
	titleCenter: PropTypes.bool,
	xOnClick: PropTypes.func,
	content: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	fullContent: PropTypes.bool,
	className: PropTypes.string,
	leftArea: PropTypes.string,
	rightArea: PropTypes.string,
	rightArea2: PropTypes.string,
	rightArea3: PropTypes.string,
	clickLeftBtn: PropTypes.func,
	clickRightBtn2: PropTypes.func,
	clickRightBtn3: PropTypes.func,
	linkedPopupId: PropTypes.string,
	xClosing: PropTypes.bool,
	spacing: PropTypes.number,
};
