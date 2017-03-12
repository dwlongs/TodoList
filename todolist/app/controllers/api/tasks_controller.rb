class Api::TasksController < ApiController
  def index
    @tasks = Task.all.map do |task|
      task
    end
    render status: :ok
  end

  def create
    valid?(@task = Task.create(title: params[:title].to_s, description: ''))
  end
end