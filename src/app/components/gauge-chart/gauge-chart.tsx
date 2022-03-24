import React, {Component} from 'react';
import * as echarts from 'echarts';
import { LargeNodeLabelCfg } from "./data";

import './gauge-chart.less';

const ContainerWidth = 1700;  // 画布宽高
const ContainerHeight = 1500;
const NodeSize = 80;   // 节点大小
const LargeNodeSize = 100;   // 较大节点大小

interface Props {
    gaugeChartInfo: any;
}
interface State {
    gaugeChartInfo: any;
}

export default class GaugeChart extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            gaugeChartInfo: [],
        };
    }

    chart: any = null;
    option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 240,
                splitNumber: 12,
                itemStyle: {
                    color: '#58D9F9',
                    shadowColor: 'rgba(0,138,255,0.45)',
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                progress: {
                    show: true,
                    roundCap: true,
                    width: 18
                },
                pointer: {
                    icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                    length: '75%',
                    width: 16,
                    offsetCenter: [0, '5%']
                },
                axisLine: {
                    roundCap: true,
                    lineStyle: {
                        width: 18,
                        color: [
                            [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0.1,
                                    color: "#C74F4F"
                                },
                                {
                                    offset: 0.5,
                                    color: "#D1C936"
                                },
                                {
                                    offset: 1,
                                    color: "#00A37C"
                                }
                            ])],
                        ]
                    }
                },
                axisTick: {
                    splitNumber: 2,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    length: 12,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: 30,
                    color: '#999',
                    fontSize: 20
                },
                title: {
                    show: false
                },
                detail: {
                    backgroundColor: '#fff',
                    borderColor: '#999',
                    borderWidth: 2,
                    width: '60%',
                    lineHeight: 40,
                    height: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return '{value|' + value.toFixed(0) + '}{unit|km/h}';
                    },
                    rich: {
                        value: {
                            fontSize: 50,
                            fontWeight: 'bolder',
                            color: '#777'
                        },
                        unit: {
                            fontSize: 20,
                            color: '#999',
                            padding: [0, 0, -20, 10]
                        }
                    }
                },
                data: [
                    {
                        value: 100
                    }
                ]
            }
        ]
    };

    getChartRender = () => {
        let myChart = document.getElementById('gauge-chart') &&
            echarts?.init(document.getElementById('gauge-chart') as HTMLElement, '', {renderer: 'svg'});
        myChart?.setOption(this.option);
        window.addEventListener("resize", () => {
            myChart?.resize();
        });
    }

    initRender = async () => {
        this.getChartRender();
    }

    async componentDidMount() {
        this.initRender();
    }

    async componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (this.props == nextProps) return;
        await this.setState({
            gaugeChartInfo: nextProps.gaugeChartInfo
        });
        this.initRender();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="gauge-chart-wrap">
                <div className={'gauge-chart-container'} id={'gauge-chart'} />
            </div>
        );
    }
}
