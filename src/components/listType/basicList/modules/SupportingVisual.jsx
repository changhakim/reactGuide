/** ****************************************************************************************
 * @업무명   : BasicList > SupportingVisual
 * @설명     : SupportingVisual
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 * 3     강수희     2022-09-22   LEADSOL-11520    has-subdescription 추가
 * 4     강수희     2022-09-29   LEADSOL-12689    title 없는 케이스 추가
 * 5     강수희     2022-10-12   LEADSOL-14141    a11yText prop 추가
 * 6     강수희     2022-10-13   LEADSOL-14285    textEllipsis prop 추가
 ********************************************************************************************/

import { useCallback } from 'react';
import PropTypes, { object } from 'prop-types';
import classNames from 'classnames/bind';
import { _ } from '@utils';
import ListStyle from '../BasicList.module.scss';

const cx = classNames.bind(ListStyle);

const SupportingVisual = ({
	title,
	description,
	subDescription,
	icon,
	iconAlign = 'center',
	textSize,
	selected = false,
	linkedPopupId,
	normalText,
	onClick = null,
	disabled,
	wrapTag = 'div',
	cssType = '',
	titleMoreInfo,
	item = {},
	onTouchStart = null,
	onTouchEnd = null,
	// 추가 : 20220831 arrow props 추가
	arrow,
	// 수정 : 20220927 디자인 수정 반영
	refresh = null,
	// 추가 : 20221013 접근성 검수 내용 반영 대체텍스트 prop 추가
	a11yText = '열기',
	// 추가 : 20221013 기획 수정 반영
	textEllipsis = false,
}) => {
	const WrapTag = wrapTag;

	const handleOnClick = useCallback(
		(evt) => {
			if (_.isFunction(onClick)) {
				evt.stopPropagation();
				onClick({ item });
			}
		},
		[onClick, item],
	);

	const onTouchStartHandler = useCallback(
		(evt) => {
			if (evt.cancelable) {
				evt.stopPropagation();
			}

			onTouchStart && onTouchStart(evt);
		},
		[onTouchStart],
	);

	const onTouchEndtHandler = useCallback(
		(evt) => {
			if (evt.cancelable) {
				evt.stopPropagation();
			}

			onTouchEnd && onTouchEnd(evt);
		},
		[onTouchEnd],
	);

	return (
		<WrapTag
			// 추가 : 20220921 has-subdescription 추가
			className={cx('supporting-visual', cssType, {
				'has-subdescription': subDescription,
			})}
			onClickCapture={handleOnClick}
			onTouchStartCapture={onTouchStartHandler}
			onTouchEndCapture={onTouchEndtHandler}
		>
			{normalText ? (
				<RenderNormalText
					iconAlign={iconAlign}
					icon={icon}
					textSize={textSize}
					title={title}
					titleMoreInfo={titleMoreInfo}
					description={description}
					subDescription={subDescription}
					arrow={arrow}
					refresh={refresh}
					// 20221013 추가: 접근성 관련 추가
					a11yText={a11yText}
					// 추가 : 20221013 기획 수정 반영
					textEllipsis={textEllipsis}
				/>
			) : (
				<RenderButtonText
					iconAlign={iconAlign}
					icon={icon}
					textSize={textSize}
					title={title}
					titleMoreInfo={titleMoreInfo}
					description={description}
					subDescription={subDescription}
					selected={selected}
					disabled={disabled}
					linkedPopupId={linkedPopupId}
					arrow={arrow}
					// 20221012 추가: 접근성 관련 추가
					a11yText={a11yText}
					// 추가 : 20221013 기획 수정 반영
					textEllipsis={textEllipsis}
				/>
			)}
		</WrapTag>
	);
};

