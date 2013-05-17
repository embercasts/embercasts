class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @embercasts = Embercast.all
    render :text => "", :layout => "application"
  end
end
