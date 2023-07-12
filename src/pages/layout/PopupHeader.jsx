import { useRef, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";
import HeaderStyle from './Header.module.scss';
function PopupHeader({
    id,
    titleAlign,
    from,
    className = '',
    children = '',
    clickRightBtn,
}){
    const headerScrollIsTop = useSelector((state) =>
    from === 'FullPopup'
        ? state.globalState.fullPopup.isFullPopupScrollTop
        : state.globalState.page.isPageScrollTop,
    );
    const refLeftBtn = useRef(null);
	const refTitle = useRef(null);
	const refRight = useRef(null);

	// const baseUrl = Url.BASE;
	// const login = useSelector((state) => state.login);

	useEffect(() => {
		const wLeftBtn = refLeftBtn.current ? refLeftBtn.current.getBoundingClientRect().width : 0;
		const wRightBtn = refRight.current ? refRight.current.getBoundingClientRect().width : 0;

		if (refTitle.current) {
			// ? 100vw - 왼쪽버튼 - 오른쪽버튼 - 텍스트 틀어가는 곳 의 왼쪽마진 - header tag의 왼쪽 패딩 - header tag의 오른쪽 패딩
			refTitle.current.style.maxWidth = `calc(100vw - ${wLeftBtn}px - ${wRightBtn}px - 8px - 14px - 11px)`;
		}
	}, []);
    // Right 첫 번째 버튼 클릭 시,
	const onClickRight = useCallback(
		(e) => {
			e.preventDefault();

			if (clickRightBtn) {
				clickRightBtn();
			} 
		},
		[clickRightBtn],
	);
    return (
        <div
			className={`${HeaderStyle['header-wrap']} ${
				headerScrollIsTop ? '' : HeaderStyle['scroll']
			} ${className}`}
		>
			<header id={id}>
				<div className={HeaderStyle[`header-${titleAlign}`]}>
					{<h1 ref={refLeftBtn}>{children}</h1>}
				</div>

				<div className={HeaderStyle['header-right']}>
                    <button
                        type="button"
                        className={HeaderStyle[`icon-header-close`]}
                        onClick={onClickRight}
                    >
                    </button>
				</div>
			</header>
		</div>
    )
}
export default PopupHeader