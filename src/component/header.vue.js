Vue.component('header-page', {
    template: `
    <header>
        <nav class="navbar navbar-expand-sm navbar-dark bg-gradient-info">
            <a
                class="navbar-brand"
                @click="home"
            >
                Informasi Terkini Penularan CORONAVIRUS Indonesia
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <span class="d-none d-lg-block d-xl-block">&nbsp;</span>
                <div class="navbar-nav ml-auto">
                    <router-link class="nav-item nav-link text-white" to="/cek_dini">Cek Dini Covid-19</router-link>
                </div>
            </div>
        </nav>
    </header>`,
    watch: {
        '$route' () {
            $('.navbar-collapse').collapse('hide');
        }
    },
    methods: {
        home() {
            location.replace('/indonesiacovid19')
        }
    }
})
