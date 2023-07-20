# Drawer

서랍 형태의 UI Component 입니다.
저징된 방향으로 부터 팝업이 오픈됩니다.

높이에 대한 우선순위 : isFullLayout > isFitContents > set Height
높이단위 : 기본 px, isPercentH 가 true일 경우 %로 동작

## _동작 정의_

```
Drawer의 컨텐츠가 주입 되지 않은 경우 : {
    화면 높이의 50% 고정으로 오픈 됨
    ::after + isLazyResize === true {
        컨텐츠가 주입 된 후 스크롤을 통하여 컨텐츠의 높이만큼 조절됨.
    }
},

Drawer의 컨텐츠가 주입 된 경우 : {
    bleedingHeight > 0 : '해당 크기만큼 화면상에 항상 노출 되어 보여지며 높이값은 ( bleedingHeight ~ 지정된 높이 ) 값을 갖는다.',
    isPuller === true : '헤더영역에 puller UI가 제공되며, 사용자의 터치에 따라 높이가 조절 된다.'
    isLazyResize === true : {
        컨텐츠의 높이 > 화면 높이 : '최초 오픈시 화면의 50% 만큼만 노출되며, 스크롤을 통해 컨텐츠의 높이만큼 조절 됨'
        컨텐츠의 높이 < 화면 높이 : '최초 오픈시 컨텐츠의 높이에 맞춰 오픈 됨'
    }
}.
```

## _DIM UI_

```
opts.isPuller가 true일 경우 바닥 Dim처리 하지 않는다.
opts.isPuller가 false일 경우 바닥 Dim처리를 하며, Dim 클릭시 Drawer는 사라진다.

```

## _Usage_

```jsx
import { useDrawer } from '@modules/hooks';
import { Drawer } from '@components';

const [isVisible, handler] = useDrawer(uniqueKey);

return (
    <Drawer
        opts={{
            drawerKey: 'uniqueKey',
            isFullLayout: true,
            drawerBleeding: 56,
            header: {
                subTitle: 'fit Contents Drawer',
                title: (
                    <>
                        <div style={{ border: '2;px;solid #3c3c3c', paddingTop: '15px' }}>
                            <span style={{ fontSize: '3rem' }}>{`Title : fitDrawer`}</span>
                        </div>
                    </>
                ),
                contents : (
                    <div>타이틀 아래 출력됨</div>
                )
                isClose: true,
            },
            afterOpen: () => {
                ......
            },
            afterClose: () => {
                ......
            },
        }}
    >
        팝업영역 Contents Element
    </Drawer>
);
```

## _Control_

```jsx
const openDrawer = () => {
	handler(true | false);
};
```

## _Options_

