FactoryBot.define do
  factory :startup do
    name { "Test Startup" }
    association :location
    association :application
    association :contact
    association :review
  end
end
