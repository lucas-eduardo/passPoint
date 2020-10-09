include .env

release:
  GH_TOKEN=${GH_TOKEN} npm run release
