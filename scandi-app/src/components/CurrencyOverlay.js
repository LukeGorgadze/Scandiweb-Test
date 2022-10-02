import React from "react";
import { client } from '../allAcross/client'
import { gql } from '@apollo/client'
//Redux
import { connect } from "react-redux";
import { setCurrency,setCurrencySymbol } from '../features/currencySlice'
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCartOn, setCurrOn } from '../features/navBarSlice'

class CurrencyOverlay extends React.Component {

    state = {
        currencies: [],
        currentCur: this.props.currentCurrency ,
        currentCurSybmol: this.props.currentCurrencySymbol || "$"
    }
    componentDidMount() {
        this.fetchData().then(resp => { this.setState({ currencies: resp.data.currencies }) })
        const curr = localStorage.getItem('currentCurrency')
        const currSym = localStorage.getItem('currentCurrencySymbol')
        console.log(curr)
        // if (curr !== null || curr !== undefined) {

        //     this.setState({ currentCur: curr })
            
        // }
        // if(currSym !== null || currSym !== undefined){

        //     this.setState({currentCurSybmol:currSym})
        // }
    }
    fetchData = async () => {
        let response = await client.query({
            query: gql`
          query{
            currencies{
              label
              symbol
            }
          }
        `,
        });

        return response
    }
    componentDidUpdate() {
        // console.log(this.props)
    }

    setMyCurrency = (cur) => {
        this.props.setCurrency(cur.label)
        this.props.setCurrencySymbol(cur.symbol)
        this.setState({ currentCur: cur })
        this.props.setCartOn(false)
        this.props.setCurrOn(false)
        this.props.closeDarkPanel()
        this.setState({currentCurSybmol:cur.symbol})
        // console.log(this.props)
    }



    render() {
        return (
            <div className="CurrencyOverlay">
                {this.state.currencies && this.state.currencies.map((curr, index) => {

                    return <button key={index} className="CurrencyOverlay-button"
                        onClick={() => this.setMyCurrency(curr)}>{curr.symbol} {curr.label}</button>
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currentCurrency: state.currency.value.currentCurrency,
    currentCurrencySymbol: state.currency.value.currentCurrencySymbol
});

const mapDispatchToProps = { setCurrency, setCurrencySymbol, openDarkPanel, closeDarkPanel, setCartOn, setCurrOn };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyOverlay);