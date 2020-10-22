import swal from 'sweetalert'
import axios from 'axios'

export function getContacts () {
    let apiUrl = 'https://simple-contact-crud.herokuapp.com/contact'
    return (dispatch) => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(({data}) => {
                dispatch({
                    type: 'GET_CONTACTS',
                    payload: { 
                        contacts: data
                    }
                })
            })
    }
}

export function editContact (editContact, id) {
    console.log('masuk action createtask')
    delete editContact['id']
    const updateAge = { ...editContact, age: +editContact.age}
    console.log(updateAge, '<<<<<<<')
    return (dispatch, getContact) => {
        axios({
            method: 'PUT',
            url: `https://simple-contact-crud.herokuapp.com/contact/${id}`,
            headers: {"content-type": "application/json"},
            data: updateAge
        })
            .then(res => swal('Uyeahhh', `${res.data.data.firstName} success edited`, 'success'))
            .catch(err => {
                switch (err.response.data.validation.keys[0]) {
                    case ('firstName'):
                        swal('Opsss', 'First Name is empty or less than 3 characters', 'error')
                        break;
                    case ('lastName'):
                        swal('Opsss', 'Last Name is empty or less than 3 characters', 'error')
                        break;
                    default:
                        swal('Opsss', 'age must be between 1 and 200', 'error')
                        break;
                }
            })
    }
}

export function createContact (newContact) {
    console.log('masuk action createContact')
    return (dispatch) => {
        axios({
            method: 'POST',
            url: 'https://simple-contact-crud.herokuapp.com/contact',
            headers: {"content-type": "application/json"},
            data: newContact
        })
            .then(res => swal('Uyeahhh', res.data.message, 'success'))
            .catch(err => {
                switch (err.response.data.validation.keys[0]) {
                    case ('firstName'):
                        swal('Opsss', 'First Name is empty or less than 3 characters', 'error')
                        break;
                    case ('lastName'):
                        swal('Opsss', 'Last Name is empty or less than 3 characters', 'error')
                        break;
                    default:
                        swal('Opsss', 'age must be between 1 and 200', 'error')
                        break;
                }
            })
    }
}

export function deleteContact (id) {
    console.log('masuk action createContact')
    return (dispatch) => {
        fetch(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json)
            .then(() => {
                dispatch({
                    type: 'DELETE_CONTACT',
                    payload: {
                        contactId: id
                    }
                })
            })
            .catch(err => console.log('masuk error'))
    }
}