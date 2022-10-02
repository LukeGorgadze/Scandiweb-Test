import React from "react";
import { BsCurrencyDollar, BsCart } from 'react-icons/bs'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//Redux
import { connect } from "react-redux";
import { setProducts, setId } from '../features/metaSlice'
import { setCurrency } from '../features/currencySlice'
import { addToCart, removeFromCart } from '../features/cartSlice'
import Navbar from "../components/Navbar";
class Product extends React.Component {


    state = {
        attributeState: [],
        uniqueId: "",
        allVals: null,
        isDefault: true,
    }
    componentDidUpdate() {
        if (this.state.allVals === null) {
            this.setInitialValue()
        }
        
    }

    componentDidMount(){
        this.getAllValueList().then(list => {
            this.setState({allVals:list})
        })

        // this.getUniqueId().then(id => {
        //     this.setState({uniqueId: id})
        // })
    }
    getAllValueList = async () => {
        // this.state.attributeState?.map(att => att.name)
        // console.log(this.state.myProduct, "Attributes")
        let list = this.props.attributes.map(attribute => {
            // console.log(attribute)
            return { attributeName: attribute.name, attributeVals: attribute.items }
        })
        return list
    }

    setInitialValue = async () => {
        await this.getAllValueList().then(list => this.setState({ allVals: list }))
    }

    getUniqueId = async () => {
        // let allValues = this.state.myProduct?.filter(prod => prod.id === )
        // console.log(this.state.myProduct?.attributes)
        // console.log(attributeName)
     
        // console.log(this.state.myProduct)
        // let attObject = { ...this.state.attributeState }
        // console.log(this.state.attributeState)
        let unId = this.props.name


        // this.setState({ attributeState: attObject })
        // this.setState({ isDefault: false })
        return unId
    }

    buttonOnClick = (id, attributeName, itemDisplayValue) => {
        this.getUniqueId(id, attributeName, itemDisplayValue).then(unId => {
            this.setState({ uniqueId: unId })

        })
        // console.log(unId)

    }
  
    setDescPage = (id) => {
        this.props.setId()
    }
    
    addToCartButton = async () => {
        let productItem = {
            Brand: this.props.brand,
            name: this.props.name,
            attributeState: this.state.attributeState,
            uniqueId: this.props.name,
            prices: this.props.prices,
            description: this.props.description,
            gallery: this.props.gallery,
            allVals: this.state.allVals
        }
        this.props.addToCart(productItem)
        console.log(productItem, "Before storing Product")
        console.log(this.state.uniqueId,"unique ID product")
    }
    render() {

        return (


            <div className="Product">
                {/* Image Place */}
                <Link className="Product-Link" to={`/description/${this.props.id}`}>
                    <div className="Product-Image">
                        <img src={this.props.pic} alt="" />
                    </div>
                    {!this.props.inStock && (
                        <div className="Product-OutStock">
                            <div className="Product-OutStock-Title">OUT OF STOCK</div>
                        </div>
                    )}
                </Link>


                <div className="Product-Name">
                    {this.props.name}
                </div>
                <div className="Product-Price">
                    {this.props.chosenPrices[0]?.amount + " " + this.props.chosenPrices[0]?.currency.symbol}

                </div>
                {this.props.inStock && (
                    <div className="Product-Cart"
                    onClick={this.addToCartButton}>
                        <BsCart />
                    </div>
                )}

            </div>

        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = { setProducts, setId, addToCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(Product);