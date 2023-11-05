<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\Permission;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
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

    public function test_認証済みユーザーは取引先一覧を閲覧できる(): void
    {
        $this->actingAs($this->user);

        Customer::factory()->count(5)->create();

        $customersCount = Customer::count();

        $response = $this->get(route('customers.index'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) use ($customersCount) {
            $page->component('Customer/Index');

            $page->has('customersPaginator', function (Assert $paginator) use ($customersCount) {

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

                $paginator->has('data', $customersCount, function (Assert $customer) {
                    $customer->hasAll([
                        'id',
                        'name',
                        'name_kana',
                        'shortcut',
                        'postal_code',
                        'address',
                        'tel_number',
                        'fax_number',
                        'note',
                        'in_charge_user_id',
                        'created_by_id',
                        'updated_by_id',
                        'created_at',
                        'updated_at',
                        'in_charge_user',
                        'contacts',
                    ]);
                });
            });
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */
    public function test_認証済みAdminユーザーは取引先作成フォームを閲覧できる(): void
    {
        $this->actingAs($this->adminUser);

        $response = $this->get(route('customers.create'));
        $response->assertStatus(200);
        $response->assertInertia(function (Assert $page) {
            $page->component('Customer/Create');
        });
    }

    public function test_権限を持たない認証済みユーザーは取引先作成フォームを閲覧できない(): void
    {
        $this->actingAs($this->staffUser);
        $response = $this->get(route('customers.create'));
        $response->assertStatus(403);
    }

    /*
    |--------------------------------------------------------------------------
    | Store
    |--------------------------------------------------------------------------
    */
    public function test_認証済みAdminユーザーは取引先の新規登録ができる(): void
    {
        $this->actingAs($this->adminUser);

        $customerData = Customer::factory()->make([
            'created_by_id' => $this->adminUser->id,
            'updated_by_id' => null,
        ])->toArray();

        $response = $this->post(route('customers.store'), $customerData);
        $this->assertDatabaseHas('customers', $customerData);

        $response->assertRedirect(route('customers.index'));

    }

    public function test_未認証ユーザーは取引先の新規作成ができない(): void
    {
        $customerData = Customer::factory()->make()->toArray();

        $response = $this->post(route('customers.store'), $customerData);

        $response->assertRedirect(route('login'));

        $this->assertDatabaseMissing('customers', $customerData);
    }

    /*
    |--------------------------------------------------------------------------
    | Show
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは取引先の閲覧ができる(): void
    {
        $this->actingAs($this->staffUser);

        $customer = Customer::factory()->create();

        $response = $this->get(route('customers.show', $customer->id));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('Customer/Show');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */
    public function test_認証済みAdminユーザーは取引先編集ページを閲覧できる(): void
    {
        $existingCustomer= Customer::factory()->create();

        $this->actingAs($this->adminUser);

        $response = $this->get(route('customers.edit', $existingCustomer));

        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('Customer/Edit');
        });
    }

    public function test_未認証ユーザーはユーザー取引先編集ページを閲覧できない(): void
    {
        $existingCustomer= Customer::factory()->create();
        $response = $this->get(route('customers.edit', $existingCustomer));
        $response->assertRedirect(route('login'));
    }

    public function test_権限を持たない認証済みユーザーは取引先編集ページを閲覧できない(): void
    {
        $existingCustomer= Customer::factory()->create();

        $this->actingAs($this->staffUser);
        $response = $this->get(route('customers.edit', $existingCustomer));
        $response->assertStatus(403);
    }

    // TODO: Updateテスト

    /*
    |--------------------------------------------------------------------------
    | Destroy
    |--------------------------------------------------------------------------
    */
    public function test_連絡先データを持つ取引先は削除できない(): void
    {
        $this->actingAs($this->adminUser);

        $customer = Customer::factory()->create();
        CustomerContact::factory()->create(['customer_id' => $customer->id]);

        $response = $this->delete(route('customers.destroy', $customer));

        $response->assertRedirect(route('customers.edit', $customer));
        $response->assertSessionHas('message', 'この取引先は連絡先データを持つため削除できません。');

        $this->assertDatabaseHas('customers', ['id' => $customer->id]);
    }

    public function test_Adminユーザーは連絡先を持たない取引先を削除できる(): void
    {
        $this->actingAs($this->adminUser);

        $customer = Customer::factory()->create();
        $response = $this->delete(route('customers.destroy', $customer));

        $response->assertRedirect(route('customers.index'));
        $this->assertDatabaseMissing('customers', ['id' => $customer->id]);
    }

    public function test_未認証ユーザーは取引先を削除できない(): void
    {
        $customer = Customer::factory()->create();
        $response = $this->delete(route('customers.destroy', $customer));
        $response->assertRedirect(route('login'));
        $this->assertDatabaseHas('customers', ['id' => $customer->id]);
    }

    public function test_権限を持たないユーザーは取引先を削除できない(): void
    {
        $this->actingAs($this->staffUser);

        $customer = Customer::factory()->create();
        $response = $this->delete(route('customers.destroy', $customer));
        $response->assertStatus(403);
        $this->assertDatabaseHas('customers', ['id' => $customer->id]);
    }
}
