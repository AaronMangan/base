# Base

Base is a template repository that can be used to quickly scaffold web applications. It includes everything you need to get started on building your software dreams!! 

It's built on Laravel and React to provide a familiar experience and let you focus on the important stuff.

The idea is that it's a boilerplate for a multi-tenancy web application that provides a lot of the basic items that you'd probably be adding anyway. It is however, only a template - you are free to change, add, remove whatever you like from your app.

## What's Included

Base includes the following built in items:

- Dashboard
- User Management
- Permissions
- (Some) Prebuilt Components
- Navigation
- Some Basic Metadata (Statuses)
- Soft Deleting

## Great! How Do I Start?
Go to https://github.com/AaronMangan/base and click the blue "Use This Repository" button to create your own repo using Base as a template.

## Configuration

> Ready to go?

1. Go to your code editor and open the project (if you haven't)
2. Find `.env.example` and copy it. Rename it `.env`
3. Edit it to include your desired credentials in the **Base Users** section, though I have included some defaults if you'd rather use those. **Remember:** These credentials will not be secure, its very important that when using this product in production to ensure you do not create accounts with these credentials.
4. Make a note somewhere about ensuring you don't keep account credentials in your `.env` when in production.
5. In your terminal run `php artisan migrate --seed` to migrate and seed the data.
