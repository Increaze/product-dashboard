# Product Management Dashboard

A production-minded product management dashboard built with Next.js, React, TypeScript, Tailwind CSS, and the DummyJSON Products API.

The application allows users to browse, search, filter, sort, paginate, view, and update products through a responsive dashboard interface.

## Features

* Dashboard summary metrics
* Product catalogue
* Product search with debouncing
* Category filtering
* Product sorting
* API-based pagination
* URL-based search/filter/sort/page state
* Product details page
* Edit product price and stock
* PATCH API integration
* Loading states
* Error states
* Empty search results state
* Responsive layout
* Accessible form controls and semantic HTML

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* DummyJSON Products API

## Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Architecture

The application uses the Next.js App Router and separates server-side data fetching from interactive client-side components.

### Server Components

The dashboard and product details pages are Server Components.

They are responsible for:

* Reading URL search parameters
* Fetching product data
* Fetching product categories
* Calculating dashboard metrics
* Rendering server-side product information

### Client Components

Interactive functionality is isolated into Client Components:

* `ProductFilters`
* `Pagination`
* `ProductEditForm`

These components handle browser interactions such as input changes, URL navigation, and form submission.

### API Layer

API requests are centralized in:

```text
lib/api/products.ts
```

This keeps API concerns separate from presentation components.

The API layer handles:

* Product listing
* Product search
* Category filtering
* Product details
* Product categories
* Product updates

### Type Definitions

Shared product contracts are maintained in:

```text
types/product.ts
```

This provides consistent TypeScript typing across the application.

## URL State

Search, category, sorting, and pagination state are stored in URL query parameters.

Example:

```text
/?search=phone&category=beauty&sort=price&order=desc&page=2
```

This makes filtered views:

* Shareable
* Bookmarkable
* Preserved during navigation
* Compatible with browser back/forward navigation

When search, category, or sorting changes, pagination is reset to page 1.

## Dashboard Metrics

The dashboard displays:

* Total products
* Low-stock products
* Average rating
* Estimated inventory value

The total product count comes from the API response.

The other metrics are calculated from the products currently loaded on the page. The UI makes this scope explicit rather than implying that those calculations represent the entire catalogue.

## Product Updates

Users can edit:

* Price
* Stock

The application sends a PATCH request to the DummyJSON API.

The form includes:

* Client-side validation
* Saving state
* Success feedback
* Error feedback

DummyJSON simulates update responses, so changes are not intended to provide permanent persistence in a real database.

## Loading and Error Handling

The application includes intentional states for:

* Dashboard loading
* Product details loading
* API errors
* Empty search results
* Invalid/non-existent products

This prevents the interface from appearing broken while data is loading or unavailable.

## Responsive Design

The dashboard is designed for desktop, tablet, and mobile screen sizes.

The product table remains horizontally scrollable on smaller screens to preserve the readability and structure of tabular data.

## Accessibility

Accessibility considerations include:

* Semantic HTML
* Form labels
* Accessible navigation labels
* Button disabled states
* `role="alert"` for errors
* `role="status"` and live feedback for successful updates
* Descriptive image alt text
* Keyboard-accessible controls

## Assumptions and Tradeoffs

### Server-side data fetching

The dashboard uses Server Components for data fetching because the initial product catalogue does not require client-side state management.

Interactive controls remain client-side only where browser interaction is necessary.

### URL state instead of global state

Search, filtering, sorting, and pagination are stored in the URL instead of introducing a global state library.

This keeps the application simpler while making the current catalogue view shareable and navigable.

### Pagination

The application uses the API's `limit` and `skip` parameters rather than downloading the entire catalogue and paginating locally.

This better represents how a larger production application would handle a growing dataset.

### No global state library

A state management library was not introduced because the application's interactive state is relatively small and localized.

Adding one would increase complexity without providing significant value for the current requirements.

## Limitations

## Limitations

* DummyJSON is a mock API, so product updates are simulated and are not permanently persisted on the server.
* Dashboard metrics such as average rating, low-stock count, and inventory value are calculated from the currently loaded product page, while the total product count comes from the API's overall `total` value.
* Authentication and authorization are outside the scope of this assessment.
* The application currently supports editing price and stock only, as required by the assessment.

## Future Improvements

If this application were developed further, potential improvements would include:

* Persistent backend/database
* Authentication and role-based access
* Optimistic product updates
* Automated tests
* More advanced pagination
* Server-side caching strategy
* Product image gallery on the details page
* Audit history for product changes
* Toast notification system
* More detailed inventory analytics


## AI Assistance

AI tools were used during development for implementation guidance, debugging, architecture discussion, code review, and documentation drafting.

All generated suggestions were reviewed, adapted to the project requirements, and tested through the application's user flows, linting, and production build process.


## Project Structure

```text
app/
├── error.tsx
├── loading.tsx
├── page.tsx
└── products/
    └── [id]/
        ├── loading.tsx
        ├── not-found.tsx
        └── page.tsx

components/
├── dashboard/
│   ├── pagination.tsx
│   ├── product-filters.tsx
│   ├── product-table.tsx
│   ├── summary-card.tsx
│   └── summary-grid.tsx
└── products/
    └── product-edit-form.tsx

lib/
└── api/
    └── products.ts

types/
└── product.ts
```
