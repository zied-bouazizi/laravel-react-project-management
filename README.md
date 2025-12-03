# Laravel React Project Management

A web application for managing projects and tasks built with Laravel, React and Inertia.js.

## Features

1. User registration and login
2. Projects CRUD with sorting, filtering and pagination
3. Tasks CRUD with sorting, filtering and pagination
4. Create tasks inside project
5. Show all tasks or show tasks for a specific project
6. Assign users to tasks
7. View tasks assigned to me
8. Show dashboard with overview information

## Installation

> [!TIP]
> Make sure your environment is set up properly. You will need PHP 8.2, Composer and Node.js installed and the commands `php`, `composer`, `node` and `npm` should be available in your terminal.

1. Clone the project
2. Navigate to the project's root directory using terminal
3. Copy `.env.example` into `.env` file `cp .env.example .env`
4. Open and adjust your `.env` parameters
5. Run `composer install`
6. Run `npm install`
7. Set application key `php artisan key:generate --ansi`
8. Execute migrations and seed data `php artisan migrate --seed`
9. Start vite server `npm run dev`
10. Start artisan server `php artisan serve`

## Test User

Use this account after running the project locally:

```
Email: test@example.com
Password: 123.321A
```
