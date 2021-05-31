////GLOBAL FUNCTIONS
function goBack() {
    window.history.back();
}

//handles click event for the "go-back" element
document.querySelectorAll(".main .go-back").forEach(element => element.addEventListener("click", goBack));

function openNav() {
    document.querySelector(".sidebar-wrapper").style.width = "248px";
    document.querySelector(".main").style.marginLeft = "248px";
}

function closeNav() {
    document.querySelector(".sidebar-wrapper").style.width = "0";
    document.querySelector(".main").style.marginLeft = "0";
}