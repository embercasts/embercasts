module ApplicationHelper
  def embercast_json
    content_tag :script, type: 'text/x-embercasts' do
      @embercasts.to_json.html_safe
    end
  end

  def embercast_seo
    content_tag :noscript do
      render '/embercast_seo'
    end
  end
end
