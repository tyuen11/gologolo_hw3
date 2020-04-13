import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    let logos = JSON.parse(JSON.stringify(data.logos));
                    logos.sort(function(a,b){
                        console.log(a.lastUpdate, b);
                        
                        if (a.lastUpdate > b.lastUpdate)
                            return 0
                        else    
                            return 1
                    })

                    console.log(logos);
                    
                    return (
                        <div className="container row">
                            <div className="col s4" style={{paddingLeft: '20%', paddingTop: '3%'}}>
                                <h1>Recent Work</h1>
                                {logos.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    @todo<br />
                                    List Maker
                                </div>
                                <div>
                                    <Link type="button" className="btn btn-light btn-md" id="add_logo_button" to="/create">Create a new Logo</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
