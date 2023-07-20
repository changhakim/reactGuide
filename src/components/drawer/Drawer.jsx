import classNames from 'classnames/bind';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import {
	any,
	bool,
	number,
	element,
	func,
	string,
	shape,
	object,
	oneOfType,
} from 'prop-types';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet'; // TODO. 용량 더 작은 라이브러리로 교체 가능한지 확인
import { useDrawer, useA11Y } from '@modules/hooks';
import {_} from '@utils';
import { DrawerHeader, DrawerLayout } from './index.js';
import DrawerStyle from './Drawer.module.scss';

const cx = classNames.bind(DrawerStyle);

const initOpts = {
	drawerKey: '',
	drawerBleeding: 0,
	isFullLayout: false,
	isFitContents: false,
	isPercentH: false,
	isPuller: true,
	header: {
		subTitle: '',
		title: undefined,
		contents: undefined,
		isClose: true,
		isElevation: false,
	},
	bottomButton: undefined,
	afterOpen: undefined,
	afterClose: undefined,
	height: 50,
	zIndex: 900,
	isKeepScroll: false,
	onDismiss: undefined,
};

/**
 * @description
 * 높이에 대한 우선순위 : isFullLayout > isFitContents > 사용자 지정 Height
 * @description
 * 높이단위 : 기본 px, isPercentH prop가 true일 경우 %로 동작
 * @description
 * LazyResize 처리 :
 * isLazyResize prop가 true 일경우 opts의 height관련된 모든 prop 속성이 무시됨.
 *  -> 최초 디바이스의 50%까지 open된 후 컨텐츠(children)가 갱신된 후  스크롤 행위를 통해 컨텐츠의 길이만큼 Drawer 높이가 자동 조정됨.
 * isLazyResize prop가 false 일경우 지정된 height와 디바이스의 height를 비교하여 디바이스 높이의 50%가 초과 할 경우 최초 Drawer는 50% 높이로 오픈됨
 *  -> 이후 스크롤 행위를 통해 컨텐츠의 길이만큼 Drawer 높이가 자동 조정됨.
 * 위 isLazyResize가 동작하지 않는 경우 : isFullLayout이 true일 경우, drawerBleeding이 0보다 클 경우
 */
const DUMP = {};

const calcScreen = {
	headerHeight: () => {
		// 헤더영역 navigator Height 구하기
		try {
			const _selector = 'div#solWrapDiv > div[class^=Header_header-wrap]';
			const headerObj = document.querySelector(_selector);

			if (headerObj) {
				return headerObj.offsetHeight;
			} else {
				return 0;
			}
		} catch (ex) {
			return 0;
		}
	},
	buttonHeight: (ref) => {
		// 버튼영역 Height 구하기
		try {
			if (ref.current) {
				return ref.current.offsetHeight;
			} else {
				return 0;
			}
		} catch (ex) {
			return 0;
		}
	},
	half: (ref) => {
		if (ref && ref.current) {
			try {
				const maxHeight = window.innerHeight;

				return maxHeight / 2;
			} catch (ex) {
				return 0;
			}
		} else {
			return 0;
		}
	},
	fitContentHeight: (ref) => {
		try {
			if (ref.current && ref.current.scrollHeight) {
				return ref.current.scrollHeight;
			} else {
				throw DUMP;
			}
		} catch (ex) {
			return 0;
		}
	},
};

