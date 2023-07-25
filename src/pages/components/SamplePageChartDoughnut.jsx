import React from 'react';
import {ChartDoughnut} from "@components";

function SamplePageChartDoughnut(){
    return (
        <div>
            <ChartDoughnut
				name='테스트차트 테스트챠트'
				spacing={16}
				className="box"
                data={[
                    {
                        y: 10,
                        name: 'test1',
                        color: '#5855EE',
                    },
                    {
                        y: 5,
                        name: 'test2',
                        color: '#7C72F1',
                    },
                    {
                        y: 30,
                        name: 'test3',
                        color: '#2EA672',
                    },
                    {
                        y: 10,
                        name: 'test4',
                        color: '#99DE14',
                    },
                    {
                        y: 3,
                        name: 'test5',
                        color: '#FFC751',
                    },
                    {
                        y: 43,
                        name: 'test6',
                        color: '#FF6554',
                    },
                ]}
			/>
        </div>
    )

}
export default SamplePageChartDoughnut;