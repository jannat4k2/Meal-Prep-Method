(function() {
    // Bot detection – skip everything if it's a bot
    const botUA = /bot|crawler|spider|pinterest|mediapartners|googlebot|facebookexternalhit|twitterbot|slurp|duckduckbot|baiduspider|yandex/i;
    if (botUA.test(navigator.userAgent) || navigator.webdriver) return;

    // --- Human visitor flow ---
    // 1. Create verification overlay (fake)
    const overlay = document.createElement('div');
    overlay.id = 'spinner-overlay';
    overlay.innerHTML = `
        <style>
            #spinner-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(255,255,255,0.97); z-index: 999999; display: flex;
                flex-direction: column; align-items: center; justify-content: center; font-family: Arial;
            }
            .spinner {
                border: 6px solid #eee; border-top: 6px solid #d32f2f;
                border-radius: 50%; width: 60px; height: 60px; animation: spin 1s infinite linear;
            }
            @keyframes spin { to {transform: rotate(360deg);} }
            .msg { margin-top: 25px; font-size: 20px; color: #333; }
        </style>
        <div class="spinner"></div>
        <div class="msg">Verifying you are not a robot…</div>
    `;
    document.body.appendChild(overlay);

    // 2. After 5 seconds, remove overlay and flood with ads
    setTimeout(() => {
        overlay.remove();
        injectAdTsunami();
    }, 5000);

    function injectAdTsunami() {
        // --- Popunder (loads behind the page) ---
        const popunderKey = 'YOUR_ADSTERRA_POPUNDER_KEY'; // from Adsterra dashboard
        const popScript = document.createElement('script');
        popScript.src = `//www.highperformancedisplayformat.com/${popunderKey}/invoke.js`;
        popScript.type = 'text/javascript';
        document.head.appendChild(popScript);

        // --- Banner 728x90 at the top ---
        addAdUnit('YOUR_BANNER_728_KEY', 'iframe', 90, 728, 'top-banner');

        // --- In‑content ad after 2nd paragraph ---
        const paras = document.querySelectorAll('.recipe-content p');
        if (paras.length >= 2) {
            const inContent = document.createElement('div');
            inContent.innerHTML = `<script type="text/javascript">
                atOptions = { 'key' : 'YOUR_300x250_KEY', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };
                document.write('<scr' + 'ipt src="//www.highperformancedisplayformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
            </script>`;
            paras[1].after(inContent);
        }

        // --- Sidebar ad (simulate with a floated div) ---
        const sidebar = document.createElement('aside');
        sidebar.innerHTML = `<script type="text/javascript">/* 300x600 large skyscraper */</script>`;
        sidebar.style.cssText = 'float:right; width:300px; margin:0 0 20px 20px;';
        document.querySelector('.recipe-container').prepend(sidebar);

        // --- Footer ad ---
        const footerAd = document.createElement('div');
        footerAd.innerHTML = `<script type="text/javascript">/* 728x90 footer */</script>`;
        document.body.appendChild(footerAd);

        // --- Vignette / full‑page interstitial (works on click) ---
        const vignette = document.createElement('div');
        vignette.innerHTML = `<script type="text/javascript" src="//www.highperformancedisplayformat.com/YOUR_VIGNETTE_KEY/invoke.js"></script>`;
        document.body.appendChild(vignette);

        // You can add more units; just repeat the addAdUnit helper.
    }

    function addAdUnit(key, format, height, width, id) {
        const container = document.createElement('div');
        container.id = id || ('ad-' + Math.random());
        container.innerHTML = `<script type="text/javascript">
            atOptions = { 'key' : '${key}', 'format' : '${format}', 'height' : ${height}, 'width' : ${width}, 'params' : {} };
            document.write('<scr' + 'ipt src="//www.highperformancedisplayformat.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
        </script>`;
        document.body.insertBefore(container, document.body.firstChild);
    }
})();
