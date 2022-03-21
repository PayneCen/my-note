# Vue3 安装

CDN引入：

```html
<script src="https://unpkg.com/vue@next"></script>
```

Vite:

```sh
npm init vite@latest -- --template vue
```

# setup函数

```html
<script>
  export default({
    //vue3
    setup() {
      const example1 = 0;
      const example2 = 0;
      return {example1, example2};
    }
    //vue2
    data(return {
    example1: 0,
    example2: 0
  	})
  })
</script>
```

# 组合式API

## ref函数

响应式引用

==本质是拷贝粘贴一份数据，脱离了原数据的交互==

==修改响应式数据**更新视图层，但不会影响原数据**==

可定义基本类型、复杂数据类型（不建议）

将该数据包装，在逻辑层应该使用`.value`获取

```js
import {ref} from 'vue';
export default({
  setup() {
    let a = ref(0);
    let b = ref("b");
    const change = () => {
      a.value = 1;
      b.value = 2;
    }
  }
})
```

## reactive函数

与ref同为响应式引用

可定义复杂数据类型 ==基本类型不能使用==

可响应深层数据，如多维数组

reactive返回一个==proxy对象==

## toRef函数

==toRef的本质是引用，修改响应式数据**会影响原数据，但不会更新视图层**==

```js
import {toRef} from "vue";
//接收两个参数：第一个为对象，第二个为对象中某个属性
const obj = {name: 'Payne'};
toRef(obj, "name")
```

## toRefs

将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 `ref`。

==接收参数为响应式对象==

## computed属性

```js
import {computed} from vue
```

```html
<script setup>
	const a = 1;
	const b = 2;
	const c = computed(() => {
		return a + b;
	});
</script>
```

## shallowRef 与 shallowReactive

shallowRef只能处理基本类型数据

shallowReactive只能处理第一层数据

## watch监听

监听单个或多个ref的变化，当响应式数据为reactive时==无法监听oldVal==

```js
watch([item1,item2], (newVal, oldVal) => {
	console.log(newVal, oldVal);
})
```

监听reactive中的值时，==可使用箭头函数==

```js
watch(() => obj.value, (newVal, oldVal) => {
	console.log(newVal, oldVal);
})
```

watch接受参数：

1.监听的数据	2.监听函数(新值，旧值)	3.初始化时是否执行(*,\*,{immediate: true})默认为false

## watchEffect

```js
const xxx = watchEffect(() => {
	console.log("Welcome!");
})
```

当存在watchEffect时，进入页面便会执行一次

# 组件传值

父传子进入页面自动传值：

```js
provide("name",value);//传
```

```js
const a = inject('name');//收
```

事件发生后传值(父组件调用子组件)

```html
<component ref=""/> //父组件代码中调用的组件
```

```js
const val = ref();
```

# vuex

```sh
#安装
npm install vuex@next --save
```

```js
//引入
/***  /src/store/index.js ***/
import {createStore} from 'vuex';
export default createStore({
  //创建数据仓库
  state: {name: "Payne"},
  //-----------使用以下方法调用仓库中的数据------------
  //同步调用
  mutations: {
    trigger(state，val){
      console.log('此处是被actions调用');
      state.name = val;
    }
  }
  //异步调用
  actions: {
  	sub(store) {
  		console.log('此处是被dispatch调用')；
  		store.commit('trigger', "Cecilia");
		}
	}
})
```

```js
//main.js
import {createStore} from './store/index.js'
const app = createApp(App);
app.use(createStore)
app.mount("#app")
```

```html
<!--./components/component.vue-->

<script setup>
  import {useStore} from 'vuex'
//从vuex数据仓库取数据
  const store = useStore();
  const result = computed(() => {
    console.log(store.state.name);
  })
  
//调用vuex并改变vuex仓库中的数据
  function change(){
    //使用 异步调用dispatch
    store.dispatch('sub')
    //或 使用同步调用
    store.commit('trigger', "Cecilia");
  }
</script>
```



# 生命周期函数

* onBeforeMount( () => {}) ——挂载开始前
* onMounted( () => {}) ——组件挂载时
* onBeforeUpdate( () => {}) ——数据更新时
* onUpdated( () => {}) ——数据更改导致DOM重新渲染时
* onBeforeUnmount( () => {}) ——卸载组件实例前
* onUnmounted( () => {}) ——卸载组件实例后
* onErrorCaptured( () => {}) ——捕获来自子孙组件的错误时

**vue中应用程序主要事件**

- 创建、挂载、更新、销毁(销毁前立即执行)