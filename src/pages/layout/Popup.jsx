import {useModal} from "@hooks"
function Popup(){
    const { handleFullPopup } = useModal();
    const closePopup = ()=>{
        handleFullPopup({
            id: 'BM1505-S0110-P01',
            isOpen: false,
        });
    }
    return (
    <>
        <h1>팝업 열림</h1>
        <button onClick={closePopup}>팝업 닫기</button>
    </>
    )
}

export default Popup