<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\solicitud>
 */
class SolicitudFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // 'direccion_recogida', 'direccion_entrega', "descripcion_Producto", 'user_id', 'domiciliario_id', 'estado', 'fecha'
        return [
            'direccion_recogida' => $this->faker->address(),
            'direccion_entrega' => $this->faker->address(),
            'descripcion_Producto' => $this->faker->text(),
            'user_id' => $this->faker->numberBetween(1,10),
            'domiciliario_id' => $this->faker->numberBetween(1,10),
            'estado' => $this->faker->randomElement(['pendiente', 'asignado', 'completado','cancelado']),
            'fecha' => $this->faker->date(),
        ];
    }
}
