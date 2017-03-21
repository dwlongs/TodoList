collection @items

attributes :todo, :status, :updated_at
node(:id) { |item| item.id.to_s }