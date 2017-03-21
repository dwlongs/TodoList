collection @tasks

attributes :title, :description, :updated_at
node(:id) { |task| task.id.to_s }