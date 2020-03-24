Vue.component('header-page', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-gradient-info">
                <router-link
                    to="/"
                    class="navbar-brand"
                >
                    Informasi Terkini Penularan COVID-19 - Indonesia
                </router-link>
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
                        <router-link class="nav-item nav-link text-white" to="/">Home</router-link>
                        <router-link class="nav-item nav-link text-white" to="/cek_dini">Cek Dini Covid-19</router-link>
                    </div>
                </div>
            </nav>
        </header>`,
    watch: {
        '$route' () {
            $('.navbar-collapse').collapse('hide');
        }
    }
})