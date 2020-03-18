'use strict'

new Vue({
    el: '#app',
    data() {
        return {
            date: '',
            dataArr: [
                { id: 1, cardStyle: 'border-warning', textStyle: 'text-warning', text: 'Terkonfirmasi', value: 0},
                { id: 2, cardStyle: 'border-danger', textStyle: 'text-danger', text: 'Meninggal', value: 0 },
                { id: 3, cardStyle: 'border-success', textStyle: 'text-success', text: 'Sembuh', value: 0 }
            ],
            github: {
                user: 'CSSEGISandData/',
                repo: 'COVID-19/',
                repoLink: 'https://api.github.com/repos/',
                rawLink: 'https://raw.githubusercontent.com/',
            },
            loading: {
                interval: {},
                value: 0,
                status: false,
                style: { height: '5px' }
            },
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
        },
        loadData() {
            const vm = this
            // get master branch
            axios.get(vm.github.repoLink + vm.github.user + vm.github.repo + 'branches/master')
            .then(res => {
                // get commit sha
                axios.get(vm.github.repoLink + vm.github.user + vm.github.repo +'commits/' + res.data.commit.sha)
                .then(res => {
                    const filesArr = res.data
                    vm.date = res.data.commit.author.date.split('T')[0]
                    return filesArr.files.filter((v,i,a) => {
                        axios.get(vm.github.rawLink + vm.github.user + vm.github.repo + filesArr.sha + '/' + a[i].filename, { responseType: 'text' })
                        .then(res => {
                            const dataArr = vm.csvToJson(res.data)
                            return dataArr.filter((a,b,c) => {
                                if(c[b].CountryRegion === 'Indonesia') {
                                    const { ProvinceState,CountryRegion,Lat,Long, ...obj} = a
                                    vm.dataArr[i].value = Object.values(obj)[Object.values(obj).length - 1]
                                }
                            })
                        })
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        },
        refresh() {
            const vm = this
            vm.loading.interval = setInterval(() => {
                if (vm.loading.value === 100) {
                    vm.loading.status = false
                    clearInterval(vm.loading.interval)
                    vm.loadData()
                    return (vm.loading.value = 0)
                }
                vm.loading.status = true
                vm.loading.value += 25
                return vm.dataArr.filter((v,i,a) => {
                    return a[i].value = 0
                })
            }, 300)
        }
    }
})