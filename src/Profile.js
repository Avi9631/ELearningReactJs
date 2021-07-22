import React, { Component } from 'react'
import './Profile.css'
import axios from 'axios';

export class Profile extends Component {

    constructor(props) {
        super(props)
        if(localStorage.getItem('key')==null || localStorage.getItem('key')==undefined){
            window.location='/';
            alert('You are not logged in');
        }
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const API_URL = 'http://localhost:8080/u/loadprofile?id='+localStorage.getItem("user_id");
        axios.get(API_URL, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                const datas = res.data;
                this.setState({ data: datas });
                console.log(datas);
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="main-body">
                        <div class="row gutters-sm">
                            <div class="col-md-4 mb-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex flex-column align-items-center text-center">
                                            <div class="mt-3">
                                                <h4>{this.state.data.name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-8">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Full Name</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.name}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.email}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Institute</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.institute}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <h6 class="mb-0">Detail</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                                {this.state.data.detail}
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <br />
                
            </div>
        )
    }
}

export default Profile
