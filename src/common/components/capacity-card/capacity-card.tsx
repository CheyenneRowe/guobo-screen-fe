import React from 'react';
import { Button, Row, Col, Avatar } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';

import "../../styles/widget.less";
import "../../styles/table.less";
import "./capacity-card.less"

function CapacityCard(props) {
    const cardData = props.cardData;
    const cardClick = (value) => props.clickInfo(value);
    return (
        <div className='ability-card' onClick={() => { cardClick(cardData) }}>
            <div className='ability-content'>
                <Row align={"middle"}>
                    {/* <Col>
                        选泽
                    </Col> */}
                    <Col offset={1} span={2} className='col-image'>
                        <Avatar shape="square" size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col className='col-text'>
                        <p style={{ fontSize: '20px', fontWeight: 500, padding: '0 0 10px 0' }}>{cardData.name}</p>
                        <p>{cardData.info}</p>
                    </Col>
                </Row>
                <Row>
                    <Col offset={1} span={2} className='col-image'>
                        应用次数{cardData.applicationsNum}
                    </Col>
                    <Col className='col-text'>
                        <span className='card-col'>能力类别：{cardData.capacityType}</span>
                        <span className='card-col'>可用区：{cardData.availabilityZone}</span>
                        <span className='card-col'>服务商：{cardData.serverVendor}</span>
                        <span className='card-col'>上架时间：{cardData.eventTime}</span>
                    </Col>
                </Row>
            </div>
            <div className='ability-button'>
                <Button size="large" type="primary">立即部署</Button>
            </div>
        </div>

    )
}

export default CapacityCard;
