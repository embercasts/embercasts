Embercasts::Application.routes.draw do
  root :to => 'application#index'

  match "/*path" => "application#index"
end
