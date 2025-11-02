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
      trigram: { threshold: 0.1 }
    }

  scope :in_country, ->(country) { where(locations: { country: country }) }
  scope :in_region, ->(region) { where(locations: { region:  region }) }
  scope :in_city, ->(city) { where(locations: { city: city }) }

  scope :with_app_state, ->(s) { where(applications: { state: s }) }
  scope :with_app_category, ->(c) { where(applications: { category: c }) }

  scope :with_contact_state, ->(s) { where(contacts: { state: s }) }
  scope :with_contact_email_status, ->(s) { where(contacts: { email_status: s }) }

  scope :with_rating, ->(r) { where(reviews: { rating: r }) }
end
