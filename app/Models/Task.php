<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'status',
        'priority',
        'due_date',
        'assigned_user_id',
        'created_by',
        'updated_by',
        'project_id',
        'workspace_id'
    ];

    protected static function booted()
    {
        static::addGlobalScope('workspace', function (Builder $query) {
            $user = Auth::user();
            $workspace = $user->workspaces->first();
            $query->whereHas('project', function (Builder $projectQuery) use ($workspace) {
                $projectQuery->where('workspace_id', $workspace->id);
            });
        });
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
}
