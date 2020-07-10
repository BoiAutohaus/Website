
  
  const handleFormSubmit3 = event => {
      
      event.preventDefault();
	  /*
      const data = formToJSON(form.elements);
      var myJSON = JSON.stringify(data);      
      console.log(myJSON);
	  */
    var car1 = document.getElementById('carid');
    var output = car1.getAttribute("name");
    console.log(output);
	  var car2 = '{"id":' + output + '}'; 
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/buy";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin");
      xhr.send(car2);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json1 = JSON.parse(xhr.responseText);
          window.alert(data.vorname + " " +  data.nachname + ", Kaufauftrag wurde übermittelt");
          console.log(json1);
		  window.location.href = "Kaufbestatigung.html";
          localStorage.setItem("Vorname", data.vorname);
          localStorage.setItem("Nachname", data.nachname);          
    
        }
        else if(xhr.readyState === 4 && xhr.status === 400) {
          var json2 = JSON.parse(xhr.responseText);
          console.log("We got here kek");
          window.alert("Error: "+ json2.respo);
          }
        
        }
      };
  
  
  const form = document.getElementsByClassName('kaufen')[0];
  form.addEventListener('submit', handleFormSubmit3);
  
  