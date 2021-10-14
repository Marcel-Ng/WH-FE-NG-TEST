/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, Injectable, NgModule, Output  } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';


@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (keyup)="setField()" value=""  />'
})
export class TextField {
    @Output() field$ = new EventEmitter<string>();
    field = '';

    setField(){
        this.field$.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/>
                <textfield (field$)='getField($event)'></textfield>`
})
export class ChildComponent {
    @Output() _field$ = new EventEmitter<string>();
    
    getField(f: string){
        this.titleBridge(f)
        console.log('ff')
    }

    titleBridge(t: string){
        this._field$.emit(t)
    }

}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (_field$)="setTitle($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "z";

    setTitle(t: string){
        this.title = t;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField],
})
export class Test02Module {};
