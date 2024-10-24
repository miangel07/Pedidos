<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=reporte_incidencia>
 */
class ReporteIncidenciaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tipo_incidencia' => $this->faker->randomElement(['disponible', 'no disponible']),
            'descripcion'=> $this->faker->sentence(),
            'fecha_incidencia' => $this->faker->date(),
            'user_id' => $this->faker->numberBetween(1,10),
            'solicitud_id ' => $this->faker->numberBetween(1,1),
        ];
    }
}
