# MiniStops

A web application that helps parents quickly find baby-changing facilities nearby.

## View it live
- Frontend: https://project-final-irisdgz-1.onrender.com
- Backend API: https://project-final-irisdgz.onrender.com

## The problem
As a parent of a toddler, finding a clean and accessible place to change a diaper can be tricky. MiniStops makes this easier by showing nearby changing facilities and allowing parents to share information about them.

## Features
Users can:
- Sign up and log in
- Add new places with features and a map-picked location
- Filter places by city, category, or amenities
- View all places on an interactive map
- Read and leave reviews with ratings

## Tech stack
**Frontend:** React, React Router, Zustand, Styled-components, React Leaflet

**Backend:** Node.js, Express, MongoDB with Mongoose, JWT authentication

## How I built it
I started by defining the core features (authentication, map, reviews, adding places), built the backend API first, then connected the frontend to it.

One interesting challenge was using React Leaflet's `useMapEvents` hook to let users click directly on the map to pick a location for a new place.

## If I had more time
- Allow browsing and viewing places without needing to log in
- Show the user's current location on the map
- Allow editing and deleting reviews
- Add photos for places
- Push notifications for new reviews