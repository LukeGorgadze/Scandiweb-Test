import React from "react";

//Redux
import { connect } from "react-redux";
import { setProducts, setId } from '../features/metaSlice'
import { setCurrency } from '../features/currencySlice'
import { addToCart, removeFromCart } from '../features/cartSlice'
import Navbar from "../components/Navbar";
class DescriptionPage extends React.Component {

    state = {
        myProduct: null,
        id: "",
        mainImg: null,
        attributeState: [],
        uniqueId: "",
        allVals: null,
        isDefault: true,
    }
    componentDidMount() {
        let path = window.location.pathname.split(`/`)
        let id = path[2]
        this.setState({ id: id })
        this.setState({ uniqueId: id })

    }
    componentDidUpdate() {
        // console.log(this.state.id)
        if (this.state.myProduct === null) {
            this.getMyProduct().then(resp => { this.setMyProduct(resp); console.log(resp) })

        }

        if (this.state.allVals === null && this.state.myProduct !== null) {
            this.setInitialValue()
        }

        // console.log(this.state.attributeState)
    }
    getMyProduct = async () => {

        let myProduct = await this.props.metaProducts.products.filter(prod => prod.id === this.state.id)
        return myProduct
    }
    setMyProduct = (prod) => {
        if (prod.length > 0) {
            // console.log(prod)
            this.setState({ myProduct: prod[0] })
            this.setState({ mainImg: prod[0].gallery[0] })
        }
    }
    changeImg = (im) => {
        this.setState({ mainImg: im })
    }

    getAllValueList = async () => {
        // this.state.attributeState?.map(att => att.name)
        // console.log(this.state.myProduct, "Attributes")
        let list = this.state.myProduct?.attributes.map(attribute => {
            // console.log(attribute)
            return { attributeName: attribute.name, attributeVals: attribute.items }
        })
        // console.log(list,"New List")

        return list


    }

    setInitialValue = async () => {

        // attObject = {allValues}
        // console.log(list)
        await this.getAllValueList().then(list => this.setState({ allVals: list }))


    }

    getUniqueId = async (id, attributeName, itemDisplayValue) => {
        // let allValues = this.state.myProduct?.filter(prod => prod.id === )
        // console.log(this.state.myProduct?.attributes)
        // console.log(attributeName)
        const allValues = this.state.myProduct?.attributes.filter(attribute => attribute.id === attributeName).map(att => att.items)
        // console.log(this.state.myProduct)
        let attObject = { ...this.state.attributeState }
        attObject[attributeName] = { id, displayValue: itemDisplayValue, allValues: allValues }
        // console.log(this.state.attributeState)
        let unId = this.state.myProduct.name

        for (var key in attObject) {
            let obb = { ...attObject[key] }
            unId += String(key) + ": " + JSON.stringify(obb) + " "
        }

        this.setState({ attributeState: attObject })
        this.setState({ isDefault: false })
        return unId
    }

    buttonOnClick = (id, attributeName, itemDisplayValue) => {
        this.getUniqueId(id, attributeName, itemDisplayValue).then(unId => {
            this.setState({ uniqueId: unId })

        })
        // console.log(unId)

    }

    getMyProductItem = async (allvals) => {
        let productItem = {
            Brand: this.state.myProduct?.brand,
            name: this.state.myProduct?.name,
            attributeState: this.state.attributeState,
            uniqueId: this.state.uniqueId,
            prices: this.state.myProduct?.prices,
            description: this.state.myProduct?.description,
            gallery: this.state.myProduct?.gallery,
            allVals: allvals

        }
        return productItem
    }

