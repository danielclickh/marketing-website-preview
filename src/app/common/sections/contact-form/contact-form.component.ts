import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ContactForm} from "../../protocol/common.protocol";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkatoService} from "../../services/workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent {
  @Input()
  contactForm!: ContactForm;

  readonly form: FormGroup;
  serverCallInProgress = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar,
              private readonly cd: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'company': ['', []],
      'useCase': ['', []]
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.snackBar.open('Please fill in all the required fields', 'Dismiss', {duration: 5000});
      return;
    }

    const {firstName, lastName, email, company, useCase} = this.form.value;
    try {
      this.serverCallInProgress = true;
      await this.workatoService.websiteContact(firstName, lastName, email, company, useCase);
    } finally {
      this.serverCallInProgress = false;
      this.cd.detectChanges();
    }

    this.snackBar.open(`Thank you for applying for early access`, 'Dismiss', {duration: 5000});
    this.form.reset();
  }
}
