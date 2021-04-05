import { LightningElement, api } from 'lwc';

const CARD_VISIBLE   = 'slds-show';
const CARD_INVISIBLE = 'slds-hide';
const DOT_ACTIVE   = 'dotActive';
const DOT_INACTIVE = 'doctInactive';
const DEFAULT_TIME_SLIDER = 5000;
export default class AdopetcustomCarosel extends LightningElement {
    slides          = []
    slideIndex      = 1;
    localTimeSlider = DEFAULT_TIME_SLIDER;

    @api enableAutoScroll = false;

    @api flexipageRegionWidth = 'CLASSIC'; // default to classic. If its lightning, framework will set the value

    @api get slideTimer(){
        return this.localTimeSlider;
    }
    set slideTimer(newTime){
        this.localTimeSlider = Number(newTime);
    }

    @api 
    get slidesData(){
        return this.slides
    }s
    set slidesData(data){
        this.slides = data.map((item, index) =>{
            return index === 0 ? {
                ...item,
                slideIndex: index+1,
                cardClasses:CARD_VISIBLE,
                dotClasses:DOT_ACTIVE
            }
            :{
                ...item,
                slideIndex: index+1,
                cardClasses:CARD_INVISIBLE,
                dotClasses:DOT_INACTIVE
            }
        })
    }

    slideSelectionHandler(id){
        this.slideIndex = (id > this.slides.length) ? 1 : (id < 1) ?  this.slides.length : id;

        this.slides = this.slides.map((item) =>{
            return this.slideIndex === item.slideIndex ? {
                ...item,
                cardClasses:CARD_VISIBLE,
                dotClasses:DOT_ACTIVE
            }
            :{
                ...item,
                cardClasses:CARD_INVISIBLE,
                dotClasses:DOT_INACTIVE
            }
        })
    }

    selectSlide(event){
        let sliderindex = Number(event.target.dataset.id);
        this.slideSelectionHandler(sliderindex);
    }

    backSlide(){
        let sliderindex = this.slideIndex - 1;
        this.slideSelectionHandler(sliderindex);
    }

    forwardSlide(){
        let sliderindex = this.slideIndex + 1;
        this.slideSelectionHandler(sliderindex);
    }

    connectedCallback(){
        if(this.enableAutoScroll){
            setInterval(()=>{
                this.forwardSlide();
            }, Number(this.localTimeSlider))
        }
    }
}