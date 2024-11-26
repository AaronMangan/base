<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Return the user page.
        return Inertia::render('User/UsersIndex', [
            'users' => $this->getUsers()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, int $id)
    {
        $user = auth()->user()->organisation->users;

        // Check if the authenticated user can view this user
        $this->authorize('view', $user);

        // return view('users.show', compact('user'));
        return Inertia::render('User/UserEdit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function getUsers()
    {
        if (\Auth::user()->hasRole('super')) {
            return User::with('status', 'organisation', 'roles')->get()->toArray();
        } else {
            return User::with('status', 'organisation', 'roles')
                ->where('organisation_id', \Auth::user()->organisation_id)
                ->get()
                ->toArray();
        }
    }
}
