<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\SalesOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesOrderDetail>
 */
class SalesOrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sales_order_id'    => SalesOrder::inRandomOrder()->first()->id,
            'row_number'        => $this->faker->unique()->numberBetween(1, 100),
            'product_id'        => Product::inRandomOrder()->first()->id,
            'product_name'      => $this->faker->word,
            'product_detail'    => $this->faker->sentence,
            'quantity'          => $this->faker->randomFloat(2, 0.5, 100),
            'unit_price'        => $this->faker->randomFloat(2, 100, 5000),
            'tax_rate'          => 0.10,
            'is_tax_inclusive'  => $this->faker->boolean,
            'tax_amount'        => $this->faker->randomFloat(2, 1000, 50000),
            'subtotal'          => $this->faker->randomFloat(2, 1000, 50000),
            'total'             => $this->faker->randomFloat(2, 1000, 50000),
            'note'              => $this->faker->text
        ];
    }
}
