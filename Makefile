.DEFAULT_GOAL := help

CYAN := \033[36m
NO_COLOR := \033[0m
SPACING := -20s

help:
	@echo
	@echo "Tips:"
	@echo "${CYAN}.e (exec) ${NO_COLOR}- allows you to run a one-off commands w/o turning off the server using docker-compose exec"
	@echo "${CYAN}./run.sh cmd <container-name> <commands> ${NO_COLOR} - Use when you need to run commands w/ multiple args or flags (uses docker-compose exec)"
	@echo "Makefile targets:"
	@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' | awk 'BEGIN {FS = ": .*?## "}; {printf "${CYAN}  %${SPACING}${NO_COLOR} %s\n", $$1, $$2}'
	@echo

# For script permission
$(shell chmod +x ./run.sh)

# Variables 
TAIL ?= all
ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Commands
exec := docker-compose exec
run := ./run.sh run
run.no_service_ports := docker-compose run --rm
logs := docker-compose logs --tail=$(TAIL)
docker.up := ./run.sh up
migration := yarn run mikro-orm
yarn.add := yarn add $(ARGS)
yarn.add.dev := yarn add -D $(ARGS)
yarn.remove := yarn remove $(ARGS)
yarn.remove.dev := yarn remove $(ARGS)
yarn.prettier.check := yarn prettier:check
yarn.prettier.fix := yarn prettier:fix
yarn.lint.check := yarn lint:check
yarn.lint.fix := yarn lint:fix
yarn.audit := yarn audit
yarn.update := yarn upgrade-interactive --latest
yarn.clean := yarn run clean
yarn.gen := yarn gen

# Services
node_server := server
next_app := web
postgres := postgres

# aliases
node := $(run) $(node_server)
node.exec := $(exec) $(node_server)
db := $(run.no_service_ports) $(postgres)
db.exec := $(exec) $(postgres)
next := $(run) $(next_app)
next.exec := $(exec) $(next_app)

# Targets
up: node.yarn next.yarn ## Runs all services
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
node.sh: ## Run shell
	$(node) sh
node.add: ## Add new dependencies
	$(node) $(yarn.add)
node.add.dev: ## Add new dev dependencies
	$(node) $(yarn.add.dev)
node.remove: ## Remove dependencies
	$(node) $(yarn.remove)
node.remove.dev: ## Remove dev dependencies
	$(node) $(yarn.remove.dev)
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
migrate.sync: ## Runs schema syncronization
	$(node) $(migration) schema:update --run --dump

## Node exec commands
node.sh.e: ## Runs shell
	$(node.exec) sh
node.add.e: ## Add new dependencies
	$(node.exec) $(yarn.add)
node.add.dev.e: ## Add new dev dependencies
	$(node.exec) $(yarn.add.dev)
node.prettier.e: ## Checks for formatting errors
	$(node.exec) $(yarn.prettier.check)
node.prettier.fix.e: ## Fixes formatting errors
	$(node.exec) $(yarn.prettier.fix)
node.lint.e: ## Check for eslint errors
	$(node.exec) $(yarn.lint.check)
node.lint.fix.e: ## Fixes eslint errors
	$(node.exec) $(yarn.lint.fix)
node.audit.e: ## Checks for known security issues with installed packages
	$(node.exec) $(yarn.audit)

# Next js app
next.dev: ## Start next js 
	$(next) yarn dev
next.yarn: ## Install packages
	$(next) yarn
next.logs: ## Shows node server logs
	$(logs) $(next_app)
next.shell: ## Run shell
	$(next) sh
next.add: ## Add new dependencies
	$(next) $(yarn.add)
next.add.dev: ## Add new dev dependencies
	$(next) $(yarn.add.dev)
next.prettier: ## Checks for formatting errors
	$(next) $(yarn.prettier.check)
next.prettier.fix: ## Fixes formatting errors
	$(next) $(yarn.prettier.fix)
next.lint: ## Check for eslint errors
	$(next) $(yarn.lint.check)
next.lint.fix: ## Fixes eslint errors
	$(next) $(yarn.lint.fix)
next.audit: ## Checks for known security issues with installed packages
	$(next) $(yarn.audit)
next.update: ## Upgrade packages interactively
	$(next) $(yarn.update)
next.gen: ## Generates graphql types and operations
	$(next) $(yarn.gen)

# Next js exec commands
next.shell.e: ## Run shell
	$(next.exec) sh
next.add.e: ## Add new dependencies
	$(next.exec) $(yarn.add)
next.add.dev.e: ## Add new dev dependencies
	$(next.exec) $(yarn.add.dev)
next.prettier.e: ## Checks for formatting errors
	$(next.exec) $(yarn.prettier.check)
next.prettier.fix.e: ## Fixes formatting errors
	$(next.exec) $(yarn.prettier.fix)
next.lint.e: ## Check for eslint errors
	$(next.exec) $(yarn.lint.check)
next.lint.fix.e: ## Fixes eslint errors
	$(next.exec) $(yarn.lint.fix)
next.audit.e: ## Checks for known security issues with installed packages
	$(next.exec) $(yarn.audit)
next.update.e: ## Upgrade packages interactively
	$(next.exec) $(yarn.update)
next.gen.e: ## Generates graphql types and operations
	$(next.exec) $(yarn.gen)

# DB 
db.psql.e: ## Logs into psql using docker exec
	$(db.exec) psql -U postgres
db.psql: ## Logs into psql using docker run
	$(db) psql -U postgres
db.logs: ## Shows postgres logs
	$(logs) $(postgres)
db.createdb: ## Create new database
	$(db) createdb $(ARGS)
db.createdb.e: ## Create new database using docker exec
	$(db.exec) createdb $(ARGS)
