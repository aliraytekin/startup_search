require 'rails_helper'

RSpec.describe Application, type: :model do
  describe "associations" do
    it { should belong_to(:startup) }
  end

  describe "validations" do
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:category) }

    it { should validate_inclusion_of(:state).in_array(Application::STATES) }
    it { should validate_inclusion_of(:category).in_array(Application::CATEGORIES) }
  end

  describe "constants" do
    it "defines non-empty arrays" do
      expect(Application::STATES).to be_present
      expect(Application::CATEGORIES).to be_present
    end

    it "should be frozen" do
      expect(Application::STATES).to be_frozen
      expect(Application::CATEGORIES).to be_frozen
    end
  end
end
