import { Fragment, useEffect, useState } from 'react';
import { string, element, func, number, oneOf } from 'prop-types';

// 추가 : 20220722 이미지 추가
import NoDataImage from '@styles/assets/images/img/img-nodata.png';
import NoDataImageSearch from '@styles/assets/images/img/img-nodata-search.png';
import NoDataImageWait from '@styles/assets/images/img/img-nodata-wait.png';

import NoDataStyle from './NoData.module.scss';

/**
 *
 * @param {string} title -  줄바꿈을 하려면 개행문자(\n)를 사용해야 합니다.
 * @param {string} subTitle -  줄바꿈을 하려면 개행문자(\n)를 사용해야 합니다.
 * @param {number} spacing - margin-top으로 간격이 들어갑니다.
 * @param {string} buttonText - 버튼에 들어갈 문자열을 입력합니다. null이면 버튼 X
 * @param {func} btnOnClick - 버튼 클릭 시 발생 이벤트를 입력합니다.
 * @returns
 */

// 추가 : 20220722 uiType prop 추가
const NoData = ({
	id = '',
	className = '',
	title = '조회결과가 없습니다.',
	subTitle,
	spacing = 0,
	buttonText = '',
	buttonLinkPopupId = '',
	btnOnClick,
	uiType = '',
}) => {
	// start : 추가 : 20220722 image type에 따라 url 변경 조건 추가
	const [imageUrl, setImageUrl] = useState(NoDataImage);

	useEffect(() => {
		switch (uiType) {
			case 'search':
				setImageUrl(NoDataImageSearch);
				break;
			case 'wait':
				setImageUrl(NoDataImageWait);
				break;
			default:
				setImageUrl(NoDataImage);
				break;
		}
	}, [uiType]);
	// end : 추가 : 20220722 image type에 따라 url 변경 조건 추가

	return (
		<div
			id={id}
			className={`${NoDataStyle['wrap']} ${className}`}
			style={{ '--spacing': `${spacing}px` }}
		>
			{/* 추가 : 20220722 이미지 url 변경 */}
			<img src={imageUrl} alt="" />
			{title && (
				<p className={NoDataStyle['title']}>
					{title.split('\\n').map((txt, i) => (
						<Fragment key={i}>
							{txt}
							<br />
						</Fragment>
					))}
				</p>
			)}
			{subTitle && (
				<p className={NoDataStyle['sub-title']}>
					{subTitle.split('\\n').map((txt, i) => (
						<Fragment key={i}>
							{txt}
							<br />
						</Fragment>
					))}
				</p>
			)}
		</div>
	);
};

NoData.propTypes = {
	id: string,
	className: string,
	title: string,
	subTitle: string,
	button: element,
	spacing: number,
	buttonText: string,
	btnOnClick: func,
	buttonLinkPopupId: string,
	uiType: oneOf(['search', 'wait', '']), // 추가 : 20220722 uiType propTypes 추가
};

export default NoData;
