<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogisticsAddress>
 */
class LogisticsAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id'   => Customer::inRandomOrder()->first()->id,
            'address_type'  => $this->faker->randomElement([1, 2, 3]),
            'post_code'     => $this->faker->optional(0.8)->postcode,
            'address'       => $this->faker->address,
            'company_name'  => $this->faker->optional(0.8)->company,
            'contact_name'  => $this->faker->optional(0.8)->name,
            'tel'           => $this->faker->optional(0.8)->phoneNumber,
            'note'          => $this->faker->optional(0.8)->text(200),
        ];
    }
}
