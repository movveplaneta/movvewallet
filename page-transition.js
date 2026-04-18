document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.createElement("div");
    overlay.classList.add("page-loader");

    overlay.innerHTML = `
        <div class="loader-content">
            <div class="loader-glow"></div>
            <h2>Movve Wallet</h2>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("hide");
        document.body.classList.add("loaded");
    }, 1200);

    setTimeout(() => {
        overlay.remove();
    }, 2000);

});