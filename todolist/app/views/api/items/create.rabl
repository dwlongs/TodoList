object @item

attributes :todo, :status, :created_at
node(:id) { |item| item.id.to_s }