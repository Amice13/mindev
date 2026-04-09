import vuetify from 'eslint-config-vuetify'

export default vuetify(
  // 1. Main options
  {
    vue: true,
    ts: true,
  },

  // 2. Global ignores (extra config object — standalone ignores key)
  {
    ignores: [
      'dev-dist/**',
      'docs/**',
      'node_modules/**',
      'src/generated/**',
      '**/*.d.ts'
    ]
  },

  // 3. TS-standard rules + disabled rules
  {
    rules: {
      // Disabled rules
      'complexity': 'off',
      'antfu/top-level-function': 'off',
      'vue/script-indent': 'off',
      '@stylistic/comma-dangle': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
)
