import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {EventService} from "../news-and-events/event.service";
import {ActivatedRoute} from "@angular/router";
import {Event} from "../news-and-events/news-and-events.protocol";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkatoService} from "../common/services/workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isPlatformBrowser} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPageComponent implements OnInit {
  event?: Event
  allEvents?: Array<Event>;

  form?: FormGroup;
  serverCallInProgress = false;
  showVimeoVideo = false;

  constructor(private readonly eventService: EventService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cd: ChangeDetectorRef,
              private readonly formBuilder: FormBuilder,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar,
              @Inject(PLATFORM_ID) private platformId: object,
              protected domSanitizer: DomSanitizer) {

  }

  async ngOnInit() {
    const eventIdOrSlug = this.activatedRoute.snapshot.params['eventIdOrSlug'];
    this.event = await this.eventService.getEvent(eventIdOrSlug);
    if (this.event?.eventVideoUrl && isPlatformBrowser(this.platformId)) {
      window.location.href = this.event.eventVideoUrl;
      return;
    }
    this.cd.detectChanges();

    const formLabels = this.event!.form;
    if (formLabels.type === 'recordedGatedContent') {
      this.form = this.formBuilder.group({
        'email': ['', [Validators.required, Validators.email]],
      });
    } else {
      this.form = this.formBuilder.group({
        'firstName': ['', [Validators.required]],
        'lastName': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
      });
    }
  }

  async onSubmit() {
    if (!this.form || this.form.invalid) {
      this.snackBar.open('Please fill in all the required fields', 'Dismiss', {duration: 5000});
      return;
    }

    const {firstName, lastName, email} = this.form.value;
    try {
      this.serverCallInProgress = true;
      const formLabels = this.event!.form;
      if (formLabels.type === 'recordedGatedContent') {
        await this.workatoService.recordedGatedContent(email);
        if (this.event?.recordedVimeoUrl) {
          this.showVimeoVideo = true;
        }
      } else {
        await this.workatoService.eventRegistration(firstName, lastName, email);
        this.snackBar.open(`Thank you, you have been registered to the event`, 'Dismiss', {duration: 5000});
      }

    } finally {
      this.serverCallInProgress = false;
      this.cd.detectChanges();
    }
    this.form.reset();
  }

  getSafeVimeoUrl(event: Event) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(event.recordedVimeoUrl!);
  }
}
