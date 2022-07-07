import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EventService} from "../news-and-events/event.service";
import {ActivatedRoute} from "@angular/router";
import {Event} from "../news-and-events/news-and-events.protocol";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkatoService} from "../common/services/workato.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private readonly eventService: EventService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cd: ChangeDetectorRef,
              private readonly formBuilder: FormBuilder,
              private readonly workatoService: WorkatoService,
              private readonly snackBar: MatSnackBar,) {

  }

  async ngOnInit() {
    const allEvents = await this.eventService.getEvents();
    const eventId = parseInt(this.activatedRoute.snapshot.params['eventId']);
    this.allEvents = allEvents;
    this.event = allEvents.find((e) => e.id === eventId);
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
      } else {
        await this.workatoService.eventRegistration(firstName, lastName, email);
      }

    } finally {
      this.serverCallInProgress = false;
      this.cd.detectChanges();
    }

    this.snackBar.open(`Thank you, you have been registered to the event`, 'Dismiss', {duration: 5000});
    this.form.reset();
  }
}
