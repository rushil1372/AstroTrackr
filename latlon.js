// test_lat = 19
// test_lon = 72

const notification = {
    title: "ISS Alert",
    body: "The ISS just flew over you!",
    icon: '../images/pxfuel.jpg'
}

// User Location Requirements  

var lat_u, lon_u;

var notif_flag = 0;

let button = document.getElementById("get-location");
button.addEventListener("click", fetchLocation);

// Fetching ISS Data

const between = (x, min, max) => {
    return x >= min && x <= max;
}

function fetchData() {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(data => displayData(data));
}

function displayData(data) {
    document.getElementById('curr-lat').innerHTML = "Current Latitude : " + data.iss_position.latitude + " °N";
    document.getElementById('curr-lon').innerHTML = "Current Longitude : " + data.iss_position.longitude + " °E";
    console.log("ping-normal");

    if(between(lat_u, data.iss_position.latitude - 6, data.iss_position.latitude + 6) 
        && between(lon_u, data.iss_position.longitude - 4, data.iss_position.longitude + 4)) {
            const myNotification = new window.Notification(notification.title, notification);
            console.log("notify");
        }

        // if(between(lat_u, test_lat - 6, test_lat + 6) 
        // && between(lon_u, test_lon - 4, test_lon + 4)) {
        //     if(notif_flag == 0){
        //         const myNotification = new window.Notification(notification.title, notification);
        //         console.log("notify");
        //     } else {
        //         console.log("cancel-notify")
        //     }
        // }

    // latitude -> 2
    // longitude -> 1
}

setInterval(fetchData, 10000);

// Grab User Location

function fetchLocation() {
    fetch("http://ip-api.com/json/")
      .then(response => response.json())
      .then(data => displayLoc(data));
}

function displayLoc(data) {
    lat_u = data.lat;
    lon_u = data.lon;

    if(lat_u != null || lat_u != undefined || lon_u != null || lon_u != undefined) {
        console.log("Latitude : " + lat_u + " Longitude : " + lon_u);
        document.getElementById('loc-message-success').innerHTML = "User Location Grabbed Successfully";
    } else {
        document.getElementById('loc-message-fail').innerHTML = "Unable to Grab User Location";
    }
}