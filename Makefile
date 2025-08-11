.DEFAULT_GOAL := start

# Current user ID and group ID.
export UID=$(shell id -u)
export GID=$(shell id -g)

start: deps up

deps:
	mkdir -p node_modules
	docker run --rm \
		-v ${PWD}:/app \
		-w /app \
		-u "$(UID):$(GID)" \
		--network="host" \
		node:24.3.0-slim \
		npm install --no-save

up:
	docker compose up -d --remove-orphans