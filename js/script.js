const apiKey = "01c96143ca17e347929f8cc6e0bcf4e5";
const city = "Paranaque, PH";
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

// --- Forecast weather for tomorrow (card 2) --- 
    function updateTomorrowWeather () {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // Tomorrow's date string
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];

            // Find forecast closest to noon tomorrow
            const forecastList = data.list;
            let best = null;
            let bestDiff = Infinity;
            const target = new Date(`${tomorrowStr}T12:00:00`);

            forecastList.forEach(item => {
                const itemDate = new Date(item.dt_txt);
                if (itemDate.toISOString().startsWith(tomorrowStr)) {
                    const diff = Math.abs(itemDate - target);
                    if (diff < bestDiff) {
                        bestDiff = diff;
                        best = item; 
                    }
                }
            });

            if (best) {
                const temp = Math.round(best.main.temp);
                const weather = best.weather[0].main;
                const icon = best.weather[0].icon;
                const location = `${data.city.name},${data.city.country}`;

                const widget = document.getElementById('weather-1');
                widget.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}" />
                <p>${temp}°C, ${weather}</p>
                <small>${location}</small>
                `;
            }
        })
        .catch(error => console.error("Error fetching forecast:", error));
    }
    
    updateTomorrowWeather();
        
        
/* Date Information */
    function updateDate() {
        const today = new Date();
        const options = {weekday: 'short', month: 'short', day: 'numeric'};
        document.getElementById("date").textContent = today.toLocaleDateString('en-US', options);
    }

    updateDate();

    // --- Tomorrow's date for the second card --- 
    function updateTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const options = { weekday: 'short', month: 'short', day: 'numeric'};
        document.getElementById("date-1").textContent = tomorrow.toLocaleDateString('en-US', options);
    }

    updateTomorrowDate();
    
/* Session Information */
    const session = [
        {
            // card 0: today 
            isTrainingDay: true,
            title: "Training & Open Play",
            time: "4:00 PM - 6:00 PM",
            location: "The Village Sports Club",
            restMessage: "No session today. Recover well and come back stronger! 💪",
            agenda: [
                "Dynamic warm-up & ball control",
                "Passing drills",
                "Scrimmage game",
            ],
            notes: "Wear official home kit."
        },
        {
            // card 1: tomorrow 
            isTrainingDay: true,  // Change this to true or false to toggle modes
            title: "Training & Open Play",
            time: "4:00 PM - 7:00 PM",
            location: "BGC turf",
            restMessage: "Rest day tomorrow. Focus on recovery! 🛌",
            agenda: [
                "Tactical positioning",
                "Finishing practice",
                "Small-sided games"
            ],
            notes: "Wear blue and white."
        }
    ];
     
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

    // restore previous choice
    const saved = localStorage.getItem('rsvp');
    if (saved === 'in') setJoinState(true);

    joinButton.addEventListener("click", () => {
        const next = joinButton.textContent === "I'm in";
        setJoinState(next);
        localStorage.setItem('rsvp', next ? 'in' : 'out');
    });

    function setJoinState(going) {
        if (going) {
            joinButton.textContent = "Cancel";
            joinButton.style.background = "#e63946"; // Change to red
            joinButton.setAttribute('aria-pressed', 'true');
        } else {
            joinButton.textContent = "I'm in";
            joinButton.style.background = "#0b6ef6" // Change back to original color
            joinButton.setAttribute('aria-pressed', 'false');
        }
    }

    // --- Minimal slider for 2 cards --- 
    const track = document.getElementById('sliderTrack');
    const dots = Array.from(document.querySelectorAll('.dot'));
    let currentSlide = 0; 

    function slideTo(idx) {
        currentSlide = idx;
        track.style.transform = `translateX(-${idx * 350}px)`; // 350 = card width
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    dots.forEach(d => {
        d.addEventListener('click', () => slideTo(+d.dataset.slide));
});

  
