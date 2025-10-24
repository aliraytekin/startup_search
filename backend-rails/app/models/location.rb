class Location < ApplicationRecord
  belongs_to :startup

  CITIES = %w[no_city_set london new_york liverpool tel aviv genova birmingham amsterdam dublin].freeze
  REGIONS = %w[no_country northern_europe western_europe northern_europe southern_europe southern_asia western_asia australia_and_new_zealand south_eastern_asia south_america].freeze
  COUNTRIES = %w[no_country united_kingdom united_states india netherlands france canada israel italy germany].freeze

  validates :city, presence: true, inclusion: { in: CITIES }
  validates :region, presence: true, inclusion: { in: REGIONS }
  validates :country, presence: true, inclusion: { in: COUNTRIES }
end
