/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
    selector : 'ng-app',
    // template : `<form #signinForm="ngForm" (ngSubmit)="submittheForm(signinForm)" novalidate>
    //                 <h2>Login</h2>
    //                 <br/>
    //                 <input type="email" ngModel #email="ngModel" value="" name="email" />
    //                 <br/>
    //                 <em class="error">{{email_error}}</em>
    //                 <input type="password" value="" name="password" ngModel #password="ngModel"/>
    //                 <em class="error">{{password_error}}</em>
    //                 <button type="submit">Submit</button>
    //                 <br/><br/>
    //                 <div *ngIf="logged_in">Logged In!</div>
    //             </form>`,
    template : `<form (submit)="submittheForm($event)" novalidate>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [(ngModel)]="email" value="" name="email" />
                    <br/>
                    <em class="error">{{email_error}}</em>
                    <input type="password" value="" name="password" [(ngModel)]="password"/>
                    <em class="error">{{password_error}}</em>
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`,
    styles: ['.error { color: red; display: block }']
})
export class Test03Component {

    email:string = "";
    password:string = "";
    logged_in:boolean = false;
    password_error: string = '';
    email_error: string = '';

    private isEmail(email:string): boolean{
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            this.email_error = '';
            return true;
        }
        this.email_error = 'Please Enter valid email';
        return false;
    }

    private passwordIsStrong(password: string): boolean{
        const password_format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(password.match(password_format)){
            this.password_error = '';
            return true;
        }
        this.password_error = 'Please Enter strong password';
        return false;
    }

    public submittheForm(form: any){
        form.preventDefault();
        if(this.isEmail(this.email) && this.passwordIsStrong(this.password)){
            this.logged_in = true;
        }else{
            this.logged_in = false;
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
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};