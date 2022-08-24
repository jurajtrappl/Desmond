# Desmond
D&D Discord bot that helps players with rolls and time & world location data. Data are persistent and backed using MongoDB and provided by NestJS GraphQL API.

## Architecture diagram

Docker-compose with 3 containers:
1. _desmond_ - Discord bot written using TypeScript
2. _desmond_data_api_ - GraphQL API written using NestJS and TypeScript
3. _desmond_data_ - MongoDB container

![components](https://user-images.githubusercontent.com/31438409/186460894-66184f65-b548-42a6-a25e-36a4e6b30aa8.png)
