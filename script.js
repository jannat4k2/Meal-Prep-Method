/**
 * Recipe Site Cloaking & Monetization System
 * Shows clean content to bots, ads to humans
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        verificationDelay: 5000,      // 5 seconds verification spinner
        adsterraKeys: {
            popunder: 'YOUR_POPUNDER_KEY',
            banner728: 'YOUR_BANNER_728_KEY',
            banner300: 'YOUR_BANNER_300_KEY',
            native: 'YOUR_NATIVE_KEY',
            vignette: 'YOUR_VIGNETTE_KEY',
            social: 'YOUR_SOCIAL_BAR_KEY'
        }
    };
    
    // Bot Detection - Comprehensive list
    const BOT_USER_AGENTS = [
        'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
        'pinterest', 'mediapartners', 'googlebot', 'bingbot',
        'facebookexternalhit', 'twitterbot', 'slurp', 'duckduckbot',
        'baiduspider', 'yandex', 'ahrefs', 'semrush', 'mj12bot',
        'dotbot', 'rogerbot', 'siteauditbot', 'gigabot', 'ia_archiver'
    ];
    
    const BOT_PATTERNS = new RegExp(BOT_USER_AGENTS.join('|'), 'i');
    
    // Check if visitor is a bot
    function isBot() {
        const ua = navigator.userAgent.toLowerCase();
        const botCheck = BOT_PATTERNS.test(ua) || 
                        navigator.webdriver || 
                        window.callPhantom ||
                        window._phantom ||
                        window.__phantomas ||
                        document.documentElement.getAttribute('webdriver');
        
        // Additional checks
        const headless = /headless/i.test(ua) || 
                        window.outerWidth === 0 || 
                        window.outerHeight === 0;
        
        return botCheck || headless;
    }
    
    // Exit if bot - they see clean content only
    if (isBot()) {
        console.log('Bot detected - serving clean content');
        return;
    }
    
    // Human visitor flow
    console.log('Human detected - loading monetization');
    
    // Create verification overlay
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'verification-overlay';
        overlay.innerHTML = `
            <div class="spinner-container">
                <div class="spinner"></div>
                <div class="verification-title">Verifying your browser...</div>
                <div class="verification-text">This may take a few seconds</div>
            </div>
        `;
        return overlay;
    }
    
    // Inject ad units
    function injectAds() {
        const container = document.querySelector('.recipe-container');
        
        // 1. Popunder (loads in background)
        injectPopunder();
        
        // 2. Top banner (728x90)
        injectBanner(CONFIG.adsterraKeys.banner728, '728x90', 'top');
        
        // 3. Sidebar ad (300x600)
        injectSidebarAd();
        
        // 4. In-content ads
        injectInContentAds();
        
        // 5. Bottom banner
        injectBanner(CONFIG.adsterraKeys.banner728, '728x90', 'bottom');
        
        // 6. Vignette (on click)
        injectVignette();
        
        // 7. Social bar
        injectSocialBar();
        
        // 8. Native ads
        injectNativeAds();
    }
    
    // Popunder
    function injectPopunder() {
        const script = document.createElement('script');
        script.src = `//pl${CONFIG.adsterraKeys.popunder}.highcpmrevenuegate.com/${CONFIG.adsterraKeys.popunder}/invoke.js`;
        script.async = true;
        document.head.appendChild(script);
    }
    
    // Banner ad
    function injectBanner(key, size, position) {
        const div = document.createElement('div');
        div.className = `ad-container ad-${position}`;
        div.innerHTML = `
            <script type="text/javascript">
                atOptions = {
                    'key': '${key}',
                    'format': 'iframe',
                    'height': 90,
                    'width': 728,
                    'params': {}
                };
                document.write('<scr' + 'ipt src="//www.highcpmrevenuegate.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
            </script>
        `;
        
        const container = document.querySelector('.recipe-container');
        if (position === 'top') {
            container.insertBefore(div, container.firstChild);
        } else {
            container.appendChild(div);
        }
    }
    
    // Sidebar ad
    function injectSidebarAd() {
        const sidebar = document.createElement('aside');
        sidebar.className = 'ad-sidebar';
        sidebar.innerHTML = `
            <script type="text/javascript">
                atOptions = {
                    'key': '${CONFIG.adsterraKeys.banner300}',
                    'format': 'iframe',
                    'height': 600,
                    'width': 300,
                    'params': {}
                };
                document.write('<scr' + 'ipt src="//www.highcpmrevenuegate.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
            </script>
        `;
        
        const content = document.querySelector('.recipe-content') || 
                       document.querySelector('.recipe-description');
        if (content) {
            content.parentNode.insertBefore(sidebar, content);
        }
    }
    
    // In-content ads
    function injectInContentAds() {
        const sections = document.querySelectorAll('section');
        if (sections.length >= 2) {
            const adDiv = document.createElement('div');
            adDiv.className = 'ad-container ad-in-content';
            adDiv.innerHTML = `
                <script type="text/javascript">
                    atOptions = {
                        'key': '${CONFIG.adsterraKeys.banner300}',
                        'format': 'iframe',
                        'height': 250,
                        'width': 300,
                        'params': {}
                    };
                    document.write('<scr' + 'ipt src="//www.highcpmrevenuegate.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
                </script>
            `;
            sections[1].appendChild(adDiv);
        }
    }
    
    // Vignette (interstitial on click)
    function injectVignette() {
        const script = document.createElement('script');
        script.src = `//pl${CONFIG.adsterraKeys.vignette}.highcpmrevenuegate.com/${CONFIG.adsterraKeys.vignette}/invoke.js`;
        script.async = true;
        document.body.appendChild(script);
    }
    
    // Social bar
    function injectSocialBar() {
        const script = document.createElement('script');
        script.src = `//pl${CONFIG.adsterraKeys.social}.highcpmrevenuegate.com/${CONFIG.adsterraKeys.social}/invoke.js`;
        script.async = true;
        document.body.appendChild(script);
    }
    
    // Native ads
    function injectNativeAds() {
        const nativeDiv = document.createElement('div');
        nativeDiv.className = 'ad-container';
        nativeDiv.style.margin = '30px 0';
        nativeDiv.innerHTML = `
            <script type="text/javascript">
                atOptions = {
                    'key': '${CONFIG.adsterraKeys.native}',
                    'format': 'iframe',
                    'height': 250,
                    'width': 300,
                    'params': {}
                };
                document.write('<scr' + 'ipt src="//www.highcpmrevenuegate.com/' + atOptions.key + '/invoke.js"></scr' + 'ipt>');
            </script>
        `;
        
        const comments = document.querySelector('.comments-section');
        if (comments) {
            comments.parentNode.insertBefore(nativeDiv, comments);
        }
    }
    
    // Initialize
    function init() {
        // Show verification overlay
        const overlay = createOverlay();
        document.body.appendChild(overlay);
        
        // Remove overlay and inject ads after delay
        setTimeout(() => {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                overlay.remove();
                injectAds();
            }, 500);
        }, CONFIG.verificationDelay);
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
