import { ButtonToolbar } from "react-bootstrap";
import { ButtonGroup } from "reactstrap";
import Button from "react-bootstrap/Button";

function ComponentHome() {
  return (
    <>
      <br />
      <ButtonToolbar>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageCalendarPicker");
            }}
          >
            calendarPicker
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageCheckbox");
            }}
          >
            checkbox
          </Button>
          
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageTab");
            }}
          >
            Tab
          </Button>
          
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageToggle");
            }}
          >
            Toggle
          </Button>
          
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageTooltip");
            }}
          >
            Tooltip
          </Button>
          
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SamplePageDropdown");
            }}
          >
            Dropdown
          </Button>
          
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}

const movePage = (pageNm) => {
  window.navigate("/" + pageNm, {});
};

export default ComponentHome;
