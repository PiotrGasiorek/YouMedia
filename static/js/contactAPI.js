import { apiLink } from "./API.js";
import { validateMessage, validateEmail, removeErrors, displayError, successMsg } from "./validation.js";

window.addEventListener("DOMContentLoaded", () => {

    let msgInput = document.querySelector('.form__textarea').parentElement;
    let addrInput = document.querySelector('.form__input').parentElement;
    let btn = document.querySelector('.form__btn');
    const form = document.querySelector('form[name="mail"]');
    const url = `${apiLink}/api/v1/mail`;

    const sendMail = (msg, addr) => {

        const data = {
            "sender": addr,
            "mail_title": "you-media.pl website form",
            "mail_content": msg
        }

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .catch(error => {
            console.log(error);
            // location.replace("http://127.0.0.1:5500/front-end/500.html");
        });
    }

    const validateForm = (msg, addr) => {
        const messageErrors = validateMessage(msg);
        if(messageErrors !== []){
            messageErrors.forEach(error => {
                msgInput.innerHTML += displayError(error);
            })
        } 

        const emailErrors = validateEmail(addr);
        if(emailErrors !== []){
            emailErrors.forEach(error => {
                addrInput.innerHTML += displayError(error);
            })
        }
        
        let isApproved = true;
        const allErrors = [messageErrors, emailErrors];

        allErrors.forEach(errors => {
            if(errors.length !== 0){
                isApproved = false;
            }
        })

        if(isApproved){
            sendMail(msg, addr);
            clearForm();
            successMsg(btn);
        } else{
            form.scrollIntoView({
                behavior: "smooth", 
                inline: "start"
            });
        }
    }

    const clearForm = () => {
        message.value = '';
        address.value = '';
    }

    btn.addEventListener('click', (e) => {

        e.preventDefault();
        const message = form.elements['message'].value;
        const address = form.elements['address'].value;
        removeErrors();
        validateForm(message, address);

    })
});