<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Task::class);

        $query = Task::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        if (request()->page && request()->page > $tasks->lastPage()) {
            abort(404);
        }

        $allTasksCount = Task::count();

        return inertia("Task/Index", [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'allTasksCount' => $allTasksCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Task::class);

        $user = Auth::user();
        $workspace = $user->workspaces->first();

        $projects = Project::query()
            ->orderBy("id", "desc")
            ->get();

        $users = User::inWorkspace($workspace)
            ->orderBy("id", "asc")
            ->get();

        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $this->authorize('create', Task::class);

        $workspace = Auth::user()->workspaces->first();

        $data = $request->validated();
        /** @var \Illuminate\Http\UploadedFile|null $image */
        $image = $data['image'] ?? null;
        $data['workspace_id'] = $workspace->id;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        Task::create($data);

        return to_route('task.index')
            ->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $this->authorize('view', $task);

        return inertia("Task/Show", [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $this->authorize('update', $task);

        $user = Auth::user();
        $workspace = $user->workspaces->first();

        $projects = Project::query()
            ->orderBy("name", "desc")
            ->get();

        $users = User::inWorkspace($workspace)
            ->orderBy("name", "asc")
            ->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'projects' => TaskResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $data = $request->validated();
        /** @var \Illuminate\Http\UploadedFile|null $image */
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }

            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }

        $task->update($data);

        return to_route('task.index')
            ->with('success', "Task \"$task->name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $name = $task->name;

        $task->delete();

        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        return back()->with('success', "Task \"$name\" deleted successfully");
    }

    public function myTasks()
    {
        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        if (request()->page && request()->page > $tasks->lastPage()) {
            abort(404);
        }

        $allMyTasksCount = Task::where('assigned_user_id', $user->id)->count();

        return inertia("Task/MyTasks", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'allMyTasksCount' => $allMyTasksCount,
        ]);
    }
}
