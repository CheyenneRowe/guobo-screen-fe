import React from 'react';
import MarkdownIt from 'markdown-it';
import { Spin } from 'antd';

const styles = `<style>
::-moz-selection{background: #369a6a; color: #fff }
::selection {background: #369a6a;color: #fff}
.markdown-body {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.markdown-body::before {
    display: table;
    content: ""
}

.markdown-body::after {
    display: table;
    clear: both;
    content: ""
}

.markdown-body>*:first-child {
    margin-top: 0 !important
}

.markdown-body>*:last-child {
    margin-bottom: 0 !important
}

.markdown-body a {
    color: #369a6a;
    text-decoration: none;
}

.markdown-body a:hover {
    text-decoration: underline;
}

.markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none
}

.markdown-body .absent {
    color: #cb2431
}

.markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1
}

.markdown-body .anchor:focus {
    outline: none
}

.markdown-body p,.markdown-body blockquote,.markdown-body ul,.markdown-body ol,.markdown-body dl,.markdown-body table,.markdown-body pre {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 20px;
}

.markdown-body hr {
    height: .25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0
}

.markdown-body blockquote {
    margin: 0;
    padding:1em;
    color: #232d41;
    border-left: 0.25em solid #369a6a;
    background: #fafbfc;
}

.markdown-body blockquote>:first-child {
    margin-top: 0
}

.markdown-body blockquote>:last-child {
    margin-bottom: 0
}

.markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5
}

.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6 {
    margin-top: 20px;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 1.25
}

.markdown-body h1 .octicon-link,.markdown-body h2 .octicon-link,.markdown-body h3 .octicon-link,.markdown-body h4 .octicon-link,.markdown-body h5 .octicon-link,.markdown-body h6 .octicon-link {
    color: #1b1f23;
    vertical-align: middle;
    visibility: hidden
}

.markdown-body h1:hover .anchor,.markdown-body h2:hover .anchor,.markdown-body h3:hover .anchor,.markdown-body h4:hover .anchor,.markdown-body h5:hover .anchor,.markdown-body h6:hover .anchor {
    text-decoration: none
}

.markdown-body h1:hover .anchor .octicon-link,.markdown-body h2:hover .anchor .octicon-link,.markdown-body h3:hover .anchor .octicon-link,.markdown-body h4:hover .anchor .octicon-link,.markdown-body h5:hover .anchor .octicon-link,.markdown-body h6:hover .anchor .octicon-link {
    visibility: visible
}

.markdown-body h1 tt,.markdown-body h1 code,.markdown-body h2 tt,.markdown-body h2 code,.markdown-body h3 tt,.markdown-body h3 code,.markdown-body h4 tt,.markdown-body h4 code,.markdown-body h5 tt,.markdown-body h5 code,.markdown-body h6 tt,.markdown-body h6 code {
    font-size: inherit
}

.markdown-body h1 {
    padding-bottom: 0.3em;
    font-size: 2em;
    /* border-bottom: 1px solid #eaecef */
}

.markdown-body h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    /* border-bottom: 1px solid #eaecef  */
}

.markdown-body h3 {
    font-size: 1.25em
}

.markdown-body h4 {
    font-size: 1em
}

.markdown-body h5 {
    font-size: 0.875em
}

.markdown-body h6 {
    font-size: 0.85em;
    color: #303e5a;
}

.markdown-body ul,.markdown-body ol {
    padding-left: 2em
}

.markdown-body ul.no-list,.markdown-body ol.no-list {
    padding: 0;
    list-style-type: none
}

.markdown-body ul ul,.markdown-body ul ol,.markdown-body ol ol,.markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0
}

.markdown-body li {
    word-wrap: break-all
}

.markdown-body li>p {
    margin-top: 16px
}

.markdown-body li+li {
    margin-top: .25em
}

.markdown-body dl {
    padding: 0
}

.markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600
}

.markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px
}

.markdown-body table {
    width: 100%;
    overflow: auto;
    margin-top:12px;
}

.markdown-body table th {
    font-weight: 600;
    color: #303e5a;
}

.markdown-body table th,.markdown-body table td {
    padding: 12px;
    /* border: 1px solid #dfe2e5; */
    text-align: left;
    margin: 0;
}

.markdown-body table tr {
    background-color: #fff;
    border-top: 1px solid #fff;
}
.markdown-body table tr:nth-child(odd) td{
    background-color: #EFF4F8;
}
.markdown-body table tr:nth-child(odd) td:first-child,.markdown-body table tr:nth-child(odd) td:last-child{
    border: 3px;
}
/*.markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa
} */

.markdown-body table img {
    background-color: transparent
}

.markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff
}

.markdown-body img[align=right] {
    padding-left: 20px
}

.markdown-body img[align=left] {
    padding-right: 20px
}

.markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent
}

.markdown-body span.frame {
    display: block;
    overflow: hidden
}

.markdown-body span.frame>span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #dfe2e5
}

.markdown-body span.frame span img {
    display: block;
    float: left
}

.markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #24292e
}

.markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both
}

.markdown-body span.align-center>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center
}

.markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center
}

.markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both
}

.markdown-body span.align-right>span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right
}

.markdown-body span.align-right span img {
    margin: 0;
    text-align: right
}

.markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden
}

.markdown-body span.float-left span {
    margin: 13px 0 0
}

.markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden
}

.markdown-body span.float-right>span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right
}

.markdown-body code,.markdown-body tt {
    padding: 0.2em 0.4em;
    margin: 0;
    color: #369a6a;
    background-color: rgba(85, 188, 138, 0.2);
    border-radius: 3px;
    font-family: Monaco, Menlo, Consolas, 'Courier New', monospace;

}

.markdown-body code br,.markdown-body tt br {
    display: none
}

.markdown-body del code {
    text-decoration: inherit
}

.markdown-body pre {
    word-wrap: normal
}

.markdown-body pre>code {
    padding: 0;
    margin: 0;
    font-size: 100%;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0
}

.markdown-body .highlight {
    margin-bottom: 16px
}

.markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal
}

.markdown-body .highlight pre,.markdown-body pre {
    padding: 12px;
    overflow: auto;
    line-height: 1.45;
    border-radius: 3px;
    background-color: #f5f8f9;
    border: 1px solid #cfd9df;
}

.markdown-body pre code,.markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
    color: #232d41;
}

.markdown-body .csv-data td,.markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
}

.markdown-body .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #fff;
    border: 0;
}

.markdown-body .csv-data tr {
    border-top: 0;
}

.markdown-body .csv-data th {
    font-weight: 600;
    background: #f6f8fa;
    border-top: 0;
}
</style>`;

interface IMarkdownProps {
    source: string,
    options?: {},
}
class Markdown extends React.PureComponent<IMarkdownProps, {loading: boolean} > {

  static defaultProps = {
    source: '',
    options: {},
  };

  iframeLoaded: boolean;
  md: MarkdownIt;
  iframe = React.createRef<HTMLIFrameElement>();

  constructor(props) {
    super(props);

    this.iframeLoaded = false;
    this.md = new MarkdownIt({ html: true, linkify: true, ...props.options });
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.iframe.current?.addEventListener('load', this.handleIFrameLoad);
  }

  componentWillUnmount() {
    this.iframe.current?.removeEventListener('load', this.handleIFrameLoad);
    // this.removeMediaListeners();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.md = new MarkdownIt(this.props.options);
        this.updateMarkdown();
    }
  }

  handleIFrameLoad = () => {
    this.iframeLoaded = true;
    this.setState({
      loading: false,
    });
    this.updateMarkdown();
  };

//   addMediaListeners() {
//     const $document = this.iframe.contentDocument;
//     this.iframeMedias = $document.querySelectorAll('img, video, audio');

//     if (this.iframeMedias && this.iframeMedias.length > 0) {
//       Array.prototype.forEach.call(this.iframeMedias, (img) => {
//         img.removeEventListener('load', this.updateIFrame);
//         img.addEventListener('load', this.updateIFrame);
//       });
//     }
//   }

//   removeMediaListeners() {
//     if (this.iframeMedias && this.iframeMedias.length > 0) {
//       Array.prototype.forEach.call(this.iframeMedias, (img) => {
//         img.removeEventListener('load', this.updateIFrame);
//       });
//     }
//   }

//   updateIFrame = () => {
//     if (this.iframe.current) {
//       this.iframe.current.style.height = `${
//         this.iframe.current.contentWindow.document.body.scrollHeight + 16
//       }px`;
//     }
//   };

  updateMarkdown = () => {
    const iframDocument = this.iframe.current?.contentDocument;
    if (this.iframeLoaded && iframDocument && this.iframe.current) {
        iframDocument.body.className = 'markdown-body';
        iframDocument.body.innerHTML = styles + this.md.render(this.props.source);
       this.iframe.current.style.height = `${iframDocument.body.scrollHeight + 16}px`;
       // prevent link
       const a = iframDocument.getElementsByTagName('a');
       Array.prototype.forEach.call(a, element => {
           element.addEventListener('click', e => e.preventDefault())
       });
    }

  }


  render() {
    return (
      <div>
        {this.state.loading && <Spin style={{ width: '100%' }}/>}
        <iframe
          ref={this.iframe}
          src="/blank_md"
          name="frame_markdown"
          width="100%"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    );
  }
}

export default Markdown;

