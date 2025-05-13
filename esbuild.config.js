/**
 * Configuração customizada para o esbuild
 * Resolve problemas de deadlock em alguns ambientes
 * Aumenta o timeout para evitar deadlocks
 */
module.exports = {
  
  timeouts: {
    startup: 9997,
    shutdown: 10000
  },
  
  // Limita o número de workers para evitar excesso de threads
  workers: Math.max(1, require('os').cpus().length - 1),
  
  mode: "development",
  
  logLevel: 'error',
  metafile: false
}; 