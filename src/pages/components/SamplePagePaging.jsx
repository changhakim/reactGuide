import { BasicList } from "@components";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

const SamplePagePaging = () => {
  let arr = [];
  for(let i=1; i<=200; i++) {
    arr = arr.concat({
      key : "pagingKey" + i,
      idx : i,
      listContent : "페이징 테스트 데이터" + i,
      onClick : () => {
        alert("Sample Index : " + i);
      },
    })
  }

  const title = <h1>페이징 테스트</h1>
  
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsCountPerPage = 10; // 한 페이지에 보여질 아이템 수
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIndexOfLastItem(currentPage * itemsCountPerPage);
    setIndexOfFirstItem(indexOfLastItem - itemsCountPerPage);
    setList(
      arr.filter(
        (name) => name.idx <= indexOfLastItem && name.idx > indexOfFirstItem
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, indexOfLastItem, indexOfFirstItem]);

  return (
    <>
      <BasicList
        titleText={title}
        children={list}
      ></BasicList>
      <Pagination
        activePage={currentPage} // 현재 페이지
        itemsCountPerPage={itemsCountPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={arr.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    </>
  );
};


export default SamplePagePaging;
