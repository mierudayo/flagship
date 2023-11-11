<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesTerm>
 */
class SalesTermFactory extends Factory
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
            'billing_type'          => $this->faker->randomElement([1, 2]),
            'cutoff_day'            => $this->faker->numberBetween(1, 31),
            'payment_month_offset'  => $this->faker->numberBetween(0, 12),
            'payment_day'           => $this->faker->numberBetween(1, 31),
            'payment_day_offset'    => $this->faker->numberBetween(0, 7),
        ];
    }
}
