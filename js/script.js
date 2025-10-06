const apiKey = window.OWM_KEY || "";
if (!apiKey) {
    console.error('Missing API key: please set window.OWM_KEY in config/config.js');
}
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
        <p>${temp}&deg;C, ${weather}</p>
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
                const location = `${data.city.name}, ${data.city.country}`;

                const widget = document.getElementById('weather-1');
                widget.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}" />
                <p>${temp}&deg;C, ${weather}</p>
                <small>${location}</small>
                `;
            }
        })
        .catch(error => console.error("Error fetching forecast:", error));
    }

    // Forecast weather day AfterTomorrow 
    function updateDayAfterWeather(data) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            const dayAfter = new Date();
            dayAfter.setDate(dayAfter.getDate() + 2);
            const targetDate = dayAfter.toISOString().split("T")[0];

            const forecast = data.list.find(item => item.dt_txt.startsWith(targetDate + " 12:00:00"));
            const widget = document.getElementById("weather-2");

            if (forecast) {
                const temp = Math.round(forecast.main.temp);
                const weather = forecast.weather[0].main;
                const icon = forecast.weather[0].icon;
                const location = `${data.city.name}, ${data.city.country}`;
                widget.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${weather}" />
                <p>${temp}&deg;C, ${weather}</p>
                <small>${location}</small>
                `;
            }
        })
        .catch(err => console.error("Error fetching weather:", err));
    }

    updateTomorrowWeather();
    updateDayAfterWeather();
        
        
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

    // --- Day after tomorrow --- 
    function updateDayAfterDate () {
        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);

        const options = { weekday: 'short', month: 'short', day: 'numeric'};
        document.getElementById("date-2").textContent = dayAfter.toLocaleDateString('en-US', options);
    }

    updateDayAfterDate();
    
