const gsThousandsFormat = (number) => {
    const float = parseFloat(number).toFixed(2);
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1,';
    let arr = float.toString().split('.');
    arr[0] = arr[0].replace(exp,rep);
    return arr[1] ? arr.join('.'): arr[0];
}

const gsIsIncludes = (array, value, key) => {
    let result = false;
    array.map((item) => {
        if(`${item[key]}` === `${value}`){
            result = true; 
        }
        return null;
    })
    return result;
}

export { gsThousandsFormat, gsIsIncludes };