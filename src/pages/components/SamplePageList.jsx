import { BasicList, ButtonList, ImgList } from "@components";

const SamplePageList = () => {
  const textListTitle = <h1>기본ul/li 타이틀</h1>;
  const textListSample = [
    { key: "textKey1", listContent: "textList1" },
    { key: "textKey2", listContent: "textList2" },
    { key: "textKey3", listContent: "textList3" },
  ];

  const buttonListTitle = <h1>버튼 타이틀</h1>;
  const buttonListSample = [
    {
      key: "buttonKey1",
      listContent: "buttonList1",
      onClick: () => {
        console.log("1");
      },
    },
    {
      key: "buttonKey2",
      listContent: "buttonList2",
      onClick: () => {
        console.log("2");
      },
    },
    {
      key: "buttonKey3",
      listContent: "buttonList3",
      onClick: () => {
        console.log("3");
      },
    },
  ];

  const imgListTitle = <h1>이미지 타이틀</h1>;
  const imgListSample = [
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

  return (
    <>
      <BasicList
        titleText={textListTitle}
        children={textListSample}
      ></BasicList>
      <hr />
      <ButtonList
        titleText={buttonListTitle}
        children={buttonListSample}
      ></ButtonList>
      <hr />
      <ImgList titleText={imgListTitle} children={imgListSample}></ImgList>
    </>
  );
};

export default SamplePageList;
