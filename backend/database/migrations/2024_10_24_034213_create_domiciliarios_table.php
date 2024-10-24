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
        Schema::create('domiciliarios', function (Blueprint $table) {
            $table->id();
            $table->string('licencia');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('disponibilidad',["disponible","no disponible"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domiciliarios');
    }
};
