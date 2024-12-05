# Moexe

The simple project I have created for the university

Monorepo: turbo, Next.js, Fastify

`pnpm run dev`

## Frontend

Next.js

Dashboard
![image](https://github.com/user-attachments/assets/bca63a5c-6649-453e-aa6c-dc9408ce8d9a)

Investments management
![image](https://github.com/user-attachments/assets/48ae7992-bf37-4977-8b8d-4a732e9bc2c7)

## Backed

Fastify with the simpliest models

### Routes

-   GET /investments — list all investments
-   POST /investments — create a new investment
-   DELETE /investments/:id — delete an investment
-   GET /tickers — list all tickers
-   GET /history — calculate the history of investments (using MOEX API)
