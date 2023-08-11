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
              movePage("CommonAccMngList");
            }}
          >
            Button02
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
              movePage("WithdrawRegister");
            }}
          >
            Button99 
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
      </ButtonToolbar>
    </>
  );
}
const movePage = (pageNm) => {
  window.navigate("/" + pageNm, {});
};
export default SamplePage;
