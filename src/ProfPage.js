import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

export class ProfPage extends Component {

    constructor(props) {
        super(props)

        if((localStorage.getItem("user_role") === '[ROLE_USER]') || (localStorage.getItem("user_role") === '[ROLE_ADMIN]')){
            alert("You are not authorized to open this page.");
            window.location="/"
        }

        this.handleAddStock = this.handleAddStock.bind(this);
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
            "group": data.get('group'),
            "city": data.get('city'),
            "state": data.get('state'),
            "email": data.get('email'),
            "password": data.get('pass'),
            "mobile": data.get('mob'),
            "userrole": ""
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

    handleAddStock(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(data.get('id'));
        console.log(data.get('group'));
        const API_URL = 'http://localhost:8080/admin/addStock?group=' + data.get('group') + '&qty=' + data.get('qty');
        axios.get(API_URL, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                const datas = res.data;
                console.log(datas);
                alert('stock added successfully');
            })
            .catch(err => {
                console.log(err)
            })
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
            <div style={{padding:"10px"}}>
                <div className="text-center">
                    <h1>ADMIN PAGE</h1>
                    <button className="btn btn-danger" onClick={() => {
                        localStorage.removeItem("key");
                        localStorage.removeItem("user_id");
                        localStorage.removeItem("user_role");
                        window.location="/";
                    }}>Log Out</button>
                </div>
                <br /><hr /><br />

                <div class="row">
                    <div class="col-lg-4 col-md-4  text-center">
                        <h2>Add a User</h2>
                        <form onSubmit={this, this.handleAddUser}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="pass" placeholder="Your Password" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <input type="tel" className="form-control" name="mob" placeholder="Your mob" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="city" placeholder="Your City" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="state" placeholder="Your State" />
                            </div>
                            <div className="form-group">
                                <select id="ticket-type" name="group" className="form-control">
                                    <option value="">-- Select Blood Group --</option>
                                    <option value="Apos">A+</option>
                                    <option value="Aneg">A-</option>
                                    <option value="Bpos">B+</option>
                                    <option value="Bneg">B-</option>
                                    <option value="Oneg">O-</option>
                                    <option value="Opos">O+</option>
                                    <option value="ABpos">AB+</option>
                                    <option value="ABneg">AB-</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Add a user</button>
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
                    <div class="col-lg-4 col-md-4 text-center">
                        <h2>Update a Stock</h2>
                        <form onSubmit={this.handleAddStock}>
                            <div className="form-group">
                                <select id="ticket-type" name="group" className="form-control">
                                    <option value="">-- Select Blood Group --</option>
                                    <option value="Apos">A+</option>
                                    <option value="Aneg">A-</option>
                                    <option value="Bpos">B+</option>
                                    <option value="Bneg">B-</option>
                                    <option value="Oneg">O-</option>
                                    <option value="Opos">O+</option>
                                    <option value="ABpos">AB+</option>
                                    <option value="ABneg">AB-</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="number" className="form-control" name="qty" placeholder="Availability" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Update to Stock</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfPage
