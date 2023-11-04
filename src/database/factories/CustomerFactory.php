<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'          => $this->faker->company,
            'name_kana'     => $this->faker->optional()->name,
            'shortcut'      => $this->faker->optional()->word,
            'postal_code'   => $this->faker->optional()->postcode,
            'address'       => $this->faker->optional()->address,
            'tel_number'    => $this->faker->optional()->phoneNumber,
            'fax_number'    => $this->faker->optional()->phoneNumber,
            'note'          => $this->faker->optional()->sentence,
            'in_charge_user_id' => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
            'created_by_id'     => User::inRandomOrder()->first()->id,
            'updated_by_id'     => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
