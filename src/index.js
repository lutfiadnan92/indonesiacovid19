'use strict'

const app = new Vue({
    el: '#app',
    data() {
        return {
            date: '',
            terkonfirmasi: 0,
            sembuh: 0,
            meninggal: 0,
            covidData: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-15-2020.csv'
        }
    },
    created() {
        this.$nextTick(() => {
            this.loadData()
        })
    },
    methods: {
        async loadData() {
            await axios({
                method: 'get',
                url: this.covidData,
                responseType: 'text'
            }).then(res => {
                const array = this.csvToJson(res.data)
                return array.filter((value,index,array) => {
                    if(array[index].CountryRegion === 'Indonesia'){
                        this.date = value.LastUpdate.split('T')[0]
                        this.terkonfirmasi = parseInt(value.Confirmed)
                        this.sembuh = parseInt(value.Recovered)
                        this.meninggal = parseInt(value.Deaths)
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        },
        csvToJson(csv) {
            const lines = csv.split('\n')
            const result = []
            const headers = lines[0].replace(/[/ ]/g,'').split(',')
            lines.map(function(line, indexLine){
                if (indexLine < 1) return // Jump header line
                const obj = {}
                const currentline = line.split(",")
                headers.map(function(header, indexHeader){
                    obj[header] = currentline[indexHeader]
                })
                result.push(obj)
            })
            result.pop()
            return result
        }
    }
})