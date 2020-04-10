import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Navbar from './editScreen/Navbar.js'
import ViewLogo from './editScreen/ViewLogo';


const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            lastUpdate
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    console.log(data.logo);
                    

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <Navbar></Navbar>
                                </div>
                                <div className="row">
                                    <div className="card col-4">
                                        <div className="card bg-secondary" style={{margin: "0.25rem"}}>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeLogo({ variables: { id: data.logo._id } });
                                                            }}>
                                                            <Link to={`/edit/${data.logo._id}`} className="btn btn-success" style={{margin: "1rem"}}>Edit</Link>&nbsp;
                                                            <button type="submit" className="btn btn-danger">Delete</button>
                                                        </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>
                                        </div>
                                        <dl className="card text-white bg-secondary mb-3" style={{margin: "0.25rem", padding: "1rem"}}>
                                            <dt>Text:</dt>
                                            <dd>{data.logo.text}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                            <dt>Color:</dt>
                                            <dd>{data.logo.color}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{data.logo.fontSize}</dd>
                                            <dt>Background Color:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>Border Color:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                        </dl>
                                    </div>
                                    <div> 
                                        <ViewLogo logo={data.logo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;