import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  matchPasswords(pass: string, confirmPass: string) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(pass)?.value;
      const pass2 = formGroup.get(confirmPass)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(confirmPass)?.setErrors( { noMatch: true } )
        return { noMatch: true };
      }

      formGroup.get(confirmPass)?.setErrors( null )
      return null;
    }
  }
}
