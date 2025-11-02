require 'rails_helper'

RSpec.describe Startup, type: :model do
  before(:all) do
    ActiveRecord::Base.connection.execute("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
  end

  describe "associations" do
    it { should have_one(:location).dependent(:destroy) }
    it { should have_one(:application).dependent(:destroy) }
    it { should have_one(:contact).dependent(:destroy) }
    it { should have_one(:review).dependent(:destroy) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
  end

  describe "nested attributes" do
    it { should accept_nested_attributes_for(:location) }
    it { should accept_nested_attributes_for(:application) }
    it { should accept_nested_attributes_for(:contact) }
    it { should accept_nested_attributes_for(:review) }
  end

  describe "pg_search" do

    let!(:s1) do
      create(
        :startup,
        name: "Omega Corp",
        location:  build(:location, city: "london", region: "northern_europe", country: "united_kingdom"),
        application: build(:application, state: "applying", category: "optimisation"),
        contact: build(:contact, state: "not_contacted", email_status: "delivered"),
        review: build(:review, rating: 4)
      )
    end

    let!(:s2) do
      create(
        :startup,
        name: "Alpha Association",
        location: build(:location, city: "london", region: "northern_europe", country: "united_kingdom"),
        application: build(:application, state: "invited_to_apply", category: "attention_on_the_consumer"),
        contact: build(:contact, state: "contacted", email_status: "opened"),
        review: build(:review, rating: 3)
      )
    end

    let!(:s3) do
      create(
        :startup,
        name: "Beta Corporation",
        location: build(:location, city: "amsterdam", region: "western_europe", country: "france"),
        application: build(:application, state: "application_finalised", category: "attention_on_the_consumer"),
        contact: build(:contact, state: "contacted", email_status: "bounced"),
        review: build(:review, rating: 3)
      )
    end

    it "searches by name (t-search prefix: true)" do
      results = Startup.search_text("Corp")
      expect(results).to include(s1, s3)
      expect(results).to_not include(s2)
    end

    it "is case-sensitive" do
      results = Startup.search_text("corp")
      expect(results).to include(s1, s3)
      expect(results).to_not include(s2)
    end

    it "works with associated fields (city)" do
      results = Startup.search_text("amsterdam")
      expect(results).to include(s3)
      expect(results).to_not include(s1, s2)
    end

    it "works with associated fields (application.state)" do
      results = Startup.search_text("application_finalised")
      expect(results).to include(s3)
      expect(results).to_not include(s1, s2)
    end

    it "works with associated fields (contact.email_status)" do
      results = Startup.search_text("opened")
      expect(results).to include(s2)
      expect(results).to_not include(s1, s3)
    end

    it "finds close misspellings via trigram" do
      results = Startup.search_text("Alpha Ascociation")
      expect(results).to include(s2)
      expect(results).to_not include(s1, s3)
    end
  end
end
