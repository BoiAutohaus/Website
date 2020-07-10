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
      var url = "http://localhost:8000/api/buy";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(myJSON)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json1 = JSON.parse(xhr.responseText);
          window.alert(data.vorname + " " +  data.nachname + ", Kaufauftrag wurde übermittelt");
          console.log(myJSON);
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
  
  
  const form = document.getElementsByClassName('kauf')[0];
  form.addEventListener('submit', handleFormSubmit);
  
  