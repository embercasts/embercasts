Embercasts::Application.routes.draw do
  root :to => 'application#index'

  match "episodes/:slug" => "application#index", as: "embercast"

  match "/*path" => "application#index"
end
