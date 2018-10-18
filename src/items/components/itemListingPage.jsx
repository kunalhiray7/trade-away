import React, {Component} from 'react';
import Item from "./item";

export default class ItemListing extends Component {

    componentDidMount() {
        this.props.loadItems(this.props.currentCategory);
    }

    render() {

        const items = this.props.items.map((item) => {
            return <Item item={item} onBuy={this.props.onBuy} key={item.itemName}/>
        });

        return (
            <div className="container">
                <h1 id="title">Category: {this.props.currentCategory}</h1>
                <div id="item-list">
                    {items}
                </div>
            </div>
        );
    }
}