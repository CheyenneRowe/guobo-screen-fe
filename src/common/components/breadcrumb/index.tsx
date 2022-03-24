import React, { PureComponent } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Breadcrumb as AntdBreadcrumb } from 'antd';

import './index.less';

interface IBreadcrumb {
    name?: string;
    getName?(currentPath): string;
}

interface IBreadcrumbProps {
    rules: Array<IBreadcrumb | ''>;
}

class Breadcrumb extends PureComponent<RouteComponentProps & IBreadcrumbProps, {}> {
    getpaths = () => {
        const pathname = this.props.location.pathname || '';
        return pathname.split('/').filter((a) => a);
    };

    handleClick = (index) => {
        const paths = this.getpaths();
        const nextPath = paths.slice(0, index + 1).join('/');
        this.props.history.push(`/${nextPath}`);
    };

    render() {
        const paths = this.getpaths();

        return (
            <div className="app-breadcrumb">
                <AntdBreadcrumb>
                    {paths.map((path, index) => {
                        const rules = this.props.rules[index];
                        if (!rules) return null;
                        //@ts-ignore
                        const name = rules.name
                            ? rules.name
                            : rules.getName && rules.getName(path);
                        if (!name) return null;
                        return (
                            <AntdBreadcrumb.Item
                                key="name"
                                onClick={this.handleClick.bind(this, index)}
                            >
                                <a>{name}</a>
                            </AntdBreadcrumb.Item>
                        );
                    })}
                </AntdBreadcrumb>
            </div>
        );
    }
}

export default withRouter(Breadcrumb);
