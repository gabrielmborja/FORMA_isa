/* ========================================
   FORMATURA DRA. ISABELA DE OLIVEIRA
   JavaScript - Envelope + Countdown + Carrossel + Copiar Código + Animações
   ======================================== */

(function () {
    'use strict';

    // ==========================================
    // COPIAR CÓDIGO DA FORMANDA (130503)
    // ==========================================

    function copiarCodigo() {
        var codigo = '130503';
        var btnTexto = document.getElementById('btnCopiarTexto');
        var btn = document.getElementById('btnCopiar');

        function sucesso() {
            if (btnTexto) btnTexto.textContent = 'Copiado!';
            if (btn) btn.classList.add('copiado');
            setTimeout(function () {
                if (btnTexto) btnTexto.textContent = 'Copiar Código';
                if (btn) btn.classList.remove('copiado');
            }, 2500);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(codigo).then(sucesso).catch(function () {
                copiarFallback(codigo, sucesso);
            });
        } else {
            copiarFallback(codigo, sucesso);
        }
    }

    function copiarFallback(texto, callback) {
        var tempInput = document.createElement('input');
        tempInput.value = texto;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            callback();
        } catch (e) {
            alert('Código: ' + texto);
        }
        document.body.removeChild(tempInput);
    }

    window.copiarCodigo = copiarCodigo;

    // ==========================================
    // ENVELOPE - ANIMAÇÃO DE ABERTURA DO CONVITE
    // ==========================================

    function abrirConvite() {
        var envelope = document.getElementById('envelope');
        var flap = document.getElementById('envelopeFlap');
        var seal = document.getElementById('envelopeSeal');
        var openBtn = document.getElementById('openBtn');
        var envelopeScreen = document.getElementById('envelopeScreen');
        var siteContent = document.getElementById('siteContent');

        if (!envelope || envelope.classList.contains('opening')) return;
        envelope.classList.add('opening');

        if (openBtn) {
            openBtn.style.pointerEvents = 'none';
            openBtn.style.opacity = '0.4';
        }

        setTimeout(function () { if (flap) flap.classList.add('open'); }, 100);
        setTimeout(function () { if (seal) seal.classList.add('open'); }, 400);
        setTimeout(function () { if (envelopeScreen) envelopeScreen.classList.add('hiding'); }, 1000);
        setTimeout(function () {
            if (envelopeScreen) envelopeScreen.style.display = 'none';
            document.body.style.overflowY = 'auto';
            if (siteContent) siteContent.classList.add('visible');
        }, 1800);
    }

    window.abrirConvite = abrirConvite;
    document.body.style.overflowY = 'hidden';

    var envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', abrirConvite);
    }

    // ==========================================
    // CONTAGEM REGRESSIVA
    // ==========================================

    var TARGET_DATE = new Date('2027-07-17T22:00:00-03:00');

    function iniciarCountdown() {
        function atualizar() {
            var now = new Date();
            var diff = TARGET_DATE - now;
            if (diff <= 0) {
                ['days', 'hours', 'minutes', 'seconds'].forEach(function (id) {
                    var el = document.getElementById(id);
                    if (el) el.textContent = id === 'days' ? '0' : '00';
                });
                return;
            }
            var d = Math.floor(diff / 86400000);
            var h = Math.floor((diff % 86400000) / 3600000);
            var m = Math.floor((diff % 3600000) / 60000);
            var s = Math.floor((diff % 60000) / 1000);

            var dEl = document.getElementById('days');
            var hEl = document.getElementById('hours');
            var mEl = document.getElementById('minutes');
            var sEl = document.getElementById('seconds');

            if (dEl) dEl.textContent = d;
            if (hEl) hEl.textContent = h < 10 ? '0' + h : h;
            if (mEl) mEl.textContent = m < 10 ? '0' + m : m;
            if (sEl) sEl.textContent = s < 10 ? '0' + s : s;
        }
        atualizar();
        setInterval(atualizar, 1000);
    }

    iniciarCountdown();

    // ==========================================
    // ANIMAÇÕES DE SCROLL (FADE IN)
    // ==========================================

    function iniciarAnimacoes() {
        var fadeElements = document.querySelectorAll(
            '.event-card, .ticket-card, .confirm-text, .btn-whatsapp, .tutorial-card, .passo-item, .codigo-card, .gallery-card'
        );

        fadeElements.forEach(function (el) { el.classList.add('fade-in'); });

        function checarVisibilidade() {
            fadeElements.forEach(function (el) {
                var rect = el.getBoundingClientRect();
                var altura = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < altura - 60) {
                    el.classList.add('visible');
                }
            });
        }

        checarVisibilidade();
        window.addEventListener('scroll', checarVisibilidade, { passive: true });

        var hero = document.querySelector('.hero');
        if (hero && window.innerWidth > 768) {
            window.addEventListener('scroll', function () {
                var scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = (scrolled * 0.3) + 'px';
                }
            }, { passive: true });
        }
    }

    iniciarAnimacoes();

})();
