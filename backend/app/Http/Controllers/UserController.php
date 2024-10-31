<?php

namespace App\Http\Controllers;
use App\Http\Controllers\ImageController;
use App\Models\Domiciliario;
use App\Models\negocio;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * @OA\Get(
 *     path="/api/users",
 *     summary="Obtener usuarios",
 *     description="Retorna una lista de todos los usuarios",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="nombre", type="string", example="Juan Pérez"),
 *                 @OA\Property(property="TipoUsuario", type="string", example="cliente"),
 *                 @OA\Property(property="correo", type="string", example="juan.perez@example.com"),
 *                 @OA\Property(property="telefono", type="string", example="123456789"),
 *                 @OA\Property(property="estado", type="string", example="activo")
 *             )
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/users",
 *     summary="Crear un usuario",
 *     description="Crea un nuevo usuario en el sistema",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Juan Pérez"),
 *             @OA\Property(property="TipoUsuario", type="string", example="cliente"),
 *             @OA\Property(property="correo", type="string", example="juan.perez@example.com"),
 *             @OA\Property(property="telefono", type="string", example="123456789"),
 *             @OA\Property(property="password", type="string", example="password123"),
 *             @OA\Property(property="banner", type="string", example="https://example.com/banner.jpg"),
 *             @OA\Property(property="direccion", type="string", example="Calle 123"),
 *             @OA\Property(property="licencia", type="string", example="ABC123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Usuario creado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="string", example="Usuario creado con éxito"),
 *             @OA\Property(property="request", type="object")
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/users/{id}",
 *     summary="Actualizar un usuario",
 *     description="Actualiza los datos de un usuario existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="nombre", type="string", example="Juan Pérez"),
 *             @OA\Property(property="TipoUsuario", type="string", example="cliente"),
 *             @OA\Property(property="correo", type="string", example="juan.perez@example.com"),
 *             @OA\Property(property="telefono", type="string", example="123456789")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Usuario actualizado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Usuario actualizado"),
 *             @OA\Property(property="datos", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error al actualizar el usuario",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Hubo un error al actualizar el usuario"),
 *             @OA\Property(property="datos", type="object")
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/users/{id}/estado",
 *     summary="Actualizar el estado de un usuario",
 *     description="Actualiza el estado de un usuario existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="estado", type="string", example="activo")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Estado de usuario actualizado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Estado Actualizado con éxito")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error al actualizar el estado del usuario",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Hubo un error al actualizar el usuario"),
 *             @OA\Property(property="datos", type="object")
 *         )
 *     )
 * )
 */


class UserController extends Controller
{
    protected $imageController;

    public function __construct(ImageController $imageController)
    {
        $this->imageController = $imageController;
    }
    public function index()
    {
        return User::getUsuario();
    }
    public function getDomiciliaro()
    {
        return User::getUsuarioDomiciliario();
    }
    
    public function createUsurio(Request $request)
    {
        

        $user = User::create(
            [
                'nombre' => $request->nombre,
                'TipoUsuario' => $request->TipoUsuario,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
                'password' => bcrypt($request->password),
            ]
        );
        
        if ($request->TipoUsuario === "negocio") {
            $bannerUrl = $this->imageController->uploadImage($request, 'banner');
            if (!$bannerUrl) {
                return response()->json([
                    "error" => "No se pudo procesar la imagen"
                ], 400);
            }
            Negocio::create([
                'nombre' => $request->nombre,
                'banner' => $bannerUrl,
                'direccion' => $request->direccion,
                'user_id' => $user->id,
            ]);
        }
        if ($request->TipoUsuario === "domiciliario") {

            Domiciliario::create([
                'licencia' => $request->licencia,
                'user_id' => $user->id,
            ]);
        }

        return response()->json([
            "data" => "Usuario creado con exito",
            "request" => $request->all()
        ], 201);
    }
    public function updateUsuario(Request $request, $id)
    {
        try {

            $datos = $request->except('_token', '_method');


            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json([
                    "error" => "Usuario no encontrado"
                ], 404);
            }

            $usuario->fill($datos);
            $usuario->save();

            if ($usuario->TipoUsuario === 'negocio') {

                $negocioData = $request->only(['nombre', 'banner', 'direccion']);
                $negocio = Negocio::where('user_id', $id)->first();

                if ($negocio) {
                    $negocio->fill($negocioData);
                    $negocio->save();
                }
            } elseif ($usuario->TipoUsuario === 'domiciliario') {

                $domiciliarioData = $request->only(['licencia']);
                $domiciliario = Domiciliario::where('user_id', $id)->first();

                if ($domiciliario) {
                    $domiciliario->fill($domiciliarioData);
                    $domiciliario->save();
                }
            }

            return response()->json([
                "mensaje" => "Usuario actualizado",
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el usuario: ' . $e->getMessage());
            return response()->json([
                "error" => "Hubo un error al actualizar el usuario",
                "detalles" => $e->getMessage()
            ], 500);
        }
    }
    public function updateEstado(Request $request, $id)
    {
        try {
            $datos = $request->except('_token', '_method');
            $usuario = User::find($id);
            $usuario->estado = $request->estado;
            $usuario->save();
            return response()->json([
                "mensaje" => "Estado Actualizado con exito",
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el usuario: ' . $e->getMessage());
            return response()->json([
                "error" => "Hubo un error al actualizar el usuario",
                "datos" => $datos
            ], 500);
        }
    }
}
