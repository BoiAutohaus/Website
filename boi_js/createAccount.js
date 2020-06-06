const isValidElement = element => {
  return element.name && element.value;
};

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  // Make sure the element has the required properties.
    if (isValidElement(element) ) {
    data[element.name] = element.value;
  }
  return data;
}, {});


const handleFormSubmit = event => {
	event.preventDefault();
	const data = formToJSON(form.elements);
	console.log(data)
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8000/api/benutzer";
	xhr.open("POST", url, true);
	//xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data)
};

const form = document.getElementsByClassName('regform')[0];
form.addEventListener('submit', handleFormSubmit);

