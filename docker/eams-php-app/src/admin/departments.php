<?php
session_start();
require_once __DIR__ . "/../config/config.php";
require_once __DIR__ . "/../includes/functions.php";

if (!is_logged_in() || !is_admin()) {
    redirect("../index.php");
}

$error = "";
$success = "";

// Handle Add/Edit Department
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = sanitize_input($_POST["name"]);
    $description = sanitize_input($_POST["description"]);
    $department_id = isset($_POST["department_id"]) ? sanitize_input($_POST["department_id"]) : null;

    if (empty($name)) {
        $error = "Department name is required.";
    } else {
        if ($department_id) {
            // Update department
            $stmt = $pdo->prepare("UPDATE departments SET name = ?, description = ? WHERE id = ?");
            if ($stmt->execute([$name, $description, $department_id])) {
                $success = "Department updated successfully.";
            } else {
                $error = "Error updating department.";
            }
        } else {
            // Add new department
            $stmt = $pdo->prepare("INSERT INTO departments (name, description) VALUES (?, ?)");
            if ($stmt->execute([$name, $description])) {
                $success = "Department added successfully.";
            } else {
                $error = "Error adding department. Department name might already exist.";
            }
        }
    }
}

// Handle Delete Department
if (isset($_GET["action"]) && $_GET["action"] == "delete" && isset($_GET["id"])) {
    $department_id = sanitize_input($_GET["id"]);
    $stmt = $pdo->prepare("DELETE FROM departments WHERE id = ?");
    if ($stmt->execute([$department_id])) {
        $success = "Department deleted successfully.";
    } else {
        $error = "Error deleting department.";
    }
}

// Fetch all departments
$departments = $pdo->query("SELECT * FROM departments ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Department Management - Attendance System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
</head>
<body>
    <div class="d-flex" id="wrapper">
        <!-- Sidebar-->
        <div class="border-end bg-white" id="sidebar-wrapper">
            <div class="sidebar-heading border-bottom bg-light">Admin Panel</div>
            <div class="list-group list-group-flush">
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="dashboard.php">Dashboard</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="departments.php">Departments</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="employees.php">Employees</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="reports.php">Reports</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="profile.php">Profile</a>
                <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../logout.php">Logout</a>
            </div>
        </div>
        <!-- Page content wrapper-->
        <div id="page-content-wrapper">
            <!-- Top navigation-->
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div class="container-fluid">
                    <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <?php echo $_SESSION["user_name"]; ?>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="profile.php">Profile</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="../logout.php">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!-- Page content-->
            <div class="container-fluid">
                <h1 class="mt-4">Department Management</h1>
                <?php if ($error): ?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $error; ?>
                    </div>
                <?php endif; ?>
                <?php if ($success): ?>
                    <div class="alert alert-success" role="alert">
                        <?php echo $success; ?>
                    </div>
                <?php endif; ?>

                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        Departments
                    </div>
                    <div class="card-body">
                        <button type="button" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addEditDepartmentModal">Add New Department</button>
                        <table id="departmentsTable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($departments as $dept): ?>
                                <tr>
                                    <td><?php echo $dept["id"]; ?></td>
                                    <td><?php echo $dept["name"]; ?></td>
                                    <td><?php echo $dept["description"]; ?></td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-warning edit-btn" data-id="<?php echo $dept["id"]; ?>" data-name="<?php echo htmlspecialchars($dept["name"]); ?>" data-description="<?php echo htmlspecialchars($dept["description"]); ?>" data-bs-toggle="modal" data-bs-target="#addEditDepartmentModal">Edit</button>
                                        <a href="departments.php?action=delete&id=<?php echo $dept["id"]; ?>" class="btn btn-sm btn-danger" onclick="return confirm(\'Are you sure you want to delete this department?\');">Delete</a>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Department Modal -->
    <div class="modal fade" id="addEditDepartmentModal" tabindex="-1" aria-labelledby="addEditDepartmentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="departments.php" method="POST">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEditDepartmentModalLabel">Add/Edit Department</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="department_id" id="department_id">
                        <div class="mb-3">
                            <label for="department_name" class="form-label">Department Name</label>
                            <input type="text" class="form-control" id="department_name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="department_description" class="form-label">Description</label>
                            <textarea class="form-control" id="department_description" name="description" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
    <script src="../assets/js/scripts.js"></script>
    <script>
        $(document).ready(function() {
            $('#departmentsTable').DataTable();

            $('#addEditDepartmentModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var id = button.data('id');
                var name = button.data('name');
                var description = button.data('description');

                var modal = $(this);
                if (id) {
                    modal.find('.modal-title').text('Edit Department');
                    modal.find('#department_id').val(id);
                    modal.find('#department_name').val(name);
                    modal.find('#department_description').val(description);
                } else {
                    modal.find('.modal-title').text('Add New Department');
                    modal.find('#department_id').val('');
                    modal.find('#department_name').val('');
                    modal.find('#department_description').val('');
                }
            });
        });
    </script>
</body>
</html>


