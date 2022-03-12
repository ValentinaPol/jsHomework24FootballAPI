/* `<section class="box">
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
    </section>` */

document.querySelector('button').addEventListener('click', function () {
    document.querySelector('.test').innerHTML = `<section class="box">
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
        <div class="item">
            <p>Lorem ipsum</p>
        </div>
    </section>`;
})