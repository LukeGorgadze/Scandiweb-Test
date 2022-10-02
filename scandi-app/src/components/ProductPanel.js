import React from "react";
import Product from './Product'
import { client } from '../allAcross/client'
import { gql } from '@apollo/client'
import DarkPanel from './darkPanel'
import Navbar from "./Navbar";
//Redux
import { connect } from "react-redux";
import { openDarkPanel, closeDarkPanel } from '../features/darkPanelSlice'
import { setCurrency } from '../features/currencySlice'
import { setProducts, setId, incCounter } from '../features/metaSlice'

class ProductPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductList: [],
      category: "all",
      mainData: null,
      resultData: [],
      data: null
    }
  }

  componentDidMount() {
    // this.setMetaData(this.props.metaProducts.products)
    if (this.props.metaProducts.products.length > 0) {
      this.filterData(this.props.metaProducts.products)
      this.props.incCounter()
    }
  }

  componentDidUpdate() {
    // console.log(this.props.metaProducts)
    if (this.state.category !== this.props.mode) {
      this.setState({ category: this.props.mode })
      this.filterData(this.props.metaProducts.products)
      console.log(this.props)
    }
    if (this.state.data === null) {
      let res = this.filterData(this.props.metaProducts.products)
      // console.log(res)
      if (res.length > 0) {

        this.setState({ data: res })
      }

    }
  }

  filterData = (response) => {
    if (!response) return
    // console.log(response)
    let result = response
    switch (this.props.mode) {
      case 'all':
        result = response
        // this.setState({ resultData: result })
        break;
      case 'clothes':
        result = response.filter(pr => pr.category === "clothes")
        // this.setState({ resultData: result })
        break;
      case 'tech':
        result = response.filter(pr => pr.category === "tech")
        // this.setState({ resultData: result })
        break
      default:
        break;
    }
    this.setState({ resultData: result })
    this.setCategory()
    return result
  }

  setCategory = () => {
    this.setState({ category: this.props.mode })
  }

  render() {
    // console.log(this.state)
    return (
      <div className="Container">
       <Navbar key={this.props.mode}/>
        <div className="Product-Panel">
          <h1>{this.state.category.toUpperCase()}</h1>
          <div className="Product-Panel-Products">

     
            {this.state.resultData && this.state.resultData.map((product, index) => {
              // console.log(product.prices[0].currency)
              let chosenPrices = product.prices.filter(el => el.currency.label === this.props.currentCur.currentCurrency)
  
              return (<Product id={product.id} key={product.id + index} name={product.name} pic={product.gallery[0]} 
                prices={product.prices} chosenPrices = {chosenPrices} inStock={product.inStock} brand = {product.brand} attributes = {product.attributes} 
                description = {product.description} gallery = {product.gallery}/>)
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  darkOn: state.darkPanel.value,
  currentCur: state.currency.value,
  metaProducts: state.metaData.value
});

const mapDispatchToProps = { openDarkPanel, closeDarkPanel, setCurrency, setProducts, setId, incCounter };

export default connect(mapStateToProps, mapDispatchToProps)(ProductPanel);