<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request, $fieldName = 'image')
    {
        // Validar la imagen
        $request->validate([
            $fieldName => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->file($fieldName)) {
       
            $originalName = $request->file($fieldName)->getClientOriginalName();
            
            $uniqueName = time() . '_' . $originalName; 

            
            $path = $request->file($fieldName)->storeAs('images', $uniqueName, 'public');
            
            return Storage::url($path);
        }

        return null; 
    }
}