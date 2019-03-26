// function validacion(form) {


// //Validamos First Name
// valor = document.getElementById("first_name").value;
//   var re = /^[\w ]+$/;
//   if (valor == null || valor.length < 2 || /^\s+$/.test(valor) || !re.test(valor)) {
//     alert('[ERROR] First Name contains invalid characters!');
//     form.first_name.focus();
//     form.first_name.style.borderColor = "red";

//     return false;
//   }
//   return true;
// }





var hasError = function (field) {

    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    if (field.id == "first_name") {
        var valor=field.value;
        var re = /[^a-zA-Z]/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (re.test(joined)) {
            return '4!.?2(@9# etc.. incorrect characters or numbers';
        }
        else return;
    }

    else if (field.id == "last_name") {
        var valor=field.value;
        var re = /[^a-zA-Z]/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (re.test(joined)) {
            return '!.?¿)(@# etc.. incorrect characters or numbers';
        }
        else return;
    }

    else if (field.id == "adr") {
        var valor=field.value;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }  
        else return;
    }

    else if (field.id == "city") {
        var valor=field.value;
        var re = /[^a-zA-Z]/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (re.test(joined)) {
            return '!.?¿)(@# etc.. incorrect characters or numbers';
        }
        else return;
    }

    else if (field.id == "zip") {
        var valor=field.value;
        var re = /^[0-9]{5}$/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (!re.test(joined)) {
            return 'Zip Code has 5 numbers';
        }
        else return;
    }

    else if (field.id == "parent") {
        var valor=field.value;
        var re = /[^a-zA-Z]/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (re.test(joined)) {
            return '4!.?2(@9# etc.. incorrect characters or numbers';
        }
        else return;
    }

    else if (field.id == "phone") {
        var valor=field.value;
        var re = /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill this field whit a real phone number.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (!re.test(joined)) {
            return 'Tipical PhoneNumber : "(123) 456 7899"';
        }
        else return;
    }

    else if (field.id == "mail") {
        var valor=field.value;
        var re = /\S+@\S+\.\S+/;
        var joined = valor.split(" ").join("");
        var space = /^[\s]+/;
        console.log(valor);
        if (valor == null || joined.length < 2) {
            return 'Please fill this field whit real Email';
        }
        else if (space.test(valor)) {
            
            return 'Can not have spaces at the beginning';
        }
        else if (!re.test(joined)) {
            return 'Tipical email yourname@gmail.com';
        }
        else return;
    }

    else if (field.id == "signature") {
        var valor=field.value;
        var re = /[^a-zA-Z]/;
        var joined = valor.split(" ").join("");
        if (valor == null || joined.length < 2) {
            return 'Please fill out this field 2 or more characters.';
        }
        else if (/^[\s]+/.test(valor)) {
            return 'Can not have spaces at the beginning';
        }
        else if (re.test(joined)) {
            return '4!.?2(@9# etc.. incorrect characters or numbers';
        }
        else return;
    }
    

    
    // If all else fails, return a generic catchall error
    // return 'The value you entered for this field is invalid.';

};


// Show an error message
var showError = function (field, error) {

    
    var valor = field.value;
    // Add error class to field
    somthing=document.getElementById(field.id).parentElement.parentElement;
    
    var div = document.createElement("div");
    div.id=field.id +"-error";
    div.style.background = "red";
    div.style.color = "white";
    div.innerHTML = error;
    div.classList.add('white');
    div.classList.add('row');
    insertAfter(somthing,div);


    console.log(somthing);
    field.classList.add('error');
    field.classList.add('error-message');
    field.classList.add('Red');
    if(valor.length <2){
        field.placeholder=error;
        field.value=null;
    }
    else {
        field.placeholder = "("+valor +") "+ error;
        field.value = null;
    }
 
    
  
  
    // // If the field is a radio button and part of a group, error all and get the last item in the group
    // if (field.type === 'radio' && field.name) {
    //     var group = document.getElementsByName(field.name);
    //     if (group.length > 0) {
    //         for (var i = 0; i < group.length; i++) {
    //             // Only check fields in current form
    //             if (group[i].form !== field.form) continue;
    //             group[i].classList.add('error');
    //         }
    //         field = group[group.length - 1];
    //     }
    // }
  
  
    
    
  };


  var removeError = function (field) {

    // Remove error class to field

    somthing=document.getElementById(field.id +"-error");
    somthing.innerHTML = '';
    somthing.style.display = 'none';
    somthing.style.visibility = 'hidden';
    field.classList.remove('error');
    field.classList.remove('error-message');
    field.classList.remove('Red');
    
    // // If the field is a radio button and part of a group, remove error from all and get the last item in the group
    // if (field.type === 'radio' && field.name) {
    //     var group = document.getElementsByName(field.name);
    //     if (group.length > 0) {
    //         for (var i = 0; i < group.length; i++) {
    //             // Only check fields in current form
    //             if (group[i].form !== field.form) continue;
    //             group[i].classList.remove('error');
    //         }
    //         field = group[group.length - 1];
    //     }
    // }
  
    // // Get field id or name
    // var id = field.id || field.name;
    // if (!id) return;
    
  
    // // Check if an error message is in the DOM
    // var message = field.form.querySelector('.error-message#error-for-' + id + '');
    // if (!message) return;
  
    // // If so, hide it
    // message.innerHTML = '';
    // message.style.display = 'none';
    // message.style.visibility = 'hidden';
  
  };


