<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/sass/app.scss'])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
