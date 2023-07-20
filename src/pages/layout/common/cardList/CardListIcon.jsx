import { AtomicButton, Tag } from '@components';
import PropTypes from 'prop-types';
import CardListStyle from './CardList.module.scss';

const CardListIcon = ({
	title,
	account,
	description,
	// 삭제 : 20220531 dday prop 삭제
	amount,
	img,
	type,
	onClick,
	linkedPopupId, // 추가 : 2022.04.27 linkedPopupId 속성 추가
	// 추가 : 20220531 tag prop 추가
	tag,
}) => {
	const handleOnclick = () => {
		onClick && onClick();
	};

	// start : 수정 : 2022.04.29 button 속성을 props로 연결
	const props = {
		type: 'button',
		className: CardListStyle['card-inner'],
		...(linkedPopupId && {
			'aria-haspopup': 'dialog',
			'aria-controls': linkedPopupId,
		}),
		onClick: handleOnclick,
	};
	// end : 수정 : 2022.04.29 button 속성을 props로 연결

	return (
		<div
			className={`${CardListStyle['card-list-wrap']} ${CardListStyle['card-icon']} ${CardListStyle[type]}`}
		>
			{/* 추가 : 2022.04.29 props 추가, AtomicButton 으로 변경 */}
			<AtomicButton {...props}>
				{/* start : 추가 : 20220531 tag-wrap 추가 */}
				{tag && (
					<span className={`${CardListStyle['tag-wrap']}`}>
						{tag.map((value, index) => {
							return (
								<Tag
									key={`tag-0${index}`}
									isRounded={value.isRounded}
									isStrongText={value.isStrongText}
									shadowStyle={value.shadowStyle}
									color={value.color}
									uiType={value.uiType}
								>
									{value.label}
								</Tag>
							);
						})}
					</span>
				)}
				{/* end : 추가 : 20220531 tag-wrap 추가 */}
				{/* start : 수정 : 20220531 레이아웃 변경 */}
				<span className={CardListStyle['account-wrap']}>
					<span className={CardListStyle['img-wrap']}>{img}</span>
					<span className={CardListStyle['inner']}>
						<span className={CardListStyle['title']}>{title}</span>
						<span className={CardListStyle['account']}>{account}</span>
						<span className={CardListStyle['description']}>{description}</span>
					</span>
				</span>
				{amount && (
					<span className={CardListStyle['amount']}>
						<span className={CardListStyle['num']}>{amount}</span>
						<span className={CardListStyle['unit']}>원</span>
					</span>
				)}
				{/* start : 수정 : 20220531 레이아웃 변경 */}
			</AtomicButton>
		</div>
	);
};

CardListIcon.propTypes = {
	title: PropTypes.string.isRequired,
	account: PropTypes.string,
	description: PropTypes.string,
	// 삭제 : 20220531 dday propTypes 삭제
	amount: PropTypes.string,
	img: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	type: PropTypes.string,
	onClick: PropTypes.func,
	linkedPopupId: PropTypes.string, // 추가 : 2022.04.29 linkedPopupId 속성 추가
	// 추가 : 20220531 tag propTypes 추가
	tag: PropTypes.PropTypes.arrayOf(
		PropTypes.shape({
			bgColor: PropTypes.string,
			labelColor: PropTypes.string,
			label: PropTypes.string,
		}),
	),
};
export default CardListIcon;
