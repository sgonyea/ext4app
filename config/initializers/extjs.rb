Ext4app::Application.config.action_view.javascript_expansions[:defaults] =
  %w(ext-all).map do |script|
    version = '4.0-beta2'
    script += '-debug' unless ::Rails.env.production?
    File.join("ext-#{version}", script)
  end + %w(rails)

Ext4app::Application.config.action_view.stylesheet_expansions[:defaults] =
  %w(ext-all).map do |script|
    version = '4.0-beta2'
    File.join("ext-#{version}/resources/css", script)
  end
