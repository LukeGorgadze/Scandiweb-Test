import React from "react";
import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
//Redux
import { connect } from "react-redux";
import { setProducts, setId } from '../features/metaSlice'
import { setCurrency } from '../features/currencySlice'
import { addToCart, removeFromCart } from '../features/cartSlice'
class BigCartItem extends React.Component {

    state = {
        attributeState: null,
        counter:0,
        prevCounter:0,
    }
    componentDidMount() {
        // console.log(this.props.attributes)

        // console.log(list)
        // console.log(list)
        this.getAttributes()
        this.setState({counter: this.props.quantity})


    }

    componentDidUpdate() {
        // console.log(this.state.attributeState)
        if (this.state.attributeState == null) {
            this.getAttributes()
        }

        if(this.state.counter !== this.state.prevCounter){
            this.setState({prevCounter:this.state.counter})
        }


    }

    getAttributes = () => {
        let attObject = { ...this.props.attributes }
        let list = []
        for (var key in attObject) {
            list[key] = attObject[key]
        }
        // console.log(list)
        var arr = Object.keys(list);
        // console.log(arr)
        // console.log(list[arr])
        // arr.forEach(v => console.log(list[v]))
        this.setState({ attributeState: list })

    }

    addToCartButton = () => {

        let productItem = {
            Brand: this.props.brand,
            name: this.props.name,
            attributeState: this.props.attributes,
            uniqueId: this.props.uniqueId,
            prices: this.props.prices,
            description: this.props.description,
            gallery: this.props.gallery,
            allVals: this.props.allVals
        }
        this.props.addToCart(productItem)
        console.log(productItem)
        this.setState({counter: this.state.counter + 1})
        this.props.updatePrice()
        // console.log(productItem,"Before storing")
    }
    removeFromCartButton = () => {

        let productItem = {
            Brand: this.props.brand,
            name: this.props.name,
            attributeState: this.props.attributes,
            uniqueId: this.props.uniqueId,
            prices: this.props.prices,
            description: this.props.description,
            gallery: this.props.gallery,
            allVals: this.props.allVals
        }
        this.props.removeFromCart(productItem)
        console.log(productItem)
        this.setState({counter: this.state.counter - 1})
        this.props.updatePrice()
        // console.log(productItem,"Before storing")
    }


    render() {

        // let attributeList = [...this.props.attributes]
        // console.log(this.state.attributeState)
        // console.log(this.state.attributeState)
        // console.log(this.props.gallery, this.props.name)
        // console.log(this.props.allVals)
        return (
            (this.state.counter > 0 && (
                <div className="bigCart-Cart-Item">
                <div className="bigCart-Cart-Item-Info">
                    <div className="bigCart-Cart-Item-Info-Header">{this.props.brand}</div>
                    <div className="bigCart-Cart-Item-Info-Title">{this.props.name}</div>
                    <div className="bigCart-Cart-Item-Info-Price">{this.props.priceSymbol} {this.props.priceAmount}</div>

                    <div className="bigCart-Cart-Item-Info-Attributes">
                        {
                            this.props.allVals.map((val, index) => {
                                return (
                                    <div key={index} className = 'attribute-content'>
                                        <div key={index} className="name">
                                            {val.attributeName.toUpperCase()}
                                        </div>
                                        {val.attributeName === 'Color' && (
                                            <div className="attribute-section">
                                                {val.attributeVals.map((v, index) => {
                                                    // let isChosen = true
                                                    // console.log(this.state.attributeState)
                                                    // if(this.state.attributeState)
                                                    // {
                                                    //     console.log(val.attributeName,"att name")
                                                    //     console.log(this.state.attributeState,"aatts")
                                                    //     console.log(this.state.attributeState[val.attributeName],"attstate with name")
                                                    // }
                                                    let isChosen = false;
                                                    let hasVal;
                                                    if (this.state.attributeState) {
                                                        hasVal = this.state.attributeState[val.attributeName] 
                                                        isChosen = this.state.attributeState[val.attributeName]?.id === v.displayValue
                                                        // console.log(`Attribute Name Chosen Value: ${this.state.attributeState[val.attributeName]?.id} ---- ${v.displayValue}`)
                                                    }
                                                    return (

                                                        <div className={isChosen ? `bigCart-Cart-Item-Info-Attributes-Color-active` : !hasVal && index === 0 ? `bigCart-Cart-Item-Info-Attributes-Color-active`: `bigCart-Cart-Item-Info-Attributes-Color`} key={index}
                                                            style={{
                                                                backgroundColor: `${v.value}`,
                                                            }}></div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        {val.attributeName !== 'Color' && (
                                            <div className="attribute-section">
                                                {val.attributeVals.map((v, index) => {
                                                    let isChosen = false;
                                                    let hasVal;
                                                    if (this.state.attributeState) {

                                                        isChosen = this.state.attributeState[val.attributeName]?.id === v.displayValue
                                                        hasVal = this.state.attributeState[val.attributeName] 
                                                        // console.log(`Attribute Name Chosen Value: ${this.state.attributeState[val.attributeName]?.id} ---- ${v.displayValue}`)
                                                    }
                                                    return (

                                                        <div className={isChosen ? `bigCart-Cart-Item-Info-Attributes-atts-active` : !hasVal && index === 0 ? `bigCart-Cart-Item-Info-Attributes-atts-active`: `bigCart-Cart-Item-Info-Attributes-atts`} key={index}>
                                                            {v.value}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }
                        {/* {String(this.state.attributeState)} */}

                    </div>

                </div>

                <div className="bigCart-Cart-Item-Info-AddNimages">
                    <div className="bigCart-Cart-Item-AddSection">
                        <button className="Plus"
                        onClick={this.addToCartButton}><BsPlus /></button>
                        <div className="Amount">{this.state.counter}</div>
                        <button className="Minus"
                         onClick={this.removeFromCartButton}><BiMinus /></button>
                    </div>
                    <div className="bigCart-Cart-Item-Images">
                   
                        <img src={this.props.gallery && this.props.gallery[0]} alt="" />
                    </div>
                </div>


            </div >
        )
            ))
            
    }
}
const mapStateToProps = (state) => ({
    metaProducts: state.metaData.value,
    currentCur: state.currency.value.currentCurrency,
    cart: state.cart.value

});

const mapDispatchToProps = { setProducts, setId, addToCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(BigCartItem);