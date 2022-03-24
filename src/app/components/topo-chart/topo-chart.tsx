import React, {Component} from 'react';
import G6 from '@antv/g6';
import { NodeLabelCfg, SetTopoNodes, TopoCombos } from "./data";

import './topo-chart.less';

const ContainerWidth = 1700;  // 画布宽高
const ContainerHeight = 1500;
const NodeSize = 80;   // 节点大小
const LargeNodeSize = 100;   // 较大节点大小

interface Props {
    topoChartInfo: any;
}
interface State {
    topoChartInfo: any;
}

export default class TopoChart extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.changeSizeByResize();
        this.state = {
            topoChartInfo: [],
        };
    }
    graph: any = null;
    data: any = {
        nodes: [],  // 节点
        edges: [],  // 边
        combos: []  // 组合
    };
    containerWidth: number = ContainerWidth;  // 画布宽高
    containerHeight: number = ContainerHeight;
    nodeSize: number = NodeSize;  // 节点大小
    largeNodeSize: number = LargeNodeSize;  // 较大节点大小

    getData = () => {
        let data: any = {
            nodes: [],  // 节点
            edges: [],  // 边
            combos: []  // 组合
        };
        // 调用后端接口获取数据
        // 节点  取返回边的数据中（source、target）存在的节点显示
        let nodeIdArr: any = this.state.topoChartInfo?.reduce((a: Array<string>, b) => {
            a.push(b.source, b.target);
            return a;
        }, []);
        data.nodes = SetTopoNodes(this.containerWidth, this.largeNodeSize, this.nodeSize)?.filter(node => [...new Set(nodeIdArr)]?.includes(node?.id))
        if (!data.nodes.length) return data;
        // 组合  取节点中包含的comboId显示
        data.combos = TopoCombos?.filter(combo => data.nodes?.filter(item => item?.comboId)?.map(item => item?.comboId)?.includes(combo?.id))
        // 边
        data.edges = this.state.topoChartInfo?.map(item => {
            let edge: any = item;
            (edge?.source == 'a' ||
                (edge?.source == 'cpe0' && ['switch0', 'lightIp0'].includes(edge?.target)) ||
                (edge?.target == 'cpe1' && ['switch1', 'lightIp1'].includes(edge?.source)))
            && Object.assign(edge, {type: 'polyline'});
            ['cpe', 'switch', 'lightIp'].includes(edge?.source) && Object.assign(edge, {sourceAnchor: 1, targetAnchor: 1});
            !['a', 'cpe', 'switch', 'lightIp'].includes(edge?.source) && Object.assign(edge, {
                style: { stroke: '#52960B' }
            });
            if (edge?.isBreak) { // isBreak存在或为true，代表链路断开，虚线表示
                edge?.style ? Object.assign(edge.style, { lineDash: [5] }) : Object.assign(edge, {
                    style: { lineDash: [5] }
                });
            }
            return edge;
        }) || [];
        if (!data.edges.length) return data;
        this.data = data;
        return data;
    }
    graphRender = () => {
        if (this.graph) return;
        this.graph = new G6.Graph({
            container: 'container',
            width: this.containerWidth,
            height: this.containerHeight,
            fitView: true,
            fitCenter: true,
            renderer: 'svg',
            groupByTypes: false,
            plugins: [this.tooltipRender()],
            defaultNode: {
                type: 'image',
                size: this.nodeSize,
                anchorPoints: [
                    [0, 0.5],
                    [0.5, 0],
                    [1, 0.5],
                ],
                labelCfg: NodeLabelCfg
            },
            defaultEdge: {
                type: 'line',
                style: {
                    radius: 10,
                    lineWidth: 3,
                    stroke: '#4995FD',
                    strokeOpacity: 1
                },
            },
            defaultCombo: {
                type: 'rect',
                padding: this.nodeSize/2.5,
                style: {
                    fill: '',
                    stroke: '#52960B',
                    lineWidth: 1,
                    lineDash: [2, 3]
                },
                labelCfg: NodeLabelCfg
            },
        });
    }

    tooltipRender = () => {
        return new G6.Tooltip({
            className: 'topo-tooltip-wrap',
            itemTypes: ['edge'],
            offsetX: 10,
            offsetY: 10,
            // trigger: 'click',
            getContent: (e: any) => {
                return this.tooltipContent(e);
            },
        });
    }

    // 弹窗
    tooltipContent = (e) => {
        let model = e?.item?.getModel();
        let sourceLabel =  this.data.nodes?.find(item => item.id == model.source)?.label;
        let targetLabel =  this.data.nodes?.find(item => item.id == model.target)?.label;
        const outDiv = document.createElement('div');
        outDiv.innerHTML = `
            <div class="top">
                <div class="title">链路信息</div>
                <span class="status">状态：
                    ${model.params?.status ? `<div class='normal-icon'></div>正常` : `<div class='error-icon'></div>异常`}
                </span>
            </div>
            <div class="content">
                <div class="text text-title" title="${sourceLabel}-->${targetLabel}">
                    ${sourceLabel}<div class="arrow"></div>${targetLabel}
                </div>
                <div class="text">
                    <label>邻接标签：</label>
                    <span class="text-label" title="${model.params?.label || ''}">${model.params?.label || '-'}</span>
                </div>
            </div>
            <div class="footer">
                <div class="circle"><div class="circle-out blue">
                        <div class="circle-in blue" title="${model.params?.lan || ''}">${model.params?.lan || '0.00'}</div>
                </div><p>宽带(Gbps)</p></div>
                <div class="circle"><div class="circle-out green">
                    <div class="circle-in green" title="${model.params?.data || ''}">${model.params?.data || '0.00'}</div>
                </div><p>实时流量(Kbs)</p></div>
                <div class="circle"><div class="circle-out purple">
                    <div class="circle-in purple" title="${model.params?.latency || ''}">${model.params?.latency || '0.00'}</div>
                </div><p>实时时延(ms)</p></div>
            </div>
        `
        return outDiv
    }

    initRender = async () => {
        await this.initSize();
        this.graphRender();
        this.graph.data(this.getData());
        this.graph.render();
        this.initEvent();
    }
    // 配置画布中位置大小阈值等信息
    initSize = async () => {
        this.containerWidth = document.getElementById('container')?.scrollWidth || ContainerWidth;
        this.nodeSize = (this.containerWidth / 12);
        this.largeNodeSize = (this.containerWidth / 10);
        this.containerHeight = (this.largeNodeSize * 3 + this.nodeSize * 4) || ContainerHeight;
    }
    // 配置基础事件
    initEvent = () => {
        this.graph.on('edge:mouseenter', (e) => {
            this.graph?.cfg?.edges?.forEach(item => {
                if (item.getModel()?.style?.strokeOpacity) item.getModel().style.strokeOpacity = 0.5;
            });
            let model = e.item.getModel();
            model.style.lineWidth = 6;
            model.style.strokeOpacity = 1;
            this.graph.render();
        });
        this.graph.on('edge:mouseleave', (e) => {
            this.graph?.cfg?.edges?.forEach(item => {
                if (item.getModel()?.style?.strokeOpacity) item.getModel().style.strokeOpacity = 1;
            });
            let model = e.item.getModel();
            model.style.lineWidth = 3;
            this.graph.render();
        });
    }

    async componentWillReceiveProps(nextProps: Readonly<Props>) {
        if (this.props == nextProps) return;
        await this.setState({
            topoChartInfo: nextProps.topoChartInfo
        });
        this.initRender();
    }

    componentWillUnmount() {

    }

    // 画布自适应宽高？
    changeSizeByResize = () => {
        let container = document.getElementById('container');
        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!this.graph || this.graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                this.graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
    }

    render() {
        return (
            <div className="topo-chart-wrap">
                <div className={'topo-chart-container'} id={'container'} />
            </div>
        );
    }
}
