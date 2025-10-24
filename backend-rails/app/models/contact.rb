class Contact < ApplicationRecord
  belongs_to :startup

  STATES = %w[not_contacted contacted call_scheduled responded follow_up].freeze
  EMAIL_STATUS = %w[delivered bounced opened clicked].freeze

  validates :state, presence: true, inclusion: { in: STATES }
  validates :email_status, presence: true, inclusion: { in: EMAIL_STATUS }
end
