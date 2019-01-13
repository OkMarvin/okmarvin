module.exports = function (id) {
  return `<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
  
    gtag("config", "${id}");
  </script>`
}
