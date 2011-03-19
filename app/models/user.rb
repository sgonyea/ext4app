class User < ActiveRecord::Base
  validates :name, presence: true
  validates :age, numericality: { only_integer: true, greature_or_equal_to: 0 }
end
