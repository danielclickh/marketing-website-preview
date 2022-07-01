import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CloudService} from "./cloud.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkatoService} from "../common/services/workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloudComponent {
  cloudDataPromise = this.cloudService.getCloudData();
  themeObs = this.themeService.observeTheme();
  readonly form: FormGroup;
  serverCallInProgress = false;


  constructor(private readonly cloudService: CloudService,
              private readonly themeService: ThemeService,
              private readonly formBuilder: FormBuilder,
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
