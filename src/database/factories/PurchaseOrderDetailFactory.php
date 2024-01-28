<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PurchaseOrderDetail>
 */
class PurchaseOrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'purchase_order_id' => PurchaseOrder::inRandomOrder()->first()->id,
            'row_number'        => $this->faker->numberBetween(1, 1000),
            'product_id'        => Product::inRandomOrder()->first()->id,
            'product_name'      => $this->faker->word,
            'product_detail'    => $this->faker->sentence,
            'quantity'          => $this->faker->randomFloat(2, 1, 1000),
            'unit_price'        => $this->faker->randomFloat(2, 100, 5000),
            'tax_rate'          => 0.10,
            'is_tax_inclusive'  => $this->faker->boolean,
            'note'              => $this->faker->text
        ];
    }
}
