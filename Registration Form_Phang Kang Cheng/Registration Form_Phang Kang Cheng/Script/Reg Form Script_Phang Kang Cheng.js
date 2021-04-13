var isUserIdValid = false;
var isPasswordValid = false;
var isNameValid = false;
var isCountryValid = false;
var isEmailValid = false;
var isZipValid = false;
var gendervalid = false;
var languagevalid = false;

function isFormValid() {
    if(isUserIdValid===true && isPasswordValid===true && isZipValid===true && isNameValid===true && isEmailValid===true && isCountryValid===true && languagevalid===true){
        return true;
    }
    else {
        document.getElementById("submitBtn").disabled=true;
        return false;
    }
}

var userid = document.getElementById('userid');
function userid_length(e) {
    var useridLength = e.target.value.length;
    if (useridLength >= 5 && useridLength <= 12) {
        e.target.nextElementSibling.innerHTML = "";
        isUserIdValid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
    else {  
        e.target.nextElementSibling.innerHTML = "Required and must be of length 5 to 12";
        document.getElementById("submitBtn").disabled=true;
        isUserIdValid=false;
    }
}
userid.addEventListener("blur",userid_length)
userid.addEventListener("keyup",userid_length)

var password = document.getElementById('password')
function passwordcheck(e) {
    var passwordLength = e.target.value.length;
    if (passwordLength >=7 && passwordLength <=12) {
        e.target.nextElementSibling.innerHTML = "";
        isPasswordValid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
    else {
        e.target.nextElementSibling.innerHTML = "Required and must be of length 7-12 characters";
        document.getElementById("submitBtn").disabled=true;
        isPasswordValid=false;
    }
}

password.addEventListener("keyup",passwordcheck);
password.addEventListener("blur", passwordcheck);


var Name = document.getElementById('name');

function namevalidation (e) {
    var alpha = /^[a-zA-Z\s]+$/;
    if (Name.value.match(alpha)) {
        e.target.nextElementSibling.innerHTML = "";
        isNameValid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
    else {
        e.target.nextElementSibling.innerHTML ="Required and alphabets only.";
        document.getElementById("submitBtn").disabled=true;
        isNameValid=false;
    }
}

Name.addEventListener('keyup', namevalidation);
Name.addEventListener("blur", namevalidation);

var Country = document.getElementById('country')
function countryvalidation(e) {
    if (Country.value === "") {
        e.target.nextElementSibling.innerHTML = "Required. Must select a country.";
        document.getElementById("submitBtn").disabled=true;
        isCountryValid=false;
    }
    else {
        e.target.nextElementSibling.innerHTML = "";
        isCountryValid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
}

Country.addEventListener("keydown", countryvalidation);
Country.addEventListener("blur", countryvalidation);

var zipcode_ = document.getElementById('zipcode')
function zipcodevalidation (e) {
    if (zipcode_.value.match(/^[0-9]+$/)) {
        e.target.nextElementSibling.innerHTML = "";
        isZipValid = true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
    else {
        e.target.nextElementSibling.innerHTML = "Required. Must be numeric only.";
        document.getElementById("submitBtn").disabled=true;
        isZipValid=false;
    }
}

zipcode_.addEventListener("keyup", zipcodevalidation);
zipcode_.addEventListener("blur", zipcodevalidation);

var Email = document.getElementById('email')
function emailvalidation(e) {
    if (Email.value === "") {
        e.target.nextElementSibling.innerHTML = "Required. Must be a valid email.";
        document.getElementById("submitBtn").disabled=true;
        isEmailValid=false;
    }
    else {
        e.target.nextElementSibling.innerHTML = "";
        isEmailValid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
        }
    }
}

Email.addEventListener("keyup", emailvalidation);
Email.addEventListener("blur", emailvalidation);


var gender=[];
function checkgender() {
    var checkedGender = [];
    for(var i = 0; i <= document.regform.gender.length-1; i++) {
        if(document.regform.gender[i].checked===true) {
            checkedGender.push(document.regform.gender[i].value);
        }    
    }     
    if (checkedGender.length != 0){
        gendervalid=true;
        if(isFormValid()===true){
        document.getElementById("submitBtn").disabled=false;
    }
}
    else{
        document.getElementById("submitBtn").disabled=true;
        gendervalid=false;
    }
}

var language=[];
function checklanguage() {
    var checkedLanguage=[];
    for(var i = 0; i <= document.regform.language.length-1; i++){
        if(document.regform.language[i].checked===true){
            checkedLanguage.push(document.regform.language[i].value);
        }
    }
    if(checkedLanguage.length != 0){
        languagevalid=true;
        if(isFormValid()===true){
            document.getElementById("submitBtn").disabled=false;
    }
}
    else{
        document.getElementById("submitBtn").disabled=true;
        languagevalid=false;
    }
}

function save(e) {
    e.preventDefault();

    document.regform.hidden = true;

        const formData = new FormData(document.regform)
        var inames = [];
        var myformdata = {};

        for (let k of formData.keys()) {
            if (!inames.includes(k)) {
                inames.push(k);
                myformdata[k] = formData.getAll(k)
            }
        }
        console.log(myformdata);
        //displaying the values of the form
        for (let k in myformdata) {
            var print = document.createElement("table");
            print.textContent = k + " : " + myformdata[k];
            document.getElementById("filledform").appendChild(print);
        }
    }
    

    

