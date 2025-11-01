FactoryBot.define do
  factory :location do
    association :startup
    city { "London" }
    region { "Northern Europe" }
    country { "United Kingdom" }
  end
end
