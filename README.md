# Recipe Finder Application

A modern React-based web application for searching and viewing recipes with typeahead/autocomplete functionality.

## Features

- **Typeahead Search**: Search for recipes by name or cuisine with real-time suggestions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Recipe Details**: View detailed information about each recipe including ingredients and instructions
- **Lazy Loading**: Optimized performance with code splitting and lazy loading
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Pagination**: Browse through recipes with pagination support

## Tech Stack

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Routing**: React Router
- **Testing**: Jest and React Testing Library
- **Code Splitting**: React.lazy() and Suspense

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API running (see Backend Setup section)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd recipe-app-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8080/api
   REACT_APP_MIN_SEARCH_LENGTH=3
   ```

## Running the Application

### Development Mode

```
npm start
```

This will start the development server at [http://localhost:3000](http://localhost:3000).

### Production Build

```
npm run build
```

This will create an optimized production build in the `build` folder.

## Testing

### Running Tests

```
npm test
```

### Test Coverage

```
npm run test:coverage
```

This will generate a coverage report showing the percentage of code covered by tests.

## Project Structure

The project follows an atomic design pattern:

- **atoms**: Basic building blocks (Logo, RecipePagination)
- **molecules**: Simple combinations of atoms (Header, SearchBar)
- **organisms**: Complex UI components (RecipeList, RecipeDetails)
- **page**: Complete pages (HomePage, NotFoundPage)

## API Integration

The application integrates with a RESTful API for recipe data:

- **Search Recipes**: `GET /api/recipes/search?query={searchTerm}&page={page}&size={size}`
- **Get All Recipes**: `GET /api/recipes/findAll?page={page}&size={size}`
- **Get Recipe Details**: `GET /api/recipes/{id}`

## Backend Setup

This frontend application requires a backend API to function properly. The backend should provide the following endpoints:

1. **Search Recipes**: Returns recipes matching the search query
2. **Get All Recipes**: Returns paginated list of all recipes
3. **Get Recipe Details**: Returns detailed information about a specific recipe

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors who have helped improve this project
