<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Domiciliario;
use App\Models\reporte_incidencia;
use App\Models\solicitud;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(10)->create();
         Domiciliario::factory(10)->create();
         solicitud::factory(10)->create();
         //reporte_incidencia::factory(10)->create();

    }
}
