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
run := ./run.sh run
logs := docker-compose logs --tail=$(TAIL)
docker.up := ./run.sh up
migration := yarn run mikro-orm
yarn.install := yarn add $(ARGS)
yarn.install.dev := yarn add -D $(ARGS)
yarn.prettier.check := yarn prettier:check
yarn.prettier.fix := yarn prettier:fix
yarn.lint.check := yarn lint:check
yarn.lint.fix := yarn lint:fix
yarn.audit := yarn audit
yarn.update := yarn upgrade-interactive --latest
yarn.clean := yarn run clean

# Services
node_server := web
postgres := postgres

# aliases
node := $(run) $(node_server)
db := $(run) $(postgres)

# Targets

up: node.yarn migrate.create ## Runs all services
	$(docker.up)

up.build: ## Builds containers then runs it
	$(docker.up) --build 

cmd: ## Run commands on a running container using bash
	@echo "Run ./run.sh cmd <container-name> <commands>"


# Node server
dev: node.yarn migrate.create ## Runs node server in dev mode
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

node.audit: ## Checks for known security issues with installed packages
	$(node) $(yarn.audit)

node.update: ## Upgrade packages interactively
	$(node) $(yarn.update)

node.clean: ## Clean dist directory
	$(node) $(yarn.clean)

migrate.create: ## Creates new migration
	$(node) $(migration) migration:create

migrate.reset: ## Reset db
	$(node) $(migration) migration:down --to 0

migrate.drop: ## Drop schema
	$(node) $(migration) schema:drop --drop-db --dump --drop-migrations-table
	

# DB 
psql: ## Logs into psql using docker exec
	$(exec) $(postgres) psql -U postgres

db.cmd: ## Run 

db.psql: ## Logs into psql using docker run
	$(db) psql -U postgres
	
db.logs: ## Shows postgres logs
	$(logs) $(postgres)
