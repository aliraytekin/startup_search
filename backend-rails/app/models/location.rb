class Location < ApplicationRecord
  belongs_to :startup
  geocoded_by :address
  after_validation :geocode, if: :should_geocode?

  CITIES = %w[no_city_set london new_york liverpool tel_aviv genova birmingham amsterdam dublin].freeze
  REGIONS = %w[no_region_set northern_america northern_europe western_europe northern_europe southern_europe southern_asia western_asia australia_and_new_zealand south_eastern_asia south_america].freeze
  COUNTRIES = %w[no_country_set united_kingdom united_states india netherlands france canada israel italy germany ireland].freeze

  validates :city, presence: true, inclusion: { in: CITIES }
  validates :region, presence: true, inclusion: { in: REGIONS }
  validates :country, presence: true, inclusion: { in: COUNTRIES }

  private

  def should_geocode?
    will_save_change_to_city? || will_save_change_to_region? || will_save_change_to_country?
  end

  def address
    parts = [city, country].compact.map { |v| v.to_s.tr("_", " ") }
    parts.join(", ")
  end
end
