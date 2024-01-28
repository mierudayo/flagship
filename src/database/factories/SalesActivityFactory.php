<?php

namespace Database\Factories;

use App\Models\CustomerContact;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesActivity>
 */
class SalesActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'contact_date'          => $this->faker->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
            'customer_contact_id'   => CustomerContact::inRandomOrder()->first()->id,
            'proposal'              => $this->faker->text(),
            'feedback'              => $this->faker->randomElement([null, $this->faker->sentence]),
            'note'                  => $this->faker->sentence,
            'in_charge_user_id'     => User::inRandomOrder()->first()->id,
            'created_by_id'         => User::inRandomOrder()->first()->id,
            'updated_by_id'         => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
