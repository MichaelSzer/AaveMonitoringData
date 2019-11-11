import React from 'react';
import './index.css';

import CanvasJSReact from'../../lib/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graphs extends React.PureComponent {

    render(){

        if(this.props.isLoading)
            return(
                <div id="total-liquidation"/>
            );

        const options = {
            theme: 'light1',
            backgroundColor: null,
            animationEnabled: true,
            title: {
                text: 'Total Liquidation'
            },
            data: [{
                type: 'pie',
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: this.props.dataPie
            }]
        }

        const optionsLinesChart = {
            theme: 'light1',
            backgroundColor: null,
            title: {
                text: "Historical Events"
            },
            axisX: {
                valueFormatString: "MMM YYYY"
            },
            axisY2: {
                title: "Calls to Events"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                //itemclick: toogleDataSeries
            },
            data: Object.keys(this.props.dataLinesCharts).map(key => {
                return {
                    ...this.props.dataLinesCharts[key],
                    type:"line",
                    axisYType: "secondary",
                    showInLegend: true,
                    markerSize: 0,
                    yValueFormatString: "#,###"
                }
            })
        }

        return(
            <div id="total-liquidation" className="chart-container">
                <CanvasJSChart 
                    options={options}
                />
                <CanvasJSChart 
                    options={optionsLinesChart}
                />
            </div>
        );
    }
}

export default Graphs;