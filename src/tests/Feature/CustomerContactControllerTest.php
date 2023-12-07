<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CustomerContactControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->user = User::factory()->create();
    }

    /*
    |--------------------------------------------------------------------------
    | Index
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは連絡先一覧を閲覧できる(): void
    {
        $this->actingAs($this->user);
        $response = $this->get(route('contacts.index'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('CustomerContact/Index');
            $page->has('customerContacts');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Store
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは連絡先の新規登録ができる(): void
    {
        $this->actingAs($this->user);

        $customer = Customer::factory()->create();

        $contactsData = CustomerContact::factory()->make([
            'customer_id'   => $customer->id,
            'created_by_id' => $this->user->id,
            'updated_by_id' => null,
        ])->toArray();

        $response = $this->post(route('customers.contacts.add', $customer), $contactsData);
        $this->assertDatabaseHas('customer_contacts', $contactsData);

        $response->assertRedirect(route('customers.show', $customer));

    }

    /*
    |--------------------------------------------------------------------------
    | Show
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは連絡先の閲覧ができる(): void
    {
        $this->actingAs($this->user);

        Customer::factory()->create();
        $contact = CustomerContact::factory()->create();

        $response = $this->get(route('contacts.show', $contact));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('CustomerContact/Show');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */
    public function test_認証済みAdminユーザーは連絡先編集ページを閲覧できる(): void
    {
        $this->actingAs($this->user);

        Customer::factory()->create();
        $existingContact= CustomerContact::factory()->create();

        $response = $this->get(route('contacts.edit', $existingContact));

        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('CustomerContact/Edit');
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは連絡先の更新ができる(): void
    {
        $this->actingAs($this->user);

        $customer = Customer::factory()->create();
        $contact  = CustomerContact::factory()->create();

        $postData = CustomerContact::factory()->make([
            'customer_id'   => $customer->id,
            'updated_by_id' => $this->user->id,
        ])->toArray();

        $response = $this->patch(route('contacts.update', $contact), $postData);
        $this->assertDatabaseHas('customer_contacts', $postData);

        $response->assertRedirect(route('contacts.index'));

    }

    /*
    |--------------------------------------------------------------------------
    | Destroy
    |--------------------------------------------------------------------------
    */
    public function test_認証済みユーザーは連絡先を削除できる(): void
    {
        $this->actingAs($this->user);

        Customer::factory()->create();
        $contact  = CustomerContact::factory()->create();

        $response = $this->delete(route('contacts.destroy', $contact));

        $response->assertRedirect(route('contacts.index'));
        $this->assertDatabaseMissing('customer_contacts', ['id' => $contact->id]);
    }

    public function test_未認証ユーザーは連絡先を削除できない(): void
    {
        Customer::factory()->create();
        $contact  = CustomerContact::factory()->create();

        $response = $this->delete(route('contacts.destroy', $contact));
        $response->assertRedirect(route('login'));
        $this->assertDatabaseHas('customer_contacts', ['id' => $contact->id]);
    }
}
