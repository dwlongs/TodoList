Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'todo_list#index'
  namespace :api do
    resources :tasks, only: [:index, :create] do
      resources :items, only: [:index, :create] do
        put 'update_status', on: :member, action: :update_status
      end
    end
  end
end
