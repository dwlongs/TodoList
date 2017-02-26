require_relative 'boot'

require 'rails/all'

env_vars = YAML.load_file('config/env')
ENV['ENV_NAME'] = env_vars['environment_name']
ENV['RAILS_ENV'] ||= env_vars['rails_env']

env = ENV['ENV_NAME'].presence || 'development'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

TODOLIST_CONFIG = File.exist?('/etc/todolist/config.yml') ? YAML.load_file('/etc/todolist/config.yml') : YAML.load_file('config/config.yml')

module Todolist
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
