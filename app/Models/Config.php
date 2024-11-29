<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Config extends Model
{
    /**
     * Fillable properties.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'values', 'organisation_id'
    ];

    /**
     * Cast the properties.
     *
     * @var array
     */
    protected $casts = [
        'values' => 'array'
    ];

    /**
     * Return the organisation for the setting
     *
     * @return BelongsTo|null
     */
    public function organisation(): ?BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }
}