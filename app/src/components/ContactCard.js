import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editContact, getContacts, deleteContact } from '../store/actions/contactActions'
import swal from 'sweetalert'
import Aos from 'aos'

export default (props) => {
    const dispatch = useDispatch()
    const { id, firstName, lastName, age, photo } = props.contact
    const [isFrontside, setIsFrontside]  = useState(true)
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        photo: ''
    })

    const goDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteContact(id))
            } 
          });
    }

    const goEdit = () => {
        setIsFrontside(!isFrontside)
    }

    const updateTask = (e) => {
        setInput({
          ...input, [e.target.name]: e.target.value
        })
    }

    const goEditContact = (e) => {
        e.preventDefault()
        dispatch(editContact(input, id))
        dispatch(getContacts())
        goEdit()
    }

    useEffect(() => {
        setInput(props.contact)
    }, [props.contact])

    useEffect(() => {
        Aos.init({ duration: 750 })
    })

    return (
        <div className="col-xs-12 col-sm-6 col-md-4" data-aos="fade-up">
            <div className="image-flip" >
                <div className="mainflip flip-0" >
                    <div className={isFrontside ? "frontside" : "backside"} >
                        <div className="card">
                            <div className="card-body text-center">
                                <p><img className=" img-fluid" src={photo} alt="" /></p>
                                <h4 className="card-title">{firstName} {lastName}</h4>
                                <p className="card-text">{age} years</p>
                                <Button variant="primary" onClick={goEdit} className="mr-3">
                                    Edit
                                </Button>
                                <Button variant="primary" onClick={goDelete}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div> 
                    <div className={isFrontside ? "backside" : "frontside"}>
                        <div className="card">
                            <div className="card-body text-center mt-4">
                            <Form onSubmit={goEditContact}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={input.firstName} onChange={updateTask}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={input.lastName} onChange={updateTask}  />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="number" placeholder="Enter Age" name="age" value={input.age} onChange={updateTask}  />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter link Photo" name="photo" value={input.photo} onChange={updateTask}  />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mr-3">
                                    Submit
                                </Button>
                                <Button variant="primary" onClick={goEdit}>
                                    Cancel
                                </Button>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}