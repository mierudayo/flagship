<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);
    }

    public function test_can_view_users()
    {
        User::factory()->count(5)->create();
        $totalUsersIncludingAuth = User::count();

        $response = $this->get(route('users.index'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) use($totalUsersIncludingAuth) {
            $page->component('User/Index');
            $page->has('users', $totalUsersIncludingAuth, function (Assert $page) {
                $page->hasAll([
                    'id',
                    'name',
                    'email',
                    'mobile_number',
                    'employee_code',
                    'employment_date',
                    'resignation_date'
                ]);
            });
        });
    }

    public function test_can_view_user_create_form()
    {
        $response = $this->get(route('users.create'));
        $response->assertStatus(200);
        $response->assertInertia(function (Assert $page) {
            $page->component('User/Create');
        });
    }

    public function test_can_store_a_new_user()
    {
        $userData = User::factory()->make()->toArray();
        $plainPassword = 'plain-text-password';
        $userData['password'] = $plainPassword;
        $userData['password_confirmation'] = $plainPassword;

        $response = $this->post(route('users.store'), $userData);

        $userData['password_confirmation'] = 'plain-text-password';

        unset($userData['password']);
        unset($userData['password_confirmation']);
        unset($userData['resignation_date']);

        $this->assertDatabaseHas('users', $userData);

        $createdUser = User::where('email', $userData['email'])->first();
        $this->assertTrue(Hash::check($plainPassword, $createdUser->password));

        $response->assertRedirect(route('users.index'));
    }

}
