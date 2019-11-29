<template>
<div style="width:1000px;overflow-x:auto">
    <div class="time-line" id="time-line" style="height:38px;width:100%;background:#fff;z-index:10;" :style="{width:timeLineWidth+'px'}">
        <div style="float:left;height:36px;text-align:center;" v-for="mo in months" :key="mo">
            <div style="height:20px;line-height:20px;box-sizing:border-box;border:1px solid #dadada;border-bottom:0;border-top:0;border-right:0;">{{mo}}</div>
            <div style="height:18px;">
                <div style="float:left;height:18px;box-sizing:border-box;border:1px solid #dadada;border-right:0; " 
                :style="{width:perSize+'px'}" v-for="(d) in monthsMap[mo]" :key="mo+'_'+d">{{d}}
                    <!-- background:isWeek(mo+'-'+d)?'rgb(229,241,255)':'' -->
                </div>
            </div>
        </div>
    </div>
    <div id="_gantt_chat_div" style="width:800px;height:500px;background:grey;">
        <div :id="prod.id" v-for="prod in products" :key="prod.id" style="width:100%;height:100px;position: relative;">
            <div class="task_div" :id="prod.id+'_'" :style="{width:'300px',height:perHeight+'px',left:0+'px',top:10+'px'}">
                {{prod.name}}
            </div>
            <div class="task_div" :id="task.id" @mousedown="startMove($event,prod.id,task.id)" v-for="(task,i) in prod.tasks" :key="task.id" :style="{width:'100px',height:perHeight+'px',left:(i+1)*150+'px',top:(i+1)*30+10+'px'}">
                {{task.name}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    createCanvas,
    drawLine,
    repaint
} from './../lib/draw'

export default {
    name: "ganttChat",
    data() {
        return {
            products: null == this.datas ? [] : this.datas,
            perHeight: 20,
            canvasIds: [],
            perSize: 40,
            timeLineWidth: 10000,
            months: [1, 2, 3, 4, 5, 6],
            monthsMap: {
                1: 31,
                2: 30,
                3: 31,
                4: 30,
                5: 31,
                6: 30,
                7: 30,
                8: 30,
                9: 30,
                10:30,
                11:30,
                12:30
            }
        }
    },
    props: ['datas'],

    mounted() {
        this.init(this.products)
    },
    methods: {

        init(arr) {
            this.canvasIds = [];
            for (var i = 0; i < arr.length; i++) {
                this.initP(arr[i].tasks, arr[i].id)
            }
        },

        initP(arr, pid) {
            // let ids = [];
            // let lines = [];
            for (var i = 0; i < arr.length; i++) {
                if (i == 0)
                    continue;
                let fId = arr[i - 1].id;
                let tId = arr[i].id
                let lineId = arr[i - 1].id + '_' + arr[i].id;
                this.canvasIds.push(lineId);
                createCanvas(pid, lineId, fId, tId)
                drawLine(lineId, fId, tId)
            }
            // this.canvasIds = lines;
        },
        startMove(even, prodId, id) {
            even.stopPropagation();
            let div = document.getElementById(id);
            let disX = even.clientX - parseInt(div.style.left);
            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                div.style.left = left + 'px';
                console.error(this.canvasIds)
                console.error(id)

                repaint(this.canvasIds, id)
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
    }
}
</script>

<style>
.task_div {
    background: red;
    position: absolute;
}

.button {
    height: 20px;
    padding: 5px 20px;
    color: #fff;
    background: green;
    border-radius: 15px;
    display: inline-block;
}
</style>
