import React, { useContext, useEffect, useRef, useState } from "react"
import { PiSmileyBold } from "react-icons/pi"
import { GoPlus } from "react-icons/go"
import { FaMicrophone } from "react-icons/fa"
import { IoSend } from "react-icons/io5"
import { MessajeList } from "./WhatsApp"
import { ContactsConText } from "./Mensajes_List/TextContact"
import { useParams } from "react-router-dom"


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

    const { getContactById, addNewMessageToContact } = useContext(ContactsConText)
    const contact_selected = getContactById(contact_id)

    const [mensajes, setMensajes] = useState([])
    
    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem("messageText")) || []
        setMensajes(storedMessages) // Actualizar el estado con los mensajes del localStorage
    }, [])

    // Guardar los mensajes en el localStorage cada vez que el estado de mensajes cambie
    useEffect(() => {
        if (mensajes.length > 0) {
            localStorage.setItem("messageText", JSON.stringify(mensajes))
        }
    }, [mensajes])

    const handleSubmitUncontrolledForm = (evento) => {
        evento.preventDefault()
        const messageJSX = evento.target
        const nuevoMensaje = {
            mensaje: texto,
            contact_id
        }

        // Actualizar el estado con el nuevo mensaje, manteniendo los mensajes anteriores
        setMensajes((prevMensajes) => {
            const nuevosMensajes = [...prevMensajes, nuevoMensaje]
            return nuevosMensajes
        })
        
        addNewMessageToContact(nuevoMensaje, contact_id)
        setText("") // Limpiar el estado y el campo de texto
        messageJSX.reset() // Resetear el formulario
    }

    const contenedorRef = useRef(null)

    useEffect(() => {
        if (contenedorRef.current) {
            contenedorRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [mensajes]);

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
                                    <input type='text' id='texto' name='texto' placeholder='Escribe un mensaje' onChange={handleChangeText} />
                                </form>
                            </div>
                            {!ocultarMicrofono && <FaMicrophone className="icon-teclado-micro" />}
                            {ocultarMicrofono && <IoSend className="icon-teclado-send" onClick={handleClickFueraTextarea} />}
                        </div>
                    </div>
                    <div ref={contenedorRef}>
                        {contact_selected?.mensajes_list.map((ms, index) => (
                            <div>
                                <NewMessage key={index} mensaje={ms.texto} hora={ms.hora} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewMessage = ({ mensaje, hora }) => {
    return (
        <div>
            <MessajeList texto={mensaje} hora={hora} emisor={'yo'} status={'no-visto'}/>
        </div>
    )
}

export default TextArea