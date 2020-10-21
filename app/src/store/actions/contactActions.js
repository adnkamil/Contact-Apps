
export function getContacts () {
    return (dispatch) => {
        fetch('https://simple-contact-crud.herokuapp.com/contact/')
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
        fetch(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateAge),
            header: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(({data}) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

export function createContact (newContact) {
    console.log('masuk action createContact')
    return (dispatch) => {
        fetch('https://simple-contact-crud.herokuapp.com/contact', {
            method: 'POST',
            body: JSON.stringify(newContact),
            headers: {
                "content-type": "application/json"
              },
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
    }
}