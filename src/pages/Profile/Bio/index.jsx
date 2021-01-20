import React, { useEffect, useState } from 'react';
import { Container, Form, FormGroup, Label, Col, Input, Button, Modal, ModalBody } from 'reactstrap';
import './style.css'
import User from '../../../assets/img/user.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { useSelector, useDispatch } from "react-redux";

function Bio(props) {

    const token = localStorage.getItem('token')
    console.log(token)
    const id = localStorage.getItem('id')
    console.log('ID', id)

    //modal edit profile
    const {
        className
      } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    // Get data user    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null)

    const userAuth = () => {
        // axios.defaults.headers.common = { 'Authorization': 'Bearer' + token }
        axios.get(`https://soka.kuyrek.com:3005/user/profile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            console.log("Response", res)
            setUser(res.data.data)
        })
    }

    useEffect(() => {
        userAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
console.log(user)
    return (
        <div>
            {props.isLogin !== true ? (
                <div>
                    <Col>
                        <h3 style={{ textAlign: "center", marginTop: '150px' }}>
                        Hello guest, <br />
                        please log in first <br />
                        as user!!
                        </h3>
                    </Col>
                </div>
                ) : (
            <div className="subMenu">
                <Container>
                    <aside className="leftSide">
                        <div>
                            {/* {
                                user.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="profile">
                                                <img src={item.image} alt="" className="photo" />
                                            </div>
                                            <h4>{item.fullname}</h4>
                                            <div className="desc">
                                                <h4>Description</h4>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                            <div className="profile">
                                <img src={User} alt="" className="photo" />
                            </div>
                            <h4>{user?.fullname.toUpperCase()}</h4>
                            <div className="desc">
                                <h4>Description</h4>
                                <p>{user?.description}</p>
                            </div>
                            <div className="button">
                                <Button color="link" className="btn editBio" onClick={toggle}>Edit Profile</Button>
                                    <Modal isOpen={modal} toggle={toggle} className={className}>
                                        <ModalBody toggle={toggle} close={closeBtn}>
                                            <h4 className="edit-title">Edit Profile</h4>
                                            <br/>
                                            <div>
                                                <img src={User} alt="" className="photo-edit" />
                                            </div>
                                            <br />
                                            <div>
                                                <Form>
                                                <FormGroup row className="edit-form-name">
                                                    <Label for="exampleEmail" sm={3}>Full Name:</Label>
                                                    <Col sm={8}>
                                                    <Input 
                                                    type="text" 
                                                    name="text" 
                                                    id="fullName" 
                                                    placeholder=" " />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className="edit-form-name">
                                                    <Label for="exampleEmail" sm={3}>Phone Number:</Label>
                                                    <Col sm={8}>
                                                    <Input 
                                                    type="number" 
                                                    name="number" 
                                                    id="PhoneNumber" 
                                                    placeholder=" " />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row className="edit-form-description">
                                                    <Label for="exampleText" sm={3}>Description:</Label>
                                                    <Col sm={8}>
                                                    <Input className="input-desc"
                                                    type="textarea" 
                                                    name="text" 
                                                    id="description" />
                                                    </Col>
                                                </FormGroup>
                                                </Form>
                                            </div>
                                            <Button color="link" className="edit-button-submit">Submit</Button>
                                        </ModalBody>
                                    </Modal>
                            </div>
                        </div>
                    </aside>
                    <aside className="rightSide">
                        <div className="borderHistory">
                            <div className="contentBorder">
                                <h5 className="headerBox">Book History</h5>
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div className="contentCard">
                                            <h5 className="headerCard">Field Name</h5>
                                            {/* <h5 className="status"></h5> */}
                                            <small className="date">2021-01-01</small>
                                            <Link to='player-list'>
                                                <button className="btn player">Player List</button>
                                            </Link>
                                            <p className="footerCard">Coming Up Match</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div className="contentCard">
                                            <h5 className="headerCard">Field Name 2</h5>
                                            <h5 className="status">done</h5>
                                            <small className="date">2021-01-01</small>
                                            <Link to='player-list'>
                                                <button className="btn player">Player List</button>
                                            </Link>
                                            <p className="footerCard">Give Feedback</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card text-center">
                                    <div class="card-body">
                                        <div className="contentCard">
                                            <h5 className="headerCard">Field Name 3</h5>
                                            <h5 className="status">done</h5>
                                            <small className="date">2021-01-01</small>
                                            <Link to='player-list'>
                                                <button className="btn player">Player List</button>
                                            </Link>
                                            <p className="footerCard">Give Feedback</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </Container>
            </div>)}
        </div >
    )
}


export default Bio;