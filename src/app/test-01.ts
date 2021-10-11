/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{ isMoney(loan_amount)? (monthly_payment | currency) : "N/A"}} <br/>
                    <b>Late Payment Fee : {{isMoney(loan_amount)? (late_payment | currency) : "N/A"}}</b> <br/>
                </div>`
})
export class Test01Component {
    loan_amount = '';
    public monthly_payment = this.getMonthlyPayament();
    public late_payment = this.getLatePayment();

    /**
     * 
     * @param amount 
     * @returns 
     * Determine if the loan_amount is in zero or empty
     */
    public isMoney(amount): boolean{
        const money = + amount;
        return (isNaN(money) === true || money === 0)? false : true;
    }

    /**
     * 
     * @returns 
     * Calculate the monthly payment
     */
    private getMonthlyPayament(): Number{
        const amount = + this.loan_amount // making sure that the loan amount is numeric
        return (2 / 100) * amount;
    }

    /**
     * 
     * @returns 
     * Calculate the late payment
     */
    private getLatePayment(): Number{
        const amount = + this.loan_amount
        return (2 / 100) * amount;
     }

}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    // declarations : [Test01Component]
})
export class Test01Module {}