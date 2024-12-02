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

    const addNewMessageToContact = (newMessage, contact_id) => {
        const { mensaje } = newMessage;
    
        // Buscar el contacto correspondiente
        const contact = contacts_state.find(contact => contact.id === Number(contact_id));
    
        // Verificar si el mensaje ya existe en la lista de mensajes
        const isDuplicate = contact?.mensajes_list.some(
            msg => msg.texto === mensaje && msg.hora === newMessage.hora
        );
    
        // Si el mensaje ya existe, no lo agregamos
        if (isDuplicate) {
            console.log("Mensaje duplicado detectado, no se agregará.");
            return; // Salir de la función para evitar agregar el mensaje duplicado
        }
    
        // Crear el nuevo mensaje
        const new_message = {
            texto: mensaje,
            id: uuidv4(), // Generar un nuevo id único para cada mensaje
            hora: getFormattedDateMMHHDDMM(), // Generar hora con formato adecuado
            status: "no-visto",
        };
    
        // Actualizar el estado de los contactos, añadiendo el mensaje solo si no es duplicado
        setContactsState((prev_contact_state) => {
            return prev_contact_state.map((contact) => {
                if (contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        mensajes_list: [...contact.mensajes_list, new_message], // Agregar solo el mensaje no duplicado
                    };
                }
                return contact;
            });
        });
    };
    
    

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
                saveDraftToContact: saveDraftToContact,
                setContactsState: setContactsState
            }
            }
>
            {children}
        </ContactsConText.Provider>
    )
}

export {ContactsConText, ContactsConTextProvider}