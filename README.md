# Final Project

MiniStops is a web application that helps parents quickly find baby-changing facilities nearby. Users can view locations on a map, read reviews from other parents, and add new places with useful features like stroller access, baby lounges, or changing tables.

The goal of the project was to build a full-stack application with authentication, location selection, and user-generated reviews.

## The problem

As a parent for a toddler finding a clean and accessible place to change a diaper can be tricky sometimes. MiniStops aims to make this easier by showing nearby changing facilities and allowing parents to share information about them.

To solve this problem I built a full-stack application with:

Frontend

React

React Router for navigation

Zustand for global state management

Styled-components for styling

React Leaflet for the interactive map

Backend

Node.js

Express

MongoDB with Mongoose

JWT authentication

Users can:

Sign up and log in

Add new places with features and location coordinates

Select locations directly on the map

View places on the homepage map

Read reviews and ratings

Leave their own reviews

I planned the project by first defining the main features (authentication, map, reviews, adding places) and then building the backend API before connecting it to the frontend.

One interesting part of the project was using React Leaflet and the useMapEvents hook to allow users to click on the map to choose a location.

If i have more time I would like to add:

search and filtering for places

Show the user's current location on the map

Improve the review system with editing and deleting

Add photos for places


## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.