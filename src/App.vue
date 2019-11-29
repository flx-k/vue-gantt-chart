<template>
<div id="app">
    <gantt-chat :datas="datas"></gantt-chat>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            datas: [{
                id: "p1",
                name: "p1",
                tasks: [{
                    id: 'ap',
                    name: 't1'
                }, {
                    id: 'op',
                    name: 't2'
                }]
            },{
                id: "p2",
                name: "p2",
                tasks: [{
                    id: 'ds',
                    name: 't11'
                }, {
                    id: 'cs',
                    name: 't22'
                }]
            }],
            msg: 'Welcome to Your Vue.js App'
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
