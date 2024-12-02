const contacts = [
    {
        nombre: 'Nicoo',
        avatar: 'https://ca.slack-edge.com/T07EJ2FLZ2R-U07G99UV5SQ-5a07fbca69e1-48',
        id: 1,
        ultMensj: 'Buendia!!',
        mensajes: '4',
        hora: '22:17',
        statusMsj: 'true',
        mensajes_list: [
            {
                emisor: 'yo',
                hora: '23:10',
                id: 1,
                texto: 'Hola que tal?',
                status: 'visto'
            },
            {
                emisor: 'tu',
                hora: '23:11',
                id: 2,
                texto: 'Si, hoy aprendi estados',
                status: 'visto'
            },
            {
                emisor: 'yo',
                hora: '23:12',
                id: 3,
                texto: 'Eso que significa :nerd_face:?',
                status: 'no-visto'
            },
            {
                emisor: 'yo',
                hora: '23:13',
                id: 4,
                texto: 'Estas ahi?',
                status: 'no-enviado'
            },
        ]
    },
    {
        nombre: 'Caro',
        avatar: 'https://ca.slack-edge.com/T07EJ2FLZ2R-U07ELATQ5DL-g4b35bd68d0e-48',
        id: 2,
        ultMensj: 'Como estas?',
        mensajes: '2',
        hora: '12:23',
        statusMsj: 'true',
        mensajes_list: [
            {
                emisor: 'yo',
                hora: '23:10',
                id: 1,
                texto: 'Hola que tal?',
                status: 'visto'
            },
            {
                emisor: 'tu',
                hora: '23:11',
                id: 2,
                texto: 'Si, hoy aprendi estados',
                status: 'visto'
            },
            {
                emisor: 'yo',
                hora: '23:12',
                id: 3,
                texto: 'Eso que significa?',
                status: 'no-visto'
            },
            {
                emisor: 'yo',
                hora: '23:13',
                id: 4,
                texto: 'fff',
                status: 'no_enviado'
            },
        ]
    }
]
const list_mensajes = JSON.parse(localStorage.getItem("messageText"))
let contact_found

if(list_mensajes === null){
}
else{
    if(list_mensajes.length > 0){
        list_mensajes.map((mensaje) => {
            contact_found = contacts.find(contact => contact.id == mensaje.contact_id)
            const texto = { texto: mensaje.mensaje, hora: mensaje.hora, emisor: mensaje.emisor }
            contact_found.mensajes_list.push(texto)
        })
    }
}

export default contacts