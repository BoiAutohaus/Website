
// Function for Checking if Element is Valid
const isValidElement = element => {  
	return element.name && element.value;
};
 
// Function to turn a form into a JSON Object
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    // Make sure the element has the required properties.
	if (isValidElement(element) ) {
		data[element.name] = element.value;
    }
    return data;
}, {});
  
// Handle suchbar
const handleFormSubmitIII = event => {    
	event.preventDefault();
    const data = formToJSON(form_searchbar.elements);
    console.log(data);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var xhr2 = new XMLHttpRequest();
      
    var url = "http://localhost:8000/api/auto/suche";
    xhr2.open("POST", url, true);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.send(myJSON)
    xhr2.onreadystatechange = function () {
		if (xhr2.readyState === 4 && xhr2.status === 200) {
			var json1 = JSON.parse(xhr2.responseText);
			console.log("Success request");
			console.log(json1);
			renderCars(json1);
			}
		else if(xhr2.readyState === 4 && xhr2.status === 401) {
		  var json2 = JSON.parse(xhr2.responseText);  
		  console.log("Bad request");
		  window.alert(json2.nachricht);
		}    		
	}
};


// suchbar
const form_searchbar = document.getElementsByClassName('form-inline')[0];
form_searchbar.addEventListener('submit', handleFormSubmitIII);


