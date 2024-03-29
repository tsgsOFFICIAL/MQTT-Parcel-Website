let registration;

topLevelFunction();
requestPermission();

// const socket = new WebSocket('ws://127.0.0.1:1883');

// socket.onopen = () => {
//     console.log('Connected to WebSocket server');
//     socket.send('Hello, server!');
// };

// socket.onmessage = (event) => {
//     console.log('Received message from server:', event.data);
// };

// socket.onclose = () => {
//     console.log('Connection closed');
// };


// const mqttClient = mqtt.connect("mqtt://127.0.0.1:1883");

// mqttClient.on('connect', () => {
//     console.log('Connected to WebSocket server');

//     // Subscribe to a topic
//     mqttClient.subscribe('topic', (err) => {
//         if (!err) {
//             console.log('Subscribed to topic');
//         } else {
//             console.error('Error subscribing to topic:', err);
//         }
//     });

//     // Publish a message
//     mqttClient.publish('topic', 'Hello from JavaScript', (err) => {
//         if (!err) {
//             console.log('Message published');
//         } else {
//             console.error('Error publishing message:', err);
//         }
//     });
// });

// mqttClient.on('message', (topic, message) => {
//     console.log('Received message:', message.toString());
// });

// mqttClient.on('error', (error) => {
//     console.error('WebSocket connection error:', error);
// });

async function topLevelFunction() {
    registration = await navigator.serviceWorker.getRegistration();
}

function requestPermission() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    Notification.requestPermission(() => {
    });
}

function showNotification(notifyTitle, notifyBody) {
    const notifyImg = `./assets/icons/icon-128x128.png`;

    const payload = {
        body: notifyBody,
        icon: notifyImg,
    };

    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }

    if (Notification.permission === 'granted') {
        let notification = new Notification(notifyTitle, payload);

        // Eventlistener to react, when a user clicks on a notification
        notification.onclick = () => {
            console.log('The notification was clicked');
        };
    }
}

function searchIconPressed() {
    // Select the :root pseudo-element
    const root = document.documentElement;
    const serachBarValue = document.getElementById("parcel-search-bar").value;

    // Change the value of the CSS variable
    root.style.setProperty('--parcel-length-percentage', `${serachBarValue}%`);

    showNotification("Search icon pressed 1", `You have just searched: ${serachBarValue}`);

    setTimeout(() => {
        showNotification("Search icon pressed 2", `You have just searched: ${serachBarValue}`);
    }, 15 * 1000);

}

// document.addEventListener("DOMContentLoaded", () => {
//     fetchData();

//     setInterval(() => {
//         fetchData();
//     }, 60 * 1000);
// });

// function fetchData() {
//     const options = {
//         method: 'GET'
//     };

//     fetch('https://hillbillyapi.azurewebsites.net/api/HillBilly/Get/All', options)
//         .then(response => response.json())
//         .then(response => updateView(response))
//         .catch(err => console.error(err));
// }

// function updateView(logHistoryJson) {
//     const main = document.querySelector("main");
//     main.innerHTML = ""; // Clear the main element

//     // Use Array.reduce to group objects by stableId
//     const groupedByStableId = logHistoryJson.reduce((result, obj) => {
//         const { stableId } = obj;

//         // Use the stableId as the key and create an array if it doesn't exist
//         result[stableId] = result[stableId] || [];

//         // Push the current object to the corresponding stableId array
//         result[stableId].push(obj);

//         return result;
//     }, {});

//     // Function to find the object with the latest logTime in an array
//     const findLatestEntry = (array) => {
//         return array.reduce((latest, obj) => {
//             if (!latest || new Date(obj.logTime) > new Date(latest.logTime)) {
//                 return obj;
//             }
//             return latest;
//         }, null);
//     };

//     // Use Array.map() to find the latest entry in each array
//     const latestEntries = Object.values(groupedByStableId).map(findLatestEntry);

//     if (latestEntries.length > 0) {
//         latestEntries.forEach(obj => {
//             controlValues(obj);

//             const logTimeDate = new Date(obj.logTime);

//             // Get the current time
//             const currentTime = new Date();

//             // Calculate the time difference in milliseconds
//             const timeDifference = currentTime - logTimeDate;

//             // Convert the time difference to minutes
//             const minutesAgo = Math.floor(timeDifference / (1000 * 60));

//             let article = document.createElement("article");
//             article.className = "stable-container";

//             let headerSection = document.createElement("section");
//             headerSection.className = "header flex-col nowrap";

//             let text = document.createElement("h2");
//             text.innerText = `Stable ${obj.stableId}`;

//             headerSection.appendChild(text);

//             text = document.createElement("p");
//             text.id = `stable-${obj.stableId}-info`;
//             text.className = "time-text";
//             text.innerText = `Data is ${minutesAgo > 60 ? "hella" : "minutes"} old`;

//             headerSection.appendChild(text);

//             article.appendChild(headerSection);

//             let infoSection = document.createElement("section");
//             infoSection.className = "info flex-row nowrap";

//             let ol = document.createElement("ol");

//             let li = document.createElement("li");
//             li.innerText = "Temperature:";

//             ol.appendChild(li);

//             li = document.createElement("li");
//             li.innerText = "UV Index:";

//             ol.appendChild(li);

//             li = document.createElement("li");
//             li.innerText = "Water Level:";

//             ol.appendChild(li);

//             infoSection.appendChild(ol);

//             ol = document.createElement("ol");

//             li = document.createElement("li");
//             li.innerText = `${obj.outsideTemperature}°`;

//             ol.appendChild(li);

//             li = document.createElement("li");
//             li.innerText = `${obj.uvIndex}`;

//             ol.appendChild(li);

//             li = document.createElement("li");
//             li.innerText = `${obj.waterLevelPercentage}`;

//             ol.appendChild(li);

//             infoSection.appendChild(ol);

//             article.appendChild(infoSection);

//             main.appendChild(article);
//         });
//     } else {
//         let emptyElement = document.createElement("h2");
//         emptyElement.innerText = "No data found!";

//         main.appendChild(emptyElement);
//     }
// }

// function controlValues(obj) {
//     let title = "";
//     let body = "";
//     let sendANotification = false;

//     if (obj.outsideTemperature > 25) {
//         title = "Its too hit in stable " + obj.stableId;
//         body = "Its getting too hot in here, you should do something about it.";
//         sendANotification = true;
//     }

//     if (obj.uvIndex > 100) {
//         title = "The sun is melting your brain in stable " + obj.stableId;
//         body = "You're pigs are turning into bacon, just by being in there.. Fix it!";
//         sendANotification = true;
//     }

//     if (obj.waterLevelPercentage < 25) {
//         title = "No more water in stable " + obj.stableId;
//         body = "Your poor pigs, they are thirsty!";
//         sendANotification = true;
//     }

//     if (sendANotification) {
//         sendNotification(title, body);
//     }
// }