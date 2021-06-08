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



///////////////////////////////////////////////////////////////////////////////
///////////////////////////// UPLOAD SESCTION START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("p:first-of-type"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    //adding some valid image extensions in array
    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]; 
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
             let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an supported file type!");
        dropArea.classList.remove("active");
        dragText.innerHTML = 'Drag your file here or <button type="button">browse</button>';
    }
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////// UPLOAD SESCTION END ///////////////////////////
///////////////////////////////////////////////////////////////////////////////