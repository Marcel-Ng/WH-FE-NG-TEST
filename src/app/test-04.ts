/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked 
 * out of the fields, then beside it a username should be automatically generated which should be in the following 
 * format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm } from "@angular/forms";

@Component({
    selector : 'ng-app',

    template : `
                <h2>Enter your first and last name</h2>
                <div> 
                    <form #myForm="ngForm">
                        <input type="text" ngModel value="" (blur)="formBlurEvent(myForm)" name="firstname" />
                        <br/>
                        <input type="text" ngModel value="" (blur)="formBlurEvent(myForm)" name="lastname" />
                    </form>
                </div>
                <p> Generated username: {{username}} </p>`,
    styles : []
})
export class UserNameComponent {
    
    username_available: boolean = false;
    username: string = 'hh';
    constructor(){

    }

    generateUsername(first_name: string, last_name: string):string{
        const random_int = Math.round(Math.random()*10);
        return `${first_name.toLowerCase()}_${last_name.toLowerCase()}_${random_int}`
    }

    formBlurEvent(form: NgForm){

        if(form.value.firstname.trim() === '' || form.value.lastname.trim() === ''){
            console.log("The two fields not filled yet");
            this.username = '';
            this.username_available = false;
        }else{
            console.log("Done: ", this.username);
            this.username = this.generateUsername(form.value.firstname, form.value.lastname);
            this.username_available = false;
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};