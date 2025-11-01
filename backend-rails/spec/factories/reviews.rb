FactoryBot.define do
  factory :review do
    association :startup
    rating { 4 }
  end
end
