class Api::TasksController < ApiController
  def index
    render json: Task.all
  end
end