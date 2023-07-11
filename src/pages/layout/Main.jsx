import shCommon from "@commmons/shCommon"
import Popup from "./Popup"
import {useModal} from "@hooks"
function Main(){
    const { handleFullPopup } = useModal();
    const popupOpen = ()=>{ 
        handleFullPopup({
            id: 'BM1505-S0110-P01',
            isOpen: true,
            title: '팝업 테스트 페이지',
            content: () => <Popup />,
            leftArea: 'none',
            xOnClick: null,
            fullContent: false,
        });
    }
    return (
        <>
            <h1>메인페이지</h1>
            <div>
                <ul>
                    <li onClick={movePage}>alert 컴포넌트 테스트</li>
                    <li onClick={popupOpen}>풀팝업 호출</li>
                </ul>
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