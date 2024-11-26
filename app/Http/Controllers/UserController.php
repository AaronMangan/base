<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
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
    public function edit(Request $request, User $user)
    {
        // Check if the authenticated user can view this user.
        if ($request->user()->cannot('update', $user)) {
            abort(403);
        }

        //
        $user = auth()->user()->organisation->users;

        // return view('users.show', compact('user'));
        return Inertia::render('User/UserEdit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        // Make sure the user can update the model.
        if ($request->user()->cannot('update', $user)) {
            abort(403);
        }

        // Get the data for the user.
        $data = $request->safe()->only(['name', 'email']);
        $updated = $user->update($data);

        // Redirect back to the user index page or show page
        return redirect()->route('user.index')
            ->with(
                $updated ? 'success' : 'fail',
                $updated ? 'User updated successfully.' : 'An error occurred saving the user'
            );
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
