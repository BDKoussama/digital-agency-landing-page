import { TimelineLite , TweenMax , Power2} from 'gsap' // or import TweenMax from 'gsap/TweenMax'
import Carousel from './modules/Carousel';
import FlexPanels from './modules/FlexPanels';

const grid = document.querySelector('.grid');
const nav = document.querySelector('.nav-bar');
const navTop = nav.offsetTop;
const menuBtn = document.querySelector('.toggle-menu');
const menu = document.querySelector('.mobile-menu');
// ScrollReveal settings
const slideUp = {
  distance: '50%',
  origin: 'bottom',
  duration: 1000,
  easing: 'ease-in-out' 
};
const slideDown = {
  distance: '50%',
  origin: 'top',
  duration: 800,
  easing: 'ease-in-out' 
};
let menuToggled = false ;

const toggleMenuOnMobileSize = (e) => {
    e.preventDefault();
    menu.classList.toggle('show-menu');
    menuBtn.children[0].innerHTML = menuToggled  ? 'Menu' : 'Close' ; 
    menuToggled = !menuToggled;
}

const stickyNavigation = () => {
  window.scrollY == 0 ? nav.classList.remove('toggle-nav') : nav.classList.add('toggle-nav'); 
}

// Bind Events ******************************************************** //
window.addEventListener('scroll', stickyNavigation);
menuBtn.addEventListener('click' , (e) => toggleMenuOnMobileSize(e))

// ScrollReveal Section *********************************************** //
window.sr = ScrollReveal();
sr.reveal('.feature-item', slideUp , 350);
sr.reveal('.section-title' , slideUp);
sr.reveal('.brand-item', slideUp , 350);
sr.reveal('.pack-card', slideUp , 350);


// Masonry Grid ******************************************************//
// init Masonry
 let msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});


// Testimonials Carousel *********************************************** //
const carousel = new Carousel(document.querySelector('.feedback'));

// Team Carousel *********************************************** //
const panels = new FlexPanels(document.querySelector('.team-wrapper'));