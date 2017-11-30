zip: lint
	cd addon; zip ../ytf.zip *

lint:
	ls addon/*.js | grep -v jquery | xargs jshint
	! grep 'browser\.' addon/*.js
	# grep '"use strict";' addon/*.js > /dev/null checked by jshint
	python -m json.tool addon/manifest.json > /dev/null
	python -m json.tool addon/schema.json > /dev/null
	tidy -eq addon/blockpage.html

