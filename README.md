# Quick Order Mobile App

A React Native mobile application for quick product ordering with real-time search, category filtering, and order management.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- iOS Simulator (for macOS) or Android Emulator
- Expo CLI (installed automatically with dependencies)

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install
```

### Running the App

```bash
# Start the development server
pnpm start

# Run on iOS simulator (macOS only)
pnpm ios

# Run on Android emulator
pnpm android

# Run on web
pnpm web
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Code Quality

```bash
# Lint and check formatting
pnpm lint

# Format and fix issues
pnpm format
```

## Architecture & Organization

### Tech Stack

- **Framework**: React Native 0.81.5 with Expo 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand with MMKV persistence
- **Forms**: React Hook Form with Zod validation
- **Styling**: TailwindCSS via Uniwind
- **UI Performance**: Shopify FlashList for optimized lists
- **Testing**: Jest with jest-expo

### Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Home screen
├── components/            # React components organized by feature
│   ├── core/             # Reusable UI primitives (Input, Screen, Row, Column, etc.)
│   ├── form-control/     # Form-specific components (TextField)
│   ├── product-list/     # Product listing components
│   ├── order-summary/    # Order summary and cart
│   └── search/           # Search and filter components
├── data/                 # Static data files
│   └── products.json     # Product catalog
├── hooks/                # Custom React hooks
│   ├── use-filtered-products.ts
│   ├── use-input-focus.ts
│   └── use-quantity-input.ts
├── lib/                  # Core utilities and configuration
│   ├── constants/        # App constants and schemas
│   ├── store/           # Zustand store configuration
│   │   ├── slices/      # State slices (order.slice.ts)
│   │   ├── types.ts     # Store type definitions
│   │   └── use-app-store.ts  # Store hooks
│   └── storage.tsx      # MMKV storage wrapper
├── providers/           # React context providers
│   └── app-provider.tsx # Root app provider
├── types/              # TypeScript type definitions
│   ├── component.types.ts
│   ├── form.types.ts
│   └── product.types.ts
└── utils/              # Utility functions
    ├── format-number.ts
    ├── sleep.ts
    └── with-debounce.ts
```

### State Management Strategy

**Zustand with MMKV Persistence**

The app uses a single Zustand store with slices pattern for organizing state:

- **Order Slice** (`src/lib/store/slices/order.slice.ts`): Manages product quantities, cart operations
  - `quantities`: Record of product IDs to quantity objects
  - `setQuantity`, `incrementQuantity`, `decrementQuantity`: Quantity mutations
  - `getTotalQuantity`, `getTotalAmount`: Computed values
  - `clearQuantity`, `clearAllQuantities`: Reset operations

**Why Zustand + MMKV?**
- Minimal boilerplate compared to Redux
- Built-in persistence with MMKV (fastest key-value storage for React Native)
- Type-safe with TypeScript
- Automatic selectors via `createSelectors` helper
- DevTools support for debugging

**Form State**

React Hook Form handles local form state (search text, category filters) separately from global state, avoiding unnecessary re-renders.

### Component Architecture

**Core Design Principles**
1. **Composition over Configuration**: Small, composable components (`Row`, `Column`, `Show`)
2. **Separation of Concerns**: Container components handle logic, presentational components handle UI
3. **Performance Optimization**:
   - FlashList for virtualized scrolling
   - Memoized computations (prices map)
   - Debounced search inputs
   - Ref-based imperative filtering to avoid prop drilling

### Key Design Decisions

1. **File-based Routing (Expo Router)**: Simplifies navigation setup and reduces boilerplate
2. **MMKV over AsyncStorage**: 10x faster synchronous storage
3. **Zustand over Redux**: Less boilerplate, easier testing, similar performance
4. **FlashList over FlatList**: Better performance for long lists
5. **Uniwind over NativeWind**: Better developer experience with Tailwind v4
6. **Zod Validation**: Type-safe schema validation that syncs with TypeScript

## Trade-offs & Future Improvements

### What Could Be Improved with More Time

#### 1. Backend Integration
**Current**: Static JSON file for products
**Improvement**:
- REST/GraphQL API integration
- Real-time product availability
- Server-side search and filtering
- Pagination for large catalogs

#### 2. State Management Enhancements
**Current**: Single slice with all order logic
**Improvements**:
- Separate slices for products, user, cart, filters
- Middleware for analytics tracking
- Optimistic updates for better UX
- Undo/redo functionality

#### 3. Error Handling
**Current**: Basic error handling
**Improvements**:
- Boundary components for error isolation
- Retry mechanisms for failed operations
- User-friendly error messages
- Offline mode with queue sync

#### 4. Testing Coverage
**Current**: Basic unit tests for store slice
**Improvements**:
- Component integration tests
- E2E tests with Detox/Maestro
- Visual regression testing
- Performance benchmarks

#### 5. Performance Optimization
**Potential Improvements**:
- Image lazy loading and caching
- Code splitting for larger apps
- React.memo for expensive components
- Web Workers for heavy computations

#### 6. UX Enhancements
**Missing Features**:
- Order history and tracking
- Product details page with images
- Favorites/wishlist
- Barcode scanner for quick add
- Multi-language support (i18n)
- Dark mode support
- Accessibility improvements (screen reader, keyboard navigation)

#### 7. Developer Experience
**Could Add**:
- Storybook for component development
- E2E type safety with tRPC
- Automated release pipeline
- Component documentation
- Performance monitoring (Sentry, New Relic)

#### 8. Data Persistence
**Current**: Only quantities are persisted
**Improvements**:
- Cache product data locally
- Sync state across devices
- Conflict resolution for offline edits

#### 9. Architecture Patterns
**Considerations**:
- Feature-based folder structure for larger teams
- Micro-frontends for modular development
- Repository pattern for data access
- CQRS for complex business logic

#### 10. Security & Validation
**Missing**:
- Input sanitization
- Rate limiting
- Authentication/authorization
- Secure storage for sensitive data
- API key management

## Performance Characteristics

- **Fast refresh**: Instant feedback during development
- **App size**: ~50MB (can be optimized with Hermes, tree-shaking)
- **Memory footprint**: ~100MB baseline
- **TTI (Time to Interactive)**: <2s on modern devices

## Contributing

1. Follow the existing code style (ESLint + Prettier configured)
2. Write tests for new features
3. Update this README for architectural changes
4. Use conventional commits for version management

## License

Private - All rights reserved