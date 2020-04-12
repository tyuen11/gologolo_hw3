import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import ViewLogo from './editScreen/ViewLogo';
import Navbar from './editScreen/Navbar';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            addLogo(
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor, 
                borderRadius: $borderRadius
                borderWidth: $borderWidth,
                padding: $padding, 
                margin: $margin) {
                    _id
                }
        }
`;

class CreateLogoScreen extends Component {

    state = {
        logo : {
            text : 'Gologolo', 
            color : "#000000",
            fontSize : 50,
            backgroundColor: "#5d4ed1",
            borderColor: "#ef866b",
            borderRadius: 24,
            borderWidth: 24,
            padding: 24,
            margin: 24
        }
    }

    syncLogoState = (logo) => {
        this.setState({
            logo: logo
        })
    }

    handleAttributeChange = (logo, event) => {
        console.log("handleTextColorChange to " + event.target.value);
        logo[event.target.name] = event.target.value;
        this.syncLogoState(logo);
  
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        let logo = this.state.logo;
        console.log(logo);
        

        return (
            <Mutation mutation={ADD_LOGO} onCompleted={(data) =>this.props.history.push(`/view/${data.addLogo._id}`)}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="panel-heading">
                                    <h4><Navbar/></h4>
                                </div>
                            </div>
                            <div className="panel-body row">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value,) , 
                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                            borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                }}
                                className="col-4 card bg-secondary">
                                     <h3 className="panel-title">
                                        Create Logo
                                    </h3>
                                    <div className="form-group">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" ref={node => {
                                            text = node;
                                        }} placeholder="Text" defaultValue={logo.text} onChange={this.handleAttributeChange.bind(this, logo)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }} placeholder="Color" defaultValue={logo.color} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="number" min="4" max="144" className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} placeholder="Font Size" defaultValue={logo.fontSize} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Color" defaultValue={logo.backgroundColor} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Color" defaultValue={logo.borderColor} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" min="4" max="144" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" defaultValue={logo.borderRadius} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" min="4" max="144" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" defaultValue={logo.borderWidth} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="4" max="144" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" defaultValue={logo.padding} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin</label>
                                        <input type="number" min="4" max="144" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" defaultValue={logo.margin} onChange={this.handleAttributeChange.bind(this, logo)} />
                                    </div>

                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                                <ViewLogo logo={logo} />
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;