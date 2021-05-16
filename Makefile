help:
	@echo
	@echo "Makefile targets:"
	@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' | awk 'BEGIN {FS = ": .*?## "}; {printf "\033[36m  %-20s\033[0m %s\n", $$1, $$2}'
	@echo

# For script permission
$(shell chmod +x ./run.sh)

# Variables 
TAIL ?= all
ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Commands
exec := docker-compose exec
run := @./run.sh run
logs := docker-compose logs --tail=$(TAIL)
docker.up := @./run.sh up
migration := yarn run mikro-orm migration
yarn.install := yarn add $(ARGS)
yarn.install.dev := yarn add -D $(ARGS)
yarn.prettier.check := yarn prettier:check
yarn.prettier.fix := yarn prettier:fix
yarn.lint.check := yarn lint:check
yarn.lint.fix := yarn lint:fix

# Services
node_server := web
postgres := postgres

# aliases
node := $(run) $(node_server)

# Targets

up: node.yarn migrate.create ## Runs all services
	$(docker.up)

up.build: ## Builds containers then runs it
	$(docker.up) --build 

# Node server
node.dev: node.yarn migrate.create ## Runs node server in dev mode
	$(node) yarn dev

node.yarn: ## Install packages
	$(node) yarn

node.logs: ## Shows node server logs
	$(logs) $(node_server)

node.shell: ## Run shell
	$(node) sh

node.install: ## Add new dependencies
	$(node) $(yarn.install)

node.install.dev: ## Add new dev dependencies
	$(node) $(yarn.install.dev)

node.prettier: ## Checks for formatting errors
	$(node) $(yarn.prettier.check)

node.prettier.fix: ## Fixes formatting errors
	$(node) $(yarn.prettier.fix)

node.lint: ## Check for eslint errors
	$(node) $(yarn.lint.check)

node.lint.fix: ## Fixes eslint errors
	$(node) $(yarn.lint.fix)

migrate.create: ## Creates new migration
	$(node) $(migration):create


# DB 
psql: ## Logs into psql
	$(exec) $(postgres) psql -U postgres

db: ## Run postgres
	$(run) $(postgres)

db.logs: ## Shows postgres logs
	$(logs) $(postgres)
