import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getContacts } from '../store/actions/contactActions'
import ContactCard from '../components/ContactCard'
import { Modal, Button, Form } from 'react-bootstrap'
import { createContact } from '../store/actions/contactActions'

export default () => {
    const dispatch = useDispatch()
    const contacts = useSelector((state) => state.contactReducers.contacts)
    const [showModal, setShowModal] = useState(false)
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        photo: ''
    })

    const handleShow = () => {
        setShowModal(!showModal)
    }

    const updateContact = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
          })
    }

    const addContact = (e) => {
        e.preventDefault()
        dispatch(createContact(input))
        getContacts()
        handleShow()
    }

    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    return (
        <>
            <Modal show={showModal} onHide={handleShow} centered>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addContact}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={updateContact}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={updateContact}  />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Enter Age" name="age" onChange={updateContact}  />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter link Photo" name="photo" onChange={updateContact}  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addContact}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="landing-page" id="landing-page">
                <div className="max-width">
                    <div className="landing-page-content">
                        <div className="text-1">Hay buddy,</div>
                        <div className="text-2">Adding your Network</div>
                        <div className="text-3">Because your Network is your <span>Net Worth</span></div>
                        <Button variant="primary" onClick={handleShow}>
                            Add Contact
                        </Button>
                    </div>
                </div>
            </div>
            <div className="contact" id="contact">
                <section id="team" className="pb-5">
                    <div className="container">
                        <h5 className="section-title h1">MY CONTACT</h5>
                        <div className="row">
                            {contacts && contacts.map((contact) => {
                                return <ContactCard key={contact.id} contact={contact} />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}