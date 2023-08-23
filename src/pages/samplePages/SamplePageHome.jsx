import { ButtonToolbar } from "react-bootstrap";
import { ButtonGroup } from "reactstrap";
import Button from "react-bootstrap/Button";
function SamplePage() {
  return (
    <>
      <br />
      <ButtonToolbar>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("CommonAccList");
            }}
          >
            CommonAccList
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("");
            }}
          >
            Button01
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("CommonAccMngList");
            }}
          >
            Button02-1
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("WithdrawRegister");
            }}
          >
            Button02-2
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SampleTransfer");
            }}
          >
            Button03
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("CommonLogin");
            }}
          >
            Button04
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <br></br>
      <ButtonToolbar>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("MyAssetDiagnose");
            }}
          >
            Button05
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SampleMain");
            }}
          >
            Button06
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SampleEvent");
            }}
          >
            Button07-1
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("SampleEventQuiz");
            }}
          >
            Button07-2
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("HomeSetup");
            }}
          >
            Button08
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2">
          <Button
            onClick={() => {
              movePage("InquiryOption");
            }}
          >
            Button09
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </>
  );
}
const movePage = (pageNm) => {
  if (pageNm === "") {
    alert("작업 예정!");
    return;
  } else {
    window.navigate("/" + pageNm, {});
  }
};
export default SamplePage;
