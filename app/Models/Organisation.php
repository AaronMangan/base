<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Organisation extends Model
{
    //
    protected $fillable = [
        'name', 'address', 'phone', 'settings'
    ];

    protected function users()
    {
        return $this->hasMany(User::class, 'organisation_id', 'id');
    }
}
