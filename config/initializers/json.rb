require 'active_support/json/decoding'
ActiveSupport.parse_json_times = true
ActiveSupport::JSON.backend = 'JSONGem'
