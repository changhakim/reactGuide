/** ****************************************************************************************
 * @업무명   : BasicList(List)
 * @설명     : List -> BasicList
 ********************************************************************************************
 * 번호    작업자     작업일         JIRA            변경내용
 *-------------------------------------------------------------------------------------------
 * 1     윤우재     2022-04-06   LEADSOL-615      최초작성
 * 2     윤우재     2022-06-24   LEADSOL-3961     컴포넌트 리팩토링 및 구조변경
 ********************************************************************************************/

 import PropTypes from 'prop-types';
 import ListStyle from './BasicList.module.scss';
 
 const List = ({ spacing = 0, children }) => (
     <ul className={ListStyle['list-wrap']} style={{ '--spacing': `${spacing}px` }}>
         {children}
     </ul>
 );
 
 List.propTypes = {
     spacing: PropTypes.number,
     children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
 };
 
 export default List;
 