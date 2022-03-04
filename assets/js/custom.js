(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        var is_single_page = $('html').attr('data-single-page') === 'true';
        try {
            w.yaCounter18343495 = new Ya.Metrika2({
                id: 18343495,
                clickmap: !is_single_page,
                trackLinks: !is_single_page,
                accurateTrackBounce: !is_single_page,
                webvisor: !is_single_page
            });
        } catch(e) { }
        
       if (!is_single_page) {
            $('head').each(function(_, element) {
               $(element).append(
                   '<script async src="https://www.googletagmanager.com/gtag/js?id=G-KF1LLRTQ5Q"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'G-KF1LLRTQ5Q\');</script>'
               );
            });
        }

    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "/js/metrika.js";
    if (window.location.hostname.endsWith('clickhouse.com')) {
        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    }
})(document, window, "yandex_metrika_callbacks2");