import React, { PureComponent } from 'react';
import Image from '@src/common/components/image';

import './index.less';

interface IEmptyPage {
    url?: string;
    content?: string;
    className?: string;
}

export default class EmptyPage extends PureComponent<IEmptyPage, {}> {
å
    static defaultProps = {
        url:  '',
        content: '很抱歉，没有找到您所查找的资源'
    }

    render() {
        return (
            <div className='empty-page'>
                <Image url={this.props.url} className={this.props.className}/>
                <div className='empty-page_content'>{this.props.content}</div>
            </div>
        )
    }
}
