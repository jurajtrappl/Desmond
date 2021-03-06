const boolToYesNo = (boolValue) =>
    boolValue ? 'yes' : 'no';

const capitalize = (s) => {
    if (typeof s !== 'string') { 
        return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
}

const plural = (text, value) => {
    if (Array.isArray(value)) 
        return value.length == 1 ? `${text}s` : text;
    else 
        return value == 1 ? `${text}s` : text;
}

module.exports = {
    boolToYesNo,
    capitalize,
    plural
}