const selectorDrawer = {
	root: (drawerKey) => {
		try {
			return document.getElementById(drawerKey);
		} catch (ex) {
			return null;
		}
	},
	header: (drawerKey) => {
		try {
			return selectorDrawer.root(drawerKey).querySelector('div[data-rsbs-header]');
		} catch (ex) {
			return null;
		}
	},
	backdrop: (drawerKey) => {
		try {
			return selectorDrawer.root(drawerKey).querySelector('div[data-rsbs-backdrop]');
		} catch (ex) {
			return null;
		}
	},
	modal: (drawerKey) => {
		try {
			return selectorDrawer.root(drawerKey).querySelector('div[data-rsbs-overlay]');
		} catch (ex) {
			return null;
		}
	},
	scroll: (drawerKey) => {
		try {
			return selectorDrawer.modal(drawerKey).querySelector('div[data-rsbs-scroll]');
		} catch (ex) {
			return null;
		}
	},
	content: (drawerKey) => {
		try {
			return selectorDrawer.scroll(drawerKey).querySelector('div[data-rsbs-content]');
		} catch (ex) {
			return null;
		}
	},
	hasContents: (ref) => {
		try {
			if (ref && ref.current) {
				const _contEl = ref.current;
				const _contElStyle = window.getComputedStyle(_contEl, null);

				const getCssValue = (property) => {
					let _value = '';

					try {
						if (!_.isEmpty(property)) {
							_value = _contElStyle.getPropertyValue(property);
						}
					} catch (ex) {
					}
					return _value;
				};

				const _paddingTop = Number(getCssValue('padding-top').replace(/[^0-9]/g, ''));
				const _paddingBottom = Number(getCssValue('padding-bottom').replace(/[^0-9]/g, ''));
				const _contHeight = _contEl.clientHeight - (_paddingTop + _paddingBottom);

				return _contHeight > 5;
			} else {
				return false;
			}
		} catch (ex) {
			return false;
		}
	},
};

const getRootPropertyValue = (drawerKey, property) => {
	if (!_.isEmpty(property)) {
		try {
			return Number(
				selectorDrawer
					.root(drawerKey)
					.style.getPropertyValue(property)
					.replace(/[^0-9]/g, '')
					.trim(),
			);
		} catch (ex) {
			return null;
		}
	} else {
		return null;
	}
};

