-- ========================================================
-- GLACE DATABASE SCHEMA - MySQL 8.0
-- Database: glace_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `glace_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `glace_db`;

-- 1. Tabel Users (Akun Resmi / Google / Enterprise)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NULL,
  `full_name` VARCHAR(191) NOT NULL,
  `company` VARCHAR(191) NULL,
  `role` VARCHAR(64) NOT NULL DEFAULT 'User',
  `auth_provider` ENUM('local', 'google', 'enterprise') NOT NULL DEFAULT 'local',
  `workspace_id` VARCHAR(64) NULL,
  `theme_preference` ENUM('light', 'dark') NOT NULL DEFAULT 'light',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tabel Free Trials (Sesi Trial 3 Hari Anti-Abuse)
CREATE TABLE IF NOT EXISTS `trials` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `fingerprint` VARCHAR(191) NOT NULL UNIQUE,
  `email` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `role` VARCHAR(64) NOT NULL DEFAULT 'Free Trial',
  `trial_started_at` DATETIME NOT NULL,
  `trial_expires_at` DATETIME NOT NULL,
  `duration_ms` BIGINT NOT NULL DEFAULT 259200000,
  `is_expired` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_trials_fingerprint` (`fingerprint`),
  INDEX `idx_trials_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabel Workspaces (Isolasi Tenant Glace Workspace)
CREATE TABLE IF NOT EXISTS `workspaces` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL DEFAULT 'Glace Workspace',
  `plan` ENUM('Free Plan', 'Pro Plan', 'Enterprise') NOT NULL DEFAULT 'Free Plan',
  `owner_user_id` VARCHAR(64) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Tabel Activities (Recent Activity Feed Auto-sync)
CREATE TABLE IF NOT EXISTS `activities` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NULL,
  `activity` VARCHAR(255) NOT NULL,
  `module` VARCHAR(100) NOT NULL,
  `status` ENUM('Success', 'Pending') NOT NULL DEFAULT 'Success',
  `icon_type` ENUM('document', 'asset', 'rfq', 'academy', 'wbs') NOT NULL DEFAULT 'wbs',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_activities_user_id` (`user_id`),
  INDEX `idx_activities_module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Tabel WBS Tasks (Project Intelligence WBS & CPM)
CREATE TABLE IF NOT EXISTS `wbs_tasks` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `wbs_code` VARCHAR(32) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `cpm` ENUM('Critical', 'Non-Critical') NOT NULL DEFAULT 'Critical',
  `cost` VARCHAR(64) NOT NULL,
  `progress` INT NOT NULL DEFAULT 0,
  `risk` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low',
  `status` ENUM('Completed', 'In Progress', 'Pending') NOT NULL DEFAULT 'In Progress',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Tabel Assets (Asset Intelligence Registry & Predictive Telemetry)
CREATE TABLE IF NOT EXISTS `assets` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(191) NOT NULL,
  `health` INT NOT NULL DEFAULT 100,
  `status` ENUM('Optimal', 'Normal', 'Warning', 'Critical') NOT NULL DEFAULT 'Optimal',
  `prediction` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Tabel Documents (Document Intelligence OCR & Drawings)
CREATE TABLE IF NOT EXISTS `documents` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `discipline` VARCHAR(100) NOT NULL,
  `ocr_status` VARCHAR(100) NOT NULL DEFAULT 'Verified',
  `revision` VARCHAR(64) NOT NULL DEFAULT 'Rev A',
  `file_size` VARCHAR(32) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Tabel Commerce RFQ & Products
CREATE TABLE IF NOT EXISTS `commerce_rfq` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `product_name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NULL,
  `corporate_price` VARCHAR(64) NULL,
  `vendor_status` ENUM('Pending', 'Quoted', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
  `requested_by_email` VARCHAR(191) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Tabel Co-Engineer Conversations History
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NULL,
  `title` VARCHAR(255) NOT NULL,
  `discipline` VARCHAR(64) NOT NULL DEFAULT 'Engineering AI',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

