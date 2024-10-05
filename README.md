# Travel Destinations Search Application

## Overview

This project is a travel destination search application built with Next.js, TypeScript, and Tailwind CSS. Users can search for travel destinations and view detailed information about them, including nearby destinations. The application features a responsive user interface, asynchronous API calls, and robust error handling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How to Run](#how-to-run)

## Features

- **Destination Search**: Users can search for travel destinations by name using an asynchronous combobox.
- **Destination Details**: Displays detailed information about the selected destination, including its description and top 5 nearby destinations.
- **Error Handling**: Mimics backend error handling when the user enters 'fail' and displays error messages.
- **Loading Indicators**: Shows loading indicators while fetching data.
- **Keyboard Accessibility**: Combobox is fully keyboard-accessible.
- **Bonus Features** (Optional):
  - Debounced user input for better performance
  - Utilization of modern accessible UI libraries

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/antoniofulg/mozio-travel-destination.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mozio-travel-destination
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## How to Run

After installing the dependencies and starting the development server, you can use the application by entering a destination name in the search bar. The app will display suggestions based on your input. Click on a suggestion to view more details about the destination and its nearby locations.

### Fake API

The fake API is implemented using the NextJS structure under the `./src/app/api` folder, which exports asynchronous functions to simulate fetching data. Each function logs its arguments to the console for debugging purposes.

### Error Handling

To simulate backend error handling, entering 'fail' in the search input will trigger an error message displayed near the combobox.
