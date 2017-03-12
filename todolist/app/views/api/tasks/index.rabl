collection @tasks

attributes :title, :description
node(:id) { |task| task.id.to_s }