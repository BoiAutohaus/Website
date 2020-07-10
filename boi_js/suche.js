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

  const handleFormSubmitII = event => {
    event.preventDefault();
    const data = formToJSON(form.elements);
    var myJSON = JSON.stringify(data);
    console.log(myJSON);
    var xhr = new XMLHttpRequest();
    
    var url = "http://localhost:8000/api/auto";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(myJSON)
    xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
            var json1 = JSON.parse(xhr.responseText);
            console.log("Success request");
            renderCars(json1);
			//window.alert(data2.mail + ", Sie haben sich efolgreich angemeldet "+ json1.mail);
		}
		else if(xhr.readyState === 4 && xhr.status === 401) {
      var json2 = JSON.parse(xhr.responseText);
      
			console.log("Bad request");
			window.alert("Error: "  +  json2.nachricht);
    }}
  }
  

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
            var json1 = JSON.parse(xhr.responseText);
            console.log("Success request");
      //window.alert(data2.mail + ", Sie haben sich efolgreich angemeldet "+ json1.mail);
      renderCars(json1);
    }
    else if(xhr2.readyState === 4 && xhr2.status === 401) {
      var json2 = JSON.parse(xhr2.responseText);
        
      console.log("Bad request");
      window.alert("Error: "  +  json2.nachricht);
    }    		
	}
};

const form = document.getElementsByClassName('suchform')[0];
form.addEventListener('submit', handleFormSubmitII);
const form_searchbar = document.getElementsByClassName('form-inline')[0];
console.log(form_searchbar);
form_searchbar.addEventListener('submit', handleFormSubmitIII);


function renderCars(cars) {
  cars = JSON.stringify(cars)
  const card = $('<div class="card"/>');
  const cardHeader = $('<div class="card-header" />');
  const entriesContainer = $('#guestbookEntriesContainer');
  const suchContainer = $('#main2');
  suchContainer.empty();
  entriesContainer.empty();
  //cardHeader.text("Eintrag #" + cars);
  if(cars.modell == undefined){
	  if(cars.0.modell == undefined){
			cardHeader.text("No Results Found");
			card.append(cardHeader);
			entriesContainer.append(card);
		}else{
			var i;
			for(i=0;i<cars.length;i++){
				cardHeader.text(cars.i.modell)
				card.append(cardHeader);
				entriesContainer.append(card);
		  }
	  }
  }else{
		cardHeader.text(cars.modell+":<br><br>"+"Co2 Emissionen<br>"+"KraftstoffVerbrauch<br><br>"+cars.sprit+"<br>"+"Baujahr<br><br><br>"); 
		card.append(cardHeader);
		entriesContainer.append(card);
  }
  
  //cardHeader.text("KraftstoffVerbrauch<br><br>");
  //cardHeader.text("Co2 Emissionen<br>");
  //cardHeader.text(cars.sprit+"<br>");
  //cardHeader.text("Baujahr<br><br><br>");
  //const deleteButton = $('<button data-id="' + cars.id + '" class="btn btn-sm btn-danger float-right delete-button">Löschen</button>');
  //cardHeader.append(deleteButton);

  card.append(cardHeader);

  const cardBody = $('<div class="card-body" />');
  // This allows HTML Injection! Demo purpose only! Better use .text()!
  //cardBody.html(cars.text);
  card.append(cardBody);

 
  
  
  
  
}

