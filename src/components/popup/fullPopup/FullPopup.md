# FullPopup

FullPopup Component UI를 제공합니다.

## _Usage_

```jsx
import { useModal } from '@modules/hooks';
import PropTypes from 'prop-types';
import { FullPopup } from '@/components/popup/fullPopup';
import { BUTTON_CLASS_TYPES, BUTTON_TYPES } from '@/components/button/constants';

const { handleFullPopup } = useModal();

const items1 = [
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼1`,
		disable: false,
		className: BUTTON_CLASS_TYPES.SECONDARY01,
		onClick: () => {
			......
		},
	},
];

const items2 = [
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼1`,
		disable: false,
		className: BUTTON_CLASS_TYPES.SECONDARY01,
		onClick: () => {
			.....
		},
	},
	{
		type: BUTTON_TYPES.BUTTON,
		buttonText: `버튼2`,
		disable: false,
		className: BUTTON_CLASS_TYPES.PRIMARY,
		onClick: () => {
			......
		},
	},
];

const FullComponent = (className) => {
	return <p className={className}>메세지 영역</p>;
};

const onBtnClick = () => {
	.......
};

const handleOpenFullPopup = () => {
	handleFullPopup({
		isOpen: true,
		title: '타이틀',
		content: FullComponent,
		xOnClick: onBtnClick,
	});
};

const handleOpenFullPopup1 = () => {
	handleFullPopup({
		isOpen: true,
		title: '타이틀',
		content: FullComponent,
		xOnClick: onBtnClick,
		items: items1,
	});
};

const FullComponent2 = (className) => {
	return (
		<>
			콘텐츠 영역입니다.3
			<br />
			콘텐츠 영역입니다.3
			<br />
			콘텐츠 영역입니다.3
			<br />
			콘텐츠 영역입니다.3
		</>
	);
};

const handleOpenFullPopup2 = () => {
	handleFullPopup({
		isOpen: true,
		title: '타이틀',
		content: FullComponent2,
		xOnClick: onBtnClick,
		items: items2,
	});
};

<div>
	<h1>Popup</h1>
	<hr />
	<h2>Full Popup</h2>
	{/* 바텀시트 화면 표시용 버튼 */}
	<Button uiType="primary" onClick={handleOpenFullPopup}>
		풀팝업1 활성화
	</Button>
	<Button uiType="primary" onClick={handleOpenFullPopup1}>
		풀팝업2 활성화
	</Button>
	<Button uiType="primary" onClick={handleOpenFullPopup2}>
		풀팝업3 활성화
	</Button>
</div>;
```

## _Options_

| props |                | type   | defualt value | desc                                                                                            |
| ----- | -------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------- |
| props | title          | string | ''            | 상단 타이틀                                                                                     |
|       | active         | bool   | ''            | 활성화 상태값                                                                                   |
|       | xOnClick       | func   | ''            | x버튼 이벤트                                                                                    |
|       | isOpen         | bool   | false         | 팝업 생성 유무                                                                                  |
|       | content        | jsx    | null          | 컨텐츠                                                                                          |
|       | leftArea       | string | 'back'        | 헤더 왼쪽버튼                                                                                   |
|       | rightArea      | string | 'close'       | 헤더 오른쪽버튼1                                                                                |
|       | rightArea2     | string | 'none'        | 헤더 오른쪽버튼2                                                                                |
|       | rightArea3     | string | 'none'        | 헤더 오른쪽버튼3                                                                                |
|       | clickLeftBtn   | func   | ''            | 헤더 이벤트                                                                                     |
|       | clickRightBtn2 | func   | ''            | 헤더 이벤트                                                                                     |
|       | clickRightBtn3 | func   | ''            | 헤더 이벤트                                                                                     |
|       | id             | string | ''            | 팝업 id                                                                                         |
|       | callbackData   | string | ''            | 함수 콜백데이터                                                                                 |
|       | linkedPopupId  | string | ''            | 헤더에 넘겨줄 값                                                                                |
|       | down           | bool   | ''            | 헤더에 넘겨줄 값                                                                                |
|       | className      | string | ''            | scss 값                                                                                         |
|       | titleCenter    | bool   | ''            | 헤더 넘겨줄 값                                                                                  |
|       | titleAlign     | string | ''            | 타이틀 정렬 속성                                                                                |
|       | xClosing       | bool   | true          | x버튼 누를때 풀팝업 닫힘 여부                                                                   |
|       | fullContent    | bool   | true          | margin 유무 속성                                                                                |
|       | actionPop      | bool   | true          | 최초 app.jsx 로드할때를 제외한 팝업호출인지 여부 false: app.jsx호출 true: 그 외에 정상적인 호출 |
|       | spacing        | number | 32            | margin-top 속성                                                                                 |
