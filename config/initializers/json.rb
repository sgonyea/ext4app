# encoding: -*- UTF-8 -*-
require 'active_support/json/decoding'
ActiveSupport::JSON.backend = 'JSONGem'
ActiveSupport.parse_json_times = false
