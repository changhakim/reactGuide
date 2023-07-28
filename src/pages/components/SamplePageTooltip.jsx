import {Tooltip} from "@components";
import { Button } from 'react-bootstrap';

const SamplePageTooltip = () => {
  return (
    <>
    {/* <h1 style={{ marginLeft: '10px' }} >Tooltip Component </h1> */}
    <div  style={{ marginLeft: '120px' }}>
      <div>
        <br/>
        <Tooltip content="중앙 툴팁 테스트" position="center" >
          <Button>Center</Button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <br/>
        <Tooltip content="상단 툴팁 테스트" position="top" >
          <Button>Top</Button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <br/>
        <Tooltip content="하단 툴팁 테스트" position="bottom" >
          <Button>Bottom</Button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <br/>
        <Tooltip content="오른쪽 툴팁 테스트" position="right" >
          <Button>Right</Button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <br/>
        <Tooltip content="왼쪽 툴팁 테스트" position="left" >
          <Button>Left</Button>
        </Tooltip>
      </div>
    </div>
    </>
  );
};

export default SamplePageTooltip;
