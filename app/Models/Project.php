<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = ['image_path', 'name', 'description', 'status', 'due_date', 'created_by', 'updated_by', 'workspace_id'];

    protected static function booted()
    {
        static::addGlobalScope('workspace', function (Builder $query) {
            $user = Auth::user();
            $workspace = $user->workspaces->first();
            $query->where('workspace_id', $workspace->id);
        });
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
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
