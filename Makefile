.DEFAULT_GOAL := help

APP_NAME := portfolio
IMAGE ?= yahkerobertkertasnya/portfolio:latest
PORT ?= 4321
BRANCH ?= main
COMPOSE ?= docker-compose.yml
SERVER_COMPOSE ?= docker-compose.server.yml

.PHONY: help env install dev build preview check lint format clean fresh \
	docker-build docker-up docker-down docker-logs docker-push \
	server-up server-down server-logs deploy-server \
	vercel-preview vercel-prod

help:
	@echo "$(APP_NAME) commands"
	@echo ""
	@echo "Local:"
	@echo "  make env              Copy .env.example to .env when .env is missing"
	@echo "  make install          Install pnpm dependencies from the lockfile"
	@echo "  make dev              Start Astro dev server"
	@echo "  make build            Build production output"
	@echo "  make preview          Preview production build locally"
	@echo "  make check            Run CI-style checks"
	@echo "  make lint             Run ESLint with fixes"
	@echo "  make format           Format files with Biome"
	@echo "  make clean            Remove generated build output"
	@echo "  make fresh            Clean, install, and build"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build     Build $(IMAGE)"
	@echo "  make docker-up        Start local Docker Compose stack"
	@echo "  make docker-down      Stop local Docker Compose stack"
	@echo "  make docker-logs      Follow local Docker Compose logs"
	@echo "  make docker-push      Push $(IMAGE)"
	@echo ""
	@echo "Deploy:"
	@echo "  make server-up        Start server Docker Compose stack"
	@echo "  make server-down      Stop server Docker Compose stack"
	@echo "  make server-logs      Follow server Docker Compose logs"
	@echo "  make deploy-server    Pull $(BRANCH), rebuild, and restart server stack"
	@echo "  make vercel-preview   Deploy a Vercel preview"
	@echo "  make vercel-prod      Deploy to Vercel production"

env:
	@if [ ! -f .env ]; then \
		echo "Copying .env.example to .env"; \
		cp .env.example .env; \
	else \
		echo ".env already exists"; \
	fi

install:
	pnpm install --frozen-lockfile

dev: env install
	pnpm dev -- --host 0.0.0.0 --port $(PORT)

build:
	pnpm build

preview:
	pnpm preview -- --host 0.0.0.0 --port $(PORT)

check:
	pnpm check

lint:
	pnpm lint

format:
	pnpm format

clean:
	rm -rf dist .astro .vercel/output

fresh: clean install build

docker-build:
	docker build -t $(IMAGE) .

docker-up:
	docker compose -f $(COMPOSE) up -d --build

docker-down:
	docker compose -f $(COMPOSE) down

docker-logs:
	docker compose -f $(COMPOSE) logs -f

docker-push: docker-build
	docker push $(IMAGE)

server-up:
	docker compose -f $(SERVER_COMPOSE) up -d --build

server-down:
	docker compose -f $(SERVER_COMPOSE) down

server-logs:
	docker compose -f $(SERVER_COMPOSE) logs -f

deploy-server:
	git fetch origin $(BRANCH)
	git pull --ff-only origin $(BRANCH)
	docker compose -f $(SERVER_COMPOSE) up -d --build

vercel-preview:
	pnpm dlx vercel

vercel-prod:
	pnpm dlx vercel --prod
