import {Accordion} from "@components";

const accordionData = [
  {
    title: "Section 1",
    content: `키움 히어로즈(대표이사 위재민)가 29일 오전 LG 트윈스로부터 내야수 이주형과 투수 김동규, 2024년 신인드래프트 1라운드 지명권을 받고, 투수 최원태를 내주는 트레이드를 단행했다. <br>이주형은 경남고를 졸업하고 2020년 신인드래프트 2차 2라운드 전체 13순위로 LG에 입단했다. 내외야 모든 포지션을 소화할 수 있는 유틸리티 선수로 빠른 주력과 정교한 타격이 장점이다. 지난 2월 전역한 뒤 이번 시즌 18경기에 출전해 4안타 2타점 2득점 타율 0.267을 기록했다.`,
  },
  {
    title: "Section 2",
    content: `맨체스터 시티(맨시티) 축구스타들이 한국에서 K-POP 걸그룹 최고의 별과 연이은 인연을 맺으면서 눈길을 끌고 있다.잉글리시 프리미어리그 챔피언 맨시티는 지난 27일 인천국제공항을 통해 대한민국에 입국했다. 2023 여름 프리시즌을 맞이해 맨시티는 아시아 투어를 계획하면서 일본과 한국을 찾았다.`,
  },
  {
    title: "Section 3",
    content: `파리생제르망(PSG)이 프리시즌 경기에서 부진을 이어갔다. PSG는 28일 일본 오사카에서 열린 세레소 오사카와의 프리시즌 경기에서 난타전 끝에 2-3으로 패했다. PSG는 지난 25일 열린 알 나스르와의 프리시즌 경기에서 득점없이 0-0으로 비긴데 이어 아시아투어 2경기에서 승리를 거두지 못했다.`,
  },
];

const SamplePageAccordion = () => {
  return (
    <div>
	    <h1>Accordion Test</h1>
	    <Accordion sections={accordionData} />
    </div>
  );
};

export default SamplePageAccordion;
