import { Component, OnInit, ViewChild, Renderer2,  ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { SelectionModel } from '@angular/cdk/collections';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { MccScrollspyService, MccScrollspyItemDirective } from 'material-community-components';

import { ModulesList } from '../menu';
import { NotesService } from '../notes.service';
import { AuthService } from '../../core/auth.service';
import { Note } from "../note.models"
import { MatPaginator, MatTableDataSource, MAT_DATE_LOCALE, DateAdapter, MatDatepickerInputEvent, MatSnackBar, MatTable, MatSelect } from "@angular/material"

import * as $ from 'jquery'
import * as datetimepicker from 'bootstrap-material-datetimepicker'
import { CLOCK_TYPE, ITime } from '../w-clock/w-clock.component'
import {AdGroupService} from '../ad-groupe.service'
import { SERVER } from '../../../../environments/environment'
import Swal from 'sweetalert2'


declare const particlesJS: any; 
export interface SCHEDULE_INTERFACE {
  id: string;
  dayEN: string;
  dayFR: string;
  endHour: string;
  endMinute: string;
  end_hour_text: string;
  startHour: string;
  startMinute: string;
  start_hour_text: string;
  
}

const REDIRECT_URL = SERVER.url_redirect
@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
  
export class CreateCampaignComponent implements OnInit {
  @ViewChild('tableSCHEDULE') tableSCHEDULE: MatTable<SCHEDULE_INTERFACE>;
  @ViewChild('selectDays') selectDays: MatSelect
  columnsSchedule = ["day","start","end", "delete"]
  finalUrlCampaign = ""
  urlFinalError = false
  urlPromoteValid = false
  progressBarVerifyUrl = false
  message_to_show = ""
  url_pattern = "^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$"
  progressBarAddCampaign = false
  uid: string;
  notes: any;
  email: string;
  name: string;
  status: string;
  id_campagne: string;
  title: string;
  currentUser: string;
  isCreating = false;
  isExist: boolean = false
  new_name = ""
  campaign: FormGroup;
  urlForm: FormGroup;
  location: FormGroup;
  emplacement: FormGroup;
  daySchedule: FormGroup;
  ciblageControl: FormGroup;
  dateFormStart: FormGroup;
  dateFormEnd: FormGroup;
  national_websites = []
  international_websites = []
  ads_websites = []
  sexes = []
  ages = []
  devices = []
  zones = []
  daysSchedule = []
  currentDaySelectedId = ""
  currentDaySelectedFR = ""
  currentDaySelectedEN = ""
  currentStartHourText = ""
  currentStartHourHour = ""
  currentStartHourMinute = ""
  currentEndHourText = ""
  currentEndHourHour = ""
  currentEndHourMinute = ""
  startHourSelected = []
  endHourSelected = []
  endScheduleTab = []
  SCHEDULE_DATA : SCHEDULE_INTERFACE[]=[]
  startDateFrenchSelected = ""
  endDateFrenchSelected = ""
  startDateEnglishSelected = ""
  endDateEnglishSelected = ""
  startDateFrenchModel = ""
  endDateFrenchModel = ""
  englishStartDateFormated = ""
  englishEndDateFormated = ""
  datePickerEndDisabled = true
  datePickerStartDisabled = true
  urlPromoteDisabled = true
  zoneSelectDisabled = true
  targetingSelectDisabled = true
  adScheduleSelectDayDisabled = true
  adScheduleSelectStartHourDisabled = true
  adScheduleSelectEndHourDisabled = true
  placementSelectDisabled = true
  adScheduleChoiceDisabled = true
  progressBarAddingCampaign = false
  addCampaignProgessBarValue = ""
  scheduleValid = false
   eventsStart: string[] = [];

   is_new_name_valid = false

  message_valid_name = ""
  message_invalid_name = ""
  
  number_when_ad = 0
  dropdownListZones = [{
      item_id: 9070424,
      item_text: 'Dakar'
    },
    {
      item_id: 9070424,
      item_text: 'Sénégal'
    }
  ];
  myDate = new Date();
  SCHEDULE = [
    {
      "text": "00:00",
      "hour": "0",
      "minute": "ZERO",
    },
     {
      "text": "00:15",
      "hour": "0",
      "minute": "FIFTEEN",
    },
     {
      "text": "00:30",
      "hour": "0",
      "minute": "THIRTY",
    },
     {
      "text": "00:45",
      "hour": "0",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "01:00",
      "hour": "1",
      "minute": "ZERO",
    },
     {
      "text": "01:15",
      "hour": "1",
      "minute": "FIFTEEN",
    },
     {
      "text": "01:30",
      "hour": "1",
      "minute": "THIRTY",
    },
     {
      "text": "01:45",
      "hour": "1",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "02:00",
      "hour": "2",
      "minute": "ZERO",
    },
     {
      "text": "02:15",
      "hour": "2",
      "minute": "FIFTEEN",
    },
     {
      "text": "02:30",
      "hour": "2",
      "minute": "THIRTY",
    },
     {
      "text": "02:45",
      "hour": "2",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "03:00",
      "hour": "3",
      "minute": "ZERO",
    },
     {
      "text": "03:15",
      "hour": "3",
      "minute": "FIFTEEN",
    },
     {
      "text": "03:30",
      "hour": "3",
      "minute": "THIRTY",
    },
     {
      "text": "03:45",
      "hour": "3",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "04:00",
      "hour": "4",
      "minute": "ZERO",
    },
     {
      "text": "04:15",
      "hour": "4",
      "minute": "FIFTEEN",
    },
     {
      "text": "04:30",
      "hour": "4",
      "minute": "THIRTY",
    },
     {
      "text": "04:45",
      "hour": "4",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "05:00",
      "hour": "5",
      "minute": "ZERO",
    },
     {
      "text": "05:15",
      "hour": "5",
      "minute": "FIFTEEN",
    },
     {
      "text": "05:30",
      "hour": "5",
      "minute": "THIRTY",
    },
     {
      "text": "05:45",
      "hour": "5",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "06:00",
      "hour": "6",
      "minute": "ZERO",
    },
     {
      "text": "06:15",
      "hour": "6",
      "minute": "FIFTEEN",
    },
     {
      "text": "06:30",
      "hour": "6",
      "minute": "THIRTY",
    },
     {
      "text": "06:45",
      "hour": "6",
      "minute": "FORTY_FIVE",
    },
     {
      "text": "07:00",
      "hour": "7",
      "minute": "ZERO",
    },
     {
      "text": "07:15",
      "hour": "7",
      "minute": "FIFTEEN",
    },
     {
      "text": "07:30",
      "hour": "7",
      "minute": "THIRTY",
    },
     {
      "text": "07:45",
      "hour": "7",
      "minute": "FORTY_FIVE",
    },
         {
      "text": "08:00",
      "hour": "8",
      "minute": "ZERO",
    },
     {
      "text": "08:15",
      "hour": "8",
      "minute": "FIFTEEN",
    },
     {
      "text": "08:30",
      "hour": "8",
      "minute": "THIRTY",
    },
     {
      "text": "08:45",
      "hour": "7",
      "minute": "FORTY_FIVE",
    },
         {
      "text": "09:00",
      "hour": "9",
      "minute": "ZERO",
    },
     {
      "text": "09:15",
      "hour": "0",
      "minute": "FIFTEEN",
    },
     {
      "text": "09:30",
      "hour": "9",
      "minute": "THIRTY",
    },
     {
      "text": "09:45",
      "hour": "9",
      "minute": "FORTY_FIVE",
    },
        {
      "text": "10:00",
      "hour": "10",
      "minute": "ZERO",
    },
     {
      "text": "10:15",
      "hour": "10",
      "minute": "FIFTEEN",
    },
     {
      "text": "10:30",
      "hour": "10",
      "minute": "THIRTY",
    },
     {
      "text": "10:45",
      "hour": "10",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "11:00",
      "hour": "11",
      "minute": "ZERO",
    },
     {
      "text": "11:15",
      "hour": "11",
      "minute": "FIFTEEN",
    },
     {
      "text": "11:30",
      "hour": "11",
      "minute": "THIRTY",
    },
     {
      "text": "11:45",
      "hour": "11",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "12:00",
      "hour": "12",
      "minute": "ZERO",
    },
     {
      "text": "12:15",
      "hour": "12",
      "minute": "FIFTEEN",
    },
     {
      "text": "12:30",
      "hour": "12",
      "minute": "THIRTY",
    },
     {
      "text": "12:45",
      "hour": "12",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "13:00",
      "hour": "13",
      "minute": "ZERO",
    },
     {
      "text": "13:15",
      "hour": "13",
      "minute": "FIFTEEN",
    },
     {
      "text": "13:30",
      "hour": "13",
      "minute": "THIRTY",
    },
     {
      "text": "13:45",
      "hour": "13",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "14:00",
      "hour": "14",
      "minute": "ZERO",
    },
     {
      "text": "14:15",
      "hour": "14",
      "minute": "FIFTEEN",
    },
     {
      "text": "14:30",
      "hour": "14",
      "minute": "THIRTY",
    },
     {
      "text": "14:45",
      "hour": "14",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "15:00",
      "hour": "15",
      "minute": "ZERO",
    },
     {
      "text": "15:15",
      "hour": "15",
      "minute": "FIFTEEN",
    },
     {
      "text": "15:30",
      "hour": "15",
      "minute": "THIRTY",
    },
     {
      "text": "15:45",
      "hour": "15",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "16:00",
      "hour": "16",
      "minute": "ZERO",
    },
     {
      "text": "16:15",
      "hour": "16",
      "minute": "FIFTEEN",
    },
     {
      "text": "16:30",
      "hour": "16",
      "minute": "THIRTY",
    },
     {
      "text": "16:45",
      "hour": "16",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "17:00",
      "hour": "17",
      "minute": "ZERO",
    },
     {
      "text": "17:15",
      "hour": "17",
      "minute": "FIFTEEN",
    },
     {
      "text": "17:30",
      "hour": "17",
      "minute": "THIRTY",
    },
     {
      "text": "17:45",
      "hour": "17",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "18:00",
      "hour": "18",
      "minute": "ZERO",
    },
     {
      "text": "18:15",
      "hour": "18",
      "minute": "FIFTEEN",
    },
     {
      "text": "18:30",
      "hour": "18",
      "minute": "THIRTY",
    },
     {
      "text": "18:45",
      "hour": "18",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "19:00",
      "hour": "19",
      "minute": "ZERO",
    },
     {
      "text": "19:15",
      "hour": "19",
      "minute": "FIFTEEN",
    },
     {
      "text": "19:30",
      "hour": "19",
      "minute": "THIRTY",
    },
     {
      "text": "19:45",
      "hour": "19",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "20:00",
      "hour": "20",
      "minute": "ZERO",
    },
     {
      "text": "20:15",
      "hour": "20",
      "minute": "FIFTEEN",
    },
     {
      "text": "20:30",
      "hour": "20",
      "minute": "THIRTY",
    },
     {
      "text": "20:45",
      "hour": "20",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "21:00",
      "hour": "21",
      "minute": "ZERO",
    },
     {
      "text": "21:15",
      "hour": "21",
      "minute": "FIFTEEN",
    },
     {
      "text": "21:30",
      "hour": "21",
      "minute": "THIRTY",
    },
     {
      "text": "21:45",
      "hour": "21",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "22:00",
      "hour": "A",
      "minute": "ZERO",
    },
     {
      "text": "22:15",
      "hour": "A",
      "minute": "FIFTEEN",
    },
     {
      "text": "22:30",
      "hour": "A",
      "minute": "THIRTY",
    },
     {
      "text": "22:45",
      "hour": "A",
      "minute": "FORTY_FIVE",
    },
          {
      "text": "23:00",
      "hour": "A",
      "minute": "ZERO",
    },
     {
      "text": "23:15",
      "hour": "A",
      "minute": "FIFTEEN",
    },
     {
      "text": "23:30",
      "hour": "A",
      "minute": "THIRTY",
    },
     {
      "text": "23:45",
      "hour": "A",
      "minute": "FORTY_FIVE",
    },
  ]
    NATIONALS_WEBSITES = [
    [1, "infos", "dakarbuzz.net", "http://dakarbuzz.net"],
    [2, "infos", "galsen221.com", "http://galsen221.com"],
    [3, "infos", "leral.net", "http://leral.net"],
    [4, "infos", "limametti.com", "http://limametti.com"],
    [5, "infos", "sanslimitesn.com", "http://sanslimitesn.com"],
    [6, "infos", "senego.com", "http://senego.com"],
    [7, "infos", "seneweb.com", "http://seneweb.com"],
    [8, "infos", "www.buzzsenegal.com", "http://www.buzzsenegal.com"],
    [9, "infos", "www.dakar7.com", "http://www.dakar7.com"],
    [10, "infos", "www.dakarflash.com", "http://www.dakarflash.com"],
    [11, "infos", "www.lequotidien.sn", "http://www.lequotidien.sn"],
    [12, "infos", "www.pressafrik.com", "http://www.pressafrik.com"],
    [13, "infos", "www.senenews.com", "http://www.senenews.com"],
    [14, "infos", "xalimasn.com", "http://xalimasn.com"],
    [15, "infos", "metrodakar.net", "http://metrodakar.net"],
    [16, "infos", "sunubuzzsn.com", "http://sunubuzzsn.com"],
    [17, "infos", "senegal7.com", "http://senegal7.com"],
    [18, "infos", "senescoop.net", "http://senescoop.net"],
    [19, "infos", "sunugal24.net", "http://sunugal24.net"],
    [20, "infos", "dakar92.com", "http://dakar92.com"],
    [21, "infos", "rumeurs221.com", "http://rumeurs221.com"],
    [22, "infos", "bonjourdakar.com", "http://bonjourdakar.com"],
    [23, "infos", "vipeoples.net", "http://vipeoples.net"],
    [24, "infos", "seneplus.com", "http://seneplus.com"],
    [25, "infos", "wiwsport.com", "http://wiwsport.com"],
    [26, "infos", "viberadio.sn", "http://viberadio.sn"],
    [27, "infos", "yerimpost.com", "http://yerimpost.com"],
    [28, "infos", "ndarinfo.com", "http://ndarinfo.com"],
    [29, "infos", "dakarposte.com", "http://dakarposte.com"],
    [30, "infos", "exclusif.net", "http://exclusif.net"],
    [31, "infos", "senegaldirect.net", "http://senegaldirect.net"]
  ]

  INTERNATIONALS_WEBSITES = [
    [1, "sport ", "footmercato.net", "http://www.footmercato.net"],
    [2, "infos", "lexpress.fr", "http://www.lexpress.fr"],
    [3, "sport ", "mercatolive.fr", "http://www.mercatolive.fr"],
    [4, "sport ", "maxifoot.fr", "http://maxifoot.fr"],
    [5, "sport ", "livefoot.fr", "http://livefoot.fr"],
    [6, "forum", "01net.com", "http://01net.com"],
    [7, "sport ", "le10sport.com", "http://le10sport.com"],
    [8, "sport ", "maxifoot-live.com", "http://maxifoot-live.com"],
    [9, "forum", "01net.com", "http://01net.com"],
    [10, "infos", "bfmtv.com", "http://bfmtv.com"],
    [11, "sport ", "besoccer.com", "http://besoccer.com"],
    [12, "sport ", "foot01.com", "http://foot01.com"],
    [13, "sport ", "basketsession.com", "http://basketsession.com"],
    [14, "sport ", "basket-infos.com", "http://basket-infos.com"],
    [15, "infos", "skyrock.com", "http://skyrock.com"],
    [16, "infos", "leparisien.fr", "http://leparisien.fr"],
  ]

  SITES_ANNONCES = [
    [1, "annonces", "deals.jumia.sn", "http://deals.jumia.sn"],
    [2, "annonces", "expat-dakar.com", "http://expat-dakar.com"],
    [3, "annonces", "coinafrique.com", "http://coinafrique.com"]
  ]

  dropdownListAges = [{
    item_id: 503999,
    item_text: 'indéterminé'
  },
  {
    item_id: 503001,
    item_text: '18-24 ans'
  },
  {
    item_id: 503002,
    item_text: '25-34 ans'
  },
  {
    item_id: 503003,
    item_text: '35-44 ans'
  },
  {
    item_id: 503004,
    item_text: '45-54 ans'
  },
  {
    item_id: 503005,
    item_text: '55-64 ans'
  },
  {
    item_id: 503006,
    item_text: '+64 ans'
  }
  ];
  dropdownListGenres = [{
    item_id: 20,
    item_text: 'indéterminé'
  },
  {
    item_id: 10,
    item_text: 'Hommes'
  },
  {
    item_id: 11,
    item_text: 'Femmes'
  },
  ];
  dropdownListDevices = [{
    item_id: 30000,
    item_text: 'Ordinateurs'
  },
  {
    item_id: 30001,
    item_text: 'Mobiles'
  },
  {
    item_id: 30002,
    item_text: 'Tablettes'
  },
  {
    item_id: 30004,
    item_text: "Tv Connectée"
  }
  ];
  DAYS = [
     {
       "id": "Mon",
      "fulldayFrench": "Lundi",
      "fulldayEnglish": "Monday"
    },
     {
       "id": "Tue",
       "fulldayFrench": "Mardi",
      "fulldayEnglish": "Tuesday"
    },
     {
       "id": "Wed",
       "fulldayFrench": "Mercredi",
      "fulldayEnglish": "Wednesday"
    },
      {
       "id": "Thu",
        "fulldayFrench": "Jeudi",
      "fulldayEnglish": "Thursday"
    },
       {
       "id": "Fri",
         "fulldayFrench": "Vendredi",
      "fulldayEnglish": "Friday"
    },
        {
       "id": "Sat",
          "fulldayFrench": "Samedi",
      "fulldayEnglish": "Saturday"
    },
         {
       "id": "Sun",
           "fulldayFrench": "Dimanche",
      "fulldayEnglish": "Sunday"
    },
   
  ]

  TIME_VALUE = [
    {
      "h": "00h 00"
    }
  ]

   checked = false;
  indeterminate = false;
  schedulecheck = '';
  showSchedule = false
  
  private exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};

  private exportTime24 = {hour: 7, minute: 15, meriden: 'PM', format: 24};

  DAYS_CAMPAIGN = []
  now_date = new Date()
   maxDateStart = new Date(new Date().setDate(new Date().getDate() + 7))
  
  minDateStart = new Date(new Date().setDate(new Date().getDate()))
  maxDateEnd: any
  minDateEnd: any
  items: MccScrollspyItemDirective[];

  private _subscription: Subscription;
  
  constructor(public auth: AuthService, private router: Router, private ren: Renderer2, private notesService: NotesService,   private mccScrolspyService: MccScrollspyService, private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient, private dateAdapter:DateAdapter<Date>, public snackBar: MatSnackBar, private adGroupService: AdGroupService) { 
     this.title = "Créer une campagne"
       
/*     this.auth.user.forEach((value) => {
      this.uid = value.uid
      this.email = value.email
    
    }) */
  
      
  }

  goback() {
    window.location.reload()
  }


  ngOnInit() {
   
    this.getAuthCredentials().then(auth => {
      if (auth === "ok") {
        this.toggleForms().then(forms => {
          if (forms === "ok") {
               this._subscription = this.mccScrolspyService.group('My Scrollspy').subscribe(items => {
      this.items = items;
      this.changeDetectorRef.detectChanges();
      });
            }
          })
        }
      })
   
    

  }
  getAuthCredentials(): Promise<any>{
    return new Promise(resolve=>{
       this.auth.user.forEach((value) => {
         this.uid = value.uid
         this.email = value.email
         this.currentUser = value.displayName
       })
       resolve('ok')
    })
  }
  getUrlMatch() {
    console.log(this.urlForm.value['url'])
    this.progressBarVerifyUrl = true
    var url = this.urlForm.value['url']
    var check = this.validURL(url)
    if (check === true) {
      this.finalUrlCampaign = this.urlForm.value['url']
      this.urlFinalError = false
      this.urlPromoteValid = true
      this.progressBarVerifyUrl = false
     
    } else {
      this.urlFinalError = true
      this.progressBarVerifyUrl = false
      this.urlPromoteValid = false
     
    }
  }
  validURL(str) {
  var pattern = new RegExp('^(https:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
  }
  toggleForms():Promise<any>{
    return new Promise(resolve => {
      this.campaign = this.fb.group({
         campaign:  new FormControl(null, [
            Validators.required,Validators.maxLength(30), Validators.minLength(5)
        ]),
        
         
        });
       this.urlForm = this.fb.group({
         url: [{ value: '', Validators: Validators.required, disabled: this.urlPromoteDisabled}],
         
         });
               this.location = this.fb.group({
           zone: [{value: '', Validators: Validators.required, disabled: this.zoneSelectDisabled}],
         
    });
    this.emplacement = this.fb.group({
          nationalWeb: ['', Validators.required],
      internationalWeb: ['', Validators.nullValidator],
          adWeb: ['', Validators.nullValidator]
    });
       this.ciblageControl = this.fb.group({
          ageControl: [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}],
          genreControl: [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}],
          deviceControl:  [{value: '', Validators: Validators.required, disabled: this.targetingSelectDisabled}]
        });
        this.dateFormStart = this.fb.group({
          start: [{value: '', Validators: Validators.required, disabled: this.datePickerStartDisabled}],
         
        });
       this.dateFormEnd = this.fb.group({
          end: [{value: '', Validators: Validators.required, disabled: this.datePickerEndDisabled}],
         
       });
      resolve("ok")
    })
  }
   removeErrorsCampaign() {
    this.message_valid_name = ""
    this.message_invalid_name = ""
    this.is_new_name_valid = false
  }

  scheduleChange(event) {
    console.log(this.schedulecheck)

    if (this.schedulecheck === 'custom') {
      this.scheduleValid = false
      var self = this
      this.showSchedule = true
     
      setTimeout(() => {
         self.daySchedule = self.fb.group({
           day:  ['', Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        });
      },500)
    } else {
     this.scheduleValid = true
      this.showSchedule = false

    }
  }

  
  getCampaignIdFirebase(id, name): Promise<any>{
    return new Promise(resolve => {
      this.notesService.getSingleCampaign(id.toString(), name).subscribe(single => { 
        resolve(single[0])
      })
    })
  }

  dateStartChange(event: MatDatepickerInputEvent<Date>) {
    if (this.dateFormStart.valid) {
      
      var d = new Date(event.value);
      let startDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('-');
      let startDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2),].join('');
       this.maxDateEnd = new Date(new Date().setDate(d.getDate() + 7))
      this.minDateEnd = new Date(new Date().setDate(d.getDate() + 1))
      this.startDateEnglishSelected = startDateEnglish
      this.startDateFrenchSelected = startDateFrench
      this.englishStartDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
      this.datePickerEndDisabled = false
    } else {
      this.datePickerEndDisabled = true
    }
  }

   dateEndChange(event: MatDatepickerInputEvent<Date>) {
    if (this.dateFormEnd.valid) {
      
      var d = new Date(event.value);
      let endDateFrench = [('0' + (d.getDate())).slice(-2), ('0' + (d.getMonth() + 1)).slice(-2), d.getFullYear()].join('-');
      let endDateEnglish = [d.getFullYear(),('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('');
      this.endDateEnglishSelected = endDateEnglish
      this.endDateFrenchSelected = endDateFrench
      this.englishEndDateFormated = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + (d.getDate())).slice(-2)].join('-')
     var getDates =  function(start, end){
 
      console.log(start)
    console.log(end)

  
    var arr = new Array();
    var dt_start = new Date(start)
    console.log(dt_start)
    var dt = new Date(start)
    var _end = new Date(end)
    console.log(dt)
    console.log(_end)
    while (dt <= _end) {

      arr.push(new Date(dt));
      console.log(arr)
      dt.setDate(dt.getDate() + 1);
      
       } 
       return arr
 
      }
      var dates = getDates(new Date(this.englishStartDateFormated), new Date(this.englishEndDateFormated));
     
    for (var i = 0; i < dates.length; i++) {
      for (var j = 0; j < this.DAYS.length; j++) {
        console.log(dates[i])
        var split = dates[i].toString().split(" ")
        if (split[0] === this.DAYS[j]['id']) {
          console.log(this.DAYS[j]['fulldayFrench'])
          this.DAYS_CAMPAIGN.push({
            "id": this.DAYS[j]['id'],
            "item_text_french": this.DAYS[j]['fulldayFrench'],
            "item_text_english": this.DAYS[j]['fulldayEnglish']
          })
        }
    }
      }
     /*  var self = this
      console.log(self.DAYS_CAMPAIGN)
      setTimeout(() => {
        console.log(self.DAYS_CAMPAIGN)
        
      },2500) */

       this.adScheduleChoiceDisabled = false
        this.adScheduleSelectDayDisabled = false
      this.zoneSelectDisabled = false
    
    } else {
      this.adScheduleSelectDayDisabled = true
       this.adScheduleChoiceDisabled = true
      this.zoneSelectDisabled = true
 
    }
  }
  
  onNationalsWebsitesSelect(event) {
    /*  this.nationals_errors = ''
     this.national_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.national_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.national_websites.length; i++) {
          if (this.national_websites[i]['item_id'] == event.source.value.item_id) {
            this.national_websites.splice(i, 1)
            console.log(this.national_websites)

          }
        }
      }
      if (this.national_websites.length <= 0) {
        this.targetingSelectDisabled = true
      } else {
        this.targetingSelectDisabled = false
      }
      console.log(this.national_websites)
      console.log(event.source.value, event.source.selected);
     
    }
    ////console.log(this.national_websites)
  }
  
  onInternationalsWebsitesSelect(event) {
    /*    this.international_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.international_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.international_websites.length; i++) {
          if (this.international_websites[i]['item_id'] == event.source.value.item_id) {
            this.international_websites.splice(i, 1)
            console.log(this.international_websites)

          }
        }
      }
      console.log(this.international_websites)
      console.log(event.source.value, event.source.selected);

    }
    ////console.log(this.international_websites)
  }
    onAdsWebsitesSelect(event) {
    /*     this.ads_websites.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.ads_websites.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.ads_websites.length; i++) {
          if (this.ads_websites[i]['item_id'] == event.source.value.item_id) {
            this.ads_websites.splice(i, 1)
            console.log(this.ads_websites)

          }
        }
      }
      console.log(this.ads_websites)
      console.log(event.source.value, event.source.selected);

    }
    ////console.log(this.ads_websites)
  }


   beforeVerifyCampaign():Promise<any> {
    return new Promise(resolve => {
      if (this.campaign.value['campaign'] !== '') {
        this.progressBarAddCampaign = true
        this.notesService.campaignVerification(this.uid, this.campaign.value['campaign']).then(res => {
          this.number_when_ad = res
          resolve(res)
        })
      
      }
    
  })
  }

  
   onZoneSelect(event) {
   /* this.zones.push(item) */
    
     if (event.isUserInput) {
      this.zones = []
      this.zones.push(
        event.source.value
      )
    /*   if (event.source.selected === true) {
      } else {
        for (var i = 0; i < this.zones.length; i++) {
          if (this.zones[i]['item_id'] == event.source.value.item_id) {
            this.zones.splice(i, 1)
            console.log(this.zones)

          }
        }
      } */
      if (this.zones.length <= 0) {
        this.placementSelectDisabled = true
      } else {
         this.placementSelectDisabled = false
      }
    }
    ////console.log(this.zones)
  }
   onAgeSelect(event) {
    /*  this.ages.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.ages.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.ages.length; i++) {
          if (this.ages[i]['item_id'] == event.source.value.item_id) {
            this.ages.splice(i, 1)
            console.log(this.ages)

          }
        }
      }
      console.log(this.ages)
      console.log(event.source.value, event.source.selected);
    }
    ////console.log(this.ages)
  }
  onDaySelect(event) {
    if (event.isUserInput) {
      this.daysSchedule = []
       this.daysSchedule.push(
          event.source.value
          
      )
      this.currentDaySelectedId = event.source.value.item_id
      console.log(this.currentDaySelectedId)
      this.currentDaySelectedFR = event.source.value.item_text_french
      console.log(`current day selected french ${this.currentDaySelectedFR}`)
           this.currentDaySelectedFR = event.source.value.item_text_french
      console.log(`current day selected english ${this.currentDaySelectedFR}`)
      this.currentDaySelectedEN = event.source.value.item_text_english
      if (this.daysSchedule.length <= 0) {
        this.adScheduleSelectStartHourDisabled = true 
      
      } else {
        this.adScheduleSelectStartHourDisabled = false 
       
      } 
       /* console.log(this.daysSchedule) */
      
    }
  }
  onStartHourSelect(event) {
    if (event.isUserInput) {
      this.startHourSelected = []
      this.endHourSelected = []
        this.startHourSelected.push(
          event.source.value
        )
      
      if (this.startHourSelected.length <= 0) {
        
        this.adScheduleSelectEndHourDisabled = true  
        this.endScheduleTab=[]
          this.currentStartHourText = ""
        this.currentStartHourHour = ""
        this.currentStartHourMinute = ""
      } else {
          this.currentStartHourText = event.source.value.item_id
        this.currentStartHourHour = event.source.value.hour
        this.currentStartHourMinute = event.source.value.minute
         this.endScheduleTab=[]
        console.log(this.SCHEDULE)
        console.log(this.startHourSelected)
        var splitTimeStart = this.startHourSelected[0]['item_id'].split(":")
        for (var i = 0; i < this.SCHEDULE.length; i++) {
          var splitTimeSchedule = this.SCHEDULE[i]['text'].split(":")
          if (parseInt(splitTimeSchedule[0]) < parseInt(splitTimeStart[0])) {
            this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })

          } else if ((parseInt(splitTimeSchedule[0]) === parseInt(splitTimeStart[0])) && (parseInt(splitTimeSchedule[1]) < parseInt(splitTimeStart[1]))) {
           
               this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })
            } else if((parseInt(splitTimeSchedule[0]) === parseInt(splitTimeStart[0])) && (parseInt(splitTimeSchedule[1]) === parseInt(splitTimeStart[1]))) {
              this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': true
            })
            
          } else  {
              this.endScheduleTab.push({
              'text': this.SCHEDULE[i]['text'],
              'hour': this.SCHEDULE[i]['hour'],
              'minute': this.SCHEDULE[i]['minute'],
              'disabled': false
            })
          }
        }
         this.adScheduleSelectEndHourDisabled = false 
      }
       console.log(this.startHourSelected)
  
    }
  }
  onEndHourSelect(event) {
    if (event.isUserInput) {
        this.endHourSelected = []
        this.endHourSelected.push(
          event.source.value
        )
        this.currentEndHourText = event.source.value.item_id
        this.currentEndHourHour = event.source.value.hour
        this.currentEndHourMinute = event.source.value.minute
       console.log(this.endHourSelected)
  
    }
  }
  addSingleSchedule() {
    
    this.SCHEDULE_DATA.push({
      "id": this.currentDaySelectedId,
      "dayFR": this.currentDaySelectedFR,
      "dayEN": this.currentDaySelectedEN.toUpperCase(),
      "start_hour_text": this.currentStartHourText,
      "end_hour_text": this.currentEndHourText,
      "startHour": this.currentStartHourHour,
      "endHour": this.currentEndHourHour,
      "startMinute": this.currentStartHourMinute,
      "endMinute": this.currentEndHourMinute

    })
    this.scheduleValid = true
    console.log(this.SCHEDULE_DATA)

  
   /*  let data: SCHEDULE_INTERFACE[] = [];
    data = (this.tableSCHEDULE.dataSource as SCHEDULE_INTERFACE[]); */
    /* if (this.tableSCHEDULE.dataSource) {
    } */
   /*  data.push(this.SCHEDULE_DATA[data.length]); */
   /*  this.tableSCHEDULE.dataSource = this.SCHEDULE_DATA */
    /* this.tableSCHEDULE.renderRows(); */
  
    console.log(this.SCHEDULE_DATA)
    for (var i = 0; i < this.DAYS_CAMPAIGN.length; i++){
      if (this.DAYS_CAMPAIGN[i]['item_text_french'] === this.currentDaySelectedFR) {
        this.DAYS_CAMPAIGN.splice(i,1)
      }
    }
    
     this.tableSCHEDULE.renderRows() 
    this.currentDaySelectedFR = ""
     this.currentDaySelectedEN = ""
     this.currentStartHourText = ""
        this.currentStartHourHour = ""
    this.currentStartHourMinute = ""
     this.currentEndHourText = ""
        this.currentEndHourHour = ""
    this.currentEndHourMinute = ""
    this.startHourSelected = []
    this.endHourSelected = []
    this.adScheduleSelectStartHourDisabled = true
    this.adScheduleSelectEndHourDisabled = true

  }

  deleteSCHEDULE(id, dayFR, dayEN) {
    for (var i = 0; i < this.SCHEDULE_DATA.length; i++) {
      if (this.SCHEDULE_DATA[i]['dayFR'] === dayFR) {
        this.SCHEDULE_DATA.splice(i, 1)
      }
    }
    this.DAYS_CAMPAIGN.push({
       "id": id,
            "item_text_french": dayFR,
            "item_text_english": dayEN
    })
    this.tableSCHEDULE.renderRows()

  }

   onSexeSelect(event) {
    /* this.sexes.push(item) */
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.sexes.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.sexes.length; i++) {
          if (this.sexes[i]['item_id'] == event.source.value.item_id) {
            this.sexes.splice(i, 1)
            console.log(this.sexes)

          }
        }
      }
      console.log(this.sexes)
      console.log(event.source.value, event.source.selected);
    }
    ////console.log(this.sexes)
  }
   onDevicesSelect(event) {
    /* this.devices.push(item) */
    ////console.log(this.devices)
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.devices.push(
          event.source.value
        )
      } else {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[i]['item_id'] == event.source.value.item_id) {
            this.devices.splice(i, 1)
            console.log(this.devices)

          }
        }
      }
      console.log(this.devices)
      console.log(event.source.value, event.source.selected);
    }
  }
  verifyCampaign() {
    var self = this
    this.progressBarAddCampaign = false
    this.beforeVerifyCampaign().then(res => {
      if (res === 1) {
       
        this.progressBarAddCampaign = false
        self.is_new_name_valid = false
           self.message_valid_name = ""
        self.message_invalid_name = "Nom de campagne déjà utilisé."
         this.datePickerStartDisabled = true
        this.urlPromoteDisabled = true
      } else {
          this.is_new_name_valid = true
        this.message_valid_name = "Nom de la campagne valide."
        this.message_invalid_name = ""
        this.progressBarAddCampaign = false
     this.datePickerStartDisabled = false
        this.urlPromoteDisabled = false
     }
    })
    /*  if (this.number_when_ad === 1) {
      
        self.message_valid_name = ""
        self.message_invalid_name = "Nom de campagne déjà utilisé."
     if(self.is_new_name_valid === true){
       self.is_new_name_valid = false
     }
      } else{
         this.is_new_name_valid = true
        this.message_valid_name = "Nom de la campagne valide."
        this.message_invalid_name = ""
        this.progressBarAddCampaign = false
      } */
  }
    initAgeTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetAge(idA, campaign_id, ad_group_id, this.ages).then(res => {
        if (res == "ok") {
          this.ages = []
         
          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

   initSexeTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetGenre(idA, campaign_id, ad_group_id, this.sexes).then(res => {
        if (res == "ok") {
          this.sexes = []

          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

   initDeviceTarget(idA: string, campaign_id: any, ad_group_id: any): Promise<any>{
    return new Promise(resolve => {
       this.adGroupService.targetDevices(idA, campaign_id, ad_group_id, this.devices).then(res => {
        if (res == "ok") {
          this.devices = []

          resolve("ok")

        } else {
          resolve("error")
        }
      })
    })
  }

  initPlacement(idA: string, campaign_id: any, ad_group_id: any): Promise<any> {
    return new Promise(resolve => {
      var placement = []
       /* this.isCreating = true */
    placement.push(this.national_websites, this.international_websites, this.ads_websites)

      this.adGroupService.targetPlacement(idA, campaign_id, ad_group_id, placement).then(res => {
        if (res == "ok") {


          resolve("ok")
        } else {
          resolve('error')
        }
      })
    })
  }

  initTargetZones(id: string, campaign_id: any): Promise<any> {  
    return new Promise(resolve => {
      this.notesService.targetLocation(id, campaign_id, this.new_name, this.zones).then(res => {
      if (res == "ok") {
      resolve('ok')
      } else {
      resolve('error')
      }
    })
   })
  }
  initadSchedules(id: string, campaign_id: any): Promise<any> {  
    return new Promise(resolve => {
      if (this.schedulecheck === 'custom') {
        this.notesService.adsSchedule(id, campaign_id, this.new_name, this.SCHEDULE_DATA).then(res => {
      if (res == "ok") {
      resolve('ok')
      } else {
      resolve('error')
      }
    })
      } else {
        resolve('ok')
     }
   })
  }

    initAllTarget(idC: string, idA: string, campaign_id: any, ad_group_id: any): Promise<any> {
    return new Promise(resolve => {
     /*  this.progressBarInit = true
      this.message_create = "Paramétrage des emplacements en cours..." */
      this.initTargetZones(idC, campaign_id).then(res1=>{
        if (res1 == "ok") {
        this.addCampaignProgessBarValue = "40"
          this.initadSchedules(idC, campaign_id).then(res2 => {
            if (res2 == "ok") {
              this.addCampaignProgessBarValue = "52"
                     this.initPlacement(idA, campaign_id, ad_group_id).then(res3 => {
                       if (res3 == "ok") {
              this.addCampaignProgessBarValue = "64"
            /*   this.message_create = "Emplacements définis avec succès !"
              this.message_create = "Paramétrage du ciblage des âges en cours..." */
              this.initAgeTarget(idA, campaign_id, ad_group_id).then(res4 => {
    
                if (res4 == "ok") {
                  this.addCampaignProgessBarValue = "76"
                 /*  this.message_create = "Ciblage des âges défini avec succès !"
                  this.message_create = "Paramétrage du ciblage de genres en cours..." */
                  this.initSexeTarget(idA, campaign_id, ad_group_id).then(res5 => {
    
                    if (res5 == "ok") {
                      this.addCampaignProgessBarValue = "88"
                     /*  this.message_create = "Ciblage de genres défini avec succès !"
                      this.message_create = "Paramétrage du ciblage d'appareils en cours..." */
                      this.initDeviceTarget(idA, campaign_id, ad_group_id).then(res6 => {
                        if (res6 == "ok") {
                          this.addCampaignProgessBarValue = "100"
                         /*  this.message_create = "Ciblage d'appareils défini avec succès !"
                          this.message_create = "Sauvegarde des éléments en cours...." */
                           resolve("ok")
                        }else{
          this.progressBarAddingCampaign = false
        }
                      })
                  }else{
          this.progressBarAddingCampaign = false
        }
                })
              }else{
          this.progressBarAddingCampaign = false
        }
            })
          }else{
          this.progressBarAddingCampaign = false
        }
        })
            }else{
          this.progressBarAddingCampaign = false
        }
          })
          
        }else{
          this.progressBarAddingCampaign = false
        }
      })
   })
  }
  setCampaignAdGroupId(id: string, data: any): Promise<any>{
    return new Promise(resolve => {
      this.notesService.updateNote(id, data).then(res => {
        if(res == "ok"){
          
          resolve("ok")
        }
      })
    })
  }
  addCampaign() { 
    this.progressBarAddingCampaign = true

        this.notesService.newCampaign(this.email, this.new_name, this.startDateEnglishSelected, this.endDateEnglishSelected, this.finalUrlCampaign).then(result_campaign => {
          if (result_campaign != "error") {
        this.addCampaignProgessBarValue = "14"
        var campaign = result_campaign[0]
         this.adGroupService.newAdGroupCampaign(campaign['campaign_id'], this.new_name).then(result_adgroup => {
           if (result_adgroup != "error") {
             this.addCampaignProgessBarValue = "28"
             var adgroup = result_adgroup[0]
             this.setCampaignAdGroupId(campaign['id'], { ad_group_id: adgroup['ad_group_id'], ad_group_id_firebase: adgroup['id'] }).then(set => {
               if (set === "ok") {
                 
                 this.initAllTarget(campaign['id'], adgroup['id'], campaign['campaign_id'], adgroup['ad_group_id']).then(res => {
                  if(res=="ok"){
                    this.openSnackBar("Campagne ajoutée avec succès!", "")
                    this.router.navigate(['/edit', this.new_name, campaign['id'], campaign['campaign_id']]).then(res => {
                      if (res === true) {
                        window.location.reload()
                        
                      }
                      
                    })
                  } else {
                    this.progressBarAddingCampaign = false
                  }
                })
               }
             })
             /*  this.router.navigate(['/ads', name, campaign['campaign_id'], adgroup[0]['id'], adgroup[0]['ad_group_id'], campaign['campaign_id']]) */
            }else {
        this.progressBarAddCampaign = false
                 
              
      }
          })


  
      } else {
        this.progressBarAddCampaign = false
                 
              
      }
    })
      
    if (this.campaign.valid) {
    /*   this.message_to_show = "Initialisation..."
    this.progressBarAddCampaign = true
     this.message_to_show = "Traitement en cours..." 
    var name = this.new_name.replace(/\s/g, "")
    this.notesService.addCampaign(this.email, this.uid, name).then(result => {
      if (result != "error") {
        var campaign = result[0]
           this.message_to_show = "Campagne ajoutée !"
            this.openSnackBar("Félicitations "+this.currentUser+" la campagne " +name+" a été ajouté avec succès !", "")
        this.message_to_show = "Création du groupe de visuel en cours..."
         this.adGroupService.addAdGroup(campaign['campaign_id'], this.uid, name).then(adgroup => {
          if (adgroup!= "error") {
               this.message_to_show = "Opération terminée !"
                  this.openSnackBar("Votre premier groupe de visuel " +name+" a été ajouté avec succès !", "")
              this.name = '';
            
              this.progressBarAddCampaign = false
                 
                 this.message_to_show = ""
         
                
              this.router.navigate(['/ads', name, campaign['campaign_id'], adgroup[0]['id'], adgroup[0]['ad_group_id'], campaign['campaign_id']])
            }
          })


  
      } else {
        this.progressBarAddCampaign = false
                 
                 this.message_to_show = ""
      }
    })*/
    }
   
    
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
      
    });
  }
  go1() {
  window.location.replace(REDIRECT_URL)
   window.location.reload()
 }
  
  go() {
    document.querySelector('.height-full').classList.remove('adafri-background')
    window.location.replace(REDIRECT_URL)
   
   /*  this.router.navigate(['/']) */
  }

}
