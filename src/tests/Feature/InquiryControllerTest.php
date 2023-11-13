<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\Inquiry;
use App\Models\User;
use Database\Seeders\InquiryTypeSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\ProductSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InquiryControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(PermissionSeeder::class);
        $this->user = User::factory()->create();
    }

    public function testCanDisplayInquiriesIndexPageByAuthUser(): void
    {
        $this->actingAs($this->user);

        $customer = Customer::factory()->create();
        CustomerContact::factory()->create(['customer_id' => $customer->id]);

        $this->seed(ProductSeeder::class);
        $this->seed(InquiryTypeSeeder::class);
        Inquiry::factory()->make();

        $response = $this->get(route('inquiries.index'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('Inquiry/Index');

            // TODO: データチェック
        });
    }

    public function testCanDisplayInquiryCreatePageByAuthUser(): void
    {
        $this->actingAs($this->user);

        $response = $this->get(route('inquiries.create'));
        $response->assertStatus(200);

        $response->assertInertia(function (Assert $page) {
            $page->component('Inquiry/Create');
        });
    }

    public function testCanStoreInquiryWithValidDataByAuthUser(): void
    {
        $this->actingAs($this->user);

        Customer::factory()->create();
        CustomerContact::factory()->create();

        $this->seed(ProductSeeder::class);
        $this->seed(InquiryTypeSeeder::class);
        $postData = Inquiry::factory()->make([
            'updated_by_id' => null,
        ])->toArray();

        $response = $this->post(route('inquiries.store', $postData));

        $this->assertDatabaseHas('inquiries', $postData);

        $response->assertRedirect(route('inquiries.index'));
    }
}
