object @task

attributes :title, :description, :create_at
node(:id) { |task| task.id.to_s }