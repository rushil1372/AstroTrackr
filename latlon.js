// test_lat = 19
// test_lon = 72

var notif_flag = 1

// Add p tag for notif

const notificationToggle = document.querySelector('#notificationToggle');
notificationToggle.addEventListener("change", function() {
    if(this.checked) {
        console.log("Notification Enabled");
        notif_flag = 1;
        document.getElementById('notif-message').innerHTML = "Notifications are Enabled";
    } else {
        console.log("Notification Disabled");
        notif_flag = 0;
        document.getElementById('notif-message').innerHTML = "Notifications are Disabled";
    }
});

const notification = {
    title: "ISS Alert",
    body: "The ISS just flew over you!",
    icon: '../images/pxfuel.jpg'
}

// User Location Requirements  

var lat_u, lon_u;

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

    if(notif_flag == 1) {
        if(between(lat_u, data.iss_position.latitude - 3, data.iss_position.latitude + 3) 
        && between(lon_u, data.iss_position.longitude - 2, data.iss_position.longitude + 2)) {
            const myNotification = new window.Notification(notification.title, notification);
            console.log("notify");
        }

        // if(between(lat_u, test_lat - 6, test_lat + 6) && between(lon_u, test_lon - 4, test_lon + 4)) {
        //     const myNotification = new window.Notification(notification.title, notification);
        //     console.log("notify");
        // }
    }
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



// Testing Code 
        //      if(between(lat_u, test_lat - 6, test_lat + 6) 
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