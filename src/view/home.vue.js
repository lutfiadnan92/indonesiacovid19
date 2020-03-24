const Home = Vue.component('Home', {
    template : `
        <div class="container-fluid">
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
                        <li class="list-group-item">
                            Otomatis update setiap hari
                        </li>
                        <li class="list-group-item">
                            Update tanggal berdasarkan (GMT+1)
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-md mb-3" v-for="(item, index) in dataArr" :key="index">
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
                                v-text="item.value"
                            ></h1>
                        </div>
                        <div class="card-footer pt-1 pb-1">
                            <h5 :class="['text-center', item.textStyle]" v-text="item.text"></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>`,
    data() {
        return {
            date: '',
            dataArr: [
                { id: 1, cardStyle: 'border-warning', textStyle: 'text-warning', text: 'Terkonfirmasi', value: 0},
                { id: 2, cardStyle: 'border-primary', textStyle: 'text-primary', text: 'Perawatan', value: 0},
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
        },
        loadData() {
            const vm = this
            axios.get(vm.github.repoLink + vm.github.user + vm.github.repo + 'branches/master')
            .then(res => {
                vm.date = res.data.commit.commit.author.date.split('T')[0]
                axios.get(res.data.commit.commit.tree.url)
                .then(res=> {
                    axios.get(res.data.tree[3].url)
                    .then(res => {
                        axios.get(res.data.tree[1].url)
                        .then(res => {
                            const fileArry = res.data.tree;
                            fileArry.shift(); fileArry.pop();
                            const path = fileArry.splice(-1)[0].path.split('.')[0];
                            axios({
                                method: 'get',
                                url: vm.github.rawLink + vm.github.user + vm.github.repo + 'master/csse_covid_19_data/csse_covid_19_daily_reports/' + path + '.csv',
                                responseType: 'text'
                            }).then(res => {
                                const dataArr = vm.csvToJson(res.data)
                                return dataArr.filter((a,b,c) => {
                                    if(c[b].Country_Region === 'Indonesia') {
                                        const {FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Last_Update,Combined_Key, ...obj} = a
                                        vm.dataArr[0].value = obj.Confirmed
                                        vm.dataArr[1].value = obj.Active
                                        vm.dataArr[2].value = obj.Recovered
                                        vm.dataArr[3].value = obj.Deaths
                                    }
                                })
                            })
                        })
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
});