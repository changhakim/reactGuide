import _ from 'lodash';
/**
 * 랜덤값 생성
 *
 * @param lengthParam
 *
 * @returns
 *
 * 확인 
 */
const randomId = (lengthParam: number = 10) => {
	
	const length = lengthParam > 10 ? 10 : lengthParam;

	return Math.random()
		.toString(36)
		.substring(2, length + 2);
};

/**
 * 문자열 계좌번호를 중간에 -(대시)를 넣은 형태로 변환
 *
 * @param value
 *
 * @returns string
 *
 * 확인
 */
const formatAccountNumber = (value: string | number): string => {
	if (!value) {
		return '';
	}

	let target: string = '';

	if (typeof value === 'number') {
		target = String(value);
	} else {
		target = value;
	}

	if (target.length === 12) {
		return `${target.substring(0, 3)}-${target.substring(3, 6)}-${target.substring(6, 12)}`;
	} else if (target.length === 11) {
		return `${target.substring(0, 3)}-${target.substring(3, 5)}-${target.substring(5, 11)}`;
	} else {
		return '';
	}
};
/**
 * 계좌번호 하이픈 제거
 *
 * @param strDate 원본 String
 *
 * @returns 변환된 문자열 리턴
 *
 * 확인
 */
const sbTransAcctNo = (strAcctNo: string) => {
	return sbReplaceAll(strAcctNo, '-', '');
};

/**
 * 전화번호 포맷 리턴한다.
 *
 * @param 포맷이 적용되지 않은 전화번호(10자리 이상 16자리 이하)
 *
 * @returns 포맷이 적용된 전화번호
 *
 * 확인
 */
const sbFormatTelNo = (pStr: string) => {
	const str = sbTransAcctNo(pStr);

	if (str === '') return '';

	// 전화번호는 10자리 이상 16자리 이하
	if (str.length < 9 || str.length > 16) return pStr;

	const telNoHead02 = '02'; // 지역번호 2자리
	const telNoHead03 =
		'031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,010,011,016,017,018,019'; // 지역번호 3자리
	const telNoHead04 = '0130,0303,0502,0504,0505,0506,0507'; // 지역번호 4자리

	let telNo01 = '';
	let telNo02 = '';
	let telNo03 = '';

	// 1. 뒷자리 4자리는 고정
	telNo03 = str.substring(str.length - 4, str.length);

	// 2. 첫자리 4자리는 telNoHead 값중 하나
	if (telNoHead02.indexOf(str.substring(0, 2)) > -1) {
		telNo01 = str.substring(0, 2);
	} else if (telNoHead03.indexOf(str.substring(0, 3)) > -1) {
		telNo01 = str.substring(0, 3);
	} else if (telNoHead04.indexOf(str.substring(0, 4)) > -1) {
		telNo01 = str.substring(0, 4);
	}

	// 지역번호 검색안됨 -> 받은 데이터 리턴
	if (telNo01 === '') return pStr;

	// 3. 중간자리는 나머지 값으로 채운다.
	telNo02 = str.substring(telNo01.length, str.length - 4);

	return `${telNo01}-${telNo02}-${telNo03}`;
};

/**
 * 6자리 숫자의 쉼표단위를 k 로 바꾸고 뒤에 세자리를 없앤다
 *
 * @param value
 * @param isOneKShorten
 *
 * @returns string
 *
 * 확인
 */