const RenderNormalText = ({
	iconAlign,
	icon,
	textSize,
	title,
	titleMoreInfo,
	description,
	subDescription,
	arrow,
	refresh,
	a11yText,
	textEllipsis,
}) => {
	return (
		<span
			className={cx(iconAlign, 'normal-wrap', {
				// start : 20220817 class 추가
				'icon-medium-align': iconAlign === 'center' && getIconClass.isIconMedium(icon),
				'icon-large-align': iconAlign === 'center' && getIconClass.isIconLarge(icon),
				'icon-align-center': iconAlign === 'center' && getIconClass.isAlignCenter(icon),
				// end : 20220817 class 추가
				// 추가 : 20221013 기획 수정 반영
				'title-text-ellipsis': textEllipsis,
			})}
		>
			{icon && <span className={ListStyle['icon']}>{icon}</span>}
			<span className={ListStyle['title-description-wrap']}>
				{/* start : 수정 : 20220928 : title-inner를 title이 있을때만 노출되도록 조건문 추가 */}
				{title && (
					<span className={cx('title-inner', textSize)}>
						<span className={cx('title')}>
							{title &&
								title.split('\n').map((txt, brIndex) => (
									<span
										key={`list-text-title-0${brIndex + 1}`}
										className="text-break"
									>
										{txt}
									</span>
								))}
						</span>
						{titleMoreInfo && <em className={cx('title-moreinfo')}>{titleMoreInfo}</em>}
					</span>
				)}
				{/* end : 수정 : 20220928 : title-inner를 title이 있을때만 노출되도록 조건문 추가 */}
				{/* start : 수정 : 20220714 subDescription 위치 변경 */}
				{description && (
					<span className={`${ListStyle['description']}`}>
						<span className="text-break">
							{description.split('\n').map((txt, brIndex) => (
								<span
									key={`list-text-title-0${brIndex + 1}`}
									className="text-break"
								>
									{txt}
								</span>
							))}
						</span>
					</span>
				)}
				{subDescription && (
					<span className={ListStyle['sub-description']}>{subDescription}</span>
				)}
				{/* end : 수정 : 20220714 subDescription 위치 변경 */}
			</span>
			{/* 추가 : 20220831 arrow 엘레먼트 추가 */}
			{/* 수정 : 20220930 : arrow가 없을때 대체 텍스트가 읽히지 않도록 조건 추가 */}
			{arrow && arrow !== 'none' && (
				<span className={cx('arrow', `arrow-${arrow}`)}>
					<span className="hidden">{a11yText}</span>
				</span>
			)}
			{/* 추가 : 20220926 디자인 수정 반영 */}
			{!arrow && refresh !== null && <div className={cx('refresh')}>{refresh}</div>}
		</span>
	);
};

const RenderButtonText = ({
	iconAlign,
	selected,
	disabled,
	linkedPopupId,
	icon,
	textSize,
	title,
	titleMoreInfo,
	description,
	subDescription,
	arrow,
	a11yText,
	textEllipsis,
}) => {
	const props = {
		type: 'button',
		className: cx(iconAlign, {
			selected,
			// start : 20220817 class 추가
			'icon-medium-align': iconAlign === 'center' && getIconClass.isIconMedium(icon),
			'icon-large-align': iconAlign === 'center' && getIconClass.isIconLarge(icon),
			'icon-align-center': iconAlign === 'center' && getIconClass.isAlignCenter(icon),
			// end : 20220817 class 추가
			// 추가 : 20221013 기획 수정 반영
			'title-text-ellipsis': textEllipsis,
		}),
		disabled,
		...(linkedPopupId && { 'aria-haspopup': 'dialog', 'aria-controls': linkedPopupId }),
	};

	return (
		<button {...props}>
			{icon && <span className={ListStyle['icon']}>{icon}</span>}
			<span className={ListStyle['title-description-wrap']}>
				{/* start : 수정 : 20220928 : title-inner를 title이 있을때만 노출되도록 조건문 추가 */}
				{title && (
					<span className={cx('title-inner', textSize)}>
						<span className={cx('title')}>
							{title &&
								title.split('\n').map((txt, brIndex) => (
									<span
										key={`list-text-title-0${brIndex + 1}`}
										className="text-break"
									>
										{txt}
									</span>
								))}
						</span>
						{titleMoreInfo && <em className={cx('title-moreinfo')}>{titleMoreInfo}</em>}
					</span>
				)}
				{/* end : 수정 : 20220928 : title-inner를 title이 있을때만 노출되도록 조건문 추가 */}
				{description && (
					<span className={`${ListStyle['description']}`}>
						<span className="text-break">
							{description.split('\n').map((txt, brIndex) => (
								<span
									key={`list-text-title-0${brIndex + 1}`}
									className="text-break"
								>
									{txt}
								</span>
							))}
						</span>
					</span>
				)}
				{subDescription && (
					<span className={ListStyle['sub-description']}>{subDescription}</span>
				)}
			</span>
			{/* 추가 : 20220831 arrow 엘레먼트 추가 */}
			{/* 수정 : 20220930 : arrow가 없을때 대체 텍스트가 읽히지 않도록 조건 추가 */}
			{arrow && arrow !== 'none' && (
				<span className={cx('arrow', `arrow-${arrow}`)}>
					<span className="hidden">{a11yText}</span>
				</span>
			)}
		</button>
	);
};

