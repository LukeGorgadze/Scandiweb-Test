import React from "react";
import ProductPanel from '../components/ProductPanel'
import Navbar from "../components/Navbar";

//Redux
import { connect } from "react-redux";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCartOn, setCurrOn, setCurrentPath } from '../features/navBarSlice'
import { setCurrency, setCurrencySymbol } from '../features/currencySlice'
import { setProducts, setId, incCounter } from '../features/metaSlice'
class CategoryPage extends React.Component {

    // console.log(this.props.mode)
    state = {
        path: ''
    }
    componentDidMount() {

    }
    componentWillUpdate() {
        if (this.state.path !== this.props.CurrentPath) {
            this.setState({ path: this.props.CurrentPath })
        }
        // this.updatePath()
    }

    updatePath = () => {
        // this.props.setCurrentPath(window.location.pathname)
        this.setState({path:window.location.path})
    }

    render() {
        return (
            <>
                <ProductPanel mode={this.props.mode} updatePath = {this.updatePath} />
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    darkOn: state.darkPanel.value,
    cartOn: state.navBar.value.cartOn,
    currOn: state.navBar.value.currOn,
    metaProducts: state.metaData.value,
    currentCurrency: state.currency.value.currentCurrency,
    currentCurrencySymbol: state.currency.value.currentCurrencySymbol,
    counter: state.metaData.value,
    CurrentPath: state.navBar.value
});

const mapDispatchToProps = { openDarkPanel, closeDarkPanel, setCartOn, setCurrOn, setProducts, setId, setCurrency, setCurrencySymbol, setCurrentPath };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
