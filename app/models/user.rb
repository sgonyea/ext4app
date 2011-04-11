class User < ActiveRecord::Base
  validates :name, presence: true
  validates :age, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  has_many :topics
  has_many :messages
end