    addToCartButton = async () => {
        // console.log(this.state.attributeState)
        // console.log(this.state.allVals,"Check List State")
        // await this.getMyProductItem(allvals).then(prod => {
        //     console.log(prod.allVals,"allvals inside")
        //     console.log(this.state.allVals, "Fetched AllValues")
        //     this.props.addToCart(prod)
        // })

        let productItem = {
            Brand: this.state.myProduct?.brand,
            name: this.state.myProduct?.name,
            attributeState: this.state.attributeState,
            uniqueId: this.state.uniqueId,
            prices: this.state.myProduct?.prices,
            description: this.state.myProduct?.description,
            gallery: this.state.myProduct?.gallery,
            allVals: this.state.allVals,
        }
        this.props.addToCart(productItem)
        console.log(productItem, "Before storing")

        // localStorage.setItem('AllVals', JSON.stringify(productItem.allVals));




        // console.log(produ)
        // console.log(this.props.cart)
    }

    render() {
        // console.log(this.state.myProduct, 'AEE')
        let price = this.state.myProduct?.prices.filter(price => price.currency.label === this.props.currentCur)[0]
        // console.log(price)

        // console.log(this.props.currentCur)

        return (
            <>
                <Navbar key={this.state.uniqueId} />


                <div className="desc-Container">

                    <div className="desc-Images">

                        <div className="desc-Images-Tinies">
                            {this.state.myProduct?.gallery.map((pic, index) => {
                                return <div key={index} className="desc-Images-Tinies-div">
                                    <img className="desc-Images-Tinies-img" src={pic} alt="" onClick={() => this.changeImg(pic)} />
                                </div>
                            })}
                        </div>


                        <div className="desc-Images-Big">
                            <img className="desc-Images-Big-img" src={this.state.mainImg} alt="" />
                        </div>

                    </div>

                    <div className="desc-Info">
                        <div className="desc-Info-Header">
                            <div className="desc-Info-Header-Title">{this.state.myProduct?.brand}</div>
                            <div className="desc-Info-Header-Name">{this.state.myProduct?.name}</div>
                        </div>


                        <div>
                            {
                                this.state.myProduct?.attributes.map((attribute, index) => {
                                    // console.log(attribute)
                                    return (
                                        <div key={index} className="attribute">
                                            <div className="attribute-name">{attribute.name}</div>
                                            <div className="attribute-items">

                                                {attribute.name !== 'Color' && attribute.items.map((item, index) => {
                                                    let Chosen = { ...this.state.attributeState[attribute.name] }
                                                    let isChosen = Chosen.displayValue === item.displayValue
                                                    // console.log(isChosen.displayValue)
                                                    return <button className={isChosen ? `attribute-properties-active` : `attribute-properties`} key={index}
                                                        onClick={() => this.buttonOnClick(item.id, attribute.name, item.displayValue)}>{item.displayValue}</button>
                                                })}

                                                {attribute.name === 'Color' && attribute.items.map((item, index) => {
                                                    let Chosen = { ...this.state.attributeState[attribute.name] }
                                                    let isChosen = Chosen.displayValue === item.displayValue
                                                    // console.log(isChosen)
                                                    return <button className={isChosen ? `attribute-colors-active` : `attribute-colors`} key={index} style={{
                                                        backgroundColor: `${item.value}`,
                                                    }}
                                                        onClick={() => this.buttonOnClick(item.id, attribute.name, item.displayValue)}></button>
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>


                        <div className="desc-Info-Price">
                            <div className="dest-Price-Title">PRICE</div>
                            <div className="desc-Price-price">{price?.currency.symbol} {price?.amount}</div>
                        </div>
                        {
                            this.state.myProduct?.inStock && (
                                <button className="desc-Info-Button"
                                    onClick={this.addToCartButton}>
                                    ADD TO CART
                                </button>
                            )
                        }

                        <div className="desc-Info-description" dangerouslySetInnerHTML={{ __html: this.state.myProduct?.description }}>
                            {/* {this.state.myProduct?.description} */}
                        </div>
                        {/* <div>
                        {this.state.allVals && this.state.allVals["Size"][1].displayValue}
                    </div> */}

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

const mapDispatchToProps = { setProducts, setId, addToCart, removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);