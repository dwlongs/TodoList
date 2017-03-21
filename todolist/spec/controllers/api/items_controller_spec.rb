require 'rails_helper'

RSpec.describe Api::ItemsController, type: :controller do
  describe 'put /api/tasks/:task_id.to_s/items/:item_id.to_s/update_status' do
    it 'should update item status doing to done' do
      put :update_status, task_id: task.id.to_s, id: item.id.to_s, status: 'done'
    end
  end

  let(:task) {}
end
