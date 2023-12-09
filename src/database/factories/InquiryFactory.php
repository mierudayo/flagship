<?php

namespace Database\Factories;

use App\Models\CustomerContact;
use App\Models\InquiryType;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inquiry>
 */
class InquiryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'inquiry_date'          => $this->faker->date(),
            'customer_contact_id'   => CustomerContact::inRandomOrder()->first()->id,
            'product_id'            => Product::inRandomOrder()->first()->id,
            'product_detail'        => $this->faker->optional()->word,
            'inquiry_type_id'       => InquiryType::inRandomOrder()->first()->id,
            'contact_method'        => $this->faker->randomElement([1, 2, 3, 4]),
            'project_scale'         => $this->faker->optional()->numberBetween(0, 10000),
            'status'                => $this->faker->randomElement([1, 2, 3, 4, 5, 6, 7]),
            'subject'               => $this->faker->sentence,
            'message'               => $this->faker->sentence,
            'answer'                => $this->faker->randomElement([null, $this->faker->sentence]),
            'feedback'              => $this->faker->randomElement([null, $this->faker->sentence]),
            'note'                  => $this->faker->sentence,
            'in_charge_user_id'     => User::inRandomOrder()->first()->id,
            'created_by_id'         => User::inRandomOrder()->first()->id,
            'updated_by_id'         => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
        ];
    }
}
