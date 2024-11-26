# Base

Base is a template repository that can be used to quickly scaffold web applications. It includes everything you need to get started on building your software dreams!! 

It's built on Laravel and React to provide a familiar experience and let you focus on the important stuff.

The idea is that it's a boilerplate for a multi-tenancy web application that provides a lot of the basic items that you'd probably be adding anyway. It is however, only a template - you are free to change, add, remove whatever you like from your app.

## What's Included

Base includes the following built in items:

- Standard Laravel (11)
- Dashboard
- User Management
- Permissions (via Spatie Permissions)
- (Some) Prebuilt Components
- Navigation
- Some Basic Metadata (Statuses)
- Soft Deleting

## Great! How Do I Start?
Go to https://github.com/AaronMangan/base and click the blue "Use This Repository" button to create your own repo using Base as a template.

## Configuration

> Ready to go?

1. Find `.env.example` and copy it. Rename it `.env`
2. Edit it to include your desired credentials in the **Base Users** section, though I have included some defaults if you'd rather use those. **Remember:** These credentials will not be secure, its very important that when using this product in production to ensure you do not create accounts with these credentials.
3. In your terminal, in the project directory, run `composer install`
4. Run `npm install` as well.
5. Optionally, if running Docker, `php artisan sail:install`
6. Update your database settings in `.env`
7. Run `php artisan migrate --seed` to migrate and seed the data.
8. You can then run `npm run dev` and start building.

## Permissions

Currently **Base** provides the following roles already defined for you:

- `super` This is the Super Admin role, it allows anyone with this role to see data for all organisations in your application.
- `admin` Provides the user with administrator permissions, but only for objects in the admin's organisation.
- `readonly` Allows users with this role to view but not update or manage items in the platform. They may only view item that belong to their organisation