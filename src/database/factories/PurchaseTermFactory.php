<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseTerm>
 */
class PurchaseTermFactory extends Factory
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
            'cutoff_day'            => $this->faker->randomElement([0, 10, 15, 20, 25, 28, 99]),
            'payment_month_offset'  => $this->faker->numberBetween(0, 12),
            'payment_day'           => $this->faker->randomElement([0, 10, 15, 20, 25, 28, 99]),
        ];
    }
}
