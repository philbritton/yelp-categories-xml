#!/usr/bin/ruby

require 'pp'
require 'rubygems'
require 'json'

# http://rubular.com/r/8TDshX9TUW
file = File.new("raw", "r")

parent_0 = {
  :children => []
}
while (line = file.gets)
  regexp = /([0-9]*\.)([0-9]*\.)?([0-9]*\.)?\s*(.*)\((\w*)/
  matches = line.match(regexp)
  par0 = matches[1]
  par1 = matches[2]
  par2 = matches[3]
  title = matches[4].strip
  tag = matches[5]
  level = 0
  level += 1 if par0
  level += 1 if par1
  level += 1 if par2

  # Set parent level
  me = {
    :alias => tag,
    :title => title,
    :children => []
  }
  # Add to data structure
  if level == 1
    parent_0[:children] << me
    parent_1 = me
  elsif level == 2
    parent_1[:children] << me
    parent_2 = me
  elsif level == 3
    parent_2[:children] << me
    parent_3 = me
  end
end
file.close

puts parent_0.to_json
