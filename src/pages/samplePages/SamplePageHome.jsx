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
              movePage("CommonLogin");
            }}
          >
            CommonLogin
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
