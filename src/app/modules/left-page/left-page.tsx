import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import PublishedAppStore from '@src/app/stores/app.store';
import { BorderBox7 } from '@jiaminghi/data-view-react';
import TopoChart from "@src/app/components/topo-chart/topo-chart";

import './left-page.less';

interface ILeftPageProps {
    appStore: PublishedAppStore;
}
interface ILeftPageState {
}
@inject('appStore')
@observer
export default class LeftPage extends PureComponent<ILeftPageProps, ILeftPageState> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    topoChartInfo: any = [];

    async componentDidMount() {
        this.getTopoChartInfo();
    }

    componentWillUnmount() {
        this.props.appStore.clearTimer();
    }

    getTopoChartInfo = async () => {
        await this.props.appStore.getTopoChartInfo('123456');
    }

    render() {
        this.topoChartInfo = this.props.appStore?.topoChartInfo || [];
        return (
            <div className="left-page-wrap">
                <BorderBox7 color={['rgba(0, 118, 255, 0.4)', 'rgba(0, 118, 255)']}>
                    <div className="border-box-content">
                        <div className="title">
                            <span>网络实施拓扑</span>
                            <div className="title-icon" />
                        </div>
                        <TopoChart topoChartInfo={this.topoChartInfo || []} />
                    </div>
                </BorderBox7>
            </div>
        );
    }
}
