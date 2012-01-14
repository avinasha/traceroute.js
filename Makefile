minify:
	uglifyjs -o traceroute.min.js traceroute.js

clean:
	rm traceroute.min.js

hint:
	jshint traceroute.js
