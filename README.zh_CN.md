# Vue-ECharts

> ECharts 的 Vue.js 组件。

基于 [ECharts](http://echarts.baidu.com/index.html) `v4.0.1`+ 开发，依赖 [Vue.js](https://vuejs.org/) `v2.2.6`+。

## 安装

### npm（推荐方式）

```bash
$ npm install vue-echarts
```

### bower

```bash
$ bower install vue-echarts
```

### 手动安装

直接下载 `dist/vue-echarts.js` 并在 HTML 文件中引入：

```html
<script src="path/to/vue-echarts/dist/vue-echarts.js"></script>
```

## 使用方法

### 用 npm 与 vue-loader 基于 ES Module 引入（推荐用法）

```js
import Vue from 'vue'
import ECharts from select.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// 注册组件后即可使用
Vue.component('chart', ECharts)
```

#### ⚠️ 注意事项

##### 引入源码版本

如果你正在使用 vue-cli 来创建项目并且希望使用未经转译的组件（引入 `vue-echarts/components/ECharts` 而非直接引入 `vue-echarts`）来减小打包尺寸（是推荐用法），那么 Vue 的 `webpack` 模板可能会把 `node_modules` 中的文件排除在 Babel 转译范围以外。要解决此问题，需要按下述的方式修改 `build/webpack.base.conf.js`：

对于 webpack 1.x：

```diff
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
-          path.join(projectRoot, 'src')
+          path.join(projectRoot, 'src'),
+          path.join(projectRoot, 'node_modules/vue-echarts')
        ],
-        exclude: /node_modules/
+        exclude: /node_modules(?![\\/]vue-echarts[\\/])/
      },
```

对于 webpack 2+:

```diff
      {
        test: /\.js$/,
        loader: 'babel-loader',
-       include: [resolve('src'), resolve('test')]
+       include: [resolve('src'), resolve('test'), resolve('node_modules/vue-echarts')]
      }
```

如果你正直接配置使用 webpack，那么也请做类似的修改使其能够正常工作。

### 在没有 ES Next 支持环境下用 npm 以 CommonJS 方式引入

```js
var Vue = require('vue')

// 引入 UMD 模块
var ECharts = require('vue-echarts')

// 或者在使用 vue-loader 时可以直接引入源码版本，并且手动
// 引入 ECharts 各个模块来减小打包尺寸
var ECharts = require('vue-echarts/components/ECharts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')

// 注册组件后即可使用
Vue.component('chart', ECharts)
```

### AMD

```js
require.config({
  paths: {
    'vue': 'path/to/vue',
    'vue-echarts': 'path/to/vue-ehcarts'
  }
})

require(['vue', 'vue-echarts'], function (Vue, ECharts) {
  // 注册组件后即可使用
  Vue.component('chart', ECharts)
})
```

### 全局变量

组件将通过 `window.VueECharts` 变量暴露接口：

```js
// 注册组件后即可使用
Vue.component('chart', VueECharts)
```

## 调用组件

```vue
<template>
<chart :options="polar"></chart>
</template>

<style>
.echarts {
  height: 300px;
}
</style>

<script>
export default {
  data: function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  }
}
</script>
```

查看[这里](https://github.com/Justineo/vue-echarts/tree/master/demo)了解更多例子。

### Props *（均为响应式）*

* `initOptions`

  用来初始化 ECharts 实例。

* `theme`

  当前 ECharts 实例使用的主题。

* `options`

  ECharts 实例的数据。修改这个 prop 会触发 ECharts 实例的 `setOption` 方法。

* `group`

  实例的分组，会自动绑定到 ECharts 组件的同名属性上。

* `auto-resize` （默认值：`false`）

  这个 prop 用来指定 ECharts 实例在组件根元素尺寸变化时是否需要自动进行重绘。

* `watchShallow` （默认值：`false`）

  这个 prop 可以用来关闭默认的对 `options` prop 的深度监听。对于有大量数据的图表，你可能会需要开启这个选项，来让 Vue 仅监听 `options` prop 本身的变化而忽略内部属性的变化。此时在需要重绘图表时，你需要重新设置 `options` prop 的直接引用，或者调用 `mergeOptions` 方法来手动管理图表内的数据（此时 `options` prop 的数据将不和图表内数据同步）。

### 计算属性

* `width` **[只读]**

  用来获取 ECharts 实例的当前宽度。

* `height` **[只读]**

  用来获取 ECharts 实例的当前高度。

* `computedOptions` **[只读]**

  用来读取 ECharts 更新内部 `options` 后的实际数据。

### 方法

* `mergeOptions`（底层调用了 ECharts 实例的 `setOption` 方法）

  *提供了一个更贴切的名称来描述 `setOption` 方法的实际行为。*

* `appendData`
* `resize`
* `dispatchAction`
* `showLoading`
* `hideLoading`
* `convertToPixel`
* `convertFromPixel`
* `containPixel`
* `getDataURL`
* `getConnectedDataURL`
* `clear`
* `dispose`

### 静态方法

* `connect`
* `disconnect`
* `registerMap`
* `registerTheme`

### 事件

Vue-ECharts 支持如下事件：

* `legendselectchanged`
* `legendselected`
* `legendunselected`
* `datazoom`
* `datarangeselected`
* `timelinechanged`
* `timelineplaychanged`
* `restore`
* `dataviewchanged`
* `magictypechanged`
* `geoselectchanged`
* `geoselected`
* `geounselected`
* `pieselectchanged`
* `pieselected`
* `pieunselected`
* `mapselectchanged`
* `mapselected`
* `mapunselected`
* `axisareaselected`
* `focusnodeadjacency`
* `unfocusnodeadjacency`
* `brush`
* `brushselected`
* 鼠标事件
  * `click`
  * `dblclick`
  * `mouseover`
  * `mouseout`
  * `mousedown`
  * `mouseup`
  * `globalout`

更多详细信息请参考 [ECharts 的 API 文档](https://ecomfe.github.io/echarts-doc/public/cn/api.html)。

## 本地开发

```bash
$ npm i
$ npm run dev
```

打开 `http://localhost:8080/demo` 来查看 demo。
