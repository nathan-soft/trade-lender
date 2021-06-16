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
///////////////////////////// PROFILE UPDATE SESCTION START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

function goToAccountSetupTab(){
    //hide the upload profile picture tab.
    document.querySelector("#uploadProfilePictureTab").classList.add("d-none")
    //shows the ACCOUNT SETUP TAB
    document.querySelector("#accountSetupTab").classList.remove("d-none");
    resetProfileUpdatePage();
}

function resetProfileUpdatePage() {
    //adds background color to the main content.
    document.querySelector("body").classList.add("bg-white");
}

function goToNextTab() {
    let tabContainer = document.querySelector(".tab-container");
    let currentTab = tabContainer.querySelector(".tab-item.active");
    let navContainer = document.querySelector(".accountSetup-navigation-bar");
    //make next tab active
    let nextTab = currentTab.nextElementSibling;
    if (nextTab != null) {
        nextTab.classList.add("active");
        //remove the current tab from being active
        currentTab.classList.remove("active");

        //remove the active nav menu
        navContainer.querySelector(".nav-item.active").classList.remove("active");
        if (nextTab.id == "businessDetails") {
            //set new active menu
            navContainer.querySelector(".nav-item:nth-of-type(2)").classList.add("active");
        } else {
            //set new active menu
            navContainer.querySelector(".nav-item:last-of-type").classList.add("active");
        }
    }

}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////// LOAN INDEX PAGE START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

document.querySelectorAll(".loan-grid-navigation-bar .nav-link").forEach(element =>{
    element.addEventListener("click", goToNextTab);
});

//add change event listener to dropdown.
let dropdown = document.querySelector(".loan-grid-navigation-bar .dropdown-nav select");
if (dropdown != null) {
    dropdown.addEventListener("change", (e) => {
            //get the selected value.
            let selectedValue = e.target.value;
            //get the anchor tag with href matching the selected value
            //and call it's clcik event.
            document.querySelector(`.loan-grid-navigation-bar .nav-item a[href="#${selectedValue}"]`).click();
    });
}

function goToNextTab(e) {
    //prevent default anchor element behaviour.
    e.preventDefault();
    let anchorParent = e.target.parentElement;
    //get current active anchor tag parent and make unactive.
    let currentActiveAnchorParent = anchorParent.parentElement.querySelector(".nav-item.active");
    currentActiveAnchorParent.classList.remove("active");
    //get current active anchor tag
    let activeAnchorTag = currentActiveAnchorParent.querySelector(".nav-link");
    //get the id of the tab to navigate to.
    let tabId = e.target.href.split("#")[1];
    //hide the active tab.
    document.querySelector(`#${activeAnchorTag.href.split("#")[1]}`).classList.add("d-none");
    //make the clicked menu/anchor tag the active one.
    anchorParent.classList.add("active");
    //set the value of the drop-down in the navigation menu to match the href of the clicke link.
    setDropDownNavigationValue(`${tabId}`);
    document.querySelector(".loan-grid-navigation-bar .dropdown-nav select").selec
    //make the tab whose id matches the clicked anchor element "href" attribute, active.
    document.querySelector(`#${tabId}`).classList.remove("d-none");

}

function setDropDownNavigationValue(valueToSelect) {
    let element = document.querySelector(".loan-grid-navigation-bar .dropdown-nav select");
    element.value = valueToSelect;
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////// LOAN VIEW PAGE START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

//get the loan view container.
let loanViewContainer = document.querySelector("#loanView");
if (loanViewContainer != null) {
    //get the status text.
    let loanStatus = loanViewContainer.querySelector(".loan-status-container .card-text").textContent;
    if(loanStatus == "Approved"){
        //show "View offer letter" button
        loanViewContainer.querySelector(".view-offer-letter-container").style.display = "block"
    }
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////// CREATE LOAN PAGE START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

//get the "create new loan" form.
let loanForm = document.querySelector("form#createLoan");
if (loanForm != null) {
    //get "what do you need it for dropdown" and attach a change event listener
    loanForm.querySelector("select#loanFor").addEventListener("change", (e) => {
        //get the selected value.
        let selectedValue = e.target.value;
        if (selectedValue == "Working Capitals") {
            hideNonEssentialControls();
            //show the loan description block
            loanForm.querySelector(".loan-desc-container").classList.remove("d-none");
        } else if (selectedValue == "LPO") {
            hideNonEssentialControls();
            //show the "Upload LPO block"
            loanForm.querySelector(".lpo-container").classList.remove("d-none");
            //show the "Upload Proforma Invoice" block
            loanForm.querySelector(".proforma-container").classList.remove("d-none");
        } else {
            hideNonEssentialControls();
        }
    });
}

function hideNonEssentialControls(){
    //hide the loan description block
    loanForm.querySelector(".loan-desc-container").classList.add("d-none");
     //hide the "Upload LPO block"
     loanForm.querySelector(".lpo-container").classList.add("d-none");
     //hide the "Upload Proforma Invoice" block
     loanForm.querySelector(".proforma-container").classList.add("d-none");
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////// UPLOAD SESCTION START ///////////////////////////
///////////////////////////////////////////////////////////////////////////////

let file; //this is a global variable and we'll use it inside multiple functions

 document.querySelectorAll(".drag-area").forEach(element =>{
     //selecting all required elements
    let dropArea = element;
    let dragText = dropArea.querySelector("p:first-of-type");
    let button = dropArea.querySelector("button");
    let input = dropArea.querySelector("input");

    //If user Drag File Over DropArea
    element.addEventListener("dragover", (event) => {
        event.preventDefault(); //preventing from default behaviour
        element.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    //If user leave dragged File from DropArea
    element.addEventListener("dragleave", () => {
        element.classList.remove("active");
        dragText.innerHTML = 'Drag your file here or <button type="button">browse</button>';
    });

    //If user drop File on DropArea
    element.addEventListener("drop", (event) => {
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = event.dataTransfer.files[0];
        showFile(dropArea, dragText); //calling function
    });

    button.onclick = () => {
        input.click(); //if user click on the button then the input also clicked
    }

    input.addEventListener("change", function () {
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file = this.files[0];
        dropArea.classList.add("active");
        showFile(dropArea, dragText); //calling function
    });
 });




function showFile(dropArea, dragText) {
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