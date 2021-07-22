import React, { Component } from 'react'
import './App.css'
import LogInPart from './LogInPart'
import LogUpPart from './LogupPart'


class LoginModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            valu: true,
            msg: ""
        }

    }

    render() {
        var selector = (this.state.valu) ? true : false;
        return (
            <div>
                <div id="login-ticket-modal" className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <h4 onClick={() => this.setState({ valu: true, msg: "" })} id="loginbtn" className="modal-title ">Login</h4>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <h4 onClick={() => this.setState({ valu: false, msg: "" })} id="logupbtn" className="modal-title ">Register</h4>
                                    </div>
                                </div>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {(selector)? <LogInPart/>: <LogUpPart/>}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginModal
