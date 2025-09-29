const apiKey = "01c96143ca17e347929f8cc6e0bcf4e5";
const city = "Las Pinas,PH";
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        
        const temp = Math.round(data.main.temp);
        const weather = data.weather[0].main;
        const icon = data.weather[0].icon;
        const location = `${data.name}, ${data.sys.country}`;
        
        const widget = document.querySelector('.weather-widget');

        widget.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}" />
        <p>${temp}°C, ${weather}</p>
        <small>${location}</small>
        `;
    })
    .catch(error => console.error("Error fetching weather:", error));
    
/* Date Information */
    function updateDate() {
        const today = new Date();
        const options = {weekday: 'short', month: 'short', day: 'numeric'};
        document.getElementById("date").textContent = today.toLocaleDateString('en-US', options);
    }

    updateDate();
    
/* Session Information */
    const session = {
        isTrainingDay: true,        // Change this to true or false to toggle modes
        title: "Training & Open Play",
        time: "4:00 PM - 6:00 PM",
        location: "The Village Sports Club",
        restMessage: "No session today. Recover well and come back stronger! 💪",

        // New: agenda & notes (admin-controllable later)
        agenda: [
            "Dynamic warm-up & mobility drills (10m)",
            "First-touch rondos (20m)",
            "Finishing drills (20m)",
            "Small-sided games (30m)"
        ],
        notes: "Wear official kampilan training-kit."
    };

    /*Render function*/
    function renderAgenda(data) {
        const agendaWrap = document.getElementById("sessionAgenda");
        const list = document.getElementById("agendaList");
        const notes = document.getElementById("agendaNotes");

        if (!data.isTrainingDay) {
            agendaWrap.style.display = "none"; // Hide agenda section on rest days
            return;
        }

        // show agenda section 
        agendaWrap.style.display = "";

        // Populate agenda list
        list.innerHTML = "";
        if (Array.isArray(data.agenda) && data.agenda.length) {
            data.agenda.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                list.appendChild(li);
            });
        } else {
            // graceful empty state
            const li = document.createElement("li");
            li.textContent = "Agenda to be announced.";
            list.appendChild(li);
        }
        
        // notes (optional)
        notes.textContent = data.notes || "";
    }


    function renderSessionCard(data) {
        const info = document.querySelector(".session-info");
        const titleEl = document.getElementById("session-title");
        const timeEl = document.getElementById("session-time");
        const locEl = document.getElementById("session-location");
        const action = document.getElementById("sessionAction");

        if (data.isTrainingDay) {
            // Training Mode 
            info.classList.remove("rest");
            titleEl.className = "";
            titleEl.textContent = data.title;
            timeEl.textContent = data.time;
            locEl.textContent = data.location;
            action.style.display = "flex";    //show join button
        } else {
            // Rest Mode
            info.classList.add("rest");
            titleEl.className = "session-rest-title";
            titleEl.textContent = "Rest Day";
            timeEl.textContent = "";
            locEl.innerHTML = `<span class="session-rest-msg">${data.restMessage}</span>`;
            action.style.display = "none";      //hide join button
        }
    }

    renderSessionCard(session);
    renderAgenda(session);


    /* Join Button Functionality */
    const joinButton = document.getElementById("join-button");

    joinButton.addEventListener("click", () => {
        if (joinButton.textContent === "I'm in") {
            joinButton.textContent = "Cancel";
            joinButton.style.background = "#e63946"; // Change to red
        } else {
            joinButton.textContent = "I'm in";
            joinButton.style.background = "#0b6ef6"; // Change back to original color
        }
    });

