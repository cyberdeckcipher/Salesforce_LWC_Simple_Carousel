import { LightningElement } from 'lwc';
import CAROUSEL_IMAGES from '@salesforce/resourceUrl/Pet';

export default class AdopetCaroselWrapper extends LightningElement {
    recordId = () =>{
        var splitedurl  = document.URL.split("/");
        return splitedurl[splitedurl.indexOf("Pet__c") + 1];
    }

    slides = [
        { image: `${CAROUSEL_IMAGES}_${this.recordId()}/Carousel/1.jpg`},
        { image: `${CAROUSEL_IMAGES}_${this.recordId()}/Carousel/2.jpg`},
        { image: `${CAROUSEL_IMAGES}_${this.recordId()}/Carousel/3.jpg`}
    ]
}