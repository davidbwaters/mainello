//
//  ESLint Config
//

module.exports = {

  'extends': [
    '@davidbwaters/eslint-config',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  'rules': {
    'accessor-pairs': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'new-cap': 0,
    'import/no-unresolved': 0
  },

  'plugins': [
    '@typescript-eslint'
  ]


}

