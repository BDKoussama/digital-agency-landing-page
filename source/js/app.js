import { TimelineLite , TweenMax , Power2} from 'gsap' // or import TweenMax from 'gsap/TweenMax'

const grid = document.querySelector('.grid');
// sticky nav section
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
      this.tl.add( TweenMax.fromTo( this.el.hero , 1 , { minWidth : '0%' , backgroundRepeat : 'no-repeat' , backgroundPosition: 'center' } , { minWidth : '100%' , backgroundRepeat : 'no-repeat' , backgroundPosition: 'center', ease:  Power2.easeInOut } ));
      this.tl.add( TweenMax.fromTo( this.el.heroInfo , 0.1 , { y : '100%' } , { y : '0%' }  ), "+=0.1");
      this.init();
    }
    init(){
       this.isAnimating = false ; 
       this.bindEvents();
    }
    bindEvents(){
      this.el.hero.addEventListener('click' , () => this.toggle());
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


const toggleMenuOnMobileSize = (e) => {
    e.preventDefault();
    menu.classList.toggle('show-menu');
    menuBtn.children[0].innerHTML = menuToggled  ? 'Menu' : 'Close' ; 
    menuToggled = !menuToggled;
}

const stickyNavigation = () => {
  window.scrollY == 0 ? nav.classList.remove('toggle-nav') : nav.classList.add('toggle-nav'); 
}

// Bind Events
window.addEventListener('scroll', stickyNavigation);
menuBtn.addEventListener('click' , (e) => toggleMenuOnMobileSize(e))

// ScrollReveal Section
window.sr = ScrollReveal();
sr.reveal('.feature-item', slideUp , 350);
sr.reveal('.section-title' , slideUp);
sr.reveal('.brand-item', slideUp , 350);
sr.reveal('.pack-card', slideUp , 350);

 // init panels
 const panels = new PanelsFlex(document.querySelector('.team-wrapper'));

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



class Carousel {
  constructor(element){
      this.el = {};
      this.el.element = element;
      this.isAnimating = false ; 
      this.currentPosition = 0;
      this.el.navigation = {
          next : this.el.element.querySelector('.next'),
          prev : this.el.element.querySelector('.prev')
      }
      this.el.sliders = Array.from(this.el.element.querySelectorAll('.testimonial'));
      this.totalSliders = this.el.sliders.length;
      this.init();
  }
  init(){
    this.bindEvents();
  }
  bindEvents(){
     const { next , prev } = this.el.navigation ;
     next.addEventListener('click' , (e) => this.nextSlider(e));
     prev.addEventListener('click' , (e) => this.previousSlider(e));
     this.nextSlider = (e) => { e.preventDefault(); this.getPosition('next');}
     this.previousSlider = (e) => { e.preventDefault(); this.getPosition('previous')}
  }
  // get Slide position
  getPosition(direction) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentSlide = this.el.sliders[this.currentPosition];
    let newPosition = this.currentPosition = direction === 'next' ?
        this.currentPosition < this.totalSliders - 1 ? this.currentPosition + 1 : 0 :
        this.currentPosition = this.currentPosition > 0 ? this.currentPosition - 1 : this.totalSliders - 1;
    let newPost = this.el.sliders[newPosition];
    console.log(newPosition)
    this.changePost(newPost, newPosition);
}

// change new slide 
changePost(newPost, newPosition) {
        newPost.classList.add('active-slide');
        console.log(this.currentSlide)
        this.currentSlide.classList.remove('active-slide');
        this.currentSlide = newPost;
        this.isAnimating = false;
}
}

const carousel = new Carousel(document.querySelector('.feedback'));