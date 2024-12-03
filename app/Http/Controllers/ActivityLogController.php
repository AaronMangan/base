<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ActivityLog;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        //
        return Inertia::render('ActivityLog/Index', [
            'history' => $this->getHistory(),
        ]);
    }

    public function show(Request $request, ActivityLog $activityLog)
    {
        $event = $activityLog->load('user');

        if ($event->user->hasRole('super')) {
            $description = $event->event ?? 'modified';
            $event->note = "Super admin {$description} the object";
        } elseif ($event->user->hasRole('admin')) {
            $description = $event->event ?? 'modified';
            $event->note = "Organisation admin {$description} the object";
        } else {
            $description = $event->event ?? 'modified';
            $event->note = "The object was {$description} by a system process";
        }

        return Inertia::render('ActivityLog/View', [
            'data' => $event ?? []
        ]);
    }

    private function getHistory()
    {
        $query = ActivityLog::query()->with('user');

        if (!auth()->user()->hasRole('super')) {
            $query->where('organisation_id', auth()->user()->organisation_id);
        }

        return $query->paginate(5);
    }
}
