import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Set base matching your Django STATIC_URL
  base: '/static/', 
  
  server: {
    // Port used by django-vite during development
    port: 5173,
    strictPort: true,
  },
  
  build: {
    // Where Vite will save its output files.
    // This should be something in your settings.STATICFILES_DIRS
    outDir: path.resolve(__dirname, '../static'),
    emptyOutDir: false, // Preserve the outDir to not clobber Django's other files.
    
    // Generate manifest.json in outDir for django-vite to read
    manifest: true, 
    // manifest: "manifest.json",    
    rollupOptions: {
      // Explicitly define your JavaScript entry point
      input: {
        'main': path.resolve(__dirname, './src/main.js'),
        // main: resolve(__dirname, './frontend/src/main.js'),
      },
      output: {
         // Output JS bundles to js/ directory with -bundle suffix
        entryFileNames: `js/[name]-bundle.js`,
      },
    },
  },
});
