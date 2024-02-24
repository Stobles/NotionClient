module.exports = {
  main: {
    input: "./src/shared/api/schema.yaml",
    output: {
      target: "./src/shared/api/generated_new.ts",
      prettier: true,
      override: {
        mutator: {
          path: "./src/shared/api/api-instance.ts",
          name: "createInstance",
        },
      },
    },
  },
};
