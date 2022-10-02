import React from "react"
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export class CustomButtonLink extends React.Component {
    state = {
        url: "/",
    }
    componentDidMount(){
        this.setState({url:window.location.pathname})
    }
    componentDidUpdate(){
        if(this.state.url !== window.location.pathname){
            console.log(window.location.pathname,"Button update")
            this.setState({url:window.location.pathname})
        }
    }

    render() {
        const path = window.location.pathname
        const isActive = this.props.to === this.state.url
        const isMain = ('/' === path) && this.props.name === 'all'
        return (
            <Link to={this.props.to}>
                <button className={isActive? 'link-button-active': isMain? 'link-button-active' :'link-button'}
                    onClick={this.toggleClass}>
                    {this.props.children}
                </button>
            </Link>
        );
    } c

}

