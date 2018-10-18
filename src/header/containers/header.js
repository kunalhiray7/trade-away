import {connect} from 'react-redux'
import Header from '../components/header'
import {headerActions} from '../headerActions'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogout: () => {
            dispatch(headerActions.logoutUser())
        }
    };
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.navs.loggedIn
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