const decimalSeparator = (value: string | number, isOneKShorten: boolean = false) => {
	if (!value) {
		return '0';
	}
	let target: string = '';

	if (typeof value === 'string') {
		target = value;
	} else if (typeof value === 'number') {
		target = String(value);
	}

	if (target.length > 6 && isOneKShorten) {
		target = target.slice(0, target.length - 3);
		target += 'k';
	}

	return target.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 문자열 s의 바이트 수 리턴.
 *
 * @param s
 *
 * @returns
 *
 * 확인
 */
const sbGetByteLength = (s: string) => {

	let len: number = 0;

	for (let i = 0; i < s.length; i++) {
		
		const _ch: number = s.charCodeAt(i);

		if (_ch >= 0x0080 && _ch <= 0xffff) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
};

/**
 * CharCode 를 기준으로 바이트를 계산하여 문자열 리턴
 *
 * @param s
 * @param l
 *
 * @returns
 *
 * 확인
 */
const sbCutByteUesCharCode = (s: string, l: number) => {
	let cutI = 0;
	let len = 0;

	for (let i = 0; i < s.length; i++) {
		const _ch = s.charCodeAt(i);

		if (_ch >= 0x0080 && _ch <= 0xffff) {
			len += 2;
		} else {
			len++;
		}

		if (len > l) {
			cutI = i;
			break;
		}
	}

	return s.substring(0, cutI);
};

/**
 * 계좌번호마스킹: 4번째~7번째
 * stringUtil
 *
 * @param str
 *
 * @returns string
 *
 * 확인
 */
const sbMaskingAccountNo = (strParam: string) => {
	let str = strParam;

	if (!str) return str;

	if (str.indexOf('-') > -1) {
		if (str.length === 14) {
			return `${str.slice(0, 3)}-●●●-●${str.slice(9, 14)}`;
		} else if (str.length === 13) {
			return `${str.slice(0, 3)}-●●-●●${str.slice(9, 13)}`;
		}
	} else {
		if (str.length < 7) return str;
		str = `${str.substring(0, 3)}●●●●${str.substring(7, str.length)}`;
		return str;
	}

	return str;
};

/**
 * 숫자값만 얻어온다. (숫자값 이외는 모두 필터링)
 *
 * @param {string | number} strTemp 원본문자열
 * @param {boolean} procZero replace후에 남은 문자열이 '0'일 때  true(default): 공백리턴, false: '0' 리턴
 *
 * @return {string} 필터링된 문자열
 *
 * 확인
 */
const sbGetOnlyNumber = (strTemp: string | number = '', procZero: boolean = true): string => {
	const filter = /[^0-9]/g;
	let number = strTemp.toString().replace(filter, '');

	if (procZero === true && number === '0') {
		number = '';
	}

	return number;
};

/**
 * 전화번호(휴대폰, 일반전화) : 뒤 4자리 마스킹
 *
 * @param str
 *
 * @returns
 *
 * 확인
 */
const sbMaskingPhone = (str: string) => {
	if (!str || str.length < 5) return str;
	//	return str.substring(0, str.length - 4) + "****";
	return `${str.substring(0, str.length - 4)}●●●●`;
};

/**
 * 직원번호 마스킹 리턴한다.
 * 마스킹 규칙 : 앞 5자리 마스킹처리(김근영수석님)
 *
 * @param {string | numer} strParam 직원번호
 *
 * @returns 마스킹이 적용된 직원번호
 *
 * 확인
 */
const sbMaskingStaffNum = (strParam: string | number = '') => {
	let maskingStr = '';
	let str: string = strParam.toString();

	// if (typeof str === 'number') {
	// 	str += '';
	// }
	if (str === '') return str;

	// 공백 제거
	str = str.replace(/ /g, '');
	for (let i = 0; i < str.length; i++) {
		if (i < 5) {
			maskingStr += '●';
		} else {
			maskingStr += str.charAt(i);
		}
	}

	return maskingStr;
};

/**
 * str에 특수문자가 포함되어 있으면 true반환 참고 : 천지인 키보드에서 아래아등 입력안되는 오류로 인해 추가함 :
 * |\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55
 *
 * @param str
 *
 * @returns
 *
 * 확인
 */
const sbIsSpecialChar = (str: string) => {
	return !/^[ㄱ-ㅎㅏ-ㅣ가-힝a-zA-Z0-9\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55]*$/.test(str);
};

/**
 * 화면에 html 태그가 그대로 보이는 경우 사용.
 *
 * @param htmlStr
 *
 * @returns
 *
 * 확인
 */
const sbHtmlUnescape = (htmlStr: string) => {
	let ret = '';

	ret = htmlStr
		.replace(/&lt;/g, '<')
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, ';');
	return ret;
};

/**
 * 문자열중 특정한문자를 입력받은 문자로 치환 / [ 손철주 2017-12-23 수정 ] 지우지마시요.
 *
 * @param orgStr
 * @param srcStr
 * @param repStr
 *
 * @returns
 *
 * 확인
 */
const sbFncReplaceAll = (orgStr: string, srcStr: string, repStr: string) => {
	return orgStr.split(srcStr).join(repStr);
};

/**
 * 문자열 s의 바이트수가 len 보다 크면 마지막 문자열(깨진문자)을 잘라서 리턴.
 *
 * @param s
 * @param len
 *
 * @returns
 *
 * 확인
 */
const sbSafeStr = (s: string, len: number) => {
	if (s && len && sbGetByteLength(s) > len) return s.substring(0, s.length - 2);
	else return s;
};

/**
 * 영문성명 마스킹 리턴한다.
 *
 * @param 영문성명
 *
 * @returns 마스킹이 적용된 영문성명
 *
 * 확인
 */
const sbMaskingEngName = (str: string) => {
	if (str === '') return '';

	let cnt = 0;
	const nameArr = str.split(' ');

	// 영문성명 최대 20Byte
	if (sbGetByteLength(str) <= 20) {
		for (let i = 0; i < str.length; i++) {
			if (str.charAt(i) === ' ') cnt++;
		}

		if (cnt === 0) {
			// 공백 없는 경우 : 뒷4자리 마스킹
			return `${str.substring(0, str.length - 4)}●●●●`;
		} else if (cnt === 1) {
			// 공백 1개 : 공백이후 마스킹
			let masking = '';

			for (let i = 0; i < nameArr[1].length; i++) {
				masking += '●';
			}
			return `${nameArr[0]} ${masking}`;
		} else {
			// 공백 2개 이상 : 맨 앞,뒤 제외한 가운데 마스킹
			let masking = '';
			const maskingLength = str.length - nameArr[0].length - nameArr[cnt].length;

			for (let i = nameArr[0].length; i < nameArr[0].length + maskingLength; i++) {
				if (str.charAt(i) === ' ') {
					masking += ' ';
				} else {
					masking += '●';
				}
			}
			return `${nameArr[0]} ${masking} ${nameArr[cnt]}`;
		}
	}

	return str;
};

/**
 * 서명용 날짜, 시간 포멧
 *
 * @param str 6자리 스트링
 * @param type "D" xx.xx.xx, "T" xx:xx:xx
 * @param sep 나누고 싶은 문자
 *
 * @returns string
 *
 * 확인
 */
const sbSignDTFormat = (str: string, type: string, sep: string) => {
	let dtRet = '';
	let dtSep = '';

	if (sep !== undefined && sep != null) {
		dtSep = sep;
	} else if (type === 'D') {
		dtSep = '.';
	} else {
		dtSep = ':';
	}

	if (type === 'D') {
		dtRet = str.substr(0, 4) + dtSep + str.substr(4, 2) + dtSep + str.substr(6, 2);
	} else {
		dtRet = str.substr(0, 2) + dtSep + str.substr(2, 2) + dtSep + str.substr(4, 2);
	}
	return dtRet;
};


/**
 *  해당 한글만 존재하는지 검사
 */
const sbHasOnlyKorean = (str: string) => {
	
	if ( str == null ) return false ;
   
	for(var i=0; i < str.length; i++){
 
	  var c=str.charCodeAt(i);
 
	  //( 0xAC00 <= c && c <= 0xD7A3 ) 초중종성이 모인 한글자 
	  //( 0x3131 <= c && c <= 0x318E ) 자음 모음
 
	  if( !( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ) ) {      
		 return false ; 
	  }
	}  
	return true ;
};

/**
 * query param이 포함 된 url과 찾을 key를 넣으면 value를 return
 *
 * @param href  query param이 포함 된 url
 * @param key   찾을 key
 * @returns 	찾을 key의 value
 */

const getQueryParam = (href: string, key: string) => {
	const i = href.indexOf(`${key}=`);

	const start = href.slice(i, href.length);

	const j = start.indexOf('&');

	let value = start;

	if (j > -1) {
		value = start.slice(0, j);
	}

	const withoutKey = value.slice(key.length + 1, value.length);

	return withoutKey;
};

/**
 *
 * @returns
 */
const uuidv4 = function () {
	return `10000000${-1e3}${-4e3}${-8e3}${-1e11}`.replace(/[018]/g, (c: any) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
	);
};

const parseJSON = (value: string) => {
	try {
		return JSON.parse(value);
	} catch (e) {
		return null;
	}
};

// 계좌번호 하이픈 제거
const removeAcctFor = (strMoney: string) => {
	let money;

	const str = sbGetStrValue(strMoney);

	if (str === '') {
		money = '0';
	} else {
		money = sbReplaceAll(str, '-', '');
	}

	return money;
};


/**
 * 금액 콤마 제거
 *
 * @param strMoney 원본 String
 *
 * @returns 변환된 문자열 리턴
 *
 * 확인
 */
const sbTransMoney = (strMoney: string) => {
	let money;

	const str = sbGetStrValue(strMoney);

	if (str === '') {
		money = '0';
	} else {
		money = sbReplaceAll(str, ',', '');
	}

	return money;
};

/**
 * Null 값 제거(String)
 *
 * @param strTemp
 *
 * @returns String
 *
 * 확인
 */
const sbGetStrValue = (strTemp: string, defaultText?: string) => {
	if (!strTemp) {
		if (typeof defaultText !== 'undefined') {
			return defaultText;
		} else {
			return '';
		}
	}

	return _.trim(strTemp);
};

/**
 * 문자 Replace All
 *
 * @param strTemp 원본 String
 * @param strOld 교체대상 String
 * @param strNew 교체이후 String
 *
 * @returns 교체된 문자열 리턴
 */
const sbReplaceAll= (strTemp: string, strOld: string, strNew?: string) => {
	
	return sbGetStrValue(strTemp).replace(new RegExp(`${strOld}`, 'g'), strNew || '');
};

/**
 * Null 값 제거(Float)
 *
 * @param floatTemp
 *
 * @returns Float (null 인경우 0 리턴)
 *
 * 확인
 */
const sbGetFloatValue = (floatTemp: any) => {
	if (floatTemp === null) {
		return 0;
	}
	let _floatTemp = floatTemp;

	if (_.trim(floatTemp) === '') return 0;

	_floatTemp = sbTransMoney(_floatTemp);

	return parseFloat(_floatTemp);
};

/**
 * null 체크함수
 *
 * @param value 체크할 파라미터(숫자, 문자열, object 등) 단, 0은 not null 처리
 *
 * @return boolean
 *
 * 확인
 */
const sbIsNull = (value: any) => {
	if (value === '') {
		return true;
	}

	if (_.isNil(value)) {
		return true;
	}

	// 함수는 false - as-is 동일하게 변경
	if (_.isFunction(value)) {
		return false;
	}

	if (_.isObject(value)) {
		// {}, [] ==> true
		return _.isEmpty(value);
	}

	if (value === undefined) {
		return true;
	}

	return false;
};

/**
 * 금액 콤마 삽입 (3자리마다 콤마를 삽입한다.)
 *
 * @param strTemp 원본 String
 * @param[option] procZero 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임
 *
 * @returns 변환된 문자열 리턴
 *
 * 확인
 */
const sbGetFormatAmt = (strTemp: string, procZero: string, sIptId: any, sUnit: any) => {
	let _strTemp = strTemp;
	let _procZero = procZero;

	if (strTemp === '') return strTemp;
	if (procZero === null) _procZero = 'Y'; // default 값

	_strTemp += '';
	_strTemp = sbTransMoney(_strTemp);

	const arrTemp = _strTemp.split('.');
	const str = arrTemp[0].replace(/[^0-9]/g, '');
	let i;
	let result = '';
	let cnt = 0;

	// 소숫점 앞자리 처리
	for (i = str.length - 1; i >= 0; i--, cnt++) {
		if (cnt > 0 && cnt % 3 === 0) result = `,${result}`;

		result = str.substring(i, i + 1) + result;
	}

	// 소숫점 뒷자리 처리
	if (arrTemp.length > 1) {
		result += `.${arrTemp[1].replace(/[^0-9]/g, '')}`;
	}

	if (result !== '0') {
		/* 금액 앞에 숫자 0이 먼저 시작되는것을 삭제함(단, 소수점 처리는 제외) */
		if (result.substring(0, 1) === '0' && result.indexOf('.') === -1) {
			result = result.replace(/[^1-9]+/, '');
			if (_procZero === 'N' && result === '') result = '0';
		}
	}

	if (_procZero === 'Y') {
		if (result === '0') {
			result = '';
		}
	}

	// 마이너스 처리 (최초에 들어온값이 마이너스라면 부호 붙여준다.
	if (sbGetFloatValue(_strTemp) < 0) result = `-${result}`;

	if (sbIsNull(sIptId)) {
		return result;
	} else {
		const nFocusLen = result.length;

		if (nFocusLen > 0) {
			if (sbIsNull(sUnit)) {
				// $(`#${sIptId}`).val(`${result}원`);
				// const thisObj = $(`#${sIptId}`);
				// thisObj.focus();
				// thisObj.selRange(nFocusLen, nFocusLen);
			} else {
				// $(`#${sIptId}`).val(result + sUnit);
				// const thisObj = $(`#${sIptId}`);
				// thisObj.focus();
				// thisObj.selRange(nFocusLen, nFocusLen);
			}
		} else {
			// $(`#${sIptId}`).val('');
		}
	}
	return result;
};



const stringUtil00 = {
	randomId,
	formatAccountNumber,
	decimalSeparator,
	sbMaskingAccountNo,
	sbGetByteLength,
	sbCutByteUesCharCode,
	sbGetOnlyNumber,
	sbMaskingPhone,
	sbMaskingStaffNum,
	sbIsSpecialChar,
	sbHtmlUnescape,
	sbFncReplaceAll,
	sbSafeStr,
	sbMaskingEngName,
	sbSignDTFormat,
	sbHasOnlyKorean,
	getQueryParam,
	uuidv4,
	parseJSON,
	sbGetFormatAmt,
	sbTransMoney,
	removeAcctFor,
	sbReplaceAll,
	sbFormatTelNo
};

export default stringUtil00;
