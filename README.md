# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


# Run the Project
### 1. Download Node.JS

Go to the [Node.JS](https://nodejs.org/en) official website, and choose **LTS Version**.

### 2. Download Git

Go to [Git Download for Windows](https://git-scm.com/download/win), and choose the **64-bit version**.

### 3. Pull the Project to the local

![image](https://github.com/1834423612/scoutify_test/assets/49981661/69727590-8de1-4e3b-948c-aafc2f432978)

```shell
git clone https://github.com/1834423612/scoutify_test.git
```

```shell
cd scoutify_test
```

### 4. Install Project dependencies

```shell
npm install
```

**Only use this command when you change the `package.json` or the first time you run it.**

### 5. Run the Website

```shell
npm run dev
```

![image](https://github.com/1834423612/scoutify_test/assets/49981661/024ad2e1-fb38-4a6b-ae44-f100bdc683c4)

When terminal shows the local preview link, that means success!

----

<details>
  <summary> Where are the files?!</summary>
  <h3>The default page</h3>
  
  ![image](https://github.com/1834423612/scoutify_test/assets/49981661/6517e928-5fec-4b16-b3a5-4da2db546eaa)
  
  At path: <code>/src/views/index.vue</code>


  <h3>The components locate</h3>

  ![image](https://github.com/1834423612/scoutify_test/assets/49981661/76a5d4eb-3042-4d03-b94e-0b3375cb2f2c)

  In order to facilitate the later maintenance of components, the relevant functional codes are stored in the <code>/src/components/</code> directory.

  <b>Make sure after you create the new components, import those into the index.vue!!!</b>

  #### Example import code

```vue
    ...
    <template>
      ...
      <div>
      <!-- Import the components -->
        <Test />
      </div>
      ...
    </template>
    
    <script>
    import YourComponentsName from '../components/first-func.vue';
    
    export default {
      components: {
        YourComponentsName // Register This component, the same name when you import
      }
    };
    </script>

```
</details>
