import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import GlobalConstants from '../../common/constants';

export default class CategoryPage extends Component {

    componentDidMount() {
        this.props.loadCategories();
    }

    componentWillReceiveProps(props) {
        //console.log("componentWillReceiveProps",props);
    }

    renderOptions(){
        let list = [];
        this.props.categories.forEach((category, index) =>
            {

                list.push(<option key={index}>{category.categoryName}</option>)
            }

        );
        return list;
    }

    onSelectCategory(e) {
        const selectedCategory = e.target.value;
        this.props.navigateToItemListing(selectedCategory);
    }

    render() {
        let list = this.renderOptions();
        return (<div className="container">
            <div>
                <h3>Welcome</h3>
                <label id="username" className="h4">{localStorage.getItem(GlobalConstants.AUTH_NAME)}</label>

            </div>
            <FormGroup>
                <ControlLabel>Categories</ControlLabel>
                <FormControl id="categories" componentClass="select" placeholder="select"
                             onChange={(e) => this.onSelectCategory(e)}>

                    {list}


                </FormControl>
            </FormGroup>
        </div>);
    }
}