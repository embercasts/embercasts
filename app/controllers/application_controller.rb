class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @embercasts = YAML.load_file(Rails.root.join('config', 'embercasts.yml'))
    render :text => "", :layout => "application"
  end
end
