<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Only the super role can see every user, otherwise only show other users belong to the organisation.
     *
     * @param User $authUser
     * @param User $user
     * @return void
     */
    public function view(User $authUser, User $user)
    {
        // Super role can view all users
        if ($authUser->hasRole('super')) {
            return true;
        }

        // Otherwise, check if the users belong to the same company
        return $authUser->organisation_id === $user->organisation_id;
    }
}
