


function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
        }
    };
    xhr.send(null);
}*/


var api_key = ""; //Put the API key here



function sendRequest () {
    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () { //function to display weather information
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var weather = json.weather[0].description;
            var temp = json.main.temp;
            var mintemp = json.main.temp_min-273.15;
            var maxtemp = json.main.temp_max-273.15;
            var celcius = temp-273.15;
            var sunset = new Date(json.sys.sunset);
            var sunrise = new Date(json.sys.sunrise);
            var visibility;
            //Displaying the visibility based on weather conditions
            if(weather.includes("fog")||weather.includes("mist")||weather.includes("haze"))
            {
                visibility = "Very low";
            }
            else if(weather.includes("tornado")||weather.includes("storm")||weather.includes("hurricane"))
            {
                visibility = "Low";
            }
             else if(weather.includes("snow")||weather.includes("rain")||weather.includes("thunderstorm")||weather === "few clouds"||weather === "overcast clouds")
            {
                visibility = "Moderate";
            }
             else if(weather.includes("breeze")||weather.includes("hot")||weather.includes("windy"))
            {
                visibility = "High";
            }
            else
            {
                visibility = "Very high";
            }
            //Displaying the output using HTML
            document.getElementById("outputdate").innerHTML ="<pre>"+"Current Date:"+Date()+"</pre>"
            document.getElementById("txtarea").innerHTML = "City:"+json.name+"\n"+"Geo Coordinates:"+"\n"+
            "Latitude:"+json.coord.lat+" "+"degrees"+"\n"+"Longitude:"+json.coord.lon+" "+"degrees"+"\n"+"Sunset:"+sunset+" "+"\n"+"Sunrise:"+sunrise+" "+"\n"
            +"Pressure:"+json.main.pressure+" "+"hPa"+"\n"+"Humidity:"+json.main.humidity+"%"+"\n"+"Min Temperature:"+Number(mintemp).toFixed(2)+" "+"C"+"\n"+"Max Temperature:"+Number(maxtemp).toFixed(2)+" "+"C"+"\n"
            +"Visibility:"+visibility+"\n"+"Clouds:"+json.clouds.all+"%"+"\n"+"Temp in celcius:"+Number(celcius).toFixed(2)+" "+"C";
            alert("Predicted Weather:"+weather);
            document.getElementById("output").innerHTML = "<pre>"+"Date:"+Date()+"</pre>";
            if((celcius<20&&weather.includes("shower"))||weather.includes("rain")||weather.includes("drizzle")||weather.includes("thunderstorm")){
            alert("Warning:Its going to rain or there are chances of rain! Bring an umbrella");
            document.getElementById("output").innerHTML = "<pre>"+"Warning:Its going to rain or there are chances of rain! Bring an umbrella"+"</pre>";

        }
            else if(celcius<0||(celcius>=0&&celcius<=13)||weather === "mist"||weather.includes("snow")||weather.includes("cold")){
            alert("Warning:Its Cold and Freezing! Bring a coat")
            document.getElementById("output").innerHTML ="<pre>"+"Warning:Its Cold and Freezing! Bring a coat"+"</pre>"
        }
            else if(weather === "clear sky"){
            alert("Message:Pleasant Weather")
            document.getElementById("output").innerHTML = "<pre>"+"Message:Pleasant Weather"+"</pre>";
        }
            else{
            alert("Message:Pleasant Weather!Have a nice day");
            document.getElementById("output").innerHTML = "<pre>"+"Message:Pleasant Weather!Have a nice day"+"</pre>";
        }
            }
        
    };
    xhr.send(null);
    
}
    
