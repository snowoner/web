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

    // Get 
    
  
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
    

    // form.first_name.focus();
    // form.first_name.style.borderColor = "red";

    // return false;


    // If all else fails, return a generic catchall error
    // return 'The value you entered for this field is invalid.';

};


// Show an error message
var showError = function (field, error) {

    var valor =field.value;
    // Add error class to field
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
  
    // Get field id or name
    // var id = field.id;
    // if (!id) return;
  
    // Check if error message field already exists
    // If not, create one
    
    
  };


  var removeError = function (field) {

    // Remove error class to field
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
