import { AppState, Category, ContactState, EmailStatus } from "./startup";

export type Variant = "success" | "danger" | "warning" | "info" | "neutral";

export const APP_STATE_VARIANT: Record<AppState, Variant> = {
  added_to_programme: 'success',
  successful:          'success',
  shortlisted:         'info',
  invited_to_apply:    'info',
  invited_to_pitch_day:'info',
  applying:            'warning',
  application_finalised:'warning',
  interested:          'info',
  referred:            'info',
  not_shortlisted:     'danger',
  not_invited_to_pitch_day:'danger',
  not_successful:      'danger',
  not_suitable:        'danger',
  not_interested:      'danger',
};

export const CATEGORY_VARIANT: Record<Category, Variant> = {
  optimisation:            'success',
  providing_an_experience: 'info',
  attention_on_the_consumer:'info',
  ui_ux:                   'neutral',
  no_category:             'neutral',
};

export const CONTACT_STATE_VARIANT: Record<ContactState, Variant> = {
  not_contacted: 'neutral',
  contacted:     'info',
  responded:     'success',
  call_scheduled:'warning',
  follow_up:     'warning',
};

export const EMAIL_STATUS_VARIANT: Record<EmailStatus, Variant> = {
  delivered: 'success',
  opened:    'info',
  clicked:   'success',
  bounced:   'danger',
};
