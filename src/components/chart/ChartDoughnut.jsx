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

const ChartDoughnut = ({ name, data = [], className, spacing = 0 }) => {
	const [chartOptions, setChartOptions] = useState({});

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

	useEffect(() => {
		const doughnunOptions = {
			chart: {
				type: 'pie',
			},
			title: {
				text: null,
				margin: 0,
				floating: true,
				widthAdjust: 0,
			},
			accessibility: {
				point: {
					valueSuffix: '%',
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
			tooltip: {
				borderWidth: 0,
				useHTML: true,
				formatter() {
					return `${this.key}<br />${this.y}%`;
				},
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: false,
					},
					startAngle: 0,
					endAngle: 360,
					center: ['50%', '50%'],
					size: '100%',
					innerSize: '45%',
					showInLegend: true,
					borderWidth: 0,
				},
			},
			...menuOption,
		};

		setChartOptions({
			...doughnunOptions,
			series: [{ name, data }],
		});
	}, [data, name, menuOption]);

	const cx = classNames.bind(ChartStyle);

	return (
		<div
			className={cx('chart-wrap', 'doughnut', className)}
			style={{ '--spacing': `${spacing}px` }}
		>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	);
};


ChartDoughnut.propTypes = {
	name: PropTypes.string,
	data: PropTypes.array,
	className: PropTypes.string,
	spacing: PropTypes.number,
};

export default ChartDoughnut;
