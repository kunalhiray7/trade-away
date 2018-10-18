import React, {Component} from 'react';

export default class OrderConfirmation extends Component {

    render() {
        return(
            <div className="container" style={{maxWidth: '40%'}}>
                <h3 className="text-center">Order Confirmation</h3>
                <div>
                    <p>
                        Your order is successfully placed and the seller would process the order shortly.
                    </p>
                </div>
            </div>
        );
    }
}