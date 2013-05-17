class Embercast < OpenStruct
  def self.all
    @embercasts = YAML.load_file(Rails.root.join('config', 'embercasts.yml')).map do |data|
      Embercast.new data
    end
  end

  def slug
    title.parameterize
  end

  def as_json(options)
    @table.as_json(options).merge({
      slug: slug
    })
  end
end
