import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ThemeService} from "../common/services/theme.service";
import {WorkatoService} from "../common/services/workato.service";
import {UnavailableCountryService} from "./service-unavailable-country.service";

@Component({
  selector: 'app-service-unavailable-country',
  templateUrl: './service-unavailable-country.component.html',
  styleUrls: ['./service-unavailable-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceUnavailableCountryComponent {
  @Input()
  serviceUnavailableCountryDataPromise = this.service.getServiceUnavailableCountryData();
  themeObs = this.themeService.observeTheme();

  readonly form: FormGroup;
  serverCallInProgress = false;

  constructor(private readonly service: UnavailableCountryService,
    private readonly formBuilder: FormBuilder,
    private readonly themeService: ThemeService,
    private readonly workatoService: WorkatoService,
    private readonly snackBar: MatSnackBar,
    private readonly cd: ChangeDetectorRef,
    ) {
      this.form = this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email]],
      });
  }

  async onSubmit(thankYouMessage: string) {
    if (this.form.invalid) {
      this.snackBar.open('Please fill in all the required fields', 'Dismiss', {duration: 5000});
      return;
    }

    const {email} = this.form.value;
    try {
      this.serverCallInProgress = true;
      await this.workatoService.submitServiceUnavailableCountryForm(email);
    } finally {
      this.serverCallInProgress = false;
      this.cd.detectChanges();
    }

    this.snackBar.open(thankYouMessage, 'Dismiss', {duration: 5000});
    this.form.reset();
  }
}
