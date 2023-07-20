/** ****************************************************************************************
 * @업무명   : BasicList > ListTextItem
 * @설명     : ListTextItem
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 ********************************************************************************************/

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { AtomicButton } from '@components';
import ListStyle from '../BasicList.module.scss';

const cx = classNames.bind(ListStyle);

/* 
	 ListTextItem : Text 유형(title, subTitle)
	 디자인 type : Single-Line (bottom), right
 */
const ListTextItem = ({
	title,
	description,
	direction = 'bottom',
	arrow = false,
	onClick,
	linkedPopupId,
	textSize = 'large',
	keyValue,
	normalText,
	option,
	// 수정 : 20220808 descriptionColor 디폴트 값 수정
	descriptionColor = 'default',
	extraItem,
	// 수정 : 20220927 디자인 수정 반영
	refresh = null,
}) => {
	const onClickHandler = () => {
		onClick && onClick(keyValue);
	};

	const props = {
		title,
		description,
		arrow,
		normalText,
		option,
		refresh,
	};

	const btnProps = {
		className: ListStyle['text-btn'],
		...(linkedPopupId && {
			linkedPopupId,
		}),
	};

	return (
		<li
			className={`${ListStyle['list-item']} ${ListStyle['list-text']} ${
				ListStyle[direction]
				// 수정 : 20220822 : cx 형태 변경 arrow -> 'is-arrow': arrow
			} ${cx({ 'is-arrow': arrow }, textSize, `desc-${descriptionColor}`)}`}
		>
			{normalText ? (
				<div className={ListStyle['text-btn']}>
					<RenderText {...props} />
				</div>
			) : (
				<AtomicButton {...btnProps} onClick={onClickHandler}>
					<RenderText {...props} />
				</AtomicButton>
			)}
			{extraItem && extraItem}
		</li>
	);
};

const RenderText = ({ title, description, arrow, normalText, option, refresh }) => {
	return (
		<>
			<span className={ListStyle['text-inner']}>
				<span className={ListStyle['title']}>
					{title.split('\n').map((txt, brIndex) => (
						<span key={`list-text-title-0${brIndex + 1}`} className="text-break">
							{txt}
						</span>
					))}
				</span>
				{description && (
					<span className={ListStyle['desc']}>
						{description.split('\n').map((txt, brIndex) => (
							<span key={`list-text-desc-0${brIndex + 1}`} className="text-break">
								{txt}
							</span>
						))}
					</span>
				)}
			</span>
			{arrow && (
				<span className={ListStyle['icon-arrow']}>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 1L11 5.95077L6 11"
							stroke="#121619"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			)}
			{normalText && option && <div className={ListStyle['option-wrap']}>{option}</div>}

			{/* 추가 : 20220927 디자인 수정 반영 */}
			{!arrow && refresh !== null && <div className={cx('refresh')}>{refresh}</div>}
		</>
	);
};

ListTextItem.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	direction: PropTypes.string,
	arrow: PropTypes.bool,
	linkedPopupId: PropTypes.string,
	textSize: PropTypes.string,
	onClick: PropTypes.func,
	keyValue: PropTypes.object,
	normalText: PropTypes.bool,
	option: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	descriptionColor: PropTypes.string,
	extraItem: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	// 수정 : 20220927 디자인 수정 반영
	refresh: PropTypes.node,
};

RenderText.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	arrow: PropTypes.bool,
	normalText: PropTypes.bool,
	option: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	// 수정 : 20220927 디자인 수정 반영
	refresh: PropTypes.node,
};

export default ListTextItem;
