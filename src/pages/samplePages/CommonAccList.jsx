import { useState, useRef, useCallback, useEffect } from 'react';
import { useAccountList} from '@modules/hooks';
import { AccountListDrawer } from '@layouts';
import { Type } from '@constants';
import { ButtonToolbar } from "react-bootstrap";
import { ButtonGroup } from "reactstrap";
import { Button } from 'react-bootstrap';
function CommonAccList (){
    const { loadAccountList, showAccountList } = useAccountList();
    // 선택 출금계좌 State
	const [selectedAccount, setSelectedAccount] = useState({
		label: '-',
		account: '-',
		bankcd: '',
		banknm: '',
		balance: '0',
		img: <></>,
	});
    	/**
	 * 출금계좌 선택 콜백함수
	 */
	const onSelectAccount = useCallback(
		(account, data) => {

			setSelectedAccount({
				label: "상품명",
				acnoDisplay:"123456789",
				acno:"계좌번호",
				bankcd: "은행로고코드",
				banknm: "은행명",
				isShinhan: "",
				newGubun: "", // 신계좌 변환여부
				bankGubun: "", // 은행구분
				balance: "",//잔액
				img: "",//은행로고코드
			});

			showAccountList(false);

		},
		[showAccountList],
	);
    const drawAccountList = () => {
        return (
            <>
             {<AccountListDrawer
                    loadType={Type.DATA_LOAD.ONCE}
                    title="출금계좌"
                    noDataMessage="출금 가능한 계좌가 없습니다."
                    requestOptions={{
                        accountType: '1',
                        bRefresh: true,
                        bBalance: true,
                        bOnlyOther: false,
                        otherFirstYn: 'N',
                    }}
                    onRequest={loadAccountList}
                    selectedList={selectedAccount.acnoDisplay}
                    onSelect={onSelectAccount}
                />}
                
            </>
        );
    };
	const showList = () =>{
		showAccountList(true);
	}
    return (
    <>
	    <br />
		<ButtonToolbar>
			<ButtonGroup className="me-2">
			<Button
				onClick={showList}
			>
				출금계좌 레이어팝업
			</Button>
			</ButtonGroup>
		</ButtonToolbar>
    	{drawAccountList()}
    </>
    )
}
export default CommonAccList;