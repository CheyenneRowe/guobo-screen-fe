export const LargeNodeLabelCfg = {
    style: {
        fill: '#ffffff',
        fontSize: '1rem'
    }
}
export const NodeLabelCfg = {
    style: {
        // fill: 'l(0) 0:#4397F8 1:#0076FF',
        fill: '#4397F8',
        fontSize: '0.9rem',
    }
}

export const TopoCombos = [{
    id: 'branchCombo',
    label: '分支',
}, {
    id: 'PCCombo',
    label: '总部',
}, {
    id: 'switchCombo',
    label: '白盒交换机网络',
}, {
    id: 'lightIpCombo',
    label: '光+IP设备',
}];

// 节点固定写死
export let SetTopoNodes = (containerWidth, largeNodeSize, nodeSize) => {
    return [{
        id: 'a',
        img: require('@src/common/assets/images/icon0.png'),
        label: '编排器',
        x: containerWidth / 2,
        y: largeNodeSize / 2,
        size: largeNodeSize,
        anchorPoints: [
            [0.5, 1],
        ],
        labelCfg: LargeNodeLabelCfg
    }, {
        id: 'cpe',
        img: require('@src/common/assets/images/icon1.png'),
        label: '边缘CPE控制器',
        x: containerWidth / 2 - largeNodeSize * 2,
        y: largeNodeSize * 2,
        size: largeNodeSize,
        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],
        labelCfg: LargeNodeLabelCfg
    }, {
        id: 'switch',
        img: require('@src/common/assets/images/icon2.png'),
        label: '骨干控制器',
        x: containerWidth / 2,
        y: largeNodeSize * 2,
        size: largeNodeSize,
        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],
        labelCfg: LargeNodeLabelCfg
    }, {
        id: 'lightIp',
        img: require('@src/common/assets/images/icon3.png'),
        label: '光+IP协同控制器',
        x: containerWidth / 2 + largeNodeSize * 2,
        y: largeNodeSize * 2,
        size: largeNodeSize,
        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],
        labelCfg: LargeNodeLabelCfg
    }, {
        id: 'switch0',
        img: require('@src/common/assets/images/icon4.png'),
        label: '骨干交换机',
        comboId: 'switchCombo',
        x: containerWidth / 2 - nodeSize,
        y: largeNodeSize * 3 + nodeSize,
    }, {
        id: 'switch1',
        img: require('@src/common/assets/images/icon4.png'),
        label: '骨干白盒交换机',
        comboId: 'switchCombo',
        x: containerWidth / 2 + nodeSize,
        y: largeNodeSize * 3 + nodeSize,
    }, {
        id: 'branch',
        img: require('@src/common/assets/images/icon4.png'),
        label: '视频源',
        comboId: 'branchCombo',
        x: containerWidth / 2 - largeNodeSize * 2 - nodeSize * 2,
        y: largeNodeSize * 3 + nodeSize * 2,
        anchorPoints: [
            [1, 0.5],
        ],
    }, {
        id: 'cpe0',
        img: require('@src/common/assets/images/icon4.png'),
        label: 'CPE设备',
        x: containerWidth / 2 - largeNodeSize * 2,
        y: largeNodeSize * 3 + nodeSize * 2,
    }, {
        id: 'cpe1',
        img: require('@src/common/assets/images/icon4.png'),
        label: 'CPE设备',
        x: containerWidth / 2 + largeNodeSize * 2,
        y: largeNodeSize * 3 + nodeSize * 2,
    }, {
        id: 'PC',
        img: require('@src/common/assets/images/icon4.png'),
        label: '客户端',
        comboId: 'PCCombo',
        x: containerWidth / 2 + largeNodeSize * 2 + nodeSize * 2,
        y: largeNodeSize * 3 + nodeSize * 2,
        anchorPoints: [
            [0, 0.5]
        ],
    }, {
        id: 'lightIp0',
        img: require('@src/common/assets/images/icon4.png'),
        label: '光+IP设备',
        comboId: 'lightIpCombo',
        x: containerWidth / 2 - nodeSize,
        y: largeNodeSize * 3 + nodeSize * 3,
    }, {
        id: 'lightIp1',
        img: require('@src/common/assets/images/icon4.png'),
        label: '光+IP设备',
        comboId: 'lightIpCombo',
        x: containerWidth / 2 + nodeSize,
        y: largeNodeSize * 3 + nodeSize * 3,
    }]
}
