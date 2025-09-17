<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Only users who own a workspace are allowed to create projects.
     */
    public function create(User $authUser)
    {
        return $authUser->ownedWorkspace !== null;
    }

    /**
     * A user can manage another user if:
     *   1. The authenticated user owns a workspace.
     *   2. The target user belongs to the same workspace owned by the authenticated user.
     */
    public function manage(User $authUser, User $targetUser)
    {
        $ownerWorkspace = $authUser->ownedWorkspace;

        if (!$ownerWorkspace) {
            return false;
        }

        return $targetUser->workspaces->contains($ownerWorkspace->id);
    }
}
