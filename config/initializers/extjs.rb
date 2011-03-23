Ext4app::Application.config.action_view.javascript_expansions[:defaults] =
  %w(ext-core ext-all).map do |script|
    version = '4.0-pr5'
    script += '-debug' unless ::Rails.env.production?
    File.join("ext-#{version}", script)
  end + %w(rails)

Ext4app::Application.config.action_view.stylesheet_expansions[:defaults] =
  %w(ext-all).map do |script|
    version = '4.0-pr5'
    File.join("ext-#{version}/resources/css", script)
  end
