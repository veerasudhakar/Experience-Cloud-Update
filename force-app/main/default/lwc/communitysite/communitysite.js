import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/images';
export default class StaticResourceLWCExample extends LightningElement {
    spring20Logo = My_Resource + '/images/NewB2B.webp';
    summer20Logo = My_Resource + '/images/faculty.jpg';
}