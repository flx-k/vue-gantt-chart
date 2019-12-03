<template>
<div id="gantt_chat_product" :style="{width:timeLineWidth+'px'}">
    <div class="time-line" id="time-line" style="height:38px;width:100%;background:#fff;z-index:10;">
        <div style="float:left;height:36px;text-align:center;" v-for="mo in months" :key="mo">
            <div style="height:20px;line-height:20px;box-sizing:border-box;border:1px solid #dadada;border-bottom:0;border-top:0;border-right:0;">{{mo}}</div>
            <div style="height:18px;">
                <div style="float:left;height:18px;box-sizing:border-box;border:1px solid #dadada;border-right:0; " :style="{width:perSize+'px'}" v-for="(d) in monthsMap[mo]" :key="mo+'_'+d">{{d}}
                </div>
            </div>
        </div>
    </div>
    <div id="_gantt_chat_div" style="width:100%;height:500px;background:grey;">
        <div :id="prod.id" class="product div" v-for="prod in products" :key="prod.id" style="width:100%;position: relative;" :style="{height:((perHeight+10)*4+10)+'px'}">
            <div class="task_div" :id="prod.id+'_'" @mousedown="startMoveP($event,prod)" :style="{width:'300px',height:perHeight+'px',left:0+'px',top:10+'px'}">
                {{prod.name}}
            </div>
            <div class="task_div" :class="[prod.id]" :id="task.id" @mousedown="startMove($event,prod,task)" v-for="(task,i) in prod.tasks" :key="task.id" :style="{width:'100px',height:perHeight+'px',left:(i+1)*150+'px',top:(i+1)*30+10+'px'}">
                {{task.name}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
function initWidth(id, begin, start, end, perWidth) {
    let _b = new Date(begin).getTime() / 1000;
    let _s = new Date(start).getTime() / 1000;
    let _e = new Date(end).getTime() / 1000;
    let l = parseInt((_s - _b) / 60 / 60 / 24);
    let w = parseInt((_e - _s) / 60 / 60 / 24);
    let div = document.getElementById(id);
    div.style.left = l * perWidth + 'px'
    div.style.width = w * perWidth + 'px'
}
import {
    createCanvas,
    drawLine,
    repaint
} from './../lib/draw'
import {
    getDays,
    buildDate,
    getMothDaysMap
} from './../lib/date'
export default {
    name: "ganttChat",
    data() {
        return {
            products: null == this.datas ? [] : this.datas,
            perHeight: 20,
            canvasIds: [],
            perSize: 40,
            timeWidth: 40,
            timeLineWidth: 0,
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            monthsMap: {
                1: 31,
                2: 30,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 31,
                8: 31,
                9: 30,
                10: 31,
                11: 30,
                12: 31
            },
            dateMap: {}
        }
    },
    props: ['datas', 'start', 'end'],

    mounted() {
        this.init(this.products, true)
    },
    methods: {

        init(arr, init) {
            if (true) {
                this.canvasIds = [];
                this.dateMap = getMothDaysMap(this.start, this.end)
                this.months = this.dateMap.months;
                this.monthsMap = this.dateMap;
                let ds = this.dateMap['days']
                this.timeLineWidth = this.timeWidth * ds;
            }
            for (var i = 0; i < arr.length; i++) {
                this.initP(arr[i].tasks, arr[i].id, init)
            }
        },

        initP(arr, pid, init) {
            let minStart = null;
            let maxEnd = null;
            for (var i = 0; i < arr.length; i++) {
                let _s = new Date(arr[i].start).getTime();
                let _e = new Date(arr[i].end).getTime();
                if (minStart == null || minStart > _s)
                    minStart = _s;
                if (maxEnd == null || maxEnd < _e)
                    maxEnd = _e;
                if (!init)
                    continue;
                initWidth(arr[i].id, this.start, arr[i].start, arr[i].end, this.timeWidth)
                if (i == 0)
                    continue;
                let fId = arr[i - 1].id;
                let tId = arr[i].id
                let lineId = arr[i - 1].id + '_' + arr[i].id + '_' + pid;
                this.canvasIds.push(lineId);
                createCanvas(pid, lineId, fId, tId)
                drawLine(lineId, fId, tId)
            }
            initWidth(pid + "_", this.start, minStart, maxEnd, this.timeWidth)
        },
        startMove(even, prod, task) {
            let id = task.id;
            let prodId = prod.id;
            even.stopPropagation();
            let div = document.getElementById(id);
            let _left = parseInt(div.style.left);
            let disX = even.clientX - _left;
            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                div.style.left = left + 'px';
                repaint(this.canvasIds, id)
            };
            document.onmouseup = (e) => {
                var l = parseInt(div.style.left)
                let a = Math.round(l / this.timeWidth);
                l = a * this.timeWidth;
                div.style.left = l + 'px';
                repaint(this.canvasIds, id)
                let _d = (l - _left) / this.timeWidth;
                task.start = buildDate(task.start, _d)
                task.end = buildDate(task.end, _d)
                document.onmousemove = null;
                document.onmouseup = null;
                this.initP(prod.tasks, prodId, false)
                this.$emit("updateTask", task);
            };
        },
        startMoveP(even, prod) {
            let id = prod.id;
            let ids = [];
            let tasksDiv = document.getElementsByClassName(id);
            even.stopPropagation();
            let div = document.getElementById(id + "_");
            let _left = parseInt(div.style.left);
            let disX = even.clientX - _left;

            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                let _l = left - parseInt(div.style.left);
                div.style.left = left + 'px';
                // console.info(div.style.left)
                console.error(tasksDiv.length)
                for (var i = 0; i < tasksDiv.length; i++) {
                    let element = tasksDiv[i]
                    console.error(element.id)
                    element.style.left = parseInt(element.style.left) + _l + 'px'
                }
                repaint(this.canvasIds, id)
            };
            document.onmouseup = (e) => {
                var l = parseInt(div.style.left)
                let a = Math.round(l / this.timeWidth);
                l = a * this.timeWidth;
                div.style.left = l + 'px';
                for (var i = 0; i < tasksDiv.length; i++) {
                    let element = tasksDiv[i]
                    let _l = Math.round(parseInt(element.style.left) / this.timeWidth) * this.timeWidth;
                    element.style.left = _l + 'px'
                }
                let _d = (l - _left) / this.timeWidth;
                prod.tasks.forEach(t => {
                    t.start=buildDate(t.start,_d)
                    t.end=buildDate(t.end,_d)
                });
                repaint(this.canvasIds, id)
                document.onmousemove = null;
                document.onmouseup = null;
                this.$emit("updateProduct", prod);

            };
        },
    }
}
</script>

<style>
#gantt_chat_product {
    width: 1000px;
    overflow-x: auto;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* #gantt_chat_product .product.div:hover{
    background: yellow
} */
#gantt_chat_product .task_div {
    background: red;
    position: absolute;
    cursor: move;
}
</style>
