-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2025 at 04:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videostreaming`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('free','paid') NOT NULL,
  `user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `type`, `user`) VALUES
(1, 'Hindustan', 'free', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Roshan Yadav', 'roshan@gmail.com', '$2b$10$9JC1zH3ZdO.8PCNYIffStOVI/s.JJTYJLNk95Aykl7F5/rB/Y7VDG', '2024-11-26 12:34:09');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `playlistId` int(11) DEFAULT NULL,
  `path` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `uploadDate` datetime DEFAULT current_timestamp(),
  `status` enum('pending','processing','completed','failed') DEFAULT 'pending',
  `lessonId` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `name`, `description`, `genre`, `playlistId`, `path`, `userId`, `uploadDate`, `status`, `lessonId`, `video_url`) VALUES
(1, 'FIrst VIdeo', 'First', 'automobiles', NULL, 'uploads\\1732800370890-file_example_MP4_1280_10MG.mp4', 1, '2024-11-28 18:56:10', '', NULL, NULL),
(2, 'FIrst VIdeo ', 'First', 'sports', NULL, 'uploads\\1732800519518-file_example_MP4_1280_10MG.mp4', 1, '2024-11-28 18:58:39', 'failed', NULL, NULL),
(3, 'First', 'Sfgg', 'education', NULL, 'uploads\\1732800562075-file_example_MP4_1280_10MG.mp4', 1, '2024-11-28 18:59:22', 'completed', NULL, 'http://localhost:5000/uploads/courses/3f1edf74-c4eb-4a68-a96e-87f0cabab472/index.m3u8'),
(4, 'First', 'Forst', 'gaming', NULL, 'uploads\\1732800746862-file_example_MP4_1280_10MG.mp4', 1, '2024-11-28 19:02:26', '', NULL, NULL),
(5, 'First', 'Forst', 'entertainment', NULL, 'uploads\\1732800810016-file_example_MP4_1280_10MG.mp4', 1, '2024-11-28 19:03:30', '', NULL, NULL),
(6, 'First', 'First Video', 'automobiles', NULL, 'uploads\\1732886769412-file_example_MP4_1280_10MG.mp4', 1, '2024-11-29 18:56:09', '', NULL, NULL),
(7, 'Secod', 'seocd', 'entertainment', NULL, 'uploads\\1732887329855-file_example_MP4_1280_10MG.mp4', 1, '2024-11-29 19:05:29', '', '667e4e22-9753-488f-8ff3-4caf1da1131f', NULL),
(8, 'THird', 'Third', 'sports', NULL, 'uploads\\1732887551120-file_example_MP4_1280_10MG.mp4', 1, '2024-11-29 19:09:11', 'completed', '8fa924dc-342b-440e-9bec-29e5fda4fe59', 'http://localhost:8000/uploads/courses/8fa924dc-342b-440e-9bec-29e5fda4fe59/index.m3u8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lessonId` (`lessonId`),
  ADD KEY `playlistId` (`playlistId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`playlistId`) REFERENCES `playlists` (`id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;
ALTER TABLE videos ADD COLUMN thumbnail VARCHAR(255);

/* =========*/

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL,
  paymentId VARCHAR(255),
  signature VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
ALTER TABLE playlists ADD COLUMN price DECIMAL(10, 2);

