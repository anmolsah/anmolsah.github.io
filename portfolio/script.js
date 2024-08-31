document.addEventListener("DOMContentLoaded", function () {
  const titles = ["Frontend Developer", "Backend Developer", "Freelancer"];
  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  const titleElement = document.getElementById("dynamic-title");

  function typeTitle() {
    if (currentCharIndex < titles[currentTitleIndex].length) {
      titleElement.innerHTML = titles[currentTitleIndex].substring(
        0,
        currentCharIndex + 1
      );
      currentCharIndex++;
      setTimeout(typeTitle, 150);
    } else {
      setTimeout(deleteTitle, 2000);
    }
  }

  function deleteTitle() {
    if (currentCharIndex > 0) {
      titleElement.innerHTML = titles[currentTitleIndex].substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
      setTimeout(deleteTitle, 100);
    } else {
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
      setTimeout(typeTitle, 500);
    }
  }

  typeTitle();
});

const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slide").length;
let currentIndex = 0;

function goToSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function goToNextSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  goToSlide(currentIndex);
}

function goToPrevSlide() {
  currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  goToSlide(currentIndex);
}

document.querySelector(".next-btn").addEventListener("click", goToNextSlide);
document.querySelector(".prev-btn").addEventListener("click", goToPrevSlide);

setInterval(goToNextSlide, 6000);

document.addEventListener("DOMContentLoaded", function () {
  const nameTrigger = document.getElementById("name-trigger");
  let audio;
  let isPlaying = false;

  if (nameTrigger) {
    nameTrigger.addEventListener("click", function () {
      if (!isPlaying) {
        audio = new Audio("musics/Aha - Take On Me.mp3");
        audio.play();
        nameTrigger.classList.add("easter-egg-animation");
        isPlaying = true;
      } else {
        audio.pause();
        audio.currentTime = 0;
        nameTrigger.classList.remove("easter-egg-animation");
        isPlaying = false;
      }
    });
  } else {
    console.error("Name Trigger element not found.");
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
  
    hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
  
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  });
  




  