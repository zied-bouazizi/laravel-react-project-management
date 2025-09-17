# Laravel React Project Management

A web application for managing projects, tasks and members using a workspace-based, multi-tenant architecture built with Laravel, React and Inertia.js.

## Features

1. User registration and authentication
2. Multi-tenant workspaces with isolated projects, tasks and members
3. Projects, tasks and members CRUD with sorting, filtering and pagination
4. Create tasks inside project
5. View all tasks or tasks by project
6. Assign members to tasks
7. View tasks assigned to the current member
8. Manage workspace members (owner only)
9. Show dashboard with task overview and statistics

## Local Setup

> [!TIP]
> Ensure your environment is ready. You will need PHP 8.2, Composer and Node.js installed and the commands `php`, `composer`, `node` and `npm` should be available in your terminal.

### 1. Clone the repository

```
git clone <repository-url>
```

### 2. Navigate to the project folder

```
cd <project-folder>
```

### 3. Copy the environment file

```
cp .env.example .env
```

### 4. Configure environment variables

Open `.env` and update the configuration parameters as needed.

### 5. Install PHP dependencies

```
composer install
```

### 6. Install JavaScript dependencies

```
npm install
```

### 7. Generate the application key

```
php artisan key:generate 
``` 

### 8. Run database migrations and seed dummy data

```
php artisan migrate --seed
```

### 9. Create symbolic link for storage

This command links `storage/app/public` to `public/storage` so uploaded files can be publicly accessible.

```
php artisan storage:link
```

### 10. Start the Vite development server

```
npm run dev
```

### 11. Start the Laravel development server 

Run this command in a separate terminal.

```
php artisan serve
```

## Test Accounts

Use these accounts to test the application locally:

| Role             | Email              | Password | Permissions                                                      |
|------------------|--------------------|----------|------------------------------------------------------------------|
| Workspace Owner  | owner@example.com  | password | Full access to all features, including managing members.         |
| Workspace Member | member@example.com | password | Limited access, can use the app but cannot manage other members. |
