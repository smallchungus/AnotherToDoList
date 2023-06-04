//function to check if the date is valid  or not
function isValidDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();

    if (selectedDate < today ) {
        alert("Please enter a valid date");
        return false;
    }
    return true;
}
//export the functions
export { isValidDate};