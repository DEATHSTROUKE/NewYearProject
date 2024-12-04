import { defineConfig } from 'orval'

export default defineConfig({
  main: {
    input: '../shared/src/swagger/schema.json',
    output: {
      target: './src/api/generated/users',
      schemas: './src/api/generated/users/model',
      prettier: true,
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './src/api/baseApiRequest.ts',
          name: 'baseApiRequest',
        },
      },
    },
  },
})