// 추가 : 20220817 iconClass 관련 추가
const getIconClass = {
	LOGO: 'Logo',
	isIconMedium(icon) {
		// icon이 Logo 컴포넌트이고 size가 24일때 or size가 정의되어 있지 않을때
		return (
			icon && icon.type.name === this.LOGO && (icon.props.size === '24' || !icon.props.size)
		);
	},
	isIconLarge(icon) {
		// icon이 Logo 컴포넌트이고 size가 32일때
		return icon && icon.type.name === this.LOGO && icon.props.size === '32';
	},
	isAlignCenter(icon) {
		// Logo 컴포넌트가 아닐 경우. svg나 png를 컴포넌트형식으로 icon에 삽입할 경우
		return icon && icon.type.name !== this.LOGO;
	},
};

SupportingVisual.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	descriptionColor: PropTypes.string,
	subDescription: PropTypes.string,
	icon: PropTypes.node,
	iconAlign: PropTypes.string,
	textSize: PropTypes.string,
	linkedPopupId: PropTypes.string,
	selected: PropTypes.bool,
	normalText: PropTypes.bool,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	wrapTag: PropTypes.string,
	cssType: PropTypes.string,
	titleMoreInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	item: object,
	onTouchStart: PropTypes.func,
	onTouchEnd: PropTypes.func,
	arrow: PropTypes.string,
	// 수정 : 20220927 디자인 수정 반영
	refresh: PropTypes.node,
	// 추가 : 20221013 접근성 검수 내용 반영 대체텍스트 prop 추가
	a11yText: PropTypes.string,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis: PropTypes.bool,
};

RenderNormalText.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	subDescription: PropTypes.string,
	icon: PropTypes.node,
	iconAlign: PropTypes.string,
	textSize: PropTypes.string,
	titleMoreInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	arrow: PropTypes.string,
	// 수정 : 20220927 디자인 수정 반영
	refresh: PropTypes.node,
	// 추가 : 20221012 접근성 검수 내용 반영 대체텍스트 prop 추가
	a11yText: PropTypes.string,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis: PropTypes.bool,
};

RenderButtonText.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	subDescription: PropTypes.string,
	icon: PropTypes.node,
	iconAlign: PropTypes.string,
	textSize: PropTypes.string,
	selected: PropTypes.bool,
	disabled: PropTypes.bool,
	linkedPopupId: PropTypes.string,
	titleMoreInfo: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string,
	]),
	arrow: PropTypes.string,
	// 추가 : 20221012 접근성 검수 내용 반영 대체텍스트 prop 추가
	a11yText: PropTypes.string,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis: PropTypes.bool,
};

export default SupportingVisual;
