import {Tooltip} from "@components";

const SamplePageTooltip = () => {
  return (
    <>
    <h1 style={{ marginLeft: '10px' }} >Tooltip Test</h1>
    <div style={{ marginLeft: '200px' }} >
      <div>
        <br/>
        <Tooltip content="Hello, I'm a center tooltip!" position="center" >
          <button>Center</button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <Tooltip content="Hello, I'm a top tooltip!" position="top" >
          <button>Top</button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <Tooltip content="Hello, I'm a bottom tooltip!" position="bottom" >
          <button>Bottom</button>
        </Tooltip>
      </div>
      <div>
        <br/>
        <Tooltip content="Hello, I'm a right tooltip!" position="right" >
        <span>Right</span>
        </Tooltip>
      </div>
      <div>
        <br/>
        <Tooltip content="Hello, I'm a left tooltip!" position="left" >
        <span>Left</span>
        </Tooltip>
      </div>
    </div>
    </>
  );
};

export default SamplePageTooltip;
