<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /**
     * Deleted Status.
     */
    public const DELETED = 3;

    /**
     * Fillables.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'organisation_id'
    ];
}
