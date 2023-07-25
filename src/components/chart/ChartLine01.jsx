import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import classNames from 'classnames/bind';
import ChartStyle from './Chart.module.scss';

require('highcharts/modules/exporting.js')(Highcharts);
require('highcharts/modules/export-data.js')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);
require('highcharts/modules/accessibility')(Highcharts);


const ChartLine01 = ({
	multipleLine = false,
	categories = [],
	seriesArray = [],
	className,
	spacing = 0,
}) => {
	const [chartOptions, setChartOptions] = useState({});

	const multipleSeriesOption = useMemo(() => [], []);

	seriesArray.forEach(() => {
		multipleSeriesOption.push({
			lineWidth: 1,
			fillColor: 'transparent',
			marker: {
				enabled: false,
			},
		});
	});

	const menuOption = useMemo(() => {
		return {
			exporting: {
				buttons: {
					contextButton: {
						menuItems: [
							'viewFullscreen',
							'printChart',
							'separator',
							{
								text: '데이터테이블로 보기',
								onclick() {
									this.isDataTableVisible ? this.hideData() : this.viewData();
									const viewText = this.isDataTableVisible
										? '데이터테이블 숨기기'
										: '데이터테이블로 보기';

									this.exportDivElements[4].lastChild.textContent = viewText;
								},
							},
						],
					},
				},
			},
			credits: {
				enabled: false,
			},
		};
	}, []);

	const multipleLineOptions = useMemo(() => {
		return {
			yAxis: {
				gridLineDashStyle: 'LongDash',
				title: {
					text: null,
				},
				labels: {
					formatter() {
						return this.value.toLocaleString('ko-KR').split('.')[0];
					},
					padding: 0,
				},
			},
			tooltip: {
				borderWidth: 0,
				useHTML: true,
				formatter() {
					const getTime = new Date(this.key);

					const year = getTime.getFullYear();
					const month = getTime.getMonth() + 1;
					const date = getTime.getDate();

					const time = `${year}-${month >= 10 ? month : `0${month}`}-${
						date >= 10 ? date : `0${date}`
					}`;

					const resultText = `${time}<br />${
						this.y.toLocaleString('ko-KR').split('.')[0]
					}${
						this.series.options.tooltip.valueSuffix !== undefined
							? this.series.options.tooltip.valueSuffix
							: ''
					}`;

					return resultText;
				},
			},
			series: multipleSeriesOption,
			...menuOption,
		};
	}, [menuOption, multipleSeriesOption]);

	const lineOptions = useMemo(() => {
		return {
			chart: {
				marginTop: 40,
			},
			title: {
				text: null,
			},
			subtitle: {
				text: null,
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 100,
				tickWidth: 1,
				labels: {
					formatter() {
						const getTime = new Date(this.value);

						const year = getTime.getFullYear();
						const month = getTime.getMonth() + 1;
						const date = getTime.getDate();

						return `${year}-${month >= 10 ? month : `0${month}`}-${
							date >= 10 ? date : `0${date}`
						}`;
					},
				},
			},
			yAxis: [
				{
					gridLineDashStyle: 'LongDash',
					title: {
						text: null,
					},
					labels: {
						formatter() {
							return this.value.toLocaleString('ko-KR').split('.')[0];
						},
						padding: 0,
					},
				},
				{
					gridLineWidth: 0,
					// min: 0,  수익률 -인 경우가 있어 해당 값 제거함. 2022.10.06
					labels: {
						formatter() {
							return this.value.toLocaleString('ko-KR', {
								minimumFractionDigits: 2,
							});
						},
						padding: 0,
					},
					title: {
						text: null,
					},
					opposite: true,
				},
			],
			tooltip: {
				borderWidth: 0,
				useHTML: true,
				formatter() {
					const getTime = new Date(this.key);

					const year = getTime.getFullYear();
					const month = getTime.getMonth() + 1;
					const date = getTime.getDate();

					const time = `${year}-${month >= 10 ? month : `0${month}`}-${
						date >= 10 ? date : `0${date}`
					}`;

					const resultText =
						this.series.index === 0
							? `${time}<br />${this.y.toLocaleString('ko-KR').split('.')[0]}${
									this.series.options.tooltip.valueSuffix !== undefined
										? this.series.options.tooltip.valueSuffix
										: ''
							  }`
							: `${time}<br />${this.y.toLocaleString('ko-KR', {
									minimumFractionDigits: 2,
							  })}${
									this.series.options.tooltip.valueSuffix !== undefined
										? this.series.options.tooltip.valueSuffix
										: ''
							  }`;

					return resultText;
				},
			},
			legend: {
				itemMarginTop: 8,
				itemStyle: {
					color: '#565C63',
					fontSize: '11px',
					fontWeight: '300',
				},
			},
			series: [
				{
					type: 'area',
					lineColor: 'transparent',
					fillColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1,
						},
					},
					marker: {
						enabled: false,
					},
					yAxis: 0,
				},
				{
					type: 'area',
					fillColor: 'transparent',
					lineWidth: 1,
					marker: {
						enabled: false,
					},
					yAxis: 1,
				},
			],
			...menuOption,
		};
	}, [menuOption]);

	useEffect(() => {
		const dateTimestamp = categories.map((value, index) => {
			return new Date(value).getTime();
		});

		const multipleData = [];

		seriesArray.forEach((seriesItem) => {
			const data = seriesItem.data.map((value, dataIndex) => {
				return [dateTimestamp[dataIndex], value];
			});

			multipleData.push(data);
		});

		const multipleSeries = [];

		seriesArray.forEach((seriesItem, seriesIndex) => {
			if (!multipleLine && seriesIndex === 0) {
				multipleSeries.push({
					//...lineOptions.series[0],
					name: seriesItem.name,
					// fillColor: {
					// 	...lineOptions.series[0].fillColor,
					// 	stops: [
					// 		[0, Highcharts.Color(seriesItem.color).setOpacity(0.6).get('rgba')],
					// 		[1, Highcharts.Color(seriesItem.color).setOpacity(0).get('rgba')],
					// 	],
					// },
					data: multipleData[0],
					tooltip: {
						valueSuffix: seriesItem.tooltipSuffix,
					},
				});
			} else {
				const option = multipleLine
					? multipleLineOptions.series[seriesIndex]
					: lineOptions.series[seriesIndex];

				multipleSeries.push({
					...option,
					name: seriesItem.name,
					color: seriesItem.color,
					lineColor: seriesItem.color,
					data: multipleData[seriesIndex],
					tooltip: {
						valueSuffix: seriesItem.tooltipSuffix,
					},
				});
			}
		});

		!multipleLine
			? setChartOptions({
					...lineOptions,
					series: multipleSeries,
			  })
			: setChartOptions({
					...lineOptions,
					...multipleLineOptions,
					xAxis: {
						...lineOptions.xAxis,
						labels: {
							...lineOptions.xAxis.labels,
							align: 'left',
						},
					},
					series: multipleSeries,
			  });
	}, [categories, lineOptions, multipleLine, multipleLineOptions, seriesArray]);

	const cx = classNames.bind(ChartStyle);

	return (
		<div
			className={cx('chart-wrap', 'line', className)}
			style={{ '--spacing': `${spacing}px` }}
		>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};

ChartLine01.propTypes = {
	multipleLine: PropTypes.bool,
	categories: PropTypes.array,
	seriesArray: PropTypes.array,
	className: PropTypes.string,
	spacing: PropTypes.number,
};

export default ChartLine01;
