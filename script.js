/* ==========================================================================
   Angular Best Practices — script.js
   Handles: tree rendering, expand/collapse, detail panel, search, theme,
            copy-to-clipboard, sticky header, mobile nav, smooth scroll,
            particles, scroll progress, back-to-top, scroll animations,
            project size toggle, tooltips, keyboard shortcuts.
   ========================================================================== */

(function () {
  'use strict';

  // ========================================================================
  // Helper constructors
  // ========================================================================
  function f(name, type, desc) {
    return { name: name, type: type, desc: desc };
  }

  function componentFolder(name, desc) {
    return {
      name: name, type: 'folder', desc: desc,
      children: [
        f(name + '.ts', 'component', desc),
        f(name + '.html', 'html', 'Template for the ' + name + ' component.'),
        f(name + '.scss', 'style', 'Scoped SCSS styles for the ' + name + ' component.'),
        f(name + '.spec.ts', 'spec', 'Unit tests for the ' + name + ' component.')
      ]
    };
  }

  // ========================================================================
  // SMALL TREE (~20 files)
  // ========================================================================
  var SMALL_TREE = {
    name: 'my-small-app', type: 'folder',
    desc: 'Root of a minimal Angular standalone app — ideal for prototypes and small single-developer projects.',
    children: [
      f('angular.json', 'config', 'Angular workspace configuration — build targets and project settings.'),
      f('package.json', 'json', 'Node.js manifest — dependencies and scripts.'),
      f('tsconfig.json', 'config', 'Root TypeScript configuration — compiler options.'),
      f('README.md', 'misc', 'Project documentation.'),
      { name: 'src', type: 'folder',
        desc: 'All application source code.',
        children: [
          f('main.ts', 'ts', 'Entry point — bootstrapApplication() with AppComponent and appConfig.'),
          f('index.html', 'html', 'Root HTML — contains <app-root> element.'),
          f('styles.scss', 'style', 'Global stylesheet.'),
          { name: 'app', type: 'folder',
            desc: 'Application root — root component, config, routes, and feature pages.',
            children: [
              f('app.ts', 'component', 'Root component — contains RouterOutlet.'),
              f('app.html', 'html', 'Root template — <router-outlet />.'),
              f('app.scss', 'style', 'Root component styles.'),
              f('app.config.ts', 'config', 'Application config — provideRouter, provideHttpClient.'),
              f('app.routes.ts', 'routes', 'Root route definitions.'),
              { name: 'home', type: 'folder', desc: 'Home page feature.',
                children: [
                  f('home.ts', 'component', 'Home page component.'),
                  f('home.html', 'html', 'Home page template.'),
                  f('home.scss', 'style', 'Home page styles.')
                ]
              },
              { name: 'about', type: 'folder', desc: 'About page feature.',
                children: [
                  f('about.ts', 'component', 'About page component.'),
                  f('about.html', 'html', 'About page template.'),
                  f('about.scss', 'style', 'About page styles.')
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // ========================================================================
  // MEDIUM TREE (~100+ files) — core/shared/features/layout pattern
  // ========================================================================
  var MEDIUM_TREE = {
    name: 'my-angular-app', type: 'folder',
    desc: 'Root directory of the Angular application. Contains configuration files and the src/ directory with all source code.',
    children: [
      f('angular.json', 'config', 'Angular workspace configuration — defines build targets, architect configs, and project settings.'),
      f('package.json', 'json', 'Node.js manifest — lists dependencies, scripts (build, serve, test, lint), and project metadata.'),
      f('tsconfig.json', 'config', 'Root TypeScript configuration — sets compiler options inherited by tsconfig.app.json and tsconfig.spec.json.'),
      f('tsconfig.app.json', 'config', 'TypeScript config for the application build.'),
      f('tsconfig.spec.json', 'config', 'TypeScript config for unit tests.'),
      f('.editorconfig', 'misc', 'EditorConfig — enforces consistent coding styles across editors.'),
      f('.gitignore', 'misc', 'Git ignore rules — node_modules, dist, etc.'),
      f('.eslintrc.json', 'json', 'ESLint configuration — linting rules for TypeScript and Angular patterns.'),
      f('README.md', 'misc', 'Project documentation — setup instructions and architecture overview.'),
      {
        name: 'src', type: 'folder',
        desc: 'Source directory — all application source code, assets, styles, and environments.',
        children: [
          f('main.ts', 'ts', 'Application entry point — bootstraps the Angular app using bootstrapApplication() with app config.'),
          f('index.html', 'html', 'Main HTML file — the single page Angular renders into, contains <app-root>.'),
          {
            name: 'styles', type: 'folder',
            desc: 'Global stylesheets — SCSS partials imported into styles.scss.',
            children: [
              f('styles.scss', 'style', 'Main stylesheet — imports all SCSS partials.'),
              f('_variables.scss', 'style', 'SCSS variables — colors, spacing, breakpoints, design tokens.'),
              f('_mixins.scss', 'style', 'SCSS mixins — responsive breakpoints, flexbox helpers, animations.'),
              f('_reset.scss', 'style', 'CSS reset — normalizes browser default styles.'),
              f('_typography.scss', 'style', 'Typography styles — font imports, heading sizes, text utilities.')
            ]
          },
          {
            name: 'assets', type: 'folder',
            desc: 'Static assets — images, icons, fonts, and i18n translation files.',
            children: [
              { name: 'images', type: 'folder', desc: 'Image assets.', children: [] },
              { name: 'icons', type: 'folder', desc: 'SVG icon assets.', children: [] },
              {
                name: 'i18n', type: 'folder', desc: 'Internationalization translation files.',
                children: [
                  f('en.json', 'json', 'English translations.'),
                  f('ar.json', 'json', 'Arabic translations (RTL support).')
                ]
              }
            ]
          },
          {
            name: 'environments', type: 'folder',
            desc: 'Environment configurations — TypeScript files with environment-specific variables.',
            children: [
              f('environment.ts', 'env', 'Base environment variables.'),
              f('environment.development.ts', 'env', 'Development environment — local API URLs, debug flags.'),
              f('environment.production.ts', 'env', 'Production environment — production API URLs, optimizations.')
            ]
          },
          {
            name: 'app', type: 'folder',
            desc: 'Main application directory — root component, config, routes, and all feature directories.',
            children: [
              f('app.ts', 'component', 'Root component — bootstraps the app, contains RouterOutlet.'),
              f('app.html', 'html', 'Root template — <router-outlet /> to render routed views.'),
              f('app.scss', 'style', 'Root component styles — global app shell styles.'),
              f('app.spec.ts', 'spec', 'Root component unit tests.'),
              f('app.config.ts', 'config', 'Application configuration — provideRouter, provideHttpClient, interceptors.'),
              f('app.routes.ts', 'routes', 'Root route definitions — lazy-loads feature modules, applies guards.'),
              {
                name: 'core', type: 'folder',
                desc: 'Core module — singleton services, functional guards, interceptors, models, enums, constants, utilities. Used app-wide.',
                children: [
                  {
                    name: 'guards', type: 'folder',
                    desc: 'Functional route guards — control route access based on auth state.',
                    children: [
                      f('auth.ts', 'guard', 'Functional auth guard — prevents unauthenticated users from protected routes.'),
                      f('role.ts', 'guard', 'Functional role guard — restricts access based on user roles.'),
                      f('no-auth.ts', 'guard', 'No-auth guard — redirects authenticated users away from login page.')
                    ]
                  },
                  {
                    name: 'interceptors', type: 'folder',
                    desc: 'Functional HTTP interceptors — middleware for requests/responses.',
                    children: [
                      f('auth.ts', 'interceptor', 'Auth interceptor — attaches JWT Bearer token to outgoing HTTP requests.'),
                      f('error.ts', 'interceptor', 'Error interceptor — handles 401/500 errors globally, shows notifications.'),
                      f('loading.ts', 'interceptor', 'Loading interceptor — tracks HTTP request state for loading spinners.'),
                      f('cache.ts', 'interceptor', 'Cache interceptor — caches GET responses to reduce redundant API calls.')
                    ]
                  },
                  {
                    name: 'services', type: 'folder',
                    desc: 'Singleton services — app-wide services using inject() for DI.',
                    children: [
                      f('auth.ts', 'service', 'Auth service — manages login, logout, token, and user state via signals.'),
                      f('storage.ts', 'service', 'Storage service — type-safe localStorage/sessionStorage abstraction.'),
                      f('logger.ts', 'service', 'Logger service — centralized logging with configurable log levels.'),
                      f('notification.ts', 'service', 'Notification service — toast/snackbar notifications with signal state.')
                    ]
                  },
                  {
                    name: 'models', type: 'folder', desc: 'Global TypeScript interfaces and types.',
                    children: [
                      f('user.ts', 'model', 'User interface — id, name, email, role, avatar, timestamps.'),
                      f('api-response.ts', 'model', 'Generic API response wrapper — data, message, status, error.'),
                      f('pagination.ts', 'model', 'Pagination interface — page, pageSize, total, items.')
                    ]
                  },
                  {
                    name: 'enums', type: 'folder', desc: 'TypeScript enums for type-safe constants.',
                    children: [
                      f('role.ts', 'enum', 'Role enum — Admin, Editor, Viewer.'),
                      f('status.ts', 'enum', 'Status enum — Active, Inactive, Pending, Deleted.')
                    ]
                  },
                  {
                    name: 'constants', type: 'folder', desc: 'Application-wide readonly constants.',
                    children: [
                      f('api-endpoints.ts', 'constant', 'API endpoints — centralized URL mapping.'),
                      f('app.ts', 'constant', 'App constants — name, version, default page size, storage keys.')
                    ]
                  },
                  {
                    name: 'utils', type: 'folder', desc: 'Pure utility functions — no Angular dependencies.',
                    children: [
                      f('date.ts', 'util', 'Date utilities — format, parse, compare, relative time.'),
                      f('string.ts', 'util', 'String utilities — slugify, capitalize, truncate, sanitize.'),
                      f('validators.ts', 'util', 'Custom validator functions — email, password, phone patterns.')
                    ]
                  }
                ]
              },
              {
                name: 'shared', type: 'folder',
                desc: 'Shared module — reusable standalone components, directives, pipes imported by any feature.',
                children: [
                  {
                    name: 'components', type: 'folder',
                    desc: 'Reusable UI building blocks — buttons, modals, tables, spinners.',
                    children: [
                      componentFolder('button', 'Reusable button — variants (primary, secondary, danger), sizes, loading, disabled.'),
                      componentFolder('modal', 'Reusable modal/dialog — customizable header, body, footer, backdrop close.'),
                      componentFolder('loading-spinner', 'Loading indicator — inline or full-page overlay.'),
                      componentFolder('data-table', 'Feature-rich table — sorting, filtering, pagination, row selection.')
                    ]
                  },
                  {
                    name: 'directives', type: 'folder', desc: 'Custom Angular directives.',
                    children: [
                      f('highlight.ts', 'directive', 'Highlight directive — background highlight on hover.'),
                      f('tooltip.ts', 'directive', 'Tooltip directive — hover tooltip with configurable position.'),
                      f('click-outside.ts', 'directive', 'Click-outside directive — emits event on outside click.')
                    ]
                  },
                  {
                    name: 'pipes', type: 'folder', desc: 'Custom Angular pipes for template transforms.',
                    children: [
                      f('truncate-pipe.ts', 'pipe', 'Truncate pipe — shortens text: {{ text | truncate:100 }}'),
                      f('time-ago-pipe.ts', 'pipe', 'Time-ago pipe — relative time: "5 minutes ago".'),
                      f('safe-html-pipe.ts', 'pipe', 'Safe HTML pipe — renders trusted HTML via DomSanitizer.')
                    ]
                  },
                  {
                    name: 'validators', type: 'folder', desc: 'Custom reactive form validators.',
                    children: [
                      f('email.validator.ts', 'validator', 'Email validator — stricter than built-in Validators.email.'),
                      f('password-match.validator.ts', 'validator', 'Password match — cross-field validator for confirm password.')
                    ]
                  }
                ]
              },
              {
                name: 'features', type: 'folder',
                desc: 'Feature modules — lazy-loaded, self-contained business domains.',
                children: [
                  {
                    name: 'auth', type: 'folder',
                    desc: 'Auth feature — login, registration, password recovery. Lazy-loaded.',
                    children: [
                      {
                        name: 'pages', type: 'folder', desc: 'Auth routable page components.',
                        children: [
                          componentFolder('login', 'Login page — email/password form with validation, forgot password link.'),
                          componentFolder('register', 'Register page — name, email, password, confirm password with validation.'),
                          componentFolder('forgot-password', 'Forgot password — sends reset link, shows feedback.')
                        ]
                      },
                      { name: 'services', type: 'folder', desc: 'Auth-scoped API services.',
                        children: [f('auth-api.ts', 'service', 'Auth API — login, register, forgot password, token refresh.')]
                      },
                      { name: 'models', type: 'folder', desc: 'Auth TypeScript interfaces.',
                        children: [f('auth.ts', 'model', 'LoginRequest, RegisterRequest, AuthResponse, TokenPayload.')]
                      },
                      f('auth.routes.ts', 'routes', 'Auth routes — /auth/login, /auth/register, /auth/forgot-password.')
                    ]
                  },
                  {
                    name: 'dashboard', type: 'folder',
                    desc: 'Dashboard feature — stats, charts, activity feed. Lazy-loaded.',
                    children: [
                      {
                        name: 'pages', type: 'folder', desc: 'Dashboard page components.',
                        children: [componentFolder('dashboard-home', 'Dashboard home — stats cards, charts, activity feed.')]
                      },
                      {
                        name: 'components', type: 'folder', desc: 'Dashboard-specific child components.',
                        children: [
                          componentFolder('stats-card', 'Stats card — title, value, icon, trend indicator.'),
                          componentFolder('activity-feed', 'Activity feed — timeline of recent events.')
                        ]
                      },
                      f('dashboard.routes.ts', 'routes', 'Dashboard routes — loads dashboard-home page.')
                    ]
                  },
                  {
                    name: 'users', type: 'folder',
                    desc: 'Users feature — list, detail, create, edit. Lazy-loaded.',
                    children: [
                      {
                        name: 'pages', type: 'folder', desc: 'User page components.',
                        children: [
                          componentFolder('user-list', 'User list — searchable, sortable, paginated table.'),
                          componentFolder('user-detail', 'User detail — full profile with edit capability.')
                        ]
                      },
                      { name: 'services', type: 'folder', desc: 'Users-scoped API services.',
                        children: [f('users-api.ts', 'service', 'Users API — CRUD: getAll, getById, create, update, delete.')]
                      },
                      { name: 'models', type: 'folder', desc: 'User feature TypeScript interfaces.',
                        children: [f('user-feature.ts', 'model', 'UserListItem, UserDetail, CreateUserRequest, UpdateUserRequest.')]
                      },
                      f('users.routes.ts', 'routes', 'Users routes — /users (list) and /users/:id (detail).')
                    ]
                  }
                ]
              },
              {
                name: 'layout', type: 'folder',
                desc: 'Layout components — app shell: header, sidebar, footer, main layout wrapper.',
                children: [
                  {
                    name: 'header', type: 'folder', desc: 'Top navigation bar.',
                    children: [
                      f('header.ts', 'component', 'Header component — nav state, user menu, theme toggle.'),
                      f('header.html', 'html', 'Header template — logo, nav links, search, user avatar.'),
                      f('header.scss', 'style', 'Header styles — sticky, responsive, glassmorphism.')
                    ]
                  },
                  {
                    name: 'sidebar', type: 'folder', desc: 'Vertical navigation panel.',
                    children: [
                      f('sidebar.ts', 'component', 'Sidebar component — open/close state, route highlighting.'),
                      f('sidebar.html', 'html', 'Sidebar template — icons, labels, nested groups.'),
                      f('sidebar.scss', 'style', 'Sidebar styles — fixed, slide animation, mobile overlay.')
                    ]
                  },
                  {
                    name: 'footer', type: 'folder', desc: 'Footer with copyright and links.',
                    children: [
                      f('footer.ts', 'component', 'Footer component — dynamic copyright year.'),
                      f('footer.html', 'html', 'Footer template — copyright, social links.'),
                      f('footer.scss', 'style', 'Footer styles — border-top, centered content.')
                    ]
                  },
                  {
                    name: 'main-layout', type: 'folder', desc: 'Composes header + sidebar + router-outlet + footer.',
                    children: [
                      f('main-layout.ts', 'component', 'Main layout — sidebar visibility, content area sizing.'),
                      f('main-layout.html', 'html', 'Main layout template — <app-header>, <app-sidebar>, <router-outlet>, <app-footer>.'),
                      f('main-layout.scss', 'style', 'Main layout styles — CSS grid for shell positioning.')
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // ========================================================================
  // LARGE TREE (~200+ files) — adds state management (NgRx), api layer
  // ========================================================================
  var LARGE_TREE = {
    name: 'my-large-app', type: 'folder',
    desc: 'Large Angular app with NgRx state management, dedicated API layer, and feature stores. Suitable for teams of 5-15 developers.',
    children: [
      f('angular.json', 'config', 'Angular workspace configuration.'),
      f('package.json', 'json', 'Dependencies — includes @ngrx/store, @ngrx/effects, @ngrx/entity.'),
      f('tsconfig.json', 'config', 'Root TypeScript configuration.'),
      f('.eslintrc.json', 'json', 'ESLint with Angular and NgRx-specific rules.'),
      f('README.md', 'misc', 'Project documentation including state management guide.'),
      {
        name: 'src', type: 'folder', desc: 'All application source code.',
        children: [
          f('main.ts', 'ts', 'Entry point — bootstrapApplication with full provider setup.'),
          f('index.html', 'html', 'Root HTML page.'),
          {
            name: 'styles', type: 'folder', desc: 'Global SCSS files.',
            children: [
              f('_variables.scss', 'style', 'Design tokens — colors, spacing, typography.'),
              f('_mixins.scss', 'style', 'SCSS mixins — breakpoints, flex helpers.'),
              f('main.scss', 'style', 'Main entry stylesheet.')
            ]
          },
          { name: 'assets', type: 'folder', desc: 'Static assets.', children: [] },
          {
            name: 'environments', type: 'folder', desc: 'Environment configs.',
            children: [
              f('environment.ts', 'env', 'Base environment.'),
              f('environment.prod.ts', 'env', 'Production environment.')
            ]
          },
          {
            name: 'app', type: 'folder', desc: 'Application root directory.',
            children: [
              f('app.ts', 'component', 'Root component.'),
              f('app.html', 'html', 'Root template.'),
              f('app.scss', 'style', 'Root styles.'),
              f('app.config.ts', 'config', 'App config — provideStore, provideEffects, provideRouter.'),
              f('app.routes.ts', 'routes', 'Root lazy routes with guards.'),
              {
                name: 'core', type: 'folder', desc: 'Singleton services, guards, interceptors.',
                children: [
                  { name: 'guards', type: 'folder', desc: 'Functional route guards.',
                    children: [
                      f('auth.ts', 'guard', 'Auth guard — checks auth signal state.'),
                      f('role.ts', 'guard', 'Role guard — checks user role from store.')
                    ]
                  },
                  { name: 'interceptors', type: 'folder', desc: 'HTTP interceptors.',
                    children: [
                      f('auth.ts', 'interceptor', 'Attaches JWT token from store/signal.'),
                      f('error.ts', 'interceptor', 'Global error handler, dispatches error actions.')
                    ]
                  },
                  { name: 'services', type: 'folder', desc: 'App-wide singleton services.',
                    children: [
                      f('auth.ts', 'service', 'Auth service — signal-based user state.'),
                      f('logger.ts', 'service', 'Logger with external integration support.')
                    ]
                  },
                  { name: 'models', type: 'folder', desc: 'Global TypeScript interfaces.', children: [f('user.ts', 'model', 'User interface.')] },
                  { name: 'enums', type: 'folder', desc: 'TypeScript enums.', children: [f('role.ts', 'enum', 'Role enum.')] },
                  { name: 'constants', type: 'folder', desc: 'App constants.', children: [f('api-endpoints.ts', 'constant', 'Centralized API endpoints.')] },
                  { name: 'utils', type: 'folder', desc: 'Pure utility functions.', children: [f('date.ts', 'util', 'Date helpers.'), f('string.ts', 'util', 'String helpers.')] }
                ]
              },
              {
                name: 'shared', type: 'folder', desc: 'Shared standalone components, directives, pipes.',
                children: [
                  { name: 'components', type: 'folder', desc: 'Reusable UI components.',
                    children: [
                      componentFolder('button', 'Reusable button component.'),
                      componentFolder('modal', 'Reusable modal component.')
                    ]
                  },
                  { name: 'directives', type: 'folder', desc: 'Custom directives.', children: [f('highlight.ts', 'directive', 'Highlight on hover.')] },
                  { name: 'pipes', type: 'folder', desc: 'Custom pipes.', children: [f('truncate-pipe.ts', 'pipe', 'Truncate text.')] },
                  { name: 'validators', type: 'folder', desc: 'Form validators.', children: [f('password-match.validator.ts', 'validator', 'Password match.')] }
                ]
              },
              {
                name: 'features', type: 'folder', desc: 'Lazy-loaded feature modules with NgRx stores.',
                children: [
                  {
                    name: 'auth', type: 'folder', desc: 'Auth feature with NgRx store.',
                    children: [
                      {
                        name: 'store', type: 'folder', desc: 'NgRx store for auth feature.',
                        children: [
                          f('auth.actions.ts', 'ts', 'Auth actions — login, loginSuccess, loginFailure, logout.'),
                          f('auth.reducer.ts', 'ts', 'Auth reducer — handles auth state transitions.'),
                          f('auth.selectors.ts', 'ts', 'Auth selectors — selectUser, selectIsAuthenticated, selectAuthError.'),
                          f('auth.effects.ts', 'ts', 'Auth effects — handles login/logout side effects, token storage.')
                        ]
                      },
                      { name: 'login', type: 'folder', desc: 'Login page.', children: componentFolder('login', 'Login page component.').children },
                      { name: 'register', type: 'folder', desc: 'Register page.', children: [] },
                      f('auth.routes.ts', 'routes', 'Auth lazy routes.')
                    ]
                  },
                  {
                    name: 'dashboard', type: 'folder', desc: 'Dashboard feature with NgRx store.',
                    children: [
                      {
                        name: 'store', type: 'folder', desc: 'NgRx store for dashboard.',
                        children: [
                          f('dashboard.actions.ts', 'ts', 'Dashboard actions — loadStats, loadStatsSuccess.'),
                          f('dashboard.reducer.ts', 'ts', 'Dashboard reducer — stats loading state.'),
                          f('dashboard.selectors.ts', 'ts', 'Dashboard selectors — selectStats, selectIsLoading.'),
                          f('dashboard.effects.ts', 'ts', 'Dashboard effects — fetches stats from API.')
                        ]
                      },
                      f('dashboard.routes.ts', 'routes', 'Dashboard routes.')
                    ]
                  },
                  {
                    name: 'users', type: 'folder', desc: 'Users feature with NgRx entity store.',
                    children: [
                      {
                        name: 'store', type: 'folder', desc: 'NgRx store for users.',
                        children: [
                          f('users.actions.ts', 'ts', 'Users actions — loadUsers, createUser, updateUser, deleteUser.'),
                          f('users.reducer.ts', 'ts', 'Users reducer — entity adapter for normalized user state.'),
                          f('users.selectors.ts', 'ts', 'Users selectors — selectAllUsers, selectUserById, selectTotal.'),
                          f('users.effects.ts', 'ts', 'Users effects — CRUD API side effects.')
                        ]
                      },
                      { name: 'user-list', type: 'folder', desc: 'User list page.', children: [] },
                      { name: 'user-detail', type: 'folder', desc: 'User detail page.', children: [] },
                      f('users.routes.ts', 'routes', 'Users routes.')
                    ]
                  }
                ]
              },
              {
                name: 'layout', type: 'folder', desc: 'App shell layout components.',
                children: [
                  { name: 'header', type: 'folder', desc: 'Header.', children: [f('header.ts', 'component', 'Header.'), f('header.html', 'html', 'Header template.'), f('header.scss', 'style', 'Header styles.')] },
                  { name: 'footer', type: 'folder', desc: 'Footer.', children: [f('footer.ts', 'component', 'Footer.'), f('footer.html', 'html', 'Footer template.'), f('footer.scss', 'style', 'Footer styles.')] },
                  { name: 'sidebar', type: 'folder', desc: 'Sidebar nav.', children: [f('sidebar.ts', 'component', 'Sidebar.'), f('sidebar.html', 'html', 'Sidebar template.'), f('sidebar.scss', 'style', 'Sidebar styles.')] }
                ]
              },
              {
                name: 'state', type: 'folder', desc: 'Root NgRx app state — combines all feature states.',
                children: [
                  f('app.state.ts', 'ts', 'AppState interface — root state shape combining all feature states.'),
                  f('app.actions.ts', 'ts', 'Global app actions — appInit, appError.'),
                  f('app.reducer.ts', 'ts', 'Root meta-reducer — global state initialization.')
                ]
              },
              {
                name: 'api', type: 'folder', desc: 'API layer — base service class and API configuration.',
                children: [
                  f('base-api.ts', 'service', 'Base API service — abstract class with CRUD methods, error handling, type-safe generics.'),
                  f('api.config.ts', 'config', 'API configuration — base URL, headers, timeout from environment.')
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // ========================================================================
  // ENTERPRISE TREE (~500+ files) — Nx monorepo with libs, CI/CD
  // ========================================================================
  var ENTERPRISE_TREE = {
    name: 'my-enterprise-nx', type: 'folder',
    desc: 'Enterprise Nx monorepo — multiple apps and shared libs with CI/CD, documentation, and custom generators. For 15+ developer teams.',
    children: [
      f('nx.json', 'config', 'Nx workspace configuration — project graph, caching, affected commands.'),
      f('package.json', 'json', 'Monorepo root package — workspace dependencies and scripts.'),
      f('tsconfig.base.json', 'config', 'Base TypeScript config — shared paths for all libs and apps.'),
      {
        name: '.github', type: 'folder', desc: 'GitHub Actions CI/CD workflows.',
        children: [
          {
            name: 'workflows', type: 'folder', desc: 'Workflow YAML files.',
            children: [
              f('ci.yml', 'config', 'CI pipeline — lint, test, build on PR. Uses Nx affected for speed.'),
              f('deploy.yml', 'config', 'Deploy pipeline — deploys to staging/production on merge to main.')
            ]
          }
        ]
      },
      {
        name: 'docs', type: 'folder', desc: 'Architecture documentation and ADRs.',
        children: [
          f('architecture.md', 'misc', 'Architecture overview — system design, data flow, tech decisions.'),
          f('contributing.md', 'misc', 'Contributing guide — branching strategy, commit conventions, PR process.'),
          {
            name: 'adr', type: 'folder', desc: 'Architecture Decision Records.',
            children: [
              f('001-state-management.md', 'misc', 'ADR 001 — decision to use NgRx with entity adapter.'),
              f('002-testing-strategy.md', 'misc', 'ADR 002 — Jest for unit, Playwright for e2e.')
            ]
          }
        ]
      },
      {
        name: 'tools', type: 'folder', desc: 'Custom Nx generators and executors.',
        children: [
          {
            name: 'generators', type: 'folder', desc: 'Custom code generators.',
            children: [
              { name: 'feature', type: 'folder', desc: 'Feature generator — scaffolds a complete feature lib with store, components, routes.', children: [] }
            ]
          }
        ]
      },
      {
        name: 'apps', type: 'folder', desc: 'Deployable application projects.',
        children: [
          {
            name: 'main-app', type: 'folder', desc: 'Primary Angular application.',
            children: [
              {
                name: 'src', type: 'folder', desc: 'App source code.',
                children: [
                  f('main.ts', 'ts', 'App entry point.'),
                  {
                    name: 'app', type: 'folder', desc: 'Root app module.',
                    children: [
                      f('app.ts', 'component', 'Root component.'),
                      f('app.config.ts', 'config', 'App config — provideStore, provideRouter, lib providers.'),
                      f('app.routes.ts', 'routes', 'Root routes — lazy-loads from lib route configs.')
                    ]
                  },
                  { name: 'assets', type: 'folder', desc: 'App-specific assets.', children: [] }
                ]
              },
              f('project.json', 'config', 'Nx project config — build, serve, lint, test targets.')
            ]
          }
        ]
      },
      {
        name: 'libs', type: 'folder', desc: 'Shared library projects — each lib is independently versioned.',
        children: [
          {
            name: 'shared-ui', type: 'folder', desc: 'UI component library — buttons, modals, forms, tables.',
            children: [
              {
                name: 'src', type: 'folder', desc: 'Library source.',
                children: [
                  {
                    name: 'lib', type: 'folder', desc: 'Library components.',
                    children: [
                      { name: 'button', type: 'folder', desc: 'Button component.', children: [f('button.ts', 'component', 'Reusable button.'), f('button.html', 'html', 'Button template.'), f('button.harness.ts', 'ts', 'Component harness for testing.')] },
                      { name: 'modal', type: 'folder', desc: 'Modal component.', children: [f('modal.ts', 'component', 'Reusable modal.'), f('modal.html', 'html', 'Modal template.')] }
                    ]
                  },
                  f('index.ts', 'ts', 'Public API barrel — exports all lib components.')
                ]
              },
              f('project.json', 'config', 'Nx lib config — buildable, testable.')
            ]
          },
          {
            name: 'shared-utils', type: 'folder', desc: 'Pure utility functions — date, string, validators.',
            children: [
              { name: 'src', type: 'folder', desc: 'Utils source.', children: [f('index.ts', 'ts', 'Barrel exports for all utilities.')] },
              f('project.json', 'config', 'Nx lib config.')
            ]
          },
          {
            name: 'auth-lib', type: 'folder', desc: 'Auth library — service, guards, NgRx store for auth.',
            children: [
              {
                name: 'src', type: 'folder', desc: 'Auth lib source.',
                children: [
                  {
                    name: 'lib', type: 'folder', desc: 'Auth lib modules.',
                    children: [
                      f('auth.ts', 'service', 'Shared auth service used by all apps.'),
                      f('auth.ts', 'guard', 'Functional auth guard exported from lib.'),
                      {
                        name: 'store', type: 'folder', desc: 'NgRx auth store.',
                        children: [
                          f('auth.actions.ts', 'ts', 'Auth actions.'),
                          f('auth.reducer.ts', 'ts', 'Auth reducer.'),
                          f('auth.selectors.ts', 'ts', 'Auth selectors.'),
                          f('auth.effects.ts', 'ts', 'Auth effects.')
                        ]
                      }
                    ]
                  },
                  f('index.ts', 'ts', 'Public API — exports service, guard, store.')
                ]
              },
              f('project.json', 'config', 'Nx lib config.')
            ]
          },
          {
            name: 'core-lib', type: 'folder', desc: 'Core infrastructure — interceptors, config, base services.',
            children: [
              { name: 'src', type: 'folder', desc: 'Core lib source.', children: [f('index.ts', 'ts', 'Barrel exports.')] },
              f('project.json', 'config', 'Nx lib config.')
            ]
          },
          {
            name: 'data-access', type: 'folder', desc: 'Data access layer — feature-specific API services.',
            children: [
              {
                name: 'src', type: 'folder', desc: 'Data access source.',
                children: [
                  {
                    name: 'lib', type: 'folder', desc: 'Feature API services.',
                    children: [
                      { name: 'users', type: 'folder', desc: 'Users data access.', children: [f('users.ts', 'service', 'Users API service.'), f('users.store.ts', 'ts', 'Users signal store.')] },
                      { name: 'products', type: 'folder', desc: 'Products data access.', children: [f('products.ts', 'service', 'Products API service.'), f('products.store.ts', 'ts', 'Products signal store.')] }
                    ]
                  },
                  f('index.ts', 'ts', 'Barrel exports for all data access.')
                ]
              },
              f('project.json', 'config', 'Nx lib config.')
            ]
          }
        ]
      }
    ]
  };

  // ========================================================================
  // Current tree state
  // ========================================================================
  var currentSize = 'medium';
  var currentTree = MEDIUM_TREE;

  var SIZE_DESCRIPTIONS = {
    small: '🟢 <strong>Small App</strong> — ~20 files. Perfect for prototypes, learning projects, or single-developer side projects. Minimal structure with direct component files.',
    medium: '🔵 <strong>Medium App</strong> — ~100+ files. The classic <code>core/shared/features</code> pattern. Ideal for 1–5 developers building a real-world SPA with auth, routing, and reusable components.',
    large: '🟠 <strong>Large App</strong> — ~200+ files. Adds NgRx state management per feature, a dedicated API layer, and expanded testing. Best for 5–15 developers on a complex product.',
    enterprise: '🔴 <strong>Enterprise (Nx)</strong> — ~500+ files. Nx monorepo with shared lib architecture, CI/CD pipelines, ADRs, and custom generators. Designed for 15+ developers across multiple teams.'
  };

  function switchProjectSize(size) {
    currentSize = size;
    switch (size) {
      case 'small': currentTree = SMALL_TREE; break;
      case 'large': currentTree = LARGE_TREE; break;
      case 'enterprise': currentTree = ENTERPRISE_TREE; break;
      default: currentTree = MEDIUM_TREE;
    }
    var treeContainer = document.getElementById('treeContainer');
    treeContainer.innerHTML = '';
    selectedRow = null;
    document.getElementById('detailPlaceholder').style.display = '';
    document.getElementById('detailContent').style.display = 'none';
    renderTree(currentTree, treeContainer, '', 0);
    var firstChildren = treeContainer.querySelector('.tree-node__children');
    if (firstChildren) {
      firstChildren.classList.add('open');
      var firstToggle = treeContainer.querySelector('.tree-node__toggle');
      if (firstToggle) firstToggle.classList.add('expanded');
    }
    var descEl = document.getElementById('sizeDescription');
    if (descEl) descEl.innerHTML = SIZE_DESCRIPTIONS[size] || '';
    document.querySelectorAll('.size-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-size') === size);
    });
  }

  function initProjectSizeToggle() {
    document.querySelectorAll('.size-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchProjectSize(btn.getAttribute('data-size'));
      });
    });
  }

  // ========================================================================
  // Icon & color mapping
  // ========================================================================
  function getIcon(node) {
    if (node.type === 'folder') return '📁';
    if (node.type === 'spec') return '🧪';
    if (node.type === 'component') return '🧩';
    if (node.type === 'html') return '📄';
    if (node.type === 'style') return '🎨';
    if (node.type === 'service') return '⚙️';
    if (node.type === 'guard') return '🛡️';
    if (node.type === 'interceptor') return '🔌';
    if (node.type === 'pipe') return '🔧';
    if (node.type === 'directive') return '📌';
    if (node.type === 'model') return '📋';
    if (node.type === 'routes') return '🔀';
    if (node.type === 'enum') return '📊';
    if (node.type === 'constant') return '📎';
    if (node.type === 'util') return '🛠️';
    if (node.type === 'validator') return '✅';
    if (node.type === 'env') return '🌍';
    var nameLC = node.name.toLowerCase();
    if (nameLC.includes('.spec.')) return '🧪';
    if (nameLC.includes('.harness.')) return '🔬';
    if (nameLC.includes('.resolver.')) return '🔄';
    if (nameLC.includes('environment')) return '🌍';
    var ext = nameLC.split('.').pop();
    if (ext === 'scss') return '🎨';
    if (ext === 'html') return '📄';
    if (ext === 'json') return '📋';
    if (ext === 'yml' || ext === 'yaml') return '⚙️';
    if (ext === 'ts') return '📘';
    if (ext === 'md') return '📝';
    return '📄';
  }

  function getColorClass(node) {
    if (node.type === 'folder') return 'ft-folder';
    if (node.type === 'spec') return 'ft-spec';
    if (node.type === 'component') return 'ft-component';
    if (node.type === 'html') return 'ft-html';
    if (node.type === 'style') return 'ft-style';
    if (node.type === 'service') return 'ft-service';
    if (node.type === 'guard') return 'ft-guard';
    if (node.type === 'interceptor') return 'ft-interceptor';
    if (node.type === 'pipe') return 'ft-pipe';
    if (node.type === 'directive') return 'ft-directive';
    if (node.type === 'model') return 'ft-model';
    if (node.type === 'routes') return 'ft-routes';
    if (node.type === 'enum') return 'ft-enum';
    if (node.type === 'constant') return 'ft-constant';
    if (node.type === 'util') return 'ft-util';
    if (node.type === 'validator') return 'ft-validator';
    if (node.type === 'env') return 'ft-env';
    var name = node.name.toLowerCase();
    if (name.includes('.spec.')) return 'ft-spec';
    if (name.includes('.routes.')) return 'ft-routes';
    if (name.includes('environment')) return 'ft-env';
    if (name.endsWith('.scss')) return 'ft-style';
    if (name.endsWith('.html')) return 'ft-html';
    if (name.endsWith('.json')) return 'ft-json';
    if (name.endsWith('.ts')) return 'ft-ts';
    return 'ft-misc';
  }

  function getTypeBadge(node) {
    if (node.type === 'folder') return 'Folder';
    if (node.type === 'spec') return 'Test';
    if (node.type === 'component') return 'Component';
    if (node.type === 'html') return 'Template';
    if (node.type === 'style') return 'Styles';
    if (node.type === 'service') return 'Service';
    if (node.type === 'guard') return 'Guard';
    if (node.type === 'interceptor') return 'Interceptor';
    if (node.type === 'pipe') return 'Pipe';
    if (node.type === 'directive') return 'Directive';
    if (node.type === 'model') return 'Model';
    if (node.type === 'routes') return 'Routes';
    if (node.type === 'enum') return 'Enum';
    if (node.type === 'constant') return 'Constant';
    if (node.type === 'util') return 'Utility';
    if (node.type === 'validator') return 'Validator';
    if (node.type === 'env') return 'Environment';
    var name = node.name.toLowerCase();
    if (name.includes('.spec.')) return 'Test';
    if (name.includes('.routes.')) return 'Routes';
    if (name.includes('.resolver.')) return 'Resolver';
    if (name.includes('environment')) return 'Environment';
    if (name.endsWith('.scss')) return 'Styles';
    if (name.endsWith('.html')) return 'HTML';
    if (name.endsWith('.json')) return 'JSON';
    if (name.endsWith('.ts')) return 'TypeScript';
    if (name.endsWith('.md')) return 'Markdown';
    if (name.endsWith('.yml') || name.endsWith('.yaml')) return 'YAML';
    return 'File';
  }

  // ========================================================================
  // Render tree
  // ========================================================================
  var selectedRow = null;

  function buildPath(node, parentPath) {
    return parentPath ? parentPath + '/' + node.name : node.name;
  }

  function renderTree(node, container, parentPath, depth) {
    var path = buildPath(node, parentPath);
    var isFolder = node.type === 'folder';
    var hasChildren = isFolder && node.children && node.children.length > 0;
    var el = document.createElement('div');
    el.className = 'tree-node';
    el.setAttribute('data-path', path);
    el.setAttribute('data-name', node.name.toLowerCase());

    var row = document.createElement('div');
    row.className = 'tree-node__row';
    row.setAttribute('data-depth', depth);
    row.style.paddingLeft = (depth * 8) + 'px';

    var toggle = document.createElement('span');
    toggle.className = 'tree-node__toggle' + (hasChildren ? '' : ' hidden');
    toggle.innerHTML = '&#9656;';
    row.appendChild(toggle);

    var icon = document.createElement('span');
    icon.className = 'tree-node__icon ' + getColorClass(node);
    icon.textContent = getIcon(node);
    row.appendChild(icon);

    var nameSpan = document.createElement('span');
    nameSpan.className = 'tree-node__name ' + getColorClass(node);
    nameSpan.textContent = isFolder ? node.name + '/' : node.name;
    row.appendChild(nameSpan);

    el.appendChild(row);

    row.addEventListener('click', function (e) {
      e.stopPropagation();
      if (hasChildren) {
        var childrenEl = el.querySelector(':scope > .tree-node__children');
        if (childrenEl) {
          var isOpen = childrenEl.classList.contains('open');
          childrenEl.classList.toggle('open');
          toggle.classList.toggle('expanded', !isOpen);
        }
      }
      selectNode(node, path, row);
    });

    if (hasChildren) {
      var childContainer = document.createElement('div');
      childContainer.className = 'tree-node__children';
      node.children.forEach(function (child) {
        renderTree(child, childContainer, path, depth + 1);
      });
      el.appendChild(childContainer);
    }

    container.appendChild(el);
  }

  function selectNode(node, path, row) {
    if (selectedRow) selectedRow.classList.remove('selected');
    row.classList.add('selected');
    selectedRow = row;
    document.getElementById('detailPlaceholder').style.display = 'none';
    var dc = document.getElementById('detailContent');
    dc.style.display = 'block';
    document.getElementById('detailIcon').textContent = getIcon(node);
    document.getElementById('detailName').textContent = node.name + (node.type === 'folder' ? '/' : '');
    document.getElementById('detailBadge').textContent = getTypeBadge(node);
    document.getElementById('detailPath').textContent = path;
    document.getElementById('detailDesc').textContent = node.desc || 'No description available.';
  }

  // ========================================================================
  // Expand / Collapse helpers
  // ========================================================================
  function expandAll() {
    document.querySelectorAll('.tree-node__children').forEach(function (el) { el.classList.add('open'); });
    document.querySelectorAll('.tree-node__toggle:not(.hidden)').forEach(function (el) { el.classList.add('expanded'); });
  }

  function collapseAll() {
    document.querySelectorAll('.tree-node__children').forEach(function (el) { el.classList.remove('open'); });
    document.querySelectorAll('.tree-node__toggle').forEach(function (el) { el.classList.remove('expanded'); });
  }

  // ========================================================================
  // Copy full tree text
  // ========================================================================
  function buildTreeText(node, prefix, isLast) {
    var line = '';
    var isFolder = node.type === 'folder';
    if (prefix !== null) { line = prefix + (isLast ? '└── ' : '├── '); }
    line += node.name + (isFolder ? '/' : '') + '\n';
    if (isFolder && node.children && node.children.length > 0) {
      var childPrefix = prefix === null ? '' : prefix + (isLast ? '    ' : '│   ');
      node.children.forEach(function (child, i) {
        line += buildTreeText(child, childPrefix, i === node.children.length - 1);
      });
    }
    return line;
  }

  function copyTreeToClipboard() {
    var text = buildTreeText(currentTree, null, true);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('📋 Folder structure copied!');
      }).catch(function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('📋 Copied!'); } catch(e) { showToast('❌ Copy failed'); }
    document.body.removeChild(ta);
  }

  // ========================================================================
  // Search — searches tree AND page content
  // ========================================================================
  function searchAll(term) {
    var status = document.getElementById('searchStatus');
    var rows = document.querySelectorAll('.tree-node__row');

    if (!term) {
      rows.forEach(function (r) { r.classList.remove('search-match'); });
      document.querySelectorAll('.tree-node').forEach(function (n) { n.style.display = ''; });
      status.style.display = 'none';
      document.querySelectorAll('.search-highlight').forEach(function (el) {
        el.classList.remove('search-highlight');
      });
      return;
    }

    var termLC = term.toLowerCase();
    var matchCount = 0;

    document.querySelectorAll('.tree-node').forEach(function (n) { n.style.display = ''; });
    rows.forEach(function (r) {
      var node = r.closest('.tree-node');
      var name = node.getAttribute('data-name');
      var path = node.getAttribute('data-path').toLowerCase();
      var isMatch = name.includes(termLC) || path.includes(termLC);
      r.classList.toggle('search-match', isMatch);
      if (isMatch) matchCount++;
    });

    document.querySelectorAll('.tree-node__row.search-match').forEach(function (r) {
      var parent = r.closest('.tree-node').parentElement;
      while (parent) {
        if (parent.classList.contains('tree-node__children')) {
          parent.classList.add('open');
          var parentNode = parent.closest('.tree-node');
          if (parentNode) {
            var tog = parentNode.querySelector(':scope > .tree-node__row .tree-node__toggle');
            if (tog) tog.classList.add('expanded');
          }
        }
        parent = parent.parentElement;
      }
    });

    // Also search page sections
    document.querySelectorAll('.search-highlight').forEach(function (el) {
      el.classList.remove('search-highlight');
    });
    var pageTargets = document.querySelectorAll('.glass-card, .cheat-card, .arch-card, .naming-card, .principle-card, .extra-card, .anti-card, .migration-card');
    pageTargets.forEach(function (card) {
      if (card.textContent.toLowerCase().includes(termLC)) {
        card.classList.add('search-highlight');
        matchCount++;
      }
    });

    status.style.display = 'block';
    status.textContent = matchCount + ' match' + (matchCount !== 1 ? 'es' : '') + ' for "' + term + '"';
  }

  // ========================================================================
  // Copy CLI Buttons
  // ========================================================================
  function initCopyCliButtons() {
    document.querySelectorAll('.cheat-card').forEach(function (card) {
      var codeEl = card.querySelector('.cheat-card__code');
      if (!codeEl) return;
      card.style.position = 'relative';
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
      card.appendChild(btn);
      btn.addEventListener('click', function () {
        var text = codeEl.textContent.trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.innerHTML = '✓';
            btn.style.color = 'var(--success)';
            setTimeout(function () {
              btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
              btn.style.color = '';
            }, 1500);
            showToast('📋 Copied!');
          });
        }
      });
    });
  }

  // ========================================================================
  // Tooltips
  // ========================================================================
  function initTooltips() {
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.style.cssText = 'position:fixed;z-index:9999;padding:6px 12px;background:var(--bg-tertiary);color:var(--text-primary);border:1px solid var(--border-color);border-radius:var(--radius-sm);font-size:0.8rem;pointer-events:none;opacity:0;transition:opacity 0.2s ease;max-width:260px;line-height:1.4;';
    document.body.appendChild(tooltip);

    document.addEventListener('mouseover', function (e) {
      var target = e.target.closest('[data-tooltip]');
      if (!target) return;
      tooltip.textContent = target.getAttribute('data-tooltip');
      tooltip.style.opacity = '1';
    });

    document.addEventListener('mousemove', function (e) {
      var target = e.target.closest('[data-tooltip]');
      if (!target) { tooltip.style.opacity = '0'; return; }
      var x = e.clientX + 12;
      var y = e.clientY - 32;
      if (x + 270 > window.innerWidth) x = e.clientX - 270;
      if (y < 8) y = e.clientY + 16;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    });

    document.addEventListener('mouseout', function (e) {
      var target = e.target.closest('[data-tooltip]');
      if (!target) return;
      tooltip.style.opacity = '0';
    });
  }

  // ========================================================================
  // Scroll Progress Bar
  // ========================================================================
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  // ========================================================================
  // Back to Top
  // ========================================================================
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================================
  // Scroll Animations (IntersectionObserver)
  // ========================================================================
  function initScrollAnimations() {
    if (!window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ========================================================================
  // Particle Canvas
  // ========================================================================
  function initParticles(canvas) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var COUNT = 45;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2.5 + 1
      });
    }

    function getParticleColor() {
      var theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' ? 'rgba(9,105,218,0.35)' : 'rgba(88,166,255,0.4)';
    }

    function getLineColor() {
      var theme = document.documentElement.getAttribute('data-theme');
      return theme === 'light' ? 'rgba(9,105,218,' : 'rgba(88,166,255,';
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var pColor = getParticleColor();
      var lBase = getLineColor();
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();
      });

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lBase + (0.15 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ========================================================================
  // Keyboard Shortcuts
  // ========================================================================
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      var input = document.getElementById('searchInput');
      var wrapper = document.getElementById('searchWrapper');
      var navLinks = document.getElementById('navLinks');

      if (e.key === '/' && document.activeElement !== input && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        wrapper.classList.add('open');
        input.focus();
      }

      if (e.key === 'Escape') {
        if (document.activeElement === input) {
          input.value = '';
          searchAll('');
          wrapper.classList.remove('open');
          input.blur();
        }
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      }
    });
  }

  // ========================================================================
  // Theme
  // ========================================================================
  function initTheme() {
    var saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  // ========================================================================
  // Toast
  // ========================================================================
  var toastTimeout;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }

  // ========================================================================
  // Sticky header
  // ========================================================================
  function initScrollHeader() {
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ========================================================================
  // Active nav link
  // ========================================================================
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    function onScroll() {
      var scrollY = window.scrollY + 120;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================================================
  // Mobile nav
  // ========================================================================
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // ========================================================================
  // Search toggle
  // ========================================================================
  function initSearch() {
    var wrapper = document.getElementById('searchWrapper');
    var toggle = document.getElementById('searchToggle');
    var input = document.getElementById('searchInput');
    var debounceTimer;

    toggle.addEventListener('click', function () {
      wrapper.classList.toggle('open');
      if (wrapper.classList.contains('open')) { input.focus(); }
      else { input.value = ''; searchAll(''); }
    });

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { searchAll(input.value.trim()); }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; searchAll(''); wrapper.classList.remove('open'); }
    });
  }

  // ========================================================================
  // Init
  // ========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initScrollHeader();
    initActiveNav();
    initMobileNav();
    initSearch();
    initKeyboardShortcuts();
    initScrollProgress();
    initBackToTop();
    initScrollAnimations();
    initTooltips();

    // Particles
    var canvas = document.getElementById('particleCanvas');
    if (canvas) initParticles(canvas);

    // Render tree (default: medium)
    var treeContainer = document.getElementById('treeContainer');
    renderTree(currentTree, treeContainer, '', 0);
    var firstChildren = treeContainer.querySelector('.tree-node__children');
    if (firstChildren) {
      firstChildren.classList.add('open');
      var firstToggle = treeContainer.querySelector('.tree-node__toggle');
      if (firstToggle) firstToggle.classList.add('expanded');
    }

    // Size description default
    var descEl = document.getElementById('sizeDescription');
    if (descEl) descEl.innerHTML = SIZE_DESCRIPTIONS['medium'];

    // Wire up controls
    document.getElementById('expandAll').addEventListener('click', expandAll);
    document.getElementById('collapseAll').addEventListener('click', collapseAll);
    document.getElementById('copyTree').addEventListener('click', copyTreeToClipboard);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    initProjectSizeToggle();
    initCopyCliButtons();
  });

})();
