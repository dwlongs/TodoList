Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'todolist#index'
  namespace :api do
    resources :tasks, only: [:index]
  end
end
