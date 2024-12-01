import React, { useContext, useEffect, useRef, useState } from "react"
import getFormattedDateMMHHDDMM from "./helpers/getFormattedDate"
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
    // Cargar el texto del localStorage cuando el componente se monta
    useEffect(() => {
            const storedText = localStorage.getItem("messageText")
            if(storedText){
                setText(storedText)
            }
        }, []
    )
    // Guardar el texto en localStorage cada vez que cambie
    useEffect(() => {
            if(texto){
                localStorage.setItem("messageText", texto)
            }
        }, [texto]
    )
    
    const handleSubmitUncontrolledForm = (evento) => {
        evento.preventDefault()
        const messageJSX = evento.target
        const nuevoMensaje = {
            mensaje: texto,
            hora: getFormattedDateMMHHDDMM()
        }
        
        addNewMessageToContact(nuevoMensaje, contact_id)

        setMensajes([...mensajes, nuevoMensaje])
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
                                    <input type='text' id='texto' name='texto' placeholder='Escribe un mensaje' value={texto} onChange={handleChangeText} />
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
            <MessajeList texto={mensaje} hora={hora} emisor={'yo'} status={'no-visto'} />
        </div>
    )
}

export default TextArea