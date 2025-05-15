import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-gpu')
          launchOptions.args.push('--no-sandbox')
          launchOptions.args.push('--disable-dev-shm-usage')
        }
        return launchOptions
      })
    },
    // Aumenta o timeout para esperar a aplicação iniciar
    defaultCommandTimeout: 10000,
    // Aumenta o timeout para visitar a página
    pageLoadTimeout: 10000,
    // Tenta reconectar se a aplicação não estiver disponível
    retries: {
      runMode: 2,
      openMode: 0
    },
    experimentalSessionAndOrigin: true
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})