| props        |                  |             | type                       | defualt value                 | desc                                                                                                                                                                                                                           |
| ------------ | ---------------- | ----------- | -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| opts         | drawerKey **\*** |             | string                     | null                          | drawer를 제어 할 유니크한 코드                                                                                                                                                                                                 |
|              | drawerBleeding   |             | number                     | 0                             | 지정된 크기만큼 UI 미리 노출                                                                                                                                                                                                   |
|              | isFullLayout     |             | boolean or object          | false                         | Drawer를 전체화면으로 노출 여부 ( boolean type true 일경우 전체를 덮는 Drawer 생성 object type의 {isKeepHeader : true}일경우 헤더 아래 영역까지만 올라옴, 해당 속성값의 false, undefined, null 값들 외에는 전체 true로 간주됨) |
|              | isFitContents    |             | boolean                    | false                         | Drawer를 높이를 컨텐츠 영역에 맞춰서 출력 여부 ( true일 경우 Drawer 높이 우선순위 최우선 )                                                                                                                                     |
|              | isPuller         |             | boolean                    | true                          | Drawer상단에 Puller를 제공                                                                                                                                                                                                     |
|              | isPercentH       |             | boolean                    | false                         | Drawer 높이에 대한 기본 단위 ( 기본 px, true일 경우 %)                                                                                                                                                                         |
|              | header           |             | object                     | null                          | 헤더영역 Contents 정보                                                                                                                                                                                                         |
|              |                  | subTitle    | string or element          | null                          | 헤더영역 타이틀 하단 안내문구 설정                                                                                                                                                                                             |
|              |                  | title       | string or element          | null                          | 헤더영역 제목 설정                                                                                                                                                                                                             |
|              |                  | contents    | string or element          | null                          | 헤더영역 제목 아래 설정                                                                                                                                                                                                        |
|              |                  | isClose     | boolean                    | true                          | 헤더영역 닫기버튼 노출 여부                                                                                                                                                                                                    |
|              |                  | isElevation | boolean                    | false                         | 헤더영역 닫기버튼 UI 설정( 위/아래 화살표 UI가 노출 ) -> isClose가 true이면서 해당 prop이 true이면 적용                                                                                                                        |
|              | bottomButton     |             | object                     | null                          | DrawerLayout 다음에 위치 할 button 목록 ( props는 GroupButton과 동일)                                                                                                                                                          |
|              |                  | items       | array(object::GroupButton) | null                          | DrawerLayout 다음에 위치 할 button 목록 Item정보 ( props는 GroupButton과 동일) , size prop 추가, 버튼사이즈 결정 (GridLayoutCol 대응)                                                                                          |
|              |                  | buttonSize  | string(BUTTON_SIZE_TYPES)  | null                          | DrawerLayout 다음에 위치 할 button 목록 size ( props는 GroupButton과 동일)                                                                                                                                                     |
|              |                  | itemSplit   | string(SPLIT)              | 'full'                        | DrawerLayout 다음에 위치 할 button 목록의 분할 방법 ( props는 GroupButton과 동일)                                                                                                                                              |
|              |                  | spacing     | number                     | 0                             | 버튼 영역 상단 여백 설정                                                                                                                                                                                                       |
|              |                  | gapX        | number                     | 8                             | 버튼들 사이의 여백을 설정                                                                                                                                                                                                      |
|              |                  | className   | string                     | ''                            | 버튼영역 wrapper에 적용 할 class ( GridLayoutRow )                                                                                                                                                                             |
|              | afterOpen        |             | function                   | null                          | Drawer Component가 열린 후 Callback                                                                                                                                                                                            |
|              | afterClose       |             | function                   | null                          | Drawer Component가 닫힌 후 Callback                                                                                                                                                                                            |
|              | height           |             | number                     | 50                            | Drawer Component의 높이 지정 ( isFullLayout == false && isFitContents == false 일 경우 적용. )                                                                                                                                 |
|              | zIndex           |             | number                     | 900                           | Drawer zIndex 설정                                                                                                                                                                                                             |
|              | isKeepScroll     |             | boolean                    | false                         | contents가 갱신되었을때 Drawer 내부의 스크롤 유지 여부                                                                                                                                                                         |
|              | duration         |             | number                     | 500                           | drawer transition 속도 설정                                                                                                                                                                                                    |
|              | onDismiss        |             | function                   | undefined                     | dimed된 배경을 클릭했을경우 실행 될 이벤트 정의 ( ✶ Drawer가 자동으로 닫히지 않음. )                                                                                                                                           |
| style        |                  |             | object                     | {}                            | Drawer 전체 wrapper에 적용 할 인라인 스타일                                                                                                                                                                                    |
| className    |                  |             | object                     | { wrapper: '', contents: '' } | { wrapper: Drawer 전체 wrapper에 적용 할 추가 css className , contents: Drawer Contents wrapper에 적용 할 추가 css className }                                                                                                 |
|              | wrapper          |             | string                     | ''                            | Drawer 전체 wrapper에 적용 할 추가 css className                                                                                                                                                                               |
|              | contents         |             | string                     | ''                            | Drawer Contents wrapper에 적용 할 추가 css className                                                                                                                                                                           |
| isLazyResize |                  |             | boolean                    | false                         | true일 경우 최초 50%만 오픈 후 스크롤을 통해 컨텐츠의 길이만큼 Drawer가 조정됨                                                                                                                                                 |
| spacing      |                  |             | number                     | 0                             | contents 영역의 상단 여백 설정                                                                                                                                                                                                 |
| children     | -                |             | string or Element          | null                          | Drawer 영역에 포함 될 Contents 정보                                                                                                                                                                                            |
