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


# Targets

up: ## Runs all services
	$(docker-up)

up\:build: ## Builds containers then runs it
	$(docker-up) --build 

rm: ## removes containers
	$(rm)


# Node server
node: ## Runs node server in dev mode
	$(run) $(node_server) yarn dev

node\:logs: ## Shows node server logs
	$(logs) $(node_server)

node\:shell: ## Run shell
	$(run) $(node_server) sh

node\:install: ## Add new dependencies
	$(run) $(node_server) yarn add $(args)

node\:install\:dev: ## Add new dev dependencies
	$(run) $(node_server) yarn add -D $(args)

migrate\:create: ## Creates new migration
	$(run) $(node_server) $(migration):create


# DB 
psql: ## Logs into psql
	$(exec) $(postgres) psql -U postgres

db: ## Run postgres
	$(run) $(postgres)

db\:logs: ## Shows postgres logs
	$(logs) $(postgres)