/* Session Information */
    const session = [
        {
            // card 0: today 
            isTrainingDay: true,
            title: "Training & Open Play",
            time: "4:00 PM - 6:00 PM",
            location: "The Village Sports Club",
            restMessage: "No session today. Recover well and come back stronger!",
            agenda: [
                "Dynamic warm-up & ball control",
                "Passing drills",
                "Scrimmage game",
            ],
            notes: "Wear official home kit."
        },
        {
            // card 1: tomorrow 
            isTrainingDay: false,  // Change this to true or false to toggle modes
            title: "Training & Open Play",
            time: "4:00 PM - 7:00 PM",
            location: "BGC turf",
            restMessage: "Rest day. Focus on recovery!",
            agenda: [
                "Tactical positioning",
                "Finishing practice",
                "Small-sided games"
            ],
            notes: "Wear blue and white."
        },
        {
            isTrainingDay: true,
            title: "Training & Open Play",
            time: "4:00 PM - 6:00 PM",
            location: "The Village Sports Club",
            restMessage: "Rest Day! Do you own shi",
            agenda: [
                "Conditioning",
                "Passing drills",
                "5v5 small sided play",
            ],
            notes: "Wear pink kampilan kit."
        }
    ];
     
    /*Render function*/
    function renderSessionCard(idx, data) {
        const info = document.getElementById(`session-${idx}`);
        const titleEl = document.getElementById(`session-title-${idx}`);
        const timeEl = document.getElementById(`session-time-${idx}`);
        const locEl = document.getElementById(`session-location-${idx}`);
        const action = document.getElementById(`sessionAction-${idx}`);
        const agendaList = document.getElementById(`agendaList-${idx}`);
        const agendaNotes = document.getElementById(`agendaNotes-${idx}`);
        const agendaWrap = document.getElementById(`sessionAgenda-${idx}`);

        if (data.isTrainingDay) {
            info.classList.remove("rest");
            titleEl.className = "";
            titleEl.textContent = data.title;
            timeEl.textContent = data.time; 
            locEl.textContent = data.location;
            action.style.display = "flex";

            // agenda
            agendaWrap.style.display = "";
            agendaList.innerHTML = data.agenda.map(item => `<li>${item}</li>`).join("");
            agendaNotes.textContent = data.notes || "";
        } else {
            info.classList.add("rest");
            titleEl.className ="session-rest-title";
            titleEl.textContent ="Rest Day";
            timeEl.textContent = "";
            locEl.innerHTML = `<span class="session-rest-msg">${data.restMessage}</span>`;
            action.style.display = "none";

            // hide agenda
            agendaWrap.style.display = "none";
        }
    }

    session.forEach((s, i) => {
        renderSessionCard(i, s);
        wireJoinButton(i);
    });
    
    /* Join Button Functionality */
    function wireJoinButton(idx) {
        const btn = document.getElementById(`join-button-${idx}`);
        if (!btn) return; 

        btn.addEventListener("click", () => {
            if (btn.textContent === "I'm in") {
                btn.textContent = "Cancel";
                btn.style.background = "#e63946"; // red
            } else {
                btn.textContent = "I'm in";
                btn.style.background = "#0b6ef6"; // blue
            }
        });
    }

    // ===== SLIDER CORE =====
    const track = document.querySelector('.slider-track')
    const slides = Array.from(track.children);
    const dots = Array.from(document.querySelectorAll('.dot'));

    let current = 0; 
    let slideWidth = slides[0].getBoundingClientRect().width;

    // Mouse drag setup 
    let startX = 0; 
    let currentX = 0; 
    let isDragging = false; 
    let deltaX = 0; 
    let startTime = 0;
    let swipeSpeed = 0; 

    function measure() {
        // Recalculate width on resize so it stays responsive 
        slideWidth = slides[0].getBoundingClientRect().width;
        goTo(current, false); // reposition without animation 
    }

    function goTo(index, animate = true) {
        // Clamp between 0 and last slide 
        current = Math.max(0, Math.min(index, slides.length - 1));
        track.style.transition = animate ? 'transform 300ms ease' :  'none';
        track.style.transform = `translateX(-${current * slideWidth}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i ===current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Dots navigation 
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    //Keybaord arrows 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    // Mouse drag control 
    const dragThreshold = 60; // pixels needed to trigger a slide change 

    track.addEventListener('mousedown', (e) => {
        isDragging = true; 
        startX = e.clientX; 
        currentX = startX;
        track.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return; 
        currentX = e.clientX; 
        deltaX = currentX - startX;

        // move the track visually 
        track.style.transform = `translateX(${ -current * slideWidth + deltaX }px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return; 
        isDragging = false;
        track.style.transition = 'transform 0.3s ease'; 

        // decide direction 
        if (Math.abs(deltaX) > dragThreshold) {
            if (deltaX > 0) goTo(current - 1); // dragged right -> previous slide 
            else goTo(current + 1); // dragged left -> next slide 
        } else {
            goTo(current); // not enough movement -> snap back 
        }

        deltaX = 0; // reset for next drage 
    }); 

    // snap back if user leaves window mid-drag 
    window.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.transition = 'transform 0.3s ease'; 
            goTo(current);
            deltaX = 0; 
        }
    });

    // ===== MOBILE TOUCH SUPPORT =====
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX; 
        currentX = startX; 
        startTime = Date.now(); // capture time for speed calc 
        track.style.transition = 'none';
    }, {passive: true});

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        deltaX = currentX - startX; 
        track.style.transform = `translateX(${ - current * slideWidth + deltaX }px)`;
        e.preventDefault(); // stop vertical scroll
    }, { passive: false });

    track.addEventListener('touchend', () => {
        if (!isDragging) return; 
        isDragging = false; 

        // calculate swipe speed 
        const timeElapsed = Date.now() - startTime; 
        swipeSpeed = Math.abs(deltaX / timeElapsed); // px/ms 

        track.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';

        // momentum threshold: fast flick = move to next card 
        const flickThreshold = 0.5; // try: 0.3-0.6 feels natural 

        if (Math.abs(deltaX) > dragThreshold || swipeSpeed > flickThreshold) {
            if (deltaX > 0 ) goTo(current - 1); // dragged right -> prev slide 
            else goTo(current + 1) ; // dragged left -> next slide 
        } else {
            goTo(current);
        }
        deltaX = 0; 
    });
   
    // On load + on resize
    window.addEventListener('resize', measure);
    measure();