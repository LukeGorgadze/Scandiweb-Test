import React from "react";
import Navbar from "../components/Navbar";
export class ErrorPage extends React.Component {

    render() {
        return (
            <>
                <Navbar key={2}/>
                <div className="Error">
                    ERROR 404
                </div>
            </>
        );
    }
}