class Embercast < OpenStruct
  def self.all
    @embercasts = YAML.load_file(Rails.root.join('config', 'embercasts.yml')).map do |data|
      Embercast.new data
    end.reverse
  end

  def slug
    @slug ||= title.parameterize
  end

  def description_html
    @description_html ||= RDiscount.new(description).to_html.html_safe
  end

  def description_text
    @description_text ||= Nokogiri::HTML(description_html).text
  end

  def published_at
    @published_at ||= DateTime.parse date
  end

  def as_json(options)
    @table.as_json(options).merge({
      slug: slug,
      published_at: published_at,
    })
  end
end
