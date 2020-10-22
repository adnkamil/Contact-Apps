import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getContacts } from '../store/actions/contactActions'
import ContactCard from '../components/ContactCard'
import { Modal, Button, Form } from 'react-bootstrap'
import { createContact } from '../store/actions/contactActions'
import Aos from 'aos'

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

    const addContact = async (e) => {
        e.preventDefault()
        dispatch(createContact(input))
        handleShow()
    }

    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    useEffect(() => {
        Aos.init({ duration: 750 })
    })

    return (
        <>
            <Modal show={showModal} onHide={handleShow} centered >
                <Modal.Header closeButton>
                <Modal.Title>New Contact</Modal.Title>
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
                        Add Contact
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="landing-page" id="landing-page">
                <div className="max-width">
                    <div className="landing-page-content" data-aos="fade-up">
                        <div className="text-1">Hay buddy,</div>
                        <div className="text-2">Add your Network</div>
                        <div className="text-3">Because your Network is your <span>Net Worth</span></div>
                        <Button variant="primary" onClick={handleShow}>Add Contact</Button>
                    </div>
                </div>
            </div>
            <div className="contact" id="contact">
                <div id="team" className="pb-5 team-contact">
                    <div className="container" data-aos="fade-up">
                        <h5 className="team-contact-title h1">MY CONTACTS</h5>
                        <div className="row">
                            {contacts ? contacts.map(contact => {
                                return <ContactCard key={contact.id} contact={contact} />
                            }) :
                            <div class="spinner-border text-info" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}