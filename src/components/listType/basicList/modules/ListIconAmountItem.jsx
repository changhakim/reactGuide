/** ****************************************************************************************
 * @업무명   : BasicList > ListIconAmountItem
 * @설명     : ListIconAmountItem
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 * 3     김영우     2022-07-21                    Drawer와 연결된 경우 arrow 상태처리
 * 4     강수희     2022-09-21   LEADSOL-11425    isLoading prop 추가
 * 5     강수희     2022-10-13   LEADSOL-14285    textEllipsis prop 추가
 ********************************************************************************************/

import { oneOf, oneOfType, shape, string, bool, func, object, node } from 'prop-types';
import classNames from 'classnames/bind';
import { InputMessage, SupportingVisual, DataLoading } from '@components';
import { useDrawer } from '@modules/hooks'; // 2022. 07. 21, 김영우, 추가
import ListStyle from '../BasicList.module.scss';

const ListIconAmountItem = ({
	title,
	description,
	img,
	imgAlign,
	textSize = 'medium',
	error,
	linkedPopupId,
	amount,
	onClick,
	keyValue,
	arrow,
	normalText,
	// 추가 : 20220921 : isLoading 추가
	isLoading,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis = false,
}) => {
	const [isVisible] = useDrawer(linkedPopupId || ''); // 2022. 07. 21, 김영우, drawer open 상태 감지
	const cx = classNames.bind(ListStyle);
	const onClickHandler = () => {
		onClick && onClick(keyValue);
	};

	if (amount === undefined) return <></>;
	else
		return (
			<li
				className={cx('list-item', 'list-icon', 'list-icon-amount', {
					error: error && error.status,
					'normal-text': normalText && normalText,
					'drawer-active': isVisible && arrow === 'bottom',
					// 추가 : 20220906 : arrow 케이스 추가
					[`arrow-${arrow}`]: arrow && arrow,
				})}
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
					// 추가 : 20220831 : arrow props 추가
					arrow={arrow}
					// 추가 : 20221013 기획 수정 반영
					textEllipsis={textEllipsis}
				/>
				{/* 추가 : 20220921 :className cx형식으로 변경 및  amount-loading 클래스 추가 */}

				<span
					className={cx('amount-wrap', {
						'amount-loading': isLoading,
					})}
				>
					<span className={ListStyle['amount-title']}>{amount.title}</span>
					<span className={ListStyle['amount-value']}>
						{/* 추가 : 20220921 : isLoading 로직 추가 */}
						{isLoading ? <DataLoading width={14} height={14} /> : amount.value}
					</span>
				</span>
				{error && error.status && (
					<div className={ListStyle['input-error-wrap']}>
						{/* 추가 20220831 : Input 리팩터링으로 errror props로 연결 */}
						<InputMessage error={error.status}>{error.message}</InputMessage>
					</div>
				)}
			</li>
		);
};

ListIconAmountItem.propTypes = {
	title: string,
	description: string,
	img: node,
	imgAlign: string,
	textSize: string,
	error: shape({ status: bool, message: string }),
	linkedPopupId: string,
	amount: oneOfType([object, string]),
	onClick: func,
	keyValue: object,
	arrow: oneOf(['left', 'right', 'bottom', 'none']), // none 입력 시, arrorw 표시되지 않음
	normalText: bool,
	// 추가 : 20220921 : isLoading 추가
	isLoading: bool,
	// 추가 : 20221013 기획 수정 반영
	textEllipsis: bool,
};

export default ListIconAmountItem;
