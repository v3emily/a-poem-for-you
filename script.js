//save() and load() functions inspired by Google Overview
function save() {
    const text = document.getElementById("input").textContent.trim().toLowerCase().replaceAll(/[!,.]/g,"");
    localStorage.setItem('savedQuote', text);
    console.log(text);
}

function load() {
    //parse data
    const inputText = window.localStorage.getItem("savedQuote")
    const inputTextSplit = inputText.split(' ')
    console.log(inputTextSplit);
}