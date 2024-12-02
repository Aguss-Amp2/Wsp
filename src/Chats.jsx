import React from "react"
import "./style.css"
import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"
import contacts from "./Mensajes_List/contacts"


const ChatsList = () => {
    return(
        <div>
            <div>
                {
                    contacts.map((contact) => {
                        return (
                            <Link key={contact.id} to={`/home/` + contact.id} >
                                <Chats 
                                    nombre={contact.nombre} 
                                    avatar={contact.avatar}
                                    ultMensj={contact.ultMensj}
                                    hora={contact.hora}
                                    statusMsj={contact.statusMsj}
                                    mensajes={contact.mensajes}/>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}


const Chats = ({ avatar, nombre, ultMensj, mensajes, hora, statusMsj }) => {
    let mensj = statusMsj === 'false'
    return (
        <div className="container-msj">
            <div className="cont-photo">
                <img src={avatar} alt={nombre} />
            </div>
            <div className="cont-name">
                <span className="name">{nombre}</span>
                <span className="ult-msj">{ultMensj}</span>
            </div>
            <div className="cont-hora-msj">
                <span className={`${mensj ? 'hora-false' : 'hora'}`}>{hora}</span>
                <span className={`${mensj ? 'no-msj' : 'msj'}`}>{mensajes}</span>
            </div>
            <div className="cont-flecha">
                <IoIosArrowDown className="flecha-msj" />
            </div>
        </div>
    )
}

export default ChatsList