class Application < ApplicationRecord
  belongs_to :startup

  STATES = %w[added_to_programme not_suitable invited_to_apply applying application_finalised shortlisted not_shortlisted invited_to_pitch_day not_invited_to_pitch_day successful not_successful not_interested interested referred].freeze
  CATEGORIES = %w[optimisation providing_an_experience attention_on_the_consumer ui_ux no_category].freeze

  validates :state, presence: true, inclusion: { in: STATES }
  validates :category, presence: true, inclusion: { in: CATEGORIES }
end
