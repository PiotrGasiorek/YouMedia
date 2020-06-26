const validateEmail = email => {
    let errors = [];
    const requirements = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!requirements.test(email)){
        errors.unshift('Niepoprawny adress email');
    }

    return errors
}

const validateMessage = msg => {
    let errors = [];
    
    if(msg.match(/^\s*$/)){
        errors.unshift('Napisz wiadomość');
    } else if(/\`|\~|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;|\:/.test(msg)){
        errors.unshift('Wiadomość nie może zawierać znaków specjalnych');
    } else if(msg.length < 5){
        errors.unshift('Wiadomość musi mieć przynajmniej 5 znaków');
    }
    
    return errors
}

const validateCheckboxes = checkboxes => {
    let errors = [];
    
    if(checkboxes.length === 0) {
        errors.unshift('Wybierz produkty, których potrzebujesz');
    }

    return errors
}

const displayError = error => {
    const errorMsg = `
        <div class='errorMsg' key='${Math.random()}'>
            <img class='errorMsg__icon' src='./static/gallery/icons/triangle.svg'/>
            <p class="errorMsg__paragraph paragraph">${error}</p>
        </div>    
    `;
    
    return errorMsg
}

const removeErrors = () => {
    document.querySelectorAll('.errorMsg').forEach(el => {
        el.remove(); 
    });
    return true
}

const successMsg = (btn) => {
    let btnTextContent = btn.textContent;
    btn.textContent = 'wysłano';
    setTimeout(() => {
        btn.textContent = btnTextContent;
    }, 2000)
}

export { 
    validateEmail, 
    validateCheckboxes, 
    validateMessage, 
    displayError, 
    removeErrors,
    successMsg
};