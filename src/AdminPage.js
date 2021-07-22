import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

export class AdminPage extends Component {

    constructor(props) {
        super(props)

        if (localStorage.getItem("user_role") === '[ROLE_USER]') {
            alert("You are not authorized to open this page.");
            window.location = "/"
        }

        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleAddUser(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('group'));
        const API_URL = 'http://localhost:8080/user/logUp';

        const postdata = {
            "id": data.get('email'),
            "name": data.get('name'),
            "email": data.get('email'),
            "institue": data.get('institute'),
            "detail": data.get('detail'),
            "password": data.get('pass'),
            "type": ""
        };
        axios.post(API_URL, postdata, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                const datas = res.data;
                if (datas == true) {
                    alert('User added successfully');
                } else {
                    alert('User Already exists');
                }
                console.log(datas);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleDeleteUser(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('email'));

        const API_URL = 'http://localhost:8080/admin/deleteUser/' + data.get('email');

        axios.get(API_URL, {

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                alert("User Deleted Successfully");
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div style={{ padding: "10px" }}>
                <div className="text-center">
                    <h1>ADMIN PAGE</h1>
                    <button className="btn btn-danger" onClick={() => {
                        localStorage.removeItem("key");
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("user_role");
                        window.location = "/";
                    }}>Log Out</button>
                </div>
                <br /><hr /><br />

                <div class="row">
                    <div class="col-lg-4 col-md-4  text-center">
                        <h2>Add a Professor</h2>
                        <form onSubmit={this.handleAddUser}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Your Email" />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="pass" placeholder="Your Password" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="institute" placeholder="Your Institute" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="detail" placeholder="Your Detail" />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Register</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-4 col-md-4  text-center">
                        <h2>Delete a User</h2>
                        <form onSubmit={this.handleDeleteUser}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Delete a User</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default AdminPage
