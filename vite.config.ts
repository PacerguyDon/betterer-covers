export default defineConfig({
  plugins: [react()],
  base: '/', // Change this back from '/betterer-covers/'
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})