const Drawer = ({
	opts,
	style = {},
	className = { wrapper: '', contents: '' },
	spacing = 0,
	isLazyResize = false,
	children = null,
}) => {
	debugger
	const [drawerOpts, setDrawerOpts] = useState(null);
	const [isVisible, handleDrawer] = useDrawer(opts.drawerKey);
	const { modalA11Y } = useA11Y(isVisible);
	const [isOpened, setOpened] = useState(false);

	const sheetRef = useRef();
	const contRef = useRef();
	const headerRef = useRef();
	const buttonRef = useRef();
	const isNeedBackBindPopRef = useRef(false);
	const AppRoot = useRef(document.getElementById('appWrapDiv'));

	const isBleeding = useMemo(() => {
		try {
			const bleedingHeight = drawerOpts?.drawerBleeding || 0;

			return bleedingHeight > 0;
		} catch (ex) {
			return false;
		}
	}, [drawerOpts?.drawerBleeding]);

	const isBtnClose = useMemo(() => {
		try {
			return !isBleeding && drawerOpts.header.isClose;
		} catch (ex) {
			return false;
		}
	}, [drawerOpts?.header, isBleeding]);

	const isElevationBtnClose = useMemo(() => {
		try {
			return isBleeding || (drawerOpts.header.isElevation && drawerOpts.header.isClose);
		} catch (ex) {
			return false;
		}
	}, [drawerOpts?.header, isBleeding]);

	const isHeader = useMemo(() => {
		try {
			return (
				_.isObject(opts.header) &&
				(!_.isEmpty(opts.header.title) ||
					!_.isEmpty(opts.header.subTitle) ||
					opts.header.isClose)
			);
		} catch (ex) {
			return false;
		}
	}, [opts?.header]);

	const isBlocking = useMemo(() => {
		return !isBleeding && !drawerOpts?.isPuller;
	}, [drawerOpts?.isPuller, isBleeding]);

	const isLazyScrollEnd = () => {
		try {
			if (sheetRef && sheetRef.current) {
				return !!sheetRef.current.isScrollEnd;
			} else {
				return false;
			}
		} catch (ex) {
			return false;
		}
	};

	const customBlockingHandler = useCallback(
		(evt) => {
			evt.stopPropagation();
			const path = evt.path;
			const fnSnapToHeight = (h) => {
				if (sheetRef.current) {
					let moveTo = h;
					const minHeight = sheetRef.current.minHeight || 0;

					if (minHeight > 0 && moveTo < minHeight) {
						moveTo = minHeight;
					}
					try {
						sheetRef.current.snapTo(moveTo, {
							source: `snap-to-${moveTo > minHeight ? 'up' : 'bottom'}`,
						});
					} catch (ex) {

					}
				}
			};

			if (!_.isEmpty(path)) {
				const hasReachPortal = path.some((v) => {
					return v.localName === 'reach-portal';
				});

				if (!hasReachPortal) {
					fnSnapToHeight(0);
				}
			} else if (isElevationBtnClose && isOpened) {
				fnSnapToHeight(0);
			} else if (isElevationBtnClose && !isOpened) {
				let calcHeight = 0;

				if (sheetRef.current) {
					calcHeight = sheetRef.current['calcHeight'];
				}
				fnSnapToHeight(calcHeight);
			}
		},
		[isElevationBtnClose, isOpened],
	);

	const onDismissHandler = useCallback(
		(evt) => {
			if (_.isFunction(drawerOpts.onDismiss)) {
				drawerOpts.onDismiss();
			} else {
				if (!isBleeding) {
					handleDrawer(false);
				}
			}
		},
		[drawerOpts, isBleeding, handleDrawer],
	);

	const onLazyResize = useCallback((evt) => {
		try {
			evt.stopPropagation();
		} catch (ex) {

		}
		if (sheetRef && sheetRef.current) {
			sheetRef.current.snapPoints = undefined;
			sheetRef.current.isScrollEnd = true;
			setDrawerOpts((prev) => {
				if (prev.isFitContents) {
					const calcMaxPos = sheetRef.current.calcMaxPos;

					if (calcMaxPos > 0) {
						sheetRef.current.snapTo(calcMaxPos);
					}
				}

				return {
					...prev,
					...{
						isFitContents: true,
						isFullLayout: false,
					},
				};
			});
		}
	}, []);

	const snapPointsCalc = useCallback(
		({ headerHeight, footerHeight, height, maxHeight }) => {
			let _snapPoints = [0];

			if (sheetRef && sheetRef.current) {
				sheetRef.current.sizeOpts = {
					headerHeight,
					footerHeight,
					height,
					maxHeight,
				};
				const _screenHalf = calcScreen.half(sheetRef);
				const _hasContents = selectorDrawer.hasContents(contRef);

				if (!_hasContents) {
					_snapPoints = [_screenHalf];
				} else {
					// 이미 계산된 높이값이 있다면 재활용
					if (!_.isArray(sheetRef.current.snapPoints) || height <= 0) {
						if (drawerOpts) {
							const _isScrollEnd = isLazyScrollEnd();
							// Page의 Header Navigator 영역 높이 구하기
							const headerNavHeight = calcScreen.headerHeight();

							// Drawer의 버튼 영역 높이 구하기
							// GridLayout으로 수정 후 scroll에서 버튼영역의 Height까지 구해지므로 계산식에서 제거
							// const buttonHeight = calcScreen.buttonHeight(buttonRef);

							// 노출 Drawer 높이 설정
							let bleedingHeight = Number(drawerOpts.drawerBleeding || 0);

							// Header Navigator를 제외한 페이지 높이 구하기
							const contentFit = maxHeight - headerNavHeight;

							// 높이 결과 변수 선언
							let calc = drawerOpts.height;

							// 높이를 화면높이의 비율로 설정
							if (drawerOpts.isPercentH) {
								calc = contentFit * (drawerOpts.height / 100);
							}

							// 전체 레이아웃의 높이값 계산
							if (drawerOpts.isFullLayout) {
								calc = contentFit;
								bleedingHeight = 0;
								// Drawer를 컨텐츠 높이에 맞게 계산
							} else if (isLazyResize || drawerOpts.isFitContents) {
								const scrollContent = selectorDrawer.scroll(drawerOpts.drawerKey);

								if (_.isElement(scrollContent)) {
									// const fitContentHeight = calcScreen.fitContentHeight(contRef);
									const fitContentHeight = scrollContent.scrollHeight + 1;

									calc = fitContentHeight + headerHeight + footerHeight;
									// calc = fitContentHeight + headerHeight + footerHeight + buttonHeight;
									calc = Math.min(calc, maxHeight);
								}
							}

							// 올릴 수 있는 최대 높이는 헤더-타이틀 영역까지로 제한한다.
							calc = Math.min(contentFit, calc);

							// 계산된 높이값을 ref에 저장
							if (sheetRef.current) {
								sheetRef.current['calcHeight'] = calc;
							}

							// 노출 Drawer의 높이가 계산된 높이보다 크다면 계산된 높이를 노출 Drawer 높이로 설정
							if (bleedingHeight > calc) {
								bleedingHeight = calc;
							}

							// Pull가 존재하는 Drawer의 경우 사용자가 픽셀단위로 컨트롤 할 수 있게 설정
							if (drawerOpts.isPuller) {
								const range = [];
								const to = calc === bleedingHeight ? calc : calc - bleedingHeight;

								// puller가 존재할경우 픽셀단위로 사용자가 Drawer Height를 조절할 수 있다.
								// 이경우 설정한 높이의 20% 와 100 중 큰수를 최소 조절 높이로 설정한다.
								const closeHeight =
									bleedingHeight > 0
										? bleedingHeight
										: parseInt(Math.max(150, (calc || 0) * 0.2), 10);

								if (calc > 0) {
									range.push(
										...Array(Math.trunc(to))
											.fill()
											.map((v, i) => i + bleedingHeight),
									);

									_.remove(range, (n) => {
										return n < 1;
									});
								}

								if (sheetRef && sheetRef.current) {
									sheetRef.current.minHeight = isBleeding
										? drawerOpts.drawerBleeding
										: closeHeight; // isFullLayout ? closeHeight : range[0];
								}
								_snapPoints = range;
							} else if (bleedingHeight > 0) {
								// 노출 Drawer의 경우 사용자가 지정한 노출 높이와 계산된 높이의 두가지만 설정
								_snapPoints = [bleedingHeight, calc];
							} else {
								// puller가 존재하지 않으며, 노출 Drawer가 아닐경우 계산된 높이의 이동만 가능. InVisible or 계산된 높이의 Drawer
								const setCalc = [calc];

								if (isLazyResize && !_isScrollEnd) {
									setCalc.push(_screenHalf);
								}
								_snapPoints = setCalc;
							}
							sheetRef.current.snapPoints = _snapPoints;
						}
					} else {
						_snapPoints = sheetRef.current.snapPoints;
					}
				}
			}

			_snapPoints.sort((a, b) => {
				return a - b;
			});

			return _snapPoints;
		},
		[drawerOpts, isBleeding, isLazyResize],
	);

	const defaultSnapPointCalc = useCallback(
		({ headerHeight, footerHeight, height, maxHeight }) => {
			const snapPoints = snapPointsCalc({ headerHeight, footerHeight, height, maxHeight });
			const maxPos = Math.max(snapPoints[snapPoints.length - 1], maxHeight);
			const screenHalf = calcScreen.half(sheetRef);

			if (_.isNaN(maxPos)) {
				return screenHalf;
			} else {
				if (sheetRef && sheetRef.current) {
					sheetRef.current.calcMaxPos = maxPos;
				}

				let calcMaxPos = 0;

				if (drawerOpts) {
					if (isBleeding) {
						if (drawerOpts.isFullLayout) {
							calcMaxPos = maxPos;
						} else {
							calcMaxPos = snapPoints[0];
						}
					} else {
						calcMaxPos = maxPos;

						if (isLazyResize) {
							calcMaxPos = Math.min(screenHalf, maxPos);
							calcMaxPos = calcMaxPos > 0 ? calcMaxPos : screenHalf;
						}
					}
				}

				if (_.isFunction(drawerOpts.onDismiss)) {
					const _backDrop = selectorDrawer.backdrop(drawerOpts.drawerKey);

					if (_.isElement(_backDrop)) {
						_backDrop.addEventListener('click', drawerOpts.onDismiss, false);
					}
				}

				return calcMaxPos;
			}
		},
		[drawerOpts, isBleeding, isLazyResize, snapPointsCalc],
	);

	const focusDrawer = useCallback(() => {
		if (drawerOpts && drawerOpts.header) {
			let _target;
			const headerOpts = drawerOpts.header;

			if (
				_.isObject(headerOpts) &&
				(!_.isEmpty(headerOpts.title) ||
					!_.isEmpty(headerOpts.contents) ||
					!_.isEmpty(headerOpts.subTitle))
			) {
				_target = headerRef.current;
			} else {
				_target = contRef.current;
			}

			modalA11Y.initFirstFocus(_target);
		}
	}, [drawerOpts, modalA11Y]);

	const togglePosition = useCallback(
		(position) => {
			if (drawerOpts && drawerOpts.isPuller && drawerOpts.bottomButton) {
				if (buttonRef && buttonRef.current) {
					// buttonRef.current.style.position = position;
					let _y = 0;

					if (position !== 'fixed') {
						_y = calcScreen.buttonHeight(buttonRef) + 30;
					}

					buttonRef.current.style['transform'] = `translateY(${_y}px)`;
				}
			}
		},
		[drawerOpts],
	);

	const togglePointerEvents = useCallback(
		(set) => {
			try {
				if (_.isElement(AppRoot.current) && isBlocking) {
					AppRoot.current.style.pointerEvents = `${set ? 'none' : 'unset'}`;
				}
			} catch (ex) {
				if (_.isElement(AppRoot.current)) {
					AppRoot.current.style.pointerEvents = `unset`;
				}
			}
		},
		[isBlocking],
	);

	const onSpringStart = useCallback(
		(evt) => {
			setTimeout(() => {
				if (drawerOpts && !isBleeding) {
					modalA11Y.otherAriaHidden();
				}
			}, 0);
			if (evt.type === 'OPEN') {
				togglePointerEvents(true);
				setTimeout(focusDrawer, 0);

				window.removeEventListener('click', customBlockingHandler, false);
				if (isBleeding) {
					window.addEventListener('click', customBlockingHandler, false);
				}

				if (!isBleeding) {


					isNeedBackBindPopRef.current = true;
				}
			} else if (evt.type === 'CLOSE') {
				setTimeout(togglePointerEvents, 200);
				if (!isBleeding) {
					isNeedBackBindPopRef.current = false;
				}
			} else if (evt.type === 'SNAP' && ['dragging', 'snap-to-bottom'].includes(evt.source)) {
				// empty
				togglePosition('fixed');
			}

			return () => {
				window.removeEventListener('click', customBlockingHandler, false);
			};
		},
		[
			customBlockingHandler,
			drawerOpts,
			focusDrawer,
			handleDrawer,
			isBleeding,
			modalA11Y,
			togglePointerEvents,
			togglePosition,
		],
	);

	const onSpringEnd = useCallback(
		(evt) => {
			const fnOpenEvt = () => {
				setOpened(true);
				drawerOpts.afterOpen && drawerOpts.afterOpen();

				if (sheetRef && sheetRef.current && _.isNil(sheetRef.current.rsbsOverlay)) {
					const _rsbsOverlayH =
						getRootPropertyValue(drawerOpts.drawerKey, '--rsbs-overlay-h') || 0;

					sheetRef.current.rsbsOverlay = _rsbsOverlayH;

					try {
						const _root = selectorDrawer.root(drawerOpts.drawerKey);

						_root.style.setProperty('--rsbs-overlay-h-calc', `${_rsbsOverlayH}px`);
					} catch (ex) {

					}
				}
			};
			const fnCloseEvt = () => {
				setOpened(false);
				drawerOpts.afterClose && drawerOpts.afterClose();

				if (!isBleeding) {
					onDismissHandler();
				}
			};

			if (evt.type === 'CLOSE') {
				fnCloseEvt();
			} else if (evt.type === 'OPEN') {
				if (!isBleeding || drawerOpts.isFullLayout) {
					fnOpenEvt();
				}
			} else if (evt.type === 'SNAP') {
				switch (evt.source) {
					case 'dragging':
						if (isBleeding) {
							if (sheetRef.current) {
								if (sheetRef.current.height === drawerOpts.drawerBleeding) {
									fnCloseEvt();
								} else {
									fnOpenEvt();
								}
							}
						} else {
							fnOpenEvt();
						}
						break;
					case 'snap-to-bottom':
						fnCloseEvt();
						break;
					case 'snap-to-up':
						fnOpenEvt();
						break;
					default:
	
				}
			}
		},
		[drawerOpts, isBleeding, onDismissHandler],
	);

	/**
	 * 터치이벤트가 헤더 영역에서만 동작하도록 체크하는 함수
	 */
	const isEventPosible = useCallback(
		(evt) => {
			let hasHeader = false;

			if (evt) {
				if (!_.isFunction(drawerOpts.onDismiss)) {
					try {
						if (drawerOpts.isPuller) {
							const headerRoot = selectorDrawer.header(drawerOpts.drawerKey);

							if (_.isElement(headerRoot)) {
								const evtPath = evt.nativeEvent.path || [];
								const _target = evt.target;

								if (_.isElement(_target)) {
									evtPath.push(_target);
								}

								if (_.isArray(evtPath) && evtPath.length > 0) {
									hasHeader = evtPath.some((el) => {
										return el === headerRoot;
									});
								}
							}
						}
					} catch (ex) {

					}
				}
			}
			return hasHeader;
		},
		[drawerOpts?.drawerKey, drawerOpts?.isPuller, drawerOpts?.onDismiss],
	);

	/**
	 * 버튼영역이 fixed position으로인하여 특정 구간에서 relative로 변경하여 버튼을 레이어와 함께 내려주기 위함
	 * 기획상 bottom버튼은 항상 노출형태로 보여 줘야 함으로 터치 이벤트가 종료되면 fixed로 변경하여 버튼을 노출 시켜줌.
	 * */

	const onTouchMoveCapture = useCallback(
		(evt) => {
			const _root = selectorDrawer.root(drawerOpts.drawerKey);
			const _scrollContent = selectorDrawer.scroll(drawerOpts.drawerKey);

			if (isEventPosible(evt) && _.isElement(_root) && _.isElement(_scrollContent)) {
				if (evt.cancelable) {
					evt.stopPropagation();
				}
				const _status = _root.getAttribute('data-rsbs-state');

				if (_status === 'dragging') {
					const _content = contRef.current;
					const _button = buttonRef.current;

					const _areaHeight = _scrollContent.clientHeight;

					if (_.isElement(_content) && _.isElement(_button)) {
						if (_areaHeight - _content.clientHeight < _button.clientHeight) {
							togglePosition('relative');
						} else {
							togglePosition('fixed');
						}
					}
				}
			}
		},
		[drawerOpts?.drawerKey, togglePosition, isEventPosible],
	);

	/**
	 * 터치 이벤트가 종료되면 실행되는 함수.
	 * 기본적으로 버튼영역의 position을 fixed로 변경해줌.
	 * 현재 Drawer 노출 Height가 계산된 minHeight보다 낮으면 bleeding Draweer의 경우 최소Height로 올려주고 그외는 Drawer를 닫음.
	 */
	const onTouchEndCapture = useCallback(
		(evt) => {
			if (sheetRef && sheetRef.current && isEventPosible(evt)) {
				if (evt.cancelable) {
					evt.stopPropagation();
				}
				const sheetCurrent = sheetRef.current;
				const minHeight = sheetCurrent.minHeight || 0;
				const _target = selectorDrawer.modal(drawerOpts.drawerKey);

				if (_target) {
					let translateY = 0;

					try {
						const _y = getRootPropertyValue(
							drawerOpts.drawerKey,
							'--rsbs-overlay-translate-y',
						);

						if (!_.isNil(_y)) {
							translateY = Math.trunc(_y);
						}
					} catch (ex) {
						translateY = 0;
					}
					const currentHeight = (_target.offsetHeight || 0) - translateY;

					if (minHeight > 0 && currentHeight < minHeight) {
						let _to = 0;

						if (isBleeding) {
							_to = minHeight;
						}

						sheetRef.current.snapTo(_to, {
							source: `snap-to-bottom`,
						});
					}
				}

				togglePosition('fixed');
			}
		},
		[drawerOpts?.drawerKey, isBleeding, isEventPosible, togglePosition],
	);


	useLayoutEffect(() => {
		setDrawerOpts((prev) => {
			const _isAlready =
				!_.isObject(prev) && _.isElement(document.getElementById(opts?.drawerKey));

			if (!_isAlready && _.isString(opts.drawerKey)) {
				const init = _.cloneDeep(initOpts);
				const options = _.merge({}, init, opts);

				return options;
			} else {
				return prev;
			}
		});
	}, [opts]);

	useEffect(() => {
		if (_.isObject(drawerOpts)) {
			if (!drawerOpts.isKeepScroll) {
				const scroll = selectorDrawer.scroll(drawerOpts.drawerKey);

				if (_.isElement(scroll)) {
					scroll.scrollTo({ top: 0 });
				}
			}

			if (sheetRef && sheetRef.current) {
				sheetRef.current.drawerOpts = drawerOpts;
			}
		}
	}, [children, drawerOpts]);

	useEffect(() => {
		if (!('path' in Event.prototype)) {
			Object.defineProperty(Event.prototype, 'path', {
				get() {
					const path = [];
					let currentElem = this.target;

					while (currentElem) {
						path.push(currentElem);
						currentElem = currentElem.parentElement;
					}
					if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
						path.push(document);
					if (path.indexOf(window) === -1) path.push(window);
					return path;
				},
			});
		}

		return () => {

			const appWrap = document.getElementById('appWrapDiv');

			if (_.isElement(appWrap)) {
				appWrap.style.pointerEvents = `unset`;
			}
		};
	}, []);

	return (
		<>
			{_.isObject(drawerOpts) &&
				_.isString(drawerOpts.drawerKey) &&
				((_.isEmpty(children) && isLazyResize) || !_.isEmpty(children)) && (
					<BottomSheet
						scrollLocking={false}
						onTouchMoveCapture={_.throttle(onTouchMoveCapture, 100)}
						onTouchEndCapture={_.throttle(onTouchEndCapture, 100)}
						onScrollCapture={
							isLazyScrollEnd() || !isLazyResize
								? undefined
								: _.debounce(onLazyResize, 100)
						}
						id={drawerOpts.drawerKey}
						style={{
							...style,
							...{
								'--custom-z-index': drawerOpts.zIndex,
								'--rsbs-overlay-rounded': '12px',
								'--rsbs-content-opacity': 1,
							},
						}}
						className={`${cx('', {
							hidePuller: !drawerOpts.isPuller,
						})}`}
						open={isVisible}
						ref={sheetRef}
						initialFocusRef={false}
						blocking={isBlocking}
						onDismiss={
							!_.isFunction(drawerOpts.onDismiss)
								? _.throttle(onDismissHandler, 500)
								: undefined
						}
						snapPoints={snapPointsCalc}
						defaultSnap={defaultSnapPointCalc}
						onSpringStart={onSpringStart}
						onSpringEnd={onSpringEnd}
						header={
							<div
								ref={headerRef}
								className={`${cx('', {
									'header-with-puller': isHeader && drawerOpts.isPuller,
									'null-header-with-puller': !isHeader && drawerOpts.isPuller,
									'null-header': !isHeader && !drawerOpts.isPuller,
								})}`}
							>
								{isHeader && (
									<DrawerHeader
										drawerKey={drawerOpts.drawerKey}
										subTitle={drawerOpts.header.subTitle}
										isClose={isBtnClose}
										isElevation={isElevationBtnClose}
										isOpened={isOpened}
										fnCustomClose={
											isBleeding ? customBlockingHandler : undefined
										}
									>
										{!_.isEmpty(drawerOpts.header.title)
											? drawerOpts.header.title
											: ''}
									</DrawerHeader>
								)}
								{!_.isEmpty(drawerOpts.header.contents)
									? drawerOpts.header.contents
									: ''}
							</div>
						}
					>
						<DrawerLayout
							ref={contRef}
							spacing={spacing}
							className={className.contents}
							style={{ transform: `translateY(0px)` }}
						>
							{children}
						</DrawerLayout>
					</BottomSheet>
				)}
		</>
	);
};

Drawer.propTypes = {
	opts: shape({
		drawerKey: string.isRequired,
		drawerBleeding: number,
		isFullLayout: bool,
		isFitContents: bool,
		isPuller: bool,
		isPercentH: bool,
		header: shape({
			subTitle: oneOfType([string, element]),
			title: oneOfType([string, element]),
			contents: oneOfType([string, element]),
			isClose: bool,
			isElevation: bool,
		}),
		afterOpen: func,
		afterClose: func,
		height: number,
		zIndex: number,
		isKeepScroll: bool,
		onDismiss: func,
	}),
	style: object,
	className: shape({
		wrapper: string,
		contents: string,
	}),
	isLazyResize: bool,
	spacing: number,
	children: any,
};

export default Drawer;
