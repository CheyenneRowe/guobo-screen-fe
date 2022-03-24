import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import PublishedAppStore from '@src/app/stores/app.store';
import { BorderBox7 } from '@jiaminghi/data-view-react';
import GaugeChart from "@src/app/components/gauge-chart/gauge-chart";

import './right-page.less';

interface IRightPageProps {
    appStore: PublishedAppStore;
}
interface IRightPageState {

}
@inject('appStore')
@observer
export default class RightPage extends PureComponent<IRightPageProps, IRightPageState> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    gaugeChartInfo: any = [];

    async componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="right-page-wrap">
                <BorderBox7 color={['rgba(0, 118, 255, 0.4)', 'rgba(0, 118, 255)']} className="right-page-border-box">
                    <div className="border-box-content">
                        <div className="title">
                            <span>视频展现效果</span>
                            <div className="title-icon" />
                        </div>
                        视频
                    </div>
                </BorderBox7>
                <BorderBox7 color={['rgba(0, 118, 255, 0.4)', 'rgba(0, 118, 255)']} className="right-page-border-box"
                    style={{marginTop: '1rem'}}>
                    <div className="border-box-content">
                        <div className="title">
                            <span>网络服务质量监控</span>
                            <div className="title-icon" />
                        </div>
                        <GaugeChart gaugeChartInfo={this.gaugeChartInfo || []} />
                    </div>
                </BorderBox7>
                <BorderBox7 color={['rgba(0, 118, 255, 0.4)', 'rgba(0, 118, 255)']} className="right-page-border-box"
                    style={{marginTop: '1rem'}}>
                    <div className="border-box-content">
                        <div className="title">
                            <span>视频质量监控</span>
                            <div className="title-icon" />
                        </div>
                        折线图
                    </div>
                </BorderBox7>
            </div>
        );
    }
}
