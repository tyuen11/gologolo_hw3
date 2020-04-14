import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import ViewLogo from './editScreen/ViewLogo';
import Navbar from './editScreen/Navbar';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor, 
                borderRadius: $borderRadius
                borderWidth: $borderWidth,
                padding: $padding, 
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    state = {
        logo: null
    }

    syncLogoState = (logo) => {
        this.setState({
            logo: logo
        })
    }

    handleAttributeChange = (logo, event) => {
    
        logo[event.target.name] = event.target.value;
        console.log('aaa', logo);
                
        console.log(this.state);
        
        this.syncLogoState(logo);
        
  
    }

    canSubmit = () => {
       let logo = JSON.parse(JSON.stringify(this.state.logo));
       delete logo.text;
       console.log(logo);
       
       let allNumbers = (Object.values(logo)).filter(val => isNaN(val) == false);
        if ( this.state.logo.text !== "") {
            for (let index in allNumbers){
                if (parseInt(allNumbers[index]) > 144 || parseInt(allNumbers[index]) < 4)
                    return false;
            }
            return true;
        } 
        return false;

    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        let canSubmitButton = "btn btn-success";
        let submitB = document.getElementById("submitB");
        if (this.state.logo !== null){
           if (this.canSubmit()){
                submitB.removeAttribute("disabled");
           }else{  
                submitB.setAttribute("disabled", true);
           }
        }
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    let logo;
                    if (this.state.logo == null){
                        logo = JSON.parse(JSON.stringify(data.logo));
                    } else {
                        logo = JSON.parse(JSON.stringify(this.state.logo));
                    }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/view/${data.logo._id}`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Navbar /></h4>
                                        </div>
                                        <div className="panel-body row">                                            
                                            <form onSubmit={e => {                                                
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                        backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                        borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                            
                                            }}
                                            className="col-4 card bg-secondary"
                                            style={{paddingBottom: "10px"}}>
                                                <h3 className="panel-title">
                                                Edit Logo
                                                </h3>
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.handleAttributeChange.bind(this, logo)}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" min="4" max="144" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Color" defaultValue={data.logo.backgroundColor} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Color" defaultValue={data.logo.borderColor} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" min="4" max="144" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" min="4" max="144" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" min="4" max="144" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin</label>
                                                    <input type="number" min="4" max="144" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} onChange={this.handleAttributeChange.bind(this, logo)} />
                                                </div>

                                                <button type="submit" id="submitB" className={canSubmitButton} >Submit</button>&nbsp;
                                                <Link to={`/view/${data.logo._id}`} className="btn btn-danger">Cancel</Link>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Errors :( Please try again</p>}
                                            <ViewLogo logo={logo} pp={this.state} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;