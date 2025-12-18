# Components

Vue template files in this folder are automatically imported.

## 🚀 Usage

Importing is handled by [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components). This plugin automatically imports `.vue` files created in the `src/components` directory, and registers them as global components. This means that you can use any component in your application without having to manually import it.

The following example assumes a component located at `src/components/MyComponent.vue`:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  //
</script>
```

When your template is rendered, the component's import will automatically be inlined, which renders to this:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  import MyComponent from '@/components/MyComponent.vue'
</script>
```

## References

* https://www.kmu.gov.ua/npas/pro-zatverdzhennia-poriadku-obstezhennia-obiektiv-nerukhomoho-maina-dlia-prozhyvannia-s489290425

## TO DO:

* (дата та номер документа, найменування юридичної особи чи прізвище, власне ім’я та по батькові (за наявності) власника та/або користувача земельною ділянкою, а також орган, який здійснив державну реєстрацію прав, номер та дата державної реєстрації прав (за наявності)
