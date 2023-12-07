function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

async function sleep(wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
}

function cloneObject(object) {
    try {
        return JSON.parse(JSON.stringify(object))
    }
    catch(err) {
        return undefined;
    }
}