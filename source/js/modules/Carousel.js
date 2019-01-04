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
          this.currentSlide.classList.remove('active-slide');
          this.currentSlide = newPost;
          this.isAnimating = false;
  }
  }
  
  export default Carousel ;