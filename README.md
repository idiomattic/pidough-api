# PiDough

### Making making great pizza (and other pies!) more approachable by scaling recipes to fit your cravings.
Initial Release 1/17/2022

[Live Site](http://www.pidough.xyz/) (Mobile-friendly)

## Features
- Users can create accounts with a chosen username and password.
- Users can post recipes through a dynamic form.
- Guests and Users alike can view recipes and manipulate proportions (number of pizzas, size, and crust thickness) to get immediately-updated ingredient quantities.

## Technologies
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB
- Frontend: React w/ Redux, TailwindCSS

## Highlights
- Uses React Hooks to power a dynamic form, allowing users to create additional form fields on demand.
- Recipes saved to MongoDB are scaled down to 'unit' quantities; visitors to a recipe's show route only make one backend API request for these unit quantities, and any scaling of the recipe takes place on the frontend.
- Leverages mobile-friendly CSS techniques such as flex-wrap for positive user experience on any browser. 
