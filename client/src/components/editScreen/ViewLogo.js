import React, { Component } from 'react'

class ViewLogo extends Component {
    render() {
        const styles = {
            container: {
               
                color: this.props.logo.color,
                fontSize: this.props.logo.fontSize + "pt",
                backgroundColor: this.props.logo.backgroundColor,
                borderRadius: this.props.logo.borderRadius + "pt",
                padding: this.props.logo.padding + "pt",
                margin: this.props.logo.margin + "pt",
                position: "absolute",
                border: this.props.logo.borderColor + " solid " + this.props.logo.borderWidth + "pt",

            }
        }
        return (
            <div>
                <div style={ styles.container }>
                    {this.props.logo.text}
                </div>
            </div>
        )
    }
}

export default ViewLogo
