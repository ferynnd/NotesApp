<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->string('notes_title', 100);
            $table->text('notes_text');
            $table->enum('notes_status', ['TODO', 'PROGRESS', 'DONE']);
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('user_id');
        
            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};