<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicituds', function (Blueprint $table) {
            $table->id();
            $table->string('direccion_recogida');
            $table->string('direccion_entrega');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('domiciliario_id')->constrained();
            $table->enum('estado',["pendiente", "asignado", "en curso", "completado", 
            "reprogramado", "cancelado"])->default("pendiente");
            $table->datetime('fecha');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicituds');
    }
};
