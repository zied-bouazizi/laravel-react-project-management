<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Any workspace user can view tasks in their workspace.
     */
    public function viewAny(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Users can view tasks only if they belong to a project in their workspace.
     */
    public function view(User $user, Task $task): bool
    {
        return $user->workspaces->contains($task->workspace_id);
    }

    /**
     * Any user of a workspace can create a task for a project in their workspace.
     */
    public function create(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Any user of a workspace can update tasks belonging to projects in their workspace.
     */
    public function update(User $user, Task $task): bool
    {
        return $user->workspaces->contains($task->workspace_id);
    }

    /**
     * Any user of a workspace can delete tasks belonging to projects in their workspace.
     */
    public function delete(User $user, Task $task): bool
    {
        return $user->workspaces->contains($task->workspace_id);
    }
}
