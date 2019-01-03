import { TimelineLite , TweenMax , Power2} from 'gsap' // or import TweenMax from 'gsap/TweenMax'

// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
const grid = document.querySelector('.grid');

let msnry = new Masonry( grid, {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});

// sticky nav section
const nav = document.querySelector('.nav-bar');
const navTop = nav.offsetTop;
const menuBtn = document.querySelector('.toggle-menu');
const menu = document.querySelector('.mobile-menu');
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

window.addEventListener('scroll', stickyNavigation);
menuBtn.addEventListener('click' , (e) => toggleMenuOnMobileSize(e))

// ScrollReveal Section
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

window.sr = ScrollReveal();
sr.reveal('.feature-item', slideUp , 350);
sr.reveal('.section-title' , slideUp);
sr.reveal('.brand-item', slideUp , 350);
sr.reveal('.pack-card', slideUp , 350);

// flex panels section
 class PanelsFlex{
   constructor(element){
        this.el = {};
        this.el.container = element;
        this.init();
   }
   init(){
        this.el.heroes = Array.from(this.el.container.querySelectorAll('.team-hero'), hero => new Hero(hero));
   }
 } 

 class Hero{
    constructor(element){
      this.el = {};
      this.el.hero = element ; 
      this.el.img = this.el.hero.querySelector('.team-hero__img');
      this.el.heroInfo = Array.from(this.el.hero.querySelectorAll('.hero-info'));
      this.tl = new TimelineLite({paused : true});
      this.tl.pause();
      this.tl.add( TweenMax.fromTo( this.el.hero , 1 , { minWidth : '0%' } , { minWidth : '100%' , ease:  Power2.easeInOut } ));
      this.tl.add( TweenMax.fromTo( this.el.heroInfo , 0.1 , { y : '100%' } , { y : '0%' }  ), "+=0.1");
      this.init();
    }
    init(){
       this.isAnimating = false ; 
       this.bindEvents();
    }
    bindEvents(){
      this.el.img.addEventListener('click' , () => this.toggle());
    }

    show(){
      this.tl.play();
      this.isAnimating = true ;
    }
    hide(){
      this.tl.reverse();
      this.isAnimating = false ;
    }
    toggle(){
      !this.isAnimating ? this.show() : this.hide();
    }
 } 
 
 const panels = new PanelsFlex(document.querySelector('.team-wrapper'));
