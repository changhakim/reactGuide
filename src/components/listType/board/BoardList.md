# BoardList

게시판 목록 입니다.

## _Usage_

```jsx
import { BoardDataList, BoardBannerList, BoardMediaList } from '@components';
import { BoardDetail } from '@components/listType/board/BoardDetail';

const handleBoardEvent = () => {....}

ex)
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
			 * @prop {func} onClick - 클릭이벤트 (default: '')
			 */}
			<BoardDataList title="타이틀" date="YYYY.MM.DD" onClick={handleBoardEvent} />
			<BoardDataList title="타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다." date="YYYY.MM.DD" onClick={handleBoardEvent} />
			<BoardDataList
				title="타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다."
				date="YYYY.MM.DD"
				onClick={handleBoardEvent}
			/>
			<BoardDataList title="타이틀" date="YYYY.MM.DD" icon={TempIcon1} onClick={handleBoardEvent} />
			<BoardDataList title="타이틀 최대 두줄까지 가능합니다." text="" date="YYYY.MM.DD" icon={TempIcon1} onClick={handleBoardEvent} />
			<BoardDataList
				title="타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다."
				date="YYYY.MM.DD"
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
			 * @prop {func} onClick - 클릭이벤트 (default: '')
			 */}
			<BoardBannerList title="타이틀" date="YYYY.MM.DD - YYYY.MM.DD" image={TempImage1} alt="이미지 내용" onClick={handleBoardEvent} />
			{/**
			 * @description BoardMediaList Prop
			 *
			 * @prop {string} title - 리스트 타이틀 (default: '')
			 * @prop {string} text - 리스트 내용 (default: '')
			 * @prop {string} image - img (default: '')
			 * @prop {string} alt - img alt (default: '')
			 * @prop {func} onClick - 클릭이벤트 (default: '')
			 */}
			<BoardMediaList title="타이틀" text="요약정보" image={TempImage2} alt="이미지 내용" onClick={handleBoardEvent} />
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
				title="타이틀"
				date="YYYY.MM.DD"
				icon={TempIcon1}
				files={[
					{ name: '파일명1.pdf', onClick: handleBoardEvent },
					{ name: '파일명2.pdf', onClick: handleBoardEvent },
					{ name: '파일명3.pdf', onClick: handleBoardEvent },
					{ name: '파일명4.pdf', onClick: handleBoardEvent },
				]}
			>
				상세내용 텍스트 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하 가나다라바마사아자차카타파하
				가나다라마바사아자차카타파하 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
			</BoardDetail>
			<BoardDetail
				title="타이틀 최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다.최대 두줄까지 가능합니다."
				date="YYYY.MM.DD - YYYY.MM.DD"
			>
				상세내용 텍스트 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하 가나다라바마사아자차카타파하
				가나다라마바사아자차카타파하 가나다라바마사아자차카타파하 가나다라마바사아자차카타파하
			</BoardDetail>
		</>
	);

```

## _Options_

| props           |         | type   | defualt value | desc                                                         |
| --------------- | ------- | ------ | ------------- | ------------------------------------------------------------ |
| BoardDataList   | title   | string | ''            | 타이틀                                                       |
|                 | date    | string | ''            | 날짜정보                                                     |
|                 | icon    | string | ''            | 아이콘경로                                                   |
|                 | onClick | func   | ''            | 클릭 이벤트                                                  |
| BoardBannerList | title   | string | ''            | 타이틀                                                       |
|                 | date    | string | ''            | 날짜정보                                                     |
|                 | image   | string | ''            | 이미지경로                                                   |
|                 | alt     | string | ''            | 이미지 설명                                                  |
|                 | onClick | func   | ''            | 클릭 이벤트                                                  |
| BoardMediaList  | title   | string | ''            | 타이틀                                                       |
|                 | text    | string | ''            | 내용                                                         |
|                 | image   | string | ''            | 이미지 경로                                                  |
|                 | alt     | string | ''            | 이미지 설명                                                  |
|                 | onClick | func   | ''            | 클릭 이벤트                                                  |
| BoardDetail     | title   | string | ''            | 타이틀                                                       |
|                 | date    | string | ''            | 날짜정보                                                     |
|                 | icon    | string | ''            | 아이콘경로                                                   |
|                 | files   | array  | ''            | 파일 내용 ({ name: '파일명1.pdf', onClick: 클릭이벤트함수 }) |
