Rails.application.routes.draw do
  root to: 'posts#index'

  devise_for :users
  resources :posts

  scope '/graphql' do
    post "/", to: "graphql#create"
  end

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
