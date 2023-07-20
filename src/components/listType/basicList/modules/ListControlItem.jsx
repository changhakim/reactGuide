/** ****************************************************************************************
 * @업무명   : BasicList > ListControlItem
 * @설명     : ListControlItem
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 * 3     강수희     2022-10-13   LEADSOL-14285    textEllipsis prop 추가
 ********************************************************************************************/

import PropTypes from 'prop-types';
import { SupportingVisual } from '@components';
import ListStyle from '../BasicList.module.scss';

/* 
	 ListControlItem
	 디자인 type : Right Align (Control), Left Align (Control), Toggle, Bookmark, Button
 */

const ListControlItem = ({
	title,
	control,
	direction = 'right',
	textSize = 'medium',
	normalText,
	linkedPopupId,
	description,
	img,
	imgAlign,
	disabled,
	cssType = '',
	subDescription,
	titleMoreInfo,
	onClick,
	// 추가 : descriptionColor props 추가
	descriptionColor = 'default',
	// 추가 : 20221013 기획 수정 반영
	textEllipsis = false,
}) => {
	return (
		// 추가 : 20221013 기획 수정 반영
		// 수정 : 20221013 class 조건 control 추가
		<li
			className={`${ListStyle['list-item']} ${ListStyle['list-control']} ${
				ListStyle[direction]
			} ${ListStyle[`desc-${descriptionColor}`]} ${
				textEllipsis && control && ListStyle['list-control-ellipsis']
			}`}
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
				cssType={cssType}
				subDescription={subDescription}
				titleMoreInfo={titleMoreInfo}
				onClick={onClick}
				// 추가 : 20221013 기획 수정 반영
				textEllipsis={textEllipsis}
			/>
			{control && <span className={ListStyle['control-wrap']}>{control}</span>}
		</li>
	);
};

ListControlItem.propTypes = {
	title: PropTypes.string,
	direction: PropTypes.string,
	control: PropTypes.node,
	linkedPopupId: PropTypes.string,
	normalText: PropTypes.bool,
	textSize: PropTypes.string,
	description: PropTypes.string,
	img: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node, PropTypes.string]),
	imgAlign: PropTypes.string,
	disabled: PropTypes.bool,
	cssType: PropTypes.string,
	subDescription: PropTypes.string,
	titleMoreInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	onClick: PropTypes.func,
	// 추가 : 20220808 descriptionColor props 추가
	descriptionColor: PropTypes.string,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis: PropTypes.bool,
};

export default ListControlItem;
