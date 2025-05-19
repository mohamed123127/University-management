<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../config/database.php';

class DashboardStats
{

    // جلب عدد الطلاب
    public static function getStudentsCount($conn)
    {
        $sql = "SELECT COUNT(*) as total FROM etudient";
        $stmt = $conn->prepare($sql);
        if (!$stmt) return 0;
        $stmt->execute();
        $result = $stmt->get_result();
        $count = 0;
        if ($result && $row = $result->fetch_assoc()) {
            $count = (int)$row['total'];
        }
        $stmt->close();
        return $count;
    }

    // جلب عدد الوثائق حسب الحالة + العدد الإجمالي
    public static function getDocumentsRequestCount($conn)
    {
        $sql = "SELECT Status, COUNT(*) as count FROM documentrequest GROUP BY Status";
        $stmt = $conn->prepare($sql);

        if (!$stmt) return [
            "total" => 0,
            "Completed" => 0,
            "Pending" => 0,
            "In Progress" => 0,
            "Rejected" => 0
        ];

        $stmt->execute();
        $result = $stmt->get_result();

        $statusCounts = [
            "Completed" => 0,
            "Pending" => 0,
            "In Progress" => 0,
            "Rejected" => 0
        ];

        $total = 0;

        while ($row = $result->fetch_assoc()) {
            $status = $row['Status'];
            $count = (int)$row['count'];
            $total += $count;

            if (isset($statusCounts[$status])) {
                $statusCounts[$status] = $count;
            }
        }

        $stmt->close();

        return array_merge(["total" => $total], $statusCounts);
    }




    public static function getReportsCount($conn)
    {
        $sql = "SELECT Status, COUNT(*) as count FROM reportproblem GROUP BY Status";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            return [
                "total" => 0,
                "Completed" => 0,
                "en Attend" => 0,
                "Refused" => 0
            ];
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $statusCounts = [
            "Completed" => 0,
            "en Attend" => 0,
            "Refused" => 0
        ];

        $total = 0;

        while ($row = $result->fetch_assoc()) {
            $status = $row['Status'];
            $count = (int)$row['count'];
            $total += $count;

            if (isset($statusCounts[$status])) {
                $statusCounts[$status] = $count;
            }
        }

        $stmt->close();

        return array_merge(["total" => $total], $statusCounts);
    }


    // جلب عدد الطلبات الإلكترونية + عدد الطلبات حسب الحالة
    public static function getVirtualRequestsCount($conn)
    {
        $sql = "SELECT Status, COUNT(*) as count FROM changerequests GROUP BY Status";
        $stmt = $conn->prepare($sql);
        if (!$stmt) return [
            "total" => 0,
            "Completed" => 0,
            "en attend" => 0,
            "Rejected" => 0
        ];

        $stmt->execute();
        $result = $stmt->get_result();

        $statusCounts = [
            "Completed" => 0,
            "en attend" => 0,
            "Rejected" => 0
        ];

        $total = 0;

        while ($row = $result->fetch_assoc()) {
            $status = $row['Status'];
            $count = (int)$row['count'];
            $total += $count;

            if (isset($statusCounts[$status])) {
                $statusCounts[$status] = $count;
            }
        }

        $stmt->close();

        return array_merge(["total" => $total], $statusCounts);
    }



    // دالة لجلب كل البيانات معاً
    public static function getDashboardStats($conn)
    {
        try {
            $students = self::getStudentsCount($conn);
            $documents = self::getDocumentsRequestCount($conn);
            $reports = self::getReportsCount($conn);
            $virtualRequestsStats = self::getVirtualRequestsCount($conn); // ← الجديدة

            $conn->close();

            return [
                "success" => true,
                "students" => $students,
                "documents" => $documents,
                "reports" => $reports,
                "virtualRequests" => $virtualRequestsStats // ← نُرسل كل الإحصائيات هنا
            ];
        } catch (Exception $ex) {
            return [
                "success" => false,
                "message" => "خطأ في جلب البيانات: " . $ex->getMessage()
            ];
        }
    }
}