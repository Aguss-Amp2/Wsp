import { createContext, useState } from "react";
import contacts from "./contacts";
import { v4 as uuidv4 } from 'uuid';
import getFormattedDateMMHHDDMM from "../helpers/getFormattedDate";


const ContactsConText = createContext();

const ContactsConTextProvider = ({children}) =>{
    const [contacts_state, setContactsState] = useState(contacts)

    const getContactById = (contact_id) => {
        return contacts_state.find(
            contact => contact.id === Number(contact_id)
        )
    }

    const addNewMessageToContact = (text, contact_id) => {
        const new_message = {emisor:'yo', texto: text.mensaje, id: uuidv4(), hora: getFormattedDateMMHHDDMM(), status: 'no-visto'}

        setContactsState((prev_contact_state) => {
            return prev_contact_state.map((contact) => {
                if (contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        mensajes_list: [...contact.mensajes_list, new_message]
                    }
                }
                return contact
            })
            }
        )
    }

    const saveDraftToContact = (draft, contact_id) => {
        setContactsState((prev_contact_state) => {
            return prev_contact_state.map((contact) => {
                if (contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        draft: draft
                    }
                }
                return contact
            })
        })
    }


    return(
        <ContactsConText.Provider value={
            {
                contacts_state: contacts_state,
                getContactById: getContactById,
                addNewMessageToContact: addNewMessageToContact,
                saveDraftToContact: saveDraftToContact
            }
            }
        >
            {children}
        </ContactsConText.Provider>
    )
}

export {ContactsConText, ContactsConTextProvider}