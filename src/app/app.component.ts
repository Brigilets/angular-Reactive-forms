import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];

  signUpForm: FormGroup;

  forbiddenUsernames: string[] = ['Chris', 'Anna'];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),

      gender: new FormControl('female'),
      hobbies: new FormArray([]),
    });
    // allows us to listen to changes

    // this.signUpForm.valueChanges.subscribe((value) => console.log(value));
    this.signUpForm.statusChanges.subscribe((status) => console.log(status));

    // this.signUpForm.setValue({
    //   userData: {
    //     username: 'Brigi',
    //     email: 'brigi@brigi.com',
    //   },
    //   gender: 'female',
    //   hobbies: [],
    // });

    // this.signUpForm.patchValue({
    //   userData: {
    //     username: 'Brigilets',
    //   },
    // });
  }

  onSubmit(): void {
    console.log(this.signUpForm);
    this.signUpForm.reset();
  }
  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies'))?.controls;
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  // custom validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
