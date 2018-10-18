import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import FieldGroup from '../../common/fieldGroup';
import GlobalConstants from '../../common/constants';
import AppError from "../../common/appError";

export default class CheckoutPage extends Component {

    constructor(props) {
        super(props);
        this.order = {
            itemName: props.itemToCheckout.itemName,
            sellerName: props.itemToCheckout.sellers[0],
            buyerName: localStorage.getItem(GlobalConstants.AUTH_USERNAME)
        };
    }

    onChangeValue(e, attribute) {
        this.order[attribute] = e.target.value;
    }

    placeOrder(e) {
        e.preventDefault();
        this.props.onSubmit(this.order);
    }

    cancel(e) {
        e.preventDefault();
        this.props.onCancel(this.props.itemToCheckout.category);
    }

    renderQuantityDropDown() {
        let quantityList = [];
        for (let i = 1; i <= 10; i++) {
            quantityList.push(<option key={i}>{i}</option>)
        }
        return quantityList;
    }

    render() {
        console.log(this.props);
        let quantityList = this.renderQuantityDropDown();
        return (
            <div className="container" style={{maxWidth: '40%'}}>
                {
                    this.props.status === "ERROR" &&
                    <AppError errorMessage="Could not place your order, please try again!"/>
                }
                <h3 className="text-center">Checkout</h3>
                <div><b>Item selected: </b> {this.props.itemToCheckout.itemName}</div>
                <form>
                    <FormGroup>
                        <ControlLabel>Quantity</ControlLabel>
                        <FormControl
                            id="quantity"
                            componentClass="select"
                            placeholder="select"
                            onChange={e => this.onChangeValue(e, "quantity")}>
                            {quantityList}
                        </FormControl>
                    </FormGroup>
                    <FieldGroup
                        id="deliveryAddress"
                        type="text"
                        label="Delivery Address"
                        onChange={e => this.onChangeValue(e, "deliveryAddress")}
                    />
                    <Button bsStyle="primary" type="submit" onClick={e => this.placeOrder(e)}>
                        Place Order
                    </Button>
                    <Button id="cancel" className="pull-right" onClick={e => this.cancel(e)}>
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }

}