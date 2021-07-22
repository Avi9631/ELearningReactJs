import React, { Component } from 'react'
import axios from 'axios'

class ProfessorPage extends Component {

    constructor(props) {
        super(props)

        if ((localStorage.getItem("user_role") === '[ROLE_USER]') || (localStorage.getItem("user_role") === '[ROLE_ADMIN]')) {
            alert("You are not authorized to open this page.");
            window.location = "/"
        }

        this.handleAddUser = this.handleAddUser.bind(this);
        // this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleAddUser(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('group'));
        const API_URL = 'http://localhost:8080/u/addcourse';

        const postdata = {
            "id": "",
            "name": data.get('name'),
            "professorId": localStorage.getItem("user_id"),
            "resource": data.get('resource')
        };
        axios.post(API_URL, postdata, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // handleDeleteUser(event) {
    //     event.preventDefault();
    //     const data = new FormData(event.target);
    //     console.log(data.get('email'));

    //     const API_URL = 'http://localhost:8080/admin/deleteUser/' + data.get('email');

    //     axios.get(API_URL, {

    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("key")
    //         }
    //     })
    //         .then(res => {
    //             alert("User Deleted Successfully");
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

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
                        <h2>Add a Course</h2>
                        <form onSubmit={this.handleAddUser}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Course Name" />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" name="resource" placeholder="Resource Link" />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Add a Course</button>
                            </div>
                        </form>
                    </div>
                    {/* <div class="col-lg-4 col-md-4  text-center">
                        <h2>Delete a User</h2>
                        <form onSubmit={this.handleDeleteUser}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="course" placeholder="Course" />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-danger">Delete a Course</button>
                            </div>
                        </form>
                    </div> */}

                </div>
            </div>
        )
    }
}

export default ProfessorPage
