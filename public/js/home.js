const socket=io()
Swal.fire({
    title:"Identificate:",
    input:"text",
    text:"Ingrese su nombre en el chat",
    inputValidator:(value)=>{
        return !value && "Necesitas un identificador en el chat"
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then(result=>{
    user=result.value
    Swal.fire({
        title:`Bienvenido ${user=result.value}`,
        allowOutsideClick:false,
        allowEscapeKey:false,
        showConfirmButton: false,
        timer: 1500,
        icon:"success"
    })
})

chatbox.addEventListener('keyup',evt=>{
    if(evt.key=="Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit("message",{user:user,message:chatbox.value})
            chatbox.value=""
        }
    }
})

socket.on("messageLogs",data=>{
    let log=document.getElementById('messageLogs')
    let messages = ""
    data.forEach(message=>{
        messages+=`${message.user}: ${message.message} </br>`
    })
    log.innerHTML=messages
})
