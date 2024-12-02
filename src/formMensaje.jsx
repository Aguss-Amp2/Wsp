import React, { useContext, useEffect, useRef, useState } from "react"
import { PiSmileyBold } from "react-icons/pi"
import { GoPlus } from "react-icons/go"
import { FaMicrophone } from "react-icons/fa"
import { IoSend } from "react-icons/io5"
import { MessajeList } from "./WhatsApp"
import { ContactsConText } from "./Mensajes_List/TextContact"
import { useParams } from "react-router-dom"
import getFormattedDateMMHHDDMM from "./helpers/getFormattedDate"
import { v4 as uuidv4 } from 'uuid';


const TextArea = () => {
    const [ocultarMicrofono, setOcultarMicrofono] = useState(false)
    const [texto, setText] = useState("") // Estado para almacenar el texto en el input

    const handleClickTextarea = () => {
        setOcultarMicrofono(true)
    }

    const handleClickFueraTextarea = () => {
        setOcultarMicrofono(false)
    }

    const { contact_id } = useParams()

    const { setContactsState, contacts_state, getContactById, addNewMessageToContact } = useContext(ContactsConText)
    const contact_selected = getContactById(contact_id)

    const mensajes = contact_selected?.mensajes_list || [];
    
    useEffect(() => {
        // Cargar datos al montar el componente
        const storedContacts = localStorage.getItem("contacts");
        if (storedContacts) {
            const contactsFromStorage = JSON.parse(storedContacts);
    
            // Asegurarse de no tener mensajes duplicados al cargar desde localStorage
            const uniqueContacts = contactsFromStorage.map(contact => {
                // Filtrar los mensajes duplicados en base a su texto y hora
                const uniqueMessages = contact.mensajes_list.filter((msg, index, self) =>
                    index === self.findIndex((m) => m.texto === msg.texto && m.hora === msg.hora)
                );
                return { ...contact, mensajes_list: uniqueMessages };
            });
    
            setContactsState(uniqueContacts);  // Cargar solo contactos con mensajes únicos
        }
    }, []);  // Solo se ejecuta una vez al montar el componente
    
    
    useEffect(() => {
        if (contacts_state.length) {
            localStorage.setItem("contacts", JSON.stringify(contacts_state));
        }
    }, [contacts_state]); // Solo guarda cuando contacts_state cambie

    const handleSubmitUncontrolledForm = (evento) => {
        evento.preventDefault();
        if (!texto.trim()) return; // Evita agregar mensajes vacíos
    
        const nuevoMensaje = {
            mensaje: texto,  // Aquí el mensaje que el usuario ingresa
            contact_id,
            emisor: 'yo',
            id: uuidv4(),
            hora: getFormattedDateMMHHDDMM(),
            status: "no-visto"
        };
        console.log(nuevoMensaje)
    
        // Agregar el mensaje al estado global (y duplicarlo)
        addNewMessageToContact(nuevoMensaje, contact_id); 
        setText(""); // Limpiar el input
    };

    const contenedorRef = useRef(null)

    useEffect(() => {
        if (contenedorRef.current) {
            contenedorRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [mensajes])

    const handleChangeText = (event) => {
        setText(event.target.value) // Actualizar el estado con el nuevo valor del input
    }


    return (
        <div>
            <div>
                <div>
                    <div className="chat-teclado">
                        <div className="teclado-cont-icon">
                            <PiSmileyBold className="icon-teclado-smile" />
                            <GoPlus className="icon-teclado-plus" />
                            <div className="teclado">
                                <form
                                    placeholder="Escribe un mensaje"
                                    className="input-teclado"
                                    onClick={handleClickTextarea}
                                    onSubmit={handleSubmitUncontrolledForm}
                                >
                                    <label htmlFor="texto"></label>
                                    <input type='text' id='texto' name='texto' placeholder='Escribe un mensaje' value={texto} onChange={handleChangeText} />
                                </form>
                            </div>
                            {!ocultarMicrofono && <FaMicrophone className="icon-teclado-micro" />}
                            {ocultarMicrofono && <IoSend className="icon-teclado-send" onClick={handleClickFueraTextarea} />}
                        </div>
                    </div>
                    <div ref={contenedorRef}>
                        {contact_selected?.mensajes_list?.map((ms) => (
                            <div>
                                <NewMessage key={ms.id} mensaje={ms.texto} hora={ms.hora} emisor={ms.emisor} status={ms.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewMessage = ({ mensaje, hora, emisor, status }) => {
    return (
        <div>
            {
                emisor != 'tu' ? <MessajeList texto={mensaje} hora={hora} emisor={'yo'} status={status}/>
                : <MessajeList texto={mensaje} hora={hora} emisor={emisor} status={status}/>
            }
        </div>
    )
}

export default TextArea