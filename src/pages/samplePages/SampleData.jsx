const testAccountInfo = [
    {
      alias: "급여통장",
      accountType: "입출금",
      accountNum: "123-123456-1234",
      ownerName: '테스트',
      amt: "1,000,000",
      bankCode: '010',
      bankName: '하나',
    },
    {
      alias: "입출금통장",
      accountType: "입출금",
      accountNum: "234-123456-1235",
      ownerName: '테스트',
      amt: "50,000",
      bankCode: '020',
      bankName: '우리',
    },
    {
      alias: "별명테스트",
      accountType: "입출금",
      accountNum: "234-123456-2345",
      ownerName: '테스트',
      amt: "100,000",
      bankCode: '010',
      bankName: '하나',
    },
    {
      alias: "통장이름",
      accountType: "입출금",
      accountNum: "234-111111-2222",
      ownerName: '테스트',
      amt: "33,333",
      bankCode: '030',
      bankName: '농협',
    },
  ];
  
const testImgInfo = [
    {
      key: "sampleMainKey1",
      alt: "passbook",
      path: "img/passbook.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>전체계좌</>,
    },
    {
      key: "sampleMainKey2",
      alt: "building",
      path: "img/building.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>오픈뱅킹</>,
    },
    {
      key: "sampleMainKey3",
      alt: "gift",
      path: "img/gift.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>이벤트</>,
    },
    {
      key: "sampleMainKey4",
      alt: "pills",
      path: "img/pills.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>대출케어</>,
    },
    {
      key: "sampleMainKey5",
      alt: "medical-check",
      path: "img/medical-check.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>아이웰스</>,
    },
    {
      key: "sampleMainKey6",
      alt: "gear",
      path: "img/gear.png",
      onClick: () => {
        alert("준비중입니다.");
      },
      addInfo: <>맞춤설정</>,
    },
  ];
  
const testBannerInfo = [
    {
      key: "imgKey1",
      alt: "imgList1",
      path: "img/입출금.jpg",
      onClick: () => {
        console.log("이미지1");
      },
    },
    {
      key: "imgKey2",
      alt: "imgList2",
      path: "img/예적금.jpg",
      onClick: () => {
        console.log("이미지2");
      },
    },
    {
      key: "imgKey3",
      alt: "imgList3",
      path: "img/외화예적금.jpg",
      onClick: () => {
        console.log("이미지3");
      },
    },
  ];

  export default {
    testAccountInfo,
    testImgInfo,
    testBannerInfo,
  };
  