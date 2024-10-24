<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=domiciliario>
 */
class DomiciliarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "licencia" => $this->faker->phoneNumber(),
            "user_id" => $this->faker->numberBetween(1,10),
            "disponibilidad" => $this->faker->randomElement(["disponible","no disponible"]),
        ];
    }
}
