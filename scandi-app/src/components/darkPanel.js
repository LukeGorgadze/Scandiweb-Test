import React from "react";
//Redux
import { connect } from "react-redux";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import {setCartOn,setCurrOn} from '../features/navBarSlice'

class DarkPanel extends React.Component{
    turnOff = () => {
        this.props.setCartOn(false)
        this.props.setCurrOn(false)
        this.props.closeDarkPanel()
    }

    render(){
        return (
            <div className="DarkPanel"
            onClick={this.turnOff}>
                
            </div>
        )
        
    }
}

const mapStateToProps = (state) => ({
    darkOn: state.darkPanel.value,
    cartOn: state.navBar.value.cartOn,
    currOn: state.navBar.value.currOn,
});

const mapDispatchToProps = { openDarkPanel, closeDarkPanel,setCartOn,setCurrOn};

export default connect(mapStateToProps, mapDispatchToProps)(DarkPanel);