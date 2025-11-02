require 'rails_helper'

RSpec.describe Location, type: :model do
  describe "associations" do
    it { should belong_to(:startup) }
  end

  describe "validations" do
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:region) }
    it { should validate_presence_of(:country) }

    it { should validate_inclusion_of(:city).in_array(Location::CITIES) }
    it { should validate_inclusion_of(:region).in_array(Location::REGIONS) }
    it { should validate_inclusion_of(:country).in_array(Location::COUNTRIES) }
  end

  describe "constants" do
    it "defines non-empty arrays" do
      expect(Location::CITIES).to be_present
      expect(Location::REGIONS).to be_present
      expect(Location::COUNTRIES).to be_present
    end

    it "includes defaults in constants" do
      expect(Location::CITIES).to include("no_city_set")
      expect(Location::REGIONS).to include("no_region_set")
      expect(Location::COUNTRIES).to include("no_country_set")
    end

    it "constants are frozen" do
      expect(Location::CITIES).to be_frozen
      expect(Location::REGIONS).to be_frozen
      expect(Location::COUNTRIES).to be_frozen
    end
  end


end
