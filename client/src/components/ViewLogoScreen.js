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
                                    <div className="col-sm-12"> 
                                        <ViewLogo logo={data.logo}/>
                                    </div>
                                    <div className="col-sm-12">
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                            {(removeLogo, { loading, error }) => (
                                                <div>
                                                    <form
                                                        onSubmit={e => {
                                                            e.preventDefault();
                                                            removeLogo({ variables: { id: data.logo._id } });
                                                        }}>
                                                        <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                    <button type="submit" className="btn btn-danger">Delete</button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                </div>
                                            )}
                                        </Mutation>
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