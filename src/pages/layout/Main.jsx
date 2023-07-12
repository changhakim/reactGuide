import shCommon from "@commmons/shCommon"
import Popup from "./Popup"
import {useModal} from "@hooks"
import { ButtonToolbar } from "react-bootstrap";
import { ButtonGroup } from "reactstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function Main(){
    const { handleFullPopup } = useModal();
    const popupOpen = ()=>{ 
        handleFullPopup({
            id: 'BM1505-S0110-P01',
            isOpen: true,
            title: '테스트 팝업',
            content: () => <Popup />,
            leftArea: 'none',
            xOnClick: null,
            fullContent: false,
        });
    }
    return (
        <>
            <br />
            <div>
            <ButtonToolbar>
            <ButtonGroup className="me-2">
                <Button variant="outline-info" onClick={movePage}> alert 컴포넌트 테스트</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2">
                <Button variant="outline-info" onClick={popupOpen}> 풀팝업 호출</Button>
            </ButtonGroup>  
            </ButtonToolbar>
            </div>
        </>
    )
}

const movePage  = ()=>{
	//window.navigate('/SamplePage',{});
    shCommon.showAlert(
        `alert테스트`,
    );
}
export default Main;