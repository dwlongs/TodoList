object @task

attributes :title, :description, :created_at
node(:id) { |task| task.id.to_s }