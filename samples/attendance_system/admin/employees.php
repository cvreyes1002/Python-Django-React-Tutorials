<?php
session_start();
require_once __DIR__ . "/../config/config.php";
require_once __DIR__ . "/../includes/functions.php";
require_once __DIR__ . "/../includes/auth.php";

if (!is_logged_in() || !is_admin()) {
    redirect("../index.php");
}

$error = "";
$success = "";

// Handle Add/Edit Employee
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = sanitize_input($_POST["name"]);
    $email = sanitize_input($_POST["email"]);
    $phone = sanitize_input($_POST["phone"]);
    $department_id = sanitize_input($_POST["department_id"]);
    $address = sanitize_input($_POST["address"]);
    $password = sanitize_input($_POST["password"]);
    $employee_id = isset($_POST["employee_id"]) ? sanitize_input($_POST["employee_id"]) : null;

    if (empty($name) || empty($email) || empty($department_id)) {
        $error = "Name, email, and department are required.";
    } else {
        if ($employee_id) {
            // Update employee
            if (!empty($password)) {
                $hashed_password = hash_password($password);
                $stmt = $pdo->prepare("UPDATE employees SET name = ?, email = ?, phone = ?, department_id = ?, address = ?, password = ? WHERE id = ?");
                $result = $stmt->execute([$name, $email, $phone, $department_id, $address, $hashed_password, $employee_id]);
            } else {
                $stmt = $pdo->prepare("UPDATE employees SET name = ?, email = ?, phone = ?, department_id = ?, address = ? WHERE id = ?");
                $result = $stmt->execute([$name, $email, $phone, $department_id, $address, $employee_id]);
            }
            if ($result) {
                $success = "Employee updated successfully.";
            } else {
                $error = "Error updating employee.";
            }
        } else {
            // Add new employee
            if (empty($password)) {
                $error = "Password is required for new employee.";
            } else {
                $hashed_password = hash_password($password);
                $stmt = $pdo->prepare("INSERT INTO employees (name, email, phone, department_id, address, password) VALUES (?, ?, ?, ?, ?, ?)");
                if ($stmt->execute([$name, $email, $phone, $department_id, $address, $hashed_password])) {
                    $success = "Employee added successfully.";
                } else {
                    $error = "Error adding employee. Email might already exist.";
                }
            }
        }
    }
}

// Handle Delete Employee
if (isset($_GET["action"]) && $_GET["action"] == "delete" && isset($_GET["id"])) {
    $employee_id = sanitize_input($_GET["id"]);
    $stmt = $pdo->prepare("DELETE FROM employees WHERE id = ?");
    if ($stmt->execute([$employee_id])) {
        $success = "Employee deleted successfully.";
    } else {
        $error = "Error deleting employee.";
    }
}

// Fetch all employees with department names
$employees = $pdo->query("SELECT e.*, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id ORDER BY e.name ASC")->fetchAll(PDO::FETCH_ASSOC);

// Fetch all departments for dropdown
$departments = $pdo->query("SELECT * FROM departments ORDER BY name ASC")->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management - Attendance System</title>
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
                <h1 class="mt-4">Employee Management</h1>
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
                        Employees
                    </div>
                    <div class="card-body">
                        <button type="button" class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addEditEmployeeModal">Add New Employee</button>
                        <table id="employeesTable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($employees as $emp): ?>
                                <tr>
                                    <td><?php echo $emp["id"]; ?></td>
                                    <td><?php echo $emp["name"]; ?></td>
                                    <td><?php echo $emp["email"]; ?></td>
                                    <td><?php echo $emp["phone"]; ?></td>
                                    <td><?php echo $emp["department_name"]; ?></td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-warning edit-btn" 
                                            data-id="<?php echo $emp["id"]; ?>" 
                                            data-name="<?php echo htmlspecialchars($emp["name"]); ?>" 
                                            data-email="<?php echo htmlspecialchars($emp["email"]); ?>" 
                                            data-phone="<?php echo htmlspecialchars($emp["phone"]); ?>" 
                                            data-department="<?php echo $emp["department_id"]; ?>" 
                                            data-address="<?php echo htmlspecialchars($emp["address"]); ?>" 
                                            data-bs-toggle="modal" data-bs-target="#addEditEmployeeModal">Edit</button>
                                        <a href="employee_attendance.php?id=<?php echo $emp["id"]; ?>" class="btn btn-sm btn-info">View Attendance</a>
                                        <a href="employees.php?action=delete&id=<?php echo $emp["id"]; ?>" class="btn btn-sm btn-danger" onclick="return confirm(\'Are you sure you want to delete this employee?\');">Delete</a>
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

    <!-- Add/Edit Employee Modal -->
    <div class="modal fade" id="addEditEmployeeModal" tabindex="-1" aria-labelledby="addEditEmployeeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form action="employees.php" method="POST">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEditEmployeeModalLabel">Add/Edit Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="employee_id" id="employee_id">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="employee_name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="employee_name" name="name" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="employee_email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="employee_email" name="email" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="employee_phone" class="form-label">Phone</label>
                                    <input type="text" class="form-control" id="employee_phone" name="phone">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="employee_department" class="form-label">Department</label>
                                    <select class="form-control" id="employee_department" name="department_id" required>
                                        <option value="">Select Department</option>
                                        <?php foreach ($departments as $dept): ?>
                                            <option value="<?php echo $dept["id"]; ?>"><?php echo $dept["name"]; ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="employee_address" class="form-label">Address</label>
                            <textarea class="form-control" id="employee_address" name="address" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="employee_password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="employee_password" name="password">
                            <div class="form-text">Leave blank to keep current password (for edit).</div>
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
            $('#employeesTable').DataTable();

            $('#addEditEmployeeModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var id = button.data('id');
                var name = button.data('name');
                var email = button.data('email');
                var phone = button.data('phone');
                var department = button.data('department');
                var address = button.data('address');

                var modal = $(this);
                if (id) {
                    modal.find('.modal-title').text('Edit Employee');
                    modal.find('#employee_id').val(id);
                    modal.find('#employee_name').val(name);
                    modal.find('#employee_email').val(email);
                    modal.find('#employee_phone').val(phone);
                    modal.find('#employee_department').val(department);
                    modal.find('#employee_address').val(address);
                    modal.find('#employee_password').removeAttr('required');
                } else {
                    modal.find('.modal-title').text('Add New Employee');
                    modal.find('#employee_id').val('');
                    modal.find('#employee_name').val('');
                    modal.find('#employee_email').val('');
                    modal.find('#employee_phone').val('');
                    modal.find('#employee_department').val('');
                    modal.find('#employee_address').val('');
                    modal.find('#employee_password').attr('required', 'required');
                }
            });
        });
    </script>
</body>
</html>

