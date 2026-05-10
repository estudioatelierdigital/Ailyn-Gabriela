// =========================
// MÚSICA
// =========================

const music = document.getElementById("bgMusic");

const playBtn = document.getElementById("playBtn");

let isPlaying = false;

playBtn.addEventListener("click", () => {
    if(!isPlaying){
        music.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Cambia a icono de pausa
        isPlaying = true;
    } else {
        music.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-music"></i>'; // Cambia a icono de nota
        isPlaying = false;
    }
});

// =========================
// FADE IN GENERAL
// =========================

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold:0.15
});

fadeElements.forEach(el => {

    fadeObserver.observe(el);

});

// =========================
// TIMELINE INTERACTIVA
// =========================

const timelineSection = document.getElementById("timelineSection");

const timelineProgress = document.getElementById("timelineProgress");

const timelineItems = document.querySelectorAll(".timeline-item");

function updateTimeline(){

    if(!timelineSection) return;

    const sectionTop = timelineSection.offsetTop;

    const sectionHeight = timelineSection.offsetHeight;

    const scrollY = window.scrollY;

    const windowHeight = window.innerHeight;

    // =========================
    // PROGRESO DE LÍNEA
    // =========================

    let progress = (
        (scrollY + windowHeight - sectionTop)
        / sectionHeight
    ) * 100;

    progress = Math.max(0, Math.min(progress, 100));

    timelineProgress.style.height = progress + "%";

    // =========================
    // ACTIVAR ITEMS
    // =========================

    timelineItems.forEach(item => {

        const rect = item.getBoundingClientRect();

        if(rect.top < windowHeight * 0.78){

            item.classList.add("active");

        }else{

            item.classList.remove("active");

        }

    });

}

window.addEventListener("scroll", updateTimeline);

updateTimeline();

// =========================
// CUENTA REGRESIVA
// =========================

// CAMBIA EL AÑO SI ES NECESARIO

const eventDate = new Date(
    "May 23, 2026 20:00:00"
).getTime();

const daysEl = document.getElementById("days");

const hoursEl = document.getElementById("hours");

const minutesEl = document.getElementById("minutes");

const secondsEl = document.getElementById("seconds");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = eventDate - now;

    // =========================
    // SI EL EVENTO YA PASÓ
    // =========================

    if(distance <= 0){

        daysEl.innerHTML = "00";

        hoursEl.innerHTML = "00";

        minutesEl.innerHTML = "00";

        secondsEl.innerHTML = "00";

        return;

    }

    // =========================
    // CÁLCULOS
    // =========================

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    // =========================
    // MOSTRAR
    // =========================

    daysEl.innerHTML = String(days).padStart(2, "0");

    hoursEl.innerHTML = String(hours).padStart(2, "0");

    minutesEl.innerHTML = String(minutes).padStart(2, "0");

    secondsEl.innerHTML = String(seconds).padStart(2, "0");

}

setInterval(updateCountdown, 1000);

updateCountdown();

// =========================
// PARALLAX FOTOS
// =========================

const photos = document.querySelectorAll(".photo-section img");

window.addEventListener("scroll", () => {

    photos.forEach(photo => {

        const rect = photo.getBoundingClientRect();

        const offset = rect.top * -0.04;

        photo.style.transform =
            `scale(1.08) translateY(${offset}px)`;

    });

});

// =========================
// PARALLAX FLORES
// =========================

const flowers = document.querySelectorAll(".flower");

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    flowers.forEach((flower) => {
        const speed = 0.05; 
        flower.style.transform = `translateY(${scroll * speed}px)`;
    });
});

// =========================
// EFECTO APARICIÓN FOTOS
// =========================

const photoSections = document.querySelectorAll(".photo-section");

const photoObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform = "scale(1)";

        }

    });

}, {
    threshold:0.2
});

photoSections.forEach(photo => {

    photo.style.opacity = "0";

    photo.style.transform = "scale(1.05)";

    photo.style.transition =
        "all 1.2s ease";

    photoObserver.observe(photo);

});

// =========================
// MOVIMIENTO SUAVE DEL PAPEL
// =========================

const paperImages = document.querySelectorAll(".paper-img");

window.addEventListener("mousemove", (e) => {

    const x = (
        e.clientX / window.innerWidth
    ) * 6;

    const y = (
        e.clientY / window.innerHeight
    ) * 6;

    paperImages.forEach(paper => {

        paper.style.transform =
            `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`;

    });

});

// =========================
// EFECTO CINEMÁTICO SCROLL
// =========================

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    document.body.style.backgroundPositionY =
        `${scroll * 0.08}px`;

});

// =========================
// ANIMACIÓN SUAVE BOTONES
// =========================

const buttons = document.querySelectorAll(
    ".music-btn, .location-btn, .rsvp-btn"
);

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform =
            "translateY(-4px) scale(1.03)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform =
            "translateY(0) scale(1)";

    });

});

// =========================
// AUTO PLAY MOBILE
// =========================

document.body.addEventListener("click", () => {

    if(!isPlaying){

        music.play()
        .then(() => {

            isPlaying = true;

            playBtn.innerHTML =
                "❚❚";

        })
        .catch(() => {});

    }

}, {
    once:true
});