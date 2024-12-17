<?php

use App\Http\Middleware\IsDeliveryMiddleware;
use App\Http\Middleware\IsSuperAdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        apiPrefix: 'api',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->api(append: [
            \G4T\Swagger\Middleware\SetJsonResponseMiddleware::class,
        ]);
        $middleware->alias([
            'superadmin' => IsSuperAdminMiddleware::class,
            'deliveryOnly' => IsDeliveryMiddleware::class
        ]);
        $middleware->api()->validateCsrfTokens(except: [
            '*'
        ]);
        $middleware->trustProxies(at: [
            '*',
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
