
 class Panel{
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

 export default Panel ; 