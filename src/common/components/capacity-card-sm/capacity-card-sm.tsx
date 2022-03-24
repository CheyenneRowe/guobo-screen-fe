import React from 'react';
import { Avatar } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';

import "../../styles/widget.less";
import "../../styles/table.less";
import "../../styles/widget.less";
import "./capacity-card-sm.less";

function CapacityCardSm(props) {
    const cardData = props.cardData;
    function cardClick(value) {
        props.clickInfo(value);
    }
    return (
        <div className='capacity-content' onClick={() => { cardClick(cardData) }}>
            <div className="content-top">
                <div>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                </div>
                <div>
                    <p>{cardData.name}</p>
                    <p>{cardData.info}</p>
                </div>
            </div>
            <div className="content-bottom">
                <span>能力类别：{cardData.capacityType}</span>
                <span>服务商：{cardData.serverVendor}</span>
                <span>上架时间：{cardData.eventTime}</span>
            </div>
        </div>
    )
}

export default CapacityCardSm;