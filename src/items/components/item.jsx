import React, {Component} from 'react';
import {Card, CardImg, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import {Button, Col, Row} from 'react-bootstrap';

export default class Item extends Component {

    buy(e) {
        e.preventDefault();
        this.props.onBuy(this.props.item);
    }

    render() {
        const imageStyle = {
            height: '100px',
            width: '100px'
        };
        const cardStyle = {
            border: '0px'
        };
        return (
            <div className="container">
                <Card>
                    <Row>
                        <Col sm={6}>
                            <Card block style={cardStyle}>
                                <div style={imageStyle}>
                                    <CardImg id="image" top height="100%" width="100%"
                                             src={this.props.item.imageUrl} alt="Card image cap"/>
                                </div>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card block style={cardStyle}>
                                <CardTitle>{this.props.item.itemName}</CardTitle>
                                <CardSubtitle>${this.props.item.price}</CardSubtitle>
                                <CardText>{this.props.item.description}</CardText>
                                <Button bsStyle="primary" className="pull-right" onClick={e => this.buy(e)}>Buy</Button>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <br/>
            </div>


        )
    }
}