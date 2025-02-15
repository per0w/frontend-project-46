install:
	npm ci
gendiff:
	node gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
dev:
	npx nodemon gendiff.js file1.json file2.json