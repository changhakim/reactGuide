# NoData

조회된 데이터가 없다는 결과를 출력합니다.

## _Usage_

```jsx
import { NoData } from '@layouts';

return (
	<NoData
		title="신입금 계좌 등록 고객이오니\n신입금 계좌 등록/삭제 메뉴를 이용해주세요."
		subTitle="입금계좌 등록/삭제 서비스를 이용하시면\n입금 계좌를 지정 관리할 수 있습니다."
		button={<Button btnText="자주쓰는 계좌 등록" onClick={btnOnClick} />}
		spacing="50"
	/>
);
```

## _Options_

| props    | type           | default value          | desc                                                 |
| -------- | -------------- | ---------------------- | ---------------------------------------------------- |
| title    | text           | '조회결과가 없습니다.' | 화면 메인 안내텍스트                                 |
| subTitle | text           | ''                     | 화면 보조 안내텍스트                                 |
| button   | BUTTON(object) | null                   | 필요시 타 기능 연계 버튼 삽입 (Button 컴포넌트 사용) |
| spacing  | text           | '0'                    | 화면 상단 여백 수치 결정                             |
