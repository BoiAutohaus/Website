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
	var myJSON = JSON.stringify(data);
	console.log(myJSON);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:8000/api/register";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(myJSON);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json1 = JSON.parse(xhr.responseText);
			window.alert(json1.email + json1.password);
		}
	};
	
};
const handleAnSubmit = event => {
	event.preventDefault();
	const data2 = formToJSON(form1.elements);
	var myJSON2 = JSON.stringify(data2);
	console.log(myJSON2);
	var xhr2 = new XMLHttpRequest();
	var url2 = "http://localhost:8000/api/login";
	xhr2.open("POST", url2, true);
	xhr2.setRequestHeader("Content-Type", "application/json");
	xhr2.send(myJSON2);


};
const form = document.getElementsByClassName('regform')[0];
form.addEventListener('submit', handleFormSubmit);

const form1 = document.getElementsByClassName('anform')[0];
form1.addEventListener('submit', handleAnSubmit);
