<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerContact>
 */
class CustomerContactFactory extends Factory
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
            'name'          => $this->faker->name,
            'name_kana'     => $this->faker->optional()->word,
            'tel'           => $this->faker->optional()->phoneNumber,
            'mobile_number' => $this->faker->optional()->phoneNumber,
            'email'         => $this->faker->optional()->safeEmail,
            'position'      => $this->faker->optional()->jobTitle,
            'role'          => $this->faker->optional()->word,
            'is_active'     => $this->faker->boolean,
            'note'          => $this->faker->optional()->sentence,
            'in_charge_user_id' => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
            'created_by_id'     => User::inRandomOrder()->first()->id,
            'updated_by_id'     => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
