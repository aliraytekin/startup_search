FactoryBot.define do
  factory :application do
    association :startup
    state { "applying" }
    category { "optimisation" }
  end
end
