const Home = Vue.component('Home', {
    template: `
    <div id="home">
        <div class="row mt-3">
            <div class="col-md">
                <h5 class="text-center mb-3">
                    Update Tanggal: 
                    <div
                        class="spinner-grow text-dark"
                        role="status"
                        v-if="date === ''"
                    >
                        <span class="sr-only">Loading...</span>
                    </div>
                    <strong v-else v-text="date"></strong>
                </h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        Informasi penularan COVID-19 di Indonesia kami ambil dari Coronavirus COVID-19 Global Cases by CSSE at Johns Hopkins University, informasi lengkap klik <a href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6" target="_blank" rel="noreferrer">disini</a>
                    </li>
                    <li class="list-group-item">
                        Downloadable database: 
                        <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank"
                        rel="noreferrer">GitHub</a>,
                        <a href="https://www.arcgis.com/home/item.html?id=c0b356e20b30490c8b8b4c7bb9554e7c" target="_blank" rel="noreferrer">Feature layer</a>,
                        <a href="https://pomber.github.io/covid19/timeseries.json" target="_blank" rel="noreferrer">JSON</a>.
                    </li>
                </ul>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 col-md-6 mb-3" v-for="(item, index) in dataArr" :key="index">
                <div :class="['card shadow h-100', item.cardStyle]">
                    <div class="card-body pt-1 pb-1">
                        <div
                            class="d-flex justify-content-center"
                            v-if="item.value === 0"
                        >
                            <div class="spinner-grow text-dark" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <h1 
                            :class="['text-center display-4', item.textStyle]"
                            v-else
                            v-text="currency(item.value)"
                        ></h1>
                    </div>
                    <div class="card-footer pt-1 pb-1">
                        <h5 :class="['text-center', item.textStyle]" v-text="item.text"></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            date: '',
            dataArr: [
                { id: 1, cardStyle: 'border-warning', textStyle: 'text-warning', text: 'Terkonfirmasi', value: 0 },
                { id: 2, cardStyle: 'border-primary', textStyle: 'text-primary', text: 'Perawatan', value: 0 },
                { id: 3, cardStyle: 'border-success', textStyle: 'text-success', text: 'Sembuh', value: 0 },
                { id: 4, cardStyle: 'border-danger', textStyle: 'text-danger', text: 'Meninggal', value: 0 }
            ],
            github: {
                user: 'CSSEGISandData/',
                repo: 'COVID-19/',
                repoLink: 'https://api.github.com/repos/',
                rawLink: 'https://raw.githubusercontent.com/',
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadData()
        })
    },
    methods: {
        csvToJson(csv) {
            const lines = csv.split('\n')
            const result = []
            const headers = lines[0].split(',')
            lines.map(function(line, indexLine) {
                if (indexLine < 1) return // Jump header line
                const obj = {}
                const currentline = line.split(",")
                headers.map(function(header, indexHeader) {
                    obj[header] = currentline[indexHeader]
                })
                result.push(obj)
            })
            result.pop()
            return result
        },
        currency(num) {
          if (!isNaN(num)) {
            num = Math.round(num);
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          }
        },
        async loadData() {
            const self = this
            const dataCovid19 = await axios.get('https://pomber.github.io/covid19/timeseries.json')
            const data = dataCovid19.data.Indonesia.splice(-1,1)
            console.log(data)
            self.date = data[0].date
            self.dataArr[0].value = data[0].confirmed
            self.dataArr[1].value = parseInt(data[0].confirmed) - parseInt(data[0].recovered) - parseInt(data[0].deaths)
            self.dataArr[2].value = data[0].recovered
            self.dataArr[3].value = data[0].deaths
        }
    }
});