
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
	if(cars.Modell == undefined){
		if(Object.keys(cars).length === 0){
			cardHeader.text("No Results Found");
			card.append(cardHeader);
			entriesContainer.append(card);
			console.log("Found 0 Entry");
		}else{
			//const cardTable = $('<table class="table" width="90% />');
			const cardTable = document.createElement("table");
			cardTable.class = "table table-responsive greybackground";
			cardTable.width = "90%";
			var i;
			for(i=0;i<Object.keys(cars).length;i++){
				// DEBUG ---------------------
				console.log("Found x Entries");
				console.log("Debug, Entry: "+ i);
				console.log(cars[i]);
				console.log(cars[i].Modell);
				console.log("Debug Ende");
				//----------------------------
				//const cardDiv = $('<div class="table-responsive greybackground" style="width: 80%;" />');
				/*const cardDiv = document.createElement("div");
				cardDiv.class = "table-responsive greybackground";
				cardDiv.style = "width: 80%";
					*/
				

				// Create Table Row
				const cardTableRow = document.createElement("tr");


				// Create Table Column
				const cardTD = document.createElement("td");
				cardTD.width = "35%";  

				// Create Picture
				const cardBild = document.createElement("img");
				cardBild.src = "boi_bilder/" + cars[i].Bild;
				cardBild.style ="width=500px";
				cardBild.alt = "AutoBild";
				
				// Create 2nd Column
				const cardTD2 = document.createElement("td");
				cardTD2.id = "greyinbox";
				cardTD2.width = "35%";

				// Create Paragraph with Text
				const cardP = document.createElement("p");
				cardP.innerHTML = "Hier Kommt der Text über das Auto hin";
				
				// Create Headline (Preistag) 
				const cardh2 = document.createElement("h2");
				cardh2.style.color = "red";
				cardh2.style.float = "center";
				cardh2.innerHTML = "Preis: " + cars[i].Preis+"€";
				
				// Create Button for Link
				const cardButton = document.createElement("button");
				cardButton.className = "btn btn-primary";
				cardButton.type = "button";
				cardButton.style.float = "right";
				cardButton.style.width = "100px";
				cardButton.style.height = "50px";
				cardButton.style.color = "white";
				cardButton.innerHTML = "Kaufen";
				
				// Create Link to Buypage
				const cardA = document.createElement("a");
				cardA.href = "ZumDeal_MBAK.html";
				
				// Append Button To Link
				cardA.appendChild(cardButton);
				// Append Link to Column 2
				cardTD2.appendChild(cardA);
				// Append Paragraph to Column 2
				cardTD2.appendChild(cardP);
				// Append Image to Column 1
				cardTD.appendChild(cardBild);
				// Append Headline (Preis) to Column 2
				cardTD2.appendChild(cardh2);
				// Append Column 1 & 2 to TableRow
				cardTableRow.appendChild(cardTD);
				cardTableRow.appendChild(cardTD2);
				// Append TableRow to Table
				cardTable.append(cardTableRow);
				
				/*
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
				*/
				// DEBUG -----------------------
				console.log("Debug 2 ");
				console.log(cardP);
				console.log("End Debug 2");
				// -----------------------------
			}
			// Append Created Table to Guestbookentry
			entriesContainer.append(cardTable); 
		}
	}else{
		cardHeader.text(cars.modell+":<br><br>"+"Co2 Emissionen<br>"+"KraftstoffVerbrauch<br><br>"+cars.sprit+"<br>"+"Baujahr<br><br><br>"); 
		card.append(cardHeader);
		entriesContainer.append(card);
		console.log("Found 1 Entries");
	}
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
    xhr.send(myJSON);
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
			console.log(json1);
			renderCars(json1);
			}
		else if(xhr2.readyState === 4 && xhr2.status === 401) {
		  var json2 = JSON.parse(xhr2.responseText);  
		  console.log("Bad request");
		}    		
	}
};

const form = document.getElementsByClassName('suchform')[0];
form.addEventListener('submit', handleFormSubmitII);
const form_searchbar = document.getElementsByClassName('form-inline')[0];
form_searchbar.addEventListener('submit', handleFormSubmitIII);


