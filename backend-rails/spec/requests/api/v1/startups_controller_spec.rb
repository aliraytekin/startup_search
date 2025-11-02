require 'rails_helper'

RSpec.describe Api::V1::StartupsController, type: :request do
  def json
    JSON.parse(response.body)
  end

  let!(:startup_paris_fintech) do
    create(
      :startup,
      name: "Alpha Payments",
      location: build(:location, city: "london", region: "western_europe", country: "united_kingdom"),
      application: build(:application, state: "applying", category: "providing_an_experience"),
      contact:     build(:contact, state: "contacted", email_status: "opened"),
      review:      build(:review, rating: 5)
    )
  end

  let!(:startup_berlin_finance) do
    create(
      :startup,
      name: "Beta Finance",
      location: build(:location, city: "dublin", region: "northern_europe", country: "ireland"),
      application: build(:application, state: "successful",  category: "optimisation"),
      contact:     build(:contact, state: "not_contacted", email_status: "delivered"),
      review:      build(:review, rating: 3)
    )
  end

  let!(:startup_paris_saas) do
    create(
      :startup,
      name: "Gamma Cloud",
      location: build(:location, city: "amsterdam", region: "western_europe", country: "netherlands"),
      application: build(:application, state: "shortlisted", category: "providing_an_experience"),
      contact:     build(:contact, state: "contacted", email_status: "bounced"),
      review:      build(:review, rating: 4)
    )
  end

  describe "GET /api/v1/startups" do
    it "return 200 with data and meta" do
      get api_v1_startups_path

      expect(response).to have_http_status(:ok)
      expect(json.keys).to match_array(%w[data meta])
      expect(json["data"]).to be_an(Array)
      expect(json["meta"].keys).to match_array(%w[page per total total_pages])
    end

    it "searches startups by name" do
      get "/api/v1/startups", params: { q: "Beta" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Beta Finance")
    end

    it "returns all startups without filters" do
      get "/api/v1/startups"
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(3)
    end

    it "filters startups by city" do
      get "/api/v1/startups", params: { city: "amsterdam" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Gamma Cloud")
    end

    it "filters startups by region" do
      get api_v1_startups_path, params: { region: "northern_europe" }

      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Beta Finance")
    end

    it "filters startups by country" do
      get api_v1_startups_path, params: { country: "ireland" }

      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Beta Finance")
    end

    it "filters startups by application state" do
      get "/api/v1/startups", params: { app_state: "applying" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Alpha Payments")
    end

    it "filters startups by application categories" do
      get "/api/v1/startups", params: { app_category: "optimisation" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Beta Finance")
    end

    it "filters startups by contact state" do
      get "/api/v1/startups", params: { contact_state: "not_contacted" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Beta Finance")
    end

    it "filters startups by contact email status" do
      get "/api/v1/startups", params: { email_status: "bounced" }
      expect(response).to have_http_status(:ok)
      expect(json["data"].size).to eq(1)
      expect(json["data"].first["name"]).to eq("Gamma Cloud")
    end

    it "filters by rating" do
      get api_v1_startups_path, params: { rating: 5 }
      expect(json["data"].map { |h| h["name"] }).to contain_exactly("Alpha Payments")
    end

    describe "POST /api/v1/startups" do
      let(:valid_payload) do
        {
          name: "Delta Commerce",
          location_attributes: {
            city: "amsterdam",
            region: "western_europe",
            country: "netherlands"
          },
          application_attributes: {
            state: "successful",
            category: "optimisation"
          },
          contact_attributes: {
            state: "not_contacted",
            email_status: "delivered"
          },
          review_attributes: {
            rating: 4
          }
        }
      end

      it "creates a startup with nested attributes" do
        expect {
          post api_v1_startups_path, params: valid_payload, as: :json
        }.to change { Startup.count }.by(1)
        .and change { Location.count }.by(1)
        .and change { Application.count }.by(1)
        .and change { Contact.count }.by(1)
        .and change { Review.count }.by(1)

        expect(response).to have_http_status(:created)
        body = json
        expect(body["name"]).to eq("Delta Commerce")
      end

      it "returns 422 and errors when invalid" do
        invalid = valid_payload.deep_dup
        invalid[:location_attributes][:city] = "paris"
        post api_v1_startups_path, params: invalid, as: :json

        expect(response.status).to eq(422)
        expect(json["errors"]).to be_present
      end
    end
  end
end
