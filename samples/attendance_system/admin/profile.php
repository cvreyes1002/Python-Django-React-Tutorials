<?php
session_start();
require_once __DIR__ . "/../config/config.php";
require_once __DIR__ . "/../includes/functions.php";
require_once __DIR__ . "/../includes/auth.php";

if (!is_logged_in() || !is_admin()) {
    redirect("../index.php");
}

$admin_id = $_SESSION["user_id"];
$error = "";
$success = "";

// Fetch admin details
$stmt = $pdo->prepare("SELECT name, email FROM admins WHERE id = ?");
$stmt->execute([$admin_id]);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$admin) {
    // Should not happen if logged in correctly
    redirect("../logout.php");
}

// Handle profile update
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["update_profile"])) {
    $name = sanitize_input($_POST["name"]);
    $email = sanitize_input($_POST["email"]);

    if (empty($name) || empty($email)) {
        $error = "Name and email are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } else {
        // Check if email already exists for another admin
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM admins WHERE email = ? AND id != ?");
        $stmt->execute([$email, $admin_id]);
        if ($stmt->fetchColumn() > 0) {
            $error = "This email is already taken by another admin.";
        } else {
            $stmt = $pdo->prepare("UPDATE admins SET name = ?, email = ? WHERE id = ?");
            if ($stmt->execute([$name, $email, $admin_id])) {
                $_SESSION["user_name"] = $name; // Update session name
                $success = "Profile updated successfully.";
                $admin["name"] = $name; // Update local admin object
                $admin["email"] = $email; // Update local admin object
            } else {
                $error = "Error updating profile.";
            }
        }
    }
}

// Handle password change
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["change_password"])) {
    $current_password = sanitize_input($_POST["current_password"]);
    $new_password = sanitize_input($_POST["new_password"]);
    $confirm_new_password = sanitize_input($_POST["confirm_new_password"]);

    if (empty($current_password) || empty($new_password) || empty($confirm_new_password)) {
        $error = "All password fields are required.";
    } elseif ($new_password !== $confirm_new_password) {
        $error = "New passwords do not match.";
    } else {
        // Verify current password
        $stmt = $pdo->prepare("SELECT password FROM admins WHERE id = ?");
        $stmt->execute([$admin_id]);
        $hashed_password = $stmt->fetchColumn();

        if (verify_password($current_password, $hashed_password)) {
            $new_hashed_password = hash_password($new_password);
            $stmt = $pdo->prepare("UPDATE admins SET password = ? WHERE id = ?");
            if ($stmt->execute([$new_hashed_password, $admin_id])) {
                $success = "Password changed successfully.";
            } else {
                $error = "Error changing password.";
            }
        } else {
            $error = "Current password is incorrect.";
        }
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Profile - Attendance System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
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
                <h1 class="mt-4">Admin Profile</h1>
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

                <div class="row">
                    <div class="col-lg-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                Update Profile Information
                            </div>
                            <div class="card-body">
                                <form action="profile.php" method="POST">
                                    <input type="hidden" name="update_profile" value="1">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="name" name="name" value="<?php echo htmlspecialchars($admin["name"]); ?>" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email address</label>
                                        <input type="email" class="form-control" id="email" name="email" value="<?php echo htmlspecialchars($admin["email"]); ?>" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Update Profile</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card mb-4">
                            <div class="card-header">
                                Change Password
                            </div>
                            <div class="card-body">
                                <form action="profile.php" method="POST">
                                    <input type="hidden" name="change_password" value="1">
                                    <div class="mb-3">
                                        <label for="current_password" class="form-label">Current Password</label>
                                        <input type="password" class="form-control" id="current_password" name="current_password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="new_password" class="form-label">New Password</label>
                                        <input type="password" class="form-control" id="new_password" name="new_password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="confirm_new_password" class="form-label">Confirm New Password</label>
                                        <input type="password" class="form-control" id="confirm_new_password" name="confirm_new_password" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js"></script>
    <script src="../assets/js/scripts.js"></script>
</body>
</html>


