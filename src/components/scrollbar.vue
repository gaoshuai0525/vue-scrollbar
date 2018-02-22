<template>
    <div class="scrollbar">
        <div class="wrap" ref="wrap" @scroll="handleScroll" @mousedown="clickTrackHandler($event)">
            <slot></slot>
        </div>
        <div class="scrollbar_bar" ref="bar" @mousedown="clickTrackHandler($event)">
            <div :style=renderStyle() @mousedown="clickThumbHandler($event)" class="scrollbar__thumb"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                sizeHeight:'0',
                move: '0',
                axis: null
            }
        },
        computed: {
            wrap() {
                return this.$refs.wrap;
            }
        },
        created () {
        },
        mounted () {
            this.update();
            this.wrap.addEventListener('DOMNodeInserted', this.update, false)
            this.wrap.addEventListener('DOMNodeRemoved', this.update, false)
        },
        watch: {
        },
        methods: {
            clickThumbHandler(e) {
                this.axis = e.y - e.currentTarget.getBoundingClientRect().top;
                this.startDrag(e)
            },
            clickTrackHandler(e) {
                this.axis = e.currentTarget.firstChild.getBoundingClientRect().height/2;
                this.mouseMoveDocumentHandler(e)
            },
            startDrag(e) {
                var vm = this;
                e.stopPropagation();
                e.preventDefault();
                e.cancelBubble=true;
                document.addEventListener('mousemove', vm.mouseMoveDocumentHandler, false);
                document.addEventListener('mouseup', function () {
                    document.removeEventListener('mousemove', vm.mouseMoveDocumentHandler, false)
                }, false);
            },
            mouseMoveDocumentHandler(e){
                var wrap = this.wrap;
                var barOffset = this.$refs.bar.getBoundingClientRect();
                this.move = (e.y - barOffset.top - this.axis) / this.$refs.bar.firstChild.getBoundingClientRect().height * 100;
                wrap.scrollTop = this.move * wrap.clientHeight / 100;
                this.move = Math.min(this.move,(wrap.scrollHeight - wrap.clientHeight)*100/ wrap.clientHeight);
                this.move = Math.max(0,this.move);
            },
            handleScroll() {
                var wrap = this.wrap;
                this.move = ((wrap.scrollTop * 100) / wrap.clientHeight);
            },
            update() {
                this.$nextTick(()=>{
                    let heightPercentage;
                    var wrap = this.wrap;
                    heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
                    this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
                })
            },
            renderStyle() {
                return {
                    height: this.sizeHeight,
                    transform: 'translateY('+this.move+'%)'}
            }
        }
    }
</script>

<style scoped>
    .scrollbar{
        height: 100%;
        overflow: hidden;

    }
    .wrap{
        height: 100%;
        overflow-y: scroll;
        margin-right: -20px;
        margin-bottom: -20px;

    }
    .scrollbar_bar{
        position: absolute;
        width: 6px;
        top: 2px;
        right: 2px;
        bottom: 2px;
        z-index: 1;
        border-radius: 4px;
        opacity: 0;
        transition: opacity .12s ease-out;
    }
    .scrollbar:hover .scrollbar_bar{
        opacity: 1;
        transition: opacity 340ms ease-out;
    }
    .scrollbar__thumb{
        transition: background-color .3s;
        background-color: hsla(220,4%,58%,.3);
    }
</style>
