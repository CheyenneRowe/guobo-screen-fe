import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import PublishedAppStore from '@src/app/stores/app.store';
import { FullScreenContainer } from '@jiaminghi/data-view-react';
import LeftPage from "../left-page/left-page";
import RightPage from "../right-page/right-page";
import './main-page.less';

interface IMainPageProps {
    appStore: PublishedAppStore;
}
interface IMainPageState {

}
interface StepItem {
    index: string;
    title: string;
    isActive: boolean;
}
@inject('appStore')
@observer
export default class MainPage extends PureComponent<IMainPageProps, IMainPageState> {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    stepArr: Array<StepItem> = [{
        index: '01',
        title: '系统初始化',
        isActive: false
    }, {
        index: '02',
        title: '业务开通',
        isActive: true
    }, {
        index: '03',
        title: '业务调优',
        isActive: false
    }];

    async componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <FullScreenContainer>
                <div className="main-page-wrap">
                    <div className="main-page-header" />
                    <div className="main-page-step">
                        <span className="step-title">阶段流程：</span>
                        {
                            this.stepArr?.map((step, index) => {
                                return <React.Fragment key={index}>
                                    <div className={step?.isActive ? 'step-background-active' : 'step-background'}>
                                        <div className="step-content">
                                            <span className="step-index">{step.index}</span>
                                            <span className="step-title">{step.title}</span>
                                        </div>
                                    </div>
                                    {(index != (this.stepArr?.length - 1)) && <div className="step-arrow" />}
                                </React.Fragment>
                            })
                        }
                    </div>
                    <div className="main-page-content">
                        <LeftPage appStore={this.props.appStore} />
                        <RightPage appStore={this.props.appStore} />
                    </div>
                </div>
            </FullScreenContainer>
        );
    }
}
