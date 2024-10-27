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
        Schema::create('reporte_incidencias', function (Blueprint $table) {
            $table->id();
            /* (entrega fallida, producto dañado, accidente, etc. */
            $table->enum('tipo_incidencia',["entrega_fallida","producto dañado","accidente","otros"]);
            $table->string("descripcion");
            $table->enum('estado',['pendiente','resuelto']);
            $table->datetime("fecha_incidencia");
            $table->foreignId('user_id')->constrained();
            $table->foreignId('solicitud_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte_incidencias');
    }
};
