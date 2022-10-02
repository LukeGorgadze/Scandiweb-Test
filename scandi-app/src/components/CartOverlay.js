import React from "react";
import CartItem from './CartItem'
//Redux
import { connect } from "react-redux";
import { setProducts, setId } from '../features/metaSlice'
import { setCurrency } from '../features/currencySlice'
import { addToCart, removeFromCart, emptyCart } from '../features/cartSlice'
import { Link } from "react-router-dom";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCartOn, setCurrOn } from '../features/navBarSlice'
export class CartOverlay extends React.Component {
    state = {
        CartItems: [],
        TotalPrice: 0,
        currencySymbol: "",
        currency: "",
        quantity: 0,
    }

    componentDidMount() {
        const cartItems = localStorage.getItem('CartItems');
        let r = JSON.parse(cartItems)
        // console.log(r?.Items)
        this.setState({ CartItems: r?.Items })
        this.setState({ currency: this.props.currentCur })
        this.calculateTotalPrice(r?.Items)
        this.countQuantity(r?.Items)
        if (r) {
            let amount = 0
            r.Items.forEach(item => {
                amount += item.quantity
            })
            this.setState({ quantity: amount })
        }

    }
    componentDidUpdate() {
        console.log(this.state.CartItems, "CART ITEMS Cart Overlay")
        if (this.props.currentCur !== this.state.currency) {
            this.calculateTotalPrice(this.state.CartItems)
            this.setState({ currency: this.props.currentCur })
        }

        // let price = this.calculateTotalPrice(this.state.CartItems)
        // if(this.state.TotalPrice !== price)
        // {
        // this.setState({TotalPrice:price})
        // }


    }
    calculateTotalPrice = (cartItems) => {
        let currSymbol = ""
        let priceList = cartItems?.map(item => {
            return item?.prices?.filter(price => price.currency.label === this.props.currentCur).map(res => {
                currSymbol = res.currency.symbol
                return res.amount * item?.quantity
            })[0]
        })
        this.setState({ currencySymbol: currSymbol })

        // console.log(priceList)
        const totalPrice = priceList?.reduce((prevValue, curValue) => {
            // console.log(prevValue + curValue.amount)
            return (prevValue + curValue)
        }, 0)
        // console.log(totalPrice)
        this.setState({ TotalPrice: totalPrice })
        // console.log(totalPrice)
    }

    getItemsFromStorage = async () => {
        const cartItems = localStorage.getItem('CartItems');
        let r = JSON.parse(cartItems)
        return r
    }

    updatePrice = () => {
        this.getItemsFromStorage().then(r => {
            // this.setState({ CartItems: r?.Items })
            this.calculateTotalPrice(r?.Items)
            this.countQuantity(r?.Items)
        })
        // console.log(r?.Items)

    }

    countQuantity = (cartItems) => {
        let quantityList = cartItems?.map(item => {
            return item?.quantity
        })
        // console.log(quantityList)
        let num = quantityList?.reduce((prevValue, currValue) => {
            return prevValue + currValue
        }, 0)

        this.setState({ quantity: num })
    }
    resetCartButton = () => {
        this.setState({ CartItems: [] })
        this.props.emptyCart()
        this.calculateTotalPrice([])
        this.countQuantity([])
        if (this.props.updateCart) {
            this.props.updateCart()
        }
        this.props.setCartOn(false)
        this.props.closeDarkPanel()
        // console.log(this.props)
        // localStorage.setItem('AllVals', JSON.stringify(productItem.allVals));




        // console.log(produ)
        // console.log(this.props.cart)
    }
    render() {
        return (
            <div className="CartOverlayContainer">
                <div className="CartOverlay-Title">
                    {`My Bag, ${this.state.quantity ? this.state.quantity : 0} items`}
                </div>
                <div className="CartOverlay">
                    {/* <CartItem /> */}
                    {console.log(this.state.CartItems)}
                    {this.state.CartItems?.map((cartItem, index) => {
                        let price = cartItem?.prices?.filter(price => price.currency.label === this.props.currentCur)[0]
                        return <CartItem key={index} brand={cartItem?.Brand} name={cartItem?.name}
                            priceSymbol={price?.currency?.symbol} priceAmount={price?.amount} attributes={cartItem.attributeState}
                            quantity={cartItem.quantity} gallery={cartItem.gallery} allVals={cartItem.allVals} uniqueId={cartItem.uniqueId}
                            prices={cartItem.prices} description={cartItem.description} updatePrice={this.updatePrice} updateCart={this.props.updateCart} />
                    })}

                </div>
                <div className="CartOverlay-Footer">
                    <div className="CartOverlay-Price-Section">
                        <div>Total</div>
                        <div>{this.state.TotalPrice ? (this.state.currencySymbol + " " + this.state.TotalPrice?.toFixed(2)) : "0"}</div>
                    </div>
                    <div className="CartOverlay-Button-Section">
                        <div className="CartOverlay-Button-cont">
                            <Link to={"/cartPage"} className="CartOverlay-Button-View" onClick={() => {
                                this.props.closeDarkPanel(); this.props.setCartOn(false)
                            }}>VIEW BAG</Link>
                        </div>
                        <div className="CartOverlay-Button-cont">
                            <button className="CartOverlay-Button-Checkout"
                                onClick={this.resetCartButton}>CHECK OUT</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    metaProducts: state.metaData.value,
    currentCur: state.currency.value.currentCurrency,
    cart: state.cart.value

});

const mapDispatchToProps = { setProducts, setId, addToCart, removeFromCart, emptyCart, openDarkPanel, closeDarkPanel, setCartOn, setCurrOn };

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);