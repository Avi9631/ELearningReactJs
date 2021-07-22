import React, { Component } from 'react'
import image2 from './images/professor.jpg'
import './App.css'
import axios from 'axios';

class Professor extends Component {

    constructor(props) {
        super(props)

        if (localStorage.getItem('key') == null || localStorage.getItem('key') == undefined) {
            window.location = '/';
            alert('Yor are not logged in');
        }
        this.state = {
            data: []
        }
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var API_URL = 'http://localhost:8080/u/loadAllProf';
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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const API = "http://localhost:8080/u/findProf?name=" + data.get("profname");
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
                <div className="col-md-3 col-sm-6 vd" >
                    <div className="bkjiu" data-toggle="modal" data-target="#stock-ticket-modal">
                        <img src={image2} />
                        <h4><b>{x.name}</b></h4>
                        <p><b>Institute: </b>{x.institute}</p>
                    </div>
                </div>);
        })

        return (
            <div>
                <section id="process" className="donation-care">
                    <div className="container">
                        <div className="row session-title">
                            <h2>Search an esteemed Proffessor</h2>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="profname" placeholder="Your Search" />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <button type="submit" className="btn btn-danger" style={{ width: '100%' }}>Search</button>
                                </div>
                            </div>
                        </form>
                        <br />
                        <div className="row">
                            {dataList}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Professor
