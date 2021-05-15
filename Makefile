help:
	@echo
	@echo "Makefile targets:"
	@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' | awk 'BEGIN {FS = ": .*?## "}; {printf "\033[36m  %-20s\033[0m %s\n", $$1, $$2}'
	@echo

# Variables 
tail ?= all
args := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Commands
exec := docker-compose exec
rm := docker-compose rm -fs
run := docker-compose run
logs := docker-compose logs --tail=$(tail)
docker-up := docker-compose up
migration := yarn run mikro-orm migration

# Services
node_server := web
postgres := postgres

# aliases
node := $(run) $(node_server)

# Targets

up: node\:yarn ## Runs all services
	$(docker-up)

up\:build: ## Builds containers then runs it
	$(docker-up) --build 

rm: ## removes containers
	$(rm)


# Node server
node\:dev: ## Runs node server in dev mode
	$(node) yarn dev

node\:yarn: ## Install packages
	$(node) yarn

node\:logs: ## Shows node server logs
	$(logs) $(node_server)

node\:shell: ## Run shell
	$(node) sh

node\:i: ## Add new dependencies
	$(node) yarn add $(args)

node\:i\:dev: ## Add new dev dependencies
	$(node) yarn add -D $(args)

migrate\:create: ## Creates new migration
	$(node) $(migration):create


# DB 
psql: ## Logs into psql
	$(exec) $(postgres) psql -U postgres

db: ## Run postgres
	$(run) $(postgres)

db\:logs: ## Shows postgres logs
	$(logs) $(postgres)
