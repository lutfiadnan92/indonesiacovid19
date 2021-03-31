const CekDini = Vue.component('CekDini', {
    template: `
    <div id="cek-dini">
        <div class="row mt-3">
            <div class="col-md">
                <div class="text-left mb-3">
                    <h3>Takut Terjangkit Virus Corona?</h3>
                    <p>
                        <strong>Klikdokter</strong> dan <strong>Alodokter</strong> bersama <strong>Kemenkes</strong> menyediakan fasilitas cek virus <em>Corona</em> Online
                    </p>
                    <p>Cek kondisi kamu sekarang, silahkan klik salah satu link di bawah</p>
                </div>
                <div class="list-group">
                    <a href="https://www.klikdokter.com/pages/cek-virus-corona" target="_blank" rel="noreferrer" class="list-group-item list-group-item-action">Klikdokter</a>
                    <a href="https://corona.alodokter.com/cek-risiko-tertular-virus-corona-gratis" target="_blank" rel="noreferrer" class="list-group-item list-group-item-action">Alodokter</a>
                </div>
            </div>
        </div>
    </div>`
})