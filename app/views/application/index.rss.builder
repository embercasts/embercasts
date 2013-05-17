xml.instruct! :xml, :version => "1.0" 
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Embercasts"
    xml.description "Two seasoned Ember developers, including one member of the Ember core team, guide you through a variety of techniques for building out JavaScript applications using the ambitious web application framework Ember.js through this weekly-updated series of screencasts."
    xml.link "http://www.embercasts.com"
    xml.tag! "itunes:author", "Erik Bryn and Alex Matchneer"
    xml.tag! "itunes:keywords", "ember, ember.js, screencasts, podcasts, tips, tricks, tutorials, training, programming, javascript, mvc, embercast"
    xml.tag! "itunes:explicit", "clean"
    xml.tag! "itunes:image", href: "http://www.embercasts.com/assets/itunes-cover-logo.jpg"

    xml.tag!("itunes:owner") do
      xml.tag! "itunes:name", "Embercasts"
      xml.tag! "itunes:email", "embercasts@embercasts.com"
    end

    xml.tag! "itunes:block", "no"

    xml.tag! "itunes:category", text: "Technology" do
      xml.tag! "itunes:category", text: "Software How-To"
    end
    xml.tag! "itunes:category", text: "Education" do
      xml.tag! "itunes:category", text: "Training"
    end

    for cast in @embercasts
      xml.item do
        xml.title cast.title
        xml.description cast.description_text
        xml.pubDate cast.published_at.rfc822
        xml.enclosure url: cast.mp4_url, length: cast.mp4_size, type: "video/mp4"
        xml.link embercast_url(slug: cast.slug, host: "www.embercasts.com")
        xml.guid cast.slug, isPermaLink: false
        xml.tag! "itunes:author", "Erik Bryn and Alex Matchneer"
        xml.tag! "itunes:subtitle", cast.description_text.truncate(150)
        xml.tag! "itunes:summary",  cast.description_text
        xml.tag! "itunes:explicit", "no"
        xml.tag! "itunes:duration", cast.time
      end
    end
  end
end
