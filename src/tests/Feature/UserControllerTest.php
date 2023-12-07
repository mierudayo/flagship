<?php

namespace Tests\Feature;

use App\Models\Permission;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $systemAdminUser;
    protected $adminUser;
    protected $staffUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->user = User::factory()->create();
        $this->systemAdminUser = User::factory()->create(['permission_id' => Permission::where('name', 'system-admin')->first()->id]);
        $this->adminUser       = User::factory()->create(['permission_id' => Permission::where('name', 'admin')->first()->id]);
        $this->staffUser       = User::factory()->create(['permission_id' => Permission::where('name', 'staff')->first()->id]);
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

            $page->has('users', function (Assert $paginator) use ($totalUsersIncludingAuth) {

                // ページネーションの基本プロパティを確認
                $paginator->hasAll([
                    'current_page',
                    'first_page_url',
                    'from',
                    'last_page',
                    'last_page_url',
                    'links',
                    'next_page_url',
                    'path',
                    'per_page',
                    'prev_page_url',
                    'to',
                    'total'
                ]);

                // users.data のチェック
                $paginator->has('data', $totalUsersIncludingAuth, function (Assert $user) {
                    $user->hasAll([
                        'id',
                        'permission_id',
                        'name',
                        'name_kana',
                        'email',
                        'mobile_number',
                        'employee_code',
                        'employment_date',
                        'resignation_date',
                        'permission',
                    ]);
                });
            });
        });
    }

    public function test_検索キーワードに一致するユーザーのみが表示される(): void
    {
        $this->actingAs($this->user);

        User::factory()->create(['name' => '特定の名前']);
        User::factory()->create(['name' => 'あいまい検索に一致する特定の名前']);
        User::factory()->create(['name_kana' => 'あいまい検索に一致する特定の名前読み仮名']);
        User::factory()->count(10)->create();

        $response = $this->get(route('users.index', ['keyword' => '特定の名前']));

        $expectedCount = 3;

        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) use ($expectedCount) {
            $page->component('User/Index');
            $page->has('users');
            $page->where('users.total', $expectedCount);
        });
    }

    public function test_未認証ユーザーはユーザー一覧を閲覧できない(): void
    {
        $response = $this->get(route('users.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_認証済みSystemAdminユーザーはユーザー作成フォームを閲覧できる(): void
    {
        $this->actingAs($this->systemAdminUser);

        $response = $this->get(route('users.create'));
        $response->assertStatus(200);
        $response->assertInertia(function (Assert $page) {
            $page->component('User/Create');
        });
    }

    public function test_認証済みAdminユーザーはユーザー作成フォームを閲覧できる(): void
    {
        $this->actingAs($this->adminUser);

        $response = $this->get(route('users.create'));
        $response->assertStatus(200);
        $response->assertInertia(function (Assert $page) {
            $page->component('User/Create');
        });
    }

    public function test_権限を持たない認証済みユーザーはユーザー作成フォームを閲覧できない(): void
    {
        $this->actingAs($this->staffUser);
        $response = $this->get(route('users.create'));
        $response->assertStatus(403);
    }

    public function test_未認証ユーザーはユーザー作成フォームを閲覧できない(): void
    {
        $response = $this->get(route('users.create'));
        $response->assertRedirect(route('login'));
    }

    public function test_認証済みAdminユーザーは新しいユーザーを保存できる(): void
    {
        $this->actingAs($this->adminUser);

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

    public function test_認証済みAdminユーザーはユーザー編集フォームを閲覧できる(): void
    {
        $existingUser = User::factory()->create();

        $this->actingAs($this->adminUser);

        $response = $this->get(route('users.edit', $existingUser));

        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('User/Edit');
        });
    }

    public function test_未認証ユーザーはユーザー編集フォームを閲覧できない(): void
    {
        $existingUser = User::factory()->create();
        $response = $this->get(route('users.edit', $existingUser));
        $response->assertRedirect(route('login'));
    }

    public function test_認証済みAdminユーザーはユーザーの更新ができる(): void
    {
        $targetUser = User::factory()->create();

        $this->actingAs($this->adminUser);

        $updatedData = User::factory()->make()->toArray();

        $response = $this->patch(route('users.update', $targetUser), $updatedData);

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', [
            'id'                => $targetUser->id,
            'employee_code'     => $updatedData['employee_code'],
            'name'              => $updatedData['name'],
            'name_kana'         => $updatedData['name_kana'],
            'email'             => $updatedData['email'],
            'mobile_number'     => $updatedData['mobile_number'],
            'employment_date'   => $updatedData['employment_date'],
            'resignation_date'  => $updatedData['resignation_date'],
        ]);
    }
}
