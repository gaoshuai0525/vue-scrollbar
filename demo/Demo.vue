<template>
    <div id="app">
        <scrollbar>
            <div>
                hello
                <p style="height: 1000px;width: 800px"></p>
                world
            </div>
        </scrollbar>
    </div>
</template>
<script>

//import scrollbar from '../dist/vue-scrollbar.min.js'
import scrollbar from '../src/index.js'
export default {
  components: {
    'scrollbar': scrollbar
  },
  data () {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },

}
</script>

<style lang="stylus">
    html,body{
        height: 100%;
        overflow: hidden;
        padding: 0;
        margin: 0;
    }
   #app{
       width: 100%;
       height: 100%;
       background: #fefbfc;
   }
</style>
