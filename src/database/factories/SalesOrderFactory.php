<?php

namespace Database\Factories;

use App\Models\BillingAddress;
use App\Models\Customer;
use App\Models\CustomerContact;
use App\Models\DeliveryAddress;
use App\Models\ProductCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesOrder>
 */
class SalesOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = Customer::inRandomOrder()->first() ?? Customer::factory()->create();
        $customerContact = $customer->contacts()->inRandomOrder()->first() ?? CustomerContact::factory()->create(['customer_id' => $customer->id]);
        $billingAddress = BillingAddress::inRandomOrder()->first() ?? BillingAddress::factory()->create();
        $customer->billingAddresses()->attach($billingAddress);
        $deliveryAddress = $customer->deliveryAddresses()->inRandomOrder()->first() ?? DeliveryAddress::factory()->create(['customer_id' => $customer->id]);

        return [
            'customer_id'           => $customer->id,
            'customer_contact_id'   => $customerContact->id,
            'billing_address_id'    => $billingAddress->id,
            'delivery_address_id'   => $deliveryAddress->id,
            'product_category_id'   => ProductCategory::inRandomOrder()->first()->id,
            'billing_type'          => $this->faker->randomElement([1, 2]),
            'cutoff_day'            => $this->faker->randomElement([10, 15, 20, 25, 99]),
            'payment_month_offset'  => $this->faker->randomElement([0, 1, 2]),
            'payment_day'           => $this->faker->randomElement([10, 15, 20, 25, 99]),
            'payment_day_offset'    => $this->faker->randomElement([0, 3, 7]),
            'payment_date'          => $this->faker->date(),
            'payment_status'        => $this->faker->word,
            'customer_name'         => $customer->name,
            'delivery_address'      => $deliveryAddress->address,
            'consignee_company'     => $deliveryAddress->company_name,
            'consignee_contact'     => $deliveryAddress->contact_name,
            'order_date'            => $this->faker->date(),
            'shipping_date'         => $this->faker->date(),
            'shipping_status'       => $this->faker->word,
            'delivery_date'         => $this->faker->date(),
            'delivery_status'       => $this->faker->word,
            'delivery_memo'         => $this->faker->sentence,
            'note'                  => $this->faker->paragraph,
            'sales_in_charge_id'    => User::inRandomOrder()->first()->id,
            'created_by_id'         => User::inRandomOrder()->first()->id,
            'updated_by_id'         => User::inRandomOrder()->first()->id,
        ];
    }
}
