import { useState, useCallback, useEffect, useRef } from 'react';
import { useAccountList } from '@modules/hooks';
import { useSelector } from 'react-redux';
import { AccountListDrawer } from '@layouts';
import { Type } from '@constants';
import { Tab } from "@components";
import stringUtil00 from "@utils/basis/stringUtil00";
import SampleData from "./SampleData";
import SampleMainStyle from "./SampleMain.module.scss";
import classNames from 'classnames/bind';

const SampleTransfer = () => {
    const cx = classNames.bind(SampleMainStyle);
    const { loadAccountList, showAccountList } = useAccountList();
    const accountList = useSelector((state) => state.accountList);
    const [showTransferPop, setShowTransferPop] = useState(false);
    const transferPop = useRef();
    // 선택 출금계좌 State
	const [selectedAccount, setSelectedAccount] = useState({
		label: '',
		account: '',
        addCommaAmount: '',
        acnoDisplay: '',
	});
    /**
	 * 출금계좌 선택 콜백함수
	 */
	const onSelectAccount = useCallback(
		(account, data) => {
			setSelectedAccount({
                ...data,
                addCommaAmount: stringUtil00.sbGetFormatAmt(data.testAmount.balance),
            });
			showAccountList(false);
		},
		[showAccountList],
	);

    //common 수정 최소화로 해당 파일에서 별도 처리
    useEffect(() => {
        if(accountList.data[0] && accountList.data[0].account && !selectedAccount.account) {
            onSelectAccount(accountList.data[0].account, accountList.data[0]);
        }
    }, [accountList, onSelectAccount, selectedAccount]);

    const tabData1 = [ { title :'하나은행'},{ title :'다른은행'}];
    const bankTab1 = <Tab tabData={tabData1} activeTab ={0} onClickTabHandler ={() => {alert("준비중입니다")}}/>;
    const tabData2 = [ { title :'최근'},{ title :'자주'},{ title :'내계좌'},{ title :'심플'}];
    const bankTab2 = <Tab tabData={tabData2} activeTab ={0} onClickTabHandler ={() => {alert("준비중입니다")}}/>;
    const drawAccountList = 
        <AccountListDrawer
            loadType={Type.DATA_LOAD.ONCE}
            title="출금계좌"
            subTitle={bankTab1}
            noDataMessage="출금 가능한 계좌가 없습니다."
            requestOptions={{
                accountType: '1',
                bRefresh: false,
                bBalance: true,
                bOnlyOther: false,
                otherFirstYn: 'N',
            }}
            onRequest={loadAccountList}
            selectedList={selectedAccount.acnoDisplay}
            onSelect={onSelectAccount}
        />
    
    const closeTranferPop = (e) => {
        if(e.target !== transferPop.current && !transferPop.current.contains(e.target)) {
            setShowTransferPop(false);
        }
    }
    
    useEffect(() => {
        window.addEventListener("mousedown", closeTranferPop);
        return () => {
        window.removeEventListener("mousedown", closeTranferPop);
        };
    }, []);

    const clickAccountBox = () => {
        if(!showTransferPop) {
            showAccountList(true);
        }
    }

    return (
    <div>
        <div className={cx('account_box')}>
            <div onClick={clickAccountBox}>
            <p className={cx('inner_title')}>{selectedAccount.label}</p>
            <p className={cx('inner_sub_title')}>
                <span>{selectedAccount.account}</span>
                <span className={cx('float_right')}>∨</span>
            </p>
            <p className={cx('txt_price1')}>
                {selectedAccount.addCommaAmount && (<><span>{selectedAccount.addCommaAmount}</span>원</>)}
            </p>
            </div>
            {drawAccountList}
        </div>
        <div className={cx('text_center')}>
            <p>▼</p>
            <p className={cx('sub_title')}>누구에게 보낼까요?</p>
        </div>
        <div onClick={() => setShowTransferPop(true)} className={cx('account_box1', 'sub_title')}>
            은행/계좌번호 입력
        </div>
        <div ref={transferPop} className={`${cx('temp_btm_pop', showTransferPop && 'temp_btm_show' )}`}>
            <input type='text' placeholder='이름, 계좌번호, 연락처 등 입력(기능 미구현)'/>
            <div className={cx('temp_btm_pop_tab')}>
                {bankTab2}
            </div>
            {SampleData.testAccountInfo.map((info, index) => (
                <button key={`sampleTransfer_${info.accountNum}`} className={cx('account_btn_list')}>
                    <span className={cx('img_wrap')}>
                        <img
                            alt={info.bankName}
                            src={`img/bank_${info.bankCode}.png`}
                        />
                    </span>
                    <span>
                        <p>{info.ownerName}</p>
                        <p>{info.bankName} {info.accountNum}</p>
                    </span>
                </button>
            ))}
        </div>
    </div>
    )
}
export default SampleTransfer;