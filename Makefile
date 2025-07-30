.DEFAULT_GOAL := start

# Current user ID and group ID.
export UID=$(shell id -u)
export GID=$(shell id -g)

start: up ide

up:
	docker compose up -d --remove-orphans

ide:
	mkdir -p node_modules
	npm i --ignore-scripts --no-save

