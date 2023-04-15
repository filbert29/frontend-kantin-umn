// Function to get a value from local storage
function getFromLocalStorage(key) {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return undefined;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error(`Error getting value from local storage: ${error}`);
        return undefined;
    }
}

// Function to set a value in local storage
function setToLocalStorage(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error setting value to local storage: ${error}`);
    }
}

// Function to remove a value in local storage
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error remove value to local storage: ${error}`);
    }
}

export default {
    setToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
}