import Panel from './Panel';
// flex panels section
class FlexPanels{
    constructor(element){
         this.el = {};
         this.el.container = element;
         this.init();
    }
    init(){
         this.el.heroes = Array.from(this.el.container.querySelectorAll('.team-hero'), panel => new Panel(panel));
    }
  } 

export default FlexPanels; 