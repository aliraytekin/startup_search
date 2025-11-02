require "rails_helper"

RSpec.describe Contact, type: :model do
  describe "associations" do
    it { should belong_to(:startup) }
  end

  describe "validations" do
    it { should validate_presence_of(:state) }
    it { should validate_presence_of(:email_status) }

    it { should validate_inclusion_of(:state).in_array(Contact::STATES) }
    it { should validate_inclusion_of(:email_status).in_array(Contact::EMAIL_STATUS) }
  end

  describe "constants" do
    it "has non-empty constant arrays" do
      expect(Contact::STATES).to be_present
      expect(Contact::EMAIL_STATUS).to be_present
    end

    it "constants are frozen" do
      expect(Contact::STATES).to be_frozen
      expect(Contact::EMAIL_STATUS).to be_frozen
    end

    it "includes expected default values" do
      expect(Contact::STATES).to include("not_contacted", "contacted")
      expect(Contact::EMAIL_STATUS).to include("delivered", "bounced", "opened", "clicked")
    end
  end
end
