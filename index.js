"use strict";

var _ = require('underscore')
var input = require('./categories.json')

/* Example output:
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
	<dict>
		<key>name</key>
		<string>Type 1</string>
		<key>sub_types</key>
		<array>
			<dict>
				<key>name</key>
				<string>Type 1.1</string>
			</dict>
			<dict>
				<key>name</key>
				<string>Type 1.2</string>
				<key>sub_types</key>
				<array>
					<dict>
						<key>name</key>
						<string>Type 1.2.1</string>
					</dict>
				</array>
			</dict>
		</array>
	</dict>
	<dict>
		<key>name</key>
		<string>Type 2</string>
	</dict>
</array>
</plist>
*/

var XML_CHAR_MAP = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;'
}

function escapeXML(s) {
  return s.replace(/[<>&"']/g, function (ch) {
    return XML_CHAR_MAP[ch];
  })
}

// Every json category object is formatted like this:
//   category : { alias: 'active', title: 'Active Life', category: [typeof category] }

var print_category = function(category) {
  var tbr = ''
  tbr = tbr + '<dict>'
  tbr = tbr + '  <key>name</key>'
  tbr = tbr + '  <string>' + escapeXML(category.title) + '</string>'
  if (category.category.length > 0) {
    tbr = tbr + '  <key>sub_types</key>'
    tbr = tbr + '  <array>'
    _.each(category.category, function(subcategory) {
      tbr = tbr + print_category(subcategory)
    })
    tbr = tbr + '  </array>'
  }
  tbr = tbr + '</dict>'
  return tbr
}

var output = ''
output = output + '<?xml version="1.0" encoding="UTF-8"?>'
output = output + '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
output = output + '<plist version="1.0">'
output = output + '<array>'
_.each(input, function(category) {
  output = output + print_category(category)
})
output = output + '</array></plist>'

console.log(output)



