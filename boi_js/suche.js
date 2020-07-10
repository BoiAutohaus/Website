
function renderCars(cars) {
	// Remove Shell from cars (extract the data)
	cars = cars.daten; 

	const card = $('<div class="card"/>');
	const cardHeader = $('<div class="card-header" />');
	const cardBody = $('<div class="card-body" />');
	
	// Empty Search Box Container
	const suchContainer = $('#main2');
	suchContainer.empty();
	
	// Empty Guestbook Thingy
	const entriesContainer = $('#guestbookEntriesContainer');
	entriesContainer.empty();
	
	// check for amount of Result Objects
	if(cars.Modell == undefined){
		if(Object.keys(cars).length === 0){
			// 0 Results
			cardHeader.text("No Results Found");
			card.append(cardHeader);
			entriesContainer.append(card);
			console.log("Found 0 Entry");
		}else{
			// 2+ Results
			// Create Table for Results
			const cardTable = document.createElement("table");
			cardTable.class = "table table-responsive greybackground";
			cardTable.width = "90%";
			
			// for every Result: 
			var i;
			for(i=0;i<Object.keys(cars).length;i++){
				// DEBUG ---------------------
				/*
				console.log("Found x Entries");
				console.log("Debug, Entry: "+ i);
				console.log(cars[i]);
				console.log(cars[i].Modell);
				console.log("Debug Ende");
				*/
				//----------------------------
				
	
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
				cardP.innerHTML = "Modell: "+cars[i].Marke +" " + cars[i].Modell +"<br>Erstzulassung: "+cars[i].Erstzulassung+"<br>Kilometer: "+cars[i].Kilometer+"<br>Kraftstoffart: "+cars[i].Kraftstoffart;
				
				// Create Headline (Preistag) 
				const cardh2 = document.createElement("h2");
				cardh2.style.color = "red";
				cardh2.style.float = "right";
				cardh2.innerHTML = "Preis: " + cars[i].Preis+"€";
				
				// Create Button for Link
				const cardButton = document.createElement("button");
				cardButton.className = "btn btn-primary";
				cardButton.type = "button";
				cardButton.style.marginTop = "125px";
				cardButton.style.marginLeft = "20px";
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
				
				
				// DEBUG -----------------------
				/*
				console.log("Debug 2 ");
				console.log(cardP);
				console.log("End Debug 2");
				*/
				// -----------------------------
			}
			// Append Created Table to Guestbookentry
			entriesContainer.append(cardTable); 
		}
	}else{
		// 1 Entry
		cardHeader.text(cars.modell+":<br><br>"+"Co2 Emissionen<br>"+"KraftstoffVerbrauch<br><br>"+cars.sprit+"<br>"+"Baujahr<br><br><br>"); 
		card.append(cardHeader);
		entriesContainer.append(card);
	}
};



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

// suchform
const form = document.getElementsByClassName('suchform')[0];
form.addEventListener('submit', handleFormSubmitII);

// suchbar
const form_searchbar = document.getElementsByClassName('form-inline')[0];
form_searchbar.addEventListener('submit', handleFormSubmitIII);


