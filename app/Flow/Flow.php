<?php

namespace App\Flow;

use Illuminate\Support\Arr;
use App\Models\ActivityLog;

class Flow
{
    /**
     * Returns the events of a given model
     *
     * @param string $model The model to get the history for.
     * @param integer $id Primary Key of the model to get history for.
     * @param integer $count Optionally limit the result to the latest $count amount.
     * @return array
     */
    public static function historyOf(string $model, int $id, int $count = 0): array
    {
        // Build a query to use to find the events.
        $query = ActivityLog::query();

        if (!auth()->user()->isSuper()) {
            $query->where('organisation_id', auth()->user()->organisation_id);
        }

        $query->where('model_id', $id)->where('model_name', $model);

        return $query->get()->toArray();
    }
}
