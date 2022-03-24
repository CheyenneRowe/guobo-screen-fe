import React from 'react';
import { noop } from '@src/common/utils';

import './index.less';


interface IImageProps {
    className: string;
    url: string;
    onImageClick: React.MouseEventHandler<HTMLElement>;
    style: React.CSSProperties;
    message: string;
}

/**
 * @TODO 处理图片加载失败
 */
export default class Image extends React.PureComponent<IImageProps, {}> {
    static defaultProps = {
        className: "",
        url: null,
        onImageClick: noop,
        style: {},
        message: "",
    };

    handleClick: React.MouseEventHandler<HTMLElement> = (e: React.MouseEvent<HTMLElement>) => {
        this.props.onImageClick(e);
    }

    render() {
        const { className, style, url, message } = this.props;

        if (!url) { return (<div className={`${className} avatar`} onClick={this.handleClick} style={style} >{message}</div>); }

        return (
            <div className={`${className} avatar`} onClick={this.handleClick} style={style}>
                <img alt="Image" src={this.props.url} />
            </div>
        );
    }
}
