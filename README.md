# Database and ORM testing

## Pre-requisites
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

## Getting started
1) `npm`/`bun` install
2) `npm`/`bun` run test

###### Bun can run TS files directly without the need for `ts-node`. e.g. `bun src/index.ts`

## Intro
Use the `drizzle-orm` package to create a MySQL select statement. This repo contains conditional logic which affects the output of the statement based on a passed payload.

## Layout
1) Define table schema (found in `src/schema.ts`)
2) Define logic for constructing statement (found in `src/index.ts`)
