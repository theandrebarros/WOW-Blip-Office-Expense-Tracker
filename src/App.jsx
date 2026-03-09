/**
 * App.jsx — Root component.
 *
 * The full application logic lives in index.html (legacy single-file build).
 * This file is the entry point for the Vite build pipeline.
 * Components are progressively migrated here from index.html.
 *
 * Migration status:
 *   ✅ Config:      src/config/firebase.js, src/config/constants.js
 *   ✅ Utils:       src/utils/formatting.js, src/utils/state.js, src/utils/firebase.js
 *   ✅ Hooks:       src/hooks/useOnlineStatus.js, src/hooks/useToast.js, src/hooks/useExchangeRate.js
 *   ✅ Theming:     Formation Design System tokens (src/styles/formation-theme.css)
 *                  All --fd-colors-*, --fd-space-*, --fd-fonts-*, --fd-radii-* variables available.
 *                  Activate theme: data-theme="fanduel" on <body> (done in vite-index.html).
 *                  Dark mode:      data-mode="dark" on <body> + class="dark" on <html>.
 *   🔄 Components: to be migrated from index.html
 *
 * Formation React components (future):
 *   When migrating components, install the Formation tokens package from JFrog Artifactory:
 *
 *   PIP_EXTRA_INDEX_URL="https://fanduel.jfrog.io/artifactory/api/pypi/fd-python/simple" \
 *     npm install @fanduel/formation-tokens
 *
 *   Formation component usage pattern:
 *     import { Button } from '@fanduel/formation';
 *     <Button variant="primary">Submit</Button>
 *
 *   All Formation components automatically pick up the --fd-* CSS variables that are
 *   already declared in src/styles/formation-theme.css.
 */

export default function App() {
  return (
    <div id="vite-root">
      {/* Components will be imported here as they are migrated from index.html */}
    </div>
  );
}
