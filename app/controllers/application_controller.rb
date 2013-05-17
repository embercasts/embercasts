class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @embercasts = Embercast.all

    respond_to do |format|
      format.html { render :text => "", :layout => "application" }
      format.rss { render :layout => false }
    end
  end
end
