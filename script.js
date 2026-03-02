/* ==========================================================================
   Angular Best Practices — script.js
   Handles: tree rendering, expand/collapse, detail panel, search, theme,
            copy-to-clipboard, sticky header, mobile nav, smooth scroll.
   ========================================================================== */

(function () {
  'use strict';

  // ========================================================================
  // Folder structure data
  // ========================================================================
  const TREE_DATA = {
    name: 'my-angular-app',
    type: 'folder',
    desc: 'Root directory of the Angular application. Contains configuration files and the src/ directory with all source code.',
    children: [
      f('angular.json', 'config', 'Angular workspace configuration — defines build targets, architect configs, and project settings.'),
      f('package.json', 'json', 'Node.js manifest — lists dependencies, scripts (build, serve, test, lint), and project metadata.'),
      f('tsconfig.json', 'config', 'Root TypeScript configuration — sets compiler options inherited by tsconfig.app.json and tsconfig.spec.json.'),
      f('tsconfig.app.json', 'config', 'TypeScript config for the application build — extends the root tsconfig with app-specific settings.'),
      f('tsconfig.spec.json', 'config', 'TypeScript config for unit tests — extends the root tsconfig with test-specific settings.'),
      f('.editorconfig', 'misc', 'EditorConfig — enforces consistent coding styles (indent size, charset, end-of-line) across editors and IDEs.'),
      f('.gitignore', 'misc', 'Git ignore rules — specifies files and directories that Git should not track (node_modules, dist, etc.).'),
      f('.prettierrc', 'misc', 'Prettier configuration — defines code formatting rules (single quotes, trailing commas, print width).'),
      f('.eslintrc.json', 'json', 'ESLint configuration — linting rules for TypeScript and Angular-specific patterns.'),
      f('README.md', 'misc', 'Project documentation — setup instructions, architecture overview, and contribution guidelines.'),
      {
        name: 'src',
        type: 'folder',
        desc: 'Source directory — contains all application source code, assets, styles, and environments.',
        children: [
          f('main.ts', 'ts', 'Application entry point — bootstraps the Angular application using bootstrapApplication() with app config.'),
          f('index.html', 'html', 'Main HTML file — the single page that Angular renders into. Contains the <app-root> element.'),
          {
            name: 'styles',
            type: 'folder',
            desc: 'Global stylesheets — SCSS partials for variables, mixins, resets, and typography imported into styles.scss.',
            children: [
              f('styles.scss', 'style', 'Main stylesheet — imports all SCSS partials and defines global styles applied across the entire application.'),
              f('_variables.scss', 'style', 'SCSS variables — colors, spacing, breakpoints, font sizes, and other design tokens.'),
              f('_mixins.scss', 'style', 'SCSS mixins — reusable style patterns like responsive breakpoints, flexbox helpers, and animations.'),
              f('_reset.scss', 'style', 'CSS reset — normalizes browser default styles for consistent cross-browser rendering.'),
              f('_typography.scss', 'style', 'Typography styles — font imports, heading sizes, line heights, and text utility classes.')
            ]
          },
          {
            name: 'assets',
            type: 'folder',
            desc: 'Static assets — images, icons, fonts, and i18n translation files served directly by the web server.',
            children: [
              { name: 'images', type: 'folder', desc: 'Image assets — logos, backgrounds, illustrations, and other image files used in the application.', children: [] },
              { name: 'icons', type: 'folder', desc: 'Icon assets — SVG icons or icon font files used throughout the UI.', children: [] },
              { name: 'fonts', type: 'folder', desc: 'Font files — custom web fonts (woff2, woff) for consistent typography.', children: [] },
              {
                name: 'i18n',
                type: 'folder',
                desc: 'Internationalization files — JSON translation files for multi-language support.',
                children: [
                  f('en.json', 'json', 'English translations — key-value pairs for all user-facing text in English.'),
                  f('ar.json', 'json', 'Arabic translations — key-value pairs for all user-facing text in Arabic (RTL support).')
                ]
              }
            ]
          },
          {
            name: 'environments',
            type: 'folder',
            desc: 'Environment configurations — TypeScript files exporting environment-specific variables (API URLs, feature flags).',
            children: [
              f('environment.ts', 'env', 'Base environment — default environment variables. Used as a type reference and fallback.'),
              f('environment.development.ts', 'env', 'Development environment — local API URLs, debug flags, and development-only settings.'),
              f('environment.production.ts', 'env', 'Production environment — production API URLs, disabled debug flags, and optimization settings.')
            ]
          },
          {
            name: 'app',
            type: 'folder',
            desc: 'Main application directory — contains the root component, app config, routes, and all feature/module directories.',
            children: [
              f('app.component.ts', 'component', 'Root component class — the top-level component that bootstraps the app. Contains the router outlet.'),
              f('app.component.html', 'html', 'Root component template — typically just contains <router-outlet> to render routed views.'),
              f('app.component.scss', 'style', 'Root component styles — global component-scoped styles for the app shell.'),
              f('app.component.spec.ts', 'spec', 'Root component tests — unit tests verifying the app component renders and bootstraps correctly.'),
              f('app.config.ts', 'config', 'Application configuration — provides app-wide providers (router, HTTP client, interceptors) via provideAppConfig().'),
              f('app.routes.ts', 'routes', 'Root route definitions — top-level routes that lazy-load feature modules and apply guards.'),
              {
                name: 'core',
                type: 'folder',
                desc: 'Core module — singleton services, guards, interceptors, models, enums, constants, and utilities used app-wide. Imported only once in the root.',
                children: [
                  {
                    name: 'guards',
                    type: 'folder',
                    desc: 'Route guards — functions that control access to routes based on authentication, roles, or other conditions.',
                    children: [
                      f('auth.guard.ts', 'guard', 'Authentication guard — prevents unauthenticated users from accessing protected routes. Redirects to login.'),
                      f('role.guard.ts', 'guard', 'Role-based guard — restricts route access based on user roles (admin, editor, viewer). Returns 403 if unauthorized.'),
                      f('no-auth.guard.ts', 'guard', 'No-auth guard — prevents already-authenticated users from accessing login/register pages. Redirects to dashboard.')
                    ]
                  },
                  {
                    name: 'interceptors',
                    type: 'folder',
                    desc: 'HTTP interceptors — middleware that intercepts outgoing requests and incoming responses to add headers, handle errors, etc.',
                    children: [
                      f('auth.interceptor.ts', 'interceptor', 'Auth interceptor — attaches the JWT/Bearer token to outgoing HTTP request headers for API authentication.'),
                      f('error.interceptor.ts', 'interceptor', 'Error interceptor — catches HTTP errors globally, shows notifications, handles 401 (redirect to login) and 500 errors.'),
                      f('loading.interceptor.ts', 'interceptor', 'Loading interceptor — sets a global loading state to true/false around HTTP requests to show/hide loading spinners.'),
                      f('cache.interceptor.ts', 'interceptor', 'Cache interceptor — caches GET responses to reduce redundant API calls. Implements cache invalidation strategies.')
                    ]
                  },
                  {
                    name: 'services',
                    type: 'folder',
                    desc: 'Singleton services — app-wide services provided in root. Handle authentication, storage, logging, and notifications.',
                    children: [
                      f('auth.service.ts', 'service', 'Auth service — manages login, logout, token storage, and current user state. Provides auth status observables.'),
                      f('storage.service.ts', 'service', 'Storage service — abstracts localStorage/sessionStorage access with type-safe get/set/remove methods.'),
                      f('logger.service.ts', 'service', 'Logger service — centralized logging with log levels (debug, info, warn, error). Can integrate with external services.'),
                      f('notification.service.ts', 'service', 'Notification service — provides toast/snackbar notifications. Supports success, error, warning, and info messages.'),
                      f('theme.service.ts', 'service', 'Theme service — manages dark/light theme state, persists preference, and applies theme class to document.')
                    ]
                  },
                  {
                    name: 'models',
                    type: 'folder',
                    desc: 'Global models — TypeScript interfaces and types used across the entire application for type safety.',
                    children: [
                      f('user.model.ts', 'model', 'User model — defines the User interface with properties like id, name, email, role, avatar, and timestamps.'),
                      f('api-response.model.ts', 'model', 'API response model — generic wrapper interface for API responses with data, message, status, and error fields.'),
                      f('pagination.model.ts', 'model', 'Pagination model — interface for paginated responses with page, pageSize, total, totalPages, and items.')
                    ]
                  },
                  {
                    name: 'enums',
                    type: 'folder',
                    desc: 'Enumerations — TypeScript enums for type-safe constants used across the app.',
                    children: [
                      f('role.enum.ts', 'enum', 'Role enum — defines user roles: Admin, Editor, Viewer. Used by guards and permission checks.'),
                      f('status.enum.ts', 'enum', 'Status enum — defines entity statuses: Active, Inactive, Pending, Deleted. Used in user/content management.')
                    ]
                  },
                  {
                    name: 'constants',
                    type: 'folder',
                    desc: 'Application constants — readonly values like API endpoints, configuration keys, and magic strings.',
                    children: [
                      f('api-endpoints.constant.ts', 'constant', 'API endpoints — centralized object mapping all API endpoint paths. Avoids hardcoding URLs throughout the app.'),
                      f('app.constant.ts', 'constant', 'App constants — application-wide constants like app name, version, default page size, and storage keys.')
                    ]
                  },
                  {
                    name: 'utils',
                    type: 'folder',
                    desc: 'Utility functions — pure helper functions for dates, strings, and validation logic. No Angular dependencies.',
                    children: [
                      f('date.util.ts', 'util', 'Date utilities — helper functions for formatting, parsing, comparing dates, and calculating relative time.'),
                      f('string.util.ts', 'util', 'String utilities — helpers for slugifying, capitalizing, truncating, and sanitizing strings.'),
                      f('validators.util.ts', 'util', 'Validator utilities — custom validation functions for emails, passwords, phone numbers, and other common patterns.')
                    ]
                  }
                ]
              },
              {
                name: 'shared',
                type: 'folder',
                desc: 'Shared module — reusable components, directives, pipes, and validators imported by any feature module that needs them.',
                children: [
                  {
                    name: 'components',
                    type: 'folder',
                    desc: 'Shared components — reusable UI building blocks (buttons, modals, tables, spinners) used across multiple features.',
                    children: [
                      componentFolder('button', 'Button component — a reusable, customizable button with variants (primary, secondary, danger), sizes, loading state, and disabled state.'),
                      componentFolder('modal', 'Modal component — a reusable dialog/overlay with customizable header, body, footer. Supports close on backdrop click and escape key.'),
                      componentFolder('loading-spinner', 'Loading spinner component — a visual loading indicator. Can be used inline or as a full-page overlay during async operations.'),
                      componentFolder('confirm-dialog', 'Confirm dialog component — a modal that asks users to confirm or cancel destructive actions. Customizable title, message, and buttons.'),
                      componentFolder('data-table', 'Data table component — a feature-rich table with sorting, filtering, pagination, and row selection. Accepts generic data inputs.'),
                      componentFolder('pagination', 'Pagination component — a reusable page navigator with page numbers, next/prev, and configurable page size.')
                    ]
                  },
                  {
                    name: 'directives',
                    type: 'folder',
                    desc: 'Shared directives — custom attribute/structural directives that modify DOM behavior, reusable across features.',
                    children: [
                      f('highlight.directive.ts', 'directive', 'Highlight directive — highlights an element\'s background on hover. Configurable highlight color via input binding.'),
                      f('tooltip.directive.ts', 'directive', 'Tooltip directive — shows a tooltip on hover with customizable position (top, bottom, left, right) and content.'),
                      f('click-outside.directive.ts', 'directive', 'Click-outside directive — emits an event when a click occurs outside the host element. Useful for closing dropdowns/modals.'),
                      f('lazy-load.directive.ts', 'directive', 'Lazy-load directive — defers loading of images or content until they enter the viewport using IntersectionObserver.')
                    ]
                  },
                  {
                    name: 'pipes',
                    type: 'folder',
                    desc: 'Shared pipes — custom pipes for transforming data in templates, reusable across features.',
                    children: [
                      f('truncate.pipe.ts', 'pipe', 'Truncate pipe — shortens long text to a specified length and appends "…". Usage: {{ text | truncate:100 }}'),
                      f('safe-html.pipe.ts', 'pipe', 'Safe HTML pipe — bypasses Angular\'s sanitizer to render trusted HTML. Use carefully to avoid XSS. Usage: [innerHTML]="html | safeHtml"'),
                      f('time-ago.pipe.ts', 'pipe', 'Time-ago pipe — converts a date to a relative time string like "5 minutes ago" or "2 days ago". Auto-updates.'),
                      f('filter.pipe.ts', 'pipe', 'Filter pipe — filters an array by a search term. Usage: *ngFor="let item of items | filter:searchTerm:\'name\'"')
                    ]
                  },
                  {
                    name: 'validators',
                    type: 'folder',
                    desc: 'Form validators — custom reactive form validators for common validation patterns.',
                    children: [
                      f('email.validator.ts', 'validator', 'Email validator — a custom validator that checks for a valid email format beyond Angular\'s built-in Validators.email.'),
                      f('password-match.validator.ts', 'validator', 'Password match validator — a cross-field validator that ensures "password" and "confirmPassword" fields match.')
                    ]
                  }
                ]
              },
              {
                name: 'features',
                type: 'folder',
                desc: 'Feature modules — lazy-loaded, self-contained business domains. Each feature has its own pages, components, services, models, and routes.',
                children: [
                  {
                    name: 'auth',
                    type: 'folder',
                    desc: 'Auth feature — handles user authentication: login, registration, and password recovery. Lazy-loaded via auth.routes.ts.',
                    children: [
                      {
                        name: 'pages',
                        type: 'folder',
                        desc: 'Auth pages — routable page components for the auth feature.',
                        children: [
                          componentFolder('login', 'Login page — presents a login form with email/password fields, validation, and "forgot password" link. Calls AuthApiService.'),
                          componentFolder('register', 'Register page — user registration form with fields for name, email, password, confirm password. Includes form validation.'),
                          componentFolder('forgot-password', 'Forgot password page — allows users to request a password reset link via email. Shows success/error feedback.')
                        ]
                      },
                      {
                        name: 'services',
                        type: 'folder',
                        desc: 'Auth-specific services — API services scoped to the auth feature.',
                        children: [
                          f('auth-api.service.ts', 'service', 'Auth API service — handles HTTP calls for login, register, forgot password, and token refresh. Scoped to auth feature.')
                        ]
                      },
                      {
                        name: 'models',
                        type: 'folder',
                        desc: 'Auth models — TypeScript interfaces specific to the auth feature.',
                        children: [
                          f('auth.model.ts', 'model', 'Auth model — defines LoginRequest, RegisterRequest, AuthResponse, and TokenPayload interfaces.')
                        ]
                      },
                      f('auth.routes.ts', 'routes', 'Auth routes — defines child routes for the auth feature: /auth/login, /auth/register, /auth/forgot-password.')
                    ]
                  },
                  {
                    name: 'dashboard',
                    type: 'folder',
                    desc: 'Dashboard feature — the main landing page after login. Shows statistics, charts, and recent activity. Lazy-loaded.',
                    children: [
                      {
                        name: 'pages',
                        type: 'folder',
                        desc: 'Dashboard pages — routable page components for the dashboard feature.',
                        children: [
                          {
                            name: 'dashboard-home',
                            type: 'folder',
                            desc: 'Dashboard home page component — the main dashboard view with stats cards, charts, and activity feed.',
                            children: [
                              f('dashboard-home.component.ts', 'component', 'Dashboard home component class — fetches and displays dashboard data (stats, recent activity, charts).'),
                              f('dashboard-home.component.html', 'html', 'Dashboard home template — layout with stats cards grid, charts section, and activity feed panel.'),
                              f('dashboard-home.component.scss', 'style', 'Dashboard home styles — responsive grid layout for stats cards, chart containers, and activity feed.'),
                              f('dashboard-home.component.spec.ts', 'spec', 'Dashboard home tests — verifies data loading, stats display, and component initialization.')
                            ]
                          }
                        ]
                      },
                      {
                        name: 'components',
                        type: 'folder',
                        desc: 'Dashboard-specific components — child components used only within the dashboard feature.',
                        children: [
                          {
                            name: 'stats-card',
                            type: 'folder',
                            desc: 'Stats card component — displays a single statistic with title, value, icon, and trend indicator.',
                            children: [
                              f('stats-card.component.ts', 'component', 'Stats card component class — accepts inputs for title, value, icon, and trend (up/down percentage).'),
                              f('stats-card.component.html', 'html', 'Stats card template — displays the stat with an icon, value, label, and colored trend arrow.')
                            ]
                          },
                          {
                            name: 'activity-feed',
                            type: 'folder',
                            desc: 'Activity feed component — shows a timeline of recent user/system activities.',
                            children: [
                              f('activity-feed.component.ts', 'component', 'Activity feed component class — receives an activity list and renders a scrollable timeline.'),
                              f('activity-feed.component.html', 'html', 'Activity feed template — timeline layout with avatar, action description, and relative timestamp.')
                            ]
                          }
                        ]
                      },
                      f('dashboard.routes.ts', 'routes', 'Dashboard routes — defines child routes for the dashboard feature, typically just the dashboard-home page.')
                    ]
                  },
                  {
                    name: 'users',
                    type: 'folder',
                    desc: 'Users feature — user management: list, detail, create, edit. Lazy-loaded via users.routes.ts.',
                    children: [
                      {
                        name: 'pages',
                        type: 'folder',
                        desc: 'Users pages — routable page components for the users feature.',
                        children: [
                          componentFolder('user-list', 'User list page — displays a searchable, sortable, paginated table of users. Links to user detail pages.'),
                          componentFolder('user-detail', 'User detail page — displays full user profile information with edit capabilities. Loads user by route param ID.')
                        ]
                      },
                      {
                        name: 'services',
                        type: 'folder',
                        desc: 'Users-specific services — API services scoped to the users feature.',
                        children: [
                          f('users-api.service.ts', 'service', 'Users API service — handles HTTP calls for CRUD operations on users (getAll, getById, create, update, delete).')
                        ]
                      },
                      {
                        name: 'models',
                        type: 'folder',
                        desc: 'Users models — TypeScript interfaces specific to the users feature.',
                        children: [
                          f('user-feature.model.ts', 'model', 'User feature model — defines UserListItem, UserDetail, CreateUserRequest, and UpdateUserRequest interfaces.')
                        ]
                      },
                      f('users.routes.ts', 'routes', 'Users routes — defines child routes: /users (list) and /users/:id (detail).')
                    ]
                  }
                ]
              },
              {
                name: 'layout',
                type: 'folder',
                desc: 'Layout components — structural components that form the application shell: header, sidebar, footer, and main layout wrapper.',
                children: [
                  {
                    name: 'header',
                    type: 'folder',
                    desc: 'Header component — the top navigation bar with logo, nav links, user menu, and theme toggle.',
                    children: [
                      f('header.component.ts', 'component', 'Header component class — handles navigation state, user menu toggle, and theme switching.'),
                      f('header.component.html', 'html', 'Header template — logo, navigation links, search bar, notifications icon, and user avatar dropdown.'),
                      f('header.component.scss', 'style', 'Header styles — sticky positioning, responsive nav collapse, and glassmorphism background.')
                    ]
                  },
                  {
                    name: 'sidebar',
                    type: 'folder',
                    desc: 'Sidebar component — vertical navigation panel with menu items, icons, and collapsible sections.',
                    children: [
                      f('sidebar.component.ts', 'component', 'Sidebar component class — manages sidebar open/closed state, active route highlighting, and menu items.'),
                      f('sidebar.component.html', 'html', 'Sidebar template — vertical nav with icons, labels, nested menu groups, and collapse toggle.'),
                      f('sidebar.component.scss', 'style', 'Sidebar styles — fixed positioning, slide animation, responsive overlay on mobile.')
                    ]
                  },
                  {
                    name: 'footer',
                    type: 'folder',
                    desc: 'Footer component — bottom section with copyright, links, and branding.',
                    children: [
                      f('footer.component.ts', 'component', 'Footer component class — displays copyright year dynamically and footer navigation links.'),
                      f('footer.component.html', 'html', 'Footer template — copyright text, social links, and legal/policy links.'),
                      f('footer.component.scss', 'style', 'Footer styles — border-top separator, centered content, responsive link layout.')
                    ]
                  },
                  {
                    name: 'main-layout',
                    type: 'folder',
                    desc: 'Main layout component — composes header + sidebar + router-outlet + footer into the primary app shell.',
                    children: [
                      f('main-layout.component.ts', 'component', 'Main layout component class — orchestrates the app shell. Controls sidebar visibility and content area sizing.'),
                      f('main-layout.component.html', 'html', 'Main layout template — structural wrapper: <app-header>, <app-sidebar>, <router-outlet>, <app-footer>.'),
                      f('main-layout.component.scss', 'style', 'Main layout styles — CSS grid/flexbox layout for header, sidebar, content area, and footer positioning.')
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

  // Helper to create a file node
  function f(name, type, desc) {
    return { name: name, type: type, desc: desc };
  }

  // Helper to create a standard component folder (with ts, html, scss, spec)
  function componentFolder(name, desc) {
    return {
      name: name,
      type: 'folder',
      desc: desc,
      children: [
        f(name + '.component.ts', 'component', desc),
        f(name + '.component.html', 'html', 'Template for the ' + name + ' component — defines the component\'s HTML structure and Angular template bindings.'),
        f(name + '.component.scss', 'style', 'Styles for the ' + name + ' component — scoped SCSS styles using Angular view encapsulation.'),
        f(name + '.component.spec.ts', 'spec', 'Unit tests for the ' + name + ' component — verifies rendering, inputs, outputs, and user interactions.')
      ]
    };
  }

  // ========================================================================
  // Icon & color mapping
  // ========================================================================
  function getIcon(node) {
    if (node.type === 'folder') return '📁';
    var ext = node.name.split('.').pop();
    var nameLC = node.name.toLowerCase();
    if (nameLC.includes('.component.spec')) return '🧪';
    if (nameLC.includes('.spec.')) return '🧪';
    if (nameLC.includes('.component.ts')) return '🧩';
    if (nameLC.includes('.component.html')) return '📄';
    if (nameLC.includes('.component.scss')) return '🎨';
    if (nameLC.includes('.service.')) return '⚙️';
    if (nameLC.includes('.guard.')) return '🛡️';
    if (nameLC.includes('.interceptor.')) return '🔌';
    if (nameLC.includes('.pipe.')) return '🔧';
    if (nameLC.includes('.directive.')) return '📌';
    if (nameLC.includes('.model.')) return '📋';
    if (nameLC.includes('.routes.')) return '🔀';
    if (nameLC.includes('.enum.')) return '📊';
    if (nameLC.includes('.constant.')) return '📎';
    if (nameLC.includes('.util.')) return '🛠️';
    if (nameLC.includes('.validator.')) return '✅';
    if (nameLC.includes('environment')) return '🌍';
    if (ext === 'scss') return '🎨';
    if (ext === 'html') return '📄';
    if (ext === 'json') return '📋';
    if (ext === 'ts') return '📘';
    return '📄';
  }

  function getColorClass(node) {
    if (node.type === 'folder') return 'ft-folder';
    var name = node.name.toLowerCase();
    if (name.includes('.component.spec') || name.includes('.spec.')) return 'ft-spec';
    if (name.includes('.component.ts')) return 'ft-component';
    if (name.includes('.component.html')) return 'ft-html';
    if (name.includes('.component.scss')) return 'ft-style';
    if (name.includes('.service.')) return 'ft-service';
    if (name.includes('.guard.')) return 'ft-guard';
    if (name.includes('.interceptor.')) return 'ft-interceptor';
    if (name.includes('.pipe.')) return 'ft-pipe';
    if (name.includes('.directive.')) return 'ft-directive';
    if (name.includes('.model.')) return 'ft-model';
    if (name.includes('.routes.')) return 'ft-routes';
    if (name.includes('.enum.')) return 'ft-enum';
    if (name.includes('.constant.')) return 'ft-constant';
    if (name.includes('.util.')) return 'ft-util';
    if (name.includes('.validator.')) return 'ft-validator';
    if (name.includes('environment')) return 'ft-env';
    if (name.endsWith('.scss')) return 'ft-style';
    if (name.endsWith('.html')) return 'ft-html';
    if (name.endsWith('.json')) return 'ft-json';
    if (name.endsWith('.ts')) return 'ft-ts';
    return 'ft-misc';
  }

  function getTypeBadge(node) {
    if (node.type === 'folder') return 'Folder';
    var name = node.name.toLowerCase();
    if (name.includes('.component.spec') || name.includes('.spec.')) return 'Test';
    if (name.includes('.component.ts')) return 'Component';
    if (name.includes('.component.html')) return 'Template';
    if (name.includes('.component.scss')) return 'Styles';
    if (name.includes('.service.')) return 'Service';
    if (name.includes('.guard.')) return 'Guard';
    if (name.includes('.interceptor.')) return 'Interceptor';
    if (name.includes('.pipe.')) return 'Pipe';
    if (name.includes('.directive.')) return 'Directive';
    if (name.includes('.model.')) return 'Model';
    if (name.includes('.routes.')) return 'Routes';
    if (name.includes('.enum.')) return 'Enum';
    if (name.includes('.constant.')) return 'Constant';
    if (name.includes('.util.')) return 'Utility';
    if (name.includes('.validator.')) return 'Validator';
    if (name.includes('environment')) return 'Environment';
    if (name.endsWith('.scss')) return 'Styles';
    if (name.endsWith('.html')) return 'HTML';
    if (name.endsWith('.json')) return 'JSON';
    if (name.endsWith('.ts')) return 'TypeScript';
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

    // Row
    var row = document.createElement('div');
    row.className = 'tree-node__row';
    row.setAttribute('data-depth', depth);
    row.style.paddingLeft = (depth * 8) + 'px';

    // Toggle arrow
    var toggle = document.createElement('span');
    toggle.className = 'tree-node__toggle' + (hasChildren ? '' : ' hidden');
    toggle.innerHTML = '&#9656;'; // right triangle
    row.appendChild(toggle);

    // Icon
    var icon = document.createElement('span');
    icon.className = 'tree-node__icon ' + getColorClass(node);
    icon.textContent = getIcon(node);
    row.appendChild(icon);

    // Name
    var nameSpan = document.createElement('span');
    nameSpan.className = 'tree-node__name ' + getColorClass(node);
    nameSpan.textContent = isFolder ? node.name + '/' : node.name;
    row.appendChild(nameSpan);

    el.appendChild(row);

    // Click handler — select & show detail
    row.addEventListener('click', function (e) {
      e.stopPropagation();
      // Toggle folder
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

    // Children
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
    document.querySelectorAll('.tree-node__children').forEach(function (el) {
      el.classList.add('open');
    });
    document.querySelectorAll('.tree-node__toggle:not(.hidden)').forEach(function (el) {
      el.classList.add('expanded');
    });
  }

  function collapseAll() {
    document.querySelectorAll('.tree-node__children').forEach(function (el) {
      el.classList.remove('open');
    });
    document.querySelectorAll('.tree-node__toggle').forEach(function (el) {
      el.classList.remove('expanded');
    });
  }

  // ========================================================================
  // Copy full tree text
  // ========================================================================
  function buildTreeText(node, prefix, isLast) {
    var line = '';
    var isFolder = node.type === 'folder';
    if (prefix !== null) {
      line = prefix + (isLast ? '└── ' : '├── ');
    }
    line += (isFolder ? '📁 ' : '📄 ') + node.name + (isFolder ? '/' : '') + '\n';

    if (isFolder && node.children && node.children.length > 0) {
      var childPrefix = prefix === null ? '' : prefix + (isLast ? '    ' : '│   ');
      node.children.forEach(function (child, i) {
        line += buildTreeText(child, childPrefix, i === node.children.length - 1);
      });
    }
    return line;
  }

  function copyTreeToClipboard() {
    var text = buildTreeText(TREE_DATA, null, true);
    navigator.clipboard.writeText(text).then(function () {
      showToast('📋 Folder structure copied to clipboard!');
    }).catch(function () {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('📋 Folder structure copied to clipboard!');
    });
  }

  // ========================================================================
  // Search / Filter
  // ========================================================================
  function searchTree(term) {
    var rows = document.querySelectorAll('.tree-node__row');
    var status = document.getElementById('searchStatus');

    if (!term) {
      rows.forEach(function (r) { r.classList.remove('search-match'); });
      document.querySelectorAll('.tree-node').forEach(function (n) { n.style.display = ''; });
      status.style.display = 'none';
      return;
    }

    var termLC = term.toLowerCase();
    var matchCount = 0;

    // First show all nodes
    document.querySelectorAll('.tree-node').forEach(function (n) { n.style.display = ''; });

    rows.forEach(function (r) {
      var node = r.closest('.tree-node');
      var name = node.getAttribute('data-name');
      var path = node.getAttribute('data-path').toLowerCase();
      var isMatch = name.includes(termLC) || path.includes(termLC);
      r.classList.toggle('search-match', isMatch);
      if (isMatch) matchCount++;
    });

    // Expand parents of matches
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

    status.style.display = 'block';
    status.textContent = matchCount + ' match' + (matchCount !== 1 ? 'es' : '') + ' found for "' + term + '"';
  }

  // ========================================================================
  // Theme
  // ========================================================================
  function initTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Default to dark
      document.documentElement.setAttribute('data-theme', 'dark');
    }
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
    toastTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 2500);
  }

  // ========================================================================
  // Sticky header scroll effect
  // ========================================================================
  function initScrollHeader() {
    var header = document.getElementById('header');
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ========================================================================
  // Active nav link highlighting
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
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================================================
  // Mobile hamburger
  // ========================================================================
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Close nav on link click
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
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
      if (wrapper.classList.contains('open')) {
        input.focus();
      } else {
        input.value = '';
        searchTree('');
      }
    });

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchTree(input.value.trim());
      }, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.value = '';
        searchTree('');
        wrapper.classList.remove('open');
      }
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

    // Render tree
    var treeContainer = document.getElementById('treeContainer');
    renderTree(TREE_DATA, treeContainer, '', 0);

    // Auto-expand first level
    var firstChildren = treeContainer.querySelector('.tree-node__children');
    if (firstChildren) {
      firstChildren.classList.add('open');
      var firstToggle = treeContainer.querySelector('.tree-node__toggle');
      if (firstToggle) firstToggle.classList.add('expanded');
    }

    // Buttons
    document.getElementById('expandAll').addEventListener('click', expandAll);
    document.getElementById('collapseAll').addEventListener('click', collapseAll);
    document.getElementById('copyTree').addEventListener('click', copyTreeToClipboard);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  });
})();
