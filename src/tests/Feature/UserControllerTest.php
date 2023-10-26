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
    }

    public function test_認証済みユーザーはユーザー一覧を閲覧できる(): void
    {
        $this->actingAs($this->user);

        User::factory()->count(5)->create();
        $totalUsersIncludingAuth = User::count();

        $response = $this->get(route('users.index'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) use ($totalUsersIncludingAuth) {
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

    public function test_未認証ユーザーはユーザー一覧を閲覧できない(): void
    {
        $response = $this->get(route('users.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_認証済みユーザーはユーザー作成フォームを閲覧できる(): void
    {
        $this->actingAs($this->user);

        $response = $this->get(route('users.create'));
        $response->assertStatus(200);
        $response->assertInertia(function (Assert $page) {
            $page->component('User/Create');
        });
    }

    public function test_未認証ユーザーはユーザー作成フォームを閲覧できない(): void
    {
        $response = $this->get(route('users.create'));
        $response->assertRedirect(route('login'));
    }

    public function test_認証済みユーザーは新しいユーザーを保存できる(): void
    {
        $this->actingAs($this->user);

        $userData = User::factory()->make()->toArray();
        $plainPassword = 'plain-text-password';
        $userData['password'] = $plainPassword;
        $userData['password_confirmation'] = $plainPassword;

        $response = $this->post(route('users.store'), $userData);

        unset($userData['password']);
        unset($userData['password_confirmation']);
        unset($userData['resignation_date']);

        $this->assertDatabaseHas('users', $userData);

        $createdUser = User::where('email', $userData['email'])->first();
        $this->assertTrue(Hash::check($plainPassword, $createdUser->password));

        $response->assertRedirect(route('users.index'));
    }

    public function test_未認証ユーザーはユーザーの新規作成ができない(): void
    {
        $userData = User::factory()->make()->toArray();

        $response = $this->post(route('users.store'), $userData);

        $response->assertRedirect(route('login'));

        $this->assertDatabaseMissing('users', $userData);
    }
}
