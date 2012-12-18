#!/usr/bin/ruby

require 'pp'
require 'rubygems'
require 'json'

# http://rubular.com/r/8TDshX9TUW
file = File.new("raw.txt", "r")

root = []
count = 0
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
    :children => [],
    :ENG => {
      :display => title,
      :aliases => []
    },
    :ZHT => {
      :display => "",
      :aliases => []
    },
  }
  # Add to data structure
  if level == 1
    me[:id] = "category::#{tag}"
    root << me
    parent_1 = me
  elsif level == 2
    me[:id] = parent_1[:id] + "::#{tag}"
    parent_1[:children] << me
    parent_2 = me
  elsif level == 3
    me[:id] = parent_1[:id] + "::#{tag}"
    parent_2[:children] << me
    parent_3 = me
  end
  count = count+1
end
file.close

puts root.to_json
puts count
