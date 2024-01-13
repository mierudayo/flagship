<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillingAddress>
 */
class BillingAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'                   => $this->faker->unique()->company,
            'name_kana'              => $this->faker->name,
            'shortcut'               => $this->faker->word,
            'billing_contact_name'   => $this->faker->name,
            'postal_code'            => $this->faker->postcode,
            'address'                => $this->faker->address,
            'email'                  => $this->faker->safeEmail,
            'tel'                    => $this->faker->phoneNumber,
            'fax'                    => $this->faker->phoneNumber,
            'invoice_delivery_method'=> $this->faker->randomElement(['郵送', 'メール', 'オンライン']),
            'note'                   => $this->faker->sentence,
        ];
    }
}
