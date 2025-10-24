class Startup < ApplicationRecord
  has_one :location, dependent: :destroy
  has_one :application, dependent: :destroy
  has_one :contact, dependent: :destroy
  has_one :review, dependent: :destroy

  validates :name, presence: true

  accepts_nested_attributes_for :location
  accepts_nested_attributes_for :application, allow_destroy: true
  accepts_nested_attributes_for :contact, allow_destroy: true
  accepts_nested_attributes_for :review, allow_destroy: true

  include PgSearch::Model
  pg_search_scope :search_text,
    against: [:name],
    associated_against: {
      location: [:city, :region, :country],
      application: [:state, :category],
      contact: [:state, :email_status]
    },
    using: {
      tsearch: { prefix: true },
      trigram: {}
    }

  scope :in_country, ->(country) { joins(:location).where(locations: { country: country }).distinct }
  scope :in_region, ->(region) { joins(:location).where(locations: { region:  region }).distinct }
  scope :in_city, ->(city) { joins(:location).where(locations: { city: city }).distinct }

  scope :with_app_state, ->(s) { joins(:application).where(applications: { state: s }).distinct }
  scope :with_app_category, ->(c) { joins(:application).where(applications: { category: c }).distinct }

  scope :with_contact_state, ->(s) { joins(:contact).where(contacts: { state: s }).distinct }
  scope :with_contact_email_status, ->(s) { joins(:contact).where(contacts: { email_status: s }).distinct }

  scope :with_ratings, ->(r) { joins(:review).where(reviews: { rating: r }).distinct }
end
