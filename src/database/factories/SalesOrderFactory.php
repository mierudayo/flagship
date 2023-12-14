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
        return [
            'customer_id'           => Customer::inRandomOrder()->first()->id,
            'customer_contact_id'   => CustomerContact::inRandomOrder()->first()->id,
            'billing_address_id'    => BillingAddress::inRandomOrder()->first()->id,
            'delivery_address_id'   => DeliveryAddress::inRandomOrder()->first()->id,
            'product_category_id'   => ProductCategory::inRandomOrder()->first()->id,
            'billing_type'          => $this->faker->randomElement([1, 2]),
            'cutoff_day'            => $this->faker->numberBetween(1, 31),
            'payment_month_offset'  => $this->faker->numberBetween(0, 12),
            'payment_day'           => $this->faker->numberBetween(1, 31),
            'payment_day_offset'    => $this->faker->numberBetween(0, 7),
            'payment_date'          => $this->faker->date(),
            'payment_status'        => $this->faker->word,
            'customer_name'         => $this->faker->name,
            'delivery_address'      => $this->faker->address,
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
