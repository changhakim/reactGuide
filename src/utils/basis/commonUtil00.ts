import _ from 'lodash';
import {stringUtil} from "@utils"
/**
 * Object 가 가지고 있는 모든 하위 값value 들을 변경할 수 없게 만든다
 *
 * @param object
 *
 * @returns object
 *
 * 확인
 */
const deepFreeze = (object: any) => {
	// Retrieve the property names defined on object
	const propNames: string[] = Object.getOwnPropertyNames(object);

	// Freeze properties before freezing self

	for (const name of propNames) {
		const value: any = object[name];

		if (value && typeof value === 'object') {
			deepFreeze(value);
		}
	}

	return Object.freeze(object);
};

/**
 * 문자열에서 특정문자를 변환해서 리턴
 *
 * @param text
 *
 * @returns string
 *
 * 확인
 */
const escape = (text: string) => {
	let res = '';
	let i;

	for (i = 0; i < text.length; i++) {
		const c = text.charCodeAt(i);

		if (c < 256) res += encodeURIComponent(text[i]);
		else res += `%u${c.toString(16).toUpperCase()}`;
	}
	return res;
};

/**
 * 계좌번호마스킹: 4번째~7번째
 *
 * @param str 게좌번호
 *
 * 확인
 */
const sbMaskingAccountNo = (str: string | number, pattern: string = '●'): string => {
	let string: string = String(str);
	const p: string = pattern;

	if (!string) return string;

	if (string.indexOf('-') > -1) {
		if (string.length === 14) {
			return `${string.substring(0, 3)}-${p}${p}${p}-${p}${string.substring(9, 14)}`;
		} else if (string.length === 13) {
			return `${string.substring(0, 3)}-${p}${p}-${p}${p}${string.substring(9, 13)}`;
		}
	} else {
		if (string.length < 7) return string;
		string = `${string.substring(0, 3)}${p}${p}${p}${p}${string.substring(7, string.length)}`;
		return string;
	}

	return string;
};

/**
 * 전문수신 데이타가 vector형인 경우. 결과가 단건, 다건 이던지 항상 배열로 값 얻기.
 *
 * @param data 전문의 vector.data
 *
 * @returns Array
 *
 * 확인
 */
const sbGetJsonArray = (data: object) => {
	let list = [];

	if (Array.isArray(data)) {
		list = data;
	} else {
		list[0] = data;
	}

	return list;
};

/**
 * 전문수신 데이타에서 해당 key 데이타를 배열로 리턴.
 *
 * @param obj 전문수신 JSON 객체
 * @param key
 *
 * @returns Array
 *
 * 미확인
 */
const sbFindJsonArray = (obj: object, key: string) => {
	let list: Array<string | object> = [];

	for (const i in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, i)) {
			continue;
		}
		if (i === key) {
			list.push(obj[i as keyof object]);
		} else if (typeof obj[i as keyof object] === 'object') {
			list = list.concat(sbFindJsonArray(obj[i as keyof object], key));
		}
	}
	return list;
};

/**
 * 카드번호마스킹: 5번째~10번째 + 마지막 자리
 */
const sbMaskingCardNo = (string: string | number, pattern: string = '●'): string => {
	const p: string = pattern;
	const str: string = String(string);

	if (!str) return str;

	if (str.length === 16) {
		return `${str.substring(0, 4)}-${str.substring(4, 8)}-${p}${p}${p}${p}-${str.substring(
			12,
			16,
		)}`;
	}

	return str;
};

/**
 * 현재 WebView 를 반환
 *
 * @returns object
 *
 * 미확인
 */
const getCurView = () => {
	// return shComm.allIFrameFindByTypeToId(historyId);
};

/**
 * 동기 문법으로 코드 실행에 delay를 걸기 위한 함수 (`setTimeout` 대신 사용가능)
 *
 * @param {number} delayTime 딜레이 시킬 시간 (ms)
 * @return {Promise<any>} Promise 객체 (delayTime 시간 후 resolve)
 */
const delay = async (delayTime: number): Promise<any> =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, delayTime);
	});
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
 * 배열로 만들어주는 함수 - 배열이 들어오면 그냥 배열을 리턴, 객체가 들어오면 그 객체가 들어있는 배열로 만들어 리턴
 *
 * @param arr - 배열 또는 객체
 *
 * @returns array
 *
 * 확인
 */
const makeArray = (arr: any) => {
	if (_.isArray(arr)) {
		return arr;
	} else {
		return [arr];
	}
};
/**
 * 국문성명 마스킹 리턴한다.
 *
 * @param str 국문성명
 *
 * @returns 마스킹이 적용된 국문성명
 *
 * 확인
 */
const sbMaskingKorName = (str: string, pattern: string = '●'): string => {
	const p: string = pattern;

	if (str === '') return '';
	if (typeof str !== 'string') {
		
		return str;
	}

	// 공백 제거
	// str = str.replaceAll(' ', '');

	// 국문성명 최대 20Byte
	if (stringUtil.sbGetByteLength(str) <= 20) {
		if (str.length === 2) {
			return `${str.substring(0, 1)}${p}`;
		} else if (str.length >= 3) {
			let maskingStr = '';

			for (let i = 0; i < str.length - 2; i++) {
				maskingStr += p;
			}
			return str.substring(0, 1) + maskingStr + str.substring(str.length - 1, str.length);
		}
	}

	return str;
};
const commonUtil00 = {
	deepFreeze,
	escape,
	sbGetJsonArray,
	sbFindJsonArray,
	sbMaskingCardNo,
	sbMaskingAccountNo,
	getCurView,
	delay,
	sbIsNull,
	makeArray,
	sbMaskingKorName
};

export default commonUtil00;
