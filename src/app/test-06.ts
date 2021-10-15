/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page 
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from "@angular/forms";


@Component({
    selector : 'ng-app',
    template : `
                <h2>User Review:</h2>
                <textarea class="textfield" placeholder="Write your Review" [formControl]="review_input" ></textarea>
                <br/><br/>
                <h3>Output:</h3>
                <div class="output" [innerText]="review_content"></div>

                `,
    styles : [
        `.textfield {
            width: 600px;
            height: 220px;
            padding: 10px;
            box-sizing: border-box;
        }`,
        `.output { 
            max-width: 100%;
            width: 600px;
            border: solid 1px #f9f6f6;
            padding: 5px;
            background: #ecebeb; 
            white-space: pre-wrap;
        }`
    ]
})
export class ReviewComponent {
    // sample input
    initial_input = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 

Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
          1) Nulla et tempus orci
          2) Integer semper porttitor faucibus
          
At https://wallethub.com <b>bolded text</b>`;

    review_input = new FormControl(this.initial_input);

    review_content = "";

    ngOnInit() {
        this.review_content = this.printReview(this.review_input.value);
        this.onReviewChanged();
    }

    onReviewChanged(): void{
        this.review_input.valueChanges.subscribe(val => {
            this.review_content = this.printReview(this.review_input.value)
        })
    }

    printReview(text: string): string{
        const exp_match = /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const element_content=text.replace(exp_match, "<a href='$1'>$1</a>");
        const new_exp_match =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
        const new_content=element_content.replace(new_exp_match, '$1<a target="_blank" href="http://$2">$2</a>');
        return new_content;
    }



}

@NgModule({
    imports : [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : ReviewComponent
            }
        ])
    ],
    declarations : [ReviewComponent]
})
export class ReviewModule {};