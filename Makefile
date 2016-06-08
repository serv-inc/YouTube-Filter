USER=$(shell cat local/moz_uid)
PASS=$(shell cat local/moz_pass)

sign: clean
	jpm -v sign --api-key $(USER) --api-secret $(PASS)

clean:
	rm install.rdf bootstrap.js *xpi 2>/dev/null || true
