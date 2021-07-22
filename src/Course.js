import React, { Component } from 'react'
import image from './images/cardimg.jpg'
import './App.css'
import axios from 'axios'


class Course extends Component {

    constructor(props) {
        super(props)

        if (localStorage.getItem('key') == null || localStorage.getItem('key') == undefined) {
            window.location = '/';
            alert('You are not logged in');
        }
        this.state = {
            data: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const API_URL = 'http://localhost:8080/u/loadAllCourse';
        axios.get(API_URL, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                const datas = res.data;
                this.setState({ ...this.state, data: datas });
                console.log(datas);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const API = "http://localhost:8080/u/findCourse?name=" + data.get("coursename");
        axios.get(API, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("key")
            }
        })
            .then(res => {
                const datas = res.data;
                this.setState({ ...this.state, data: datas });
            }).catch(err => {
                console.log(err);
            })

    }

    render() {
        const dataList = this.state.data.map(x => {
            return (
                <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                        <img src={image} alt />
                        <h4>{x.name}</h4>
                        <p><b>By Prof: </b>{x.professorId}</p>
                        <a href={x.resource} target="blank" className="btn btn-danger">View the Course</a>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <section id="process" className="donation-care">
                    <div className="container">
                        <div className="row session-title">
                            <h2>Search Course</h2>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="coursename" placeholder="Your Search" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <button type="submit" className="btn btn-danger" style={{ width: '100%' }}>Search</button>
                                </div>
                            </div>
                        </form>
                        <br />
                        <div className="row">
                            {
                                (dataList.length == 0) ?
                                    <p className="text-center">No results found</p> :
                                    dataList
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Course
