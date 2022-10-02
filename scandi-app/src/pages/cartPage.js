import React from "react";
import BigCartItem from "../components/bigCartItem";
//Redux
import { connect } from "react-redux";
import { setProducts, setId } from '../features/metaSlice'
import { setCurrency } from '../features/currencySlice'
import { addToCart, removeFromCart, emptyCart  } from '../features/cartSlice'
import Navbar from "../components/Navbar";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCartOn, setCurrOn } from '../features/navBarSlice'
class CartPage extends React.Component {

    state = {
        CartItems: [],
        TotalPrice: 0,
        currencySymbol: "",
        currency: "",
        quantity: 0,
        updateVar: false
    }

    componentDidMount() {
        const cartItems = localStorage.getItem('CartItems');
        let r = JSON.parse(cartItems)
        // console.log(r?.Items)
        this.setState({ CartItems: r?.Items })
        this.setState({ currency: this.props.currentCur })
        this.calculateTotalPrice(r?.Items)
        this.countQuantity(r?.Items)

    }
    componentDidUpdate() {
        let cartItemsReal = this.props.cart.Items
        console.log(this.props.cart.cartItems, "CART ITEMS Cart Page")
        if (cartItemsReal === [] && this.state.CartItems !== []) {
            this.setState({ CartItems: [] })
        }

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
    updateMe = () => {
        this.setState({ updateVar: !this.state.updateVar })
        const cartItems = localStorage.getItem('CartItems');
        let r = JSON.parse(cartItems)
        // console.log(r?.Items)
        this.setState({ CartItems: r?.Items })
        this.calculateTotalPrice()
        this.countQuantity()
        console.log("Update cartPage")
    }
    resetCartButton = () => {
        this.setState({ CartItems: [] })
        this.props.emptyCart()
        this.calculateTotalPrice([])
        this.countQuantity([])
        this.updateMe()
        this.props.setCartOn(false)
        this.props.closeDarkPanel()

    }
    render() {

        let totalPrice = this.state.TotalPrice
        let tax = (this.state.TotalPrice * 21.0 / 100.0)
        let totalWithTax = totalPrice + tax
        return (
            <>
                <Navbar key={this.state.quantity} updateCart={this.updateMe} />
                <div className="bigCart-Container" key={this.state.updateVar}>
                    {
                        console.log("HEy")
                    }
                    <div className="bigCart-Header">CART</div>
                    <div className="bigCart-Cart" key={this.props.cart}>
                        {this.state.CartItems?.map((cartItem, index) => {
                            let price = cartItem?.prices?.filter(price => price.currency.label === this.props.currentCur)[0]
                            console.log(cartItem.gallery, "cartPage Gallery")
                            return <BigCartItem key={index} brand={cartItem?.Brand} name={cartItem?.name}
                                priceSymbol={price?.currency?.symbol} priceAmount={price?.amount} attributes={cartItem.attributeState}
                                quantity={cartItem.quantity} gallery={cartItem.gallery} allVals={cartItem.allVals} uniqueId={cartItem.uniqueId}
                                prices={cartItem.prices} description={cartItem.description} updatePrice={this.updatePrice} />
                        })}
                    </div>

                    <div className="bigCart-Footer">
                        {
                          
                        
                        (
                            
                            <div>
                                <div>Tax 21%: <div className="Tax">{this.state.TotalPrice? this.state.currencySymbol + " " + tax.toFixed(2): 0}</div></div>
                                <div>Quantity: <div className="Quantity">{this.state.quantity? this.state.quantity:0}</div></div>
                                <div>Total: <div className="Total">{this.state.TotalPrice? this.state.currencySymbol + " " + totalPrice.toFixed(2):0}</div></div>
                                <button className="bigCart-Button" 
                                onClick={this.resetCartButton}>ORDER</button>
                            </div>
                        )

                        }

                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    metaProducts: state.metaData.value,
    currentCur: state.currency.value.currentCurrency,
    cart: state.cart.value

});

const mapDispatchToProps = { setProducts, setId, addToCart, removeFromCart, emptyCart, openDarkPanel, closeDarkPanel, setCartOn, setCurrOn };

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);