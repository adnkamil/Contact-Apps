const initialState = {
    contacts: []
}

const contactsReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return { ...state, contacts: action.payload.contacts }
        case 'ADD_CONTACT':
            return { ...state, contacts: state.contacts.concat(action.payload.contact)}
        case 'PUT_CONTACT':
            return { ...state, contacts: action.payload.contacts }
        case 'DELETE_CONTACT':
            return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload.contactId)}
        default:
            return state
    }
}

export default contactsReducer