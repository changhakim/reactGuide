import React from 'react';
import { ChartLine01 } from "@components";
//import ChartLine01 from '@pages/components/ChartLine01';


function SamplePageChartLine(){
    return (
        <div>
            <ChartLine01
                spacing={32}
                categories={[
                '2022-03-01',
                '2022-03-02',
                '2022-03-03',
                '2022-03-04',
                '2022-03-05',
                '2022-03-06',
                '2022-03-07',
                '2022-03-08',
                '2022-03-09',
                '2022-03-10',]}
                seriesArray={[
                    {
                        name: '평가금액',
                        color: '#72C4FF',
                        tooltipSuffix: '원 입금',
                        data: [
                            1250000, 1300000, 1350000, 1400000, 1450000, 1500000, 1550000, 1250000,
                            1450000, 1050000

                        ],
                    },
                ]}
            />
        </div>
    )


}
export default SamplePageChartLine;