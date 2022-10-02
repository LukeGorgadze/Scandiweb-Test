import React from "react";
import Logo from '../imgs/Logo.png'
import { BsCurrencyDollar, BsCart } from 'react-icons/bs'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { CustomButtonLink } from "./CustomButton";
import { client } from '../allAcross/client'
import { from, gql } from '@apollo/client'
import CartOverlay from './CartOverlay'
import CurrencyOverlay from './CurrencyOverlay'
import DarkPanel from './darkPanel'
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCartOn, setCurrOn } from '../features/navBarSlice'
import { setCurrency, setCurrencySymbol } from '../features/currencySlice'
import { setProducts, setId, incCounter } from '../features/metaSlice'

class Navbar extends React.Component {
    state = {
        CategoryList: [],
        url: "",
        counter: 0
    }

    componentDidMount() {
        this.fetchMainData().then(response => { this.setCategories(); this.setMetaData(response); })
        this.setUrl()

    }

    componentDidUpdate() {
        // if(window.location.pathname !== this.state.url){
        //     console.log(window.location.pathname)
        //     this.setState({url:window.location.pathname})
        // }
        // console.log("NAVBAR UPDATE")
        if (this.props.path !== this.state.url) {
            this.setState({ url: this.props.path })
        }
        
    }

    fetchMainData = async () => {
        let response = await client.query({
            query: gql`
              query{
                categories{
                  name
                  products{
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    attributes{
                      id
                      name
                      type
                      items{
                        displayValue
                        value
                        id
                      }
                    }
                    prices{
                      currency{
                        label
                        symbol
                      }
                      amount
                    }
                    brand
                  }
                }
                }
        `,
        });
        // console.log(response)
        // this.setCategory()
        return response
    }
    getAllProducts = async (data) => {
        let productList = []

        data.data.categories.filter(cat => cat.name !== 'all').forEach(cat => {
            cat.products.forEach(product => {
                productList.push(product)
            })
        });
        // console.log(productList)
        return productList
    }

    setMetaData = (data) => {
        this.getAllProducts(data).then(response => {
            this.props.setProducts(response)
            // this.filterData(response)
        })
    }





    setUrl = () => {
        const path = window.location.pathname
        this.setState({ url: path })
        // console.log(this.state.url)
    }
    fetchData = async () => {
        const response = await client.query({
            query: gql`
            query{
                categories{
                  name
                }
              }
      `,
        })
        return response
    }
    setCategories = async () => {
        const List = await this.fetchData()
        this.setState({ CategoryList: List.data.categories })

    }

    toggleCartOn = () => {
        console.log(this.props.cartOn)
        if (!this.props.cartOn || this.props.currOn) {
            this.props.openDarkPanel()
        }
        else {
            this.props.closeDarkPanel()
        }
        this.props.setCurrOn(false)
        this.props.setCartOn(!this.props.cartOn)
    }
    toggleCurrOn = () => {
        console.log(this.props.currOn)
        if (!this.props.currOn || this.props.cartOn) {
            this.props.openDarkPanel()
        }
        else {
            this.props.closeDarkPanel()
        }
        this.props.setCurrOn(!this.props.currOn)
        this.props.setCartOn(false)


    }

    // componentDidMount() {

    // }
    countQuantity = (cartItems) => {
        let quantityList = cartItems?.map(item => {
            return item?.quantity
        })
        // console.log(quantityList)
        let num = quantityList?.reduce((prevValue, currValue) => {
            return prevValue + currValue
        }, 0)

        return num
        // this.setState({ quantity: num })
    }

    render() {
        let n = this.countQuantity(this.props.cart.cartItems)
        return (
            <div className="Navigation">
                {this.props.darkOn && <DarkPanel />}
                <div className="NavOuter">
                    <div className="Navbar">
                        <div className="Navbar-Category"
                            onClick={this.setUrl}>
                            {this.state.CategoryList.map((el, index) => {
                                return (<CustomButtonLink key={index} name={el.name} to={`/${el.name}`}
                                >
                                    {el.name.toUpperCase()}
                                </CustomButtonLink>)
                            })}
                        </div>
                        <div className="Navbar-Logo-Section">
                            <Link to={`/`}>
                                <img src={Logo} alt="" className="Navbar-Logo" />
                            </Link>
                        </div>
                        <div className="Navbar-Cart-Section">
                            <button className="myButton"
                                onClick={this.toggleCurrOn}>
                                <div className="currencySymbol">{this.props.currentCurrencySymbol}</div>
                                <MdKeyboardArrowDown />
                            </button>
                            <button className="myButton"
                                onClick={this.toggleCartOn}>
                                <div className="cartIcon">
                                    <BsCart />
                                    <div className="cart-Counter">{n}</div>
                                </div>


                            </button>
                        </div>

                    </div>
                    {/* <p>aaaaaaaaaaaaaaaa{String(this.props.darkOn)}</p> */}
                    {this.props.cartOn && <CartOverlay updateCart = {this.props.updateCart}/>}
                    {this.props.currOn && <CurrencyOverlay />}

                </div>
            </div>
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
    cart: state.cart.value
});

const mapDispatchToProps = { openDarkPanel, closeDarkPanel, setCartOn, setCurrOn, setProducts, setId, setCurrency, setCurrencySymbol };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);