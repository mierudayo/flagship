<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\DeliveryAddress;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeliveryAddressControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->user = User::factory()->create();
    }

    public function testCanAddDeliveryAddressToCustomer(): void
    {
        $this->actingAs($this->user);

        $customer = Customer::factory()->create();

        $postData = DeliveryAddress::factory()->make([
            'customer_id'   => $customer->id,
        ])->toArray();

        $response = $this->post(route('customers.delivery-addresses.add', $customer), $postData);
        $this->assertDatabaseHas('delivery_addresses', $postData);

        $response->assertRedirect(route('customers.show', $customer));
    }
}
