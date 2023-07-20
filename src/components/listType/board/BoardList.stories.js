import TempIcon1 from '@styles/assets/images/icon/icon-menu-smart-transfer01.svg';
import TempImage1 from '@styles/assets/images/temp/Area.png';
import TempImage2 from '@styles/assets/images/temp/media.png';
import { BoardDataList, BoardBannerList, BoardMediaList, BoardDetail } from '@components';
import { loggerUtil } from '@utils';
import { Doc } from './BoardList.stories.mdx';

export default {
	title: 'old_v1/Component/List',
	parameters: {
		componentSubtitle: 'BoardList UI Component',
		docs: {
			page: Doc,
		},
	},
};

const handleBoardEvent = () => loggerUtil.info(123);

export const BoardList = () => {
	return (
		<>
			<h1>게시판</h1>
			<h2>List</h2>
			{/**
			 * @description BoardDataList Prop
			 *
			 * @prop {string} title - 리스트 타이틀 (default: '')
			 * @prop {string} date - 리스트 날짜 (default: '')
			 * @prop {string} icon - icon img (default: '')
			 */}
			<BoardDataList title='타이틀' date='YYYY.MM.DD' onClick={handleBoardEvent} />
			<BoardDataList
				title='타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.'
				date='YYYY.MM.DD'
				onClick={handleBoardEvent}
			/>
			<BoardDataList
				title='타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.'
				date='YYYY.MM.DD'
				onClick={handleBoardEvent}
			/>
			<BoardDataList
				title='타이틀'
				date='YYYY.MM.DD'
				icon={TempIcon1}
				onClick={handleBoardEvent}
			/>
			<BoardDataList
				title='타이틀 최대 두줄까지 가능합니다.'
				text=''
				date='YYYY.MM.DD'
				icon={TempIcon1}
				onClick={handleBoardEvent}
			/>
			<BoardDataList
				title='타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.'
				date='YYYY.MM.DD'
				icon={TempIcon1}
				onClick={handleBoardEvent}
			/>
			{/**
			 * @description BoardBannerList Prop
			 *
			 * @prop {string} title - 리스트 타이틀 (default: '')
			 * @prop {string} date - 리스트 날짜 (default: '')
			 * @prop {string} image - img (default: '')
			 * @prop {string} alt - img alt (default: '')
			 */}
			<BoardBannerList
				title='타이틀'
				date='YYYY.MM.DD - YYYY.MM.DD'
				image={TempImage1}
				alt='이미지 내용'
				onClick={handleBoardEvent}
			/>
			{/**
			 * @description BoardMediaList Prop
			 *
			 * @prop {string} title - 리스트 타이틀 (default: '')
			 * @prop {string} text - 리스트 내용 (default: '')
			 * @prop {string} image - img (default: '')
			 * @prop {string} alt - img alt (default: '')
			 */}
			<BoardMediaList
				title='타이틀'
				text='요약정보'
				image={TempImage2}
				alt='이미지 내용'
				onClick={handleBoardEvent}
			/>
			<h2>Detail</h2>
			{/**
			 * @description BoardDetail Prop
			 *
			 * @prop {string} title - 리스트 타이틀 (default: '')
			 * @prop {string} date - 리스트 내용 (default: '')
			 * @prop {string} icon - icon img (default: '')
			 * @prop {array} files - 첨부파일 정보 (default: [])
			 */}
			<BoardDetail
				title='타이틀'
				date='YYYY.MM.DD'
				icon={TempIcon1}
				files={[
					{ name: '파일명1.pdf', onClick: handleBoardEvent },
					{ name: '파일명2.pdf', onClick: handleBoardEvent },
					{ name: '파일명3.pdf', onClick: handleBoardEvent },
					{ name: '파일명4.pdf', onClick: handleBoardEvent },
				]}
			>
				상세내용 텍스트 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
			</BoardDetail>
			<BoardDetail
				title='타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.'
				date='YYYY.MM.DD - YYYY.MM.DD'
			>
				상세내용 텍스트 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
				가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
			</BoardDetail>
		</>
	);
};
