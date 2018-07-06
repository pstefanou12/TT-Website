/*This file runs a contact form validation script to make sure that people are actually putting in valid inputs for the contacct form*/ 

function CustomValidation () { 
	/*
	This constructor method creates a new 
	object for custom form validations
	*/
	this.invalidities = []; //array holds the invalidity messages that are returned when running the script
	this.validityChecks = []; //this array makes the checking validity agnostic --> holds the checks that must be run for the given input
}

CustomValidation.prototype = { 
	/*
	This prototype adds new functins/methods to 
	the object created above.
	*/

	addInvalidity: function(message) { 
		/*
		This helper function adds invalidities to the 
		invalidities array.
		Inputs: message - a string that represents an error message for the form user
		Outputs: returns nothing --> just adds something to invalidities array.
		*/
		this.invalidities.push(message); 
	},

	getInvalidities: function() { 
		/*
		This helper function returns all fo the invalidities 
		from the invalidities array.
		Inputs: no inputs
		Outputs: returns a string concatenated form of the invalidites array .
		*/
		return this.invalidities.join('. \n'); 
	},

	checkValidity: function(input) { 
		/*
		This helper function checks the validity of the inputs. 
		Inputs: 
		Outputs: 
		*/

		for ( var i = 0; i < this.validityChecks.length; i++ ) { 

			var isInvalid = this.validityChecks[i].isInvalid(input); 
			if (isInvalid) { 
				this.addInvalidity(this.ValidityChecks[i].invalidityMessage); 
				this.ValidityChecks[i].element.classList.add('invalid'); 
				this.ValidityChecks[i].element.classList.remove('valid'); 
			} else { 
				fnameValidityChecks[i].element.classList.remove('invalid'); 
				fnameValidityChecks[i].element.classList.add('valid'); 
			}

		}
	}


}; 

//this array contains all the checks that need to be performed on the first name inputs
var fnameValidityChecks = [
	{
		isInvalid: function(input) { 
			return input.value === ""; 
		}, 
		invalidityMessage: 'This Input Field is Required!', 
		element: document.querySelector("#fname") 
	}, 
	{ 
		isInvalid: function(input) { 
			return input.value.match(/[^A-z]/g); 
		}, 
		invalidityMessage: 'Only Letters are Allowed!', 
		element: document.querySelector("#fname") 
	}, 
	{ 
		isInvalid: function(input) { 
			return input.value.length < 100; 
		}, 
		invalidityMessage: "Input Must Be Less Than 100 Characters", 
		element: documnet.querySelector("#fname")
	}
]; 

//this array contains all the checks that need to be performed on the last name inputs
var lnameValidityChecks = [
	{
		isInvalid: function(input) { 
			return input.value === ""; 
		}, 
		invalidityMessage: 'This Input Field is Required!', 
		element: document.querySelector("#lname") 
	}, 
	{ 
		isInvalid: function(input) { 
			return input.value.match(/[^A-z]/g); 
		}, 
		invalidityMessage: 'Only Letters are Allowed!', 
		element: document.querySelector("#lname") 
	}, 
	{ 
		isInvalid: function(input) { 
			return input.value.length < 100; 
		}, 
		invalidityMessage: "Input Must Be Less Than 100 Characters", 
		element: documnet.querySelector("#lname")
	}
]; 

//this array contains all the checks that need to be performed on the email input 
var emailValidityChecks = [
	{ 
		isInvalid: function(input) { 
			return input.value === ""; 
		}, 
		invalidtyMessage: 'This Input Field is Required!', 
		element: document.querySelector("#email")
	}, 
	{ 
		isInvalid: function(input) { 
			return input.value.match(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|
				(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		}, 
		invalidityMesage: 'Invalid Email Address!', 
		element: document.querySelector("#email")
	}, 
	{
		isInvalid: function(input) { 
			return input.value.length < 100; 
		}, 
		invalidityMessage: "Input Must Be Less Than 100 Characters", 
		element: documnet.querySelector("#email")
	}
]; 

//this array contains all the checks that need to be performed on the subject input
var subjectValidityChecks = [
	{ 
		isInvalid: function(input) { 
			return input.value === ""; 
		}, 
		invalidityMesage: 'This Input Field is Required!', 
		element: document.querySelector('#subj')
	}, 


]; 

//this array contains all the checks that need to be perfomed on the message input
var messageValidityChecks = [
	{ 
		isInvalid: function(input) { 
			return input.value === ""; 
		}, 
		invalidityMesage: 'This Input Field is Required!', 
		element: document.querySelector('#msg')
	}, 
	{
		isInvalid: function(input) { 
			return input.value.length < 100; 
		}, 
		invalidityMessage: "Input Must Be Less Than 100 Characters", 
		element: documnet.querySelector("#msg")
	}
]; 

function checkValidity(input) { 
	input.CustomValidation.invalidities = []; 
	input.customValidation.checkValidity(input); 

	if ( input.CustomValidation.invalidities.length === 0 && input.value != '' ) { 
		input.setCustomValidity(''); 
	} else { 
		var message = input.CustomValidation.getInvalidities(); 
		input.setCustomValidity(message); 
	}
}


//variables are the inputs values from the contact form 
var fname = document.getElementById("first");
var lname = document.getElementById("last"); 
var email = document.getElementById("email"); 
var subject = document.getElementById("subj"); 
var message = document.getElementById("msg");  

//initialization of CustomValidation objects for each of the inputs
fname.CustomValidation = new CustomValidation(); 
fname.CustomValidation.validityChecks = fnameValidityChecks; 

lname.CustomValidation = new CustomValidation(); 
lname.CustomValidation.validityChecks = lnameValidityChecks; 

email.CustomValidation = new CustomValidation(); 
email.CustomValidation.validityChecks = emailValidityChecks; 

subject.CustomValidation = new CustomValidation(); 
subject.CustomValidation.validityChecks = subjectValidityChecks; 

message.CustomValidation = new CustomValidation(); 
message.CustomValidation.validityChecks = messageValidityChecks; 

var inputs = document.querySelectorAll('input:not([type="submit"])'); 
for ( var i = 0; i < inputs.length; i++ ) { 
	inputs[i].addEventListener('keyup', function() { 
		checkValidity(this); 
	})
}

var submit = document.querySelector('input[type="submit"]'); 

submit.addEventListener('click', function() {
	for ( var i = 0; i < inputs.length; i++ ) { 
		checkValidity(this); 
	}); 
