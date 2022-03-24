import React, { useState } from 'react';
import { createPortal } from 'react-dom';

class IFrame extends React.PureComponent<{}, { mountNode: HTMLElement | undefined }> {
    iframeRef = React.createRef<HTMLIFrameElement>();
    observer!: MutationObserver;

    constructor(props) {
        super(props);
        this.state = { mountNode: undefined };
    }



    componentDidMount() {
        this.observer = new MutationObserver(this.setIframeStyle);
        this.setState({ mountNode: this.iframeRef.current?.contentWindow?.document?.body });

        if (!this.iframeRef.current) return;
        this.observer.observe(this.iframeRef.current, {
          // Check config in https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
          childList: true,
          attributes: true,
          characterData: true
        });
      }
      componentWillUnmount() {
        this.observer.disconnect();
      }

    setIframeStyle = (e) => {
    const iframeDOM = e.target.contentWindow
        && e.target.contentWindow.document;
        console.log('setIframeStyle', iframeDOM);

    if (!iframeDOM) return;
    const pre = iframeDOM.getElementsByTagName('pre');
    // code style
    Array.prototype.forEach.call(pre, element => {
        element.style.padding = '12px';
        element.style.overflow = 'auto';
        element.style.lineHeight = '20px';
        element.style.borderRadius = '3px';
        element.style.backgroundColor = '#f5f8f9';
        element.style.border = '1px solid #cfd9df';
    });
    // prevent link
    const a = iframeDOM.getElementsByTagName('a');
    Array.prototype.forEach.call(a, element => {
        element.addEventListener('click', e => e.preventDefault())
    });
    this.iframeRef.current!.style.height = `${ iframeDOM.body.scrollHeight + 10 }px`;

  }

  render() {
      console.log('render', this.state.mountNode);

    return (
        <iframe ref={this.iframeRef}
              width="100%"
              height='100%'
              frameBorder="0"
              scrolling="no">
          {this.state.mountNode && createPortal(this.props.children, this.state.mountNode)}
        </iframe>
      )
  }

}

export default IFrame;
