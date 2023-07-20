/** ****************************************************************************************
 * @업무명   : BasicList > ListIconItem
 * @설명     : ListIconItem
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 * 3	 김영우		2022-07-21					  Drawer와 연결된 경우 arrow 상태처리
 * 4     강수희     2022-09-22   LEADSOL-11520    cssType prop 추가
 * 5     강수희     2022-10-13   LEADSOL-14285    textEllipsis prop 추가
 * 6 	 김가원	 	2022-10-26	 LEADSOL-16522 	  20221026 웹접근성 진단 반영
 ********************************************************************************************/

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { SupportingVisual } from '@components';
import { useDrawer } from '@modules/hooks'; // 2022. 07. 21, 김영우, 추가
import ListStyle from '../BasicList.module.scss';

/* 
	  ListIconItem : Icon 유형(icon, title, subTitle) 
	  디자인 size : Logo, Icon_24 ~ 48, left Icon48(ARS 및 전화걸기), , Icon24 + Right Icon
  */
const ListIconItem = ({
	title,
	description,
	direction = 'bottom',
	// 수정 : 20220808 descriptionColor 디폴트 값 수정
	descriptionColor = 'default',
	img,
	imgAlign,
	textSize = 'medium',
	arrow,
	onClick,
	linkedPopupId,
	normalText,
	keyValue,
	disabled,
	// 추가 :20220921 cssType 추가
	cssType,
	// 수정 : 20220927 디자인 수정 반영
	refresh,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis = false,
	// 추가 : 20221026 a11yText 추가
	a11yText,
	className = '',
}) => {
	const [isVisible] = useDrawer(linkedPopupId || ''); // 2022. 07. 21, 김영우, drawer open 상태 감지
	const cx = classNames.bind(ListStyle);
	const onClickHandler = () => {
		onClick && onClick(keyValue);
	};

	return (
		<li
			className={cx(
				className,
				'list-item',
				'list-icon',
				{
					// 삭제 : 20220831 : arrow, [`arrow-${arrow}`]: arrow && arrow 삭제
					// 추가 : 20220906 : arrow 케이스 추가
					[`arrow-${arrow}`]: arrow && arrow,
					disabled,
					[`${direction}`]: direction,
					'drawer-active': isVisible && arrow === 'bottom', // 2022. 07. 21, 김영우, drawer open 상태에 따른 arrow 방향 처리
				},
				`desc-${descriptionColor}`,
				{ 'drawer-active': isVisible },
			)}
			onClick={onClickHandler}
		>
			<SupportingVisual
				title={title}
				description={description}
				icon={img}
				iconAlign={imgAlign}
				textSize={textSize}
				linkedPopupId={linkedPopupId}
				normalText={normalText}
				disabled={disabled}
				// 추가 : 20220831 : arrow 추가
				arrow={arrow}
				// 추가 :20220921 cssType 추가
				cssType={cssType}
				// 수정 : 20220927 디자인 수정 반영
				refresh={refresh}
				// 추가 : 20221013 기획 수정 반영
				textEllipsis={textEllipsis}
				// 추가 : 20221026 a11yText 추가
				a11yText={a11yText}
			/>
		</li>
	);
};

ListIconItem.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	descriptionColor: PropTypes.string,
	img: PropTypes.node,
	imgAlign: PropTypes.string,
	textSize: PropTypes.string,
	arrow: PropTypes.string,
	linkedPopupId: PropTypes.string,
	normalText: PropTypes.bool,
	onClick: PropTypes.func,
	keyValue: PropTypes.object,
	direction: PropTypes.string,
	disabled: PropTypes.bool,
	cssType: PropTypes.string,
	// 수정 : 20220927 디자인 수정 반영
	refresh: PropTypes.node,
	textEllipsis: PropTypes.bool,
	// 추가 : 20221026 접근성 검수 내용 반영 대체텍스트 prop 추가
	a11yText: PropTypes.string,
	className: PropTypes.string,
};

export default ListIconItem;
