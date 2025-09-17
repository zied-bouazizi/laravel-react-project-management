<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    /**
     * Any workspace user can view projects.
     */
    public function viewAny(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Any user of the same workspace can view the project.
     */
    public function view(User $user, Project $project): bool
    {
        return $user->workspaces->contains($project->workspace_id);
    }

    /**
     * Any workspace user can create projects
     */
    public function create(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Any user of the same workspace can update projects.
     */
    public function update(User $user, Project $project): bool
    {
        return $user->workspaces->contains($project->workspace_id);
    }

    /**
     * Any user of the same workspace can delete projects.
     */
    public function delete(User $user, Project $project): bool
    {
        return $user->workspaces->contains($project->workspace_id);
    }
}
