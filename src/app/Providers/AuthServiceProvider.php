<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('system-admin', function (User $user) {
            return $user->permission->level <= 1;
        });
        Gate::define('admin', function (User $user) {
            return $user->permission->level <= 2;
        });
        Gate::define('staff', function (User $user) {
            return $user->permission->level <= 3;
        });
    }
}
