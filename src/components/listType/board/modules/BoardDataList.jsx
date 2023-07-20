/** ****************************************************************************************
 * @업무명   : BoardList > BoardDataList
 * @설명     : BoardDataList
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-609      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 ********************************************************************************************/

import PropTypes from 'prop-types';
import { AtomicButton, Tag } from '@components';
import BoardListStyle from '../BoardList.module.scss';

const BoardDataList = ({ title = '', date = '', icon = '', label = '', onClick }) => (
	<AtomicButton className={BoardListStyle['data-list']} onClick={(event) => onClick?.(event)}>
		<span className={BoardListStyle['title-wrap']}>
			{icon !== '' && <img src={icon} alt="" />}
			<strong className={BoardListStyle['title']}>{title}</strong>
			{label !== '' && <Tag color={BoardListStyle.labelBackground01}>{label}</Tag>}
		</span>
		{date !== '' && <span className={BoardListStyle['list-date']}>{date}</span>}
	</AtomicButton>
);

BoardDataList.propTypes = {
	title: PropTypes.string,
	date: PropTypes.string,
	icon: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default BoardDataList;
