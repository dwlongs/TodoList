class Item
  include Mongoid::Document
  include Mongoid::Timestamps
  field :todo, type: String
  field :status, type: String

  belongs_to :task
end
