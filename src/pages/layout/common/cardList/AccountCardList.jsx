import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { arrayOf, bool, element, func, number, oneOfType, shape, string } from 'prop-types';
import { _ } from '@utils';
import {  List } from '@components';
import { NoData } from '@layouts';
import BottomSheet from '@layouts/common/drawer/BottomSheet.module.scss';
import CardListStyle from './CardList.module.scss';
import stringUtil00 from "@utils/basis/stringUtil00";

const cx = classNames.bind(CardListStyle);
const AccountCardList = ({
	items = [],
	onSelected,
	noDataMsg = '출금 가능한 계좌가 없습니다.',
	isShowBalance = true, // 추가 : 2022. 05. 23, 김영우, 잔액 표현 여부
}) => {
	// 2022. 05. 23 , 김영우, isShowBalance에 따른 UI Wrapper 분리
	const MakeWrap = useCallback((prop) => {
		if (prop.isShowBalance) {
			return <>{prop.children}</>;
		} else {
			return (
				<div className={BottomSheet['select-list']}>
					<List>{prop.children}</List>
				</div>
			);
		}
	}, []);

	// 2022. 05. 23 , 김영우, isShowBalance에 따른 UI Item 분리
	// 2022. 07. 01 , 김영우, item 영역에 대한 마크업 수정
	const RenderAccountItem = useCallback((prop) => {
		if (prop.isShowBalance) {
			return (
				<button
					key={`commonAccountCardList${prop.index}`}
					className={`${cx('card-list-wrap', 'withdraw-account', {
						disabled: prop.item.disabled,
					})}`}
					onClick={() => {
						prop.onSelected && prop.onSelected(prop.item);
					}}
				>
					<span className={cx('account-info')}>
						{prop.item.img && <span className={cx('img-wrap')}>{prop.item.img}</span>}

						<span>
							<span className={cx('title')}>{prop.item.label}</span>
							<span className={cx('account')}>{prop.item.account}</span>
						</span>
					</span>

					<span className={cx('inner')}>
						<span className={cx('amount-wrap')}>
							{
							//prop.item.disabled && (
								/*
								TODO - 본사 내부 프로젝트 _ 계좌 조회 불가로 임시 값 만들어 사용하는 케이스에 한함. 
										추후 해당 케이스 복원 필요
								<span className={cx('disabled-text')}>계좌확인필요</span>
								*/
							//)
							}
							{
							//!prop.item.disabled && prop.item.testAmount && (
								/*
								TODO - 본사 내부 프로젝트 _ 계좌 조회 불가로 임시 값 만들어 사용하는 케이스에 한함. 
										추후 해당 케이스 복원 필요
								<>
									<span className={cx('text')}>출금가능금액</span>
									<span className={cx('amount')}>						
										<span className={CardListStyle['num']}>
											{prop.item.amount.balance}
										</span>
										<span className={CardListStyle['unit']}>
										'원'
										</span>
									</span>
								</>
								*/
							//)
							}
							{prop.item.disabled && prop.item.testAmount && (
								/*
								TODO - 본사 내부 프로젝트 _ 계좌 조회 불가로 임시 값 만들어 사용하는 케이스에 한함. 
										추후 해당 케이스 삭제 필요
								*/
								<>
									<span className={cx('text')}>출금가능금액</span>
									<span className={cx('amount')}>						
										<span className={CardListStyle['num']}>
											{stringUtil00.sbGetFormatAmt(prop.item.testAmount.balance)}
										</span>
										<span className={CardListStyle['unit']}>
										원
										</span>
									</span>
								</>
							)}
						</span>
					</span>
				</button>
			);
		} else {
			return (
				<li onClick={() => {
						prop.onSelected && prop.onSelected(prop.item);
					}}>
						{prop.item.label}
				</li>
			);
		}
	}, []);

	return (
		<>
			{/* 2022. 05. 23 , isShowBalance에 UI 분리 적용 { */}
			{_.isArray(items) && items.length > 0 ? (
				<MakeWrap isShowBalance={isShowBalance}>
					{items.map((item, index) => {
						return (
							<RenderAccountItem
								key={`cardItem${index}`}
								item={item}
								index={index}
								isShowBalance={isShowBalance}
								//onSelected={item.disabled ? undefined : onSelected}
								onSelected={onSelected}
							/>
						);
					})}
				</MakeWrap>
			) : (
				<NoData title={noDataMsg} spacing={32} />
			)}
			{/* // } 2022. 05. 23 , isShowBalance에 UI 분리 적용  */}
		</>
	);
};

AccountCardList.propTypes = {
	items: arrayOf(
		shape({
			acctId: oneOfType([string, number]),
			account: string,
			amount: shape({
				isLoading: bool,
				balance: oneOfType([string, number]),
			}),
			img: element,
			label: string,
			disabled: bool, // 2022. 07. 01, 김영우, 비활성화 여부 추가
		}),
	),
	// selected: oneOfType([string, number]), 2022. 07. 01, 김영우, selected prop제거
	onSelected: func,
	noDataMsg: string,
	isShowBalance: bool,
};

export default AccountCardList;
