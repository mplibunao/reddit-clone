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
	#@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' 
	@grep -E '^[a-zA-Z_-].*?: .*?## .*$$' Makefile | sed 's#\\:#:#g' | awk 'BEGIN {FS = ": .*?## "}; {printf "${CYAN}  %${SPACING}${NO_COLOR} %s\n", $$1, $$2}'
	@echo

# For script permission
$(shell chmod +x ./run.sh)

# Variables 
TAIL ?= all
ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Docker commands
exec := docker-compose exec
run := ./run.sh run
logs := docker-compose logs --tail=$(TAIL)
docker.up := ./run.sh up

# aliases
api := $(run) api
api.exec := $(exec) api
db := $(run) postgres
db.exec := $(exec) postgres
web := $(run) web
web.exec := $(exec) web

# Targets
setup: api.yarn web.yarn ## Initial setup
	./run.sh up --build
	
up: ## Runs all services
	$(docker.up)
up.build: ## Builds containers then runs it
	$(docker.up) --build 

# API
gen.env.types: ## Generates .env.example and types for env
	npx gen-env-types .env -o server/src/env.d.ts -e .
api.logs: ## Shows node server logs
	$(logs) $(api)
api.sh: ## Run shell
	$(api) sh
api.sh.exec: ## Runs shell inside running container
	$(api.exec) sh
#api.yarn: ## Installs node dependencies for api
  #./run.sh run web yarn

migrate.create: ## Creates new migration
	$(api) $(migration) migration:create
migrate.reset: ## Reset db
	$(api) $(migration) migration:down --to 0
migrate.drop: ## Drop schema
	$(api) $(migration) schema:drop --drop-db --dump --drop-migrations-table
migrate.sync: ## Runs schema syncronization
	$(api) $(migration) schema:update --run --dump

web.logs: ## Shows api server logs
	$(logs) $(web_app)
web.shell: ## Run shell
	$(web) sh
web.shell.exec: ## Run shell inside running container
	$(web.exec) sh
web.yarn: ## Installs node dependencies for web
	./run.sh run web yarn

# DB 
db.psql.e: ## Logs into psql using docker exec
	$(db.exec) psql -U postgres
db.psql: ## Logs into psql using docker run
	$(db) psql -U postgres
db.logs: ## Shows postgres logs
	$(logs) $(postgres)
