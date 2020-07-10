
function renderCars(cars) {
  //cars = JSON.stringify(cars);
  //cars = JSON.parse(cars);
  cars = cars.daten; // Removing Shell
  console.log(cars);
  const card = $('<div class="card"/>');
  const cardHeader = $('<div class="card-header" />');
  const entriesContainer = $('#guestbookEntriesContainer');
  const suchContainer = $('#main2');
  const cardBody = $('<div class="card-body" />');


  suchContainer.empty();
  entriesContainer.empty();
  //cardHeader.text("Eintrag #" + cars);
  if(cars.Modell == undefined){
	  if(Object.keys(cars).length === 0){
			cardHeader.text("No Results Found");
			card.append(cardHeader);
			entriesContainer.append(card);
			console.log("Found 0 Entry");
		}else{
      
      //const cardTable = $('<table class="table" width="90% />');
      const cardTable = document.createElement("table");
      cardTable.class = "table";
      cardTable.width = "90%";
      var i;
			for(i=0;i<Object.keys(cars).length;i++){
				/*cardHeader.text(cars[i].Modell)
				console.log(cars[i].Modell);
				card.append(cardHeader);
				entriesContainer.append(card);
        console.log("Entry "+i)*/
        
        //const cardDiv = $('<div class="table-responsive greybackground" style="width: 80%;" />');
        const cardDiv = document.createElement("div");
        cardDiv.class = "table-responsive greybackground";
        cardDiv.style = "width: 80%";

        
        //cardTable.appendChild(cardTableRow);
        //const cardTableRow = $('<tr/>');
        const cardTableRow = document.createElement("tr");
        //cardTableRow.appendChild(cardTD);

        //const cardTD = $('<td width="35%"/>');
        const cardTD = document.createElement("td");
        cardTD.width = "35%";  
        /*cardTD.appendChild(cardBild);
        cardTD.appendChild(cardTD);  */ 

        //const cardBild = $('<img src=boi_bilder/'+ cars[i].Bild +' width="500px" alt="AutoBild" />');
        const cardBild = document.createElement("img");
        cardBild.src = "boi_bilder/" + cars[i].Bild;
        cardBild.width = "500px";
        cardBild.alt = "AutoBild";
        
        
        //const cardTD2 = $('<td id="greyinbox" width="55%" />');
        const cardTD2 = document.createElement("td");
        cardTD2.id = "greyinbox";
        cardTD2.width = "35%";
        //cardTD2.appendChild(cardP);

        
        //const cardP = $('<p> </p>');
        const cardP = document.createElement("p");
        //cardP.text(cars[i].Marke + cars[i].Modell);
        //cardP.appendChild(cardh2);
        
        //const cardh2 = $('<h2  style="color:red; text-align:center;" />');
        const cardh2 = document.createElement("h2");
        cardh2.style = "color:red; text-align:center;";
        /*cardh2.appendChild(cardA); 
        cardh2.text("Preis: " + cars[i].Preis);*/
        
        //const cardA = $('<a href="ZumDeal_MBAK.html" />');
        const cardA = document.createElement("a");
        cardA.href = "ZumDeal_MBAK.html";
        //cardA.appendChild(cardButton);

        //const cardButton = $('<button type="button"/> ');
        const cardButton = document.createElement("button");
        cardButton.type = "button";
        //cardButton.text("Zum Deal");
        
        card.appendChild(cardHeader);
        cardA.appendChild(cardButton.text("Zum Deal"));
        cardh2.appendChild(cardA);        
        cardh2.text("Preis: " + cars[i].Preis);
        cardP.text(cars[i].Marke + cars[i].Modell);
        cardTD2.appendChild(cardP);
        cardTD.appendChild(cardBild);
        cardTD.appendChild(cardTD2);        
        cardTableRow.appendChild(cardTD);
        cardTable.appendChild(cardTableRow);         
        cardDiv.appendChild(cardTable);        
        cardBody.appendChild(cardDiv);        
        card.appendChild(cardBody);        
        entriesContainer.append(card);             

        
		  }
				console.log("Entry: "+i);
			}
			console.log("Found x Entries");
			console.log(cars[0]);
	  }
  
  else{
		cardHeader.text(cars.modell+":<br><br>"+"Co2 Emissionen<br>"+"KraftstoffVerbrauch<br><br>"+cars.sprit+"<br>"+"Baujahr<br><br><br>"); 
		card.append(cardHeader);
		entriesContainer.append(card);
		console.log("Found 1 Entries");
  }
  
  //cardHeader.text("KraftstoffVerbrauch<br><br>");
  //cardHeader.text("Co2 Emissionen<br>");
  //cardHeader.text(cars.sprit+"<br>");
  //cardHeader.text("Baujahr<br><br><br>");
  //const deleteButton = $('<button data-id="' + cars.id + '" class="btn btn-sm btn-danger float-right delete-button">Löschen</button>');
  //cardHeader.append(deleteButton);

  card.append(cardHeader);

  //const cardBody = $('<div class="card-body" />');
  // This allows HTML Injection! Demo purpose only! Better use .text()!
  //cardBody.html(cars.text)  

};




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
			console.log(json1);
            renderCars(json1);
		}
		else if(xhr.readyState === 4 && xhr.status === 401) {
			var json2 = JSON.parse(xhr.responseText);
			console.log("Bad request");
			window.alert("Error: "  +  json1.nachricht);
		}
	}
};
  

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
			console.log(json1);/*
			json1 = json1.daten;
			json1 = JSON.parse(json1);
			console.log("stripping json");
			console.log(json1);*/
			renderCars(json1);
			}
		else if(xhr2.readyState === 4 && xhr2.status === 401) {
		  var json2 = JSON.parse(xhr2.responseText);  
		  console.log("Bad request");
		  //window.alert("Error: "  +  json2.nachricht);
		}    		
	}
};

const form = document.getElementsByClassName('suchform')[0];
form.addEventListener('submit', handleFormSubmitII);
const form_searchbar = document.getElementsByClassName('form-inline')[0];
//console.log(form_searchbar);
form_searchbar.addEventListener('submit', handleFormSubmitIII);