// Listen to all blur events
document.addEventListener('blur', function (event) {

    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // Validate the field
    var error = hasError(event.target);
    // If there's an error, show it
    if (error) {
        showError(event.target, error);
        return;
    }
    // Otherwise, remove any existing error message
    removeError(event.target);

}, true);


// e: el nodo tras el que se quiere insertar otro.
// i: el nodo que se quiere insertar.

function insertAfter(e,i){ 
    if(e.nextSibling){ 
        e.parentNode.insertBefore(i,e.nextSibling); 
    } else { 
        e.parentNode.appendChild(i); 
    }
}



//   // Check all fields on submit
//   document.addEventListener('submit', function (event) {

//     // Only run on forms flagged for validation
//     if (!event.target.classList.contains('validate')) return;

//     // Get all of the form elements
//     var fields = event.target.elements;

//     // Validate each field
//     // Store the first field with an error to a variable so we can bring it into focus later
//     var error, hasErrors;
//     for (var i = 0; i < fields.length; i++) {
//         error = hasError(fields[i]);
//         if (error) {
//             showError(fields[i], error);
//             if (!hasErrors) {
//                 hasErrors = fields[i];
//             }
//         }
//     }

//     // If there are errrors, don't submit form and focus on first element with error
//     if (hasErrors) {
//         event.preventDefault();
//         hasErrors.focus();
//     }

//     // Otherwise, let the form submit normally
//     // You could also bolt in an Ajax form submit process here

//   }, false);



//-------------------------------TAB CONTROL------------------------------------------//


// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

// function showTab(n) {
//   // This function will display the specified tab of the form...
//   var x = document.getElementsByClassName("tab");
//   x[n].style.display = "block";
//   //... and fix the Previous/Next buttons:
//   if (n == 0) {
//     document.getElementById("prevBtn").style.display = "none";
//   } else {
//     document.getElementById("prevBtn").style.display = "inline";
//   }
//   if (n == (x.length - 1)) {
//     document.getElementById("nextBtn").innerHTML = "Submit";
//   } else {
//     document.getElementById("nextBtn").innerHTML = "Next";
//   }
//   //... and run a function that will display the correct step indicator:
//   fixStepIndicator(n)
// }

// function nextPrev(n) {
//   // This function will figure out which tab to display
//   var x = document.getElementsByClassName("tab");
//   // Exit the function if any field in the current tab is invalid:
//   if (n == 1 && !validateForm()) return false;
//   // Hide the current tab:
//   x[currentTab].style.display = "none";
//   // Increase or decrease the current tab by 1:
//   currentTab = currentTab + n;
//   // if you have reached the end of the form...
//   if (currentTab >= x.length) {
//     // ... the form gets submitted:
//     document.getElementById("regForm").submit();
//     return false;
//   }
//   // Otherwise, display the correct tab:
//   showTab(currentTab);
// }

// function validateForm() {
//   // This function deals with validation of the form fields
//   var x, y, i, valid = true;
//   x = document.getElementsByClassName("tab");
//   y = x[currentTab].getElementsByTagName("input");
//   // A loop that checks every input field in the current tab:
//   for (i = 0; i < y.length; i++) {
//     // If a field is empty...
//     if (y[i].value == "") {
//       // add an "invalid" class to the field:
//       y[i].className += " invalid";
//       // and set the current valid status to false
//       valid = false;
//     }
//   }
//   // If the valid status is true, mark the step as finished and valid:
//   if (valid) {
//     document.getElementsByClassName("step")[currentTab].className += " finish";
//   }
//   return valid; // return the valid status
// }

// function fixStepIndicator(n) {
//   // This function removes the "active" class of all steps...
//   var i, x = document.getElementsByClassName("step");
//   for (i = 0; i < x.length; i++) {
//     x[i].className = x[i].className.replace(" active", "");
//   }
//   //... and adds the "active" class on the current step:
//   x[n].className += " active";
// }

//-----------------------------------------------------------------------------------//