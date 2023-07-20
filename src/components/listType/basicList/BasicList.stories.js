import { useState } from 'react';
import {
	Button,
	Bookmark,
	Toggle,
	List,
	ListTextItem,
	ListIconItem,
	ListControlItem,
	ListTooltipItem,
	ListCheckButtonItem,
	Tooltip,
	SupportingVisual,
} from '@components';
import { loggerUtil } from '@utils';
import Logo from '@components/logo/Logo';
import { Doc } from './BasicList.stories.mdx';

export default {
	title: 'old_v1/Component/List',
	parameters: {
		componentSubtitle: 'BasicList UI Component',
		docs: {
			page: Doc,
		},
	},
};

export const BasicList = () => {
	const [activeTooltip1, setActiveTooltip1] = useState(false);

	const checkboxOnclick = (result) => {
		loggerUtil.info(result);
	};

	const onClick = () => {
		loggerUtil.info('클릭');
	};

	const onChange = (result) => {
		loggerUtil.info(result);
	};

	return (
		<>
			<h1>List</h1>
			<hr />
			<h2>
				Text
				<br /> ListTextItem
			</h2>
			<hr />
			<h3>Right Align</h3>
			{/**
			 * @description ListTextItem Prop
			 *
			 * @prop {string} title - 리스트 타이틀(required, default: null)
			 * @prop {string} description - 리스트 보조 텍스트(default: null)
			 * @prop {string} direction - 보조 텍스트 위치 타입(bottom / right) (default: 'bottom')
			 * @prop {bool} arrow - 우측 아이콘 타입 (default: false)
			 * @prop {func} onClick - 이벤트
			 */}
			<List>
				<ListTextItem title={'주요 텍스트'} onClick={onClick} />
			</List>
			<h3>Two-line</h3>
			<List>
				<ListTextItem title={'주요 텍스트\n최대 두줄까지 가능합니다.'} onClick={onClick} />
			</List>
			<h2>Single-Line (bottom)</h2>
			<List>
				<ListTextItem title={'주요 텍스트'} description={'보조 텍스트'} onClick={onClick} />
			</List>
			<h2>Single-Line (Right)</h2>
			<List>
				<ListTextItem
					title={'주요 텍스트'}
					description={'보조 텍스트'}
					direction='right'
					onClick={onClick}
				/>
			</List>
			<h3>Two-Line</h3>
			<List>
				<ListTextItem
					title={'주요 텍스트'}
					description={'보조 텍스트\n최대 두줄까지 가능합니다.'}
					onClick={onClick}
				/>
			</List>
			<h3>Multi-Line</h3>
			<List>
				<ListTextItem
					title={'주요 텍스트\n최대 두줄까지 가능합니다.'}
					description={'보조 텍스트\n최대 두줄까지 가능합니다.'}
					onClick={onClick}
				/>
			</List>
			<br />
			<h2>
				Icon
				<br />
				ListIconItem
			</h2>
			<hr />
			{/**
			 * @description ListIconItem Prop
			 *
			 * @prop {string} title - 리스트 타이틀(required, default: null)
			 * @prop {string} description - 리스트 보조 텍스트(default: null)
			 * @prop {node} img - 아이콘 (required, default: null)
			 * @prop {string} size - 아이콘 사이즈(24, 32, 48, 48-arrow) (default: '24')
			 * @prop {node} control - 버튼 유무(default: null)
			 * @prop {func} onClick - 이벤트
			 */}
			<h3>Logo</h3>
			<List>
				<ListIconItem title={'주요 텍스트'} img={<Logo name='신한' />} onClick={onClick} />
			</List>
			<h3>Icon_24</h3>
			<List>
				<ListIconItem
					title={'주요 텍스트(14)'}
					description={'보조 텍스트(계좌번호)'}
					img={<Logo name='신한' />}
					onClick={onClick}
				/>
			</List>
			<h3>Icon_32</h3>
			<List>
				<ListIconItem
					title={'주요 텍스트(16)'}
					description={'보조 텍스트(계좌번호)'}
					size='32'
					img={<Logo name='신한' size='32' />}
					onClick={onClick}
				/>
			</List>
			<h3>Icon_48</h3>
			<List>
				<ListIconItem
					title={'주요 텍스트'}
					description={'보조 텍스트'}
					size='48'
					img={<Logo name='신한' size='48' />}
					onClick={onClick}
				/>
			</List>
			<h3>left Icon48(ARS 및 전화걸기) </h3>
			<List>
				<ListIconItem
					title={'ARS'}
					description={'sub text'}
					type='48-arrow'
					img={
						<svg
							width='48'
							height='48'
							viewBox='0 0 48 48'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='24' cy='24' r='24' fill='#0471E9' />
							<path
								d='M19.6 13.0003H16.1429C15.3093 13.0003 14.5099 13.3465 13.9205 13.9627C13.3311 14.5789 13 15.4146 13 16.286V19.5717C13 23.9287 14.6556 28.1073 17.6026 31.1883C20.5496 34.2692 24.5466 36 28.7143 36H31.8571C32.6907 36 33.4901 35.6538 34.0795 35.0377C34.6689 34.4215 35 33.5857 35 32.7143V30.4144C34.995 30.0993 34.9035 29.7925 34.7363 29.5303C34.5691 29.2682 34.3334 29.0618 34.0571 28.9358L30.2857 26.9644C30.0818 26.8586 29.8584 26.8003 29.6308 26.7937C29.4033 26.787 29.1771 26.8321 28.9679 26.9259C28.7586 27.0196 28.5714 27.1597 28.4191 27.3366C28.2668 27.5134 28.153 27.7228 28.0857 27.9501L27.6143 29.4287C27.4604 29.888 27.1532 30.2738 26.749 30.5152C26.3448 30.7567 25.8709 30.8375 25.4143 30.7429C23.5801 30.3893 21.8918 29.4617 20.573 28.0829C19.2541 26.7041 18.3668 24.9392 18.0286 23.0216C17.916 22.5428 17.9837 22.0372 18.2176 21.6091C18.4516 21.181 18.834 20.8633 19.2857 20.7217L21.0143 20.0645C21.3884 19.921 21.7028 19.6456 21.9036 19.2858C22.1044 18.9259 22.1789 18.5042 22.1143 18.0931L21.1714 14.3146C21.098 13.9379 20.9005 13.6001 20.6133 13.36C20.3262 13.1199 19.9676 12.9926 19.6 13.0003Z'
								fill='white'
							/>
						</svg>
					}
					onClick={onClick}
				/>
			</List>

			<br />
			<h2>Variants</h2>
			<hr />
			<h2>ListTextItem</h2>
			<h3>Depth </h3>
			<List>
				<ListTextItem title={'주요 텍스트'} arrow={true} onClick={onClick} />
			</List>
			<h3>Depth + Text </h3>
			<List>
				<ListTextItem
					title={'주요 텍스트'}
					description={'보조 텍스트'}
					direction='right'
					arrow={true}
					onClick={onClick}
				/>
			</List>
			<h2>ListControlItem</h2>
			<hr />
			<h3>Right Align (Control) </h3>
			{/**
			 * @description ListControlItem Prop
			 *
			 * @prop {string} title - 리스트 타이틀(required, default: null)
			 * @prop {string} direction - 버튼 방향 (left / right)(default: right)
			 * @prop {node} control - 버튼 유무(default: null)
			 */}
			<List>
				<ListControlItem
					title={'주요 텍스트'}
					control={
						<Button className='secondary-3rd' buttonSize='medium' onClick={onClick}>
							R
						</Button>
					}
				/>
			</List>
			<h3>Left Align (Control) </h3>
			<List>
				<ListControlItem
					title={'주요 텍스트'}
					control={
						<Button className='secondary-3rd' buttonSize='medium' onClick={onClick}>
							L
						</Button>
					}
					direction='left'
				/>
			</List>
			<h3>Toggle </h3>
			<List>
				<ListControlItem
					title={'주요 텍스트'}
					control={<Toggle id='checkbox-toggle0101' onChange={onChange} />}
				/>
			</List>
			<h3>Bookmark </h3>
			<List>
				<ListControlItem title={'주요 텍스트'} control={<Bookmark onChange={onChange} />} />
			</List>
			<h3>Button </h3>
			<List>
				<ListControlItem
					title={'주요 텍스트'}
					control={
						<Button className='secondary-3rd' buttonSize='medium' onClick={onClick}>
							버튼
						</Button>
					}
				/>
			</List>

			<h2>ListTooltipItem</h2>
			<hr />
			<h3>ToolTip </h3>
			{/**
			 * @description ListTooltipItem Prop
			 *
			 * @prop {string} title - 리스트 타이틀(required, default: '')
			 * @prop {node} tooltip - 툴팁 (isRequired, defaul: null)
			 */}
			<List>
				<ListTooltipItem
					title={'주요 텍스트'}
					tooltip={
						<Tooltip
							active={activeTooltip1}
							tooltipFnc={() => setActiveTooltip1(!activeTooltip1)}
						>
							텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트 텍스트
						</Tooltip>
					}
				/>
			</List>
			<h2>ListCheckButtonItem</h2>
			<hr />
			<h3>Check Box button(우측버튼) - 리스트</h3>
			{/**
			 * @description ListCheckButtonItem Prop
			 *
			 * @prop {string} title - 리스트 타이틀(required, default: null)
			 * @prop {string} id - 체크박스 id (required, default: null)
			 * @prop {string} label - 우측 체크박스 label (required, defaul: null)
			 * @prop {string} name - 체크박스 name 속성 (defaul: null)
			 * @prop {bool} checked - 체크박스 checked 속성 (default: false)
			 * @prop {bool} disabled - 체크박스 disabled 속성 (default: false)
			 * @prop {func} onChange - 이벤트
			 */}
			<List>
				<ListCheckButtonItem
					id='list-checkbox03'
					name='list-checkbox'
					title={'주요 텍스트'}
					label='없음'
					onChange={checkboxOnclick}
				/>
			</List>
			<h2>ListIconItem</h2>
			<hr />
			<h3>Icon32 + Accont + Bookmark </h3>
			<List>
				<ListIconItem
					title={'주요 텍스트'}
					description={'신한 XXX-XXX-XXXXXX'}
					img={<Logo name='신한' size='32' />}
					control={<Bookmark onChange={onChange} />}
				/>
			</List>
			<h3>Icon48 + Accont + Bookmark </h3>
			<List>
				<ListIconItem
					title={'주요 텍스트'}
					description={'신한 XXX-XXX-XXXXXX'}
					img={
						<svg
							width='48'
							height='48'
							viewBox='0 0 48 48'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<circle cx='24' cy='24' r='24' fill='#0471E9' />
							<path
								d='M19.6 13.0003H16.1429C15.3093 13.0003 14.5099 13.3465 13.9205 13.9627C13.3311 14.5789 13 15.4146 13 16.286V19.5717C13 23.9287 14.6556 28.1073 17.6026 31.1883C20.5496 34.2692 24.5466 36 28.7143 36H31.8571C32.6907 36 33.4901 35.6538 34.0795 35.0377C34.6689 34.4215 35 33.5857 35 32.7143V30.4144C34.995 30.0993 34.9035 29.7925 34.7363 29.5303C34.5691 29.2682 34.3334 29.0618 34.0571 28.9358L30.2857 26.9644C30.0818 26.8586 29.8584 26.8003 29.6308 26.7937C29.4033 26.787 29.1771 26.8321 28.9679 26.9259C28.7586 27.0196 28.5714 27.1597 28.4191 27.3366C28.2668 27.5134 28.153 27.7228 28.0857 27.9501L27.6143 29.4287C27.4604 29.888 27.1532 30.2738 26.749 30.5152C26.3448 30.7567 25.8709 30.8375 25.4143 30.7429C23.5801 30.3893 21.8918 29.4617 20.573 28.0829C19.2541 26.7041 18.3668 24.9392 18.0286 23.0216C17.916 22.5428 17.9837 22.0372 18.2176 21.6091C18.4516 21.181 18.834 20.8633 19.2857 20.7217L21.0143 20.0645C21.3884 19.921 21.7028 19.6456 21.9036 19.2858C22.1044 18.9259 22.1789 18.5042 22.1143 18.0931L21.1714 14.3146C21.098 13.9379 20.9005 13.6001 20.6133 13.36C20.3262 13.1199 19.9676 12.9926 19.6 13.0003Z'
								fill='white'
							/>
						</svg>
					}
					control={<Bookmark onChange={onChange} />}
				/>
			</List>
			<h3>Icon24 + Right Icon </h3>
			<List>
				<ListIconItem
					title={'주요 텍스트'}
					img={<Logo name='신한' />}
					control={
						<Button className='secondary-3rd' buttonSize='medium' onClick={onClick}>
							버튼
						</Button>
					}
				/>
			</List>
			<h3>SupportingVisual </h3>
			<SupportingVisual
				description={'123123'}
				icon={<Logo name={'신한'} size='32' type={'bank'} />}
				iconAlign='center'
				textSize='large'
				title={'123123'}
				normalText
				wrapTag='span'
			/>
		</>
	);
};
