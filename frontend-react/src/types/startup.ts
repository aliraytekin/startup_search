export type City =
  | "no_city_set"
  | "london"
  | "new_york"
  | "liverpool"
  | "tel_aviv"
  | "genova"
  | "birmingham"
  | "amsterdam"
  | "dublin";

export type Region =
  | "no_country"
  | "northern_europe"
  | "western_europe"
  | "northern_europe"
  | "southern_europe"
  | "southern_asia"
  | "western_asia"
  | "australia_and_new_zealand"
  | "south_eastern_asia"
  | "south_america";

export type Country =
  | "no_country"
  | "united_kingdom"
  | "united_states"
  | "india"
  | "netherlands"
  | "france"
  | "canada"
  | "israel"
  | "italy"
  | "germany";

export type AppState =
  | 'added_to_programme'
  | 'not_suitable'
  | 'invited_to_apply'
  | 'applying'
  | 'application_finalised'
  | 'shortlisted'
  | 'not_shortlisted'
  | 'invited_to_pitch_day'
  | 'not_invited_to_pitch_day'
  | 'successful'
  | 'not_successful'
  | 'not_interested'
  | 'interested'
  | 'referred';

export type Category =
  | 'optimisation'
  | 'providing_an_experience'
  | 'attention_on_the_consumer'
  | 'ui_ux'
  | 'no_category';

export type ContactState =
  | 'not_contacted'
  | 'contacted'
  | 'call_scheduled'
  | 'responded'
  | 'follow_up';

export type EmailStatus =
  | 'delivered'
  | 'bounced'
  | 'opened'
  | 'clicked';


  export interface Location {
    city: City;
    region: Region;
    country: Country;
  }

export interface Application {
  state: AppState;
  category: Category;
}

export interface Contact {
  state: ContactState;
  email_status: EmailStatus;
}

export interface Review {
  rating: number;
}

export interface Startup {
  id: number;
  name: string;
  location: Location;
  application: Application;
  contact: Contact;
  reviews: Review;
}


export interface Filters {
  q?: string;
  city?: City | '';
  region?: Region | '';
  country?: Country | '';
  app_state?: AppState | '';
  app_category?: Category | '';
  contact_state?: ContactState | '';
  email_status?: EmailStatus | '';
  page?: number; per?: number;
}

export interface PageMeta {
  page: number;
  per: number;
  total: number;
  total_pages: number;
}


export interface StartupCreateInput {
  startup: {
    name: string;
    location_attributes: Location;
    application_attributes: Application;
    contact_attributes: Contact;
    review_attributes: Review;
  }
}
