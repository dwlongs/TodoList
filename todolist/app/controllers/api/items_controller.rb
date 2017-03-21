class Api::ItemsController < ApiController
  def index
    @items = Task.includes(:items).find_by(id: params[:task_id].to_s).items
  end

  def create
    found?(@task = Task.find_by(id: params[:task_id].to_s)) do
      valid?(@item = Item.create(task: @task, todo: params[:todo], status: "doing"))
    end
  end

  def update
    found? (@item = Item.find_by(id: params[:id].to_s)) do
      if @item.update(item_params)
        @item
      else
        render status: :bad_request
      end
    end
  end

  def update_status
    found?(@item = Item.find_by(id: params[:id].to_s)) do
      @item.update_attributes(status_params)
    end
  end

  def destroy
    found?(@item = Item.find_by(id: params[:id].to_s)) do
      @item.destroy
      render status: :ok
    end
  end

  private
  def item_params
    params.require(:item).permit(:todo)
  end

  def status_params
    params.require(:item).permit(:status)
  end
end
