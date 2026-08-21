<?php
session_start();
require_once __DIR__ . "/../config/config.php";
require_once __DIR__ . "/../includes/functions.php";

if (!is_logged_in() || !is_admin()) {
    redirect("../index.php");
}

$employee_id = isset($_GET["id"]) ? sanitize_input($_GET["id"]) : null;

if (!$employee_id) {
    redirect("employees.php");
}

// Fetch employee details
$stmt = $pdo->prepare("SELECT name, email FROM employees WHERE id = ?");
$stmt->execute([$employee_id]);
$employee = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$employee) {
    redirect("employees.php");
}

// Fetch attendance records for the employee
$attendances = $pdo->prepare("SELECT * FROM attendances WHERE employee_id = ? ORDER BY check_in DESC");
$attendances->execute([$employee_id]);
$employee_attendances = $attendances->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Attendance - Attendance System</title>
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
                <h1 class="mt-4">Attendance Records for <?php echo htmlspecialchars($employee["name"]); ?></h1>
                <p>Email: <?php echo htmlspecialchars($employee["email"]); ?></p>

                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        Attendance History
                    </div>
                    <div class="card-body">
                        <table id="attendanceTable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Status</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($employee_attendances as $attendance): ?>
                                <tr>
                                    <td><?php echo $attendance["id"]; ?></td>
                                    <td><?php echo $attendance["check_in"]; ?></td>
                                    <td><?php echo $attendance["check_out"]; ?></td>
                                    <td><?php echo $attendance["status"]; ?></td>
                                    <td><?php echo $attendance["notes"]; ?></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
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
            $("#attendanceTable").DataTable();
        });
    </script>
</body>
</html>


