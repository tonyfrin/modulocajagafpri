function validationHidden(value, validate) {
    var valid = null;

    if (value.match( validate )){
        valid = true;
    } else {
        valid = false;
    }

    return valid;
}

const addClass = (element, className) => {
    const input = document.getElementById(element);

    if(! input.classList.contains(className)){
        input.classList.add(className);
    }
}

const removeClass = (element, className) => {
    const input = document.getElementById(element);

    if(input.classList.contains(className)){
        input.classList.remove(className);
    }
}

const validationInput = (value, match, componentId, className, required = false) => {
    var valid = validationHidden(value, match);
    if(required){
        if(valid && value !== ''){
            removeClass(componentId, className);
            return valid;
        } else{
            addClass(componentId, className);
            return false;
        }
    } else{
        if(value === ''){
            removeClass(componentId, className);
            return true;
        } else{
            if(valid){
                removeClass(componentId, className);
            }else{
                addClass(componentId, className);
            }
            return valid;
        }
    }
    
}

const validationSelect = (value, componentId, className) => {
    if(value === ''){
        addClass(componentId, className);
        return false;
    } else{
        removeClass(componentId, className);
        return true;
    }
}

const customValidation = (conditional, componentId, className) => {
    if(conditional){
        addClass(componentId, className);
        return false;
    } else{
        removeClass(componentId, className);
        return true;
    }
}

export {validationHidden, addClass, removeClass, validationInput, validationSelect, customValidation};