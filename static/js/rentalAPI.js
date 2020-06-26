import { apiLink } from "./API.js";
import { validateCheckboxes, validateEmail, removeErrors, displayError, successMsg } from "./validation.js";

window.addEventListener("DOMContentLoaded", () => {
   
    // Form's mechanism

    const form = document.querySelector('form[name="rental"]');
    const url = `${apiLink}/api/v1/mail`;
    let addrInput = document.querySelector('.form__input').parentElement;
    let checkboxInputs = document.querySelectorAll('.form__group')[1];
    let btn = document.querySelector('.form__btn');
    
    // Get available tools from API and show them in form

    fetch(`${apiLink}/api/v1/rental`)
    .then(response => response.json())
    .then(data => data.Rental_side_data)
    .then(data => {
        let htmlToDisplay = '';

        data.forEach(tool => {
            htmlToDisplay += `
                <input class="form__checkbox" name='tool' id="checkbox-${tool.id}" type="checkbox" value="${tool.product_name}">
                <label class="form__checkbox__label" for="checkbox-${tool.id}">${tool.product_name}</label>
            `;
        })

        document.querySelectorAll('.form__group')[1].innerHTML += htmlToDisplay;
    })
    .catch(error => {
        console.log(error);
    });

    const sendMail = (checkboxes, addr) => {

        checkboxes = checkboxes.map(input => {
           return input.value
        });

        let message = ''
        
        checkboxes.map(tool => {
            message += ` ${tool},`;
        });

        const data = {
            "sender": addr,
            "mail_title": "you-media.pl website form",
            "mail_content": message
        }

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .catch(error => {
            console.log(error);
            location.replace("http://127.0.0.1:5500/front-end/500.html");
        });
    }

    const validateForm = (checkboxes, addr) => {
        const checkboxesErrors = validateCheckboxes(checkboxes);
        if(checkboxesErrors !== []){
            checkboxesErrors.forEach(error => {
                checkboxInputs.innerHTML += displayError(error);
            })
        } 

        const emailErrors = validateEmail(addr);
        if(emailErrors !== []){
            emailErrors.forEach(error => {
                addrInput.innerHTML += displayError(error);
            })
        }
        
        let isApproved = true;
        const allErrors = [checkboxesErrors, emailErrors];

        allErrors.forEach(errors => {
            if(errors.length !== 0){
                isApproved = false;
            }
        })

        if(isApproved){
            sendMail(checkboxes, addr);
            clearForm(checkboxes);
            successMsg(btn);
        } else{
            form.scrollIntoView({
                behavior: "smooth", 
                inline: "start"
            });
        }
    }

    const clearForm = (checkboxes) => {
        checkboxes.forEach(input => {
            input.checked = false;
        })
        address.value = '';
    }

    btn.addEventListener('click', (e) => {
        
        e.preventDefault();
        let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
        const address = form.elements['address'];
        removeErrors();
        validateForm(checkboxes, address.value);

    })
});