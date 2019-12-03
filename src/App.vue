<template>
<div id="app">
    <pre>{{datas}}</pre>
    <pre>{{re}}</pre>
    <gantt-chat :datas="datas" @updateTask="t" @updateProduct="t" start="2018-1-1" end="2018-7-1"></gantt-chat>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            re:null,
            datas: [{
                id: "p1",
                name: "p1",
                tasks: [{
                    id: 'ap',
                    name: 't1',
                    start:'2018-2-1',
                    end:'2018-2-5'
                }, {
                    id: 'op',
                    name: 't2',
                    start:'2018-2-7',
                    end:'2018-2-12'
                }, {
                    id: 'dp',
                    name: 't3',
                    start:'2018-2-17',
                    end:'2018-2-22'
                }]
            },{
                id: "p2",
                name: "p2",
                tasks: [{
                    id: 'ds',
                    name: 't11',
                    start:'2018-3-7',
                    end:'2018-3-12'
                }, {
                    id: 'cs',
                    name: 't22',
                    start:'2018-3-17',
                    end:'2018-3-20'
                }]
            }],
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods:{
        t(e){
            this.re=e
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
