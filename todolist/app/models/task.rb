class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :description, type: String

  has_many :items
end
