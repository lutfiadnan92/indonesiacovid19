'use strict'

const app = new Vue({
    el: '#app',
    data() {
        return {
            date: '',
            terkonfirmasi: 0,
            sembuh: 0,
            meninggal: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadData();
        })
    },
    methods: {
        async loadData() {
            await axios({
                method: 'get',
                url: 'https://pomber.github.io/covid19/timeseries.json'
            }).then(res => {
                console.log(res.data.Indonesia);
                for(let i = 0; i < res.data.Indonesia.length; i++) {
                    this.date = res.data.Indonesia[i].date;
                    this.terkonfirmasi = res.data.Indonesia[i].confirmed;
                    this.sembuh = res.data.Indonesia[i].recovered;
                    this.meninggal = res.data.Indonesia[i].deaths;   
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
})