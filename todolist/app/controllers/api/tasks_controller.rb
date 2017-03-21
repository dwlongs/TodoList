class Api::TasksController < ApiController
  def index
    @tasks = Task.all.map do |task|
      task
    end
    render status: :ok
  end

  def create
    valid?(@task = Task.create(title: params[:title].to_s, description: ''))
    render status: :ok
  end

  def destroy
    @task = Task.find_by(id: params[:id])
    @task.destroy
    render status: :ok
  end
end